import React, {useState, ChangeEvent, FormEvent} from 'react';
import {summarizeFile, SummarizeResponse} from '../services/summaryService.ts';

const SummaryPage: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [length, setLength] = useState('');
    const [style, setStyle] = useState('');
    const [summary, setSummary] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file || !length || !style) {
            setError('Please fill in all fields.');
            return;
        }

        const token = localStorage.getItem('access_token');
        if (!token) {
            setError('No authentication token found. Please login first.');
            return;
        }

        try {
            const data: SummarizeResponse = await summarizeFile(file, length, style, token);
            setSummary(data.summary);
            setError('');
        } catch (err: any) {
            console.error('Summarization error:', err);
            let errorMessage = err.response?.data?.message || 'An error occurred while generating the summary.';
            if (err.response?.status) {
                errorMessage = `Error ${err.response.status}: ${errorMessage}`;
            }
            setError(errorMessage);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Generate Summary</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                <div className="form-group mb-4">
                    <label
                        htmlFor="file"
                        className="form-label block text-gray-700 text-sm font-bold mb-2"
                    >
                        Upload File
                    </label>
                    <input
                        type="file"
                        id="file"
                        className="form-control block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="form-group mb-4">
                    <label
                        htmlFor="length"
                        className="form-label block text-gray-700 text-sm font-bold mb-2"
                    >
                        Summary Length
                    </label>
                    <select
                        id="length"
                        className="form-select block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                    >
                        <option value="">Select Length</option>
                        <option value="short">Short</option>
                        <option value="bullet_points">Bullet Points</option>
                        <option value="long">Long</option>
                    </select>
                </div>

                <div className="form-group mb-4">
                    <label
                        htmlFor="style"
                        className="form-label block text-gray-700 text-sm font-bold mb-2"
                    >
                        Summary Style
                    </label>
                    <select
                        id="style"
                        className="form-select block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                        value={style}
                        onChange={(e) => setStyle(e.target.value)}
                    >
                        <option value="">Select Style</option>
                        <option value="scientific">Scientific</option>
                        <option value="regular">Regular</option>
                        <option value="simple">Simple</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary w-full py-2">
                    Generate Summary
                </button>
                {error && <div className="text-red-500 mt-2">{error}</div>}
            </form>

            {summary && (
                <div className="bg-gray-100 p-4 rounded shadow">
                    <h2 className="text-lg font-bold mb-2">Summary</h2>
                    <p>{summary}</p>
                </div>
            )}
        </div>
    );
};

export default SummaryPage;
