import React, { useState } from 'react';
import Banner    from './components/Banner.jsx';
import Hero      from './components/Hero.jsx';
import Surfaces  from './components/Surfaces.jsx';
import Footer    from './components/Footer.jsx';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  function handleSelectProduct(product) {
    setSelectedProduct(product);
    setTimeout(() => {
      const el = document.getElementById('hero');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }

  return (
    <>
      <Banner />
      <Hero selectedProduct={selectedProduct} />
      <Surfaces onSelectProduct={handleSelectProduct} />
       <Footer />
    </>
  );
}