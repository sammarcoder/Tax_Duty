// // src/components/ItemsList.jsx
// import React from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Tooltip,
//   Box,
//   Typography
// } from '@mui/material';
// import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

// const ItemsList = ({ items, onRemoveItem, onEditItem, isEditing }) => {
//   // Helper function to safely format numbers
//   const safeToFixed = (value, digits = 4) => {
//     if (typeof value === 'number' && !isNaN(value)) {
//       return value.toFixed(digits);
//     } else if (typeof value === 'string') {
//       const num = parseFloat(value);
//       return isNaN(num) ? (0).toFixed(digits) : num.toFixed(digits);
//     }
//     return (0).toFixed(digits);
//   };

//   if (!items || items.length === 0) {
//     return (
//       <Box p={3} textAlign="center">
//         <Typography variant="body1">No items added yet</Typography>
//       </Box>
//     );
//   }

//   return (
//     <TableContainer component={Paper}>
//       <Table aria-label="items table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Item Name</TableCell>
//             <TableCell align="right">Quantity</TableCell>
//             <TableCell align="right">Assessable Value</TableCell>
//             <TableCell align="right">Duty Value</TableCell>
//             <TableCell align="right">Total Assessable Value</TableCell>
//             <TableCell align="right">Total Duty Value</TableCell>
//             <TableCell align="right">Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {items.map((item) => (
//             <TableRow key={item.id}>
//               <TableCell component="th" scope="row">
//                 {item.itemName}
//               </TableCell>
//               <TableCell align="right">{item.quantity}</TableCell>
//               <TableCell align="right">{safeToFixed(item.assessableValue)}</TableCell>
//               <TableCell align="right">{safeToFixed(item.dutyValue)}</TableCell>
//               <TableCell align="right">{safeToFixed(item.totalAssessableValue)}</TableCell>
//               <TableCell align="right">{safeToFixed(item.totalDutyValue)}</TableCell>
//               <TableCell align="right">
//                 <Tooltip title="Edit Item">
//                   <IconButton 
//                     aria-label="edit" 
//                     color="primary"
//                     onClick={() => onEditItem(item.id)}
//                     disabled={isEditing}
//                   >
//                     <EditIcon />
//                   </IconButton>
//                 </Tooltip>
//                 <Tooltip title="Remove Item">
//                   <IconButton 
//                     aria-label="delete" 
//                     color="error"
//                     onClick={() => onRemoveItem(item.id)}
//                     disabled={isEditing}
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </Tooltip>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default ItemsList;


































// import React from 'react';

// const ItemsList = ({ items, onEditItem, onRemoveItem }) => {
//   const safeValue = (value) => {
//     if (typeof value === 'number') return value;
//     if (typeof value === 'string' && value !== '') return parseFloat(value);
//     return 0;
//   };
  
//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Item Name
//             </th>
//             <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               HS Code
//             </th>
//             <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Assessable Qty
//             </th>
//             <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Assessable Value
//             </th>
//             <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Total Assess. Value
//             </th>
//             <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Duty Qty
//             </th>
//             <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Duty Value
//             </th>
//             <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Total Duty Value
//             </th>
//             {/* <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Total
              
//             </th> */}
//             {(onEditItem || onRemoveItem) && (
//               <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             )}
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {items.map((item) => (
//             <tr key={item.id} className="hover:bg-gray-50">
//               <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                 {item.itemName}
//               </td>
//               <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
//                 {item.hsCode}
//               </td>
//               <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
//                 {safeValue(item.assessableQuantity)}
//               </td>
//               <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
//                 {safeValue(item.assessableValue).toFixed(2)}
//               </td>
//               <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
//                 {safeValue(item.totalAssessableValue).toFixed(2)}
//               </td>
//               <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
//                 {safeValue(item.dutyQuantity)}
//               </td>
//               <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
//                 {safeValue(item.dutyValue).toFixed(4)}
//               </td>
//               <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
//                 {safeValue(item.totalDutyValue).toFixed(2)}
//               </td>
//               {/* <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
//                 {safeValue(item.total).toFixed(2)}
//               </td> */}
//               {(onEditItem || onRemoveItem) && (
//                 <td className="px-3 py-4 whitespace-nowrap text-center text-sm font-medium">
//                   <div className="flex justify-center space-x-2">
//                     {onEditItem && (
//                       <button
//                         onClick={() => onEditItem(item)}
//                         className="text-blue-600 hover:text-blue-900"
//                       >
//                         Edit
//                       </button>
//                     )}
//                     {onRemoveItem && (
//                       <button
//                         onClick={() => onRemoveItem(item.id)}
//                         className="text-red-600 hover:text-red-900"
//                       >
//                         Remove
//                       </button>
//                     )}
//                   </div>
//                 </td>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ItemsList;










































// ItemsList.jsx
import React from 'react';

const ItemsList = ({ items, onEditItem, onRemoveItem }) => {
  const safeValue = (value) => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string' && value !== '') return parseFloat(value);
    return 0;
  };
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#4a6fa5] border-3 rounded text-white">
          <tr className=''>
            <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Item Name
            </th>
            <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">
              HS Code
            </th>
            <th className="px-3 py-3 text-right text-xs font-medium uppercase tracking-wider">
              Qty
            </th>
            <th className="px-3 py-3 text-right text-xs font-medium uppercase tracking-wider">
              Assessable Value
            </th>
            {/* <th className="px-3 py-3 text-right text-xs font-medium uppercase tracking-wider">
              Total Value
            </th> */}
            {/* <th className="px-3 py-3 text-right text-xs font-medium uppercase tracking-wider">
              Duty Qty
            </th> */}
            {/* <th className="px-3 py-3 text-right text-xs font-medium uppercase tracking-wider">
              Duty Value
            </th> */}
            {/* <th className="px-3 py-3 text-right text-xs font-medium uppercase tracking-wider">
              Total Duty
            </th> */}
            {(onEditItem || onRemoveItem) && (
              <th className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.length === 0 ? (
            <tr>
              <td colSpan={onEditItem || onRemoveItem ? 9 : 8} className="px-3 py-8 text-center text-gray-500">
                <div className="flex flex-col items-center">
                  <svg className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-lg font-medium">No items added yet</p>
                  <p className="text-sm text-gray-400 mt-1">Add items to see them here</p>
                </div>
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{item.itemName}</div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <code className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-mono">
                    {item.hsCode}
                  </code>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-gray-500 text-right">
                  {safeValue(item.assessableQuantity).toLocaleString(undefined, {maximumFractionDigits: 2})}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-gray-500 text-right">
                  {safeValue(item.assessableValue).toLocaleString(undefined, {maximumFractionDigits: 2})}
                </td>
                {/* <td className="px-3 py-4 whitespace-nowrap text-gray-500 text-right font-medium">
                  {safeValue(item.totalAssessableValue).toLocaleString(undefined, {maximumFractionDigits: 2})}
                </td> */}
                {/* <td className="px-3 py-4 whitespace-nowrap text-gray-500 text-right">
                  {safeValue(item.dutyQuantity || item.declaredQuantity).toLocaleString(undefined, {maximumFractionDigits: 2})}
                </td> */}
                {/* <td className="px-3 py-4 whitespace-nowrap text-gray-500 text-right">
                  {safeValue(item.dutyValue || item.declaredValue).toLocaleString(undefined, {maximumFractionDigits: 4})}
                </td> */}
                {/* <td className="px-3 py-4 whitespace-nowrap text-gray-700 text-right font-medium">
                  {safeValue(item.totalDutyValue || item.totalDeclaredValue).toLocaleString(undefined, {maximumFractionDigits: 2})}
                </td> */}
                {(onEditItem || onRemoveItem) && (
                  <td className="px-3 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center space-x-2">
                      {onEditItem && (
                        <button
                          onClick={() => onEditItem(item)}
                          className="text-[#4a6fa5] hover:text-[#5a85c0] font-medium flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                          </svg>
                          Edit
                        </button>
                      )}
                      {onRemoveItem && (
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-600 hover:text-red-800 font-medium flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                          Remove
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ItemsList;