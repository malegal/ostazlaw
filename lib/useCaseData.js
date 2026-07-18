import useSWR from 'swr';
import { getCaseData } from './supabase-config';

export function useCaseData(phone, code) {
  const key = phone && code ? `/api/case?phone=${phone}&code=${code}` : null;
  const { data, error, isLoading } = useSWR(
    key,
    () => getCaseData(phone, code),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // 1 دقيقة
    }
  );
  return { data, error, isLoading };
}
