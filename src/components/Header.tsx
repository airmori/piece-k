import { useState, useEffect } from 'react';
import { Menu, X, Lock } from 'lucide-react';
import { Button } from './ui/Button';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (href: string) => {
        setIsMenuOpen(false);

        if (href.startsWith('#')) {
            // If on home page, scroll. If not, go home then scroll.
            if (location.pathname === '/') {
                const el = document.querySelector(href);
                el?.scrollIntoView({ behavior: 'smooth' });
            } else {
                navigate(`/${href}`);
            }
        } else {
            navigate(href);
        }
    };

    const navLinks = [
        { name: 'ABOUT', href: '#about' },
        { name: 'PROJECTS', href: '#activities' },
        { name: 'SCHEDULE', href: '#schedule' },
        { name: 'CONTACT', href: '#contact' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6 md:py-10'
                }`}
        >
            <div className={`container mx-auto px-6 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm rounded-full pr-4 pl-8 py-3' : ''} flex items-center justify-between`}>
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 z-50">
                    <img src="/logo.png" alt="Lions Club Logo" className="w-10 h-10 object-contain" />
                    <span className={`font-bold text-xl tracking-tight ${isScrolled ? 'text-text-main' : 'text-text-main'}`}>
                        福岡中央ライオンズクラブ
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => handleNavClick(link.href)}
                            className="text-text-main hover:text-primary font-bold text-sm tracking-wide transition-colors"
                        >
                            {link.name}
                        </button>
                    ))}

                    <Button
                        size="sm"
                        variant="ghost"
                        className="rounded-full font-bold gap-2 hover:bg-gray-100"
                        onClick={() => navigate('/members')}
                    >
                        <Lock size={16} /> MEMBER
                    </Button>

                    <Button size="sm" className="rounded-full font-bold">
                        JOIN US
                    </Button>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden z-50 text-text-main"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X /> : <Menu />}
                </button>

                {/* Mobile Nav Overlay */}
                {isMenuOpen && (
                    <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => handleNavClick(link.href)}
                                className="text-4xl font-black text-text-main hover:text-primary"
                            >
                                {link.name}
                            </button>
                        ))}
                        <Button
                            variant="ghost"
                            size="lg"
                            onClick={() => {
                                handleNavClick('/members');
                                setIsMenuOpen(false);
                            }}
                            className="mt-8 font-bold text-xl"
                        >
                            <Lock className="mr-2" /> MEMBER LOGIN
                        </Button>
                    </div>
                )}
            </div>
        </header>
    );
};
