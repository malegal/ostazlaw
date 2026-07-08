// supabase-config.js
// ملف إعدادات Supabase المركزي – يتم استيراده في جميع الصفحات

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';

// ==========================================================
// إعدادات Supabase (ضع مفاتيحك هنا)
// ==========================================================
const SUPABASE_URL = 'https://mgvyieyismzzvdejsvcv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ndnlpZXlpc216enZkZWpzdmN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1NDI2NTMsImV4cCI6MjA5OTExODY1M30.xE-K83Ku3ei3GlFkwKivtBzGMDyK60R6MnYr2eEFz-I';

// ==========================================================
// إنشاء عميل Supabase
// ==========================================================
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ==========================================================
// (اختياري) تصدير الدوال الشائعة للاستخدام المريح
// ==========================================================
export async function getCaseData(phone, code) {
    const { data, error } = await supabase.rpc('get_case_data', {
        p_phone: phone,
        p_code: code
    });
    return { data, error };
}
