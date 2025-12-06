import { Card } from './ui/Card';
import { Button } from './ui/Button';

export const ActivitiesSection = () => {
    const projects = [
        {
            id: "01",
            category: "Environment",
            title: "秋の海岸清掃活動",
            desc: "美しい博多湾を守るため、市民ボランティアと共に。",
            year: "2024"
        },
        {
            id: "02",
            category: "Charity",
            title: "チャリティーコンサート",
            desc: "音楽を通じて被災地への支援金を募るイベントを開催。",
            year: "2024"
        },
        {
            id: "03",
            category: "Youth",
            title: "サマーキャンプ支援",
            desc: "次世代を担う子供たちの成長をサポート。",
            year: "2024"
        }
    ];

    return (
        <section id="activities" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter">PROJECTS<span className="text-primary">.</span></h2>
                    <Button variant="outline" className="rounded-full px-8 border-2">VIEW ALL ARCHIVES</Button>
                </div>

                <div className="space-y-6">
                    {projects.map((project) => (
                        <Card key={project.id} hoverEffect className="group relative overflow-hidden bg-secondary border-none p-8 md:p-12 transition-all duration-500 hover:bg-black hover:text-white">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 z-10 relative">
                                <div className="flex items-start gap-8 md:w-1/3">
                                    <span className="text-xl font-mono text-primary group-hover:text-white/50">{project.id}</span>
                                    <div>
                                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold border border-gray-300 text-gray-500 mb-4 group-hover:border-gray-700 group-hover:text-gray-300">
                                            {project.category}
                                        </span>
                                        <h3 className="text-2xl md:text-4xl font-bold group-hover:text-white">{project.title}</h3>
                                    </div>
                                </div>

                                <p className="text-text-sub md:w-1/3 text-lg group-hover:text-gray-400">
                                    {project.desc}
                                </p>

                                <div className="md:w-1/6 text-right">
                                    <span className="text-4xl font-light group-hover:text-white">→</span>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
