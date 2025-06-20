import React, { useContext, useEffect, useState } from "react";
import axios from "axios"; // Add axios for API requests
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import QuantityIcon from "../assets/img/Quantity.svg";
import TemperatureIcon from "../assets/img/Temperature.svg";
import TimeIcon from "../assets/img/Time.svg";
import InfusionsIcon from "../assets/img/Infusions.svg";
import { toast } from 'react-toastify';
import Benefits from "../components/Benefits";
import Title from "../components/Title";
import ReviewSection from "../components/ReviewSection";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const item = products.find((item) => item._id === productId);
    if (item) {
      setProductData(item);
      setImage(item.image[0]);
    }
  }, [productId, products]);


  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 px-4 sm:px-8">
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-start sm:w-[18.7%] w-full">
            {productData.image.flat().map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%] h-max shadow-lg">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="text-[--primary-color] font-medium text-2xl mt-2">{productData.name}</h1>

          <div className="flex items-center gap-1 mt-2">
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
            {/* <img src={assets.star_dull_icon} className="w-3" alt="star" /> */}
            <p className='text-gray-600 pl-2'>(122 reviews)</p>
          </div>

          <p className="mt-5 text-3xl text-[--primary-color] font-medium">
            {currency}
            {productData.price?.offer ?? productData.price?.mrp}
            {productData.price?.offer &&
              productData.price.offer !== productData.price.mrp && (
                <span className="line-through text-gray-400 ml-3 text-xl">
                  {currency}
                  {productData.price.mrp}
                </span>
              )}
          </p>
          <span>(Incl of all taxes)</span>

          {productData.price?.discountNote && (
            <p className="mt-2 text-green-600 text-sm font-semibold">
              {productData.price.discountNote}
            </p>
          )}

          {/* Size Display */}
          <div className="flex items-center gap-6 my-6">
            {/* Quantity Selector */}
            <div className="flex items-center gap-2">
              <button
                className="w-7 h-7 flex items-center justify-center rounded-full border border-[--primary-color] text-[--primary-color] bg-white hover:bg-[--primary-color] hover:text-white transition"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="min-w-[24px] text-center font-semibold text-lg select-none">
                {quantity}
              </span>
              <button
                className="w-7 h-7 flex items-center justify-center rounded-full border border-[--primary-color] text-[--primary-color] bg-white hover:bg-[--primary-color] hover:text-white transition"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                +
              </button>
            </div>
            <span className="border py-2 px-4 bg-green-50 rounded text-base">{productData?.size}</span>
          </div>


          {/* button add to cart */}
          <button
            onClick={() => {
              addToCart(productData._id, productData.size, quantity);
              toast.success('Added to cart!', { position: "top-center" });
            }}
            className="bg-[--primary-color] text-white px-8 py-3 text-sm hover:bg-[#22755b]"
          >
            ADD TO CART
          </button>

          {/* Description */}
          <p className="mt-5 text-gray-600 w-full">
            {productData.description}
          </p>

          {/* Benefits */}
          {productData.benefits?.length > 0 && (
            <div className="sm:w-1/2">
              <ul className="space-y-2 mt-4 text-gray-600 font-bold leading-4">
                {productData.benefits.map((benefit, i) => (
                  <li key={i}>{benefit.trim()}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            {/* Storage Instructions */}
            {productData.storageInstructions && (
              <div className="mt-8 text-sm text-gray-700">
                <h3 className="font-semibold mb-1">Storage Instructions</h3>
                <p>{productData.storageInstructions}</p>
              </div>
            )}

            {/* Caution */}
            {productData.caution && (
              <div className="mt-4 text-sm text-red-500">
                <h3 className="font-semibold mb-1">Caution</h3>
                <p>{productData.caution}</p>
              </div>
            )}
          </div>


          <hr className="mt-8 sm:w-4/5" />
        </div>
      </div>


      <Benefits showDescription={false} />

      {/* Recommended Infusion Guide */}
      {productData.infusionGuide && Object.keys(productData.infusionGuide).length > 0 && (
        <div className="my-10 px-4 text-center font-bold text-3xl">
          <Title text1={'Recommended Infusion Guide'} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {productData.infusionGuide.quantity && (
              <div className="flex flex-col items-center text-center">
                <img src={QuantityIcon} alt="Quantity" className="w-40 h-40" />
                <div className="infusionContent mt-[-2.5rem] w-48">
                  <p className="text-base text-[--primary-color]">Quantity</p>
                  <p className="text-sm text-gray-600">{productData.infusionGuide.quantity}</p>
                </div>
              </div>
            )}
            {productData.infusionGuide.temperature && (
              <div className="flex flex-col items-center text-center">
                <img src={TemperatureIcon} alt="Temperature" className="w-40 h-40" />
                <div className="infusionContent mt-[-2.5rem] w-40">
                  <p className="text-base text-[--primary-color]">Temperature</p>
                  <p className="text-sm text-gray-600 ">{productData.infusionGuide.temperature}</p>
                </div>
              </div>
            )}
            {productData.infusionGuide.time && (
              <div className="flex flex-col items-center text-center">
                <img src={TimeIcon} alt="Time" className="w-40 h-40" />
                <div className="infusionContent mt-[-2.5rem] w-40">
                  <p className="text-base text-[--primary-color]">Time</p>
                  <p className="text-sm text-gray-600">{productData.infusionGuide.time}</p>
                </div>
              </div>
            )}
            {productData.infusionGuide.infusions && (
              <div className="flex flex-col items-center text-center">
                <img src={InfusionsIcon} alt="Infusions" className="w-40 h-40" />
                <div className="infusionContent mt-[-2.5rem] w-48">
                  <p className="text-base text-[--primary-color]">Infusions</p>
                  <p className="text-sm text-gray-600 ">{productData.infusionGuide.infusions}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}


      {/* highlight */}
      {productData.highlightSection && (
        <section className="my-12 relative max-w-6xl mx-auto px-4">
          <div className="relative rounded-xl overflow-hidden">
            {/* Image */}
            <img
              src={productData.highlightSection.image}
              alt={productData.highlightSection.title}
              className="w-full h-auto object-cover rounded-xl shadow"
            />

            {/* Overlay text box */}
            <div className="absolute right-4 top-4 sm:right-6 sm:top-6 bg-white p-4 sm:p-6 max-w-[16rem] rounded-md shadow-lg text-left">
              <h2 className="text-md sm:text-xl font-bold text-green-700 mb-2">
                {productData.highlightSection.title}
              </h2>
              <p className="text-sm sm:text-sm text-gray-800 font-bold leading-relaxed">
                {productData.highlightSection.text}
              </p>
            </div>
          </div>
        </section>
      )}



      {/* Review Section */}
      <ReviewSection productId={productData._id} />

      {/* Related Products */}
      <div className="mt-20">
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
