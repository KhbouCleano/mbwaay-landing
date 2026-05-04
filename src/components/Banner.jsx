import React from 'react';
import styles from './Banner.module.css';

const LOGO = <img src="/logo%20MBwaay.png" alt="MBWAAY" className={styles.logo} />;

const ITEMS = [
  'Livraison rapide partout en Tunisie',
  'Paiement à la livraison',
  'Qualité garantie',
  'Super Dégraissant MBWAAY',
];

export default function Banner() {
  return (
    <div className={styles.banner}>
      <div className={styles.track}>
        {[...Array(3)].map((_, i) => (
          <span key={i} className={styles.text}>
            {ITEMS.map((item, j) => (
              <React.Fragment key={j}>
                {LOGO} {item} &nbsp;·&nbsp;{' '}
              </React.Fragment>
            ))}
            &nbsp;&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}