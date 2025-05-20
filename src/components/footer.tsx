import React, { useState } from "react";
import {
  FaFacebookMessenger,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle email subscription submission
  const handleSubmit = async () => {
    if (!email) {
      toast.error("Please enter a valid email.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // const response = await fetch('https://api.goyoungafrica.org/api/v1/subscription/subscribe', {
      const response = await fetch(
        "http://localhost:3000/api/v1/subscription/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        setIsSubmitting(false);
        setEmail(""); // Clear the input after successful submission
        toast.success("Successfully subscribed!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        const errorData = await response.json();
        console.error(
          "Subscription error:",
          errorData.message || response.statusText
        );
        toast.error("Subscription failed. Please try again later.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Network error. Please check your connection.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="w-full bg-white py-2 border-t border-gray-200">
      <div className="px-6">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-y-3">
          <div className="flex items-center space-x-2">
            <img src="/icons/logo-text.svg" alt="Logo" className="h-12" />
          </div>
          <div className="lg:w-2/5 w-full text-gray-500 font-light text-center">
            Empower your growth with Goya – the e-coaching platform designed to
            unlock your potential, one skill at a time. Transform your future,
            guided by expert mentors.
          </div>
        </div>

        <div className="border-t border-gray-300 py-8">
          {/* Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <h4 className="text-gray-700 font-bold mb-4 text-center">
                Product
              </h4>
              <ul className="space-y-2 text-gray-500">
                <li>
                  <Link to="#" className="hover:text-gray-900">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-gray-900">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-gray-900">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-gray-900">
                    Reviews
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-gray-900">
                    Updates
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="text-gray-700 font-bold mb-4 text-center">
                Company
              </h4>
              <ul className="space-y-2 text-gray-500">
                <li>
                  <Link to="#" className="hover:text-gray-900">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-gray-900">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-gray-900">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-gray-900">
                    Culture
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="text-gray-700 font-bold mb-4 text-center">
                Support
              </h4>
              <ul className="space-y-2 text-gray-500">
                <li>
                  <Link to="#" className="hover:text-gray-900">
                    Getting Started
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-gray-900">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-gray-900">
                    Server Status
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-gray-900">
                    Report a Bug
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="text-gray-700 font-bold mb-4 text-center">
                Subscribe to our newsletter
              </h4>
              <p className="text-gray-500 mb-4">
                Stay updated with our latest news and offers.
              </p>
              <div className="w-full flex flex-col space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleSubmit}
                  className="w-3/5 bg-blue-500 text-white text-sm px-6 py-2 rounded-full hover:bg-blue-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-gray-600 font-bold text-sm mb-3">
          Norrsken House Kigali, 1 KN 78 St, Kigali
        </div>
        <div className="border-t border-gray-300 py-2 flex justify-between items-center">
          <div className="text-center text-gray-500 text-sm">
            &copy; 2024 GOYA | All Rights Reserved
          </div>
          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com/company/go-young-africa-x/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedinIn size={20} className="text-blue-600" />
            </a>
            <a href="https://x.com/GOYAFRICA" target="_blank" rel="noreferrer">
              <FaTwitter size={20} className="text-blue-600" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61563176430025"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookMessenger size={20} className="text-blue-600" />
            </a>
            <a
              href="https://www.instagram.com/goyoungafrica/"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram size={20} className="text-blue-600" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
