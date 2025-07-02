import React, { useState } from 'react';
import './ProductCard.css';
import { FaHeart, FaRegHeart, FaStar, FaRegStar } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext'; // import
const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [setWishlisted] = useState(false);
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product._id);
  const handleWishlistToggle = () => {
    setWishlisted(!wishlisted);
    toggleWishlist(product);

    // Optionally call backend API her
    // call
  };

  const stars = Array.from({ length: 5 }, (_, i) =>
    i < product.rating ? <FaStar key={i} className="star filled" /> : <FaRegStar key={i} className="star" />
  );

  return (
    <div className="product-card">
      <div className="image-container">
        <img
          src={product.image}
          alt={product.title}
          className="product-img"
        />
        {product.inStock ? (
          <span className="stock-badge in-stock">In Stock</span>
        ) : (
          <span className="stock-badge out-stock">Out of Stock</span>
        )}
        {product.tags?.map((tag, i) => (
          <span key={i} className="tag-badge">{tag}</span>
        ))}
          <div className="wishlist-icon" onClick={() => toggleWishlist(product)}>
            {wishlisted ? <FaHeart /> : <FaRegHeart />}
          </div>
      </div>

      <div className="product-card-content">
        <h3 className="product-name">{product.title}</h3>
        <div className="product-rating">{stars}</div>
        <p className="product-price">₦{product.price.toLocaleString()}</p>
        <button
          onClick={() => addToCart(product)}
          className="shop-btn"
          disabled={!product.inStock}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
