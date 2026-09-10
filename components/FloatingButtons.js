import Icon from './Icon';

export default function FloatingButtons() {
  return (
    <>
      {/* واتساب هو الإجراء العائم الأساسي، بينما يظهر الاتصال العائم على الهاتف فقط عبر CSS. */}
      <a href="https://wa.me/201101076000" target="_blank" rel="noopener noreferrer" className="float-whatsapp" aria-label="تواصل عبر واتساب">
        {/* الأيقونة تستخدم مسار واتساب الرسمي، والفئة المخصصة تضبط حجمه داخل الزر العائم فقط. */}
        <Icon name="whatsapp" className="whatsapp-official-icon" />
      </a>
      {/* زر اتصال مستقل وواضح على الهاتف، بعيد بصريًا عن لون واتساب. */}
      <a href="tel:+201101076000" className="float-phone" aria-label="اتصال هاتفي بمؤسسة جاد الرب" title="اتصال هاتفي">
        <Icon name="phone" />
      </a>
    </>
  );
}
