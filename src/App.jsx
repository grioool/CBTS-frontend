import { useState } from 'react';
import FileUpload from './components/FileUpload';
import SummaryOptions from './components/SummaryOptions';
import SummaryStyle from './components/SummaryStyle';
import SummaryButton from './components/SummaryButton';
import { summarizeFile, getSummary } from './services/api';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [summaryType, setSummaryType] = useState('short');
  const [summaryStyle, setSummaryStyle] = useState('regular');
  const [summaryResult, setSummaryResult] = useState('');

  const handleSummarise = async () => {
    if (!selectedFile) {
      alert('Please upload a PDF file first.');
      return;
    }

    try {
      await summarizeFile(selectedFile, summaryType, summaryStyle);
      const { data } = await getSummary();
      setSummaryResult(data);
    } catch (error) {
      console.error('Summarization failed:', error);
      alert('Error during summarization.');
    }
  };

  return (
    <div className="card">
      <h1>📄 PDF Summarizer</h1>

      <div className="form-group">
        <label htmlFor="fileUpload">Upload PDF:</label>
        <FileUpload onFileSelect={setSelectedFile} />
      </div>

      <div className="form-group">
        <label htmlFor="summaryOptions">Select Summary Format:</label>
        <SummaryOptions summaryType={summaryType} setSummaryType={setSummaryType} />
      </div>

      <div className="form-group">
        <label htmlFor="summaryStyle">Select Summary Style:</label>
        <SummaryStyle summaryStyle={summaryStyle} setSummaryStyle={setSummaryStyle} />
      </div>

      <SummaryButton handleSummarise={handleSummarise} />

      {summaryResult && (
        <div className="summary-container">
          <h3>Summary:</h3>
          <p>{summaryResult}</p>
        </div>
      )}
    </div>
  );
}

export default App;
