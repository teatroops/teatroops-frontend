import React from 'react';
import { useParams } from 'react-router-dom';
import { blogData } from './Blogs';

const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogData.find(b => String(b.id) === String(id));

  if (!blog) return <div className="p-8 text-center text-gray-700">Blog not found</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Image with fixed aspect ratio and cover */}
      <div className="relative w-full aspect-[16/9] bg-gray-100 rounded-xl overflow-hidden shadow mb-6">
        <img
          src={blog.image}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 bg-white/80 text-xs text-gray-700 font-bold px-2 py-1 rounded">
          TEA TROOPS
        </div>
      </div>
      {/* Title and date */}
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-[--primary-color]">{blog.title}</h1>
      <p className="text-sm text-gray-600 text-center mb-6">{blog.date}</p>
      {/* Content */}
      <div className="pt-4 text-base text-gray-800 leading-relaxed">
        {blog.content}
      </div>
    </div>
  );
};

export default BlogDetails;
