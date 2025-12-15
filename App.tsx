import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import Contact from './components/Contact';
import Cursor from './components/Cursor';
import { LanguageProvider } from './components/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-black text-white cursor-none">
        <Cursor />
        <Header />
        <main>
          <Hero />
          <About />
          <Work />
          <Contact />
        </main>
      </div>
    </LanguageProvider>
  );
}

export default App;