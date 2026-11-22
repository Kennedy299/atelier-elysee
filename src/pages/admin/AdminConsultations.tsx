import React, { useState, useEffect } from 'react';
import { 
  CalendarCheck, 
  Trash2, 
  Check, 
  Clock, 
  X, 
  Mail, 
  Phone, 
  MapPin,
  Calendar
} from 'lucide-react';
import { api } from '../../services/api';
import { ConsultationBooking } from '../../types';

export const AdminConsultations: React.FC = () => {
  const [consultations, setConsultations] = useState<ConsultationBooking[]>([]);
  const [selectedConsultation, setSelectedConsultation] = useState<ConsultationBooking | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');
  const [loading, setLoading] = useState(true);

  const loadConsultations = async () => {
    setLoading(true);
    try {
      const data = await api.getConsultations();
      setConsultations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConsultations();
  }, []);

  const handleStatusChange = async (id: string, newStatus: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
    await api.updateConsultation(id, { status: newStatus });
    await loadConsultations();
    if (selectedConsultation && selectedConsultation.id === id) {
      setSelectedConsultation({ ...selectedConsultation, status: newStatus });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this consultation booking record?')) return;
    await api.deleteConsultation(id);
    if (selectedConsultation && selectedConsultation.id === id) setSelectedConsultation(null);
    await loadConsultations();
  };

  const filtered = consultations.filter(c => filter === 'all' || c.status === filter);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-beige-300 pb-6">
        <div>
          <span className="text-[10px] uppercase tracking-widest-luxury text-earth font-semibold block">
            Executive Scheduling
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-light">
            Consultation Bookings
          </h1>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map((st) => (
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

      {/* Consultations Table */}
      <div className="bg-ivory border border-beige-300 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-taupe font-serif text-lg italic">
            Retrieving consultation calendar...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-taupe space-y-2">
            <p className="font-serif text-xl text-charcoal">No consultation bookings in this view.</p>
            <p className="text-xs">Requests booked via the public site will automatically be logged here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-beige-100 text-charcoal uppercase tracking-wider text-[10px] border-b border-beige-300">
                <tr>
                  <th className="py-4 px-6 font-semibold">Ref Code</th>
                  <th className="py-4 px-6 font-semibold">Patron Details</th>
                  <th className="py-4 px-6 font-semibold">Format</th>
                  <th className="py-4 px-6 font-semibold">Date & Time</th>
                  <th className="py-4 px-6 font-semibold">Location</th>
                  <th className="py-4 px-6 font-semibold">Status</th>
                  <th className="py-4 px-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-beige-200 text-charcoal/90">
                {filtered.map((con) => (
                  <tr
                    key={con.id}
                    onClick={() => setSelectedConsultation(con)}
                    className="hover:bg-beige-50 transition-colors cursor-pointer"
                  >
                    <td className="py-4 px-6 font-mono font-bold text-earth">{con.referenceCode}</td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-charcoal">{con.fullName}</p>
                      <p className="text-[11px] text-taupe">{con.email}</p>
                    </td>
                    <td className="py-4 px-6 font-serif text-sm">{con.consultationType}</td>
                    <td className="py-4 px-6">
                      <span className="font-medium text-charcoal">{con.preferredDate}</span>
                      <span className="text-taupe block text-[11px]">at {con.preferredTime}</span>
                    </td>
                    <td className="py-4 px-6 text-taupe">{con.projectLocation}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold ${
                        con.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : con.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : con.status === 'completed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {con.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-3" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleDelete(con.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete Consultation"
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

      {/* Consultation Detail Modal */}
      {selectedConsultation && (
        <div className="fixed inset-0 z-50 bg-charcoal/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-ivory max-w-2xl w-full border border-beige-300 shadow-2xl p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-beige-300 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-earth font-mono font-bold">
                  {selectedConsultation.referenceCode}
                </span>
                <h2 className="font-serif text-2xl text-charcoal">{selectedConsultation.fullName}</h2>
              </div>
              <button
                onClick={() => setSelectedConsultation(null)}
                className="text-taupe hover:text-charcoal p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-beige-50 p-4 border border-beige-200">
              <div>
                <p className="text-taupe uppercase text-[10px]">Consultation Type</p>
                <p className="font-medium text-charcoal">{selectedConsultation.consultationType}</p>
              </div>
              <div>
                <p className="text-taupe uppercase text-[10px]">Reserved Schedule</p>
                <p className="font-medium text-charcoal">{selectedConsultation.preferredDate} at {selectedConsultation.preferredTime}</p>
              </div>
              <div>
                <p className="text-taupe uppercase text-[10px]">Email Contact</p>
                <p className="font-medium text-charcoal">{selectedConsultation.email}</p>
              </div>
              <div>
                <p className="text-taupe uppercase text-[10px]">Phone Contact</p>
                <p className="font-medium text-charcoal">{selectedConsultation.phone}</p>
              </div>
              <div>
                <p className="text-taupe uppercase text-[10px]">Location Target</p>
                <p className="font-medium text-charcoal">{selectedConsultation.projectLocation}</p>
              </div>
              <div>
                <p className="text-taupe uppercase text-[10px]">Estimated Budget Tier</p>
                <p className="font-medium text-earth-dark font-semibold">{selectedConsultation.estimatedBudget}</p>
              </div>
            </div>

            {selectedConsultation.projectScope && (
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-luxury text-charcoal font-semibold block">
                  Project Outline
                </label>
                <div className="p-4 bg-beige-100/60 border border-beige-200 text-xs sm:text-sm text-charcoal/90 font-light leading-relaxed">
                  {selectedConsultation.projectScope}
                </div>
              </div>
            )}

            {/* Change Status Buttons */}
            <div className="space-y-2 pt-2">
              <label className="text-xs uppercase tracking-luxury text-charcoal font-semibold block">
                Update Booking Status
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {(['pending', 'confirmed', 'completed', 'cancelled'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedConsultation.id, st)}
                    className={`px-4 py-2 text-xs uppercase tracking-luxury font-medium transition-colors ${
                      selectedConsultation.status === st
                        ? 'bg-charcoal text-ivory'
                        : 'bg-beige-200 text-charcoal hover:bg-beige-300'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
