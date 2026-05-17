import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Company {
  _id: string;
  slug: string;
  name: string;
  email: string;
  registeredAddress?: string;
  corporateAddress?: string;
  cin?: string;
  gstin?: string;
  pan?: string;
  epf?: string;
  esic?: string;
  profileStatus?: string;
  profileCompletion?: number;
  isActive?: boolean;
}

interface CompanyState {
  currentCompany: Company | null;
  companies: Company[];
}

const initialState: CompanyState = {
  currentCompany: null,
  companies: [],
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCurrentCompany: (state, action: PayloadAction<Company>) => {
      state.currentCompany = action.payload;
    },
    setCompanies: (state, action: PayloadAction<Company[]>) => {
      state.companies = action.payload;
    },
    clearCompany: (state) => {
      state.currentCompany = null;
    },
  },
});

export const { setCurrentCompany, setCompanies, clearCompany } =
  companySlice.actions;
export default companySlice.reducer;