import { Project, Service, JournalArticle, Testimonial, StudioMember } from '../types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    slug: 'the-muthaiga-pavilion',
    title: 'The Muthaiga Pavilion',
    subtitle: 'Contemporary modernist villa balancing volcanic basalt and indigenous acacia canopy',
    category: 'Residential',
    location: 'Muthaiga, Nairobi',
    year: 2025,
    area: '540 m²',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85'
    ],
    concept: 'A contemplative dialogue between Nairobi’s lush subtropical landscape and radical architectural minimalism. The design strips back decorative excess to celebrate soaring 4.2-meter ceiling heights, floor-to-ceiling pocket sliding glazing, and hand-chiseled volcanic basalt, contrasted by bleached East African cypress millwork and unlacquered burnished brass.',
    materials: [
      'Kenyan Volcanic Basalt Stone',
      'Bleached East African Cypress',
      'Hand-applied Lime Wash (Chaux)',
      'Unlacquered Aged Brass',
      'Natural Kenyan Organic Sisal',
      'Calacatta Viola Marble'
    ],
    clientBrief: 'The clients, an international conservation director and an institutional investor, sought a private retreat that serves as both a tranquil family sanctuary and a curated setting for their collection of contemporary African art and Post-War sculpture.',
    challengeSolution: 'The primary challenge lay in mediating the intense equatorial sunlight while preserving seamless continuity between the interior salons and indigenous forest gardens. We designed deep cantilevered roof eaves and integrated cedar louvers that filter natural daylight into changing geometric patterns across polished microcement floors.',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85',
    testimonialQuote: 'Atelier Élysée transformed our Muthaiga property into a breathable, meditative composition of light, stone, and garden. Every morning here feels like an unhurried sanctuary.',
    testimonialAuthor: 'Dr. James & Wangari Kariuki',
    createdAt: '2025-02-14T10:00:00Z'
  },
  {
    id: 'proj-2',
    slug: 'the-lamu-coral-sanctuary',
    title: 'The Lamu Coral Sanctuary',
    subtitle: 'Revitalizing 18th-century Swahili coral architecture for contemporary coastal living',
    category: 'Renovation',
    location: 'Shela Village, Lamu Island',
    year: 2024,
    area: '480 m²',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85'
    ],
    concept: 'An archival preservation of historic Swahili stonework merged with understated contemporary interior architecture. Traditional coral rag walls and intricate plaster zidaka niches were stabilized by local master masons, framed by custom floating teak millwork and airy open courtyards designed for ocean trade wind ventilation.',
    materials: [
      'Authentic Lamu Coral Rag Stone',
      'Reclaimed Coastal Teak',
      'Hand-burnished Lime Plaster (Niru)',
      'Handcrafted Cast Brass Latches',
      'Belgian Raw Linen & Kenyan Cotton'
    ],
    clientBrief: 'A UNESCO World Heritage preservation project requiring rigorous academic fidelity combined with high-end modern plumbing, acoustic seclusion, and solar-powered climate moderation.',
    challengeSolution: 'By routing all concealed modern conduits through bespoke raised baseboards crafted from matching teak and brass, we preserved the historic coral masonry untouched, allowing natural ocean breezes to passively cool every suite.',
    beforeImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80',
    afterImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85',
    testimonialQuote: 'Working with Atelier Élysée in Lamu was extraordinary. They honored our island’s historical Swahili heritage while delivering international luxury standards.',
    testimonialAuthor: 'Tariq & Sophie Al-Mansoor',
    createdAt: '2024-11-08T14:30:00Z'
  },
  {
    id: 'proj-3',
    slug: 'karen-modernist-retreat',
    title: 'Karen Modernist Villa',
    subtitle: 'Low-slung architectural pavilion framed by Ol Pejeta cedar and indigenous fever trees',
    category: 'Residential',
    location: 'Karen, Nairobi',
    year: 2025,
    area: '620 m²',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85'
    ],
    concept: 'Grounded in the red soil of Karen’s historic forested parcels, this villa celebrates natural continuity between interior volumes and mature gardens. Broad spans of pocketing glass doors dissolve boundaries, anchored by monolithic hand-cut Naivasha stone hearths and a sun-dappled sunken conversation lounge.',
    materials: [
      'Hand-cut Grey Naivasha Stone',
      'Ol Pejeta Red Cedar Millwork',
      'Honed Basalt Kitchen Monoliths',
      'Custom Bouclé Upholstery',
      'Hand-woven Kenyan Sisal Floor Rugs'
    ],
    clientBrief: 'Design an effortlessly luxurious family residence that withstands daily living with children while exuding quiet architectural dignity and natural warmth.',
    challengeSolution: 'We incorporated a central double-height glass atrium around a preserved 60-year-old indigenous olive tree, flooding the heart of the home with filtered natural daylight throughout the day.',
    beforeImage: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1400&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
    testimonialQuote: 'The house feels deeply connected to Nairobi’s climate and greenery. Atelier Élysée created a sanctuary our family cherishes every day.',
    testimonialAuthor: 'Marcus & Linda Kiprono',
    createdAt: '2025-01-20T09:15:00Z'
  },
  {
    id: 'proj-4',
    slug: 'the-great-rift-sanctuary',
    title: 'The Great Rift Sanctuary',
    subtitle: 'Monolithic lakeside pavilion overlooking Lake Naivasha and Mount Longonot',
    category: 'Hospitality',
    location: 'Lake Naivasha, Great Rift Valley',
    year: 2024,
    area: '720 m²',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85'
    ],
    concept: 'A private eco-hospitality retreat perched above Lake Naivasha. Massive bush-hammered stone walls shelter open entertaining salons clad in reclaimed acacia timber, open-hearth fireplaces, and bespoke bronze lighting.',
    materials: [
      'Bush-hammered Naivasha Quarry Stone',
      'Reclaimed Acacia Hardwood',
      'Warm Ochre Clay Plaster',
      'Brushed Gunmetal & Hand-forged Iron'
    ],
    clientBrief: 'Create an 8-suite private safari lodge and tasting pavilion that redefines luxury hospitality in the Great Rift Valley without rustic clichés.',
    challengeSolution: 'All buildings are passively oriented along the prevailing seasonal breezes with green planted roofs that insulate the interiors against high daytime temperatures.',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85',
    testimonialQuote: 'The architectural presence of this lodge is unmatched. Our global guests consistently commend the raw honesty of materials and serene proportions.',
    testimonialAuthor: 'Lord David Hastings-Somer',
    createdAt: '2024-09-12T16:00:00Z'
  },
  {
    id: 'proj-5',
    slug: 'watamu-coastal-villa',
    title: 'Watamu Oceanfront Villa',
    subtitle: 'Open-air coastal architecture overlooking the Watamu Marine Reserve',
    category: 'Hospitality',
    location: 'Watamu, Coast Province',
    year: 2024,
    area: '650 m²',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85'
    ],
    concept: 'A contemporary interpretation of tropical coastal living. Bleached coral aggregate floors remain cool underfoot, paired with high makuti-inspired vaulted ceilings and an infinity plunge pool framed by mature coconut palms.',
    materials: [
      'Honed Coral Aggregate Concrete',
      'Bleached Mvule Hardwood',
      'Weathered Teak Decking',
      'Cast Bronze Ironmongery'
    ],
    clientBrief: 'A private holiday villa engineered for relaxed multi-generational gatherings and seamless barefoot coastal indoor-outdoor living.',
    challengeSolution: 'Engineered cross-ventilating louver screens eliminate the need for daytime air conditioning while providing full privacy from the beach.',
    createdAt: '2024-07-05T11:20:00Z'
  },
  {
    id: 'proj-6',
    slug: 'gigiri-executive-atelier',
    title: 'Gigiri Executive Headquarters',
    subtitle: 'Acoustically secluded diplomatic office and private creative studio',
    category: 'Commercial',
    location: 'Gigiri, Nairobi',
    year: 2025,
    area: '420 m²',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=85'
    ],
    concept: 'High-security executive offices for an international pan-African foundation. Tactile clay plaster partitions, custom mvule timber conference tables, and circadian architectural lighting cultivate clarity and calm.',
    materials: [
      'East African Mvule Timber',
      'Warm Microcement Flooring',
      'Acoustic Felt Baffles',
      'Blackened Hot-rolled Steel'
    ],
    clientBrief: 'A flagship workspace balancing diplomatic privacy requirements with warm, inviting Kenyan hospitality aesthetics.',
    challengeSolution: 'Integrated hidden acoustic dampening layers within wood-slatted feature walls to achieve absolute speech privacy for international delegations.',
    createdAt: '2025-01-10T12:00:00Z'
  }
];

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'serv-1',
    slug: 'residential-interior-design',
    title: 'Residential Interior Design',
    subtitle: 'Bespoke private sanctuaries tailored to Kenya’s distinct natural rhythm',
    shortDescription: 'Full-scope interior architecture and bespoke styling for luxury private residences in Karen, Muthaiga, Runda, Gigiri, and coastal estates.',
    fullDescription: 'Our turnkey residential service oversees the complete transformation of your living spaces. From architectural space planning and custom joinery to sourcing rare East African hardwoods and commissioned artwork, we guide every detail with uncompromising care.',
    includes: [
      'Architectural layout optimization tailored to equatorial light and breezes',
      'Bespoke joinery, kitchen, and bathroom architectural drawings',
      'Curated finishes: local volcanic basalt, Naivasha quarry stone, and hardwoods',
      'Custom furniture commissions with master Kenyan cabinetmakers and stone carvers',
      'Art curation, antique sourcing, and accessory styling',
      'Full contractor coordination, site supervision, and turnkey handover in Nairobi and coastal regions'
    ],
    suitableFor: [
      'Homeowners in Nairobi (Karen, Muthaiga, Runda, Kitisuru) undertaking major ground-up construction or full interior re-architecture',
      'Acquisitions of luxury penthouses and townhouses in Westlands and Riverside',
      'Coastal holiday estates in Lamu, Watamu, Diani, and Vipingo Ridge'
    ],
    deliverables: [
      '3D Photorealistic Architectural Renderings & Walkthroughs',
      'Comprehensive Construction Drawing Packages (MEP, Lighting, Joinery)',
      'Detailed Material, Appliance, and Fixture Specification Books',
      'Curated Furniture Procurement and Logistics Schedule'
    ],
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
    iconName: 'Home'
  },
  {
    id: 'serv-2',
    slug: 'commercial-interior-design',
    title: 'Commercial Interior Design',
    subtitle: 'Corporate headquarters, diplomatic spaces, and boutique hospitality',
    shortDescription: 'Elevating regional executive offices, private member clubs, and luxury boutiques in Nairobi through intentional materiality and acoustic excellence.',
    fullDescription: 'We translate your institutional ethos into an inspiring physical presence. Our commercial projects unite commercial durability with the tactile warmth of luxury hospitality.',
    includes: [
      'Circulation flow, ergonomic analysis, and executive privacy planning',
      'Custom boardroom monolithic timber tables and reception architecture',
      'Acoustic insulation, sensory design, and circadian lighting',
      'Durable, sustainable indigenous material selection'
    ],
    suitableFor: [
      'Pan-African regional headquarters and investment firms in Westlands and Upper Hill',
      'Diplomatic and non-profit organizations in Gigiri',
      'Boutique hospitality and flagship retail spaces'
    ],
    deliverables: [
      'Detailed Circulation Flow Diagrams & Seating Capacities',
      'Bespoke Millwork & Fixture Manufacturing Drawings',
      'Lighting Control Matrix & Scene Schedules',
      'Regulatory & Accessibility Compliance Documentation'
    ],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85',
    iconName: 'Building2'
  },
  {
    id: 'serv-3',
    slug: 'space-planning',
    title: 'Space Planning & Architecture',
    subtitle: 'Volumetric optimization and passive climate harmonization',
    shortDescription: 'Harmonizing floor plans with natural airflow, sun vectors, and lifestyle patterns for seamless indoor-outdoor living.',
    fullDescription: 'Great architectural interiors begin with volume and circulation. We analyze diurnal sun paths, wind vectors, and family movement to create effortless, tranquil layouts.',
    includes: [
      'Passive cooling and cross-ventilation optimization',
      'Circulation mapping and natural daylight simulation',
      'Zoning strategy for privacy, staff quarters, and entertaining terraces',
      'Architectural storage integration'
    ],
    suitableFor: [
      'Properties with outdated, dark, or fragmented layouts',
      'Modern open-plan residences requiring acoustic balance',
      'Prospective buyers assessing land or property prior to purchase'
    ],
    deliverables: [
      'Dimensioned 1:50 Architectural Floor Plans',
      'Elevation Studies and Sightline Sections',
      'Sunlight Tracking & Shadow Simulation',
      'Preliminary Budget & Engineering Feasibility Summary'
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    iconName: 'Maximize2'
  },
  {
    id: 'serv-4',
    slug: 'furniture-and-styling',
    title: 'Furniture & Curated Styling',
    subtitle: 'Artisanal furniture, organic sisal, and bespoke craftsmanship',
    shortDescription: 'Elevating existing architectural shells through masterfully crafted furniture, hand-knotted sisal rugs, and sculptural lighting.',
    fullDescription: 'Our styling atelier partners with master woodworkers and textile weavers across Kenya, commissioning custom pieces in teak, mvule, and cedar.',
    includes: [
      'Custom joinery and upholstery in organic linens and natural leathers',
      'Hand-woven organic Kenyan sisal rugs tailored to room dimensions',
      'Sourcing of antique Swahili chests and contemporary East African sculptures',
      'Turnkey delivery, hanging of artwork, and styling day'
    ],
    suitableFor: [
      'Newly constructed residences needing warmth and character',
      'Collectors seeking authentic bespoke African and international design',
      'Properties preparing for luxury rental or editorial publication'
    ],
    deliverables: [
      'Curated Moodboards & Material Swatch Sample Boxes',
      'Furnishing Specification & Sourcing Catalog',
      'Installation Timeline & Placement Guide'
    ],
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85',
    iconName: 'Sparkles'
  },
  {
    id: 'serv-5',
    slug: 'interior-renovation',
    title: 'Historic & Contemporary Renovation',
    subtitle: 'Revitalizing colonial homes and Swahili coastal architecture',
    shortDescription: 'Specialized restoration of historic colonial residences in Karen and Muthaiga, and traditional coral rag houses in Lamu.',
    fullDescription: 'Renovating historic Kenyan homes demands respect for original craft paired with modern mechanical engineering. We collaborate with heritage artisans to restore coral rag, stone chimneys, and timber trusses.',
    includes: [
      'Historical material analysis and condition documentation',
      'Restoration of coral rag stone, lime niru plaster, and hardwood floors',
      'Concealed integration of modern solar power, backup generators, and HVAC',
      'Complete contractor management and site oversight'
    ],
    suitableFor: [
      'Owners of historic colonial bungalows in Karen and Muthaiga',
      'Restorations of UNESCO World Heritage stone houses in Lamu Island',
      'Discerning patrons prioritizing preservation over cosmetic remodeling'
    ],
    deliverables: [
      'Conservation Strategy and Condition Audit',
      'Demolition and Preservation Marking Plans',
      'Site Supervision Reports and Quality Audits'
    ],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
    iconName: 'RotateCcw'
  },
  {
    id: 'serv-6',
    slug: 'design-consultation',
    title: 'Advisory & Design Consultation',
    subtitle: 'Direct creative counsel with our founding principals',
    shortDescription: 'Intensive strategic workshops in Nairobi or on-site to resolve spatial hurdles, review contractor plans, or formulate material palettes.',
    fullDescription: 'For clients requiring focused architectural direction. We offer targeted advisory sessions in our Karen studio, on-site anywhere in Kenya, or via WhatsApp / video.',
    includes: [
      'Two-hour intensive concept and layout review with Studio Principal',
      'On-the-spot sketching and spatial problem-solving',
      'Material review: stone, timber, plaster, and metal pairing',
      'Written action summary report delivered within 48 hours'
    ],
    suitableFor: [
      'Homeowners seeking independent second opinions before construction contracts',
      'Property investors assessing development feasibility',
      'Clients needing focused guidance on lighting, color, or contractor tenders'
    ],
    deliverables: [
      'Detailed Consultation Summary Dossier',
      'Annotated Floor Plan Sketches and Recommendations',
      'Curated Kenyan & International Artisan Directory'
    ],
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85',
    iconName: 'Compass'
  }
];

export const INITIAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art-1',
    slug: 'the-quiet-luxury-of-kenyan-stone',
    title: 'The Quiet Luxury of Kenyan Stone: Building with Volcanic Basalt and Naivasha Quarry',
    excerpt: 'Exploring how indigenous volcanic rock and coral rag stone are redefining high-end residential architecture in Nairobi and along the Swahili coast.',
    category: 'Materiality',
    readTime: '6 min read',
    publishedDate: 'January 14, 2025',
    authorName: 'Éléonore de Vauquelin',
    authorRole: 'Founder & Principal Architect',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    published: true,
    tags: ['Kenya', 'Basalt', 'Stone', 'Architecture', 'Nairobi'],
    content: [
      {
        type: 'paragraph',
        text: 'Kenya possesses an extraordinary geological spectrum. From the deep charcoal tones of volcanic basalt quarried in the Great Rift to the porous, sun-drenched coral rag of the Lamu archipelago, building with local stone anchors an interior in the physical soul of East Africa.'
      },
      {
        type: 'heading',
        text: 'The Tactility of Natural Basalt'
      },
      {
        type: 'paragraph',
        text: 'In our Muthaiga and Karen commissions, we frequently carve kitchen monoliths and courtyard hearths from dense basalt. When hand-chiseled or brushed with a satin finish, basalt absorbs harsh glare and stores daytime heat, gently warming the room during cool Nairobi nights.'
      },
      {
        type: 'quote',
        text: 'A luxury home should not be an imported replica of a European salon, but a soulful architecture deeply attuned to Kenyan earth and light.'
      }
    ]
  },
  {
    id: 'art-2',
    slug: 'the-swahili-dialogue',
    title: 'The Swahili Dialogue: Revitalizing Coral Rag and Lime Niru in Lamu',
    excerpt: 'Lessons from centuries of passive cooling, carved teak joinery, and private courtyards in the Lamu archipelago.',
    category: 'Architecture',
    readTime: '7 min read',
    publishedDate: 'February 10, 2025',
    authorName: 'Camille Laurent',
    authorRole: 'Head of Materials & Joinery',
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
    published: true,
    tags: ['Lamu', 'Swahili', 'Coastal', 'Lime Plaster', 'Heritage'],
    content: [
      {
        type: 'paragraph',
        text: 'Centuries before mechanical air conditioning, Swahili master builders in Shela and Lamu Town engineered architectural sanctuaries that remain cool under the equatorial sun through thick coral walls, high ceilings, and central open courtyards.'
      }
    ]
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    clientName: 'Dr. James & Wangari Kariuki',
    clientRole: 'Private Art Patrons',
    location: 'Muthaiga, Nairobi',
    projectTitle: 'The Muthaiga Pavilion',
    quote: 'Atelier Élysée transformed our Muthaiga property into a breathable, meditative composition of light, stone, and garden. Every morning here feels like an unhurried sanctuary.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    isFeatured: true,
    createdAt: '2025-02-15T00:00:00Z'
  },
  {
    id: 'test-2',
    clientName: 'Marcus Kiprono',
    clientRole: 'Managing Director, Horizon Capital',
    location: 'Karen, Nairobi',
    projectTitle: 'Karen Modernist Villa',
    quote: 'The team did not just redesign our residence; they re-imagined how our family connects with Nairobi’s natural beauty. Millimeter precision and exceptional taste.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    isFeatured: true,
    createdAt: '2024-12-01T00:00:00Z'
  },
  {
    id: 'test-3',
    clientName: 'Tariq Al-Mansoor',
    clientRole: 'Heritage Conservation Trustee',
    location: 'Shela, Lamu Island',
    projectTitle: 'The Lamu Coral Sanctuary',
    quote: 'They resurrected centuries of historic Swahili coral craftsmanship with peerless sensitivity, delivering a world-class home on the ocean.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    isFeatured: true,
    createdAt: '2024-10-18T00:00:00Z'
  }
];

export const STUDIO_TEAM: StudioMember[] = [
  {
    id: 'team-1',
    name: 'Éléonore de Vauquelin',
    role: 'Founder & Principal Architect',
    bio: 'Educated at École Nationale Supérieure des Beaux-Arts and the AA London. Leading commissions across Nairobi, Paris, and the Kenyan coast for over 18 years.',
    credentials: 'DPLG Architecte, RIBA International',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=85',
    quote: 'Architecture is not about filling space; it is about creating stillness.'
  },
  {
    id: 'team-2',
    name: 'Julian Vance',
    role: 'Design Director & Spatial Strategist',
    bio: 'Specialist in equatorial light simulation, volumetric passive cooling, and monolithic stone detailing for private residences in Nairobi.',
    credentials: 'M.Arch ETH Zürich',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=85',
    quote: 'When light touches raw stone with intention, the room needs no other ornament.'
  },
  {
    id: 'team-3',
    name: 'Camille Laurent',
    role: 'Head of Materials & Joinery',
    bio: 'Maintains direct partnerships with master woodturners and stone quarries across Naivasha, Lamu, and Nairobi.',
    credentials: 'Diplôme des Métiers d’Art, Paris',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=85',
    quote: 'Every tree and quarry block has a grain that wants to speak; our duty is to listen.'
  },
  {
    id: 'team-4',
    name: 'Marc Solis',
    role: 'Director of Architecture & Site Execution',
    bio: 'Oversees on-site precision and general contractors across Karen, Muthaiga, and coastal developments.',
    credentials: 'Civil & Architectural Engineering',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=85',
    quote: 'Millimeter precision is not an obsession—it is our baseline respect for the craft.'
  }
];

export const STUDIO_VALUES = [
  {
    title: 'Material Honesty',
    description: 'We build exclusively with solid Kenyan basalt, Naivasha quarry stone, reclaimed teak, cypress, lime plaster, and pure textiles that age with noble patina.'
  },
  {
    title: 'Volumetric Harmony',
    description: 'We sculpt proportions, sightlines, and passive airflow to create natural coolness and serenity under the East African sun.'
  },
  {
    title: 'Timeless Restraint',
    description: 'We reject fleeting decorative trends. Our work is designed to feel as resonant decades from now as on handover day.'
  },
  {
    title: 'Artisanal Provenance',
    description: 'We champion heritage East African crafts—master stone carvers, hand-plasterers, blacksmiths, and traditional sisal weavers.'
  }
];

export const DESIGN_PROCESS_STEPS = [
  {
    step: '01',
    phase: 'Discovery & Consultation',
    duration: '2 – 3 Weeks',
    description: 'An exploratory dialogue where we assess lifestyle habits, sun orientation, property topography, and aesthetic preferences.',
    details: [
      'In-depth lifestyle and spatial questionnaire',
      'On-site laser scanning and topography audit in Nairobi or Coast',
      'Budget alignment in KES / USD and brief formulation',
      'Initial mood dossiers and sensory material samples'
    ]
  },
  {
    step: '02',
    phase: 'Concept & Planning',
    duration: '4 – 6 Weeks',
    description: 'We explore volumetric layouts, partition reconfigurations, natural airflow axes, and core architectural narratives.',
    details: [
      'Multiple 2D spatial arrangement iterations',
      '3D massing and natural light simulation',
      'Local stone and hardwood selection',
      'Preliminary contractor feasibility check'
    ]
  },
  {
    step: '03',
    phase: 'Design Development',
    duration: '6 – 10 Weeks',
    description: 'Every joinery joint, lighting circuit, plumbing fixture, and fabric swatch is codified into comprehensive construction documentation.',
    details: [
      'Full technical architectural drawing package (1:50 & 1:20 scale)',
      'Custom joinery, kitchen, and bathroom millwork details (1:5 scale)',
      'Photorealistic 3D renderings and lighting schedules',
      'Comprehensive fixture, finish, and hardware schedule'
    ]
  },
  {
    step: '04',
    phase: 'Implementation & Styling',
    duration: '12 – 24 Weeks',
    description: 'We step onto the construction site as your uncompromised advocate, overseeing contractors, artisans, and white-glove turnkey installation.',
    details: [
      'Weekly on-site construction coordination and quality control',
      'Custom furniture fabrication and logistics coordination',
      'Hanging of artworks and curated styling day',
      'Turnkey handover with client care manuals'
    ]
  }
];

export const STUDIO_FAQS = [
  {
    question: 'Where is Atelier Élysée located in Kenya?',
    answer: 'Our main studio is located in Karen, Nairobi (14 Karen Road), with active satellite commissions across Muthaiga, Runda, Gigiri, Naivasha, and the Kenyan coast (Lamu and Watamu). You can reach us directly via WhatsApp at 0110413132.'
  },
  {
    question: 'How do you handle contractor management across Kenya?',
    answer: 'We act as the client’s principal design advocate throughout construction. We prepare tender packages for vetted general contractors, perform bi-weekly on-site audits, resolve site conditions, and verify that all joinery and stone installations adhere strictly to our technical drawings.'
  },
  {
    question: 'What is the typical investment budget for a project?',
    answer: 'Our commissions typically range from KES 15,000,000 to KES 100,000,000+ depending on property scale, ground-up architectural complexity, and custom millwork requirements. We also offer focused private design advisory workshops.'
  },
  {
    question: 'Can I book a consultation via WhatsApp?',
    answer: 'Yes. You can contact our directorship directly on WhatsApp at 0110413132 (+254 110 413 132) for instant booking and introductory inquiries.'
  }
];
