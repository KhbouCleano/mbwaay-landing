import React from 'react';
import styles from './Hero.module.css';
import OrderForm from './OrderForm';

export default function Hero({ selectedProduct }) {
  return (
    <section className={styles.hero} id="hero">

      <div className={styles.logoWrap}>
        <a href="#hero" className={styles.logoLink}>
          <img src="/logo MBwaay.png" alt="MBWAAY Perfect Clean" className={styles.logoImg} />
        </a>
      </div>

      <div className={styles.inner}>
        <OrderForm selectedProduct={selectedProduct} />
      </div>
    </section>
  );
}