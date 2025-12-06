import { Hero } from '../components/Hero';
import { AboutSection } from '../components/AboutSection';
import { ActivitiesSection } from '../components/ActivitiesSection';
import { ScheduleSection } from '../components/ScheduleSection';
import { ContactSection } from '../components/ContactSection';

export const Home = () => {
    return (
        <main>
            <Hero />
            <AboutSection />
            <ActivitiesSection />
            <ScheduleSection />
            <ContactSection />
        </main>
    );
};
