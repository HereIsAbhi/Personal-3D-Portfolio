import { useState } from "react";
import Globe from "react-globe.gl";
import Button from "../components/Button";
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const About = () => {
    const [hasCopied, setHasCopied] = useState(false);
    const { isDarkMode } = useTheme();

    const handleCopy = () => {
        navigator.clipboard.writeText("abhi.ak3002@gmail.com");
        // alert("Email copied to clipboard");
        setHasCopied(true);
        setTimeout(() => {
            setHasCopied(false);
        }, 2000);
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const flipVariants = {
        initial: { rotateY: 0 },
        hover: { rotateY: 180 },
        transition: { duration: 0.6 }
    };

    return (
        <section className="c-space my-20" id="about">
            <motion.div 
                className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <motion.div className="col-span-1 xl:row-span-3" variants={itemVariants}>
                    <div className="grid-container">
                        <motion.img 
                            src="assets/grid1.png" 
                            alt="grid-1" 
                            className="w-full sm:h-[276px] h-fit object-contain"
                            variants={flipVariants}
                            initial="initial"
                            whileHover="hover"
                            transition={flipVariants.transition}
                        />

                        <div>
                            <p className="grid-headtext">Hi, I'm Abhinav </p>
                            <p className="grid-subtext">
                                Currently prefinal year student at Lovely Professional University. I am a full-stack developer with a passion for building user-friendly websites and web applications.
                            </p>
                        </div>
                    </div>
                </motion.div>

                <motion.div className="col-span-1 xl:row-span-3" variants={itemVariants}>
                    <div className="grid-container">
                        <motion.img 
                            src="assets/grid2.jpg" 
                            alt="grid-2" 
                            className="w-full sm:h-[276px] h-fit object-contain"
                            variants={flipVariants}
                            initial="initial"
                            whileHover="hover"
                            transition={flipVariants.transition}
                        />

                        <div>
                            <p className="grid-headtext">Tech Stack</p>
                            <p className="grid-subtext">
                                I specialize in a variety of languages, frameworks, and tools that allow me to build robust and scalable
                                applications
                            </p>
                        </div>
                    </div>
                </motion.div>

                <motion.div className="col-span-1 xl:row-span-4" variants={itemVariants}>
                    <div className="grid-container">
                        <motion.div 
                            className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Globe
                                height={326}
                                width={326}
                                backgroundColor={isDarkMode ? "black" : "white"}
                                backgroundImageOpacity={0.5}
                                showAtmosphere
                                showGraticules
                                globeImageUrl={isDarkMode ? "//unpkg.com/three-globe/example/img/earth-night.jpg" : "//unpkg.com/three-globe/example/img/earth-day.jpg"}
                                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                                labelsData={[{
                                    lat: 25,
                                    lng: 84,
                                    text: "I'm here",
                                    color: isDarkMode ? "white" : "black",
                                    size: 20,
                                }]}
                            />
                        </motion.div>
                        <div>
                            <p className="grid-headtext">
                                I work remotely
                            </p>
                            <p className="grid-subtext">
                                I am a remote developer based in India. I am open to working with clients from all over the world. I am available for freelance work.
                            </p>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button name="Contact Me" isBeam containerClass="w-full mt-10">
                                    <a href="/contact">Contact Me</a>
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                <motion.div className="xl:col-span-2 xl:row-span-3" variants={itemVariants}>
                    <div className="grid-container">
                        <motion.img 
                            src="assets/grid3.png" 
                            alt="grid-3" 
                            className="w-full sm:h-[266px] h-fit object-contain"
                            variants={flipVariants}
                            initial="initial"
                            whileHover="hover"
                            transition={flipVariants.transition}
                        />
                        <div>
                            <p className="grid-headtext">What I do</p>
                            <p className="grid-subtext">
                                I create websites that are not only visually appealing but also have a great user experience.
                            </p>
                        </div>
                    </div>
                </motion.div>

                <motion.div className="xl:col-span-1 xl:row-span-2" variants={itemVariants}>
                    <div className="grid-container">
                        <motion.img 
                            src="assets/grid4.png" 
                            alt="grid-4" 
                            className="w-full sm:h-[266px] h-fit object-contain"
                            variants={flipVariants}
                            initial="initial"
                            whileHover="hover"
                            transition={flipVariants.transition}
                        />
                        <div className="space-y-2">
                            <p className="grid-subtext text-center">Contact Me</p>
                            <motion.div 
                                className="copy-container" 
                                onClick={handleCopy}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <img src={hasCopied ? "assets/tick.svg" : "assets/copy.svg"} alt="copy" />
                                <p className="lg:text-2xl md:text-xl font-medium">
                                    abhi.ak3002@gmail.com
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default About;