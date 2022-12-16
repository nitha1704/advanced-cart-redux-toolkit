import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import AdvancedCart from "./pages/AdvancedCart";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="products" element={<Products />} />
          <Route path="advanced-cart" element={<AdvancedCart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
