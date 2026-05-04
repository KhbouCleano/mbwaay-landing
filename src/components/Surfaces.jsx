import React from 'react';
import {
  FaShower,
  FaCar,
  FaWindowMaximize,
  FaHardHat,
  FaRecycle,
  FaGem,
  FaShoePrints,
  FaCouch,
  FaLaptop,
  FaTshirt,
  FaUtensils,
  FaWater,
} from 'react-icons/fa';
import styles from './Surfaces.module.css';

const SURFACES = [
  { icon: <FaWater />, label: 'Sanitaire' },
  { icon: <FaCar />, label: 'Voiture' },
  { icon: <FaWindowMaximize />, label: 'Vitre' },
  { icon: <FaHardHat />, label: 'Mur' },
  { icon: <FaRecycle />, label: 'Plastique' },
  { icon: <FaGem />, label: 'Aluminium' },
  { icon: <FaShoePrints />, label: 'Chaussure' },
  { icon: <FaCouch />, label: 'Moquette' },
  { icon: <FaLaptop />, label: 'Électronique' },
  { icon: <FaTshirt />, label: 'Tissu' },
  { icon: <FaUtensils />, label: 'Cuisine' },
  { icon: <FaShower />, label: 'Douche' },
];

export default function Surfaces() {
  return (
    <section className={styles.section} id="surfaces">
      <div className={styles.inner}>
        <p className={styles.label}>Polyvalence absolue</p>
        <h2 className={styles.title}>
          Compatible avec <span>tout</span>
        </h2>
        <div className={styles.grid}>
          {SURFACES.map((s, i) => (
            <div key={i} className={styles.chip}>
              <span className={styles.chipIcon}>{s.icon}</span>
              <span className={styles.chipLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}