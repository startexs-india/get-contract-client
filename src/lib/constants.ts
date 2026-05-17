export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/auth/signup',
    LOGIN: '/auth/login',
    OTP_REQUEST: '/otp/request',
    OTP_VERIFY: '/otp/verify',
  },
  TENDER: {
    LIST: '/tender/list',
    DETAIL: (id: string) => `/tender/${id}`,
    APPLY: (id: string) => `/tender/${id}/apply`,
  },
  BID: {
    LIST: (companyId: string) => `/bid/${companyId}`,
    CREATE: (companyId: string) => `/bid/${companyId}`,
    UPDATE: (id: string) => `/bid/${id}`,
    DELETE: (id: string) => `/bid/${id}`,
  },
  COMPANY: {
    CREATE: '/company',
    GET: (id: string) => `/company/${id}`,
    UPDATE: (id: string) => `/company/${id}`,
    LIST: '/company/list',
    DELETE: (id: string) => `/company/${id}`,
  },
};

export const ROUTES = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  OTP_REQUEST: '/otp-request',
  OTP_VERIFY: '/otp-verify',
  DASHBOARD: '/dashboard',
  TENDERS: '/tenders',
  MY_BIDS: '/my-bids',
  COMPANY: '/company',
};

export const BID_STATUS = {
  SUBMITTED: 'Submitted',
  UNDER_EVALUATION: 'Under Evaluation',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
};