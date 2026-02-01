import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { shoppingCartContext } from "../context";
export function ProductTitle({ singleProductTile }) {
  const navigate = useNavigate();

  const { handleAddToCart, cartItems } = useContext(shoppingCartContext);

  function handleNavigationToProductDetailsPage(getCurrentProductId) {
    navigate(`/product-details/${getCurrentProductId}`);
  }
  return (
    <div className="relative group border border-cyan-700 p-6 cursor-pointer">
      <div className="overflow-hidden aspect-square">
        <img
          src={singleProductTile?.thumbnail}
          alt={singleProductTile?.title}
          className="oject-cover w-full h-full transition-all duration-300 group-hover:scale-125"
        />
      </div>
      <div className="flex justify-center mt-4 space-x-4">
        <div className="font-bold text-gray-900 sm:text-sm text-xs md:text-base">
          <p className="w-40 overflow-hidden text-ellipsis whitespace-nowrap">
            {singleProductTile?.title}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-gray-900 sm:text-sm ">
            ${singleProductTile?.price}
          </p>
        </div>
      </div>
      <button
        onClick={() =>
          handleNavigationToProductDetailsPage(singleProductTile?.id)
        }
        className="px-5 mt-5 w-full py-2 rounded-none bg-black text-white font-bold cursor-pointer text-lg"
      >
        View Details
      </button>
      <button
        disabled={
          cartItems.findIndex((item) => item.id === singleProductTile.id) > -1
        }
        onClick={() => handleAddToCart(singleProductTile)}
        className="disabled:opacity-65 px-5 mt-5 w-full py-2 rounded-none bg-black text-white font-bold text-lg cursor-pointer"
      >
        Add To Cart
      </button>
    </div>
  );
}

export default ProductTitle;
