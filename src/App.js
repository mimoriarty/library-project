import React, { useState, createContext } from "react";
import { Routes, Route } from 'react-router-dom';

import Home from "./routes/Home";
import About from "./routes/About";
import Header from "./Components/Layout/Header";

import './App.css';

export const LibraryContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <div className="App">
      <LibraryContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Header />
        <Routes>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
        </Routes>
      </LibraryContext.Provider>
    </div>
  );
}

export default App;
