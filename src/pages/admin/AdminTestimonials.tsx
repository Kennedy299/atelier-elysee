import React, { useState, useEffect } from 'react';
import { 
  MessageSquareQuote, 
  Plus, 
  Edit, 
  Trash2, 
  Star, 
  X, 
  Quote 
} from 'lucide-react';
import { api } from '../../services/api';
import { Testimonial } from '../../types';

export const AdminTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  // Form State
  const [clientName, setClientName] = useState('');
  const [clientRole, setClientRole] = useState('');
  const [location, setLocation] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(true);

  const loadTestimonials = async () => {
    setLoading(true);
    try {
      const data = await api.getTestimonials();
      setTestimonials(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const openCreateModal = () => {
    setEditingTestimonial(null);
    setClientName('');
    setClientRole('Private Patron');
    setLocation('Paris, France');
    setProjectTitle('Private Residence');
    setQuote('');
    setRating(5);
    setAvatarUrl('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80');
    setIsFeatured(true);
    setModalOpen(true);
  };

  const openEditModal = (t: Testimonial) => {
    setEditingTestimonial(t);
    setClientName(t.clientName);
    setClientRole(t.clientRole);
    setLocation(t.location);
    setProjectTitle(t.projectTitle);
    setQuote(t.quote);
    setRating(t.rating);
    setAvatarUrl(t.avatarUrl || '');
    setIsFeatured(t.isFeatured);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      clientName,
      clientRole,
      location,
      projectTitle,
      quote,
      rating: Number(rating),
      avatarUrl: avatarUrl || undefined,
      isFeatured
    };

    if (editingTestimonial) {
      await api.updateTestimonial(editingTestimonial.id, data);
    } else {
      await api.createTestimonial(data);
    }

    setModalOpen(false);
    await loadTestimonials();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this client testimonial?')) return;
    await api.deleteTestimonial(id);
    await loadTestimonials();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-beige-300 pb-6">
        <div>
          <span className="text-[10px] uppercase tracking-widest-luxury text-earth font-semibold block">
            Client Commendations
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-light">
            Testimonials & Reviews ({testimonials.length})
          </h1>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 bg-charcoal text-ivory text-xs uppercase tracking-luxury hover:bg-earth transition-colors flex items-center space-x-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Grid of Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-12 text-center text-taupe font-serif text-lg italic">
            Retrieving client reviews...
          </div>
        ) : testimonials.length === 0 ? (
          <div className="col-span-full p-12 text-center text-taupe">
            No testimonials currently registered.
          </div>
        ) : (
          testimonials.map((t) => (
            <div key={t.id} className="p-6 bg-ivory border border-beige-300 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-amber-500">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  {t.isFeatured && (
                    <span className="px-2 py-0.5 bg-earth/20 text-earth-dark text-[9px] uppercase tracking-wider font-semibold">
                      Featured
                    </span>
                  )}
                </div>
                <p className="font-serif text-sm italic text-charcoal leading-relaxed line-clamp-4">
                  “{t.quote}”
                </p>
              </div>

              <div className="pt-4 border-t border-beige-200 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-semibold text-charcoal">{t.clientName}</h4>
                  <p className="text-[10px] text-taupe">{t.clientRole} — {t.location}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openEditModal(t)}
                    className="text-taupe hover:text-charcoal p-1"
                    title="Edit"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Testimonial Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-ivory max-w-lg w-full border border-beige-300 shadow-2xl p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-beige-300 pb-4">
              <h2 className="font-serif text-2xl text-charcoal">
                {editingTestimonial ? 'Edit Client Testimonial' : 'Add New Client Testimonial'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-taupe hover:text-charcoal p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="uppercase tracking-wider font-semibold text-charcoal block">Client Name *</label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Antoine & Sylvie de Montalembert"
                  className="w-full p-2.5 bg-beige-50 border border-beige-300 text-charcoal text-xs focus:outline-none focus:border-earth"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="uppercase tracking-wider font-semibold text-charcoal block">Role / Title</label>
                  <input
                    type="text"
                    value={clientRole}
                    onChange={(e) => setClientRole(e.target.value)}
                    placeholder="e.g. Art Collectors"
                    className="w-full p-2.5 bg-beige-50 border border-beige-300 text-charcoal text-xs focus:outline-none focus:border-earth"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider font-semibold text-charcoal block">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Paris, France"
                    className="w-full p-2.5 bg-beige-50 border border-beige-300 text-charcoal text-xs focus:outline-none focus:border-earth"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider font-semibold text-charcoal block">Project Title</label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="e.g. The Haussmann Pavilion"
                  className="w-full p-2.5 bg-beige-50 border border-beige-300 text-charcoal text-xs focus:outline-none focus:border-earth"
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider font-semibold text-charcoal block">Quote Text *</label>
                <textarea
                  required
                  rows={4}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="The client's feedback and commendation..."
                  className="w-full p-2.5 bg-beige-50 border border-beige-300 text-charcoal text-xs focus:outline-none focus:border-earth font-light"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="uppercase tracking-wider font-semibold text-charcoal block">Rating (1 to 5)</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full p-2.5 bg-beige-50 border border-beige-300 text-charcoal text-xs focus:outline-none focus:border-earth"
                  >
                    <option value={5}>5 Stars (Exceptional)</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider font-semibold text-charcoal block">Avatar URL</label>
                  <input
                    type="text"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-2.5 bg-beige-50 border border-beige-300 text-charcoal text-xs focus:outline-none focus:border-earth"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="testFeatured"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 text-earth focus:ring-earth rounded-none"
                />
                <label htmlFor="testFeatured" className="text-xs text-charcoal font-medium cursor-pointer">
                  Feature this testimonial on the homepage
                </label>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-beige-300">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2 border border-beige-300 text-charcoal hover:bg-beige-200 uppercase tracking-luxury font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-charcoal text-ivory hover:bg-earth uppercase tracking-luxury font-medium"
                >
                  {editingTestimonial ? 'Update Review' : 'Add Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
