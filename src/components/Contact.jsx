import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'motion/react';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../App';
import { PopupButton } from 'react-calendly';

// Simple input sanitization function
const sanitizeInput = (input) => {
  return input.replace(/[<>&"']/g, '').trim();
};

// Email format validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});
  const { theme = 'light' } = useContext(ThemeContext);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!isValidEmail(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (formData.name.length > 100) newErrors.name = 'Name must be under 100 characters';
    if (formData.email.length > 100) newErrors.email = 'Email must be under 100 characters';
    if (formData.message.length > 1000) newErrors.message = 'Message must be under 1000 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (
      !import.meta.env.VITE_EMAILJS_SERVICE_ID ||
      !import.meta.env.VITE_EMAILJS_TEMPLATE_ID ||
      !import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ) {
      setToast({ type: 'error', message: 'Configuration error. Please try again later.' });
      return;
    }

    setIsLoading(true);
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      message: sanitizeInput(formData.message),
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        sanitizedData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (res) => {
          setIsLoading(false);
          setFormData({ name: '', email: '', message: '' });
          setErrors({});
          setToast({ type: 'success', message: 'Message sent successfully!' });
        },
        (err) => {
          console.error('EmailJS error:', err);
          setIsLoading(false);
          const errorMessage = err.text?.includes('timeout')
            ? 'Request timed out. Please try again.'
            : err.text?.includes('invalid')
            ? 'Invalid configuration. Please try again later.'
            : 'Could not send message. Try again later.';
          setToast({ type: 'error', message: errorMessage });
        }
      );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <section
      id="contact"
      className={`py-24 px-6 relative overflow-hidden bg-transparent`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-10 ${
            theme === "dark" ? "bg-[#b8f2e6]" : "bg-[#aed9e0]"
          }`}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-10 ${
            theme === "dark" ? "bg-[#b8f2e6]" : "bg-[#aed9e0]"
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            className={`text-5xl md:text-6xl font-bold mb-4 ${
              theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#5e6472]'
            }`}
          >
            Get In Touch
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`h-1 mx-auto rounded-full ${
              theme === "dark" ? "bg-[#b8f2e6]" : "bg-[#aed9e0]"
            }`}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div>
              <h3 className={`text-3xl md:text-4xl font-bold mb-6 ${
                theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#5e6472]'
              }`}>
                Let's Connect
              </h3>
              <p className={`text-lg mb-8 ${
                theme === 'dark' ? 'text-[#aed9e0]' : 'text-[#5e6472]'
              } opacity-90`}>
                Have a project in mind or just want to chat? Feel free to reach out!
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              <motion.a
                href="https://linkedin.com/in/g23"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, x: 10 }}
                className={`block p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-[#b8f2e6]/10 border-[#b8f2e6]/20 hover:bg-[#b8f2e6]/20'
                    : 'bg-[#aed9e0]/20 border-[#aed9e0]/40 hover:bg-[#aed9e0]/30'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${
                    theme === 'dark' ? 'bg-[#b8f2e6]/20' : 'bg-[#aed9e0]/50'
                  }`}>
                    <svg className={`w-6 h-6 ${
                      theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#5e6472]'
                    }`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  <div>
                    <p className={`text-sm opacity-75 ${
                      theme === 'dark' ? 'text-[#aed9e0]' : 'text-[#5e6472]'
                    }`}>LinkedIn</p>
                    <p className={`text-lg font-semibold ${
                      theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#5e6472]'
                    }`}>linkedin.com/in/g23</p>
                  </div>
                </div>
              </motion.a>

              <motion.a
                href="https://instagram.com/g23lifts"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, x: 10 }}
                className={`block p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-[#b8f2e6]/10 border-[#b8f2e6]/20 hover:bg-[#b8f2e6]/20'
                    : 'bg-[#aed9e0]/20 border-[#aed9e0]/40 hover:bg-[#aed9e0]/30'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${
                    theme === 'dark' ? 'bg-[#b8f2e6]/20' : 'bg-[#aed9e0]/50'
                  }`}>
                    <svg className={`w-6 h-6 ${
                      theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#5e6472]'
                    }`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </div>
                  <div>
                    <p className={`text-sm opacity-75 ${
                      theme === 'dark' ? 'text-[#aed9e0]' : 'text-[#5e6472]'
                    }`}>Instagram</p>
                    <p className={`text-lg font-semibold break-all ${
                      theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#5e6472]'
                    }`}>@g23lifts</p>
                  </div>
                </div>
              </motion.a>

              <motion.div
                whileHover={{ scale: 1.02, x: 10 }}
                className={`block p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-[#b8f2e6]/10 border-[#b8f2e6]/20 hover:bg-[#b8f2e6]/20'
                    : 'bg-[#aed9e0]/20 border-[#aed9e0]/40 hover:bg-[#aed9e0]/30'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${
                    theme === 'dark' ? 'bg-[#b8f2e6]/20' : 'bg-[#aed9e0]/50'
                  }`}>
                    <svg className={`w-6 h-6 ${
                      theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#5e6472]'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className={`text-sm opacity-75 ${
                      theme === 'dark' ? 'text-[#aed9e0]' : 'text-[#5e6472]'
                    }`}>Calendly</p>
                    <PopupButton
                      url="https://calendly.com/gautamnair023/gautam-nair-30min-googlemeet-clone"
                      rootElement={document.getElementById("root")}
                      className={`text-lg font-semibold cursor-pointer ${
                        theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#5e6472]'
                      }`}
                      text="Schedule a call"
                    />
                  </div>
                </div>
              </motion.div>


              <motion.div
                whileHover={{ scale: 1.02, x: 10 }}
                className={`block p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-[#b8f2e6]/10 border-[#b8f2e6]/20 hover:bg-[#b8f2e6]/20'
                    : 'bg-[#aed9e0]/20 border-[#aed9e0]/40 hover:bg-[#aed9e0]/30'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${
                    theme === 'dark' ? 'bg-[#b8f2e6]/20' : 'bg-[#aed9e0]/50'
                  }`}>
                    <svg className={`w-6 h-6 ${
                      theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#5e6472]'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className={`text-sm opacity-75 ${
                      theme === 'dark' ? 'text-[#aed9e0]' : 'text-[#5e6472]'
                    }`}>Calendly</p>
                    <PopupButton
                      url="https://calendly.com/gautamnair023/gautam-nair-30min-googlemeet"
                      rootElement={document.getElementById("root")}
                      className={`text-lg font-semibold cursor-pointer ${
                        theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#5e6472]'
                      }`}
                      text="Schedule a Google Meet"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6"
            >
              <p className={`text-sm mb-4 ${
                theme === 'dark' ? 'text-[#aed9e0]' : 'text-[#5e6472]'
              } opacity-75`}>
              </p>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-xl transition-all ${
                    theme === 'dark'
                      ? 'bg-[#b8f2e6]/10 hover:bg-[#b8f2e6]/20 text-[#b8f2e6]'
                      : 'bg-[#aed9e0]/20 hover:bg-[#aed9e0]/40 text-[#5e6472]'
                  }`}
                  aria-label="Social media link"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="space-y-6">
              {[
                { label: 'Name', type: 'text', id: 'name' },
                { label: 'Email', type: 'email', id: 'email' },
                { label: 'Message', type: 'textarea', id: 'message' }
              ].map((field, idx) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}
                  className="relative"
                >
                  <label
                    htmlFor={field.id}
                    className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#5e6472]'
                    }`}
                  >
                    {field.label}
                  </label>
                  {field.type !== 'textarea' ? (
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      value={formData[field.id]}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 ${
                        theme === 'dark'
                          ? errors[field.id]
                            ? 'border-red-500 bg-[#5e6472]/50 text-[#b8f2e6] focus:ring-red-500/50'
                            : 'border-[#b8f2e6]/30 bg-[#5e6472]/50 text-[#b8f2e6] focus:border-[#b8f2e6] focus:ring-[#b8f2e6]/30'
                          : errors[field.id]
                          ? 'border-red-500 bg-white text-[#5e6472] focus:ring-red-500/50'
                          : 'border-[#aed9e0]/50 bg-white text-[#5e6472] focus:border-[#aed9e0] focus:ring-[#aed9e0]/30'
                      }`}
                      placeholder={`Enter your ${field.label.toLowerCase()}`}
                      aria-invalid={!!errors[field.id]}
                      aria-describedby={`${field.id}-error`}
                    />
                  ) : (
                    <motion.textarea
                      whileFocus={{ scale: 1.01 }}
                      id={field.id}
                      name={field.id}
                      value={formData[field.id]}
                      onChange={handleChange}
                      rows="5"
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 resize-none ${
                        theme === 'dark'
                          ? errors[field.id]
                            ? 'border-red-500 bg-[#5e6472]/50 text-[#b8f2e6] focus:ring-red-500/50'
                            : 'border-[#b8f2e6]/30 bg-[#5e6472]/50 text-[#b8f2e6] focus:border-[#b8f2e6] focus:ring-[#b8f2e6]/30'
                          : errors[field.id]
                          ? 'border-red-500 bg-white text-[#5e6472] focus:ring-red-500/50'
                          : 'border-[#aed9e0]/50 bg-white text-[#5e6472] focus:border-[#aed9e0] focus:ring-[#aed9e0]/30'
                      }`}
                      placeholder={`Enter your ${field.label.toLowerCase()}`}
                      aria-invalid={!!errors[field.id]}
                      aria-describedby={`${field.id}-error`}
                    />
                  )}
                  
                  <AnimatePresence>
                    {errors[field.id] && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        id={`${field.id}-error`}
                        className="text-red-500 text-sm mt-2 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors[field.id]}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              <motion.button
                type="button"
                onClick={handleSubmit}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                className={`w-full px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 relative overflow-hidden ${
                  theme === 'dark'
                    ? 'bg-[#b8f2e6] text-[#5e6472] hover:shadow-lg hover:shadow-[#b8f2e6]/30'
                    : 'bg-[#aed9e0] text-[#5e6472] hover:shadow-lg hover:shadow-[#aed9e0]/30'
                } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                aria-label="Send message"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <motion.svg
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </motion.svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            className={`fixed bottom-8 right-8 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-sm z-50 flex items-center space-x-3 ${
              toast.type === 'success'
                ? theme === 'dark'
                  ? 'bg-[#b8f2e6] text-[#5e6472]'
                  : 'bg-[#aed9e0] text-[#5e6472]'
                : 'bg-red-500 text-white'
            }`}
            role="alert"
          >
            {toast.type === 'success' ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span className="font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Contact;