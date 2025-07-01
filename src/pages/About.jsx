import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div className="text-gray-800">
      {/* Title */}
      <div className="font-bold text-3xl 3xl:text-4xl 4xl:text-5xl text-center pt-10 border-t border-gray-200">
        <Title text1="Our Story" />
      </div>

      {/* Hero Section */}
      <div className="my-6 p-4 flex flex-col md:flex-row gap-10 px-4 sm:px-6 lg:px-12">
        <img
          className="w-full md:max-w-[500px] 3xl:max-w-[600px] 4xl:max-w-[700px] rounded-lg shadow-lg object-cover"
          src={assets.about_img}
          alt="About Tea Troops"
        />

        <div className="flex flex-col justify-center gap-4 text-base 3xl:text-xl 4xl:text-3xl leading-8 3xl:leading-10 4xl:leading-normal">
          <span className="font-semibold text-2xl 3xl:text-3xl 4xl:text-4xl text-[--primary-color]">
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
          {/* What is Tea Troops */}
          <h3 className="text-xl 3xl:text-2xl 4xl:text-3xl font-bold text-[--primary-color]">
            What does Tea Troops mean?
          </h3>
          <p className="text-gray-700 3xl:text-xl 4xl:text-3xl leading-8 3xl:leading-10 4xl:leading-normal">
            It represents a troop that loves herbal tea. But more than that, it's
            a symbol of people working together in the fields, harvesting
            ingredients that seem simple but are deeply complex and healing. Tea
            Troops is a movement of love for nature, for simplicity, and for the
            community behind every blend.
          </p>

          {/* Our Teas Section */}
          <h3 className="text-xl 3xl:text-2xl 4xl:text-3xl font-bold text-[--primary-color]">Our Teas</h3>
          <p className="text-gray-700 l3xl:text-xl 4xl:text-3xl leading-8 3xl:leading-10 4xl:leading-normal">
            Yes! It is a permutation and combination with intense study, also
            driven by our valuable clients who love herbal tea and happily share
            their experiences. We are building our teas. We all love nature and
            nature-based ingredients, and Tea Troops brings that to all of you
            with the help of our Troops.
          </p>
        </div>
      </div>

      {/* Newsletter */}
      {/* <NewsletterBox /> */}
    </div>
  );
};

export default About;
