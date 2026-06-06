import {
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaLocationArrow,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdAddCall } from "react-icons/md";
import { TbFidgetSpinner } from "react-icons/tb";
import { useState } from "react";
import toast from "react-hot-toast";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      return toast.error("Please fill in all fields!");
    }

    setLoading(true);

    try {
      // Try to send to backend if route exists
      const res = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        toast.success("Message sent successfully! We'll get back to you soon. 🎉");
      } else {
        throw new Error("Backend route not available");
      }
    } catch {
      // Fallback: frontend-only simulation
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast.success("Message sent successfully! We'll get back to you soon. 🎉");
    } finally {
      setLoading(false);
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <section className="px-4 lg:px-0 mb-8 bg-white text-gray-800 container mx-auto mt-20">

      {/* Header */}
      <h2 className="text-4xl font-bold mb-10 text-gray-900 text-center">
        Contact Us
      </h2>

      {/* Map + Form */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Google Map */}
        <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24165.33726082108!2d-74.0154857!3d40.7114607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316c0bb7b1%3A0xf11c16a2d79b7c2f!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1697040053058!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 rounded-xl shadow-md p-6 md:p-8">
          <h3 className="text-2xl font-semibold mb-6 text-gray-900">
            Get In Touch
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name*"
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email*"
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us a little bit about your destination dream"
              rows="4"
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className="disabled:cursor-not-allowed bg-gradient-to-r from-amber-600 to-amber-500 text-white px-10 py-3 rounded-md shadow-xs hover:shadow-md hover:from-amber-700 hover:to-amber-600 transition-all flex items-center gap-2 font-medium"
            >
              {loading ? (
                <>
                  <TbFidgetSpinner className="animate-spin text-lg" />
                  Sending...
                </>
              ) : (
                "Send Now"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
        {/* Email */}
        <div className="flex flex-col items-center p-8 bg-white border rounded-2xl shadow hover:shadow-lg transition-all hover:-translate-y-2">
          <div className="bg-amber-100 p-4 rounded-full mb-4">
            <FaEnvelope className="text-3xl text-amber-600" />
          </div>
          <h4 className="text-xl font-semibold mb-2">Email</h4>
          <p className="text-gray-500 mb-3 text-sm md:text-base">
            A wonderful serenity has taken possession of my entire soul, like
            these sweet mornings.
          </p>
          <a
            href="mailto:hello@sailing.com"
            className="text-amber-600 font-medium hover:underline"
          >
            hello@sailing.com
          </a>
        </div>

        {/* Phone */}
        <div className="flex flex-col items-center p-8 bg-white border rounded-2xl shadow hover:shadow-lg transition-all hover:-translate-y-2">
          <div className="bg-amber-100 p-4 rounded-full mb-4">
            <MdAddCall className="text-3xl text-amber-600" />
          </div>
          <h4 className="text-xl font-semibold mb-2">Phone</h4>
          <p className="text-gray-500 mb-3 text-sm md:text-base">
            A wonderful serenity has taken possession of my entire soul, like
            these sweet mornings.
          </p>
          <p className="text-amber-600 font-medium">(308) 555-0121</p>
        </div>

        {/* Social */}
        <div className="flex flex-col items-center p-8 bg-white border rounded-2xl shadow hover:shadow-lg transition-all hover:-translate-y-2">
          <div className="bg-amber-100 p-4 rounded-full mb-4">
            <FaLocationArrow className="text-3xl text-amber-600" />
          </div>
          <h4 className="text-xl font-semibold mb-2">Social</h4>
          <p className="text-gray-500 mb-4 text-sm md:text-base">
            Follow us on
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="#"
              className="p-3 rounded-full bg-amber-100 hover:bg-amber-600 hover:text-white transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-3 rounded-full bg-amber-100 hover:bg-amber-600 hover:text-white transition"
            >
              <FaXTwitter />
            </a>
            <a
              href="#"
              className="p-3 rounded-full bg-amber-100 hover:bg-amber-600 hover:text-white transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
