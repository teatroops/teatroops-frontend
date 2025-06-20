import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductItem = ({ id, image, name, price, size }) => {
  const { currency, addToCart } = useContext(ShopContext);
  const actualSize = typeof size === 'string' && size ? size : undefined;

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100">
      {/* Image + Details Link */}
      <Link
        to={`/product/${id}`}
        onClick={() => scrollTo(0, 0)}
        className="flex-1 flex flex-col p-4"
      >
        {/* Image */}
        <div className="w-full h-56 bg-[#f3f3f3] rounded mb-4 shadow-md overflow-hidden">
          <img
            src={image[0]}
            alt={name}
            className="object-contain h-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Name & Price */}
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-[--primary-color] line-clamp-2">{name}</p>
          {/* Star Rating */}
          <div className="flex items-center mb-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
              </svg>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base text-[--primary-color] font-semibold">
              {currency}{price?.offer ?? price?.mrp ?? price}
            </span>
            {price?.offer && price?.offer !== price?.mrp && (
              <span className="text-sm text-gray-400 line-through">
                {currency}{price?.mrp}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="px-4 pb-4 pt-2">
        <button
          className="w-full bg-[--primary-color] hover:bg-[#1a6a4a] text-white text-sm py-2 rounded-md font-medium transition duration-200"
          onClick={e => {
            e.preventDefault();
            addToCart(id, actualSize, 1);
            toast.success('Added to cart!', { position: "top-center" });
          }}
        >
          Add to Cart
        </button>
      </div>

      {/* Optional: Bestseller badge */}
      {/* <span className="absolute top-3 left-3 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-md">Bestseller</span> */}
    </div>
  );
};

export default ProductItem;
