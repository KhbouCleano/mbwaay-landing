import React, { useState, useRef } from 'react';
import { FaStar, FaTruck, FaShieldAlt, FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import styles from './Hero.module.css';
import OrderForm from './OrderForm';

const BADGES = ['✓ Sans rinçage', '✓ Multi-surfaces', '⚡ Action immédiate', '✓ Formule Pro'];

export default function Hero() {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoMuted,   setVideoMuted]   = useState(true);
  const [showVideo,    setShowVideo]    = useState(false);
  const videoRef = useRef(null);

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

      {/* ── MAIN GRID ───────────────────────── */}
      <div className={styles.inner}>

        {/* ① TITRE — premier enfant direct de .inner */}


     {/* ② CARTE PRODUIT + TITRE AU-DESSUS */}
     <div className={styles.imgSide}>
       <div className={styles.productCard}>
         <div className={styles.cardBadgeRow}>
           <span className={styles.badgeDiscount}>-24%</span>
           <span className={styles.badgeTopVente}>⭐ TOP VENTE</span>
         </div>
         <div className={styles.cardImgWrap}>

           {/* TITRE DANS LA CARTE */}
           <div className={styles.titleWrapper}>
             <h1 className={styles.h1}>
               <span className={styles.line1}>POWER</span>
               <span className={styles.line2}>CLEAN</span>
             </h1>
           </div>

           <img src="/img.png" alt="MBWAAY Power Clean 1L" className={styles.cardProductImg} />
           <div className={styles.cardVideoBtn} onClick={() => setShowVideo(v => !v)}>
             {showVideo ? <FaPause /> : <FaPlay />}
             <span>{showVideo ? 'Pause' : 'Voir démo'}</span>
           </div>
           {showVideo && (
             <div className={styles.cardVideoOverlay}>
               <video
                 ref={videoRef}
                 className={styles.cardVideoEl}
                 src="https://res.cloudinary.com/dgrepqv2c/video/upload/v1777918012/video_2_lnjpmo.mp4"
                 autoPlay muted={videoMuted} playsInline loop
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
        {/* ③ FORMULAIRE + CONTENU */}
        <div className={styles.textSide}>

          <OrderForm />

          <p className={styles.sub}>
            La formule professionnelle qui élimine graisse, taches et bactéries
            sur <strong>toutes les surfaces</strong> — en un seul spray.
          </p>

          <div className={styles.pills}>
            {BADGES.map(b => (
              <span key={b} className={styles.pill}>{b}</span>
            ))}
          </div>

{/*           <div className={styles.actions}> */}
{/*             <a href="#order"    className={styles.btnPrimary}>🛒 Commander maintenant</a> */}
{/*             <a href="#features" className={styles.btnSecondary}>Découvrir →</a> */}
{/*           </div> */}

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