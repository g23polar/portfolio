import { motion } from 'motion/react';
import { useContext } from 'react';
import { ThemeContext } from '../App';
import { ExternalLink } from 'lucide-react';

function Library() {
    const { theme } = useContext(ThemeContext);

    // Add your items here
    const items = [
        { title: "Deep Dive: Memory + AI", url: "https://www.betaworks.com/writing/deep-dive-memory-ai", type: "article" },
        // { title: "Example PDF", url: "https://drive.google.com/...", type: "pdf" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.95
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
            id="library"
            className="py-24 px-6 relative overflow-hidden bg-transparent"
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

            <div className="max-w-4xl mx-auto relative z-10">
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
                        Library
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

                {items.length === 0 ? (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`text-center text-lg ${
                            theme === "dark" ? "text-[#b8f2e6]/60" : "text-[#5e6472]/60"
                        }`}
                    >
                        Coming soon...
                    </motion.p>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex flex-col gap-4"
                    >
                        {items.map((item, i) => (
                            <motion.a
                                key={i}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                variants={itemVariants}
                                whileHover={{
                                    scale: 1.02,
                                    x: 8,
                                    transition: {
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 15
                                    }
                                }}
                                className="group relative"
                            >
                                <div
                                    className={`relative p-5 rounded-2xl backdrop-blur-sm border transition-all duration-300 flex items-center justify-between ${
                                        theme === "dark"
                                            ? "bg-[#b8f2e6]/10 border-[#b8f2e6]/20 hover:bg-[#b8f2e6]/20 hover:border-[#b8f2e6]/40"
                                            : "bg-[#aed9e0]/30 border-[#aed9e0]/40 hover:bg-[#aed9e0]/50 hover:border-[#aed9e0]/60"
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        {item.type && (
                                            <span className={`text-xs font-medium px-2 py-1 rounded-lg uppercase tracking-wider ${
                                                theme === "dark"
                                                    ? "bg-[#b8f2e6]/20 text-[#b8f2e6]"
                                                    : "bg-[#aed9e0]/50 text-[#5e6472]"
                                            }`}>
                                                {item.type}
                                            </span>
                                        )}
                                        <span className={`text-lg font-medium ${
                                            theme === "dark" ? "text-[#b8f2e6]" : "text-[#5e6472]"
                                        }`}>
                                            {item.title}
                                        </span>
                                    </div>
                                    <ExternalLink className={`w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity ${
                                        theme === "dark" ? "text-[#b8f2e6]" : "text-[#5e6472]"
                                    }`} />
                                </div>
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
}

export default Library;
