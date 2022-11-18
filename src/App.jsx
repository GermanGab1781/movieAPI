import { BrowserRouter} from "react-router-dom";
import AnimatedRoutes from "./components/AnimatedRoutes";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";


function App() {
  return (
    <div className="bg-slate-400 text-slate-400 font-Oswald">
      <BrowserRouter>
        <Navbar/>
        <AnimatedRoutes/>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
