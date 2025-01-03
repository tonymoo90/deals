import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import DailyDeals from './components/Eat/DailyDeals';
import RecipeBuilder from './components/Eat/RecipeBuilder.jsx';


function App() {
 return (
   <BrowserRouter>
     <div className="App">
       <nav className="p-4 bg-gray-100">
         <ul className="flex gap-4 justify-center">
           <li><Link to="/eat" className="hover:text-blue-500">Eat</Link></li>
           <li><Link to="/cook" className="hover:text-blue-500">Cook</Link></li>
           <li><Link to="/cheatsheet" className="hover:text-blue-500">Cheat Sheet</Link></li>
           <li><Link to="/listen" className="hover:text-blue-500">Listen</Link></li>
         </ul>
       </nav>

       <Routes>
         <Route path="/eat" element={<DailyDeals />} />
         <Route path="/cook" element={<RecipeBuilder />} />
         <Route path="/cheatsheet" element={<div>Cheat Sheet Module</div>} />
         <Route path="/listen" element={<div>Listen Module</div>} />
       </Routes>
     </div>
   </BrowserRouter>
 );
}

export default App;