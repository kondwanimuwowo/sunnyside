import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Clock,
  Eye,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Copy,
  Check,
} from "lucide-react";
import { getPostBySlug, getRelatedPosts, BLOG_CATEGORIES } from "@data/blog";
import BlogCard from "@components/blog/BlogCard";
import ArticleContent from "@components/blog/ArticleContent";
import SEO from "@components/common/SEO";
import Button from "@components/common/Button";
import { useState } from "react";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getPostBySlug(slug);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <Button onClick={() => navigate("/blog")}>Back to Blog</Button>
        </div>
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(post);
  const category = BLOG_CATEGORIES.find((cat) => cat.id === post.category);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = post.title;

    if (platform === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        "_blank"
      );
    } else if (platform === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
        "_blank"
      );
    } else if (platform === "whatsapp") {
      window.open(`https://wa.me/?text=${text} ${url}`, "_blank");
    }
  };

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        keywords={post.tags.join(", ")}
        image={post.featuredImage}
        url={`/blog/${post.slug}`}
        type="article"
      />

      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-gradient-to-b from-gray-50 to-white pt-16 pb-8 md:pt-20 md:pb-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col max-w-4xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center text-[#32cd32] hover:text-[#22a722] font-medium mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>

            {category && (
              <div
                className="inline-flex w-fit self-start items-center px-3 py-1 rounded-full text-sm font-medium text-white mb-4"
                style={{ backgroundColor: category.color }}
              >
                <category.icon className="w-4 h-4 mr-1" />
                {category.name}
              </div>
            )}

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
            >
              {post.title}
            </motion.h1>

            {/* Meta */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#32cd32] rounded-full flex items-center justify-center text-white font-bold">
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {post.author.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {post.author.role}
                  </div>
                </div>
              </div>
              <span className="text-gray-300">•</span>
              <time>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime} min read
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {post.views.toLocaleString()} views
              </div>
            </motion.div>

            {/* Share Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              <button
                onClick={() => handleShare("facebook")}
                className="flex items-center gap-2 px-4 py-2 bg-[#1877f2] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Facebook className="w-4 h-4" fill="currentColor" />
                Share
              </button>
              <button
                onClick={() => handleShare("twitter")}
                className="flex items-center gap-2 px-4 py-2 bg-[#1da1f2] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Twitter className="w-4 h-4" fill="currentColor" />
                Tweet
              </button>
              <button
                onClick={() => handleShare("whatsapp")}
                className="flex items-center gap-2 px-4 py-2 bg-[#25d366] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Share2 className="w-4 h-4" />
                WhatsApp
              </button>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-[#32cd32]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </motion.div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="px-4 sm:px-6 lg:px-8 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-5xl mx-auto"
          >
            <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Content - NOW BEAUTIFUL! */}
        <article className="px-4 sm:px-6 lg:px-8 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            <ArticleContent content={post.content} />
          </motion.div>

          {/* Tags */}
          <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-[#32cd32] hover:text-white transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost, idx) => (
                  <BlogCard
                    key={relatedPost.id}
                    post={relatedPost}
                    index={idx}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Need Support for Your Child?
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Contact Sunnyside Therapy Center to learn how we can help your
              child thrive.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button onClick={() => navigate("/contact")}>Contact Us</Button>
              <Button variant="outline" onClick={() => navigate("/services")}>
                Our Services
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogPost;
