import React from 'react';
import styles from './Features.module.css';

const FEATURES = [
  { icon: '🧪', title: 'Formule Concentrée', desc: 'Développé pour les pros, puissant pour tous. Une goutte suffit pour des résultats exceptionnels.' },
  { icon: '⚡', title: 'Action Ultra-Rapide', desc: 'Élimine graisse et taches en quelques secondes sans effort ni frottement intensif.' },
  { icon: '🌿', title: '10+ Surfaces', desc: 'Un seul produit pour toute la maison, la voiture et bien plus encore.' },
  { icon: '💧', title: 'Spray Précis', desc: 'Buse réglable pour une application ciblée et une utilisation économique.' },
  { icon: '🛡️', title: 'Protège les Surfaces', desc: 'Laisse un film protecteur invisible après nettoyage pour une protection durable.' },
  { icon: '🏆', title: 'Qualité Certifiée', desc: 'Testé et approuvé par des milliers de clients satisfaits à travers tout le pays.' },
];

export default function Features() {
  return (
    <section className={styles.section} id="features">
      <div className={styles.inner}>
        <p className={styles.label}>Pourquoi choisir MBWAAY ?</p>
        <h2 className={styles.title}>
          La puissance du <span>Perfect Clean</span>
        </h2>
        <p className={styles.subtitle}>
          Plus qu'un simple nettoyant — une révolution pour votre intérieur.
        </p>

        <div className={styles.grid}>
          {FEATURES.map((f, i) => (
            <div key={i} className={styles.card} style={{ animationDelay: `${i * 0.08}s` }}>
              <div className={styles.iconWrap}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
