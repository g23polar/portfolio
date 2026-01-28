import { motion } from 'motion/react';
import { useContext } from 'react';
import { ThemeContext } from '../App';
import ProfileDark from "./../assets/profileDark.jpg"
import ProfileLight from "./../assets/profileLight.jpeg"

function AboutMe() {
    const {theme} = useContext(ThemeContext);

    return (
        <section
            id="about"
            className={`py-24 px-6 relative overflow-hidden bg-transparent`}
        >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className={`absolute top-20 right-10 w-72 h-72 rounded-full blur-3xl opacity-10 ${
                        theme === "dark" ? "bg-[#b8f2e6]" : "bg-[#aed9e0]"
                    }`}
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -90, 0],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className={`absolute bottom-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-10 ${
                        theme === "dark" ? "bg-[#b8f2e6]" : "bg-[#aed9e0]"
                    }`}
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
                        className="w-full lg:w-5/12 flex justify-center"
                    >
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="relative group"
                        >
                            {/* Decorative border effect */}
                            <motion.div
                                className={`absolute -inset-4 rounded-3xl opacity-50 blur-xl ${
                                    theme === "dark" ? "bg-[#b8f2e6]" : "bg-[#aed9e0]"
                                }`}
                                animate={{
                                    opacity: [0.3, 0.6, 0.3],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            
                            {/* Image container */}
                            <div className={`relative w-80 h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden border-2 ${
                                theme === "dark"
                                    ? "border-[#b8f2e6]/30 bg-[#1c1c1c]"
                                    : "border-[#aed9e0]/50 bg-white"
                            }`}>
                                <motion.img
                                    src={theme === "dark" ? ProfileDark : ProfileLight}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                    initial={{ scale: 1.1 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                />
                                
                                {/* Overlay gradient on hover */}
                                <motion.div
                                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                                        theme === "dark"
                                            ? "bg-gradient-to-t from-[#b8f2e6]/20 to-transparent"
                                            : "bg-gradient-to-t from-[#aed9e0]/30 to-transparent"
                                    }`}
                                />
                            </div>

                            {/* Floating decorative elements */}
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className={`absolute -top-4 -right-4 w-24 h-24 rounded-full border-4 opacity-40 ${
                                    theme === "dark" ? "border-[#b8f2e6]" : "border-[#aed9e0]"
                                }`}
                            />
                            <motion.div
                                animate={{
                                    y: [0, 10, 0],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.5
                                }}
                                className={`absolute -bottom-6 -left-6 w-32 h-32 rounded-full border-4 opacity-30 ${
                                    theme === "dark" ? "border-[#b8f2e6]" : "border-[#aed9e0]"
                                }`}
                            />
                        </motion.div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, type: "spring", stiffness: 50, delay: 0.2 }}
                        className="w-full lg:w-7/12"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-center mb-16"
                        >
                            <motion.h2
                                className={`text-5xl md:text-6xl font-bold mb-6 ${
                                    theme === "dark" ? "text-[#b8f2e6]" : "text-[#5e6472]"
                                }`}
                            >
                                About Me
                            </motion.h2>
                            
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "6rem" }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className={`h-1.5 rounded-full mx-auto mb-8 ${
                                    theme === "dark" ? "bg-[#b8f2e6]" : "bg-[#aed9e0]"
                                }`}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className={`space-y-6 text-lg leading-relaxed ${
                                theme === "dark" ? "text-[#aed9e0]" : "text-[#5e6472]"
                            }`}
                        >
                            <p className="text-xl md:text-2xl font-light">
                                I'm a passionate developer with a knack for building clean, efficient, and user-friendly applications.
                            </p>
                            
                            <p className="text-base md:text-lg opacity-90">
                                I love exploring new technologies and solving complex problems with creative solutions.
                            </p>

                            
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default AboutMe;