// import React from 'react';

// const FileDetailView = ({ fileDetail, onEdit, onDelete, onBack }) => {
//   if (!fileDetail || !fileDetail.fileDetail) {
//     return <div>No file detail information available.</div>;
//   }

//   const file = fileDetail.fileDetail;
//   const taxInfo = fileDetail.taxInfo;

//   return (
//     <div>
//       <h2>File Detail: {file.fileNumber}</h2>
      
//       <div>
//         <h3>Basic Information</h3>
//         <p><strong>Item Name:</strong> {file.itemName}</p>
//         <p><strong>HS Code:</strong> {file.hsCode}</p>
//         <p><strong>UOM Code:</strong> {file.uomCode}</p>
//         <p><strong>Remarks:</strong> {file.remarks || 'No remarks'}</p>
//       </div>
      
//       <div>
//         <h3>Financial Information</h3>
//         <p><strong>Assessable Value:</strong> {file.assessableValue}</p>
//         <p><strong>Duty Value:</strong> {file.dutyValue}</p>
//         <p><strong>Total Assessable Value:</strong> {file.totalAssessableValue}</p>
//         <p><strong>Total Duty Value:</strong> {file.totalDutyValue}</p>
//       </div>
      
//       <div>
//         <h3>Tax Rates</h3>
//         <p><strong>Custom Duty:</strong> {file.customDuty}%</p>
//         <p><strong>ACD:</strong> {file.acd}%</p>
//         <p><strong>RD:</strong> {file.rd}%</p>
//         <p><strong>FTA Custom Duty:</strong> {file.ftaCustomDuty}%</p>
//         <p><strong>Sales Tax:</strong> {file.salesTax}%</p>
//         <p><strong>Additional Sales Tax:</strong> {file.additionalSalesTax}%</p>
//         <p><strong>Further Tax:</strong> {file.furtherTax}%</p>
//         <p><strong>Income Tax Import:</strong> {file.incomeTaxImport}%</p>
//         <p><strong>Income Tax Withheld:</strong> {file.incomeTaxWithheld}%</p>
//       </div>
      
//       {/* {taxInfo && (
//         <div>
//           <h3>Original Tax Information</h3>
//           <p><strong>Item Name:</strong> {taxInfo.itemName}</p>
//           <p><strong>Unit:</strong> {taxInfo.Unit?.unit || 'N/A'}</p>
//         </div>
//       )} */}
      
//       {/* <div>
//         <h3>Record Information</h3>
//         <p><strong>Created:</strong> {new Date(file.createdAt).toLocaleString()}</p>
//         <p><strong>Last Updated:</strong> {new Date(file.updatedAt).toLocaleString()}</p>
//       </div>
//        */}
//       <div className='flex gap-4'>
//         <button onClick={onEdit}>Edit</button>
//         <button onClick={onDelete}>Delete</button>
//         <button onClick={onBack}>Back to List</button>
//       </div>
//     </div>
//   );
// };

// export default FileDetailView;




























import React from 'react';

const FileDetailView = ({ fileDetail, onEdit, onDelete, onBack }) => {
  if (!fileDetail || !fileDetail.fileDetail) {
    return <div className="p-12 text-center text-gray-500">No file detail information available.</div>;
  }

  const file = fileDetail.fileDetail;
  const taxInfo = fileDetail.taxInfo;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">File Detail: <span className="text-blue-600">{file.fileNumber}</span></h2>
        <div className="flex space-x-4">
          <button
            onClick={onBack}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
          >
            Back to List
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Basic Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Item Name:</span>
              <span className="font-medium">{file.itemName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">HS Code:</span>
              <span className="font-medium">{file.hsCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">UOM Code:</span>
              <span className="font-medium">{file.uomCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Remarks:</span>
              <span className="font-medium">{file.remarks || 'No remarks'}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Financial Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Assessable Value:</span>
              <span className="font-medium">{parseFloat(file.assessableValue).toFixed(4)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duty Value:</span>
              <span className="font-medium">{parseFloat(file.dutyValue).toFixed(4)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Assessable Value:</span>
              <span className="font-medium">{parseFloat(file.totalAssessableValue).toFixed(4)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Duty Value:</span>
              <span className="font-medium">{parseFloat(file.totalDutyValue).toFixed(4)}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg col-span-1 md:col-span-2">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Tax Rates</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Custom Duty:</span>
              <span className="font-medium">{file.customDuty}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ACD:</span>
              <span className="font-medium">{file.acd}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">RD:</span>
              <span className="font-medium">{file.rd}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">FTA Custom Duty:</span>
              <span className="font-medium">{file.ftaCustomDuty}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sales Tax:</span>
              <span className="font-medium">{file.salesTax}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Additional Sales Tax:</span>
              <span className="font-medium">{file.additionalSalesTax}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Further Tax:</span>
              <span className="font-medium">{file.furtherTax}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Income Tax Import:</span>
              <span className="font-medium">{file.incomeTaxImport}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Income Tax Withheld:</span>
              <span className="font-medium">{file.incomeTaxWithheld}%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-4">
        <button
          onClick={onEdit}
          className="bg-blue-50 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-100 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-50 text-red-700 px-4 py-2 rounded-md hover:bg-red-100 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default FileDetailView;
