// components/BlogFilter.tsx
import React from 'react';

type BlogFilterProps = {
  selectedTag: string;
  onChange: (tag: string) => void;
};

const tags = ['ai', 'machinelearning', 'webdev', 'javascript', 'typescript', 'react', 'opensource'];

const BlogFilter: React.FC<BlogFilterProps> = ({ selectedTag, onChange }) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-6">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onChange(tag)}
          className={`px-4 py-2 rounded-full text-sm border ${
            selectedTag === tag
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300'
          } transition`}
        >
          #{tag}
        </button>
      ))}
    </div>
  );
};

export default BlogFilter;
