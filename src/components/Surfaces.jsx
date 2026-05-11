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
    description: {
      fr: 'Élimine le calcaire, tartre et dépôts minéraux sur carrelage, sanitaires et robinetterie.',
      ar: 'يزيل الكلس والترسبات المعدنية من البلاط والمرافق الصحية والصنابير.',
    },
    benefits: {
      fr: ['✓ Action rapide', '✓ Décapant sol', '✓ Anti-tartre', '✓ Sanitaires'],
      ar: ['✓ فعّال بسرعة', '✓ مزيل للأرضيات', '✓ ضد الترسبات', '✓ للمرافق الصحية'],
    },
    price: 17, oldPrice: 19, badge: '-11%',
    color: '#c0a020',
    gradient: 'linear-gradient(160deg, #fffbe6 0%, #fff8cc 100%)',
    image: img1,
  },
  {
    id: 2,
    label: 'POWER CLEAN',
    name: 'MBWAAY Power Clean',
    sub: 'Super Dégraissant Multi-Usage',
    description: {
      fr: 'Dégraissant puissant multi-surfaces. Élimine graisse, taches et bactéries en un seul spray.',
      ar: 'مزيل دهون قوي متعدد الاستخدامات. يزيل الشحوم والبقع والبكتيريا برشة واحدة.',
    },
    benefits: {
      fr: ['✓ Sans rinçage', '✓ Multi-surfaces', '✓ Action immédiate', '✓ Formule Pro'],
      ar: ['✓ بدون شطف', '✓ متعدد الأسطح', '✓ فعّال فوراً', '✓ تركيبة احترافية'],
    },
    price: 17, oldPrice: 19, badge: '-11%',
    color: '#ed1313',
    gradient: 'linear-gradient(160deg, #f0faf0 0%, #fff5f5 100%)',
    image: img2,
  },
  {
    id: 3,
    label: 'SALLE DE BAIN',
    name: 'MBWAAY Sanitaire',
    sub: 'Multi-Usage Sanitaire',
    description: {
      fr: 'Nettoyant désinfectant détartrant surpuissant pour toute la salle de bain.',
      ar: 'منظف مطهر ومزيل للكلس فائق القوة لكامل الحمام.',
    },
    benefits: {
      fr: ['✓ Désinfectant', '✓ Détartrant', '✓ Anti-odeur', '✓ Parfumé'],
      ar: ['✓ مطهر', '✓ مزيل للكلس', '✓ مضاد للروائح', '✓ معطر'],
    },
    price: 17, oldPrice: 19, badge: '-11%',
    color: '#1d71b9',
    gradient: 'linear-gradient(160deg, #e8f4ff 0%, #f0f8ff 100%)',
    image: img4,
  },
  {
    id: 4,
    label: 'NETTOYANT EXPRESS',
    name: 'MBWAAY Express',
    sub: 'Entretien Général',
    description: {
      fr: "Nettoyant express pour l'entretien général de toute la maison.",
      ar: 'منظف سريع للعناية العامة بكامل المنزل.',
    },
    benefits: {
      fr: ['✓ Entretien général', '✓ Action express', '✓ Multi-pièces', '✓ Sans traces'],
      ar: ['✓ عناية عامة', '✓ فعّال بسرعة', '✓ لكل الغرف', '✓ بدون آثار'],
    },
    price: 17, oldPrice: 19, badge: '-11%',
    color: '#1d71b9',
    gradient: 'linear-gradient(160deg, #e8f4ff 0%, #f5faff 100%)',
    image: img5,
  },
  {
    id: 5,
    label: 'VITRES',
    name: 'MBWAAY Vitres',
    sub: 'Liquide pour Vitres',
    description: {
      fr: 'Nettoyant anti-traces pour vitres, miroirs et surfaces vitrées. Séchage ultra-rapide.',
      ar: 'منظف بدون آثار للزجاج والمرايا والأسطح الزجاجية. يجف بسرعة فائقة.',
    },
    benefits: {
      fr: ['✓ Anti-traces', '✓ Séchage rapide', '✓ Éclat miroir', '✓ Anti-buée'],
      ar: ['✓ بدون آثار', '✓ جفاف سريع', '✓ لمعان كالمرآة', '✓ ضد الضباب'],
    },
    price: 17, oldPrice: 19, badge: '-11%',
    color: '#00aadd',
    gradient: 'linear-gradient(160deg, #e0f7ff 0%, #f0fbff 100%)',
    image: img7,
  },
  {
    id: 6,
    label: 'CUISINE',
    name: 'MBWAAY Cuisine',
    sub: 'Super Dégraissant Cuisine',
    description: {
      fr: 'Dégraissant surpuissant pour four, friteuse, hotte et toutes surfaces de cuisine.',
      ar: 'مزيل دهون فائق القوة للفرن والمقلاة والشفاط وكل أسطح المطبخ.',
    },
    benefits: {
      fr: ['✓ Four & friteuse', '✓ Hotte aspirante', '✓ Sans récurer', '✓ Action immédiate'],
      ar: ['✓ الفرن والمقلاة', '✓ الشفاط', '✓ بدون عرك', '✓ فعّال فوراً'],
    },
    price: 17, oldPrice: 19, badge: '-11%',
    color: '#e87820',
    gradient: 'linear-gradient(160deg, #fff3e0 0%, #fff8f0 100%)',
    image: img11,
  },
];

export default function Surfaces({ onSelectProduct }) {
  const { t, lang } = useLang();

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

              <div className={styles.imgWrap} style={{ background: product.gradient }}>
                <img src={product.image} alt={product.name} className={styles.img} />
              </div>

              <div className={styles.content}>
                <span className={styles.label}>{product.label}</span>
                <p className={styles.name}>{product.name}</p>
                <p className={styles.sub}>{product.sub}</p>
                <p className={styles.desc}>{product.description[lang] ?? product.description.fr}</p>

                <ul className={styles.benefits}>
                  {(product.benefits[lang] ?? product.benefits.fr).map(b => (
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