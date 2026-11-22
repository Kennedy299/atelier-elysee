import React, { useState, useEffect } from 'react';
import { 
  Inbox, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Archive, 
  Mail, 
  Phone, 
  MapPin, 
  Edit3,
  X
} from 'lucide-react';
import { api } from '../../services/api';
import { ContactEnquiry } from '../../types';

export const AdminEnquiries: React.FC = () => {
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState<ContactEnquiry | null>(null);
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'archived'>('all');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);

  const loadEnquiries = async () => {
    setLoading(true);
    try {
      const data = await api.getEnquiries();
      setEnquiries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: 'new' | 'contacted' | 'archived') => {
    await api.updateEnquiry(id, { status: newStatus });
    await loadEnquiries();
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    await api.updateEnquiry(selectedEnquiry.id, { notes });
    await loadEnquiries();
    setSelectedEnquiry({ ...selectedEnquiry, notes });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this client inquiry?')) return;
    await api.deleteEnquiry(id);
    if (selectedEnquiry && selectedEnquiry.id === id) setSelectedEnquiry(null);
    await loadEnquiries();
  };

  const filtered = enquiries.filter(e => filter === 'all' || e.status === filter);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-beige-300 pb-6">
        <div>
          <span className="text-[10px] uppercase tracking-widest-luxury text-earth font-semibold block">
            Directorship Communications
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-light">
            Website Client Enquiries
          </h1>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2">
          {(['all', 'new', 'contacted', 'archived'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 text-xs uppercase tracking-luxury font-medium transition-colors ${
                filter === st
                  ? 'bg-charcoal text-ivory'
                  : 'bg-beige-200 text-charcoal/70 hover:bg-beige-300'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Table & Inspector Modal */}
      <div className="bg-ivory border border-beige-300 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-taupe font-serif text-lg italic">
            Retrieving client communications...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-taupe space-y-2">
            <p className="font-serif text-xl text-charcoal">No inquiries found in this category.</p>
            <p className="text-xs">Incoming project briefs will automatically appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-beige-100 text-charcoal uppercase tracking-wider text-[10px] border-b border-beige-300">
                <tr>
                  <th className="py-4 px-6 font-semibold">Client Name</th>
                  <th className="py-4 px-6 font-semibold">Service</th>
                  <th className="py-4 px-6 font-semibold">Location</th>
                  <th className="py-4 px-6 font-semibold">Budget</th>
                  <th className="py-4 px-6 font-semibold">Status</th>
                  <th className="py-4 px-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-beige-200 text-charcoal/90">
                {filtered.map((enq) => (
                  <tr
                    key={enq.id}
                    onClick={() => { setSelectedEnquiry(enq); setNotes(enq.notes || ''); }}
                    className="hover:bg-beige-50 transition-colors cursor-pointer"
                  >
                    <td className="py-4 px-6">
                      <p className="font-medium text-charcoal">{enq.fullName}</p>
                      <p className="text-[11px] text-taupe">{enq.email}</p>
                    </td>
                    <td className="py-4 px-6">{enq.serviceRequired}</td>
                    <td className="py-4 px-6 text-taupe">{enq.projectLocation}</td>
                    <td className="py-4 px-6 font-medium text-earth-dark">{enq.estimatedBudget}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold ${
                        enq.status === 'new'
                          ? 'bg-earth/20 text-earth-dark'
                          : enq.status === 'contacted'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-beige-300 text-charcoal'
                      }`}>
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-3" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleDelete(enq.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete Inquiry"
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

      {/* Enquiry Detail Drawer / Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-charcoal/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-ivory max-w-2xl w-full border border-beige-300 shadow-2xl p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-beige-300 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-earth font-semibold">
                  Commission Enquiry Dossier
                </span>
                <h2 className="font-serif text-2xl text-charcoal">{selectedEnquiry.fullName}</h2>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="text-taupe hover:text-charcoal p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Client Metadata */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-beige-50 p-4 border border-beige-200">
              <div>
                <p className="text-taupe uppercase text-[10px]">Email Address</p>
                <p className="font-medium text-charcoal">{selectedEnquiry.email}</p>
              </div>
              <div>
                <p className="text-taupe uppercase text-[10px]">Phone Number</p>
                <p className="font-medium text-charcoal">{selectedEnquiry.phone || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-taupe uppercase text-[10px]">Requested Service</p>
                <p className="font-medium text-charcoal">{selectedEnquiry.serviceRequired}</p>
              </div>
              <div>
                <p className="text-taupe uppercase text-[10px]">Project Location</p>
                <p className="font-medium text-charcoal">{selectedEnquiry.projectLocation}</p>
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-luxury text-charcoal font-semibold block">
                Client Project Message
              </label>
              <div className="p-4 bg-beige-100/60 border border-beige-200 text-xs sm:text-sm text-charcoal/90 font-light leading-relaxed whitespace-pre-wrap">
                {selectedEnquiry.message}
              </div>
            </div>

            {/* Status Selector */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-luxury text-charcoal font-semibold block">
                Workflow Status
              </label>
              <div className="flex items-center space-x-3">
                {(['new', 'contacted', 'archived'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedEnquiry.id, st)}
                    className={`px-4 py-2 text-xs uppercase tracking-luxury font-medium transition-colors ${
                      selectedEnquiry.status === st
                        ? 'bg-charcoal text-ivory'
                        : 'bg-beige-200 text-charcoal hover:bg-beige-300'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Internal Director Notes */}
            <div className="space-y-2 pt-2">
              <label className="text-xs uppercase tracking-luxury text-charcoal font-semibold block">
                Internal Director Notes
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Log internal follow-up discussions, contractor estimates, or meeting notes..."
                className="w-full p-3 bg-beige-50 border border-beige-300 text-xs text-charcoal focus:outline-none focus:border-earth"
              />
              <button
                type="button"
                onClick={handleSaveNotes}
                className="px-4 py-2 bg-earth text-white text-xs uppercase tracking-luxury hover:bg-earth-dark transition-colors"
              >
                Save Director Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
