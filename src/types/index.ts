export interface User {
  id: string;
  email: string;
  role: string;
  companyId?: string;
}

export interface Tender {
  _id: string;
  title: string;
  description?: string;
  deadline: string;
  status: 'active' | 'closed' | 'draft';
}

export interface Bid {
  _id: string;
  tenderTitle: string;
  bidAmount: number;
  status: string;
  companyId: string;
}

export interface Company {
  _id: string;
  name: string;
  email: string;
  registeredAddress?: string;
  corporateAddress?: string;
  cin?: string;
  gstin?: string;
  pan?: string;
  epf?: string;
  esic?: string;
  profileCompletion?: number;
  profileStatus?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}