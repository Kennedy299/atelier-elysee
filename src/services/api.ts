import { 
  Project, 
  Service, 
  JournalArticle, 
  Testimonial, 
  ContactEnquiry, 
  ConsultationBooking, 
  NewsletterSubscriber, 
  DashboardStats 
} from '../types';
import { 
  INITIAL_PROJECTS, 
  INITIAL_SERVICES, 
  INITIAL_ARTICLES, 
  INITIAL_TESTIMONIALS 
} from '../data/initialData';

const API_BASE = '/api';

const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('elysee_admin_token') || 'elysee-luxury-session-token';
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const api = {
  // Projects
  async getProjects(category?: string): Promise<Project[]> {
    try {
      const url = category && category !== 'All' ? `${API_BASE}/projects?category=${encodeURIComponent(category)}` : `${API_BASE}/projects`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch projects');
      return await res.json();
    } catch {
      if (!category || category === 'All') return INITIAL_PROJECTS;
      return INITIAL_PROJECTS.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
  },

  async getProjectBySlug(slug: string): Promise<Project | null> {
    try {
      const res = await fetch(`${API_BASE}/projects/${slug}`);
      if (!res.ok) throw new Error('Project not found');
      return await res.json();
    } catch {
      return INITIAL_PROJECTS.find(p => p.slug === slug || p.id === slug) || null;
    }
  },

  async createProject(project: Partial<Project>): Promise<Project> {
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(project)
    });
    if (!res.ok) throw new Error('Failed to create project');
    return await res.json();
  },

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update project');
    return await res.json();
  },

  async deleteProject(id: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.ok;
  },

  // Services
  async getServices(): Promise<Service[]> {
    try {
      const res = await fetch(`${API_BASE}/services`);
      if (!res.ok) throw new Error('Failed to fetch services');
      return await res.json();
    } catch {
      return INITIAL_SERVICES;
    }
  },

  async getServiceBySlug(slug: string): Promise<Service | null> {
    try {
      const res = await fetch(`${API_BASE}/services/${slug}`);
      if (!res.ok) throw new Error('Service not found');
      return await res.json();
    } catch {
      return INITIAL_SERVICES.find(s => s.slug === slug || s.id === slug) || null;
    }
  },

  // Journal Articles
  async getArticles(category?: string): Promise<JournalArticle[]> {
    try {
      const url = category && category !== 'All' ? `${API_BASE}/articles?category=${encodeURIComponent(category)}` : `${API_BASE}/articles`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch articles');
      return await res.json();
    } catch {
      if (!category || category === 'All') return INITIAL_ARTICLES;
      return INITIAL_ARTICLES.filter(a => a.category.toLowerCase() === category.toLowerCase());
    }
  },

  async getArticleBySlug(slug: string): Promise<JournalArticle | null> {
    try {
      const res = await fetch(`${API_BASE}/articles/${slug}`);
      if (!res.ok) throw new Error('Article not found');
      return await res.json();
    } catch {
      return INITIAL_ARTICLES.find(a => a.slug === slug || a.id === slug) || null;
    }
  },

  async createArticle(article: Partial<JournalArticle>): Promise<JournalArticle> {
    const res = await fetch(`${API_BASE}/articles`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(article)
    });
    if (!res.ok) throw new Error('Failed to create article');
    return await res.json();
  },

  async updateArticle(id: string, updates: Partial<JournalArticle>): Promise<JournalArticle> {
    const res = await fetch(`${API_BASE}/articles/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update article');
    return await res.json();
  },

  async deleteArticle(id: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/articles/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.ok;
  },

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    try {
      const res = await fetch(`${API_BASE}/testimonials`);
      if (!res.ok) throw new Error('Failed to fetch testimonials');
      return await res.json();
    } catch {
      return INITIAL_TESTIMONIALS;
    }
  },

  async createTestimonial(t: Partial<Testimonial>): Promise<Testimonial> {
    const res = await fetch(`${API_BASE}/testimonials`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(t)
    });
    if (!res.ok) throw new Error('Failed to create testimonial');
    return await res.json();
  },

  async updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<Testimonial> {
    const res = await fetch(`${API_BASE}/testimonials/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update testimonial');
    return await res.json();
  },

  async deleteTestimonial(id: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/testimonials/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.ok;
  },

  // Contact Enquiries
  async submitEnquiry(enquiry: Omit<ContactEnquiry, 'id' | 'status' | 'createdAt'>): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiry)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Submission failed' }));
      throw new Error(err.error || 'Submission failed');
    }
    return await res.json();
  },

  async getEnquiries(): Promise<ContactEnquiry[]> {
    const res = await fetch(`${API_BASE}/enquiries`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to load enquiries');
    return await res.json();
  },

  async updateEnquiry(id: string, updates: Partial<ContactEnquiry>): Promise<ContactEnquiry> {
    const res = await fetch(`${API_BASE}/enquiries/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update enquiry');
    return await res.json();
  },

  async deleteEnquiry(id: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/enquiries/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.ok;
  },

  // Consultation Bookings
  async bookConsultation(booking: Omit<ConsultationBooking, 'id' | 'referenceCode' | 'status' | 'createdAt'>): Promise<{ success: boolean; booking: ConsultationBooking }> {
    const res = await fetch(`${API_BASE}/consultations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Booking failed' }));
      throw new Error(err.error || 'Booking failed');
    }
    return await res.json();
  },

  async getConsultations(): Promise<ConsultationBooking[]> {
    const res = await fetch(`${API_BASE}/consultations`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to load consultations');
    return await res.json();
  },

  async updateConsultation(id: string, updates: Partial<ConsultationBooking>): Promise<ConsultationBooking> {
    const res = await fetch(`${API_BASE}/consultations/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update consultation');
    return await res.json();
  },

  async deleteConsultation(id: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/consultations/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.ok;
  },

  // Newsletter
  async subscribeNewsletter(email: string, source: string = 'website_footer'): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE}/subscribers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Subscription failed' }));
      throw new Error(err.error || 'Subscription failed');
    }
    return await res.json();
  },

  async getSubscribers(): Promise<NewsletterSubscriber[]> {
    const res = await fetch(`${API_BASE}/subscribers`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to load subscribers');
    return await res.json();
  },

  // Stats
  async getStats(): Promise<DashboardStats> {
    const res = await fetch(`${API_BASE}/stats`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to load stats');
    return await res.json();
  },

  // Image upload
  async uploadImage(file: File): Promise<{ url: string; filename: string }> {
    const formData = new FormData();
    formData.append('image', file);
    const token = localStorage.getItem('elysee_admin_token') || 'elysee-luxury-session-token';
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    if (!res.ok) throw new Error('Image upload failed');
    return await res.json();
  }
};
