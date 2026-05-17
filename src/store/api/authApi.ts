import { baseApi } from './baseApi';
import { setCredentials, setOtpId } from '../slices/authSlice';

// ✅ Safe cookie helpers — only run in browser
const setCookie = (token: string) => {
  if (typeof document === 'undefined') return;
  document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data: { name: string; email: string; password: string; phone: string }) => ({
        url: '/auth/signup',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data?.accessToken && data?.data?.user) {
            dispatch(setCredentials({
              token: data.data.accessToken,
              user: data.data.user,
            }));
            setCookie(data.data.accessToken);
          }
        } catch (error) {
          console.error('Signup failed:', error);
        }
      },
    }),

    login: builder.mutation({
      query: (data: { email: string; password: string }) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data?.accessToken && data?.data?.user) {
            dispatch(setCredentials({
              token: data.data.accessToken,
              user: data.data.user,
            }));
            setCookie(data.data.accessToken);
          }
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
    }),

    requestOtp: builder.mutation({
      query: (data: { identifier: string; method: string; role: string }) => ({
        url: '/otp/request',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data?.otpId) {
            dispatch(setOtpId(data.data.otpId));
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),

    verifyOtp: builder.mutation({
      query: (data: { otpId: string; identifier: string; code: string }) => ({
        url: '/otp/verify',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data?.accessToken && data?.data?.user) {
            dispatch(setCredentials({
              token: data.data.accessToken,
              user: data.data.user,
            }));
            setCookie(data.data.accessToken);
          }
        } catch (error) {
          console.error('OTP verify failed:', error);
        }
      },
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useRequestOtpMutation,
  useVerifyOtpMutation,
} = authApi;