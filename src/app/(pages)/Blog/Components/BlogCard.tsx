// components/BlogCard.tsx
import React from 'react';

type BlogCardProps = {
  title: string;
  description: string;
  url: string;
  image: string;
  published_at: string;
  author: string;
};

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  description,
  url,
  image,
  published_at,
  author,
}) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition"
    >
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-md mb-4" />
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 text-sm mb-2">By {author} on {new Date(published_at).toLocaleDateString()}</p>
      <p className="text-gray-700">{description}</p>
    </a>
  );
};

export default BlogCard;
