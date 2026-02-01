import { Route, Routes } from "react-router-dom";
import ProductListPage from "./Pages/productList";
import ProductDetails from "./Pages/productDetails";
import CartListPage from "./Pages/cartList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartListPage />} />
      </Routes>
    </>
  );
}

export default App;
