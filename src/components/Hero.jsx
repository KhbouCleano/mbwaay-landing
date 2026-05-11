import React, { useState, useRef, useEffect } from 'react';
import { FaStar, FaTruck, FaShieldAlt, FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import styles from './Hero.module.css';
import OrderForm from './OrderForm';
import { useLang } from '../i18n/useTranslation.jsx';

const DEFAULT_PRODUCT = {
  name: 'MBWAAY Power Clean',
  sub: 'Super Dégraissant Multi-Usage',
  label: 'POWER CLEAN',
  line1: 'POWER',
  line2: 'CLEAN',
  color: '#ed1313',
  colorGreen: '#2a8a12',
  gradient: 'linear-gradient(160deg, #f0faf0 0%, #fff5f5 100%)',
  image: '/img.png',
  badge: '-24%',
  price: 15,
  oldPrice: 17,
  video: null,
};

export default function Hero({ selectedProduct }) {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoMuted,   setVideoMuted]   = useState(true);
  const [showVideo,    setShowVideo]    = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    setShowVideo(false);
    setVideoPlaying(false);
  }, [selectedProduct]);

  const prod = selectedProduct ? {
    ...DEFAULT_PRODUCT,
    name:     selectedProduct.name,
    sub:      selectedProduct.sub,
    label:    selectedProduct.label,
    line1:    selectedProduct.label.split(' ')[0],
    line2:    selectedProduct.label.split(' ').slice(1).join(' ') || selectedProduct.label,
    color:    selectedProduct.color,
    gradient: selectedProduct.gradient,
    image:    selectedProduct.image,
    badge:    selectedProduct.badge,
    price:    selectedProduct.price,
    oldPrice: selectedProduct.oldPrice,
    video:    selectedProduct.video ?? null,
  } : DEFAULT_PRODUCT;

  function togglePlay() {
    if (!videoRef.current) return;
    if (videoPlaying) { videoRef.current.pause(); setVideoPlaying(false); }
    else              { videoRef.current.play();  setVideoPlaying(true);  }
  }

  function toggleMute() {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoMuted;
    setVideoMuted(m => !m);
  }

  return (
    <section className={styles.hero} id="hero">

      <div className={styles.heroBackground}>
        <img src="/img.png" alt="" className={styles.heroBackgroundImage} aria-hidden="true" />
      </div>
      <div className={styles.heroOverlay} />
      <div className={styles.gradientCircle} />
      <div className={styles.gradientCircleLarge} />
      <div className={styles.gradientCircleTopLeft} />
      <div className={styles.gradientCircleGreen} />
      <div className={styles.gradientCircleMix} />
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />

      <a href="#hero" className={styles.logoCorner}>
        <img src="/logo MBwaay.png" alt="MBWAAY Perfect Clean" className={styles.logoCornerImg} />
      </a>

      <div className={styles.inner}>

        <div className={styles.imgSide}>
          <div className={styles.productCard}>

            <div className={styles.cardBadgeRow}>
              <span className={styles.badgeDiscount} style={{ background: prod.color }}>
                {prod.badge}
              </span>
              <span className={styles.badgeTopVente}>⭐ TOP VENTE</span>
            </div>

            <div className={styles.cardImgWrap} style={{ background: prod.gradient }}>

              <div className={styles.titleWrapper}>
                <h1 className={styles.h1}>
                  <span className={styles.line1} style={{ color: prod.colorGreen || prod.color }}>
                    {prod.line1}
                  </span>
                  <span className={styles.line2} style={{ color: prod.color }}>
                    {prod.line2}
                  </span>
                </h1>
              </div>

              <img
                src={prod.image}
                alt={prod.name}
                className={styles.cardProductImg}
              />

              <div className={styles.cardVideoBtn} onClick={() => setShowVideo(v => !v)}>
                {showVideo ? <FaPause /> : <FaPlay />}
                <span>{showVideo ? 'Fermer' : 'Voir démo'}</span>
              </div>

              {showVideo && (
                <div className={styles.cardVideoOverlay}>
                  <video
                    ref={videoRef}
                    className={styles.cardVideoEl}
                    src={prod.video ?? 'https://res.cloudinary.com/dgrepqv2c/video/upload/v1777918012/video_2_lnjpmo.mp4'}
                    autoPlay
                    muted={videoMuted}
                    playsInline
                    loop
                  />
                  <div className={styles.cardVideoControls}>
                    <button className={styles.vcBtn} onClick={togglePlay}>
                      {videoPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    <span className={styles.vcLabel}>Démo MBWAAY</span>
                    <button className={styles.vcBtn} onClick={toggleMute}>
                      {videoMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.textSide}>
          <OrderForm selectedProduct={prod} />

          <div className={styles.trust}>
            <div className={styles.trustItem}>
              <span className={styles.trustStars}>
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </span>
              <small>4.9/5 clients</small>
            </div>
            <div className={styles.trustItem}>
              <FaTruck className={styles.trustIcon} />
              <small>Livraison rapide</small>
            </div>
            <div className={styles.trustItem}>
              <FaShieldAlt className={styles.trustIcon} />
              <small>Paiement sécurisé</small>
            </div>
          </div>
        </div>

      </div>

      <div className={styles.wave}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#fff" />
        </svg>
      </div>
    </section>
  );
}