import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div className="text-gray-800">
      {/* Title */}
      <div className="font-bold text-3xl text-center pt-10 border-t border-gray-200">
        <Title text1="Our Story" />
      </div>

      {/* Hero Section */}
      <div className="my-6 p-4 flex flex-col md:flex-row gap-10 px-4 sm:px-6 lg:px-12 rounded-md bg-green-50">
        <img
          className="w-full md:max-w-[500px] rounded-lg shadow-lg object-cover"
          src={assets.about_img}
          alt="About Tea Troops"
        />

        <div className="flex flex-col justify-center gap-6 text-base leading-8 ">
          <span className="font-semibold text-2xl text-green-700">
            Welcome to Tea Troops!
          </span>
          <p>
            We are a small business based in Delhi, India. My family roots are
            from Uttarakhand and we came to Delhi before I was born. The
            landscape around me had ongoing construction work and busy roads,
            creating a void. When we visited my uncle in our village, he
            introduced me to different herbs, helping me develop a taste for
            them. I value this treasure more than ever. Interestingly, I
            developed the habit of serving this to friends and family at
            breakfast. Though I also enjoy milk in my tea sometimes, these
            herbal cups have helped my family, especially my parents, reduce
            their daily caffeine intake. That is the beauty of tea, and enjoying
            it with wonderful company enhances its flavors.

            We know that we can't solve the major issues affecting nature, but I
            believe every bit counts. We are always searching for sustainable
            materials for our packaging.

            While we're not perfect, we are committed to improving and
            constantly evolving. It is also essential to ensure our teas are
            ethically sourced.
          </p>
        </div>
      </div>

      {/* What is Tea Troops */}
      <div className="bg-green-50 py-10 px-4 sm:px-6 lg:px-12 rounded-lg shadow-inner mb-12">
        <h3 className="text-xl font-bold mb-4 text-green-800">
          What does Tea Troops mean?
        </h3>
        <p className="text-gray-700 leading-relaxed">
          It represents a troop that loves herbal tea. But more than that, it's
          a symbol of people working together in the fields, harvesting
          ingredients that seem simple but are deeply complex and healing. Tea
          Troops is a movement of love for nature, for simplicity, and for the
          community behind every blend.
        </p>
      </div>

      {/* Our Teas Section */}
      <div className="bg-green-50 py-8 px-4 sm:px-6 lg:px-12 rounded-lg shadow-inner mb-12">
        <h3 className="text-xl font-bold mb-4 text-green-800">Our Teas</h3>
        <p className="text-gray-700 leading-relaxed">
          Yes! It is a permutation and combination with intense study, also
          driven by our valuable clients who love herbal tea and happily share
          their experiences. We are building our teas. We all love nature and
          nature-based ingredients, and Tea Troops brings that to all of you
          with the help of our Troops.
        </p>
      </div>

      {/* Newsletter */}
      {/* <NewsletterBox /> */}
    </div>
  );
};

export default About;
