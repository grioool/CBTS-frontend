import React, {useEffect, useMemo, useState} from 'react';
import {
    getUserHistory,
    getSummaryContent,
    downloadSummaryFile,
    Summary,
} from '../services/historyService';

import {addNewNote, getUserNoteHistory, Note} from '../services/noteService';

type TabKey = 'summaries' | 'notes';

const UserHistoryPage: React.FC = () => {
    const [summaries, setSummaries] = useState<Summary[]>([]);
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedSummaryText, setSelectedSummaryText] = useState<string>('');
    const [activeTab, setActiveTab] = useState<TabKey>('summaries');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // new-note form state
    const [newNoteText, setNewNoteText] = useState('');
    const [addingNote, setAddingNote] = useState(false);

    // length filter state
    const [minLen, setMinLen] = useState<string>('');
    const [maxLen, setMaxLen] = useState<string>('');

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
                const userNotes = await getUserNoteHistory(token);
                setSummaries(data);
                setNotes(userNotes);
            } catch (err) {
                console.error('Error fetching history:', err);
                setError('Failed to fetch history.');
            } finally {
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

    const handleAddNote = async () => {
        if (!token || !newNoteText.trim()) return;
        try {
            setAddingNote(true);
            const createdNote = await addNewNote(newNoteText.trim(), token); // assuming API returns the created Note
            setNotes(prev => [...prev, createdNote]);
            setNewNoteText('');
        } catch (err) {
            console.error('Add note error:', err);
            setError('Failed to add note.');
        } finally {
            setAddingNote(false);
        }
    };

    const renderList = (items: Summary[]) => (
        <ul className="space-y-4">
            {items.map((item) => (
                <li
                    key={item.id}
                    className="bg-white shadow rounded p-4 flex flex-col sm:flex-row sm:items-center justify-between"
                >
                    <div>
                        <strong>{item.filename}</strong>
                    </div>
                    <div className="mt-2 sm:mt-0">
                        <button
                            className="btn btn-secondary mr-2"
                            onClick={() => handleView(item.id)}
                        >
                            View
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={() => handleDownload(item.id)}
                        >
                            Download
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );

    const renderNoteList = (items: Note[]) => (
        <ul className="space-y-4">
            {items.map((item) => (
                <li
                    key={item.id}
                    className="bg-white shadow rounded p-4"
                >
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500">Length: {item.content?.length ?? 0}</span>
                    </div>
                    <p>{item.content}</p>
                </li>
            ))}
        </ul>
    );

    // ---- Length filtering ----
    const filteredNotes = useMemo(() => {
        const min = minLen === '' ? -Infinity : Number(minLen);
        const max = maxLen === '' ? Infinity : Number(maxLen);
        return notes.filter(n => {
            const len = n.content?.length ?? 0;
            return len >= min && len <= max;
        });
    }, [notes, minLen, maxLen]);

    const isSummariesTab = activeTab === 'summaries';

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">User History</h1>

            {/* Tabs */}
            <div className="flex border-b mb-4">
                <button
                    className={`px-4 py-2 -mb-px border-b-2 ${
                        isSummariesTab ? 'border-blue-600 font-semibold' : 'border-transparent text-gray-500'
                    }`}
                    onClick={() => setActiveTab('summaries')}
                >
                    Summaries
                </button>
                <button
                    className={`ml-4 px-4 py-2 -mb-px border-b-2 ${
                        !isSummariesTab ? 'border-blue-600 font-semibold' : 'border-transparent text-gray-500'
                    }`}
                    onClick={() => setActiveTab('notes')}
                >
                    Notes
                </button>
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}
            {loading && <div>Loading…</div>}

            {!loading && isSummariesTab && (
                <>
                    {summaries.length === 0 ? (
                        <div>No summaries found.</div>
                    ) : (
                        renderList(summaries)
                    )}
                </>
            )}

            {!loading && !isSummariesTab && (
                <>
                    {/* New Note Composer */}
                    <div className="mb-6 bg-white shadow rounded p-4">
                        <h2 className="font-semibold mb-2">Add a new note</h2>
                        <textarea
                            className="w-full border rounded p-2 min-h-[120px]"
                            placeholder="Write your note…"
                            value={newNoteText}
                            onChange={(e) => setNewNoteText(e.target.value)}
                        />
                        <div className="mt-3 flex items-center gap-2">
                            <button
                                className="btn btn-primary"
                                onClick={handleAddNote}
                                disabled={addingNote || !newNoteText.trim()}
                            >
                                {addingNote ? 'Adding…' : 'Add Note'}
                            </button>
                        </div>
                    </div>

                    {/* Length Filter */}
                    <div className="mb-4 bg-white shadow rounded p-4">
                        <h3 className="font-semibold mb-3">Filter by length (characters)</h3>
                        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1" htmlFor="minLen">Min</label>
                                <input
                                    id="minLen"
                                    type="number"
                                    className="border rounded p-2 w-40"
                                    placeholder="e.g. 50"
                                    value={minLen}
                                    onChange={(e) => setMinLen(e.target.value)}
                                    min={0}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1" htmlFor="maxLen">Max</label>
                                <input
                                    id="maxLen"
                                    type="number"
                                    className="border rounded p-2 w-40"
                                    placeholder="e.g. 200"
                                    value={maxLen}
                                    onChange={(e) => setMaxLen(e.target.value)}
                                    min={0}
                                />
                            </div>
                            <button
                                className="btn btn-secondary"
                                onClick={() => {
                                    setMinLen('');
                                    setMaxLen('');
                                }}
                                disabled={minLen === '' && maxLen === ''}
                            >
                                Clear filter
                            </button>
                            <span className="text-sm text-gray-500 ml-auto">
                Showing {filteredNotes.length} of {notes.length}
              </span>
                        </div>
                    </div>

                    {/* Notes List (filtered) */}
                    {filteredNotes.length === 0 ? (
                        <div>No notes match the current length filter.</div>
                    ) : (
                        renderNoteList(filteredNotes)
                    )}
                </>
            )}

            {selectedSummaryText && (
                <div className="mt-6 p-4 bg-gray-100 rounded shadow">
                    <h2 className="font-bold mb-2">Content</h2>
                    <pre className="whitespace-pre-wrap">{selectedSummaryText}</pre>
                </div>
            )}
        </div>
    );
};

export default UserHistoryPage;
