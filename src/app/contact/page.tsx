// Path: .\src\app\contact\page.tsx
'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  Clock,
  MessageSquare,
  Map,
  User,
  FileText,
  ExternalLink,
  HelpCircle,
  CheckCircle,
  AlertCircle,
  PhoneCall
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear status message when user starts typing again
    if (submitStatus) setSubmitStatus(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate API call - Replace with your actual API endpoint logic
    console.log("Submitting contact form:", formData);
    try {
      // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) ... });
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

      setSubmitStatus({
        success: true,
        message: 'Thank you for your message! We will get back to you soon.'
      });
      if (formRef.current) {
        formRef.current.reset();
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      setSubmitStatus({
        success: false,
        message: 'Sorry, there was an error sending your message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section with enhanced styling */}
      <div className="relative bg-blue-900 h-72 md:h-96">
        {/* Enhanced gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/80 z-10"></div>

        {/* Image Container */}
        <div className="absolute inset-0 z-0">
          {/* Desktop Image */}
          <Image
            src="/images/contact-hero.jpg"
            alt="Contact Us - Andaman"
            fill
            className="object-cover hidden md:block"
            priority
          />
          {/* Mobile Image */}
          <Image
            src="/images/contact-hero-mobile.jpg"
            alt="Contact Us - Andaman"
            fill
            className="object-cover block md:hidden"
            priority
          />
        </div>

        {/* Text Content with enhanced styling */}
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-3 md:mb-5 drop-shadow-lg">
            Contact Us
          </h1>
          <p className="text-lg sm:text-xl text-white text-center max-w-2xl opacity-95 drop-shadow-md">
            We're here to help plan your perfect Andaman adventure
          </p>
          {/* Added CTA button */}
          <button className="mt-6 bg-white text-blue-700 hover:bg-blue-50 font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Book a Consultation
          </button>
        </div>

        {/* Added decorative wave element */}
        <div className="absolute bottom-0 left-0 right-0 h-12 md:h-16 overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Contact Content with enhanced styling */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">

            {/* Contact Information with enhanced styling */}
            <div>
              <div className="flex items-center justify-center md:justify-start mb-8">
                <PhoneCall className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Get In Touch</h2>
              </div>

              <p className="text-gray-700 mb-8 md:mb-10 text-base leading-relaxed">
                Have questions about planning your trip? Need help booking a package or activity?
                Our friendly team is ready to assist you with personalized recommendations and expert advice.
              </p>

              <div className="space-y-6 md:space-y-8">
                {/* Phone with enhanced styling */}
                <div className="flex items-start bg-white p-5 rounded-2xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Phone</h3>
                    <a href="tel:+913192123456" className="text-gray-700 hover:text-blue-600 block transition-colors">+91 3192 123456</a>
                    <a href="tel:+919876543210" className="text-gray-700 hover:text-blue-600 block transition-colors">+91 9876 543210</a>
                  </div>
                </div>

                {/* Email with enhanced styling */}
                <div className="flex items-start bg-white p-5 rounded-2xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Email</h3>
                    <a href="mailto:info@reachandaman.com" className="text-gray-700 hover:text-blue-600 block break-all transition-colors">info@reachandaman.com</a>
                    <a href="mailto:support@reachandaman.com" className="text-gray-700 hover:text-blue-600 block break-all transition-colors">support@reachandaman.com</a>
                  </div>
                </div>

                {/* Address with enhanced styling */}
                <div className="flex items-start bg-white p-5 rounded-2xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Office Address</h3>
                    <p className="text-gray-700">
                      45 Marine Drive, Phoenix Bay<br />
                      Port Blair, Andaman & Nicobar Islands<br />
                      India - 744101
                    </p>
                  </div>
                </div>
              </div>

              {/* Office Hours with enhanced styling */}
              <div className="mt-10 md:mt-12">
                <div className="flex items-center mb-5">
                  <Clock className="text-blue-600 mr-3 flex-shrink-0" size={20} />
                  <h3 className="text-xl font-semibold text-gray-800">Office Hours</h3>
                </div>

                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                      <p className="font-medium text-gray-800 mb-1">Monday - Friday</p>
                      <p className="text-blue-600 font-medium">9:00 AM - 6:00 PM IST</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                      <p className="font-medium text-gray-800 mb-1">Saturday</p>
                      <p className="text-blue-600 font-medium">10:00 AM - 4:00 PM IST</p>
                    </div>
                    <div className="sm:col-span-2 bg-white p-4 rounded-xl shadow-sm">
                      <p className="font-medium text-gray-800 mb-1">Sunday</p>
                      <p className="text-blue-600 font-medium">Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form with enhanced styling */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-6">
                <MessageSquare className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Send Us a Message</h2>
              </div>

              {submitStatus && (
                <div className={`p-5 mb-6 rounded-xl text-sm ${submitStatus.success
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                  <div className="flex items-start">
                    {submitStatus.success ? (
                      <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    )}
                    <span>{submitStatus.message}</span>
                  </div>
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                      placeholder="Your Name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                        placeholder="(Optional)"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Subject *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                      placeholder="e.g., Package Inquiry"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Message *
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                      <MessageSquare className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                      placeholder="Your message..."
                    ></textarea>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                  >
                    {isSubmitting ? (
                      <> <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" /> Sending... </>
                    ) : (
                      <> <Send className="h-5 w-5 mr-2" /> Send Message </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Map Section with enhanced styling */}
          <div className="mt-16 md:mt-20">
            <div className="flex items-center justify-center mb-8">
              <Map className="text-blue-600 mr-3 flex-shrink-0" size={24} />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Find Us On Map</h2>
            </div>

            <div className="h-72 md:h-96 bg-gray-200 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <div className="relative w-full h-full">
                <Image
                  src="/images/map.jpg"
                  alt="Office Location Map - Port Blair, Andaman Islands"
                  fill
                  className="object-cover"
                />
                {/* Map pin overlay */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="relative">
                    <div className="absolute -top-12 -left-24 bg-white px-4 py-2 rounded-lg shadow-lg">
                      <p className="font-medium text-sm">Reach Andaman Office</p>
                    </div>
                    <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Added directions link */}
            <div className="text-center mt-4">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                Get Directions
                <ExternalLink size={16} className="ml-1" />
              </a>
            </div>
          </div>

          {/* Added FAQ section */}
          <div className="mt-16 md:mt-20">
            <div className="flex items-center justify-center mb-8">
              <HelpCircle className="text-blue-600 mr-3 flex-shrink-0" size={24} />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* FAQ Item 1 */}
              <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">How quickly can I expect a response?</h3>
                <p className="text-gray-600">We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call our office directly.</p>
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Can I visit your office without an appointment?</h3>
                <p className="text-gray-600">Yes, you're welcome to visit during our office hours. However, we recommend scheduling an appointment to ensure our travel experts are available to assist you.</p>
              </div>

              {/* FAQ Item 3 */}
              <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Do you offer virtual consultations?</h3>
                <p className="text-gray-600">Yes, we offer video consultations via Zoom or Google Meet. Please mention your preference for a virtual meeting when contacting us.</p>
              </div>

              {/* FAQ Item 4 */}
              <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Can you help with last-minute bookings?</h3>
                <p className="text-gray-600">Yes, we specialize in accommodating last-minute travel plans. Contact us immediately, and we'll do our best to arrange your Andaman adventure.</p>
              </div>
            </div>
          </div>

          {/* Added Call to Action section */}
          <div className="mt-16 md:mt-20 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-10 text-center relative overflow-hidden shadow-lg">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white"></div>
              <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-white"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Start Planning?</h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Contact our team today to begin planning your dream vacation to the Andaman Islands.
                We're here to make your island getaway unforgettable!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-700 hover:bg-blue-50 font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Contact Us Now
                </button>
                <button className="bg-transparent text-white border-2 border-white hover:bg-white/10 font-semibold py-3 px-8 rounded-full transition-all duration-300">
                  View Packages
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
