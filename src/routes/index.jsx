import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "@components/layout/Layout";
import Loader from "@components/common/Loader";
import ScrollToTop from "./ScrollToTop";

// Lazy load pages for better performance
const Home = lazy(() => import("@pages/Home"));
const Services = lazy(() => import("@pages/Services"));
const About = lazy(() => import("@pages/About"));
const Donate = lazy(() => import("@pages/Donate"));
const Contact = lazy(() => import("@pages/Contact"));
const Gallery = lazy(() => import("@pages/Gallery"));
const Resources = lazy(() => import("@pages/Resources"));
const Blog = lazy(() => import("@pages/Blog"));
const BlogPost = lazy(() => import("@pages/BlogPost"));
const NotFound = lazy(() => import("@pages/NotFound"));
const PrivacyPolicy = lazy(() => import("@pages/PrivacyPolicy"));
const Enrollment = lazy(() => import("@pages/Enrollment"));

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<Loader fullScreen />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="about" element={<About />} />
            <Route path="donate" element={<Donate />} />
            <Route path="contact" element={<Contact />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="resources" element={<Resources />} />
            <Route path="blog" element={<Blog />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="enrollment" element={<Enrollment />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRoutes;
