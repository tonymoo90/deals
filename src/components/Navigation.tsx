import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const Navigation = () => {
  const menuItems = [
    { path: '/cheatsheet', label: 'Cheat Sheet' },
    { path: '/eat', label: 'Eat' },
    { path: '/cook', label: 'Cook' },
    { path: '/listen', label: 'Listen' }
  ];

  return (
    <BrowserRouter>
      <div className="w-full">
        <header className="flex items-center justify-between p-4 border-b">
          <Sheet>
            <SheetTrigger className="p-2">
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-lg hover:text-blue-500 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-bold">Your App Name</h1>
          <div className="w-6" /> {/* Spacer for alignment */}
        </header>

        <main className="p-4">
          <Routes>
            <Route path="/" element={<Navigate to="/cheatsheet" />} />
            <Route path="/cheatsheet" element={<div>Cheat Sheet Module</div>} />
            <Route path="/eat" element={<DailyDeals />} />
            <Route path="/cook" element={<RecipeBuilder />} />
            <Route path="/listen" element={<div>Listen Module</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default Navigation;