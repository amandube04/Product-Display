import { useContext } from "react";
import { shoppingCartContext } from "../../Components/context";
import ProductTitle from "../../Components/productTitle";

export function ProductListPage() {
  const { listOfProduct, loading } = useContext(shoppingCartContext);
  console.log(listOfProduct);

  if (loading) return <h1> Product is loading pls wait meanwhile... </h1>;
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-extralight text-gray-950 sm:text-4xl">
            Our Featured Products
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-10 lg:mt-16 lg:gap-8 lg:grid-cols-4">
          {listOfProduct && listOfProduct.length > 0 ? (
            listOfProduct.map((product) => (
              <ProductTitle key={product.id} singleProductTile={product} />
            ))
          ) : (
            <h3>No Product Found</h3>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductListPage;
