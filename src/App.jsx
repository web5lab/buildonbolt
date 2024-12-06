import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { CategoryNav } from './components/navigation/CategoryNav';
import { TemplateGrid } from './components/templates/TemplateGrid';
import { TemplateDetails } from './pages/TemplateDetails';
import { ChatBot } from './components/chat/ChatBot';
import { Footer } from './components/layout/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dot-pattern dark:bg-dark-100">
        <div className="relative">
   
          <Header />
          <CategoryNav />
          <Routes>
            <Route path="/" element={<TemplateGrid />} />
            <Route path="/template/:id" element={<TemplateDetails />} />
          </Routes>
          <ChatBot />
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;