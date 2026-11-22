import React, { useState, useEffect } from 'react';
import { 
  FolderKanban, 
  Plus, 
  Edit, 
  Trash2, 
  Star, 
  X, 
  Upload, 
  Check, 
  ExternalLink 
} from 'lucide-react';
import { api } from '../../services/api';
import { Project, ProjectCategory } from '../../types';

export const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('Residential');
  const [location, setLocation] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [area, setArea] = useState('350 m²');
  const [concept, setConcept] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [materials, setMaterials] = useState('');
  const [clientBrief, setClientBrief] = useState('');
  const [challengeSolution, setChallengeSolution] = useState('');
  const [beforeImage, setBeforeImage] = useState('');
  const [afterImage, setAfterImage] = useState('');
  const [featured, setFeatured] = useState(false);
  const [uploading, setUploading] = useState(false);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await api.getProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setTitle('');
    setSubtitle('');
    setCategory('Residential');
    setLocation('');
    setYear(new Date().getFullYear());
    setArea('350 m²');
    setConcept('');
    setCoverImage('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85');
    setMaterials('Roman Travertine, French White Oak, Lime Wash, Aged Bronze');
    setClientBrief('');
    setChallengeSolution('');
    setBeforeImage('');
    setAfterImage('');
    setFeatured(false);
    setModalOpen(true);
  };

  const openEditModal = (p: Project) => {
    setEditingProject(p);
    setTitle(p.title);
    setSubtitle(p.subtitle);
    setCategory(p.category);
    setLocation(p.location);
    setYear(p.year);
    setArea(p.area);
    setConcept(p.concept);
    setCoverImage(p.coverImage);
    setMaterials(p.materials.join(', '));
    setClientBrief(p.clientBrief || '');
    setChallengeSolution(p.challengeSolution || '');
    setBeforeImage(p.beforeImage || '');
    setAfterImage(p.afterImage || '');
    setFeatured(p.featured);
    setModalOpen(true);
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploading(true);
    try {
      const res = await api.uploadImage(file);
      setCoverImage(res.url);
    } catch (err) {
      alert('Upload failed or backend is in demo mode. You can paste an image URL directly.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const materialsArray = materials
      .split(',')
      .map(m => m.trim())
      .filter(Boolean);

    const projectData = {
      title,
      subtitle,
      category,
      location,
      year: Number(year),
      area,
      concept,
      coverImage,
      galleryImages: [coverImage],
      materials: materialsArray,
      clientBrief,
      challengeSolution,
      beforeImage: beforeImage || undefined,
      afterImage: afterImage || undefined,
      featured
    };

    if (editingProject) {
      await api.updateProject(editingProject.id, projectData);
    } else {
      await api.createProject(projectData);
    }

    setModalOpen(false);
    await loadProjects();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this architectural project?')) return;
    await api.deleteProject(id);
    await loadProjects();
  };

  const handleToggleFeatured = async (p: Project) => {
    await api.updateProject(p.id, { featured: !p.featured });
    await loadProjects();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-beige-300 pb-6">
        <div>
          <span className="text-[10px] uppercase tracking-widest-luxury text-earth font-semibold block">
            Portfolio Management
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-light">
            Architectural Projects ({projects.length})
          </h1>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 bg-charcoal text-ivory text-xs uppercase tracking-luxury hover:bg-earth transition-colors flex items-center space-x-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects Table */}
      <div className="bg-ivory border border-beige-300 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-taupe font-serif text-lg italic">
            Retrieving portfolio database...
          </div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center text-taupe space-y-4">
            <p className="font-serif text-xl text-charcoal">No projects currently registered.</p>
            <button
              onClick={openCreateModal}
              className="text-xs uppercase tracking-luxury text-earth underline"
            >
              Create your first project dossier
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-beige-100 text-charcoal uppercase tracking-wider text-[10px] border-b border-beige-300">
                <tr>
                  <th className="py-4 px-6 font-semibold">Thumbnail</th>
                  <th className="py-4 px-6 font-semibold">Project Title</th>
                  <th className="py-4 px-6 font-semibold">Category</th>
                  <th className="py-4 px-6 font-semibold">Location</th>
                  <th className="py-4 px-6 font-semibold">Year</th>
                  <th className="py-4 px-6 font-semibold">Featured</th>
                  <th className="py-4 px-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-beige-200 text-charcoal/90">
                {projects.map((p) => (
                  <tr key={p.id} className="hover:bg-beige-50 transition-colors">
                    <td className="py-3 px-6">
                      <img
                        src={p.coverImage}
                        alt={p.title}
                        className="w-16 h-12 object-cover border border-beige-300"
                      />
                    </td>
                    <td className="py-3 px-6">
                      <p className="font-serif text-sm font-medium text-charcoal">{p.title}</p>
                      <p className="text-[11px] text-taupe">{p.subtitle}</p>
                    </td>
                    <td className="py-3 px-6">
                      <span className="px-2 py-0.5 bg-beige-200 text-charcoal text-[10px] uppercase tracking-wider">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-taupe">{p.location}</td>
                    <td className="py-3 px-6">{p.year}</td>
                    <td className="py-3 px-6">
                      <button
                        onClick={() => handleToggleFeatured(p)}
                        className={`p-1 transition-colors ${
                          p.featured ? 'text-amber-500 hover:text-amber-600' : 'text-taupe/40 hover:text-taupe'
                        }`}
                        title={p.featured ? 'Featured on Homepage' : 'Mark as Featured'}
                      >
                        <Star className={`w-4 h-4 ${p.featured ? 'fill-current' : ''}`} />
                      </button>
                    </td>
                    <td className="py-3 px-6 text-right space-x-3">
                      <button
                        onClick={() => openEditModal(p)}
                        className="text-taupe hover:text-charcoal p-1"
                        title="Edit Project"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete Project"
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

      {/* Add / Edit Project Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-ivory max-w-3xl w-full border border-beige-300 shadow-2xl p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-beige-300 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-earth font-semibold">
                  Portfolio Record
                </span>
                <h2 className="font-serif text-2xl text-charcoal">
                  {editingProject ? 'Edit Architectural Project' : 'Create New Project Dossier'}
                </h2>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-taupe hover:text-charcoal p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="uppercase tracking-wider font-semibold text-charcoal block">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. The Haussmann Pavilion"
                    className="w-full p-2.5 bg-beige-50 border border-beige-300 text-charcoal text-xs focus:outline-none focus:border-earth"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="uppercase tracking-wider font-semibold text-charcoal block">Subtitle</label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Brief poetic descriptor"
                    className="w-full p-2.5 bg-beige-50 border border-beige-300 text-charcoal text-xs focus:outline-none focus:border-earth"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="uppercase tracking-wider font-semibold text-charcoal block">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                    className="w-full p-2.5 bg-beige-50 border border-beige-300 text-charcoal text-xs focus:outline-none focus:border-earth"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Renovation">Renovation</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="uppercase tracking-wider font-semibold text-charcoal block">Location *</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Paris 8e"
                    className="w-full p-2.5 bg-beige-50 border border-beige-300 text-charcoal text-xs focus:outline-none focus:border-earth"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="uppercase tracking-wider font-semibold text-charcoal block">Year</label>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full p-2.5 bg-beige-50 border border-beige-300 text-charcoal text-xs focus:outline-none focus:border-earth"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="uppercase tracking-wider font-semibold text-charcoal block">Floor Area</label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="340 m²"
                    className="w-full p-2.5 bg-beige-50 border border-beige-300 text-charcoal text-xs focus:outline-none focus:border-earth"
                  />
                </div>
              </div>

              {/* Cover Image & Upload */}
              <div className="space-y-1.5">
                <label className="uppercase tracking-wider font-semibold text-charcoal block">Cover Image URL *</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    required
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 p-2.5 bg-beige-50 border border-beige-300 text-charcoal text-xs focus:outline-none focus:border-earth"
                  />
                  <label className="px-4 py-2.5 bg-beige-200 text-charcoal text-xs uppercase tracking-wider font-medium cursor-pointer hover:bg-beige-300 flex items-center space-x-1.5">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploading ? 'Uploading...' : 'Upload'}</span>
                    <input type="file" accept="image/*" onChange={handleImageFileUpload} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Concept Narrative */}
              <div className="space-y-1.5">
                <label className="uppercase tracking-wider font-semibold text-charcoal block">Architectural Concept *</label>
                <textarea
                  required
                  rows={4}
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                  placeholder="Detail the spatial vision, daylight orientation, and volumetric philosophy..."
                  className="w-full p-2.5 bg-beige-50 border border-beige-300 text-charcoal text-xs focus:outline-none focus:border-earth font-light"
                />
              </div>

              {/* Materials */}
              <div className="space-y-1.5">
                <label className="uppercase tracking-wider font-semibold text-charcoal block">Materials (comma separated)</label>
                <input
                  type="text"
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  placeholder="e.g. Silver Travertine, French Oak, Lime Wash, Burnished Bronze"
                  className="w-full p-2.5 bg-beige-50 border border-beige-300 text-charcoal text-xs focus:outline-none focus:border-earth"
                />
              </div>

              {/* Before & After Images */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="uppercase tracking-wider font-semibold text-charcoal block">Before Image URL (Optional)</label>
                  <input
                    type="text"
                    value={beforeImage}
                    onChange={(e) => setBeforeImage(e.target.value)}
                    placeholder="https://..."
                    className="w-full p-2.5 bg-beige-50 border border-beige-300 text-charcoal text-xs focus:outline-none focus:border-earth"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="uppercase tracking-wider font-semibold text-charcoal block">After Image URL (Optional)</label>
                  <input
                    type="text"
                    value={afterImage}
                    onChange={(e) => setAfterImage(e.target.value)}
                    placeholder="https://..."
                    className="w-full p-2.5 bg-beige-50 border border-beige-300 text-charcoal text-xs focus:outline-none focus:border-earth"
                  />
                </div>
              </div>

              {/* Featured Checkbox */}
              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 text-earth focus:ring-earth rounded-none"
                />
                <label htmlFor="featured" className="text-xs text-charcoal font-medium cursor-pointer">
                  Feature this project on the homepage showcase
                </label>
              </div>

              {/* Modal Action Buttons */}
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
                  {editingProject ? 'Save Changes' : 'Publish Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
