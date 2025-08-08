const CriticalCSS = () => (
  <style jsx>{`
    /* Critical styles for LCP */
    .hero-section {
      min-height: 100vh;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .hero-content {
      text-align: center;
      color: white;
      max-width: 800px;
      padding: 2rem;
    }
    
    .hero-title {
      font-size: clamp(2rem, 5vw, 4rem);
      font-weight: bold;
      margin-bottom: 1rem;
      line-height: 1.2;
    }
    
    .hero-subtitle {
      font-size: clamp(1rem, 2.5vw, 1.5rem);
      opacity: 0.9;
      margin-bottom: 2rem;
    }
  `}</style>
);