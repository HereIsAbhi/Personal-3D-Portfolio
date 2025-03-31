import React from 'react';
import Navbar from "./sections/navbar.jsx";
import Hero from "./sections/Hero.jsx";
import About from './sections/About.jsx';
import Projects from './sections/Projects.jsx';
import Contact from './sections/Contact.jsx';
import Footer from './sections/Footer.jsx';
import { ThemeProvider } from './context/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <main className="max-w-7xl mx-auto">
        {/* <h1 className="text-2xl text-white underline">hello</h1> */}
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </ThemeProvider>
  );
} 

export default App;