// pages/blog.tsx
"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from './Components/BlogCard';
import BlogFilter from './Components/BlogFilter';

type Blog = {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string;
  published_at: string;
  user: {
    name: string;
  };
};

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTag, setSelectedTag] = useState('ai');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://dev.to/api/articles`, {
          params: { tag: selectedTag, per_page: 9 },
        });
        setBlogs(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setBlogs([]);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [selectedTag]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-4">Explore Tech & AI Blogs</h1>
      <p className="text-center text-gray-600 mb-8">
        Curated posts from <strong>Dev.to</strong>. Choose a tag to filter topics you love.
      </p>

      <BlogFilter selectedTag={selectedTag} onChange={setSelectedTag} />

      {loading ? (
        <p className="text-center text-gray-600">Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p className="text-center text-gray-600">No blogs found for #{selectedTag}</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              description={blog.description || 'No description provided.'}
              url={blog.url}
              image={blog.cover_image || '/default-thumbnail.avif'}
              published_at={blog.published_at}
              author={blog.user.name}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPage;
