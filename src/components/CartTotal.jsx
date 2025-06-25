import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, delivery_fee, cartItems, products } =
    useContext(ShopContext);

  // Helper: Parse discount note of format 'Buy X: Get Flat Y% off'
  function parseDiscountNote(note) {
    const regex = /Buy\s*(\d+):?\s*Get Flat (\d+)% off/i;
    const match = note && note.match(regex);
    if (match) {
      return {
        minQty: parseInt(match[1], 10),
        percent: parseFloat(match[2]),
      };
    }
    return null;
  }

  // Calculate subtotal, discount, and final total
  let subtotal = 0;
  let discountTotal = 0;
  let totalMrp = 0;
  let totalOffer = 0;
  let appliedDiscountNotes = [];
  const appliedNotesSet = new Set();

  for (const productId in cartItems) {
    for (const size in cartItems[productId]) {
      const quantity = cartItems[productId][size];
      if (quantity > 0) {
        const product = products.find((p) => p._id === productId);
        if (!product) continue;
        const priceObj = product.price || {};
        const mrp = priceObj.mrp ?? 0;
        const offer = priceObj.offer ?? mrp;
        const price = offer;
        const note = priceObj.discountNote || product.discountNote;
        const discountInfo = parseDiscountNote(note);

        // Calculate MRP total
        totalMrp += mrp * quantity;

        // Apply discount if eligible
        if (discountInfo && quantity >= discountInfo.minQty) {
          // Only apply discount to multiples of minQty
          const eligibleSets = Math.floor(quantity / discountInfo.minQty);
          const discountedQty = eligibleSets * discountInfo.minQty;
          const itemDiscount = (discountedQty * mrp * discountInfo.percent) / 100;
          discountTotal += itemDiscount;
          
          // Add discounted amount to subtotal
          subtotal += mrp * quantity - itemDiscount;
          if (note && !appliedNotesSet.has(note)) {
            appliedNotesSet.add(note);
          }
        } else {
          // If no discount, use offer price
          subtotal += offer * quantity;
        }

        totalOffer += offer * quantity;
      }
    }
  }
  appliedDiscountNotes = Array.from(appliedNotesSet);

  const shipping = delivery_fee;
  const finalTotal = subtotal + (subtotal > 0 ? shipping : 0);

  return (
    <div className="w-full">
      <div className="font-bold mt-2 py-4 text-3xl">
        <Title text1={"Cart Totals"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Total MRP</p>
          <p>
            {currency} {totalMrp.toFixed(2)}
          </p>
        </div>
        {/* Show You Save on MRP only when there's no discount applied */}
        {!discountTotal && totalMrp > subtotal && (
          <div className="flex justify-between text-green-600">
            <p>You Save on MRP</p>
            <p>
              {currency} {(totalMrp - subtotal).toFixed(2)}
            </p>
          </div>
        )}
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency} {subtotal.toFixed(2)}
          </p>
        </div>
        {discountTotal > 0 && (
          <div className="flex justify-between text-[--primary-color]">
            <p>Discount</p>
            <div className="flex flex-col text-xs text-[--primary-color]">
              {appliedDiscountNotes.length > 0 && (
                <span>Applied :{appliedDiscountNotes.join(", ")}</span>
              )}
            </div>
            <p>
              -{currency} {discountTotal.toFixed(2)}
            </p>
          </div>
        )}
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency} {shipping.toFixed(2)}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency} {finalTotal > 0 ? finalTotal.toFixed(2) : "0.00"}
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
