export const Footer = () => {
    return (
        <footer className="bg-black text-white py-20">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-10">
                    <div>
                        <h3 className="text-4xl font-black mb-6">FUKUOKA CHUO<br />LIONS CLUB</h3>
                        <p className="text-gray-500 max-w-xs">
                            Making a difference in our community since 1960.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-12">
                        <div>
                            <h4 className="font-bold text-gray-500 mb-4 text-sm">SITEMAP</h4>
                            <ul className="space-y-2">
                                <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
                                <li><a href="#activities" className="hover:text-primary transition-colors">Projects</a></li>
                                <li><a href="#schedule" className="hover:text-primary transition-colors">Schedule</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-500 mb-4 text-sm">CONTACT</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>Fukuoka, Japan</li>
                                <li>info@fukuoka-chuo-lions.org</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
                    <p>© 2024 Fukuoka Chuo Lions Club.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
