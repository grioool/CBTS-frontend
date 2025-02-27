function SummaryStyle({ summaryStyle, setSummaryStyle }) {
    return (
    <select
    id="summaryStyle"
    value={summaryStyle}
    onChange={(e) => setSummaryStyle(e.target.value)}
    >
    <option value="scientific">Scientific</option>
    <option value="regular">Regular</option>
    <option value="simple">Simple</option>
    </select>
    );
    }
    export default SummaryStyle;
    