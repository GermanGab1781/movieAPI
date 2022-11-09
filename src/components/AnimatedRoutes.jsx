import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes } from "react-router-dom";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import Search from "../pages/Search";

const AnimatedRoutes = () => {
  return (
    <AnimatePresence>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/movieAPI" element={<Home/>}/>
        <Route path="/Movie/:id" element={<Detail/>}/>
        <Route path="/Search/:id/:page" element={<Search/>}/>
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
