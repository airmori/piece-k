import { motion } from 'framer-motion';
import { Button } from './ui/Button';

export const Hero = () => {
    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-screen flex flex-col justify-center bg-white overflow-hidden pt-20">

            {/* 3D Background Image */}
            <div className="absolute top-1/2 right-[-20%] md:right-[-10%] transform -translate-y-1/2 w-[120vw] md:w-[60vw] opacity-80 pointer-events-none z-0">
                <motion.img
                    src="/hero-bg.png"
                    alt="Abstract 3D Shape"
                    initial={{ y: 20, rotate: -5, opacity: 0 }}
                    animate={{ y: 0, rotate: 0, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="w-full h-auto object-cover"
                />
            </div>

            <div className="container mx-auto px-6 z-10 relative">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Tagline */}
                    <div className="flex items-center gap-3 mb-8">
                        <span className="h-[1px] w-12 bg-primary block"></span>
                        <span className="text-primary font-bold tracking-widest text-sm uppercase">Fukuoka Chuo Lions Club</span>
                    </div>

                    {/* Main Title - Massive Typography */}
                    <h1 className="text-[12vw] leading-[0.85] font-black tracking-tighter text-text-main mb-8">
                        WE SERVE<br />
                        <span className="text-primary">YOUR TOWN</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-text-sub max-w-xl font-medium leading-relaxed mb-12">
                        伝統と革新の融合。<br />
                        地域社会と共に歩む、新しい奉仕のカタチ。
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Button size="lg" className="rounded-full px-12 py-6 text-lg" onClick={() => scrollTo('contact')}>
                            JOIN US
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-full px-12 py-6 text-lg border-2" onClick={() => scrollTo('activities')}>
                            PROJECTS
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-6 md:left-12 animate-bounce">
                <span className="text-xs font-bold text-text-sub tracking-widest rotate-90 origin-left block">SCROLL</span>
            </div>
        </section>
    );
};
