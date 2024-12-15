import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { CategoryTab } from './components/categories/CategoryTab';
import { TemplateGrid } from './components/templates/TemplateGrid';
import { TemplateDetails } from './pages/TemplateDetails';
import { UserProfilePage } from './pages/UserProfilePage';
import { ChatBot } from './components/chat/ChatBot';
import { Footer } from './components/layout/Footer';
import { CategoryNav } from './components/navigation/CategoryNav';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dot-pattern dark:bg-dark-100">
        <div className="relative">
          <Header />
          <CategoryTab />
          <Routes>
            <Route path="/" element={<TemplateGrid />} />
            <Route path="/template/:id" element={<TemplateDetails />} />
            <Route path="/profile" element={<UserProfilePage />} />
          </Routes>
          <ChatBot />
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;