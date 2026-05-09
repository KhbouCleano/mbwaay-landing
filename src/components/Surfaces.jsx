import React, { useState } from 'react';
import styles from './Surfaces.module.css';
import { useLang } from '../i18n/useTranslation.jsx';

import img1  from '../assets/image1.png';
import img2  from '../assets/image2.png';
import img4  from '../assets/image4.png';
import img5  from '../assets/image5.png';
import img7  from '../assets/image7.png';
import img11 from '../assets/image11.png';

export const PRODUCTS = [
  {
    id: 1,
    label: 'ANTI CALCAIRE',
    name: 'MBWAAY Anti Calcaire',
    sub: 'Décapant Sol',
    description: 'Élimine le calcaire, tartre et dépôts minéraux sur carrelage, sanitaires et robinetterie.',
    benefits: ['✓ Action rapide', '✓ Décapant sol', '✓ Anti-tartre', '✓ Sanitaires'],
    price: 15, oldPrice: 17, badge: '-12%',
    color: '#c0a020',
    gradient: 'linear-gradient(160deg, #fffbe6 0%, #fff8cc 100%)',
    image: img1,
  },
  {
    id: 2,
    label: 'POWER CLEAN',
    name: 'MBWAAY Power Clean',
    sub: 'Super Dégraissant Multi-Usage',
    description: 'Dégraissant puissant multi-surfaces. Élimine graisse, taches et bactéries en un seul spray.',
    benefits: ['✓ Sans rinçage', '✓ Multi-surfaces', '✓ Action immédiate', '✓ Formule Pro'],
    price: 15, oldPrice: 17, badge: '-12%',
    color: '#ed1313',
    gradient: 'linear-gradient(160deg, #f0faf0 0%, #fff5f5 100%)',
    image: img2,
  },
  {
    id: 3,
    label: 'SALLE DE BAIN',
    name: 'MBWAAY Sanitaire',
    sub: 'Multi-Usage Sanitaire',
    description: 'Nettoyant désinfectant détartrant surpuissant pour toute la salle de bain.',
    benefits: ['✓ Désinfectant', '✓ Détartrant', '✓ Anti-odeur', '✓ Parfumé'],
    price: 15, oldPrice: 17, badge: '-12%',
    color: '#1d71b9',
    gradient: 'linear-gradient(160deg, #e8f4ff 0%, #f0f8ff 100%)',
    image: img4,
  },
  {
    id: 4,
    label: 'NETTOYANT EXPRESS',
    name: 'MBWAAY Express',
    sub: 'Entretien Général',
    description: 'Nettoyant express pour l\'entretien général de toute la maison.',
    benefits: ['✓ Entretien général', '✓ Action express', '✓ Multi-pièces', '✓ Sans traces'],
    price: 15, oldPrice: 17, badge: '-12%',
    color: '#1d71b9',
    gradient: 'linear-gradient(160deg, #e8f4ff 0%, #f5faff 100%)',
    image: img5,
  },
  {
    id: 5,
    label: 'VITRES',
    name: 'MBWAAY Vitres',
    sub: 'Liquide pour Vitres',
    description: 'Nettoyant anti-traces pour vitres, miroirs et surfaces vitrées. Séchage ultra-rapide.',
    benefits: ['✓ Anti-traces', '✓ Séchage rapide', '✓ Éclat miroir', '✓ Anti-buée'],
    price: 15, oldPrice: 17, badge: '-12%',
    color: '#00aadd',
    gradient: 'linear-gradient(160deg, #e0f7ff 0%, #f0fbff 100%)',
    image: img7,
  },
  {
    id: 6,
    label: 'CUISINE',
    name: 'MBWAAY Cuisine',
    sub: 'Super Dégraissant Cuisine',
    description: 'Dégraissant surpuissant pour four, friteuse, hotte et toutes surfaces de cuisine.',
    benefits: ['✓ Four & friteuse', '✓ Hotte aspirante', '✓ Sans récurer', '✓ Action immédiate'],
    price: 15, oldPrice: 17, badge: '-12%',
    color: '#e87820',
    gradient: 'linear-gradient(160deg, #fff3e0 0%, #fff8f0 100%)',
    image: img11,
  },
];

export default function Surfaces({ onSelectProduct }) {
      const { t } = useLang();

  const [hovered, setHovered] = useState(null);

  return (
    <section className={styles.section} id="products">
      <div className={styles.inner}>

      <div className={styles.header}>
        <span className={styles.eyebrow}>{t.surfaces.eyebrow}</span>
        <h2 className={styles.title}>{t.surfaces.title} <em>{t.surfaces.titleEm}</em></h2>
        <p className={styles.subtitle}>{t.surfaces.subtitle}</p>
      </div>
        <div className={styles.grid}>
          {PRODUCTS.map(product => (
            <div
              key={product.id}
              className={`${styles.card} ${hovered === product.id ? styles.cardHovered : ''}`}
              onMouseEnter={() => setHovered(product.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelectProduct(product)}
              style={{ '--accent': product.color }}
            >
              <div className={styles.badge}>{product.badge}</div>

              {/* ← FOND BLANC pour l'image */}
              <div className={styles.imgWrap} style={{ background: product.gradient }}>
                <img src={product.image} alt={product.name} className={styles.img} />
              </div>

              <div className={styles.content}>
                <span className={styles.label}>{product.label}</span>
                <p className={styles.name}>{product.name}</p>
                <p className={styles.sub}>{product.sub}</p>
                <p className={styles.desc}>{product.description}</p>

                <ul className={styles.benefits}>
                  {product.benefits.map(b => (
                    <li key={b} style={{ color: product.color, borderColor: product.color + '44', background: product.color + '15' }}>{b}</li>
                  ))}
                </ul>

                <div className={styles.priceRow}>
                  <s className={styles.oldPrice}>{product.oldPrice} TND</s>
                  <span className={styles.price} style={{ color: product.color }}>
                    {product.price} <small>TND</small>
                  </span>
                </div>

      <button className={styles.btn} style={{ background: product.color }}>
        {t.surfaces.btn}
      </button>
              </div>

              <div className={styles.overlay} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}