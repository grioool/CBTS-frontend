function FileUpload({ onFileSelect }) {
    return (
      <input
        type="file"
        accept=".pdf"
        id="fileUpload"
        onChange={(e) => onFileSelect(e.target.files[0])}
      />
    );
  }
  
  export default FileUpload;
  