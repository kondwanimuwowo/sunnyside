import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import {
  BLOG_POSTS,
  BLOG_CATEGORIES,
  getFeaturedPosts,
  searchPosts,
  getPostsByCategory,
} from "@data/blog";
import BlogCard from "@components/blog/BlogCard";
import SEO from "@components/common/SEO";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recent"); // recent, popular, oldest

  const featuredPosts = getFeaturedPosts();

  // Filter and search logic
  const filteredPosts = useMemo(() => {
    let posts = BLOG_POSTS;

    // Category filter
    if (selectedCategory !== "all") {
      posts = getPostsByCategory(selectedCategory);
    }

    // Search
    if (searchQuery) {
      posts = searchPosts(searchQuery);
    }

    // Sort
    if (sortBy === "recent") {
      posts = [...posts].sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      );
    } else if (sortBy === "popular") {
      posts = [...posts].sort((a, b) => b.views - a.views);
    } else if (sortBy === "oldest") {
      posts = [...posts].sort(
        (a, b) => new Date(a.publishedAt) - new Date(b.publishedAt)
      );
    }

    return posts;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <>
      <SEO
        title="Blog & Resources"
        description="Expert insights, success stories, and practical guidance for parents of children with learning challenges."
        keywords="autism blog, down syndrome resources, cerebral palsy guide, special needs education"
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-10 text-gray-900 leading-normal">
                Blog & <span className="text-[#32cd32]">Resources</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Expert insights, success stories, and practical guidance for
                parents and educators
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#32cd32] focus:outline-none transition-colors"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-6 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === "all"
                      ? "bg-[#32cd32] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All Articles
                </button>
                {BLOG_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === cat.id
                        ? "text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    style={{
                      backgroundColor:
                        selectedCategory === cat.id ? cat.color : undefined,
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <cat.icon className="w-4 h-4 text-current" />
                      {cat.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-[#32cd32] focus:outline-none"
                >
                  <option value="recent">Most Recent</option>
                  <option value="popular">Most Popular</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Results Count */}
        <section className="py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm text-gray-600">
              Showing {filteredPosts.length}{" "}
              {filteredPosts.length === 1 ? "article" : "articles"}
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>
        </section>

        {/* Featured Posts (only show if no search/filter) */}
        {!searchQuery &&
          selectedCategory === "all" &&
          featuredPosts.length > 0 && (
            <section className="py-8 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredPosts.map((post, idx) => (
                    <BlogCard key={post.id} post={post} index={idx} />
                  ))}
                </div>
              </div>
            </section>
          )}

        {/* All Posts */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            {!searchQuery && selectedCategory === "all" && (
              <h2 className="text-2xl font-bold mb-6">All Articles</h2>
            )}

            {filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post, idx) => (
                  <BlogCard key={post.id} post={post} index={idx} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-2">No articles found</p>
                <p className="text-gray-400 text-sm">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;
