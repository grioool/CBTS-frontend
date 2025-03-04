import React, {useEffect, useState} from 'react';
import {getUserHistory, getSummaryContent, downloadSummaryFile, Summary} from '../services/historyService';

const UserHistoryPage: React.FC = () => {
    const [summaries, setSummaries] = useState<Summary[]>([]);
    const [selectedSummaryText, setSelectedSummaryText] = useState<string>('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('access_token');

    useEffect(() => {
        if (!token) {
            setError('User not authenticated. Please log in.');
            return;
        }

        const fetchHistory = async () => {
            try {
                setLoading(true);
                const data = await getUserHistory(token);
                setSummaries(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching history:', err);
                setError('Failed to fetch history.');
                setLoading(false);
            }
        };

        fetchHistory();
    }, [token]);

    const handleView = async (summaryId: number) => {
        if (!token) return;
        try {
            const data = await getSummaryContent(summaryId, token);
            setSelectedSummaryText(data.summary);
        } catch (err) {
            console.error('Error fetching summary:', err);
            setError('Failed to fetch summary.');
        }
    };

    const handleDownload = async (summaryId: number) => {
        if (!token) return;
        try {
            await downloadSummaryFile(summaryId, token);
        } catch (err) {
            console.error('Download error:', err);
            setError('Failed to download file.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">User History</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {loading && <div>Loading history...</div>}
            {!loading && summaries.length === 0 && <div>No summaries found.</div>}
            <ul className="space-y-4">
                {summaries.map((summary) => (
                    <li key={summary.id}
                        className="bg-white shadow rounded p-4 flex flex-col sm:flex-row sm:items-center justify-between">
                        <div>
                            <strong>{summary.filename}</strong>
                        </div>
                        <div className="mt-2 sm:mt-0">
                            <button
                                className="btn btn-secondary mr-2"
                                onClick={() => handleView(summary.id)}
                            >
                                View
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={() => handleDownload(summary.id)}
                            >
                                Download
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {selectedSummaryText && (
                <div className="mt-6 p-4 bg-gray-100 rounded shadow">
                    <h2 className="font-bold mb-2">Summary Content</h2>
                    <pre className="whitespace-pre-wrap">{selectedSummaryText}</pre>
                </div>
            )}
        </div>
    );
};

export default UserHistoryPage;
