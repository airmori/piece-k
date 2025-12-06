import { Card } from '../components/ui/Card';
import { FileText, Download } from 'lucide-react';

export const MembersDashboard = () => {
    const minutes = [
        { date: '2024.12.10', title: '12月第一例会 議事録', size: '2.4MB' },
        { date: '2024.11.26', title: '11月第二例会 議事録', size: '1.8MB' },
        { date: '2024.11.12', title: '11月第一例会 議事録', size: '1.9MB' },
        { date: '2024.10.29', title: '10月第二例会 議事録', size: '2.1MB' },
    ];

    return (
        <div className="pt-32 pb-20 min-h-screen container mx-auto px-6">
            <div className="mb-12">
                <span className="text-primary font-bold tracking-widest text-sm uppercase">MEMBERS ONLY</span>
                <h1 className="text-5xl md:text-7xl font-black mt-2">DASHBOARD</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Minutes Section */}
                <div>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <FileText className="text-primary" />
                        例会議事録
                    </h2>
                    <div className="space-y-4">
                        {minutes.map((file, i) => (
                            <Card key={i} hoverEffect className="flex items-center justify-between p-6 cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className="bg-blue-50 p-3 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                        <FileText size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-text-sub font-bold">{file.date}</p>
                                        <h3 className="font-bold text-lg">{file.title}</h3>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" className="rounded-full">
                                    <Download size={20} />
                                </Button>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Notices Section */}
                <div>
                    <h2 className="text-2xl font-bold mb-6">事務局からのお知らせ</h2>
                    <Card className="bg-primary text-white p-8">
                        <h3 className="text-xl font-bold mb-4">会費納入のお願い</h3>
                        <p className="text-blue-100 mb-6">
                            2025年度前期の会費納入の期限が迫っております。<br />
                            期限：2024年12月25日（水）まで
                        </p>
                        <div className="bg-white/10 p-4 rounded-xl text-sm">
                            振込先：福岡銀行 本店営業部<br />
                            普）1234567 フクオカチュウオウLC
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

import { Button } from '../components/ui/Button';
