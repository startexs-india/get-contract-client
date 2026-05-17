import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

/**
 * companyId  → raw MongoDB _id  (use in API calls)
 * slug       → human readable   (use in URLs)
 */
export const useCompanyId = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { currentCompany } = useSelector((state: RootState) => state.company);

  const companyId = user?.companyIds?.[0] ?? null;
  const slug = currentCompany?.slug ?? null;

  return { companyId, slug };
};