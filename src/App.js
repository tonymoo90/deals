import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { X, Menu } from "lucide-react";
import DailyDeals from './components/Eat/DailyDeals';
import RecipeBuilder from './components/Eat/RecipeBuilder.tsx';
import CheatSheetGrid from './components/CheatSheetGrid.tsx';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    { path: '/cheatsheet', label: 'CHEAT SHEET' },
    { path: '/eat', label: 'EAT' },
    { path: '/cook', label: 'COOK' },
    { path: '/listen', label: 'LISTEN' }
  ];

  return (
    <BrowserRouter>
      <div className="App">
        <header className="flex items-center p-4 border-b bg-white">
          {isMenuOpen ? (
            <>
              <button onClick={() => setIsMenuOpen(false)} className="p-2">
                <X className="h-6 w-6" />
              </button>
              <nav className="flex items-center gap-6 ml-6">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-sm hover:text-blue-500"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </>
          ) : (
            <button onClick={() => setIsMenuOpen(true)} className="p-2">
              <Menu className="h-6 w-6" />
            </button>
          )}
          <div className="flex-grow" />
        </header>

        <main className="p-4">
          <Routes>
            <Route path="/" element={<Navigate to="/cheatsheet" />} />
            <Route path="/eat" element={<DailyDeals />} />
            <Route path="/cook" element={<RecipeBuilder />} />
            <Route path="/cheatsheet" element={<CheatSheetGrid />} />
            <Route path="/listen" element={<div>Listen Module</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;