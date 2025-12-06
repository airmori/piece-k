import { Card } from './ui/Card';

export const ScheduleSection = () => {
    const events = [
        { date: "2024.12.10", title: "12月第一例会 (忘年会)", type: "例会" },
        { date: "2024.12.24", title: "クリスマス家族会", type: "イベント" },
        { date: "2025.01.08", title: "新年例会", type: "例会" },
    ];

    const news = [
        { date: "2024.11.30", title: "年末年始の事務局休業について" },
        { date: "2024.11.15", title: "新会員2名が入会されました" },
    ];

    return (
        <section id="schedule" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Schedule */}
                    <div>
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <span className="w-2 h-8 bg-primary rounded-full"></span>
                            Schedule
                        </h2>
                        <div className="space-y-4">
                            {events.map((evt, i) => (
                                <Card key={i} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors cursor-default">
                                    <div className="bg-secondary px-4 py-2 rounded-xl text-center min-w-[80px]">
                                        <span className="block text-xs text-text-sub">{evt.date.split('.')[0]}.</span>
                                        <span className="block text-lg font-bold text-primary">{evt.date.split('.').slice(1).join('/')}</span>
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-gray-400 border border-gray-200 px-2 py-0.5 rounded-full mb-1 inline-block">
                                            {evt.type}
                                        </span>
                                        <h3 className="font-bold text-text-main">{evt.title}</h3>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* News */}
                    <div id="news">
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <span className="w-2 h-8 bg-gray-300 rounded-full"></span>
                            News & Topics
                        </h2>
                        <Card className="divide-y divide-gray-100">
                            {news.map((item, i) => (
                                <div key={i} className="py-4 first:pt-0 last:pb-0">
                                    <p className="text-xs text-text-sub mb-1">{item.date}</p>
                                    <a href="#" className="font-medium hover:text-primary transition-colors">
                                        {item.title}
                                    </a>
                                </div>
                            ))}
                            <div className="pt-4 mt-2">
                                <a href="#" className="text-sm font-bold text-primary hover:underline">
                                    お知らせ一覧へ →
                                </a>
                            </div>
                        </Card>
                    </div>

                </div>
            </div>
        </section>
    );
};
