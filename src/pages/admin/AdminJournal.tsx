import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Clock, 
  Eye, 
  EyeOff 
} from 'lucide-react';
import { api } from '../../services/api';
import { JournalArticle, JournalCategory } from '../../types';

export const AdminJournal: React.FC = () => {
  const [articles, setArticles] = useState<JournalArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<JournalArticle | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState<JournalCategory>('Materiality');
  const [readTime, setReadTime] = useState('5 min read');
  const [authorName, setAuthorName] = useState('Éléonore de Vauquelin');
  const [authorRole, setAuthorRole] = useState('Founder & Principal Architect');
  const [coverImage, setCoverImage] = useState('');
  const [contentBody, setContentBody] = useState('');
  const [tags, setTags] = useState('');
  const [published, setPublished] = useState(true);

  const loadArticles = async () => {
    setLoading(true);
    try {
      const data = await api.getArticles();
      setArticles(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const openCreateModal = () => {
    setEditingArticle(null);
    setTitle('');
    setExcerpt('');
    setCategory('Materiality');
    setReadTime('6 min read');
    setAuthorName('Éléonore de Vauquelin');
    setAuthorRole('Founder & Principal Architect');
    setCoverImage('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85');
    setContentBody('The true luxury of an interior resides in materials that speak back through texture, weight, and honest imperfection.\n\nWhen we walk barefoot across a honed silver travertine floor, our body grounds in physical reality.');
    setTags('Materiality, Stone, Architecture, Design');
    setPublished(true);
    setModalOpen(true);
  };

  const openEditModal = (art: JournalArticle) => {
    setEditingArticle(art);
    setTitle(art.title);
    setExcerpt(art.excerpt);
    setCategory(art.category);
    setReadTime(art.readTime);
    setAuthorName(art.authorName);
    setAuthorRole(art.authorRole);
    setCoverImage(art.coverImage);
    const body = art.content.map(c => c.text).filter(Boolean).join('\n\n');
    setContentBody(body);
    setTags(art.tags.join(', '));
    setPublished(art.published);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const paragraphs = contentBody
      .split('\n\n')
      .map(p => p.trim())
      .filter(Boolean)
      .map(text => ({ type: 'paragraph' as const, text }));

    const tagsArray = tags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const articleData = {
      title,
      excerpt,
      category,
      readTime,
      authorName,
      authorRole,
      coverImage,
      content: paragraphs,
      tags: tagsArray,
      published
    };

    if (editingArticle) {
      await api.updateArticle(editingArticle.id, articleData);
    } else {
      await api.createArticle(articleData);
    }

    setModalOpen(false);
    await loadArticles();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this journal essay?')) return;
    await api.deleteArticle(id);
    await loadArticles();
  };

  const handleTogglePublish = async (art: JournalArticle) => {
    await api.updateArticle(art.id, { published: !art.published });
    await loadArticles();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-beige-300 pb-6">
        <div>
          <span className="text-[10px] uppercase tracking-widest-luxury text-earth font-semibold block">
            Editorial Publications
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-light">
            Journal Essays & Articles ({articles.length})
          </h1>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 bg-charcoal text-ivory text-xs uppercase tracking-luxury hover:bg-earth transition-colors flex items-center space-x-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Compose Essay</span>
        </button>
      </div>

      {/* Articles Table */}
      <div className="bg-ivory border border-beige-300 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-taupe font-serif text-lg italic">
            Retrieving journal archives...
          </div>
        ) : articles.length === 0 ? (
          <div className="p-12 text-center text-taupe space-y-4">
            <p className="font-serif text-xl text-charcoal">No journal essays published yet.</p>
            <button
              onClick={openCreateModal}
              className="text-xs uppercase tracking-luxury text-earth underline"
            >
              Compose your inaugural monograph
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-beige-100 text-charcoal uppercase tracking-wider text-[10px] border-b border-beige-300">
                <tr>
                  <th className="py-4 px-6 font-semibold">Cover</th>
                  <th className="py-4 px-6 font-semibold">Article Title</th>
                  <th className="py-4 px-6 font-semibold">Category</th>
                  <th className="py-4 px-6 font-semibold">Author</th>
                  <th className="py-4 px-6 font-semibold">Read Time</th>
                  <th className="py-4 px-6 font-semibold">Status</th>
                  <th className="py-4 px-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-beige-200 text-charcoal/90">
                {articles.map((art) => (
                  <tr key={art.id} className="hover:bg-beige-50 transition-colors">
                    <td className="py-3 px-6">
                      <img
                        src={art.coverImage}
                        alt={art.title}
                        className="w-16 h-12 object-cover border border-beige-300"
                      />
                    </td>
                    <td className="py-3 px-6">
                      <p className="font-serif text-sm font-medium text-charcoal">{art.title}</p>
                      <p className="text-[11px] text-taupe line-clamp-1">{art.excerpt}</p>
                    </td>
                    <td className="py-3 px-6">
                      <span className="px-2 py-0.5 bg-beige-200 text-charcoal text-[10px] uppercase tracking-wider">
                        {art.category}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-taupe">{art.authorName}</td>
                    <td className="py-3 px-6 text-taupe">{art.readTime}</td>
                    <td className="py-3 px-6">
                      <button
                        onClick={() => handleTogglePublish(art)}
                        className={`inline-flex items-center space-x-1 px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold ${
                          art.published ? 'bg-green-100 text-green-800' : 'bg-beige-300 text-charcoal'
                        }`}
                      >
                        {art.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{art.published ? 'Published' : 'Draft'}</span>
                      </button>
                    </td>
                    <td className="py-3 px-6 text-right space-x-3">
                      <button
                        onClick={() => openEditModal(art)}
                        className="text-taupe hover:text-charcoal p-1"
                        title="Edit Article"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(art.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete Article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Article Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-ivory max-w-3xl w-full border border-beige-300 shadow-2xl p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-beige-300 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-earth font-semibold">
                  Editorial Publication
                </span>
                <h2 className="font-serif text-2xl text-charcoal">
                  {editingArticle ? 'Edit Journal Monograph' : 'Compose New Journal Essay'}
                </h2>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-taupe hover:text-charcoal p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              <div className="space-y-1.5">
                <label className="uppercase tracking-wider font-semibold text-charcoal block">Essay Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. The Quiet Luxury of Tactility"
                  className="w-full p-2.5 bg-beige-50 border border-beige-300 text-charcoal text-xs focus:outline-none focus:border-earth"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="uppercase tracking-wider font-semibold text-charcoal block">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as JournalCategory)}
                    className="w-full p-2.5 bg-beige-50 border border-beige-300 text-charcoal text-xs focus:outline-none focus:border-earth"
                  >
                    <option value="Materiality">Materiality</option>
                    <option value="Design Philosophy">Design Philosophy</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Space Planning">Space Planning</option>
                    <option value="Curated Living">Curated Living</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="uppercase tracking-wider font-semibold text-charcoal block">Estimated Read Time</label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="e.g. 6 min read"
                    className="w-full p-2.5 bg-beige-50 border border-beige-300 text-charcoal text-xs focus:outline-none focus:border-earth"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="uppercase tracking-wider font-semibold text-charcoal block">Author Name</label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full p-2.5 bg-beige-50 border border-beige-300 text-charcoal text-xs focus:outline-none focus:border-earth"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="uppercase tracking-wider font-semibold text-charcoal block">Author Role</label>
                  <input
                    type="text"
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    className="w-full p-2.5 bg-beige-50 border border-beige-300 text-charcoal text-xs focus:outline-none focus:border-earth"
                  />
                </div>
              </div>

              {/* Cover Image URL */}
              <div className="space-y-1.5">
                <label className="uppercase tracking-wider font-semibold text-charcoal block">Cover Image URL *</label>
                <input
                  type="text"
                  required
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 bg-beige-50 border border-beige-300 text-charcoal text-xs focus:outline-none focus:border-earth"
                />
              </div>

              {/* Lead Excerpt */}
              <div className="space-y-1.5">
                <label className="uppercase tracking-wider font-semibold text-charcoal block">Lead Excerpt *</label>
                <textarea
                  required
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="A compelling introductory thesis..."
                  className="w-full p-2.5 bg-beige-50 border border-beige-300 text-charcoal text-xs focus:outline-none focus:border-earth font-light"
                />
              </div>

              {/* Body Content */}
              <div className="space-y-1.5">
                <label className="uppercase tracking-wider font-semibold text-charcoal block">
                  Essay Manuscript (Separate paragraphs with double enter)
                </label>
                <textarea
                  required
                  rows={6}
                  value={contentBody}
                  onChange={(e) => setContentBody(e.target.value)}
                  placeholder="Draft the complete essay text here..."
                  className="w-full p-2.5 bg-beige-50 border border-beige-300 text-charcoal text-xs focus:outline-none focus:border-earth font-light"
                />
              </div>

              {/* Tags */}
              <div className="space-y-1.5">
                <label className="uppercase tracking-wider font-semibold text-charcoal block">Tags (comma separated)</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Travertine, Architecture, Craftsmanship"
                  className="w-full p-2.5 bg-beige-50 border border-beige-300 text-charcoal text-xs focus:outline-none focus:border-earth"
                />
              </div>

              {/* Published checkbox */}
              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-4 h-4 text-earth focus:ring-earth rounded-none"
                />
                <label htmlFor="published" className="text-xs text-charcoal font-medium cursor-pointer">
                  Publish essay immediately to public journal
                </label>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-beige-300">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 border border-beige-300 text-charcoal hover:bg-beige-200 uppercase tracking-luxury font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-charcoal text-ivory hover:bg-earth uppercase tracking-luxury font-medium"
                >
                  {editingArticle ? 'Save Changes' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
