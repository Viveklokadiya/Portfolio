'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import ParticleSystem from '@/components/ParticleSystem';
import TypewriterEffect from '@/components/TypewriterEffect';
import TechStack from '@/components/TechStack';
import ProjectCard from '@/components/ProjectCard';
import ProjectModal from '@/components/ProjectModal';
import Testimonials from '@/components/Testimonials';
import ContactForm from '@/components/ContactForm';
import { portfolioData } from '@/data/portfolio';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const heroRef = useScrollReveal();
  const aboutRef = useScrollReveal();
  const projectsRef = useScrollReveal();

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') return;
      
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 200) {
          current = section.getAttribute('id') || '';
        }
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="bg-slate-900 text-white font-inter overflow-x-hidden">
      <ParticleSystem />
      <Navigation activeSection={activeSection} onNavigate={setActiveSection} />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative overflow-hidden" ref={heroRef}>
        <div className="absolute inset-0 gradient-bg opacity-20"></div>
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Character Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center md:justify-end"
            >
              <div className="relative">
                <Image
                  src="/character-removebg-preview.png"
                  alt="Vivek Lokadiya - Character Avatar"
                  width={384}
                  height={384}
                  className="w-96 h-96 object-contain animate-float filter drop-shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/10 to-pink-400/10 rounded-full blur-3xl animate-glow"></div>
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse"></div>
              </div>
            </motion.div>
            
            {/* Typewriter Headline */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center md:text-left scroll-reveal"
            >
              <h1 className="text-5xl md:text-7xl font-space font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
                  {portfolioData.personalInfo.name}
                </span>
              </h1>
              
              <TypewriterEffect 
                texts={[portfolioData.personalInfo.title, portfolioData.personalInfo.alternateTitle]} 
              />
              
              <p className="text-lg text-slate-400 mb-8 max-w-lg">
                {portfolioData.personalInfo.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#projects"
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold hover:scale-105 transition-transform duration-300 text-center"
                >
                  View My Work
                </a>
                <a
                  href="#contact"
                  className="px-8 py-4 glass-card rounded-full text-white font-semibold hover:bg-white/20 transition-all duration-300 text-center"
                >
                  Get In Touch
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <TechStack />

      {/* About Section */}
      <section id="about" className="py-20 relative" ref={aboutRef}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16 scroll-reveal"
            >
              <h2 className="text-4xl md:text-5xl font-space font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                About Me
              </h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card rounded-3xl p-8 md:p-12 scroll-reveal"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-space font-bold mb-6 text-blue-400">Full Stack Developer & ML Engineer</h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    Passionate full stack developer with expertise in modern web technologies, machine learning, and desktop application development. I specialize in building scalable applications using JavaScript, Python, and Java.
                  </p>
                  <p className="text-slate-300 mb-8 leading-relaxed">
                    My journey spans from desktop applications to cloud-based solutions, with a strong focus on clean code architecture and innovative problem-solving approaches.
                  </p>
                  
                  {/* <div className="grid grid-cols-2 gap-6">
                    {portfolioData.stats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="text-center"
                      >
                        <div className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</div>
                        <div className="text-slate-400">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div> */}
                </div>
                
                <div className="space-y-6">
                  {[
                    {
                      icon: "💡",
                      title: "Innovation Focus",
                      desc: "AI-powered solutions and modern practices",
                      gradient: "from-blue-500 to-purple-500"
                    },
                    {
                      icon: "⚡",
                      title: "Performance Driven", 
                      desc: "Scalable architecture and optimization",
                      gradient: "from-purple-500 to-pink-500"
                    },
                    {
                      icon: "📚",
                      title: "Continuous Learning",
                      desc: "Always exploring new technologies",
                      gradient: "from-pink-500 to-orange-500"
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center space-x-4"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${item.gradient} rounded-full flex items-center justify-center text-xl`}>
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                        <p className="text-slate-400">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section id="projects" className="py-20 relative" ref={projectsRef}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 scroll-reveal"
          >
            <h2 className="text-4xl md:text-5xl font-space font-bold mb-6 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              A showcase of my recent work in web development, machine learning, and desktop applications
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
                onProjectClick={handleProjectClick}
              />
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12 scroll-reveal"
          >
            <a
              href={portfolioData.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold hover:scale-105 transition-transform duration-300"
            >
              View All Projects on GitHub
              <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* <Testimonials /> */}
      <ContactForm />

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-space font-bold bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent mb-4 md:mb-0">
              {portfolioData.personalInfo.name}
            </div>
            <div className="flex space-x-6">
              <a
                href={portfolioData.personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href={`mailto:${portfolioData.personalInfo.email}`}
                className="text-slate-400 hover:text-purple-400 transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="text-center text-slate-400 mt-8">
            <p>&copy; 2025 {portfolioData.personalInfo.name}. All rights reserved. Built with passion and precision.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
