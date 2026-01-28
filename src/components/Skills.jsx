import { motion } from 'motion/react';
import { useContext } from 'react';
import { ThemeContext } from '../App';

function Skills() {
    const {theme} = useContext(ThemeContext);
    const skills = [
        'HTML5',
        'CSS3',
        'JavaScript',
        'React',
        'Python',
        'Tailwind CSS',
        'Java',
        'C++',
        'C',
        'Astro', 
        'Vite',
        'CLI Development',
        'Git',
        'GitHub',
        'UI/UX',
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { 
            opacity: 0, 
            y: 20,
            scale: 0.9
        },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    return (
        <section
            id="skills"
            className={`py-24 px-6 relative overflow-hidden bg-transparent`}
        >
            {/* Animated background gradient orbs */}
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
                    className={`absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20 ${
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
                    className={`absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20 ${
                        theme === "dark" ? "bg-[#b8f2e6]" : "bg-[#aed9e0]"
                    }`}
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.h2
                        className={`text-5xl md:text-6xl font-bold mb-4 ${
                            theme === "dark" ? "text-[#b8f2e6]" : "text-[#5e6472]"
                        }`}
                    >
                        Skills
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "6rem" }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className={`h-1 mx-auto rounded-full ${
                            theme === "dark" ? "bg-[#b8f2e6]" : "bg-[#aed9e0]"
                        }`}
                    />
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
                >
                    {skills.map((skill, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            whileHover={{ 
                                scale: 1.05,
                                y: -8,
                                transition: { 
                                    type: "spring", 
                                    stiffness: 400, 
                                    damping: 10 
                                }
                            }}
                            className="group relative"
                        >
                            <motion.div
                                className={`relative p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
                                    theme === "dark" 
                                        ? "bg-[#b8f2e6]/10 border-[#b8f2e6]/20 hover:bg-[#b8f2e6]/20 hover:border-[#b8f2e6]/40" 
                                        : "bg-[#aed9e0]/30 border-[#aed9e0]/40 hover:bg-[#aed9e0]/50 hover:border-[#aed9e0]/60"
                                }`}
                            >
                                {/* Shine effect on hover */}
                                <motion.div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        background: theme === "dark"
                                            ? "linear-gradient(135deg, transparent 0%, rgba(184, 242, 230, 0.1) 50%, transparent 100%)"
                                            : "linear-gradient(135deg, transparent 0%, rgba(174, 217, 224, 0.2) 50%, transparent 100%)"
                                    }}
                                />
                                
                                <span className={`relative text-base md:text-lg font-semibold text-center block ${
                                    theme === "dark" ? "text-[#b8f2e6]" : "text-[#5e6472]"
                                }`}>
                                    {skill}
                                </span>

                                {/* Floating dots decoration */}
                                <motion.div
                                    className={`absolute -top-1 -right-1 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 ${
                                        theme === "dark" ? "bg-[#b8f2e6]" : "bg-[#5e6472]"
                                    }`}
                                    animate={{
                                        scale: [1, 1.5, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default Skills;