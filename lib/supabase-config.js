import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mgvyieyismzzvdejsvcv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ndnlpZXlpc216enZkZWpzdmN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1NDI2NTMsImV4cCI6MjA5OTExODY1M30.xE-K83Ku3ei3GlFkwKivtBzGMDyK60R6MnYr2eEFz-I';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function getCaseData(phone, code) {
  // تجربة صيغ الهاتف المحلية والدولية تحافظ على توافق السجلات القديمة مع الإدخالات الجديدة من لوحة الإدارة.
  const digits = String(phone || '').replace(/\D/g, '');
  const localPhone = digits.replace(/^20/, '').replace(/^0/, '');
  const phoneVariants = [...new Set([digits, `20${localPhone}`, `0${localPhone}`].filter(Boolean))];
  let lastError = null;

  for (const phoneVariant of phoneVariants) {
    const { data, error } = await supabase.rpc('get_case_data', {
      p_phone: phoneVariant,
      p_code: code,
    });
    if (error) lastError = error;
    if (data && data.case) return { data, error: null };
  }

  return { data: null, error: lastError };
}
