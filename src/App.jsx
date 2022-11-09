import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnimatedRoutes from "./components/AnimatedRoutes";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <AnimatedRoutes/>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
