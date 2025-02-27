function SummaryOptions({ summaryType, setSummaryType }) {
    return (
      <select
        id="summaryOptions"
        value={summaryType}
        onChange={(e) => setSummaryType(e.target.value)}
      >
        <option value="short">Short Paragraph</option>
        <option value="long">Long Paragraph</option>
        <option value="bullets">Bullet Points</option>
      </select>
    );
  }
  
  export default SummaryOptions;
  