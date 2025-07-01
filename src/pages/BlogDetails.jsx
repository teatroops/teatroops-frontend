import React from 'react';
import { useParams } from 'react-router-dom';
import { blogData } from './Blogs';

const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogData.find(b => String(b.id) === String(id));

  if (!blog) return <div className="p-8 text-center text-gray-700 3xl:text-lg 4xl:text-xl">Blog not found</div>;

  return (
    <div className="max-w-3xl 3xl:max-w-7xl 4xl:max-w-8xl mx-auto px-4 py-10">
      {/* Image with fixed aspect ratio and cover */}
      <div className="relative w-full aspect-[16/9] bg-gray-100 rounded-xl overflow-hidden shadow mb-6">
        <img
          src={blog.image}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 bg-white/80 text-xs 3xl:text-sm 4xl:text-base text-gray-700 font-bold px-2 py-1 rounded">
          TEA TROOPS
        </div>
      </div>
      {/* Title and date */}
      <h1 className="text-2xl sm:text-3xl 3xl:text-4xl 4xl:text-5xl font-bold text-center mb-2 text-[--primary-color]">{blog.title}</h1>
      <p className="text-sm 3xl:text-base 4xl:text-lg text-gray-600 text-center mb-6">{blog.date}</p>
      {/* Content */}
      <div className="pt-4 text-base 3xl:text-lg 4xl:text-xl text-gray-800 leading-relaxed 3xl:leading-loose 4xl:leading-loose">
        {blog.content}
      </div>
    </div>
  );
};

export default BlogDetails;
