import { motion } from "framer-motion";

export default function Typing() {
  return (
    <motion.div
      initial={{x: -2000}}
      animate={{x: 0}}
      transition={{type: 'spring', bounce: 0.1, duration: 0.6, delay: 0.6}}
      className="chat chat-start">
        <div className="flex justify-center gap-1 pt-4 align-bottom chat-bubble chat-bubble-accent">
          <div className="w-3 h-3 bg-gray-800 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 rounded-full animate-bounce animation-delay-200 bg-slate-800"></div>
          <div className="w-3 h-3 rounded-full animate-bounce animation-delay-400 bg-slate-800"></div>
        </div>
      </motion.div>
  );
}
