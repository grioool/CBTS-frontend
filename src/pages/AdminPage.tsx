import React, {useState, useEffect} from 'react';
import {getAdminAnalytics, AdminAnalyticsResponse} from '../services/adminService';

const AdminPanel: React.FC = () => {
    const [analytics, setAnalytics] = useState<AdminAnalyticsResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    setError('Authentication token not found.');
                    return;
                }
                const data = await getAdminAnalytics(token);
                setAnalytics(data);
            } catch (err) {
                console.error(err);
                setError('Error fetching admin analytics.');
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600 text-xl">Loading analytics...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-600 text-xl">{error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Analytics Panel</h1>
            {analytics && (
                <div className="bg-white p-6 rounded shadow-md">
                    <div className="mb-4">
                        <p className="text-lg">
                            Total Summaries: <span className="font-semibold">{analytics.total_summaries}</span>
                        </p>
                    </div>
                    <div>
                        <p className="text-lg">
                            Total Users: <span className="font-semibold">{analytics.total_users}</span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
