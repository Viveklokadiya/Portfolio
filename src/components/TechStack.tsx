'use client'

import { motion } from 'framer-motion';
import { 
  SiReact, 
  SiNodedotjs, 
  SiJavascript, 
  SiMongodb, 
  SiGit, 
  SiDocker,
  SiAmazonwebservices,
  SiTailwindcss,
  SiExpress,
  SiCplusplus,
  SiC,
  SiHtml5,
  SiCss3,
  SiMysql,
  SiOracle,
  SiBootstrap,
  SiExpo,
  SiGithub,
  SiFirebase,
  SiIntellijidea
} from 'react-icons/si';
import { FaJava, FaCode } from 'react-icons/fa';
import { VscCode } from 'react-icons/vsc';

const skillCategories = [
  {
    title: "Languages",
    skills: [
      { icon: SiCplusplus, name: 'C++', color: '#00599C' },
      { icon: SiC, name: 'C', color: '#A8B9CC' },
      { icon: FaJava, name: 'Java', color: '#ED8B00' },
      { icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E' },
    ]
  },
  {
    title: "Web Development & Database",
    skills: [
      { icon: SiHtml5, name: 'HTML5', color: '#E34F26' },
      { icon: SiCss3, name: 'CSS3', color: '#1572B6' },
      { icon: SiMysql, name: 'MySQL', color: '#4479A1' },
      { icon: SiOracle, name: 'Oracle SQL', color: '#F80000' },
      { icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
    ]
  },
  {
    title: "Frameworks",
    skills: [
      { icon: SiReact, name: 'React.js', color: '#61DAFB' },
      { icon: SiReact, name: 'React Native', color: '#61DAFB' },
      { icon: SiExpo, name: 'Expo', color: '#000020' },
      { icon: SiBootstrap, name: 'Bootstrap', color: '#7952B3' },
      { icon: SiTailwindcss, name: 'Tailwind CSS', color: '#06B6D4' },
      { icon: SiNodedotjs, name: 'Node.js', color: '#339933' },
      { icon: SiExpress, name: 'Express.js', color: '#000000' },
    ]
  },
  {
    title: "Tools & Technologies",
    skills: [
      { icon: VscCode, name: 'VS Code', color: '#007ACC' },
      { icon: SiGit, name: 'Git', color: '#F05032' },
      { icon: SiGithub, name: 'GitHub', color: '#181717' },
      { icon: SiDocker, name: 'Docker', color: '#2496ED' },
      { icon: SiFirebase, name: 'Firebase', color: '#FFCA28' },
      { icon: SiIntellijidea, name: 'IntelliJ', color: '#000000' },
      { icon: SiAmazonwebservices, name: 'AWS', color: '#FF9900' },
    ]
  }
];

export default function TechStack() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-space font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          {/* <p className="text-slate-300 text-lg max-w-3xl mx-auto">
            {/* A comprehensive toolkit of modern technologies and frameworks for building scalable solutions */}
          {/* </p> */}
        </motion.div>

        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className="glass-card rounded-3xl p-8"
            >
              <h3 className="text-2xl font-space font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {category.title}
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: categoryIndex * 0.2 + skillIndex * 0.05,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 text-center hover:border-blue-500/50 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="w-12 h-12 mx-auto mb-3 relative">
                      <skill.icon 
                        className="w-full h-full transition-all duration-300 group-hover:scale-110" 
                        style={{ color: skill.color }}
                      />
                      <div 
                        className="absolute inset-0 rounded-full opacity-0 blur-xl transition-all duration-300 group-hover:opacity-30"
                        style={{ backgroundColor: skill.color }}
                      />
                    </div>
                    <h4 className="text-white font-medium text-sm group-hover:text-blue-400 transition-colors duration-300">
                      {skill.name}
                    </h4>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="glass-card rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-space font-bold mb-4 text-white">
              Technical Expertise
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Proficient in modern web development with expertise in React ecosystem, Node.js backend development, 
              and database management. Strong foundation in programming languages including C++, Java, and JavaScript. 
              Experienced with cloud platforms, containerization, and modern development workflows using Git and professional IDEs.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
