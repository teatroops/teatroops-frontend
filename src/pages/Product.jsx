import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import QuantityIcon from "../assets/img/Quantity.svg";
import TemperatureIcon from "../assets/img/Temperature.svg";
import TimeIcon from "../assets/img/Time.svg";
import InfusionsIcon from "../assets/img/Infusions.svg";
import { toast } from 'react-toastify';
import { ProductBenefits } from "../components/Benefits";
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
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 px-4 sm:px-8 xl:px-10 3xl:px-2 4xl:px-0 max-w-[1440px] 3xl:max-w-[2000px] 4xl:max-w-[2400px] mx-auto">
      <div className="flex gap-12 flex-col sm:flex-row lg:gap-20 3xl:gap-10">
        {/* Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:hidden">
          <div className="flex overflow-x-auto justify-start w-full">
            {productData.image.flat().map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[25%] flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full h-max shadow-lg">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>
        <div className="hidden sm:flex flex-1 flex-col gap-3">
          <div className="w-full h-max shadow-lg">
            <img className="w-full h-auto object-contain" src={image} alt="" />
          </div>
          <div className="flex flex-row overflow-x-auto w-full gap-2 mt-2">
            {productData.image.flat().map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className={`w-[7.5rem] h-[7.5rem] 3xl:w-[10rem] 3xl:h-[10rem] 4xl:w-[14rem] 4xl:h-[14rem] object-contain rounded border cursor-pointer transition-all duration-200 ${image === item ? 'border-[--primary-color] border-2' : 'border-gray-200'}`}
                alt=""
              />
            ))}
          </div>
        </div>

        <div className="flex-1 lg:px-4 xl:pr-12 3xl:pr-20 4xl:pr-28">
          <h1 className="text-[--primary-color] font-medium text-2xl 3xl:text-4xl 4xl:text-5xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <div className="flex items-center mb-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 3xl:w-6 3xl:h-6 4xl:w-8 4xl:h-8 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                </svg>
              ))}
            </div>
            <p className='text-gray-600 pl-2 3xl:text-xl 4xl:text-2xl'>(122 reviews)</p>
          </div>

          <p className="mt-5 text-3xl 3xl:text-5xl 4xl:text-6xl text-[--primary-color] font-medium">
            {currency}{productData.price?.offer ?? productData.price?.mrp}
            {productData.price?.offer && productData.price.offer !== productData.price.mrp && (
              <span className="line-through text-gray-400 ml-3 text-xl 3xl:text-3xl 4xl:text-4xl">
                MRP {currency}{productData.price.mrp}
              </span>
            )}
          </p>
          <span className="3xl:text-xl 4xl:text-2xl">(Incl of all taxes)</span>

          {productData.price?.discountNote && (
            <p className="mt-2 text-[--primary-color] text-sm 3xl:text-xl 4xl:text-2xl font-semibold">
              {productData.price.discountNote}
            </p>
          )}

          <div className="flex items-center gap-6 my-6 3xl:my-10 4xl:my-12">
            <div className="flex items-center gap-2">
              <button
                className="w-7 h-7 3xl:w-10 3xl:h-10 4xl:w-12 4xl:h-12 flex items-center justify-center rounded-full border border-[--primary-color] text-[--primary-color] bg-white hover:bg-[--primary-color] hover:text-white transition"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >-</button>
              <span className="min-w-[24px] 3xl:min-w-[32px] 4xl:min-w-[40px] text-center font-semibold text-lg 3xl:text-2xl 4xl:text-3xl select-none">{quantity}</span>
              <button
                className="w-7 h-7 3xl:w-10 3xl:h-10 4xl:w-12 4xl:h-12 flex items-center justify-center rounded-full border border-[--primary-color] text-[--primary-color] bg-white hover:bg-[--primary-color] hover:text-white transition"
                onClick={() => handleQuantityChange(quantity + 1)}
              >+</button>
            </div>
            <span className="border py-2 px-4 3xl:py-3 3xl:px-6 4xl:py-4 4xl:px-8 bg-green-50 rounded text-base 3xl:text-xl 4xl:text-2xl">{productData?.size}</span>
          </div>

          <button
            onClick={() => {
              addToCart(productData._id, productData.size, quantity);
              toast.success('Added to cart!', { position: "top-center" });
            }}
            className="bg-[--primary-color] text-white px-8 py-3 3xl:px-12 3xl:py-5 4xl:px-16 4xl:py-7 text-sm 3xl:text-xl 4xl:text-2xl hover:bg-[#22755b]"
          >ADD TO CART</button>

          <ProductBenefits />

          <p className="mt-5 text-gray-600 w-full 3xl:text-xl 4xl:text-2xl">{productData.description}</p>

          {productData.benefits?.length > 0 && (
            <div className="sm:w-1/2">
              <ul className="space-y-2 mt-4 text-gray-600 font-bold leading-4 3xl:text-xl 3xl:leading-6 4xl:text-2xl 4xl:leading-8">
                {productData.benefits.map((benefit, i) => (
                  <li key={i}>{benefit.trim()}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            {productData.storageInstructions && (
              <div className="mt-8 text-sm 3xl:text-xl 4xl:text-2xl text-gray-700">
                <h3 className="font-semibold mb-1">Storage Instructions</h3>
                <p>{productData.storageInstructions}</p>
              </div>
            )}

            {productData.caution && (
              <div className="mt-4 text-sm 3xl:text-xl 4xl:text-2xl text-gray-700">
                <h3 className="font-semibold mb-1">Caution</h3>
                <p>{productData.caution}</p>
              </div>
            )}
          </div>

          <hr className="mt-8 sm:w-4/5" />
        </div>
      </div>

      {/* Recommended Infusion Guide */}
      {
        productData.infusionGuide && Object.keys(productData.infusionGuide).length > 0 && (
          <div className="my-10 px-4 text-center font-bold text-3xl max-w-6xl mx-auto 3xl:max-w-8xl 4xl:max-w-[80%]">
            <Title text1={'Recommended Infusion Guide'} />
            <div className="flex flex-wrap justify-center gap-2">
              {productData.infusionGuide.quantity && (
                <div className="flex flex-col items-center text-center w-full sm:w-[45%] md:w-[22%]">
                  <img src={QuantityIcon} alt="Quantity" className="w-40 h-40 3xl:w-48 3xl:h-48 4xl:w-56 4xl:h-56" />
                  <div className="infusionContent mt-[-2.5rem] w-48 3xl:mt-[-3rem] 3xl:w-56 4xl:mt-[-3.5rem] 4xl:w-64">
                    <p className="text-base text-[--primary-color] 3xl:text-lg 4xl:text-3xl">Quantity</p>
                    <p className="text-sm text-gray-600 3xl:text-base 4xl:text-2xl">{productData.infusionGuide.quantity}</p>
                  </div>
                </div>
              )}
              {productData.infusionGuide.temperature && (
                <div className="flex flex-col items-center text-center w-full sm:w-[45%] md:w-[22%]">
                  <img src={TemperatureIcon} alt="Temperature" className="w-40 h-40 3xl:w-48 3xl:h-48 4xl:w-56 4xl:h-56" />
                  <div className="infusionContent mt-[-2.5rem] w-40 3xl:mt-[-3rem] 3xl:w-48 4xl:mt-[-3.5rem] 4xl:w-56">
                    <p className="text-base text-[--primary-color] 3xl:text-lg 4xl:text-3xl">Temperature</p>
                    <p className="text-sm text-gray-600 3xl:text-base 4xl:text-2xl">{productData.infusionGuide.temperature}</p>
                  </div>
                </div>
              )}
              {productData.infusionGuide.time && (
                <div className="flex flex-col items-center text-center w-full sm:w-[45%] md:w-[22%]">
                  <img src={TimeIcon} alt="Time" className="w-40 h-40 3xl:w-48 3xl:h-48 4xl:w-56 4xl:h-56" />
                  <div className="infusionContent mt-[-2.5rem] w-40 3xl:mt-[-3rem] 3xl:w-48 4xl:mt-[-3.5rem] 4xl:w-56">
                    <p className="text-base text-[--primary-color] 3xl:text-lg 4xl:text-3xl">Time</p>
                    <p className="text-sm text-gray-600 3xl:text-base 4xl:text-2xl">{productData.infusionGuide.time}</p>
                  </div>
                </div>
              )}
              {productData.infusionGuide.infusions && (
                <div className="flex flex-col items-center text-center w-full sm:w-[45%] md:w-[22%]">
                  <img src={InfusionsIcon} alt="Infusions" className="w-40 h-40 3xl:w-48 3xl:h-48 4xl:w-56 4xl:h-56" />
                  <div className="infusionContent mt-[-2.5rem] w-48 3xl:mt-[-3rem] 3xl:w-56 4xl:mt-[-3.5rem] 4xl:w-64">
                    <p className="text-base text-[--primary-color] 3xl:text-lg 4xl:text-3xl">Infusions</p>
                    <p className="text-sm text-gray-600 3xl:text-base 4xl:text-2xl">{productData.infusionGuide.infusions}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      }

      {/* highlight */}
      {
        productData.highlightSection && (
          <section className="my-12 relative max-w-6xl mx-auto px-4 3xl:max-w-8xl 4xl:max-w-[90%]">
            <div className="relative overflow-hidden">
              {/* Image */}
              <img
                src={productData.highlightSection.image}
                alt={productData.highlightSection.title}
                className="w-full h-auto object-contain"
              />

              {/* Overlay text box */}
              <div
                className="
                bg-white p-4 sm:p-6 sm:rounded-md sm:shadow-lg text-left max-w-full sm:max-w-[16rem] 3xl:max-w-[25rem] 4xl:max-w-[32rem] mt-4 sm:mt-0 sm:absolute sm:right-6 3xl:right-8 4xl:right-10 sm:top-6 3xl:top-8 4xl:top-10">
                <h2 className="text-md sm:text-xl 3xl:text-3xl 4xl:text-5xl font-bold text-[--primary-color] mb-2">
                  {productData.highlightSection.title}
                </h2>
                <p className="text-sm 3xl:text-xl 4xl:text-3xl text-gray-800 font-bold leading-relaxed">
                  {productData.highlightSection.text}
                </p>
              </div>
            </div>
          </section>
        )
      }

      <ReviewSection productId={productData._id} />
      <div className="mt-20">
        <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
      </div>
    </div>
  ) : <div className="opacity-0"></div>;
};

export default Product;
