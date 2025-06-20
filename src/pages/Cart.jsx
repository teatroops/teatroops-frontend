import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14">
      <div className=" font-bold mt-2 py-4 text-3xl mb-3">
        <Title text1={"Your Cart"} />
      </div>

      <div>
        {cartData.length === 0 ? (
          <div className="text-center text-gray-500 py-10 text-xl">
            No items in the cart.
          </div>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find(
              (product) => product._id === item._id
            );

            if (!productData || !productData.image || !productData.image[0]) {
              return null; // Skip rendering if product data is invalid
            }

            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[1fr_auto] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex gap-4 items-center">
                  <img
                    className="w-12 sm:w-20"
                    src={productData.image[0]}
                    alt={productData.name}
                  />
                  <div>
                    <p className="text-base sm:text-lg text-[--primary-color] font-medium">
                      {productData.name}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-sm sm:text-base">
                        {currency}
                        {typeof productData.price === "object"
                          ? productData.price.offer ?? productData.price.mrp
                          : productData.price}
                      </p>
                      <p className="px-2 py-1 text-xs sm:text-sm border-[1px] border-[--primary-color] bg-slate-50">
                        {item.size}
                      </p>
                    </div>
                    {/* Show discount note only if not being applied */}
                    {(() => {
                      const note = productData.price.discountNote;
                      if (!note) return null;
                      // Parse 'Buy X: Get Flat Y% off'
                      const match = note.match(/Buy\s*(\d+):?\s*Get Flat (\d+)% off/i);
                      if (match) {
                        const minQty = parseInt(match[1], 10);
                        if (item.quantity < minQty) {
                          return (
                            <span className="text-xs text-red-500 mt-1 block">{note}</span>
                          );
                        }
                        return null; // Hide if discount is being applied
                      }
                      // If not a recognized format, just show
                      return (
                        <span className="text-xs text-red-500 mt-1 block">{note}</span>
                      );
                    })()}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 sm:gap-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border border-[--primary-color] text-[--primary-color] bg-white hover:bg-[--primary-color] hover:text-white transition"
                      onClick={() =>
                        updateQuantity(
                          item._id,
                          item.size,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="min-w-[24px] text-center font-semibold text-sm sm:text-lg select-none">
                      {item.quantity}
                    </span>
                    <button
                      className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border border-[--primary-color] text-[--primary-color] bg-white hover:bg-[--primary-color] hover:text-white transition"
                      onClick={() =>
                        updateQuantity(item._id, item.size, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className="flex items-center gap-1 text-xs sm:text-sm text-red-500 hover:text-red-700 transition"
                    title="Remove from cart"
                  >
                    <span>Delete</span>
                    <img className="w-4 h-4 sm:w-5 sm:h-5" src={assets.bin_icon} alt="Remove" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className=" w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-[--primary-color] text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
