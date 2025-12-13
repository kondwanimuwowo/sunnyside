import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Eye, ArrowRight } from "lucide-react";
import { BLOG_CATEGORIES } from "@data/blog";

const BlogCard = ({ post, index }) => {
  const category = BLOG_CATEGORIES.find((cat) => cat.id === post.category);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200 group"
    >
      {/* Image */}
      <Link
        to={`/blog/${post.slug}`}
        className="block relative overflow-hidden"
      >
        <div className="aspect-video relative">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Category Badge */}
        {category && (
          <div
            className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium text-white shadow-sm"
            style={{ backgroundColor: category.color }}
          >
            {category.icon} {category.name}
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-5">
        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime} min read
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            {post.views.toLocaleString()} views
          </div>
          <time>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>

        {/* Title */}
        <Link to={`/blog/${post.slug}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#32cd32] transition-colors">
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-500">By {post.author.name}</div>
          <Link
            to={`/blog/${post.slug}`}
            className="text-[#32cd32] hover:text-[#22a722] font-medium text-sm flex items-center gap-1 transition-colors"
          >
            Read more
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogCard;
