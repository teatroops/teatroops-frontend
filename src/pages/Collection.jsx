import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    const getPrice = (product) => {
      if (product.price && typeof product.price === "object") {
        return product.price.offer ?? product.price.mrp ?? 0;
      }
      return 0;
    };

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => getPrice(a) - getPrice(b)));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => getPrice(b) - getPrice(a)));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>
        {/* Category Filter */}
        {/* <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"
            } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Herbal Tea"}
                onChange={toggleCategory}
              />{" "}
              Herbal Tea
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Green Tea"}
                onChange={toggleCategory}
              />{" "}
              Green Tea
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Black Tea"}
                onChange={toggleCategory}
              />{" "}
              Black Tea
            </p>
          </div>
        </div> */}
        {/* SubCategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"
            } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Loose Lead"}
                onChange={toggleSubCategory}
              />{" "}
              Loose Leaf
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Tea Bags"}
                onChange={toggleSubCategory}
              />{" "}
              Tea Bags
            </p>
            {/* <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Sampler'} onChange={toggleSubCategory} /> Sampler
              </p> */}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 text-base sm:text-2xl mb-4 font-bold">
          {/* Title stays full-width on mobile, inline on sm+ */}
          <Title text1={"All Collection"} />

          {/* Dropdown moves below title on mobile */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 px-2 py-1 text-xs sm:text-sm sm:px-3 sm:py-2 rounded-md w-fit"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Price Low to High</option>
            <option value="high-low">Sort by: Price High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
