'use client'

import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  date: string;
  description: string;
  detailedDescription: string;
  image: string;
  technologies: string[];
  techStack: string[];
  features: string[];
  github: string;
  preview: string;
  gradient: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative glass-card rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 bg-slate-800/50 hover:bg-slate-700/50 rounded-full flex items-center justify-center transition-colors duration-300 group"
            >
              <X className="w-5 h-5 text-slate-400 group-hover:text-white" />
            </button>

            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                  {project.category}
                </span>
                <span className="text-slate-400 text-sm">{project.date}</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-space font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {project.title}
              </h2>
              
              <p className="text-slate-300 text-lg leading-relaxed">
                {project.detailedDescription}
              </p>
            </div>

            {/* Project Image */}
            <div className="mb-8">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 md:h-80 object-cover rounded-2xl"
              />
            </div>

            {/* Tech Stack */}
            <div className="mb-8">
              <h3 className="text-xl font-space font-bold mb-4 text-white">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-sm text-purple-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="mb-8">
              <h3 className="text-xl font-space font-bold mb-4 text-white">
                Key Features
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {project.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                    <span className="text-slate-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-semibold hover:scale-105 transition-transform duration-300"
              >
                <Github className="w-5 h-5" />
                View Source Code
              </a>
              
              <a
                href={project.preview}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 glass-card rounded-xl text-white font-semibold hover:bg-white/10 transition-all duration-300 border border-slate-600"
              >
                <ExternalLink className="w-5 h-5" />
                Live Preview
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}