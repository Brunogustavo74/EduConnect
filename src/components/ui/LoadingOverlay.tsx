import { motion } from "framer-motion";

export default function LoadingOverlay({ message = "Conectando..." }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy/95 backdrop-blur-md">
      <div className="relative flex items-center justify-center w-32 h-32 mb-8">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-t-2 border-r-2 border-gold opacity-80"
        />
        
        {/* Middle Ring (Reverse) */}
        <motion.div
          animate={{ rotate: -360, scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-2 rounded-full border-b-2 border-l-2 border-white/50"
        />

        {/* Inner Core */}
        <motion.div
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-12 h-12 bg-gradient-to-br from-gold to-yellow-600 rounded-full shadow-[0_0_30px_rgba(212,175,55,0.6)]"
        />
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-white font-serif text-xl font-medium tracking-wide"
      >
        {message}
      </motion.h2>
      
      {/* Loading Dots */}
      <div className="flex gap-1 mt-3">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -5, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            className="w-1.5 h-1.5 bg-gold rounded-full"
          />
        ))}
      </div>
    </div>
  );
}
