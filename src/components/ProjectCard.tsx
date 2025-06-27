'use client'

import { motion } from 'framer-motion';

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

interface ProjectCardProps {
  project: Project;
  index: number;
  onProjectClick: (project: Project) => void;
}

export default function ProjectCard({ project, index, onProjectClick }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass-card rounded-2xl p-6 relative overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 group"
      onClick={() => onProjectClick(project)}
    >
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"
      />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
            {project.category}
          </span>
          <span className="text-slate-400 text-sm">{project.date}</span>
        </div>
        <h3 className="text-xl font-space font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-slate-300 text-sm mb-4 line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span key={tech} className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-blue-400 text-sm font-medium">Click to view details</span>
          <svg 
            className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
