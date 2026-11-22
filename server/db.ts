import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { 
  Project, 
  Service, 
  JournalArticle, 
  Testimonial, 
  ContactEnquiry, 
  ConsultationBooking, 
  NewsletterSubscriber, 
  DashboardStats 
} from '../src/types';
import { 
  INITIAL_PROJECTS, 
  INITIAL_SERVICES, 
  INITIAL_ARTICLES, 
  INITIAL_TESTIMONIALS 
} from '../src/data/initialData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, 'data');
const DB_FILE = path.resolve(DATA_DIR, 'db.json');

interface DatabaseSchema {
  administrators: {
    id: string;
    username: string;
    email: string;
    passwordHash: string;
    fullName: string;
    role: string;
  }[];
  projects: Project[];
  services: Service[];
  articles: JournalArticle[];
  testimonials: Testimonial[];
  enquiries: ContactEnquiry[];
  consultations: ConsultationBooking[];
  subscribers: NewsletterSubscriber[];
}

const DEFAULT_ADMIN = {
  id: 'admin-1',
  username: 'elysee_admin',
  email: 'director@atelier-elysee.com',
  passwordHash: 'atelier2025!', // Demo password
  fullName: 'Éléonore de Vauquelin',
  role: 'Principal & Director'
};

const INITIAL_ENQUIRIES: ContactEnquiry[] = [
  {
    id: 'enq-1',
    fullName: 'Lady Victoria Hastings',
    email: 'v.hastings@mayfairholdings.co.uk',
    phone: '+44 20 7946 0912',
    serviceRequired: 'Residential Interior Design',
    estimatedBudget: '€500,000 – €1,000,000',
    projectLocation: 'Eaton Square, London',
    message: 'We have recently acquired a Grade II listed Georgian townhouse overlooking Eaton Square. We admire your balance of historical mouldings and minimalist travertine joinery and would like to commission a full-scope turnkey transformation.',
    status: 'new',
    notes: 'Followed up via introductory atelier brochure. Requested architectural floor plan scan.',
    createdAt: '2025-03-01T14:22:00Z'
  },
  {
    id: 'enq-2',
    fullName: 'Maximilian Sterling',
    email: 'm.sterling@sterlingcap.ch',
    phone: '+41 22 819 4000',
    serviceRequired: 'Commercial Interior Design',
    estimatedBudget: '€1,000,000+',
    projectLocation: 'Geneva Lakefront, Switzerland',
    message: 'Seeking to design a private family office headquarters on Quai du Mont-Blanc. Requirement for high acoustic seclusion, bespoke walnut conference tables, and private client tasting salon.',
    status: 'contacted',
    notes: 'Initial video discovery completed with Julian Vance. Site visit scheduled for April 10.',
    createdAt: '2025-02-24T09:15:00Z'
  }
];

const INITIAL_CONSULTATIONS: ConsultationBooking[] = [
  {
    id: 'con-1',
    referenceCode: 'ELY-2025-8491',
    consultationType: 'In-Studio Architectural Discovery',
    preferredDate: '2025-04-15',
    preferredTime: '14:00',
    fullName: 'Sebastien & Chloe Moreau',
    email: 'chloe.moreau@artcurial.fr',
    phone: '+33 6 12 34 56 78',
    projectLocation: 'Neuilly-sur-Seine, Paris',
    projectScope: 'Complete re-imagining of a 1920s Art Deco villa (450m²). Reconfiguring ground floor entertaining areas and primary suite.',
    estimatedBudget: '€300,000 – €500,000',
    status: 'confirmed',
    createdAt: '2025-03-02T11:45:00Z'
  },
  {
    id: 'con-2',
    referenceCode: 'ELY-2025-9120',
    consultationType: 'Virtual Design Advisory',
    preferredDate: '2025-04-18',
    preferredTime: '16:00',
    fullName: 'Dr. Aris Thorne',
    email: 'athorne@stanford.edu',
    phone: '+1 650 555 0199',
    projectLocation: 'Pacific Palisades, California',
    projectScope: 'Evaluating material palettes and volumetric lighting strategies for a cliffside mid-century post-and-beam restoration.',
    estimatedBudget: '€150,000 – €300,000',
    status: 'pending',
    createdAt: '2025-03-04T16:20:00Z'
  }
];

const INITIAL_SUBSCRIBERS: NewsletterSubscriber[] = [
  { id: 'sub-1', email: 'collector@parisianarts.com', source: 'website_footer', createdAt: '2025-01-10T08:00:00Z' },
  { id: 'sub-2', email: 'elena.rossi@architettura.it', source: 'journal_newsletter', createdAt: '2025-02-14T19:30:00Z' },
  { id: 'sub-3', email: 'design@hauteinteriors.ch', source: 'website_footer', createdAt: '2025-02-28T12:00:00Z' }
];

class Database {
  private data: DatabaseSchema;

  constructor() {
    this.ensureDirectory();
    this.data = this.loadData();
  }

  private ensureDirectory() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  private loadData(): DatabaseSchema {
    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        return {
          administrators: parsed.administrators || [DEFAULT_ADMIN],
          projects: parsed.projects || INITIAL_PROJECTS,
          services: parsed.services || INITIAL_SERVICES,
          articles: parsed.articles || INITIAL_ARTICLES,
          testimonials: parsed.testimonials || INITIAL_TESTIMONIALS,
          enquiries: parsed.enquiries || INITIAL_ENQUIRIES,
          consultations: parsed.consultations || INITIAL_CONSULTATIONS,
          subscribers: parsed.subscribers || INITIAL_SUBSCRIBERS
        };
      } catch (err) {
        console.error('Error loading db.json, re-initializing default state:', err);
      }
    }

    const initial: DatabaseSchema = {
      administrators: [DEFAULT_ADMIN],
      projects: INITIAL_PROJECTS,
      services: INITIAL_SERVICES,
      articles: INITIAL_ARTICLES,
      testimonials: INITIAL_TESTIMONIALS,
      enquiries: INITIAL_ENQUIRIES,
      consultations: INITIAL_CONSULTATIONS,
      subscribers: INITIAL_SUBSCRIBERS
    };
    this.saveData(initial);
    return initial;
  }

  private saveData(data: DatabaseSchema) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  }

  private persist() {
    this.saveData(this.data);
  }

  // --- PROJECTS ---
  getProjects(category?: string): Project[] {
    if (!category || category.toLowerCase() === 'all') {
      return this.data.projects;
    }
    return this.data.projects.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  getProjectBySlug(slug: string): Project | undefined {
    return this.data.projects.find(p => p.slug === slug || p.id === slug);
  }

  createProject(project: Omit<Project, 'id' | 'createdAt'>): Project {
    const newProject: Project = {
      ...project,
      id: `proj-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.data.projects.unshift(newProject);
    this.persist();
    return newProject;
  }

  updateProject(id: string, updates: Partial<Project>): Project | null {
    const index = this.data.projects.findIndex(p => p.id === id || p.slug === id);
    if (index === -1) return null;
    this.data.projects[index] = { ...this.data.projects[index], ...updates };
    this.persist();
    return this.data.projects[index];
  }

  deleteProject(id: string): boolean {
    const initialLen = this.data.projects.length;
    this.data.projects = this.data.projects.filter(p => p.id !== id && p.slug !== id);
    if (this.data.projects.length !== initialLen) {
      this.persist();
      return true;
    }
    return false;
  }

  // --- SERVICES ---
  getServices(): Service[] {
    return this.data.services;
  }

  getServiceBySlug(slug: string): Service | undefined {
    return this.data.services.find(s => s.slug === slug || s.id === slug);
  }

  // --- ARTICLES ---
  getArticles(category?: string): JournalArticle[] {
    let list = this.data.articles;
    if (category && category.toLowerCase() !== 'all') {
      list = list.filter(a => a.category.toLowerCase() === category.toLowerCase());
    }
    return list;
  }

  getArticleBySlug(slug: string): JournalArticle | undefined {
    return this.data.articles.find(a => a.slug === slug || a.id === slug);
  }

  createArticle(article: Omit<JournalArticle, 'id'>): JournalArticle {
    const newArticle: JournalArticle = {
      ...article,
      id: `art-${Date.now()}`
    };
    this.data.articles.unshift(newArticle);
    this.persist();
    return newArticle;
  }

  updateArticle(id: string, updates: Partial<JournalArticle>): JournalArticle | null {
    const index = this.data.articles.findIndex(a => a.id === id || a.slug === id);
    if (index === -1) return null;
    this.data.articles[index] = { ...this.data.articles[index], ...updates };
    this.persist();
    return this.data.articles[index];
  }

  deleteArticle(id: string): boolean {
    const initialLen = this.data.articles.length;
    this.data.articles = this.data.articles.filter(a => a.id !== id && a.slug !== id);
    if (this.data.articles.length !== initialLen) {
      this.persist();
      return true;
    }
    return false;
  }

  // --- TESTIMONIALS ---
  getTestimonials(): Testimonial[] {
    return this.data.testimonials;
  }

  createTestimonial(t: Omit<Testimonial, 'id' | 'createdAt'>): Testimonial {
    const newTestimonial: Testimonial = {
      ...t,
      id: `test-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.data.testimonials.unshift(newTestimonial);
    this.persist();
    return newTestimonial;
  }

  updateTestimonial(id: string, updates: Partial<Testimonial>): Testimonial | null {
    const index = this.data.testimonials.findIndex(t => t.id === id);
    if (index === -1) return null;
    this.data.testimonials[index] = { ...this.data.testimonials[index], ...updates };
    this.persist();
    return this.data.testimonials[index];
  }

  deleteTestimonial(id: string): boolean {
    const initialLen = this.data.testimonials.length;
    this.data.testimonials = this.data.testimonials.filter(t => t.id !== id);
    if (this.data.testimonials.length !== initialLen) {
      this.persist();
      return true;
    }
    return false;
  }

  // --- ENQUIRIES ---
  getEnquiries(): ContactEnquiry[] {
    return this.data.enquiries;
  }

  createEnquiry(enquiry: Omit<ContactEnquiry, 'id' | 'status' | 'createdAt'>): ContactEnquiry {
    const newEnquiry: ContactEnquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    this.data.enquiries.unshift(newEnquiry);
    this.persist();
    return newEnquiry;
  }

  updateEnquiry(id: string, updates: Partial<ContactEnquiry>): ContactEnquiry | null {
    const index = this.data.enquiries.findIndex(e => e.id === id);
    if (index === -1) return null;
    this.data.enquiries[index] = { ...this.data.enquiries[index], ...updates };
    this.persist();
    return this.data.enquiries[index];
  }

  deleteEnquiry(id: string): boolean {
    const initialLen = this.data.enquiries.length;
    this.data.enquiries = this.data.enquiries.filter(e => e.id !== id);
    if (this.data.enquiries.length !== initialLen) {
      this.persist();
      return true;
    }
    return false;
  }

  // --- CONSULTATIONS ---
  getConsultations(): ConsultationBooking[] {
    return this.data.consultations;
  }

  createConsultation(consultation: Omit<ConsultationBooking, 'id' | 'referenceCode' | 'status' | 'createdAt'>): ConsultationBooking {
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const newConsultation: ConsultationBooking = {
      ...consultation,
      id: `con-${Date.now()}`,
      referenceCode: `ELY-2025-${randomHex}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    this.data.consultations.unshift(newConsultation);
    this.persist();
    return newConsultation;
  }

  updateConsultation(id: string, updates: Partial<ConsultationBooking>): ConsultationBooking | null {
    const index = this.data.consultations.findIndex(c => c.id === id || c.referenceCode === id);
    if (index === -1) return null;
    this.data.consultations[index] = { ...this.data.consultations[index], ...updates };
    this.persist();
    return this.data.consultations[index];
  }

  deleteConsultation(id: string): boolean {
    const initialLen = this.data.consultations.length;
    this.data.consultations = this.data.consultations.filter(c => c.id !== id && c.referenceCode !== id);
    if (this.data.consultations.length !== initialLen) {
      this.persist();
      return true;
    }
    return false;
  }

  // --- NEWSLETTER SUBSCRIBERS ---
  getSubscribers(): NewsletterSubscriber[] {
    return this.data.subscribers;
  }

  createSubscriber(email: string, source: string = 'website_footer'): { subscriber: NewsletterSubscriber; created: boolean } {
    const normalized = email.trim().toLowerCase();
    const existing = this.data.subscribers.find(s => s.email.toLowerCase() === normalized);
    if (existing) {
      return { subscriber: existing, created: false };
    }
    const newSub: NewsletterSubscriber = {
      id: `sub-${Date.now()}`,
      email: normalized,
      source,
      createdAt: new Date().toISOString()
    };
    this.data.subscribers.unshift(newSub);
    this.persist();
    return { subscriber: newSub, created: true };
  }

  // --- STATS ---
  getStats(): DashboardStats {
    const totalProjects = this.data.projects.length;
    const totalEnquiries = this.data.enquiries.length;
    const pendingConsultations = this.data.consultations.filter(c => c.status === 'pending').length;
    const publishedArticles = this.data.articles.filter(a => a.published).length;
    const totalSubscribers = this.data.subscribers.length;
    
    // Realistic conversion calculation
    const totalActions = totalEnquiries + this.data.consultations.length;
    const conversionRate = totalActions > 0 ? `${((totalActions / (totalActions * 12 + 120)) * 100).toFixed(1)}%` : '4.2%';

    return {
      totalProjects,
      totalEnquiries,
      pendingConsultations,
      publishedArticles,
      totalSubscribers,
      conversionRate
    };
  }

  // --- AUTH ---
  findAdmin(username: string) {
    return this.data.administrators.find(
      a => a.username.toLowerCase() === username.toLowerCase() || a.email.toLowerCase() === username.toLowerCase()
    );
  }
}

export const db = new Database();
