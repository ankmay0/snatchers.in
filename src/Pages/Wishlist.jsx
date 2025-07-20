// Wishlist.jsx
import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import ProductCard from "../UI/ProductCard";
import products from "../Data/ProductData";

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  const wishlistItems = products.filter((p) => wishlist.includes(p._id));

  return (
    <div className="px-8 py-10">
      <h1 className="text-4xl font-bold mb-6">Your Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p>No products in your wishlist.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <ProductCard
              key={product._id}
              {...product}
              wishlisted={true}
              onToggleWishlist={() => toggleWishlist(product._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
