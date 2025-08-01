// import React from 'react';

// const FileDetailList = ({ fileDetails, onSelect }) => {
//   if (!fileDetails || fileDetails.length === 0) {
//     return <div>No file details found.</div>;
//   }

//   return (
//     <div>
//       <h2>File Details</h2>
//       <table>
//         <thead>
//           <tr className='felx gap-5'>
//             <th>File Number</th>
//             <th>Item Name</th>
//             <th>Total Assessable Value</th>
//             <th>Total Duty Value</th>
//             <th>Date Created</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {fileDetails.map(file => (
//             <tr key={file.id}>
//               <td>{file.fileNumber}</td>
//               <td>{file.itemName}</td>
//               <td>{file.totalAssessableValue}</td>
//               <td>{file.totalDutyValue}</td>
//               <td>{new Date(file.createdAt).toLocaleString()}</td>
//               <td>
//                 <button onClick={() => onSelect(file.id)}>View</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default FileDetailList;


























import React from 'react';

const FileDetailList = ({ fileDetails, onSelect }) => {
  if (!fileDetails || fileDetails.length === 0) {
    return (
      <div className="p-12 text-center text-gray-500">
        <p className="text-lg font-medium">No file details found</p>
      </div>
    );
  }

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              File Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Item Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Assessable Value
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Duty Value
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date Created
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {fileDetails.map(file => (
            <tr key={file.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="bg-gray-100 rounded-md px-2 py-1 text-sm">
                  {file.fileNumber}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {file.itemName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {parseFloat(file.totalAssessableValue).toFixed(4)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {parseFloat(file.totalDutyValue).toFixed(4)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(file.createdAt).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button 
                  onClick={() => onSelect(file.id)}
                  className="bg-blue-50 text-blue-700 px-3 py-2 rounded-md hover:bg-blue-100 transition-colors"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Add pagination here if needed */}
    </div>
  );
};

export default FileDetailList;
