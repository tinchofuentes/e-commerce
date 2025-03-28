import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/ui/Navbar';
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Products from './components/pages/Products';
import IndividualProduct from './components/pages/IndividualProduct';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/productos/remeras" element={<IndividualProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
