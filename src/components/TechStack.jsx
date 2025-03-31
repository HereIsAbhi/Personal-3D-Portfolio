import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const techStack = [
  {
    name: 'React',
    icon: '/assets/react.svg',
    level: 90,
  },
  {
    name: 'Three.js',
    icon: '/assets/threejs.svg',
    level: 85,
  },
  {
    name: 'Node.js',
    icon: '/assets/nodejs.svg',
    level: 80,
  },
  {
    name: 'TypeScript',
    icon: '/assets/typescript.svg',
    level: 75,
  },
  {
    name: 'TailwindCSS',
    icon: '/assets/tailwindcss.svg',
    level: 95,
  },
  {
    name: 'Next.js',
    icon: '/assets/nextjs.svg',
    level: 85,
  },
];

const TechStack = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {techStack.map((tech, index) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`relative group ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300`}
        >
          <div className="flex items-center space-x-4">
            <img
              src={tech.icon}
              alt={tech.name}
              className="w-12 h-12 object-contain"
            />
            <div className="flex-1">
              <h3 className={`font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {tech.name}
              </h3>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${
                    isDarkMode ? 'bg-blue-500' : 'bg-blue-600'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${tech.level}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />
              </div>
            </div>
          </div>
          <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        </motion.div>
      ))}
    </div>
  );
};

export default TechStack; 