export type ProjectCategory = 'all' | 'residential' | 'commercial' | 'renovation' | 'interior' | 'civil';

export interface ProjectItem {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  location: string;
  completionTimeline: string;
  scope: string;
  description: string;
  features: string[];
  imageUrl: string;
  isSample: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  iconName: string;
  highlights: string[];
  typicalProjects: string[];
}

export interface CompanyInfo {
  companyName: string;
  tagline: string;
  secondaryTagline: string;
  proprietorName: string;
  proprietorRole: string;
  primaryPhone: string;
  whatsappPhone: string;
  email: string;
  address: string;
  serviceArea: string;
  yearsOfExperience: string;
  operatingHours: string;
  gstNumberPlaceholder: string;
  proprietorPhotoUrl?: string;
}

export interface EstimateParams {
  category: 'residential' | 'commercial' | 'renovation' | 'interior';
  areaSqFt: number;
  qualityGrade: 'standard' | 'premium' | 'luxury';
  floors: number;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  location: string;
  message: string;
  preferredDate?: string;
  preferredTime?: string;
  appointmentType?: string;
  submittedAt: string;
  syncedWithSupabase?: boolean;
  supabaseTable?: string;
}
