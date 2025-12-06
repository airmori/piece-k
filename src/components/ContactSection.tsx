import { Button } from './ui/Button';

export const ContactSection = () => {
    return (
        <section id="contact" className="py-32 bg-primary text-white text-center relative overflow-hidden">
            {/* Background Shapes */}
            <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-white/10 rounded-full blur-[100px]" />

            <div className="container mx-auto px-6 relative z-10">
                <h2 className="text-[10vw] font-black leading-none mb-4">JOIN US</h2>
                <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto mb-12 font-medium">
                    地域社会と共に歩む、新しい奉仕のカタチ。<br />
                    あなたも福岡中央ライオンズクラブの一員になりませんか？
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-6">
                    <Button size="lg" variant="secondary" className="rounded-full px-12 py-8 text-xl text-primary font-bold">
                        お問い合わせ
                    </Button>
                    <Button size="lg" className="bg-transparent border-2 border-white/30 hover:bg-white hover:text-primary rounded-full px-12 py-8 text-xl font-bold">
                        事務局へ連絡
                    </Button>
                </div>
            </div>
        </section>
    );
};
