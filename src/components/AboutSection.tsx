import { Card } from './ui/Card';
import { Marquee } from './Marquee';

export const AboutSection = () => {
    return (
        <section id="about" className="py-24 bg-secondary relative overflow-hidden">
            {/* Decorative Marquee Background */}
            <div className="absolute top-10 w-full opacity-5 pointer-events-none rotate-3">
                <Marquee text="ABOUT US" baseVelocity={2} />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-16 md:flex justify-between items-end">
                    <div>
                        <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">ABOUT<span className="text-primary">.</span></h2>
                        <p className="text-xl text-text-sub font-medium max-w-lg">
                            福岡中央ライオンズクラブは、<br />
                            「We Serve」の精神で未来を創ります。
                        </p>
                    </div>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Main Card */}
                    <Card className="md:col-span-8 bg-black text-white p-10 md:p-14 flex flex-col justify-between min-h-[400px]">
                        <div>
                            <h3 className="text-3xl font-bold mb-4">伝統と革新</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                1960年の設立以来、半世紀以上にわたり福岡の地で奉仕活動を続けてきました。
                                伝統を重んじながらも、現代のニーズに合わせた新しい支援の形を追求しています。
                            </p>
                        </div>
                        <div className="mt-8">
                            <span className="text-6xl font-black text-primary">50+</span>
                            <span className="text-xl ml-2 text-gray-400">YEARS OF HISTORY</span>
                        </div>
                    </Card>

                    {/* Side Card 1 */}
                    <Card className="md:col-span-4 bg-white p-10 flex flex-col justify-center items-center text-center">
                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                            <span className="text-4xl">🤝</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Membership</h3>
                        <p className="text-text-sub">多様なバックグラウンドを持つ<br />会員同士の交流</p>
                    </Card>

                    {/* Side Card 2 */}
                    <Card className="md:col-span-4 bg-white p-10 flex flex-col justify-center items-center text-center">
                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                            <span className="text-4xl">🌍</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Global</h3>
                        <p className="text-text-sub">世界最大の奉仕団体の一員として<br />国際的な活動へ参加</p>
                    </Card>

                    {/* Bottom Wide Card */}
                    <Card className="md:col-span-8 bg-primary text-white p-10 md:p-14 flex items-center justify-between">
                        <div className="max-w-lg">
                            <h3 className="text-3xl font-bold mb-2">Our Philosophy</h3>
                            <p className="text-blue-100 text-lg">Liberty, Intelligence, Our Nation's Safety</p>
                        </div>
                        <div className="hidden md:block text-6xl opacity-30 rotate-12">🦁</div>
                    </Card>
                </div>
            </div>
        </section>
    );
};
