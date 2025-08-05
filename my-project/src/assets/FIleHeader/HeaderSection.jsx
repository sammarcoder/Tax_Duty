// import React from 'react';

// const HeaderSection = ({ headerData, onHeaderChange, readOnly }) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           File Number
//         </label>
//         <input
//           type="text"
//           value={headerData.fileNumber || ''}
//           onChange={(e) => onHeaderChange('fileNumber', e.target.value)}
//           disabled={readOnly || !!headerData.id}
//           placeholder="Auto-generated"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//         />
//         {headerData.id && (
//           <p className="text-xs text-gray-500 mt-1">File number cannot be changed</p>
//         )}
//       </div>
      
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Exchange Rate
//         </label>
//         <input
//           type="number"
//           step="0.01"
//           value={headerData.exchangeRate || 0}
//           onChange={(e) => onHeaderChange('exchangeRate', parseFloat(e.target.value) || 0)}
//           disabled={readOnly}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//         />
//       </div>
      
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Value Addition Rate (%)
//         </label>
//         <input
//           type="number"
//           step="0.01"
//           value={headerData.valueAdditionRate || 1.1}
//           onChange={(e) => onHeaderChange('valueAdditionRate', parseFloat(e.target.value) || 1.1)}
//           disabled={readOnly}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//         />
//       </div>
      
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Currency
//         </label>
//         <input
//           type="text"
//           value={headerData.currency || ''}
//           onChange={(e) => onHeaderChange('currency', e.target.value)}
//           disabled={readOnly}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//         />
//       </div>
//     </div>
//   );
// };

// export default HeaderSection;








































// import React from 'react';

// const HeaderSection = ({ headerData, onHeaderChange, readOnly }) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           File Name
//         </label>
//         <input
//           type="text"
//           value={headerData.fileName || ''}
//           onChange={(e) => onHeaderChange('fileName', e.target.value)}
//           disabled={readOnly}
//           placeholder="Enter file name"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//         />
//       </div>
      
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           File Number
//         </label>
//         <input
//           type="text"
//           value={headerData.fileNumber || ''}
//           disabled={true}
//           placeholder="Auto-generated"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
//         />
//         <p className="text-xs text-gray-500 mt-1">File number is auto-generated</p>
//       </div>
      
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Exchange Rate
//         </label>
//         <input
//           type="number"
//           step="0.01"
//           value={headerData.exchangeRate || 0}
//           onChange={(e) => onHeaderChange('exchangeRate', parseFloat(e.target.value) || 0)}
//           disabled={readOnly}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//         />
//       </div>
      
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Value Addition Rate (%)
//         </label>
//         <input
//           type="number"
//           step="0.01"
//           value={headerData.valueAdditionRate || 1.1}
//           onChange={(e) => onHeaderChange('valueAdditionRate', parseFloat(e.target.value) || 1.1)}
//           disabled={readOnly}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//         />
//       </div>
      
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Currency
//         </label>
//         <input
//           type="text"
//           value={headerData.currency || ''}
//           onChange={(e) => onHeaderChange('currency', e.target.value)}
//           disabled={readOnly}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//         />
//       </div>
//     </div>
//   );
// };

// export default HeaderSection;




































































// import React from 'react';

// const HeaderSection = ({ headerData, onHeaderChange, readOnly }) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           File Name
//         </label>
//         <input
//           type="text"
//           value={headerData.fileName || ''}
//           onChange={(e) => onHeaderChange('fileName', e.target.value)}
//           disabled={readOnly}
//           placeholder="Enter file name"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//         />
//       </div>
      
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           File Number
//         </label>
//         <input
//           type="text"
//           value={headerData.fileNumber || ''}
//           disabled={true}
//           placeholder="Auto-generated"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
//         />
//         <p className="text-xs text-gray-500 mt-1">File number is auto-generated</p>
//       </div>
      
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Exchange Rate
//         </label>
//         <input
//           type="number"
//           step="0.01"
//           value={headerData.exchangeRate || 0}
//           onChange={(e) => onHeaderChange('exchangeRate', parseFloat(e.target.value) || 0)}
//           disabled={readOnly}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//         />
//       </div>
      
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Value Addition Rate (%)
//         </label>
//         <input
//           type="number"
//           step="0.01"
//           value={headerData.valueAdditionRate || 1.1}
//           onChange={(e) => onHeaderChange('valueAdditionRate', parseFloat(e.target.value) || 1.1)}
//           disabled={readOnly}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//         />
//       </div>
      
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Currency
//         </label>
//         <input
//           type="text"
//           value={headerData.currency || ''}
//           onChange={(e) => onHeaderChange('currency', e.target.value)}
//           disabled={readOnly}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//         />
//       </div>
//     </div>
//   );
// };

// export default HeaderSection;








































import React from 'react';

const HeaderSection = ({ headerData, onHeaderChange, readOnly }) => {
  const handleInputChange = (field, value) => {
    if (readOnly) return;
    if (field === 'exchangeRate' || field === 'valueAdditionRate') {
      const parsedValue = parseFloat(value);
      if (isNaN(parsedValue) || parsedValue < 0) return;
      onHeaderChange(field, parsedValue);
    } else {
      onHeaderChange(field, value);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">File Name</label>
        <input
          type="text"
          value={headerData.fileName || ''}
          onChange={(e) => handleInputChange('fileName', e.target.value)}
          disabled={readOnly}
          placeholder={readOnly ? 'No file name' : 'Enter file name'}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4a6fa5] focus:border-[#4a6fa5] ${
            readOnly ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white'
          }`}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">File Number</label>
        <input
          type="text"
          value={ headerData.fileNumber || 'Auto-generated'}
          disabled={true}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed"
        />
        <p className="text-xs text-gray-500 mt-1">File number is auto-generated</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-64 mb-1">Exchange Rate</label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={headerData.exchangeRate || ''}
          onChange={(e) => handleInputChange('exchangeRate', e.target.value)}
          disabled={readOnly}
          placeholder={readOnly ? 'No exchange rate' : 'Enter exchange rate'}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4a6fa5] focus:border-[#4a6fa5] ${
            readOnly ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white'
          }`}
        />
      </div>
      {/* <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Value Addition Rate (%)</label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={headerData.valueAdditionRate || ''}
          onChange={(e) => handleInputChange('valueAdditionRate', e.target.value)}
          disabled={readOnly}
          placeholder={readOnly ? 'No value addition rate' : 'Enter value addition rate'}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4a6fa5] focus:border-[#4a6fa5] ${
            readOnly ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white'
          }`}
        />
      </div> */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
        <input
          type="text"
          value={headerData.currency || ''}
          onChange={(e) => handleInputChange('currency', e.target.value)}
          disabled={readOnly}
          placeholder={readOnly ? 'No currency' : 'Enter currency (e.g., USD)'}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4a6fa5] focus:border-[#4a6fa5] ${
            readOnly ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white'
          }`}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">landedCost</label>
        <input
          type="text"
          value={headerData.landedCost || 1.01}
          onChange={(e) => handleInputChange('landedCost', e.target.value)}
          disabled={readOnly}
          placeholder={readOnly ? 'No currency' : 'Enter currency (e.g., USD)'}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4a6fa5] focus:border-[#4a6fa5] ${
            readOnly ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white'
          }`}
        />
      </div>
    </div>
  );
};

export default HeaderSection;