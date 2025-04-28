import React from 'react';
import { workExperiences } from '../constants';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const WorkExperience = () => {
    const { isDarkMode } = useTheme();

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

    return (
        <motion.div 
            className="work-container"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            {workExperiences.map((experience) => (
                <motion.div 
                    key={experience.id} 
                    className="work-content_container"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="work-content_logo">
                        <img 
                            src={experience.icon} 
                            alt={experience.name} 
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h4 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {experience.name}
                        </h4>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {experience.duration}
                        </p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {experience.title}
                        </p>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default WorkExperience; 