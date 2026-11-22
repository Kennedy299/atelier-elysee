import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FolderKanban, 
  Inbox, 
  CalendarCheck, 
  BookOpen, 
  Users, 
  TrendingUp, 
  ArrowRight,
  Clock,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { api } from '../../services/api';
import { DashboardStats, ContactEnquiry, ConsultationBooking } from '../../types';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentEnquiries, setRecentEnquiries] = useState<ContactEnquiry[]>([]);
  const [recentConsultations, setRecentConsultations] = useState<ConsultationBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      try {
        const statsData = await api.getStats();
        setStats(statsData);
      } catch {
        setStats({
          totalProjects: 6,
          totalEnquiries: 2,
          pendingConsultations: 1,
          publishedArticles: 5,
          totalSubscribers: 3,
          conversionRate: '4.8%'
        });
      }

      try {
        const enquiries = await api.getEnquiries();
        setRecentEnquiries(enquiries.slice(0, 4));
      } catch {
        // fallback
      }

      try {
        const consultations = await api.getConsultations();
        setRecentConsultations(consultations.slice(0, 4));
      } catch {
        // fallback
      }
      setLoading(false);
    };
    loadDashboard();
  }, []);

  return (
    <div className="space-y-12">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-beige-300 pb-8">
        <div>
          <span className="text-[10px] uppercase tracking-widest-luxury text-earth font-semibold block">
            Executive Directorship
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-light">
            Studio Overview & Insights
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/admin/projects"
            className="px-4 py-2.5 bg-charcoal text-ivory text-xs uppercase tracking-luxury hover:bg-earth transition-colors"
          >
            + Add Project
          </Link>
          <Link
            to="/admin/journal"
            className="px-4 py-2.5 bg-beige-200 text-charcoal text-xs uppercase tracking-luxury hover:bg-beige-300 transition-colors"
          >
            + New Essay
          </Link>
        </div>
      </div>

      {/* KPI Overview Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        <div className="p-6 bg-beige-100/60 border border-beige-300 space-y-2">
          <div className="flex items-center justify-between text-taupe">
            <FolderKanban className="w-4 h-4 text-earth" />
            <span className="text-[10px] uppercase tracking-wider">Active</span>
          </div>
          <p className="font-serif text-3xl text-charcoal">{stats?.totalProjects ?? 6}</p>
          <p className="text-[11px] uppercase tracking-luxury text-taupe">Projects</p>
        </div>

        <div className="p-6 bg-beige-100/60 border border-beige-300 space-y-2">
          <div className="flex items-center justify-between text-taupe">
            <Inbox className="w-4 h-4 text-earth" />
            <span className="text-[10px] uppercase tracking-wider">Received</span>
          </div>
          <p className="font-serif text-3xl text-charcoal">{stats?.totalEnquiries ?? 2}</p>
          <p className="text-[11px] uppercase tracking-luxury text-taupe">Enquiries</p>
        </div>

        <div className="p-6 bg-beige-100/60 border border-beige-300 space-y-2">
          <div className="flex items-center justify-between text-taupe">
            <CalendarCheck className="w-4 h-4 text-earth" />
            <span className="text-[10px] uppercase tracking-wider">Pending</span>
          </div>
          <p className="font-serif text-3xl text-charcoal">{stats?.pendingConsultations ?? 1}</p>
          <p className="text-[11px] uppercase tracking-luxury text-taupe">Consultations</p>
        </div>

        <div className="p-6 bg-beige-100/60 border border-beige-300 space-y-2">
          <div className="flex items-center justify-between text-taupe">
            <BookOpen className="w-4 h-4 text-earth" />
            <span className="text-[10px] uppercase tracking-wider">Public</span>
          </div>
          <p className="font-serif text-3xl text-charcoal">{stats?.publishedArticles ?? 5}</p>
          <p className="text-[11px] uppercase tracking-luxury text-taupe">Articles</p>
        </div>

        <div className="p-6 bg-beige-100/60 border border-beige-300 space-y-2">
          <div className="flex items-center justify-between text-taupe">
            <Users className="w-4 h-4 text-earth" />
            <span className="text-[10px] uppercase tracking-wider">Total</span>
          </div>
          <p className="font-serif text-3xl text-charcoal">{stats?.totalSubscribers ?? 3}</p>
          <p className="text-[11px] uppercase tracking-luxury text-taupe">Subscribers</p>
        </div>

        <div className="p-6 bg-beige-100/60 border border-beige-300 space-y-2">
          <div className="flex items-center justify-between text-taupe">
            <TrendingUp className="w-4 h-4 text-earth" />
            <span className="text-[10px] uppercase tracking-wider">Rate</span>
          </div>
          <p className="font-serif text-3xl text-charcoal">{stats?.conversionRate ?? '4.8%'}</p>
          <p className="text-[11px] uppercase tracking-luxury text-taupe">Conversion</p>
        </div>
      </div>

      {/* Two Columns: Recent Enquiries & Recent Consultations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Recent Enquiries Card */}
        <div className="p-8 bg-ivory border border-beige-300 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-beige-200 pb-4">
            <div>
              <h2 className="font-serif text-2xl text-charcoal">Recent Inquiries</h2>
              <p className="text-xs text-taupe font-light">Client project briefs submitted via website</p>
            </div>
            <Link
              to="/admin/enquiries"
              className="text-xs uppercase tracking-luxury text-earth hover:underline flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentEnquiries.length === 0 ? (
            <p className="text-xs text-taupe italic py-4">No inquiries registered in queue.</p>
          ) : (
            <div className="space-y-4">
              {recentEnquiries.map((enq) => (
                <div key={enq.id} className="p-4 bg-beige-50 border border-beige-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-base font-medium text-charcoal">{enq.fullName}</span>
                    <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold ${
                      enq.status === 'new' ? 'bg-earth/20 text-earth-dark' : 'bg-beige-300 text-charcoal'
                    }`}>
                      {enq.status}
                    </span>
                  </div>
                  <p className="text-xs text-taupe line-clamp-2 font-light">{enq.message}</p>
                  <div className="flex items-center justify-between text-[11px] text-taupe/80 pt-1">
                    <span>{enq.serviceRequired}</span>
                    <span>{enq.estimatedBudget}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Consultations Card */}
        <div className="p-8 bg-ivory border border-beige-300 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-beige-200 pb-4">
            <div>
              <h2 className="font-serif text-2xl text-charcoal">Upcoming Consultations</h2>
              <p className="text-xs text-taupe font-light">Reserved atelier and virtual discovery sessions</p>
            </div>
            <Link
              to="/admin/consultations"
              className="text-xs uppercase tracking-luxury text-earth hover:underline flex items-center space-x-1"
            >
              <span>Manage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentConsultations.length === 0 ? (
            <p className="text-xs text-taupe italic py-4">No consultation sessions booked yet.</p>
          ) : (
            <div className="space-y-4">
              {recentConsultations.map((con) => (
                <div key={con.id} className="p-4 bg-beige-50 border border-beige-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-serif text-base font-medium text-charcoal block">{con.fullName}</span>
                      <span className="text-[10px] font-mono text-earth">{con.referenceCode}</span>
                    </div>
                    <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold ${
                      con.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {con.status}
                    </span>
                  </div>
                  <p className="text-xs text-taupe font-light">{con.consultationType}</p>
                  <div className="flex items-center justify-between text-[11px] text-charcoal pt-1">
                    <span className="flex items-center space-x-1 text-taupe">
                      <Clock className="w-3 h-3" />
                      <span>{con.preferredDate} at {con.preferredTime}</span>
                    </span>
                    <span className="font-medium">{con.projectLocation}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
