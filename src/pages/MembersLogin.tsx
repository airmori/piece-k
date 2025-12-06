import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Lock } from 'lucide-react';

export const MembersLogin = ({ onLogin }: { onLogin: () => void }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Common password hardcoded for demo simplicity as requested
    // In a real app, this should at least be an env var or handled by backend
    const CORRECT_PASSWORD = import.meta.env.VITE_MEMBER_PASSWORD || 'lions';

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === CORRECT_PASSWORD) {
            onLogin();
            navigate('/members');
        } else {
            setError('パスワードが間違っています');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary px-4">
            <Card className="w-full max-w-md p-10 text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                    <Lock size={40} />
                </div>
                <h1 className="text-2xl font-black mb-2">MEMBERS ONLY</h1>
                <p className="text-text-sub mb-8">会員専用ページ閲覧用のパスワードを入力してください。</p>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full px-6 py-4 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-center text-lg font-bold"
                        />
                        {error && <p className="text-red-500 text-sm mt-2 font-bold">{error}</p>}
                    </div>

                    <Button type="submit" size="lg" className="w-full rounded-full py-4 text-lg">
                        ENTER
                    </Button>
                </form>
            </Card>
        </div>
    );
};
