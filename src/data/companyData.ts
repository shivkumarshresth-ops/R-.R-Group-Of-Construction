import { CompanyInfo, ServiceItem, ProjectItem } from '../types';

export const initialCompanyInfo: CompanyInfo = {
  companyName: 'R.R GROUP OF CONSTRUCTION',
  tagline: 'Building Dreams, Creating Excellence',
  secondaryTagline: 'Your Vision, Our Construction',
  proprietorName: 'Raju Kumar',
  proprietorRole: 'Proprietor',
  primaryPhone: '+91 8802082025',
  whatsappPhone: '+91 8285267362',
  email: 'rrgroupconstruction@gmail.com',
  address: 'Inderpuri, New Delhi, India',
  serviceArea: 'Delhi NCR & Surrounding Regions [Service Area]',
  yearsOfExperience: '[Years of Experience]',
  operatingHours: 'Monday - Saturday: 9:00 AM - 7:00 PM',
  gstNumberPlaceholder: '[GST / Registration No.]',
  proprietorPhotoUrl: '/src/assets/images/proprietor_raju_kumar_1791131134267.jpg',
};

export const servicesData: ServiceItem[] = [
  {
    id: 'residential-construction',
    title: 'Residential Construction',
    shortDescription: 'Custom homes, multi-story duplexes, independent villas, and residential builder floors constructed with structural precision.',
    detailedDescription: 'From groundbreaking foundation to the final coat of paint, we engineer durable, aesthetic living spaces customized to your family’s requirements, adhering to earthquake-resistant structural safety codes.',
    iconName: 'Home',
    highlights: [
      'Custom architectural layout & load-bearing design',
      'High-grade reinforcement steel & certified concrete mix',
      'Turnkey project execution with scheduled milestones',
      'Waterproofing & thermal insulation protection'
    ],
    typicalProjects: ['Independent Villas', 'Floors & Apartments', 'Townhouses', 'Farmhouses']
  },
  {
    id: 'commercial-construction',
    title: 'Commercial Building Construction',
    shortDescription: 'Modern corporate offices, retail spaces, commercial complexes, and warehousing facilities designed for heavy foot traffic.',
    detailedDescription: 'Commercial structures require strict deadline adherence, utility efficiency, and robust structural engineering. We deliver turnkey commercial environments that accommodate business infrastructure seamlessly.',
    iconName: 'Building2',
    highlights: [
      'Structural steel & reinforced concrete frames',
      'HVAC, electrical riser & fire-suppression integration',
      'Energy-efficient glass curtain facades',
      'Compliance with local building and municipal codes'
    ],
    typicalProjects: ['Corporate Office Spaces', 'Retail Hubs & Showrooms', 'Clinics & Facilities', 'Light Industrial Warehouses']
  },
  {
    id: 'interior-design',
    title: 'Interior Design & Space Planning',
    shortDescription: 'Bespoke residential and commercial interior solutions emphasizing functional elegance, ergonomics, and clean aesthetics.',
    detailedDescription: 'Transform bare shells into cohesive, luxurious interiors. We integrate spatial flow, lighting geometry, color harmony, and custom bespoke cabinetry tailored to modern lifestyles.',
    iconName: 'Armchair',
    highlights: [
      '3D spatial layouts & mood boards',
      'Custom veneer, laminate, and acrylic millwork',
      'Architectural lighting schematics & switchboard planning',
      'Premium hardware and branded fittings'
    ],
    typicalProjects: ['Living & Dining Lounges', 'Executive Director Suites', 'Modern Kitchens', 'Boutique Retail Interiors']
  },
  {
    id: 'renovation-remodeling',
    title: 'Renovation & Remodeling',
    shortDescription: 'Full-scope property modernization, structural floor additions, facade overhauls, and interior reconfigurations.',
    detailedDescription: 'Revitalize aging properties with structural reinforcement, upgraded plumbing and wiring, expanded room configurations, and contemporary exterior treatments that preserve architectural integrity while modernizing utilities.',
    iconName: 'Hammer',
    highlights: [
      'Structural retrofitting & beam reinforcements',
      'Wall removal and open-concept floor plan conversion',
      'Complete bathroom & kitchen modernization',
      'Exterior plastering, tile cladding & texture coating'
    ],
    typicalProjects: ['Home Expansions', 'Facade Restoration', 'Office Refurbishment', 'Kitchen & Bath Overhauls']
  },
  {
    id: 'civil-structural-work',
    title: 'Civil & Structural Work',
    shortDescription: 'Deep foundations, RCC framework, retaining walls, excavation, and heavy structural engineering.',
    detailedDescription: 'The core backbone of any lasting structure. Our civil engineering expertise covers excavation, raft and pile foundations, reinforced cement concrete (RCC) columns, beams, slabs, and specialized masonry work.',
    iconName: 'HardHat',
    highlights: [
      'Soil bearing capacity assessment coordination',
      'Engineered shuttering, centering & formwork',
      'Precision rebar placement & ultrasonic curing protocols',
      'Retaining boundary walls & drainage channels'
    ],
    typicalProjects: ['RCC Columns & Slabs', 'Retaining Structures', 'Foundation Piling', 'Underground Sumps & Basements']
  },
  {
    id: 'electrical-plumbing-work',
    title: 'Electrical & Plumbing Work',
    shortDescription: 'Concealed conduit electrical wiring, distribution panels, sanitary piping, CPVC/UPVC water lines, and drainage.',
    detailedDescription: 'Safe, concealed MEP (Mechanical, Electrical, Plumbing) installations. We implement leak-tested pressure plumbing, dedicated circuits with MCB/ELCB safety tripping, and concealed smart home conduit provisioning.',
    iconName: 'Zap',
    highlights: [
      'Heavy-gauge copper fire-retardant concealed wiring',
      'Pressure-tested hot/cold plumbing pipelines',
      'Submersible pump setups & overhead tank automation',
      'Sanitary fixture installations & sewage drop lines'
    ],
    typicalProjects: ['Full-Building Conduit Works', 'Main Distribution Panels', 'Bathroom Fixture Lines', 'Stormwater Drainage']
  },
  {
    id: 'modular-false-ceiling',
    title: 'Modular & False Ceiling Work',
    shortDescription: 'Architectural gypsum ceilings, POP cornices, acoustic grid panels, and modular wardrobe/kitchen installations.',
    detailedDescription: 'Elevate your interiors with seamless gypsum false ceilings featuring recessed cove lighting, acoustic attenuation, and factory-finished modular storage solutions that maximize every square foot.',
    iconName: 'Layers',
    highlights: [
      'Heavy galvanized steel channel framework',
      'Moisture-resistant gypsum and grid ceiling boards',
      'Seamless cove lighting profiles & magnetic track channels',
      'Modular kitchens with soft-close German hardware'
    ],
    typicalProjects: ['Linear & Curved False Ceilings', 'Modular Kitchen Units', 'Floor-to-Ceiling Wardrobes', 'Acoustic Office Ceilings']
  },
  {
    id: 'project-planning-management',
    title: 'Project Planning & Management',
    shortDescription: 'End-to-end site supervision, material procurement tracking, bill of quantities (BOQ), and timeline controls.',
    detailedDescription: 'Eliminate project delays and budget blowouts. We supervise on-site labor daily, verify material deliveries against specifications, track construction stages, and maintain open communication throughout.',
    iconName: 'ClipboardCheck',
    highlights: [
      'Transparent material BOQ and stage-wise billing',
      'Daily site supervision & progress reporting',
      'Vendor management & quality testing',
      'Safety guideline implementation for on-site personnel'
    ],
    typicalProjects: ['Owner Representation', 'Material Sourcing Oversight', 'Timeline & Budget Audits', 'Site Safety Coordination']
  }
];

export const sampleProjects: ProjectItem[] = [
  {
    id: 'sample-project-1',
    title: 'Contemporary Multi-Story Villa',
    category: 'residential',
    categoryLabel: 'Residential Construction',
    location: 'Inderpuri & NCR Belt [Sample Location]',
    completionTimeline: '14 Months [Sample Timeline]',
    scope: 'Complete Turnkey RCC Construction, Architectural Facade & MEP',
    description: 'A 3-level residential luxury home featuring cantilevered balconies, integrated facade louvers, expansive double-height living areas, and a structural terrace garden. Executed from foundation excavation to finishing.',
    features: [
      'Seismic-resistant RCC framed structure',
      'Large format sliding thermal glass partitions',
      'Concealed ambient and architectural exterior illumination',
      'Imported marble flooring and teakwood accents'
    ],
    imageUrl: '/src/assets/images/project_residential_villa_1791130037459.jpg',
    isSample: true
  },
  {
    id: 'sample-project-2',
    title: 'Modern Corporate Business Complex',
    category: 'commercial',
    categoryLabel: 'Commercial Building',
    location: 'Commercial Hub, New Delhi [Sample Location]',
    completionTimeline: '18 Months [Sample Timeline]',
    scope: 'RCC Superstructure, Curtain Wall Glazing & Commercial Utilities',
    description: 'Mid-rise commercial office building engineered for corporate tenants. Features high-capacity utility shafts, basement parking, structural glass facade with high solar reflectance, and open-plan floors.',
    features: [
      'Heavy load-bearing floor slabs for office equipment',
      'Energy efficient double-glazed facade unit',
      'Central fire staircase & emergency egress design',
      'Underground rainwater harvesting sump'
    ],
    imageUrl: '/src/assets/images/project_commercial_complex_1791130050505.jpg',
    isSample: true
  },
  {
    id: 'sample-project-3',
    title: 'Modern Executive Living & False Ceiling Interior',
    category: 'interior',
    categoryLabel: 'Interior & False Ceiling',
    location: 'South Delhi Residence [Sample Location]',
    completionTimeline: '3 Months [Sample Timeline]',
    scope: 'Architectural False Ceilings, Modular Woodwork, Ambient Lighting',
    description: 'Interior renovation and finishing for an executive residence. Included multi-tiered recessed gypsum ceilings with warm LED coves, fluted wall paneling, Italian stone wall cladding, and modular cabinetry.',
    features: [
      'Dual-tier gypsum ceiling with magnetic spotlight tracks',
      'Custom wall paneling with brushed brass inlay',
      'Concealed AC ducting and hidden access doors',
      'Zero-defect paint and polyurethane polish'
    ],
    imageUrl: '/src/assets/images/project_interior_renovation_1791130063156.jpg',
    isSample: true
  },
  {
    id: 'sample-project-4',
    title: 'Engineered Foundation & Civil Superstructure',
    category: 'civil',
    categoryLabel: 'Civil & Structural Works',
    location: 'Industrial & Residential Sector [Sample Location]',
    completionTimeline: '6 Months [Sample Timeline]',
    scope: 'Sub-structure Piling, Column Grid & Heavy Shuttering',
    description: 'Precision civil engineering involving high-strength concrete pour, heavy rebar cage assembly, retaining basement walls, and vibration compaction testing for a multi-story development.',
    features: [
      'M25/M30 certified ready-mix concrete execution',
      'Laser-leveled shuttering and steel staging',
      'Anti-termite and bitumen damp-proof course treatment',
      'Cube testing and structural engineer sign-off'
    ],
    imageUrl: '/src/assets/images/hero_construction_modern_building_1791130021817.jpg',
    isSample: true
  }
];

export const whyChooseUsPillars = [
  {
    title: 'Quality Workmanship',
    description: 'We do not compromise on material grades or construction methodology. Every brick, rebar bar, and concrete mix ratio is inspected to ensure enduring structural stability.'
  },
  {
    title: 'Reliable Service',
    description: 'Clear commitments, milestone-based progress schedules, and honest updates. We treat your investment and timeline with strict professional accountability.'
  },
  {
    title: 'Customer Satisfaction',
    description: 'Close collaboration from initial blueprint sketches through key handover. We accommodate your design preferences while providing grounded construction advice.'
  },
  {
    title: 'Modern Design',
    description: 'Contemporary spatial planning, clean architectural lines, innovative false ceiling patterns, and ergonomic layouts suited for modern living.'
  }
];

export const constructionProcessSteps = [
  {
    step: '01',
    title: 'Consultation & Site Evaluation',
    description: 'We meet with you to review your property, assess soil and plot boundaries, discuss your requirements, and understand your preliminary budget parameters.'
  },
  {
    step: '02',
    title: 'Planning, BOQ & Cost Estimate',
    description: 'Our team develops the structural plan, material specification bill (BOQ), timeline milestones, and a clear transparent estimate without hidden charges.'
  },
  {
    step: '03',
    title: 'Execution & Milestone Inspection',
    description: 'Active construction begins under direct on-site supervision. We manage labor, materials, and MEP rough-ins with periodic quality inspections.'
  },
  {
    step: '04',
    title: 'Snagging, Finishing & Handover',
    description: 'Detailed final inspection covers paint finish, plumbing pressure, electrical circuits, and fixtures before delivering keys to your completed project.'
  }
];

export const safetyCommitments = [
  {
    title: 'Personal Protective Equipment (PPE)',
    description: 'Hard hats, safety boots, high-visibility vests, and eye protection are mandatory protocols across all active job sites.'
  },
  {
    title: 'Scaffolding & Fall Prevention',
    description: 'Engineered metal scaffolding, safety netting, and secure staging to safeguard workers and neighboring properties.'
  },
  {
    title: 'Material Quality Verification',
    description: 'Routine batch testing of steel grades, cement freshness, aggregates, and electrical conduits against building safety standards.'
  },
  {
    title: 'Clean & Organized Job Sites',
    description: 'Regular debris clearing, hazard marking, and secured storage for heavy machinery and flammable finishing supplies.'
  }
];
