import { motion } from 'motion/react';
import { FaGithub } from 'react-icons/fa'; 
import { useContext } from 'react';
import { ThemeContext } from '../App';

function ProjectCard({ title, description, tags, link, github }) {
    const { theme } = useContext(ThemeContext);
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -8 }}
            className="group relative h-full"
        >
            {/* Card container */}
            <div className={`h-full p-8 rounded-3xl backdrop-blur-sm border-2 transition-all duration-500 relative overflow-hidden ${
                theme === "dark" 
                    ? "bg-[#5e6472]/30 border-[#b8f2e6]/20 hover:border-[#b8f2e6]/50 hover:bg-[#5e6472]/50" 
                    : "bg-white/80 border-[#aed9e0]/30 hover:border-[#aed9e0]/60 hover:bg-white"
            }`}>
                {/* Animated gradient overlay */}
                <motion.div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                        theme === "dark"
                            ? "bg-gradient-to-br from-[#b8f2e6]/10 via-transparent to-[#aed9e0]/10"
                            : "bg-gradient-to-br from-[#aed9e0]/20 via-transparent to-[#b8f2e6]/20"
                    }`}
                />

                {/* Decorative corner accent */}
                <motion.div
                    className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-20 ${
                        theme === "dark" ? "bg-[#b8f2e6]" : "bg-[#aed9e0]"
                    }`}
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                <div className="relative z-10 flex flex-col h-full">
                    {/* Title */}
                    <motion.h3
                        className={`text-2xl md:text-3xl font-bold mb-4 ${
                            theme === "dark" ? "text-[#b8f2e6]" : "text-[#5e6472]"
                        }`}
                        whileHover={{ scale: 1.02 }}
                    >
                        {title}
                    </motion.h3>

                    {/* Description */}
                    <p className={`mb-6 leading-relaxed flex-grow ${
                        theme === "dark" ? "text-[#aed9e0]" : "text-[#5e6472]"
                    } opacity-90`}>
                        {description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {tags.map((tag, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ scale: 1.1 }}
                                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
                                    theme === "dark"
                                        ? "bg-[#b8f2e6]/20 text-[#b8f2e6] hover:bg-[#b8f2e6]/30"
                                        : "bg-[#aed9e0]/40 text-[#5e6472] hover:bg-[#aed9e0]/60"
                                }`}
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4 items-center pt-4 border-t-2 border-opacity-20 border-current">
                        {link && (
                            <motion.a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05, x: 5 }}
                                whileTap={{ scale: 0.95 }}
                                className={`flex items-center gap-2 font-semibold transition-colors group/link ${
                                    theme === "dark" 
                                        ? "text-[#b8f2e6] hover:text-[#aed9e0]" 
                                        : "text-[#5e6472] hover:text-[#aed9e0]"
                                }`}
                            >
                                <span>View Live</span>
                                <svg 
                                    className="w-4 h-4 transition-transform group-hover/link:translate-x-1" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </motion.a>
                        )}
                        {github && (
                            <motion.a
                                href={github}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.15, rotate: 360 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className={`p-2 rounded-lg transition-all ${
                                    theme === "dark" 
                                        ? "text-[#b8f2e6] hover:bg-[#b8f2e6]/20" 
                                        : "text-[#5e6472] hover:bg-[#aed9e0]/30"
                                }`}
                                aria-label="View GitHub repository"
                            >
                                <FaGithub size={24} />
                            </motion.a>
                        )}
                    </div>
                </div>

                {/* Hover shine effect */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                        background: theme === "dark"
                            ? "linear-gradient(135deg, transparent 0%, rgba(184, 242, 230, 0.1) 50%, transparent 100%)"
                            : "linear-gradient(135deg, transparent 0%, rgba(174, 217, 224, 0.15) 50%, transparent 100%)"
                    }}
                    animate={{
                        x: ['-100%', '100%'],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                        ease: "easeInOut"
                    }}
                />
            </div>
        </motion.div>
    );
}

export default ProjectCard;