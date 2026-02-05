import { motion } from 'motion/react';
import { useContext } from 'react';
import { ThemeContext } from '../App';
import { ExternalLink } from 'lucide-react';

function Library() {
    const { theme } = useContext(ThemeContext);

    // Things I've written
    const writings = [
        { title: "Counter-argument to Hume’s skepticism of necessitarian views of causality", url: "https://medium.com/@gautamnair023/counter-argument-to-humes-skepticism-of-necessitarian-views-of-causality-af652a5defd6" }
        , {title:"Thinking transhumanist", url:"https://medium.com/@gautamnair023/thinking-transhumanist-e13dc68fafbf"}

    ];

    // Things I've read
    const readings = [
        { title: "Deep Dive: Memory + AI", url: "https://www.betaworks.com/writing/deep-dive-memory-ai" },
        { title: "My Claude Code Workflow for Building Features", url: "https://willness.dev/blog/claude-code-workflow" },
        // { title: "", url: "" }
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

                {/* Writings Section */}
                <div className="mb-12">
                    <motion.h3
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className={`text-2xl font-semibold mb-6 ${
                            theme === "dark" ? "text-[#b8f2e6]" : "text-[#5e6472]"
                        }`}
                    >
                        My Writings
                    </motion.h3>
                    {writings.length === 0 ? (
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className={`text-lg ${
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
                            {writings.map((item, i) => (
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
                                        <span className={`text-lg font-medium ${
                                            theme === "dark" ? "text-[#b8f2e6]" : "text-[#5e6472]"
                                        }`}>
                                            {item.title}
                                        </span>
                                        <ExternalLink className={`w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity ${
                                            theme === "dark" ? "text-[#b8f2e6]" : "text-[#5e6472]"
                                        }`} />
                                    </div>
                                </motion.a>
                            ))}
                        </motion.div>
                    )}
                </div>

                {/* Reading List Section */}
                <div>
                    <motion.h3
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className={`text-2xl font-semibold mb-6 ${
                            theme === "dark" ? "text-[#b8f2e6]" : "text-[#5e6472]"
                        }`}
                    >
                        Reading List
                    </motion.h3>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex flex-col gap-4"
                    >
                        {readings.map((item, i) => (
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
                                    <span className={`text-lg font-medium ${
                                        theme === "dark" ? "text-[#b8f2e6]" : "text-[#5e6472]"
                                    }`}>
                                        {item.title}
                                    </span>
                                    <ExternalLink className={`w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity ${
                                        theme === "dark" ? "text-[#b8f2e6]" : "text-[#5e6472]"
                                    }`} />
                                </div>
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Library;
