import React, { useState } from 'react';
import styles from './OrderForm.module.css';
import emailjs from '@emailjs/browser';
import { useLang } from '../i18n/useTranslation.jsx';

const EJS_SERVICE  = 'service_bwd9ism';
const EJS_TEMPLATE = 'template_zc7bwex';
const EJS_KEY      = 'uzIU9Cu-APsEGhXVf';

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzWyOyX6j-c7uKwHG9e78eo7qqWC4GYC6UZLp3D5ehqFElMuxpmvU3nu1tMoxsYPQ6l/exec';

const INITIAL = {
  name: '', phone: '', address: '', wilaya: '', notes: '',
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
const IcoCart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);
const IcoArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
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
const IcoStar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const TRUST_ITEMS = [
  { icon: <IcoTruck />, label: 'Livraison rapide' },
  { icon: <IcoStar />,  label: 'Qualité garantie' },
  { icon: <IcoCard />,  label: 'Paiement à la livraison' },
];
const FOOTER_TRUST = [
  { icon: <IcoCard />,  label: 'Paiement à la livraison' },
  { icon: <IcoLock />,  label: '100% sécurisé' },
  { icon: <IcoTruck />, label: 'Livraison gratuite' },
];

export default function OrderForm({ selectedProduct }) {
  const { t } = useLang();

  const [form, setForm]       = useState(INITIAL);
  const [qty, setQty]         = useState(1);
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors]   = useState({});

  const prodName  = selectedProduct?.name  || 'MBWAAY Power Clean';
  const prodSub   = selectedProduct?.sub   || 'Super Dégraissant Multi‑Usage';
  const prodColor = selectedProduct?.color || '#3ecf6e';

  const originalPrice = 21;
  const salePrice     = 17;
  const livraison     = 5;
  const total         = qty * salePrice + livraison;
  const savings       = (originalPrice - salePrice) * qty;

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim())    e.name    = 'Requis';
    if (!form.phone.trim())   e.phone   = 'Requis';
    if (!form.address.trim()) e.address = 'Requis';
    if (!form.wilaya)         e.wilaya  = 'Requis';
    return e;
  }

  async function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSending(true);

    const now = new Date();
    const data = {
      nom:      form.name,
      telephone: form.phone,
      wilaya:   form.wilaya,
      adresse:  form.address,
      produit:  prodName,
      quantite: qty,
      total:    `${total} TND`,
      economie: `${savings} TND`,
      notes:    form.notes || '—',
      date:     now.toLocaleDateString('fr-FR'),
      heure:    now.toLocaleTimeString('fr-FR'),
    };

    try {
      // 1. Email via EmailJS
      await emailjs.send(EJS_SERVICE, EJS_TEMPLATE, data, EJS_KEY);

      // 2. Google Sheets
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
    } catch (err) {
      alert('Erreur envoi. Réessayez ou contactez-nous.');
      console.error(err);
    } finally {
      setSending(false);
    }
  }

  return (
    <section className={styles.section} id="order">
      <div className={styles.noise} />
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      <div className={styles.inner}>
        <div className={styles.titleBlock} />
        <div className={styles.layout}>

          <aside className={styles.productCard}>
            <div className={styles.priceBlock}>
              <div className={styles.oldRow}>
                <s className={styles.oldPrice}>{originalPrice} TND</s>
                <span className={styles.pill}>−19%</span>
              </div>
              <div className={styles.newPrice}>
                {salePrice}<span className={styles.cur}> TND</span>
                <span className={styles.per}>/unité</span>
              </div>

              <div className={styles.livraisonRow}>
                <span className={styles.livraisonLabel}>🚚 {t.form.livraison}</span>
                <span className={styles.livraisonPrice}>{livraison} TND</span>
              </div>

              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>{t.form.total} ({qty} {qty > 1 ? t.form.unites : t.form.unite})</span>
                <span className={styles.totalPrice}>{total} TND</span>
              </div>
            </div>

            <ul className={styles.trustList}>
              {TRUST_ITEMS.map(({ icon, label }) => (
                <li key={label}>
                  <span className={styles.trustIcon}>{icon}</span>
                  {label}
                </li>
              ))}
            </ul>
          </aside>

          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <h3>{t.form.title}</h3>
              <p>{t.form.subtitle}</p>
            </div>

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

            <Field label={t.form.address} required error={errors.address}>
              <input
                value={form.address}
                onChange={e => set('address', e.target.value)}
                placeholder={t.form.addressPh}
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

            <div className={styles.grid2}>
              <Field label={t.form.qty}>
                <div className={styles.qtyRow}>
                  <button className={styles.qtyBtn} onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Diminuer">−</button>
                  <span className={styles.qtyVal}>{qty}</span>
                  <button className={styles.qtyBtn} onClick={() => setQty(q => q + 1)} aria-label="Augmenter">+</button>
                </div>
              </Field>
            </div>

            <div className={styles.summary}>
              <div className={styles.summaryLeft}>
                <span className={styles.summaryLabel}>Total commande</span>
                <span className={styles.summaryDetail}>{qty} × {salePrice} TND · Économie {savings} TND</span>
              </div>
              <span className={styles.summaryTotal}>{total} TND</span>
            </div>

            <button className={styles.btnBuy} onClick={handleSubmit} disabled={sending}>
              <span className={styles.btnIcon}><IcoCart /></span>
              <span>{sending ? t.form.sending : t.form.btn}</span>
              {!sending && <span className={styles.btnArrow}><IcoArrow /></span>}
            </button>

            {success && (
              <div className={styles.successMsg}>
                <IcoCheck />
                <span>{t.form.success}</span>
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