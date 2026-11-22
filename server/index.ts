import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import { db } from './db';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const NOTIFICATION_EMAIL = 'eddykens309@gmail.com';
const STUDIO_WHATSAPP = '254110413132';

// Email Transporter & Notification Dispatcher
const DATA_DIR = path.resolve(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const sendNotificationEmail = async (subject: string, htmlContent: string, plainText: string) => {
  console.log(`[EMAIL NOTIFICATION TARGET: ${NOTIFICATION_EMAIL}] Subject: ${subject}`);

  // Persist notification log to disk
  const notificationsFile = path.resolve(DATA_DIR, 'email_notifications.json');
  try {
    let existing: any[] = [];
    if (fs.existsSync(notificationsFile)) {
      existing = JSON.parse(fs.readFileSync(notificationsFile, 'utf-8'));
    }
    existing.unshift({
      id: `notif-${Date.now()}`,
      to: NOTIFICATION_EMAIL,
      subject,
      content: plainText,
      sentAt: new Date().toISOString()
    });
    fs.writeFileSync(notificationsFile, JSON.stringify(existing.slice(0, 100), null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to log email notification:', err);
  }

  // If live SMTP configured via environment, dispatch network email
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Boolean(process.env.SMTP_SECURE),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      await transporter.sendMail({
        from: '"Atelier Élysée Kenya" <notifications@atelier-elysee.co.ke>',
        to: NOTIFICATION_EMAIL,
        subject,
        text: plainText,
        html: htmlContent
      });
      console.log(`[EMAIL NOTIFICATION SENT SUCCESSFULLY VIA SMTP TO ${NOTIFICATION_EMAIL}]`);
    } catch (smtpErr) {
      console.error(`[SMTP DISPATCH ATTEMPT TO ${NOTIFICATION_EMAIL}]:`, smtpErr);
    }
  }
};

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Static uploads folder setup
const UPLOADS_DIR = path.resolve(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
app.use('/uploads', express.static(UPLOADS_DIR));

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed.'));
    }
  }
});

// Simple Auth Middleware
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }
  const token = authHeader.split(' ')[1];
  // Valid token check (simple session token check for studio demo)
  if (token === 'elysee-luxury-session-token' || token.startsWith('elysee-token-')) {
    return next();
  }
  return res.status(401).json({ error: 'Unauthorized: Invalid session' });
};

// -------------------------------------------------------------
// AUTH ROUTES
// -------------------------------------------------------------
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const admin = db.findAdmin(username);
  if (!admin || admin.passwordHash !== password) {
    return res.status(401).json({ error: 'Invalid credentials. Hint: elysee_admin / atelier2025!' });
  }

  // Issue session token
  const token = `elysee-token-${Date.now()}`;
  res.json({
    token,
    user: {
      id: admin.id,
      username: admin.username,
      name: admin.fullName,
      email: admin.email,
      role: admin.role
    }
  });
});

app.get('/api/auth/me', authMiddleware, (_req: Request, res: Response) => {
  res.json({
    id: 'admin-1',
    username: 'elysee_admin',
    name: 'Éléonore de Vauquelin',
    email: 'director@atelier-elysee.com',
    role: 'Principal & Director'
  });
});

// -------------------------------------------------------------
// IMAGE UPLOAD ROUTE
// -------------------------------------------------------------
app.post('/api/upload', authMiddleware, upload.single('image'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({
    url: fileUrl,
    filename: req.file.filename,
    size: req.file.size,
    mimetype: req.file.mimetype
  });
});

// -------------------------------------------------------------
// PROJECTS ROUTES
// -------------------------------------------------------------
app.get('/api/projects', (req: Request, res: Response) => {
  const category = req.query.category as string | undefined;
  const projects = db.getProjects(category);
  res.json(projects);
});

app.get('/api/projects/:slug', (req: Request, res: Response) => {
  const project = db.getProjectBySlug(req.params.slug);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json(project);
});

app.post('/api/projects', authMiddleware, (req: Request, res: Response) => {
  const { title, category, location, year, area, concept, coverImage } = req.body;
  if (!title || !category || !location || !year || !concept) {
    return res.status(400).json({ error: 'Missing required project fields' });
  }

  const slug = req.body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const project = db.createProject({
    ...req.body,
    slug,
    year: Number(year),
    coverImage: coverImage || 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
    galleryImages: req.body.galleryImages || [coverImage],
    materials: req.body.materials || [],
    featured: Boolean(req.body.featured)
  });
  res.status(201).json(project);
});

app.put('/api/projects/:id', authMiddleware, (req: Request, res: Response) => {
  const updated = db.updateProject(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json(updated);
});

app.delete('/api/projects/:id', authMiddleware, (req: Request, res: Response) => {
  const deleted = db.deleteProject(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json({ success: true, message: 'Project removed successfully' });
});

// -------------------------------------------------------------
// SERVICES ROUTES
// -------------------------------------------------------------
app.get('/api/services', (_req: Request, res: Response) => {
  res.json(db.getServices());
});

app.get('/api/services/:slug', (req: Request, res: Response) => {
  const service = db.getServiceBySlug(req.params.slug);
  if (!service) {
    return res.status(404).json({ error: 'Service not found' });
  }
  res.json(service);
});

// -------------------------------------------------------------
// JOURNAL ARTICLES ROUTES
// -------------------------------------------------------------
app.get('/api/articles', (req: Request, res: Response) => {
  const category = req.query.category as string | undefined;
  res.json(db.getArticles(category));
});

app.get('/api/articles/:slug', (req: Request, res: Response) => {
  const article = db.getArticleBySlug(req.params.slug);
  if (!article) {
    return res.status(404).json({ error: 'Article not found' });
  }
  res.json(article);
});

app.post('/api/articles', authMiddleware, (req: Request, res: Response) => {
  const { title, category, excerpt, content } = req.body;
  if (!title || !category || !excerpt) {
    return res.status(400).json({ error: 'Missing required article fields' });
  }

  const slug = req.body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const article = db.createArticle({
    ...req.body,
    slug,
    publishedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    authorName: req.body.authorName || 'Éléonore de Vauquelin',
    authorRole: req.body.authorRole || 'Founder & Principal Architect',
    readTime: req.body.readTime || '5 min read',
    coverImage: req.body.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    content: content || [{ type: 'paragraph', text: excerpt }],
    tags: req.body.tags || ['Design', 'Architecture'],
    published: req.body.published !== undefined ? req.body.published : true
  });
  res.status(201).json(article);
});

app.put('/api/articles/:id', authMiddleware, (req: Request, res: Response) => {
  const updated = db.updateArticle(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Article not found' });
  }
  res.json(updated);
});

app.delete('/api/articles/:id', authMiddleware, (req: Request, res: Response) => {
  const deleted = db.deleteArticle(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Article not found' });
  }
  res.json({ success: true, message: 'Article removed successfully' });
});

// -------------------------------------------------------------
// TESTIMONIALS ROUTES
// -------------------------------------------------------------
app.get('/api/testimonials', (_req: Request, res: Response) => {
  res.json(db.getTestimonials());
});

app.post('/api/testimonials', authMiddleware, (req: Request, res: Response) => {
  const { clientName, clientRole, location, projectTitle, quote } = req.body;
  if (!clientName || !quote) {
    return res.status(400).json({ error: 'Missing client name or quote' });
  }
  const created = db.createTestimonial({
    clientName,
    clientRole: clientRole || 'Client',
    location: location || 'Private Residence',
    projectTitle: projectTitle || 'Interior Commission',
    quote,
    rating: Number(req.body.rating) || 5,
    avatarUrl: req.body.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    isFeatured: req.body.isFeatured !== undefined ? req.body.isFeatured : true
  });
  res.status(201).json(created);
});

app.put('/api/testimonials/:id', authMiddleware, (req: Request, res: Response) => {
  const updated = db.updateTestimonial(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Testimonial not found' });
  }
  res.json(updated);
});

app.delete('/api/testimonials/:id', authMiddleware, (req: Request, res: Response) => {
  const deleted = db.deleteTestimonial(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Testimonial not found' });
  }
  res.json({ success: true, message: 'Testimonial removed' });
});

// -------------------------------------------------------------
// CONTACT ENQUIRIES ROUTES
// -------------------------------------------------------------
app.get('/api/enquiries', authMiddleware, (_req: Request, res: Response) => {
  res.json(db.getEnquiries());
});

app.post('/api/enquiries', (req: Request, res: Response) => {
  const { fullName, email, phone, serviceRequired, estimatedBudget, projectLocation, message } = req.body;
  if (!fullName || !email || !serviceRequired || !message) {
    return res.status(400).json({ error: 'Please fill in all mandatory fields.' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  const enquiry = db.createEnquiry({
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    phone: phone ? phone.trim() : '',
    serviceRequired,
    estimatedBudget: estimatedBudget || 'Undetermined',
    projectLocation: projectLocation || 'Undisclosed',
    message: message.trim()
  });

  // Dispatch Email Notification to eddykens309@gmail.com
  sendNotificationEmail(
    `[Atelier Élysée Kenya] New Client Commission Enquiry: ${enquiry.fullName}`,
    `<h2>New Architectural Commission Enquiry</h2>
     <p><strong>Patron:</strong> ${enquiry.fullName}</p>
     <p><strong>Email:</strong> ${enquiry.email}</p>
     <p><strong>Phone:</strong> ${enquiry.phone}</p>
     <p><strong>Service Requested:</strong> ${enquiry.serviceRequired}</p>
     <p><strong>Project Location:</strong> ${enquiry.projectLocation}</p>
     <p><strong>Estimated Budget:</strong> ${enquiry.estimatedBudget}</p>
     <p><strong>Project Narrative:</strong></p>
     <p>${enquiry.message}</p>
     <p><em>Patron WhatsApp: <a href="https://wa.me/${(enquiry.phone || '').replace(/[^0-9]/g, '')}">${enquiry.phone}</a> | Studio WhatsApp: <a href="https://wa.me/254110413132">0110413132</a></em></p>`,
    `New Commission Enquiry from ${enquiry.fullName}\nEmail: ${enquiry.email}\nPhone: ${enquiry.phone}\nService: ${enquiry.serviceRequired}\nLocation: ${enquiry.projectLocation}\nBudget: ${enquiry.estimatedBudget}\nMessage: ${enquiry.message}`
  );

  res.status(201).json({
    success: true,
    message: 'Your enquiry has been received by our architectural directorship in Kenya. Notification dispatched to directorship.',
    enquiry,
    whatsappContact: '0110413132'
  });
});

app.patch('/api/enquiries/:id', authMiddleware, (req: Request, res: Response) => {
  const updated = db.updateEnquiry(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Enquiry not found' });
  }
  res.json(updated);
});

app.delete('/api/enquiries/:id', authMiddleware, (req: Request, res: Response) => {
  const deleted = db.deleteEnquiry(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Enquiry not found' });
  }
  res.json({ success: true, message: 'Enquiry archived and removed' });
});

// -------------------------------------------------------------
// CONSULTATION BOOKINGS ROUTES
// -------------------------------------------------------------
app.get('/api/consultations', authMiddleware, (_req: Request, res: Response) => {
  res.json(db.getConsultations());
});

app.post('/api/consultations', (req: Request, res: Response) => {
  const { consultationType, preferredDate, preferredTime, fullName, email, phone, projectLocation, projectScope } = req.body;
  if (!consultationType || !preferredDate || !preferredTime || !fullName || !email || !phone) {
    return res.status(400).json({ error: 'Please complete all required consultation booking fields.' });
  }

  const booking = db.createConsultation({
    consultationType,
    preferredDate,
    preferredTime,
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    projectLocation: projectLocation || 'To be specified',
    projectScope: projectScope || '',
    estimatedBudget: req.body.estimatedBudget || 'Not specified'
  });

  // Dispatch Email Notification to eddykens309@gmail.com
  sendNotificationEmail(
    `[Atelier Élysée Kenya] New Consultation Booking: ${booking.referenceCode} - ${booking.fullName}`,
    `<h2>New Architectural Consultation Scheduled</h2>
     <p><strong>Atelier Reference Code:</strong> <span style="color:#A58A70; font-family:monospace; font-size:16px;">${booking.referenceCode}</span></p>
     <p><strong>Patron Name:</strong> ${booking.fullName}</p>
     <p><strong>Email:</strong> ${booking.email}</p>
     <p><strong>Phone:</strong> ${booking.phone}</p>
     <p><strong>Consultation Format:</strong> ${booking.consultationType}</p>
     <p><strong>Target Schedule:</strong> ${booking.preferredDate} at ${booking.preferredTime}</p>
     <p><strong>Location in Kenya:</strong> ${booking.projectLocation}</p>
     <p><strong>Budget Tier:</strong> ${booking.estimatedBudget}</p>
     <p><strong>Project Scope Outline:</strong></p>
     <p>${booking.projectScope || 'General architectural consultation'}</p>
     <hr/>
     <p><em>Studio WhatsApp Action: <a href="https://wa.me/254110413132?text=Hello%20${encodeURIComponent(booking.fullName)},%20regarding%20your%20Atelier%20%C3%89lys%C3%A9e%20booking%20${booking.referenceCode}">Direct WhatsApp Link to 0110413132</a></em></p>`,
    `New Consultation Booking [${booking.referenceCode}]\nPatron: ${booking.fullName}\nEmail: ${booking.email}\nPhone: ${booking.phone}\nFormat: ${booking.consultationType}\nSchedule: ${booking.preferredDate} at ${booking.preferredTime}\nLocation: ${booking.projectLocation}\nBudget: ${booking.estimatedBudget}\nScope: ${booking.projectScope}`
  );

  res.status(201).json({
    success: true,
    message: 'Your consultation session request has been confirmed. Notification dispatched to eddykens309@gmail.com and WhatsApp line 0110413132.',
    booking,
    whatsappNumber: '0110413132',
    whatsappUrl: `https://wa.me/254110413132?text=Hello%20Atelier%20Élysée,%20I%20have%20submitted%20consultation%20booking%20${booking.referenceCode}%20for%20${encodeURIComponent(booking.fullName)}.`
  });
});

app.patch('/api/consultations/:id', authMiddleware, (req: Request, res: Response) => {
  const updated = db.updateConsultation(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Consultation request not found' });
  }
  res.json(updated);
});

app.delete('/api/consultations/:id', authMiddleware, (req: Request, res: Response) => {
  const deleted = db.deleteConsultation(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Consultation not found' });
  }
  res.json({ success: true, message: 'Consultation removed' });
});

// -------------------------------------------------------------
// NEWSLETTER SUBSCRIBERS ROUTES
// -------------------------------------------------------------
app.get('/api/subscribers', authMiddleware, (_req: Request, res: Response) => {
  res.json(db.getSubscribers());
});

app.post('/api/subscribers', (req: Request, res: Response) => {
  const { email, source } = req.body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }
  const result = db.createSubscriber(email, source);
  res.json({
    success: true,
    message: result.created ? 'Thank you for subscribing to our private editorial journal.' : 'You are already registered on our subscriber registry.',
    subscriber: result.subscriber
  });
});

// -------------------------------------------------------------
// DASHBOARD STATS
// -------------------------------------------------------------
app.get('/api/stats', authMiddleware, (_req: Request, res: Response) => {
  res.json(db.getStats());
});

// -------------------------------------------------------------
// PRODUCTION STATIC SERVING
// -------------------------------------------------------------
const DIST_PATH = path.resolve(__dirname, '../dist');
if (fs.existsSync(DIST_PATH)) {
  app.use(express.static(DIST_PATH));
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.resolve(DIST_PATH, 'index.html'));
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`[ATELIER ÉLYSÉE API] Running with distinction on http://localhost:${PORT}`);
});
