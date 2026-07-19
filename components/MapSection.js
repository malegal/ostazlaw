export default function MapSection() {
  return (
    <section className="map-section" aria-label="موقع المكتب">
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1819.3414902100868!2d32.8988582!3d24.0886561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDA1JzE5LjIiTiAzMsKwNTMnNTUuOSJF!5e0!3m2!1sar!2seg!4v1700000000000!5m2!1sar!2seg"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="موقع مؤسسة الأستاذ محمود عبد الحميد للمحاماة في أسوان"
        ></iframe>
      </div>
      <div className="map-address">
        <i className="fas fa-map-marker-alt"></i>
        شارع كسر الحجر، المتفرع من شارع كورنيش النيل، أمام مجمع المحاكم – أسوان، مصر
      </div>
      <style jsx>{`
        .map-section {
          padding: 5rem 2rem;
          background: var(--light-gray);
        }
        .map-section .map-container {
          max-width: 1200px;
          margin: 0 auto;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(176, 141, 87, 0.15);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
          height: 350px;
        }
        .map-section .map-container iframe {
          width: 100%;
          height: 100%;
          border: 0;
        }
        .map-section .map-address {
          text-align: center;
          margin-top: 1.5rem;
          font-weight: 700;
          color: var(--charcoal);
          font-size: 1.05rem;
        }
        .map-section .map-address i {
          color: var(--matte-gold);
          margin-left: 0.4rem;
        }
        @media (max-width: 820px) {
          .map-section .map-container { height: 250px; }
        }
        @media (max-width: 640px) {
          .map-section .map-container { height: 200px; }
        }
      `}</style>
    </section>
  );
}
