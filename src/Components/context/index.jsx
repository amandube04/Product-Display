import { useEffect, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// create a context
export const shoppingCartContext = createContext(null);

export function ShoppingCartProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [listOfProduct, setListOfProduct] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  async function fetchListOfProduct() {
    const responseBody = await fetch("https://dummyjson.com/products");
    const result = await responseBody.json();

    if (result && result?.products) {
      setListOfProduct(result?.products);
      setLoading(false);
    }
  }

  function handleAddToCart(product) {
    setCartItems((prevItems) => {
      const index = prevItems.findIndex((item) => item.id === product.id);

      let updatedCart;

      if (index === -1) {
        updatedCart = [
          ...prevItems,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            quantity: 1,
            totalPrice: product.price,
          },
        ];
      } else {
        updatedCart = prevItems.map((item, i) => {
          if (i !== index) return item;

          const newQuantity = item.quantity + 1;

          return {
            ...item,
            quantity: newQuantity,
            totalPrice: newQuantity * item.price,
          };
        });
      }

      localStorage.setItem("cartItem", JSON.stringify(updatedCart));
      return updatedCart;
    });

    navigate("/cart");
  }

  function handleRemoveFromCart(product, fullyRemove = false) {
    setCartItems((prevItems) => {
      const index = prevItems.findIndex((item) => item.id === product.id);
      if (index === -1) return prevItems;

      const currentItem = prevItems[index];

      // Case 1: full remove OR quantity will drop to 0
      if (fullyRemove || currentItem.quantity === 1) {
        const updated = prevItems.filter((item) => item.id !== product.id);
        localStorage.setItem("cartItem", JSON.stringify(updated));
        return updated;
      }

      // Case 2: decrement quantity
      const newQuantity = currentItem.quantity - 1;

      const updated = prevItems.map((item, i) =>
        i === index
          ? {
              ...item,
              quantity: newQuantity,
              totalPrice: newQuantity * item.price,
            }
          : item,
      );

      localStorage.setItem("cartItem", JSON.stringify(updated));
      return updated;
    });
  }

  useEffect(() => {
    fetchListOfProduct();
    const storedCart = localStorage.getItem("cartItems");
    setCartItems(storedCart ? JSON.parse(storedCart) : []);
  }, []);

  return (
    // Provider of context
    <shoppingCartContext.Provider
      value={{
        loading,
        listOfProduct,
        productDetails,
        setProductDetails,
        setLoading,
        cartItems,
        handleRemoveFromCart,
        handleAddToCart,
      }}
    >
      {children}
    </shoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;
