'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { portfolioData } from '@/data/portfolio';
import { useToast } from '@/hooks/use-toast';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageError, setMessageError] = useState('');
  const sectionRef = useScrollReveal();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });

    // Validate message length
    if (id === 'message') {
      if (value.length > 0 && value.length < 10) {
        setMessageError('Message must be at least 10 characters long');
      } else {
        setMessageError('');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate message length before submission
    if (formData.message.length < 10) {
      setMessageError('Message must be at least 10 characters long');
      toast({
        title: "Validation Error",
        description: "Please ensure your message is at least 10 characters long.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: result.message,
        });

        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          message: ''
        });
        setMessageError(''); // Clear any validation errors
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-space font-bold mb-6 bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Ready to bring your project to life? Let's discuss how we can create something amazing together.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="scroll-reveal"
            >
              <div className="glass-card rounded-3xl p-8">
                <h3 className="text-2xl font-space font-bold mb-8 text-white">Get in Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Email</h4>
                      <p className="text-slate-400">{portfolioData.personalInfo.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Location</h4>
                      <p className="text-slate-400">{portfolioData.personalInfo.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">GitHub</h4>
                      <p className="text-slate-400">@Viveklokadiya</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="scroll-reveal"
            >
              <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="floating-label-group">
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="floating-input bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 w-full text-white placeholder-transparent focus:border-blue-400 focus:outline-none transition-colors duration-300"
                      placeholder="First Name"
                      required
                    />
                    <label htmlFor="firstName" className="floating-label">First Name</label>
                  </div>
                  <div className="floating-label-group">
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="floating-input bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 w-full text-white placeholder-transparent focus:border-blue-400 focus:outline-none transition-colors duration-300"
                      placeholder="Last Name"
                      required
                    />
                    <label htmlFor="lastName" className="floating-label">Last Name</label>
                  </div>
                </div>
                
                <div className="floating-label-group">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="floating-input bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 w-full text-white placeholder-transparent focus:border-blue-400 focus:outline-none transition-colors duration-300"
                    placeholder="Email Address"
                    required
                  />
                  <label htmlFor="email" className="floating-label">Email Address</label>
                </div>
                
                <div className="floating-label-group">
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="floating-input bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 w-full text-white placeholder-transparent focus:border-blue-400 focus:outline-none transition-colors duration-300"
                    placeholder="Project Subject"
                    required
                  />
                  <label htmlFor="subject" className="floating-label">Project Subject</label>
                </div>
                
                <div className="floating-label-group">
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`floating-input bg-slate-800/50 border rounded-xl px-4 py-3 w-full text-white placeholder-transparent focus:outline-none transition-colors duration-300 ${
                      messageError 
                        ? 'border-red-500 focus:border-red-400' 
                        : 'border-slate-600 focus:border-blue-400'
                    }`}
                    placeholder="Your Message"
                    required
                  />
                  <label htmlFor="message" className="floating-label">Your Message</label>
                  {messageError && (
                    <p className="text-red-400 text-sm mt-2 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      {messageError}
                    </p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting || messageError !== ''}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-semibold hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <svg className="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
