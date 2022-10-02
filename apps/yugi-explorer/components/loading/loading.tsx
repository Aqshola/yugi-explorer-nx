import {
  loadingCircleVariants,
  StaggerContainerVariants,
} from '../../types/animation';
import { motion } from 'framer-motion';

export function Loading() {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      aria-label='loading'
    >
      <motion.div
        className="flex gap-2"
        variants={StaggerContainerVariants}
        initial="start"
        animate="end"
      >
        <motion.span
          className="w-5 h-5 block bg-yellow-primary rounded-full"
          variants={loadingCircleVariants}
          transition={{
            duration: 0.5,
            repeatType: 'reverse',
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.span
          className="w-5 h-5 block bg-yellow-primary rounded-full"
          variants={loadingCircleVariants}
          transition={{
            duration: 0.5,
            repeatType: 'reverse',
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.span
          className="w-5 h-5 block bg-yellow-primary rounded-full"
          variants={loadingCircleVariants}
          transition={{
            duration: 0.5,
            repeatType: 'reverse',
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default Loading;
