import React from 'react';
import styles from './Banner.module.css';
import { useLang } from '../i18n/useTranslation.jsx';

const LOGO = <img src="/logo%20MBwaay.png" alt="MBWAAY" className={styles.logo} />;

export default function Banner() {
  const { t, lang, toggleLang } = useLang();

  return (
    <div className={styles.banner}>
      {/* Bouton langue */}
      <button className={styles.langBtn} onClick={toggleLang}>
        {lang === 'fr' ? '🇹🇳 AR' : '🇫🇷 FR'}
      </button>

      <div className={styles.track}>
        {[...Array(3)].map((_, i) => (
          <span key={i} className={styles.text}>
            {t.banner.map((item, j) => (
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