import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <img src="/logo MBwaay.png" alt="MBWAAY" className={styles.logo} />
        <p>
          <strong>MBWAAY Perfect Clean</strong> — Super Dégraissant Multi-Usage
        </p>
        <p className={styles.copy}>© 2026 MBWAAY. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
