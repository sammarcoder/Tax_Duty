// // ItemsList.jsx
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
//         <thead className="bg-[#4a6fa5] border-3 rounded text-white">
//           <tr className=''>
//             <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">
//               Item Name
//             </th>
//             <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">
//               HS Code
//             </th>
//             <th className="px-3 py-3 text-right text-xs font-medium uppercase tracking-wider">
//               Qty
//             </th>
//             <th className="px-3 py-3 text-right text-xs font-medium uppercase tracking-wider">
//               Assessable Value
//             </th>
//             <th>
//               total tax and duty 
//             </th>
//             {/* <th className="px-3 py-3 text-right text-xs font-medium uppercase tracking-wider">
//               Total Value
//             </th> */}
//             {/* <th className="px-3 py-3 text-right text-xs font-medium uppercase tracking-wider">
//               Duty Qty
//             </th> */}
//             {/* <th className="px-3 py-3 text-right text-xs font-medium uppercase tracking-wider">
//               Duty Value
//             </th> */}
//             {/* <th className="px-3 py-3 text-right text-xs font-medium uppercase tracking-wider">
//               Total Duty
//             </th> */}
//             {(onEditItem || onRemoveItem) && (
//               <th className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider">
//                 Actions
//               </th>
//             )}
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {items.length === 0 ? (
//             <tr>
//               <td colSpan={onEditItem || onRemoveItem ? 9 : 8} className="px-3 py-8 text-center text-gray-500">
//                 <div className="flex flex-col items-center">
//                   <svg className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <p className="text-lg font-medium">No items added yet</p>
//                   <p className="text-sm text-gray-400 mt-1">Add items to see them here</p>
//                 </div>
//               </td>
//             </tr>
//           ) : (
//             items.map((item) => (
//               <tr key={item.id} className="hover:bg-gray-50 transition-colors">
//                 <td className="px-3 py-4 whitespace-nowrap">
//                   <div className="font-medium text-gray-900">{item.itemName}</div>
//                 </td>
//                 <td className="px-3 py-4 whitespace-nowrap">
//                   <code className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-mono">
//                     {item.hsCode}
//                   </code>
//                 </td>
//                 <td className="px-3 py-4 whitespace-nowrap text-gray-500 text-right">
//                   {safeValue(item.assessableQuantity).toLocaleString(undefined, {maximumFractionDigits: 2})}
//                 </td>
//                 <td className="px-3 py-4 whitespace-nowrap text-gray-500 text-right">
//                   {safeValue(item.assessableValue).toLocaleString(undefined, {maximumFractionDigits: 2})}
//                 </td>
//                 <td>

//                 </td>
//                 {/* <td className="px-3 py-4 whitespace-nowrap text-gray-500 text-right font-medium">
//                   {safeValue(item.totalAssessableValue).toLocaleString(undefined, {maximumFractionDigits: 2})}
//                 </td> */}
//                 {/* <td className="px-3 py-4 whitespace-nowrap text-gray-500 text-right">
//                   {safeValue(item.dutyQuantity || item.declaredQuantity).toLocaleString(undefined, {maximumFractionDigits: 2})}
//                 </td> */}
//                 {/* <td className="px-3 py-4 whitespace-nowrap text-gray-500 text-right">
//                   {safeValue(item.dutyValue || item.declaredValue).toLocaleString(undefined, {maximumFractionDigits: 4})}
//                 </td> */}
//                 {/* <td className="px-3 py-4 whitespace-nowrap text-gray-700 text-right font-medium">
//                   {safeValue(item.totalDutyValue || item.totalDeclaredValue).toLocaleString(undefined, {maximumFractionDigits: 2})}
//                 </td> */}
//                 {(onEditItem || onRemoveItem) && (
//                   <td className="px-3 py-4 whitespace-nowrap text-center">
//                     <div className="flex justify-center space-x-2">
//                       {onEditItem && (
//                         <button
//                           onClick={() => onEditItem(item)}
//                           className="text-[#4a6fa5] hover:text-[#5a85c0] font-medium flex items-center"
//                         >
//                           <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
//                           </svg>
//                           Edit
//                         </button>
//                       )}
//                       {onRemoveItem && (
//                         <button
//                           onClick={() => onRemoveItem(item.id)}
//                           className="text-red-600 hover:text-red-800 font-medium flex items-center"
//                         >
//                           <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
//                           </svg>
//                           Remove
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                 )}
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ItemsList;



















































// // ItemsList.jsx
// import React from 'react';

// const ItemsList = ({ items, onEditItem, onRemoveItem }) => {
//   const safeValue = (value) => {
//     if (typeof value === 'number') return value;
//     if (typeof value === 'string' && value !== '') return parseFloat(value);
//     return 0;
//   };

//   // Define the function BEFORE using it
//   const calculateItemTotal = (item) => {
//     const acd = safeValue(item.acd);
//     const additionalSalesTax = safeValue(item.additionalSalesTax);
//     const customDuty = safeValue(item.customDuty);
//     const ftaCustomDuty = safeValue(item.ftaCustomDuty);
//     const rd = safeValue(item.rd);
//     const salesTax = safeValue(item.salesTax);
//     const incomeTaxImport = safeValue(item.incomeTaxImport);
    
//     return acd + additionalSalesTax + 
//       (item.isCustomDutySelected ? customDuty : ftaCustomDuty) + 
//       rd + salesTax + incomeTaxImport;
//   };

//   // NOW you can use it for grand total
//   const grandTotal = items.reduce((sum, item) => {
//     const itemTotal = item.totalTaxAndDuty || calculateItemTotal(item);
//     return sum + safeValue(itemTotal);
//   }, 0);
  
//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-[#4a6fa5] border-3 rounded text-white">
//           <tr>
//             <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">
//               Item Name
//             </th>
//             <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">
//               HS Code
//             </th>
//             <th className="px-3 py-3 text-right text-xs font-medium uppercase tracking-wider">
//               Qty
//             </th>
//             <th className="px-3 py-3 text-right text-xs font-medium uppercase tracking-wider">
//               Assessable Value
//             </th>
//             <th className="px-3 py-3 text-right text-xs font-medium uppercase tracking-wider">
//               Total Tax & Duty
//             </th>
//             {(onEditItem || onRemoveItem) && (
//               <th className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider">
//                 Actions
//               </th>
//             )}
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {items.length === 0 ? (
//             <tr>
//               <td colSpan={onEditItem || onRemoveItem ? 6 : 5} className="px-3 py-8 text-center text-gray-500">
//                 <div className="flex flex-col items-center">
//                   <svg className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <p className="text-lg font-medium">No items added yet</p>
//                   <p className="text-sm text-gray-400 mt-1">Add items to see them here</p>
//                 </div>
//               </td>
//             </tr>
//           ) : (
//             <>
//               {items.map((item) => {
//                 const itemTotalTax = item.totalTaxAndDuty || calculateItemTotal(item);
                
//                 return (
//                   <tr key={item.id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-3 py-4 whitespace-nowrap">
//                       <div className="font-medium text-gray-900">{item.itemName}</div>
//                     </td>
//                     <td className="px-3 py-4 whitespace-nowrap">
//                       <code className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-mono">
//                         {item.hsCode}
//                       </code>
//                     </td>
//                     <td className="px-3 py-4 whitespace-nowrap text-gray-500 text-right">
//                       {safeValue(item.assessableQuantity).toLocaleString(undefined, {maximumFractionDigits: 2})}
//                     </td>
//                     <td className="px-3 py-4 whitespace-nowrap text-gray-500 text-right">
//                       {safeValue(item.assessableValue).toLocaleString(undefined, {
//                         minimumFractionDigits: 2,
//                         maximumFractionDigits: 2
//                       })}
//                     </td>
//                     <td className="px-3 py-4 whitespace-nowrap text-right">
//                       <span className="font-semibold text-green-600">
//                         {safeValue(itemTotalTax).toLocaleString(undefined, {
//                           minimumFractionDigits: 2,
//                           maximumFractionDigits: 2
//                         })}
//                       </span>
//                     </td>
//                     {(onEditItem || onRemoveItem) && (
//                       <td className="px-3 py-4 whitespace-nowrap text-center">
//                         <div className="flex justify-center space-x-2">
//                           {onEditItem && (
//                             <button
//                               onClick={() => onEditItem(item)}
//                               className="text-[#4a6fa5] hover:text-[#5a85c0] font-medium flex items-center"
//                             >
//                               <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
//                               </svg>
//                               Edit
//                             </button>
//                           )}
//                           {onRemoveItem && (
//                             <button
//                               onClick={() => onRemoveItem(item.id)}
//                               className="text-red-600 hover:text-red-800 font-medium flex items-center"
//                             >
//                               <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
//                               </svg>
//                               Remove
//                             </button>
//                           )}
//                         </div>
//                       </td>
//                     )}
//                   </tr>
//                 );
//               })}
              
//               {/* Grand Total Row */}
//               <tr className="bg-gray-100 font-bold border-t-2 border-gray-300">
//                 <td colSpan="4" className="px-3 py-4 text-right text-gray-700">
//                   Grand Total:
//                 </td>
//                 <td className="px-3 py-4 text-right">
//                   <span className="text-lg text-blue-600">
//                     {grandTotal.toLocaleString(undefined, {
//                       minimumFractionDigits: 2,
//                       maximumFractionDigits: 2
//                     })}
//                   </span>
//                 </td>
//                 {(onEditItem || onRemoveItem) && <td></td>}
//               </tr>
//             </>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ItemsList;






























// // ItemsList.jsx
// import React from 'react';

// const ItemsList = ({ items, onEditItem, onRemoveItem, exchangeRate = 1, landedCost = 1.01 }) => {
//   const safeValue = (value) => {
//     if (typeof value === 'number') return value;
//     if (typeof value === 'string' && value !== '') return parseFloat(value);
//     return 0;
//   };

//   // Calculate AV Tax & Duty (matching your ItemDetails calculation)
//   const calculateAvTotal = (item) => {
//     const totalAvPkr = safeValue(exchangeRate) * safeValue(item.totalAssessableValue) * safeValue(landedCost);
    
//     // Calculate each tax component
//     const Av_customDuty = item.isCustomDutySelected ? (totalAvPkr * safeValue(item.customDuty)) / 100 : 0;
//     const Av_ftaCustomDuty = item.isFtaCustomDutySelected ? (totalAvPkr * safeValue(item.ftaCustomDuty)) / 100 : 0;
//     const Av_acd = (totalAvPkr * safeValue(item.acd)) / 100;
//     const Av_rd = (totalAvPkr * safeValue(item.rd)) / 100;
    
//     const selectedAvDuty = item.isCustomDutySelected ? Av_customDuty : Av_ftaCustomDuty;
    
//     const Av_salesTax = ((totalAvPkr + selectedAvDuty + Av_acd + Av_rd) * safeValue(item.salesTax)) / 100;
//     const Av_additionalSalesTax = ((totalAvPkr + selectedAvDuty + Av_acd + Av_rd) * safeValue(item.additionalSalesTax)) / 100;
//     const Av_incomeTaxImport = ((totalAvPkr + selectedAvDuty + Av_acd + Av_rd + Av_salesTax + Av_additionalSalesTax) * safeValue(item.incomeTaxImport)) / 100;
    
//     return Av_acd + Av_additionalSalesTax + selectedAvDuty + Av_rd + Av_salesTax + Av_incomeTaxImport;
//   };

//   // Calculate DV Tax & Duty (matching your ItemDetails calculation)
//   const calculateDvTotal = (item) => {
//     const totalDvPkr = safeValue(exchangeRate) * safeValue(item.totalDeclaredValue) * safeValue(landedCost);
    
//     // Calculate each tax component
//     const Dv_customDuty = item.isCustomDutySelected ? (totalDvPkr * safeValue(item.customDuty)) / 100 : 0;
//     const Dv_ftaCustomDuty = item.isFtaCustomDutySelected ? (totalDvPkr * safeValue(item.ftaCustomDuty)) / 100 : 0;
//     const Dv_acd = (totalDvPkr * safeValue(item.acd)) / 100;
//     const Dv_rd = (totalDvPkr * safeValue(item.rd)) / 100;
    
//     const selectedDvDuty = item.isCustomDutySelected ? Dv_customDuty : Dv_ftaCustomDuty;
    
//     const Dv_salesTax = ((totalDvPkr + selectedDvDuty + Dv_acd + Dv_rd) * safeValue(item.salesTax)) / 100;
//     const Dv_additionalSalesTax = ((totalDvPkr + selectedDvDuty + Dv_acd + Dv_rd) * safeValue(item.additionalSalesTax)) / 100;
//     const Dv_incomeTaxImport = ((totalDvPkr + selectedDvDuty + Dv_acd + Dv_rd + Dv_salesTax + Dv_additionalSalesTax) * safeValue(item.incomeTaxImport)) / 100;
    
//     return Dv_acd + Dv_additionalSalesTax + selectedDvDuty + Dv_rd + Dv_salesTax + Dv_incomeTaxImport;
//   };

//   // Calculate grand totals
//   const grandTotalAv = items.reduce((sum, item) => {
//     const avTotal = item.avTaxAndDuty || calculateAvTotal(item);
//     return sum + safeValue(avTotal);
//   }, 0);

//   const grandTotalDv = items.reduce((sum, item) => {
//     const dvTotal = item.dvTaxAndDuty || calculateDvTotal(item);
//     return sum + safeValue(dvTotal);
//   }, 0);
  
//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-[#4a6fa5] border-3 rounded text-white">
//           <tr>
//             <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">
//               Item Name
//             </th>
//             <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">
//               HS Code
//             </th>
//             <th className="px-3 py-3 text-right text-xs font-medium uppercase tracking-wider">
//               Qty
//             </th>
//             <th className="px-3 py-3 text-right text-xs font-medium uppercase tracking-wider">
//               Assessable Value
//             </th>
//             <th className="px-3 py-3 text-right text-xs font-medium uppercase tracking-wider">
//               AV Tax & Duty
//             </th>
//             <th className="px-3 py-3 text-right text-xs font-medium uppercase tracking-wider">
//               DV Tax & Duty
//             </th>
//             {(onEditItem || onRemoveItem) && (
//               <th className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider">
//                 Actions
//               </th>
//             )}
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {items.length === 0 ? (
//             <tr>
//               <td colSpan={onEditItem || onRemoveItem ? 7 : 6} className="px-3 py-8 text-center text-gray-500">
//                 <div className="flex flex-col items-center">
//                   <svg className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <p className="text-lg font-medium">No items added yet</p>
//                   <p className="text-sm text-gray-400 mt-1">Add items to see them here</p>
//                 </div>
//               </td>
//             </tr>
//           ) : (
//             <>
//               {items.map((item) => {
//                 const avTaxDuty = item.avTaxAndDuty || calculateAvTotal(item);
//                 const dvTaxDuty = item.dvTaxAndDuty || calculateDvTotal(item);
                
//                 return (
//                   <tr key={item.id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-3 py-4 whitespace-nowrap">
//                       <div className="font-medium text-gray-900">{item.itemName}</div>
//                     </td>
//                     <td className="px-3 py-4 whitespace-nowrap">
//                       <code className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-mono">
//                         {item.hsCode}
//                       </code>
//                     </td>
//                     <td className="px-3 py-4 whitespace-nowrap text-gray-500 text-right">
//                       {safeValue(item.assessableQuantity).toLocaleString(undefined, {maximumFractionDigits: 2})}
//                     </td>
//                     <td className="px-3 py-4 whitespace-nowrap text-gray-500 text-right">
//                       {safeValue(item.assessableValue).toLocaleString(undefined, {
//                         minimumFractionDigits: 2,
//                         maximumFractionDigits: 2
//                       })}
//                     </td>
//                     <td className="px-3 py-4 whitespace-nowrap text-right">
//                       <span className="font-semibold text-green-600">
//                         {safeValue(avTaxDuty).toLocaleString(undefined, {
//                           minimumFractionDigits: 2,
//                           maximumFractionDigits: 2
//                         })}
//                       </span>
//                     </td>
//                     <td className="px-3 py-4 whitespace-nowrap text-right">
//                       <span className="font-semibold text-blue-600">
//                         {safeValue(dvTaxDuty).toLocaleString(undefined, {
//                           minimumFractionDigits: 2,
//                           maximumFractionDigits: 2
//                         })}
//                       </span>
//                     </td>
//                     {(onEditItem || onRemoveItem) && (
//                       <td className="px-3 py-4 whitespace-nowrap text-center">
//                         <div className="flex justify-center space-x-2">
//                           {onEditItem && (
//                             <button
//                               onClick={() => onEditItem(item)}
//                               className="text-[#4a6fa5] hover:text-[#5a85c0] font-medium flex items-center"
//                             >
//                               <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
//                               </svg>
//                               Edit
//                             </button>
//                           )}
//                           {onRemoveItem && (
//                             <button
//                               onClick={() => onRemoveItem(item.id)}
//                               className="text-red-600 hover:text-red-800 font-medium flex items-center"
//                             >
//                               <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
//                               </svg>
//                               Remove
//                             </button>
//                           )}
//                         </div>
//                       </td>
//                     )}
//                   </tr>
//                 );
//               })}
              
// {/*              
//               <tr className="bg-gray-100 font-bold border-t-2 border-gray-300">
//                 <td colSpan="4" className="px-3 py-4 text-right text-gray-700">
//                   Grand Total:
//                 </td>
//                 <td className="px-3 py-4 text-right">
//                   <span className="text-lg text-green-600">
//                     {grandTotalAv.toLocaleString(undefined, {
//                       minimumFractionDigits: 2,
//                       maximumFractionDigits: 2
//                     })}
//                   </span>
//                 </td>
//                 <td className="px-3 py-4 text-right">
//                   <span className="text-lg text-blue-600">
//                     {grandTotalDv.toLocaleString(undefined, {
//                       minimumFractionDigits: 2,
//                       maximumFractionDigits: 2
//                     })}
//                   </span>
//                 </td>
//                 {(onEditItem || onRemoveItem) && <td></td>}
//               </tr> */}
//             </>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ItemsList;



















































// ItemsList.jsx
import React from 'react';

const ItemsList = ({ items, onEditItem, onRemoveItem, exchangeRate = 1, landedCost = 1.01 }) => {
  const safeValue = (value) => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string' && value !== '') return parseFloat(value);
    return 0;
  };

  // Calculate AV Tax & Duty (matching your ItemDetails calculation)
  const calculateAvTotal = (item) => {
    const totalAvPkr = safeValue(exchangeRate) * safeValue(item.totalAssessableValue) * safeValue(landedCost);
    
    // Calculate each tax component
    const Av_customDuty = item.isCustomDutySelected ? (totalAvPkr * safeValue(item.customDuty)) / 100 : 0;
    const Av_ftaCustomDuty = item.isFtaCustomDutySelected ? (totalAvPkr * safeValue(item.ftaCustomDuty)) / 100 : 0;
    const Av_acd = (totalAvPkr * safeValue(item.acd)) / 100;
    const Av_rd = (totalAvPkr * safeValue(item.rd)) / 100;
    
    const selectedAvDuty = item.isCustomDutySelected ? Av_customDuty : Av_ftaCustomDuty;
    
    const Av_salesTax = ((totalAvPkr + selectedAvDuty + Av_acd + Av_rd) * safeValue(item.salesTax)) / 100;
    const Av_additionalSalesTax = ((totalAvPkr + selectedAvDuty + Av_acd + Av_rd) * safeValue(item.additionalSalesTax)) / 100;
    const Av_incomeTaxImport = ((totalAvPkr + selectedAvDuty + Av_acd + Av_rd + Av_salesTax + Av_additionalSalesTax) * safeValue(item.incomeTaxImport)) / 100;
    
    return Av_acd + Av_additionalSalesTax + selectedAvDuty + Av_rd + Av_salesTax + Av_incomeTaxImport;
  };

  // Calculate AV Income Tax Withheld
  const calculateAvIncomeTaxWithheld = (item) => {
    const totalAvPkr = safeValue(exchangeRate) * safeValue(item.totalAssessableValue) * safeValue(landedCost);
    
    const Av_customDuty = item.isCustomDutySelected ? (totalAvPkr * safeValue(item.customDuty)) / 100 : 0;
    const Av_ftaCustomDuty = item.isFtaCustomDutySelected ? (totalAvPkr * safeValue(item.ftaCustomDuty)) / 100 : 0;
    const Av_acd = (totalAvPkr * safeValue(item.acd)) / 100;
    const Av_rd = (totalAvPkr * safeValue(item.rd)) / 100;
    
    const selectedAvDuty = item.isCustomDutySelected ? Av_customDuty : Av_ftaCustomDuty;
    
    const Av_salesTax = ((totalAvPkr + selectedAvDuty + Av_acd + Av_rd) * safeValue(item.salesTax)) / 100;
    const Av_additionalSalesTax = ((totalAvPkr + selectedAvDuty + Av_acd + Av_rd) * safeValue(item.additionalSalesTax)) / 100;
    
    const astSalesTaxRatio = safeValue(item.salesTax) > 0 ?
      (1 + (safeValue(item.additionalSalesTax) / safeValue(item.salesTax))) : 1;
    
    const Av_incomeTaxWithheld = astSalesTaxRatio *
      (totalAvPkr + selectedAvDuty + Av_acd + Av_rd + Av_salesTax + Av_additionalSalesTax) *
      (safeValue(item.incomeTaxWithheld) / 100);
    
    return Av_incomeTaxWithheld;
  };

  // Calculate AV Further Tax
  const calculateAvFurtherTax = (item) => {
    const totalAvPkr = safeValue(exchangeRate) * safeValue(item.totalAssessableValue) * safeValue(landedCost);
    
    const Av_customDuty = item.isCustomDutySelected ? (totalAvPkr * safeValue(item.customDuty)) / 100 : 0;
    const Av_ftaCustomDuty = item.isFtaCustomDutySelected ? (totalAvPkr * safeValue(item.ftaCustomDuty)) / 100 : 0;
    const Av_acd = (totalAvPkr * safeValue(item.acd)) / 100;
    const Av_rd = (totalAvPkr * safeValue(item.rd)) / 100;
    
    const selectedAvDuty = item.isCustomDutySelected ? Av_customDuty : Av_ftaCustomDuty;
    
    const astSalesTaxRatio = safeValue(item.salesTax) > 0 ?
      (1 + (safeValue(item.additionalSalesTax) / safeValue(item.salesTax))) : 1;
    
    const Av_furtherTax = astSalesTaxRatio *
      (totalAvPkr + selectedAvDuty + Av_acd + Av_rd) *
      (safeValue(item.furtherTax) / 100);
    
    return Av_furtherTax;
  };

  // Calculate grand totals
  const grandTotalAvTaxDuty = items.reduce((sum, item) => {
    const avTotal = item.avTaxAndDuty || calculateAvTotal(item);
    return sum + safeValue(avTotal);
  }, 0);

  const grandTotalIncomeTax = items.reduce((sum, item) => {
    const incomeTax = item.avIncomeTaxWithheld || calculateAvIncomeTaxWithheld(item);
    return sum + safeValue(incomeTax);
  }, 0);

  const grandTotalFurtherTax = items.reduce((sum, item) => {
    const furtherTax = item.avFurtherTax || calculateAvFurtherTax(item);
    return sum + safeValue(furtherTax);
  }, 0);
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#4a6fa5] border-3 rounded text-white">
          <tr>
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
            <th className="px-3 py-3 text-right text-xs font-medium uppercase tracking-wider">
              AV Tax & Duty
            </th>
            <th className="px-3 py-3 text-right text-xs font-medium uppercase tracking-wider">
              AV Income Tax
            </th>
            <th className="px-3 py-3 text-right text-xs font-medium uppercase tracking-wider">
              AV Further Tax
            </th>
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
              <td colSpan={onEditItem || onRemoveItem ? 8 : 7} className="px-3 py-8 text-center text-gray-500">
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
            <>
              {items.map((item) => {
                const avTaxDuty = item.avTaxAndDuty || calculateAvTotal(item);
                const avIncomeTax = item.avIncomeTaxWithheld || calculateAvIncomeTaxWithheld(item);
                const avFurtherTax = item.avFurtherTax || calculateAvFurtherTax(item);
                
                return (
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
                      {safeValue(item.assessableQuantity).toLocaleString('en-US', {maximumFractionDigits: 2})}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-gray-500 text-right">
                      {safeValue(item.assessableValue).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-right">
                      <span className="font-semibold text-green-600">
                        {safeValue(avTaxDuty).toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </span>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-right">
                      <span className="font-semibold text-orange-600">
                        {safeValue(avIncomeTax).toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </span>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-right">
                      <span className="font-semibold text-purple-600">
                        {safeValue(avFurtherTax).toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </span>
                    </td>
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
                );
              })}
              
              {/* Grand Total Row */}
              <tr className="bg-gray-100 font-bold border-t-2 border-gray-300">
                <td colSpan="4" className="px-3 py-4 text-right text-gray-700">
                  Grand Total:
                </td>
                <td className="px-3 py-4 text-right">
                  <span className="text-lg text-green-600">
                    {grandTotalAvTaxDuty.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </span>
                </td>
                <td className="px-3 py-4 text-right">
                  <span className="text-lg text-orange-600">
                    {grandTotalIncomeTax.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </span>
                </td>
                <td className="px-3 py-4 text-right">
                  <span className="text-lg text-purple-600">
                    {grandTotalFurtherTax.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </span>
                </td>
                {(onEditItem || onRemoveItem) && <td></td>}
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ItemsList;
