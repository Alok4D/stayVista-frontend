import Container from "../Container";
import { CgFacebook } from "react-icons/cg";
import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#f7f7f7] shadow-sm">
      <div className="container mx-auto">
        {/* Top Section */}
        <div className="pt-12 pb-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Services</h3>
            <ul className="flex flex-col gap-2 text-gray-600 dark:text-gray-400 text-sm">
              <li className="hover:text-blue-500 transition-colors cursor-pointer">UI Components</li>
              <li className="hover:text-blue-500 transition-colors cursor-pointer">Website Templates</li>
              <li className="hover:text-blue-500 transition-colors cursor-pointer">Icons</li>
              <li className="hover:text-blue-500 transition-colors cursor-pointer">Opacity Palette</li>
              <li className="hover:text-blue-500 transition-colors cursor-pointer">Blocks</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Company</h3>
            <ul className="flex flex-col gap-2 text-gray-600 dark:text-gray-400 text-sm">
              <li className="hover:text-blue-500 transition-colors cursor-pointer">Service</li>
              <li className="hover:text-blue-500 transition-colors cursor-pointer">Features</li>
              <li className="hover:text-blue-500 transition-colors cursor-pointer">Our Team</li>
              <li className="hover:text-blue-500 transition-colors cursor-pointer">Portfolio</li>
              <li className="hover:text-blue-500 transition-colors cursor-pointer">Blog</li>
              <li className="hover:text-blue-500 transition-colors cursor-pointer">Contact Us</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Follow Us</h3>
            <ul className="flex flex-col gap-2 text-gray-600 dark:text-gray-400 text-sm">
              <li className="hover:text-blue-500 transition-colors cursor-pointer">Dribbble</li>
              <li className="hover:text-blue-500 transition-colors cursor-pointer">Behance</li>
              <li className="hover:text-blue-500 transition-colors cursor-pointer">Medium</li>
              <li className="hover:text-blue-500 transition-colors cursor-pointer">Instagram</li>
              <li className="hover:text-blue-500 transition-colors cursor-pointer">Facebook</li>
              <li className="hover:text-blue-500 transition-colors cursor-pointer">Twitter</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Subscribe</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Get the latest news and updates right in your inbox.</p>
            <div className="relative w-full">
              <input
                type="email"
                placeholder="Email address"
                className="w-full pr-28 py-3 pl-4 rounded-full border border-gray-300 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-200 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
              <button className="absolute top-1/2 right-1 transform -translate-y-1/2 bg-rose-500 hover:bg-red-600 text-white px-2 py-1 lg:px-5 lg:py-2 rounded-full font-medium transition">
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 pb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link to="/">
            <img src="https://i.ibb.co/4ZXzmq5/logo.png" alt="logo" className="w-28 md:w-32"/>
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400">© 2025 StayVista. All Rights Reserved.</p>
          <div className="flex gap-3">
            <a className="text-lg p-2 rounded-full hover:text-white hover:bg-blue-500 dark:text-gray-400 transition"><CgFacebook /></a>
            <a className="text-lg p-2 rounded-full hover:text-white hover:bg-blue-500 dark:text-gray-400 transition"><BsTwitter /></a>
            <a className="text-lg p-2 rounded-full hover:text-white hover:bg-blue-500 dark:text-gray-400 transition"><BsInstagram /></a>
            <a className="text-lg p-2 rounded-full hover:text-white hover:bg-blue-500 dark:text-gray-400 transition"><BsLinkedin /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
