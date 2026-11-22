export type ProjectCategory = 'Residential' | 'Commercial' | 'Hospitality' | 'Renovation';

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  location: string;
  year: number;
  area: string;
  featured: boolean;
  coverImage: string;
  galleryImages: string[];
  concept: string;
  materials: string[];
  clientBrief: string;
  challengeSolution: string;
  beforeImage?: string;
  afterImage?: string;
  testimonialQuote?: string;
  testimonialAuthor?: string;
  createdAt: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  includes: string[];
  suitableFor: string[];
  deliverables: string[];
  image: string;
  iconName: string;
}

export type JournalCategory = 
  | 'Architecture' 
  | 'Materiality' 
  | 'Space Planning' 
  | 'Design Philosophy' 
  | 'Curated Living';

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: JournalCategory;
  readTime: string;
  publishedDate: string;
  authorName: string;
  authorRole: string;
  coverImage: string;
  content: {
    type: 'paragraph' | 'heading' | 'quote' | 'image' | 'list';
    text?: string;
    items?: string[];
    caption?: string;
    src?: string;
  }[];
  published: boolean;
  tags: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  location: string;
  projectTitle: string;
  quote: string;
  rating: number;
  avatarUrl?: string;
  isFeatured: boolean;
  createdAt: string;
}

export interface ContactEnquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  serviceRequired: string;
  estimatedBudget: string;
  projectLocation: string;
  message: string;
  status: 'new' | 'contacted' | 'archived';
  notes?: string;
  createdAt: string;
}

export type ConsultationType = 
  | 'In-Studio Architectural Discovery' 
  | 'Virtual Design Advisory' 
  | 'On-Site Private Residence Audit' 
  | 'Commercial Spatial Strategy';

export interface ConsultationBooking {
  id: string;
  referenceCode: string;
  consultationType: ConsultationType;
  preferredDate: string;
  preferredTime: string;
  fullName: string;
  email: string;
  phone: string;
  projectLocation: string;
  projectScope: string;
  estimatedBudget: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  source: string;
  createdAt: string;
}

export interface StudioMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  credentials: string;
  image: string;
  quote?: string;
}

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  email: string;
  role?: string;
  token: string;
}

export interface DashboardStats {
  totalProjects: number;
  totalEnquiries: number;
  pendingConsultations: number;
  publishedArticles: number;
  totalSubscribers: number;
  conversionRate: string;
}
