'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useScrollReveal();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % portfolioData.testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = portfolioData.testimonials[currentIndex];

  return (
    <section className="py-20 relative" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-space font-bold mb-6 bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
            What Clients Say
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Testimonials from satisfied clients and collaborators
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-3xl p-8 md:p-12 text-center scroll-reveal">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="testimonial-content"
              >
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-20 h-20 rounded-full mx-auto mb-6 object-cover ring-4 ring-blue-400/30"
                />
                
                <blockquote className="text-xl md:text-2xl text-slate-300 mb-6 leading-relaxed italic">
                  "{currentTestimonial.quote}"
                </blockquote>
                
                <div className="text-center">
                  <div className="text-lg font-semibold text-white">{currentTestimonial.name}</div>
                  <div className="text-blue-400">{currentTestimonial.role}</div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Testimonial Indicators */}
            <div className="flex justify-center space-x-2 mt-8">
              {portfolioData.testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentIndex ? 'bg-blue-400' : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
