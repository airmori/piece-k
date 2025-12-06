import { motion } from 'framer-motion';

interface MarqueeProps {
    text: string;
    className?: string;
    baseVelocity?: number;
}

export const Marquee = ({ text, className = "", baseVelocity = 5 }: MarqueeProps) => {
    return (
        <div className={`overflow-hidden whitespace-nowrap flex ${className}`}>
            <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: ["0%", "-100%"] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 20 / baseVelocity,
                }}
                style={{ willChange: 'transform' }}
            >
                <span className="block mr-8 font-bold text-4xl md:text-8xl text-transparent stroke-text opacity-20 uppercase tracking-tighter">
                    {text} - {text} - {text} - {text} -
                </span>
                <span className="block mr-8 font-bold text-4xl md:text-8xl text-transparent stroke-text opacity-20 uppercase tracking-tighter">
                    {text} - {text} - {text} - {text} -
                </span>
            </motion.div>
        </div>
    );
};
