import React, { useState, useEffect } from 'react';
import styles from './OrderForm.module.css';
import emailjs from '@emailjs/browser';
import { useLang } from '../i18n/useTranslation.jsx';
import { PRODUCTS } from './Surfaces';

// Produit affiché par défaut tant qu'aucun produit n'a encore été cliqué
const DEFAULT_PRODUCT = PRODUCTS.find(p => p.id === 2); // Power Clean

const EJS_SERVICE  = 'service_bwd9ism';
const EJS_TEMPLATE = 'template_zc7bwex';
const EJS_KEY      = 'uzIU9Cu-APsEGhXVf';

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzWyOyX6j-c7uKwHG9e78eo7qqWC4GYC6UZLp3D5ehqFElMuxpmvU3nu1tMoxsYPQ6l/exec';

const INITIAL = {
  name: '', phone: '', wilaya: '', notes: '',
};

const WILAYAS = [
  'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan',
  'Bizerte', 'Béja', 'Jendouba', 'Le Kef', 'Siliana', 'Sousse',
  'Monastir', 'Mahdia', 'Sfax', 'Kairouan', 'Kasserine', 'Sidi Bouzid',
  'Gabès', 'Medenine', 'Tataouine', 'Gafsa', 'Tozeur', 'Kébili',
];

const IcoTruck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/>
    <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);
const IcoCard = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);
const IcoCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const IcoLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const IcoWhatsapp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.82L2 22l5.4-1.42a9.87 9.87 0 0 0 4.64 1.18h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.13-2.9-7-1.87-1.87-4.35-2.85-7.01-2.85zm0 1.67c2.22 0 4.31.87 5.88 2.44a8.2 8.2 0 0 1 2.43 5.8c0 4.55-3.71 8.25-8.31 8.25a8.3 8.3 0 0 1-4.22-1.15l-.3-.18-3.2.84.86-3.12-.2-.32a8.15 8.15 0 0 1-1.27-4.4c0-4.55 3.71-8.25 8.32-8.25zm-4.6 4.66c-.17 0-.44.06-.67.32-.23.26-.87.85-.87 2.07s.9 2.4 1.02 2.57c.13.17 1.75 2.68 4.24 3.75.6.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29-.26-.13-1.47-.72-1.7-.8-.23-.09-.4-.13-.56.13-.17.26-.64.8-.79.97-.14.16-.29.18-.54.06-.26-.13-1.08-.4-2.06-1.27-.76-.68-1.28-1.51-1.43-1.77-.14-.26-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.16.17-.27.26-.45.09-.18.04-.34-.02-.47-.06-.13-.56-1.37-.78-1.87-.2-.5-.4-.42-.56-.43z"/>
  </svg>
);

const FOOTER_TRUST = [
  { icon: <IcoCard />,  label: 'Paiement à la livraison' },
  { icon: <IcoLock />,  label: '100% sécurisé' },
  { icon: <IcoTruck />, label: 'Livraison gratuite' },
];

export default function OrderForm({ selectedProduct = DEFAULT_PRODUCT }) {
  const { t } = useLang();

  const [form, setForm]       = useState(INITIAL);
  const [qty, setQty]         = useState(1);
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors]   = useState({});

  const prodName  = selectedProduct?.name  || DEFAULT_PRODUCT.name;
  // orderImage = photo dédiée à afficher dans le formulaire de commande (sinon on reprend l'image de la carte produit)
  const prodImage = selectedProduct?.orderImage || selectedProduct?.image || DEFAULT_PRODUCT.orderImage;
  // gallery = les 2 petites photos affichées à côté de la grande (spécifiques à chaque produit)
  const gallery   = selectedProduct?.gallery || DEFAULT_PRODUCT.gallery || [];

  const [activeImg, setActiveImg] = useState(prodImage);

  // À chaque changement de produit sélectionné, on remet la grande image
  // sur la photo principale de CE produit (sinon l'ancienne image reste affichée).
  useEffect(() => {
    setActiveImg(prodImage);
  }, [prodImage]);

  const originalPrice = 21;
  const salePrice     = 17;
  const livraison     = 5;
  const discountPct   = Math.round((1 - salePrice / originalPrice) * 100);
  const subtotal      = qty * salePrice;
  const total         = subtotal + livraison;

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim())    e.name    = 'Requis';
    if (!form.phone.trim())   e.phone   = 'Requis';
    if (!form.wilaya)         e.wilaya  = 'Requis';
    return e;
  }

  async function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSending(true);

    const now = new Date();
    const nameParts = form.name.trim().split(' ');
    const prenom = nameParts[0] || '';
    const nom    = nameParts.slice(1).join(' ') || '—';

    const data = {
      date:      now.toLocaleDateString('fr-FR'),
      heure:     now.toLocaleTimeString('fr-FR'),
      prenom:    prenom,
      nom:       nom,
      telephone: form.phone,
      wilaya:    form.wilaya,
      produit:   prodName,
      quantite:  qty,
      total:     `${total} TND`,
      notes:     form.notes || '—',
    };

    try {
      await emailjs.send(EJS_SERVICE, EJS_TEMPLATE, data, EJS_KEY);

      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      setSuccess(true);
      setForm(INITIAL);
      setQty(1);
      setTimeout(() => setSuccess(false), 6000);

      // ── Meta Pixel : suivi de conversion (commande passée) ──
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', 'Lead', {
          content_name: prodName,
          value: total,
          currency: 'TND',
        });
      }
    } catch (err) {
      alert('Erreur envoi. Réessayez ou contactez-nous.');
      console.error(err);
    } finally {
      setSending(false);
    }
  }

  return (
    <section className={styles.section} id="order">
      <div className={styles.card}>

        {/* ── Titre + prix ── */}
        <div className={styles.header}>
          <h1 className={styles.prodTitle}>{prodName}</h1>
          <div className={styles.priceRow}>
            <span className={styles.salePrice}>{salePrice.toFixed(2)} DT</span>
            <s className={styles.oldPrice}>{originalPrice.toFixed(2)} DT</s>
            <span className={styles.badge}>−{discountPct}%</span>
          </div>
        </div>

        {/* ── Image principale ── */}
        <div className={styles.imageWrap}>
          <img src={activeImg} alt={prodName} className={styles.mainImg} />
        </div>

        {/* ── Miniatures cliquables ── */}
        <div className={styles.thumbRow}>
          <img
            src={prodImage}
            alt={`${prodName} principale`}
            className={`${styles.thumb} ${activeImg === prodImage ? styles.thumbActive : ''}`}
            onClick={() => setActiveImg(prodImage)}
          />
          {gallery.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${prodName} ${i + 1}`}
              className={`${styles.thumb} ${activeImg === src ? styles.thumbActive : ''}`}
              onClick={() => setActiveImg(src)}
            />
          ))}
        </div>

        {/* ── Formulaire ── */}
        <div className={styles.formBody}>
          <h3 className={styles.formTitle}>{t.form.title || 'Informations personnelles'}</h3>

          <Field label={t.form.name} required error={errors.name}>
            <input
              value={form.name}
              onChange={e => set('name', e.target.value)}
              placeholder={t.form.namePh}
            />
          </Field>

          <Field label={t.form.phone} required error={errors.phone}>
            <input
              value={form.phone}
              onChange={e => set('phone', e.target.value)}
              placeholder={t.form.phonePh}
              type="tel"
            />
          </Field>

          <Field label="Wilaya" required error={errors.wilaya}>
            <select
              value={form.wilaya}
              onChange={e => set('wilaya', e.target.value)}
            >
              <option value="">— Choisir —</option>
              {WILAYAS.map(w => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </Field>

          {/* ── Résumé commande ── */}
          <div className={styles.summary}>
            <div className={styles.sumRow}>
              <span>Sous-total</span>
              <span>{subtotal.toFixed(2)} DT</span>
            </div>
            <div className={styles.sumRow}>
              <span>Livraison</span>
              <span>{livraison.toFixed(2)} DT</span>
            </div>
            <div className={styles.sumTotal}>
              <span>Total</span>
              <span>{total.toFixed(2)} DT</span>
            </div>
          </div>

          {/* ── Action : bouton + quantité ── */}
          <div className={styles.actionRow}>
            <button className={styles.btnBuy} onClick={handleSubmit} disabled={sending}>
              {sending ? (t.form.sending || 'Envoi...') : (t.form.btn || 'Commander')} ✨
            </button>

            <div className={styles.qtyBox}>
              <button className={styles.qtyBtn} onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Diminuer">−</button>
              <span className={styles.qtyVal}>{qty}</span>
              <button className={styles.qtyBtn} onClick={() => setQty(q => q + 1)} aria-label="Augmenter">+</button>
            </div>
          </div>

          {/* ── Contact WhatsApp ── */}
          <a
            href="https://wa.me/21654444452"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnWhatsapp}
          >
            <IcoWhatsapp />
            <span>Commander via WhatsApp</span>
          </a>

          {success && (
            <div className={styles.successMsg}>
              <IcoCheck />
              <span>{t.form.success || 'Commande envoyée avec succès !'}</span>
            </div>
          )}

          <div className={styles.trust}>
            {FOOTER_TRUST.map(({ icon, label }) => (
              <span key={label} className={styles.trustItem}>
                <span className={styles.trustItemIcon}>{icon}</span>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, required, error, children }) {
  return (
    <div className={`${styles.field} ${error ? styles.fieldError : ''}`}>
      <label>{label}{required && <span className={styles.req}>*</span>}</label>
      {children}
      {error && <span className={styles.errMsg}>{error}</span>}
    </div>
  );
}