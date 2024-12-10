const OutputPanel = ({ output }) => (
    <div className="bg-gray-700 text-white p-4 h-full overflow-y-auto">
      <pre>{output}</pre>
    </div>
  );
  
  export default OutputPanel;