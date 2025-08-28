// import React, { use, useState } from 'react';

// let avv = {}

// const ItemDetails = ({
//   landedCost,
//   exchangeRate,
//   itemDetails,
//   onItemDetailChange,
//   onAddItem,
//   onCancelEdit,
//   isEditing,
//   saving
// }) => {
//   // const safeValue = (value) => {
//   //   if (typeof value === 'number') return value;
//   //   if (typeof value === 'string' && value !== '') return parseFloat(value);
//   //   return 0;
//   // };

//   // In ItemDetails component, update the safeValue function to handle both scenarios:

//   const safeValue = (value) => {
//     // Handle null/undefined
//     if (value === null || value === undefined) return 0;

//     // If it's already a number, return it
//     if (typeof value === 'number') return value;

//     // If it's a string, parse it
//     if (typeof value === 'string') {
//       const parsed = parseFloat(value);
//       return isNaN(parsed) ? 0 : parsed;
//     }

//     return 0;
//   };

// const num = 12345632
// const formatted = num.toLocaleString('en-US')
// console.log(formatted)
//   const [slaes_tax, setSales_tex] = useState(null);

//   // Calculate base values
//   // const AvPkr = exchangeRate * itemDetails.totalAssessableValue * landedCost;
//   // const DvPkr = exchangeRate * itemDetails.totalDeclaredValue * landedCost;

//   const totalAvPkr = exchangeRate * itemDetails.totalAssessableValue * (landedCost || 1.01);
//   const totalDvPkr = exchangeRate * itemDetails.totalDeclaredValue * (landedCost || 1.01);

//   // Determine which duty to use based on selection
//   const selectedAvDuty = itemDetails.isCustomDutySelected ?
//     (totalAvPkr * itemDetails.customDuty) / 100 :
//     (totalAvPkr * itemDetails.ftaCustomDuty) / 100;

//   const selectedDvDuty = itemDetails.isCustomDutySelected ?
//     (totalDvPkr * itemDetails.customDuty) / 100 :
//     (totalDvPkr * itemDetails.ftaCustomDuty) / 100;

//   // Calculate individual components with the selected duty
//   const Av_customDuty = itemDetails.isCustomDutySelected ? (totalAvPkr * itemDetails.customDuty) / 100 : 0;
//   const Av_ftaCustomDuty = itemDetails.isFtaCustomDutySelected ? (totalAvPkr * itemDetails.ftaCustomDuty) / 100 : 0;
//   const Av_acd = (totalAvPkr * itemDetails.acd) / 100;
//   const Av_rd = (totalAvPkr * itemDetails.rd) / 100;

//   // Use the selected duty in subsequent calculations
//   const Av_salesTax = ((totalAvPkr + selectedAvDuty + Av_acd + Av_rd) * itemDetails.salesTax) / 100;
//   const Av_additionalSalesTax = ((totalAvPkr + selectedAvDuty + Av_acd + Av_rd) * itemDetails.additionalSalesTax) / 100;
//   const Av_incomeTaxImport = ((totalAvPkr + selectedAvDuty + Av_acd + Av_rd + Av_salesTax + Av_additionalSalesTax) * itemDetails.incomeTaxImport) / 100;

//   // Calculate DV components
//   const Dv_customDuty = itemDetails.isCustomDutySelected ? (totalDvPkr * itemDetails.customDuty) / 100 : 0;
//   const Dv_ftaCustomDuty = itemDetails.isFtaCustomDutySelected ? (totalDvPkr * itemDetails.ftaCustomDuty) / 100 : 0;
//   const Dv_acd = (totalDvPkr * itemDetails.acd) / 100;
//   const Dv_rd = (totalDvPkr * itemDetails.rd) / 100;
//   const Dv_salesTax = ((totalDvPkr + selectedDvDuty + Dv_acd + Dv_rd) * itemDetails.salesTax) / 100;
//   const Dv_additionalSalesTax = ((totalDvPkr + selectedDvDuty + Dv_acd + Dv_rd) * itemDetails.additionalSalesTax) / 100;
//   const Dv_incomeTaxImport = ((totalDvPkr + selectedDvDuty + Dv_acd + Dv_rd + Dv_salesTax + Dv_additionalSalesTax) * itemDetails.incomeTaxImport) / 100;

//   // Add new calculations for Further Tax as requested
//   const astSalesTaxRatio = itemDetails.salesTax > 0 ?
//     (1 + (itemDetails.additionalSalesTax / itemDetails.salesTax)) : 1;

//   const Av_furtherTax = astSalesTaxRatio *
//     (totalAvPkr + selectedAvDuty + Av_acd + Av_rd) *
//     (itemDetails.furtherTax / 100);

//   const Dv_furtherTax = astSalesTaxRatio *
//     (totalDvPkr + selectedDvDuty + Dv_acd + Dv_rd) *
//     (itemDetails.furtherTax / 100);

//   // Add new calculations for Income Tax Withheld as requested
//   const Av_incomeTaxWithheld = astSalesTaxRatio *
//     (totalAvPkr + selectedAvDuty + Av_acd + Av_rd + Av_salesTax + Av_additionalSalesTax) *
//     (itemDetails.incomeTaxWithheld / 100);

//   const Dv_incomeTaxWithheld = astSalesTaxRatio *
//     (totalDvPkr + selectedDvDuty + Dv_acd + Dv_rd + Dv_salesTax + Dv_additionalSalesTax) *
//     (itemDetails.incomeTaxWithheld / 100);



//   // Total Duty and Tax
//   const Av_total = Av_acd + Av_additionalSalesTax +
//     (itemDetails.isCustomDutySelected ? Av_customDuty : Av_ftaCustomDuty) +
//     Av_rd + Av_salesTax + Av_incomeTaxImport;

//   // avv.value= Av_total
//   // console.log(avv.value)

//   // export const Av = () => {Av_total}
//   // console.log(itemDetails.isCustomDutySelected ? Av_customDuty : Av_ftaCustomDuty)
//   // console.log(Av_acd)
//   // console.log(Av_rd)
//   // console.log(Av_rd)
//   // console.log(Av_salesTax)
//   // console.log(Av_additionalSalesTax)

//   console.log(typeof (itemDetails.totalAssessableValue))

//   const Dv_total = Dv_acd + Dv_additionalSalesTax +
//     (itemDetails.isCustomDutySelected ? Dv_customDuty : Dv_ftaCustomDuty) +
//     Dv_rd + Dv_salesTax + Dv_incomeTaxImport;
//   // Update Grand Totals to include all taxes
//   const Av_GrandTotal = Av_total + Av_furtherTax + Av_incomeTaxWithheld
//   const Dv_GrandTotal = Dv_total + Dv_furtherTax + Dv_incomeTaxWithheld

//   // Handle duty type selection
//   const handleDutyTypeChange = (type) => {
//     if (type === 'custom') {
//       console.log('User selected Custom Duty with value:', itemDetails.customDuty + '%');
//       onItemDetailChange('isCustomDutySelected', true);
//       onItemDetailChange('isFtaCustomDutySelected', false);
//     } else {
//       console.log('User selected FTA Custom Duty with value:', itemDetails.ftaCustomDuty + '%');
//       onItemDetailChange('isCustomDutySelected', false);
//       onItemDetailChange('isFtaCustomDutySelected', true);
//     }
//   };

//   return (
//     <div className="bg-gray-50 p-4 rounded-md mb-6">
//       <h3 className="text-lg font-medium mb-4 text-[#4a6fa5]">
//         {isEditing ? `Edit Item: ${itemDetails.itemName}` : `Selected Item: ${itemDetails.itemName}`}
//       </h3>

//       <div className="space-y-4">
//         {/* HS Code and UOM in one row */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               HS Code
//             </label>
//             <input
//               type="text"
//               value={itemDetails.hsCode || ''}
//               disabled
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Unit of Measurement
//             </label>
//             <input
//               type="text"
//               value={itemDetails.Unit?.unit || itemDetails.uomCode || ''}
//               disabled
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
//             />
//           </div>
//         </div>

//         {/* Assessable values in one row */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Assessable Quantity
//             </label>
//             <input
//               type="number"
//               step="0.01"
//               min="0"
//               value={safeValue(itemDetails.assessableQuantity)}
//               onChange={(e) => onItemDetailChange('assessableQuantity', parseFloat(e.target.value))}
//               className="w-full px-3 text-right py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Assessable Value
//             </label>
//             <input
//               type="number"
//               step="0.01"
//               min="0"
//               value={safeValue(itemDetails.assessableValue)}
//               onChange={(e) => onItemDetailChange('assessableValue', parseFloat(e.target.value))}
//               className="w-full px-3 text-right py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Total Assessable Value
//             </label>
//             <input
//               type="number"
//               step="0.01"
//               min="0"
//               value={itemDetails.totalAssessableValue.toFixed(2)}
//               disabled
//               className="w-full px-3 text-right py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Total Assessable Value PKR
//             </label>
//             <input
//               type="number"
//               value={totalAvPkr.toFixed(2)}
//               disabled
//               className="w-full px-3 text-right py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
//             />
//           </div>
//         </div>

//         {/* Declared values in one row */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Declared Quantity
//             </label>
//             <input
//               type="number"
//               step="0.01"
//               min="0"
//               value={safeValue(itemDetails.declaredQuantity)}
//               onChange={(e) => onItemDetailChange('declaredQuantity', parseFloat(e.target.value))}
//               className="w-full px-3 text-right py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Declared Value
//             </label>
//             <input
//               type="number"
//               step="0.01"
//               min="0"
//               value={safeValue(itemDetails.declaredValue)}
//               onChange={(e) => onItemDetailChange('declaredValue', parseFloat(e.target.value))}
//               className="w-full px-3 text-right py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Total Declared Value
//             </label>
//             <input
//               type="number"
//               step="0.01"
//               min="0"
//               value={safeValue(itemDetails.totalDeclaredValue || itemDetails.totalDutyValue).toFixed(2)}
//               disabled
//               className="w-full px-3 text-right py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Total Declared Value PKR
//             </label>
//             <input
//               type="number"
//               step="0.01"
//               min="0"
//               value={totalDvPkr.toFixed(2)}
//               disabled
//               className="w-full px-3 text-right py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
//             />
//           </div>
//         </div>

//         {/* Tax rates section with columns */}
//         <div className="mb-6">
//           <div className="grid grid-cols-3 gap-4 mb-2 bg-[#4a6fa5] text-white p-2 rounded">
//             <div className="text-sm font-bold">Name</div>
//             <div className="text-sm font-bold text-center">Value AV</div>
//             <div className="text-sm font-bold text-center">Value DV</div>
//           </div>

//           {/* Custom Duty Row with Radio */}
//           <div className="grid grid-cols-3 gap-4 mb-2 items-center">
//             <div className="flex items-center">
//               <div
//                 onClick={() => handleDutyTypeChange('custom')}
//                 className={`w-5 h-5 flex-shrink-0 rounded-full border mr-2 cursor-pointer flex items-center justify-center ${itemDetails.isCustomDutySelected ? "border-[#4a6fa5] bg-[#f0f5fa]" : "border-gray-400"
//                   }`}
//               >
//                 {itemDetails.isCustomDutySelected && (
//                   <div className="w-3 h-3 bg-[#4a6fa5] rounded-full"></div>
//                 )}
//               </div>
//               <label
//                 htmlFor="customDuty"
//                 className={`text-sm mr-2 w-32 cursor-pointer ${itemDetails.isCustomDutySelected ? "text-[#4a6fa5] font-medium" : "text-gray-700"
//                   }`}
//                 onClick={() => handleDutyTypeChange('custom')}
//               >
//                 Custom Duty
//               </label>
//               <div className='flex items-center'>
//                 <input
//                   type="number"
//                   step="0.01"
//                   value={safeValue(itemDetails.customDuty)}
//                   onChange={(e) => onItemDetailChange('customDuty', parseFloat(e.target.value))}
//                   className={`flex-1 px-2 py-1 border rounded-md shadow-sm focus:outline-none text-right ${itemDetails.isCustomDutySelected
//                     ? "border-[#4a6fa5] focus:ring-[#4a6fa5] focus:border-[#4a6fa5]"
//                     : "border-gray-300 bg-gray-50 text-gray-500"
//                     }`}
//                   disabled={!itemDetails.isCustomDutySelected}
//                 /><span className='ml-2'>%</span>
//               </div>

//             </div>
//             <div>
//               <input
//                 type="number"
//                 step="0.01"
//                 value={Av_customDuty.toFixed(2)}
//                 disabled
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-right bg-gray-100"
//               />
//             </div>
//             <div>
//               <input
//                 type="number"
//                 step="0.01"
//                 value={Dv_customDuty.toFixed(2)}
//                 disabled
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-right bg-gray-100"
//               />
//             </div>
//           </div>

//           {/* FTA Custom Duty Row with Radio */}
//           <div className="grid grid-cols-3 gap-4 mb-2 items-center">
//             <div className="flex items-center">
//               <div
//                 onClick={() => handleDutyTypeChange('fta')}
//                 className={`w-5 h-5 flex-shrink-0 rounded-full border mr-2 cursor-pointer flex items-center justify-center ${itemDetails.isFtaCustomDutySelected ? "border-[#4a6fa5] bg-[#f0f5fa]" : "border-gray-400"
//                   }`}
//               >
//                 {itemDetails.isFtaCustomDutySelected && (
//                   <div className="w-3 h-3 bg-[#4a6fa5] rounded-full"></div>
//                 )}
//               </div>
//               <label
//                 htmlFor="ftaCustomDuty"
//                 className={`text-sm mr-2 w-32 cursor-pointer ${itemDetails.isFtaCustomDutySelected ? "text-[#4a6fa5] font-medium" : "text-gray-700"
//                   }`}
//                 onClick={() => handleDutyTypeChange('fta')}
//               >
//                 FTA Custom Duty
//               </label>
//               <div className='flex items-center'>
//                 <input
//                   type="number"
//                   step="0.01"
//                   value={safeValue(itemDetails.ftaCustomDuty)}
//                   onChange={(e) => onItemDetailChange('ftaCustomDuty', parseFloat(e.target.value))}
//                   className={`flex-1 px-2 py-1 border rounded-md shadow-sm focus:outline-none text-right ${itemDetails.isFtaCustomDutySelected
//                     ? "border-[#4a6fa5] focus:ring-[#4a6fa5] focus:border-[#4a6fa5]"
//                     : "border-gray-300 bg-gray-50 text-gray-500"
//                     }`}
//                   disabled={!itemDetails.isFtaCustomDutySelected}
//                 />
//                 <span className=' ml-2'>%</span>
//               </div>
//             </div>
//             <div>
//               <input
//                 type="number"
//                 step="0.01"
//                 value={Av_ftaCustomDuty.toFixed(2)}
//                 disabled
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right"
//               />
//             </div>
//             <div>
//               <input
//                 type="number"
//                 step="0.01"
//                 value={Dv_ftaCustomDuty.toFixed(2)}
//                 disabled
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right"
//               />
//             </div>
//           </div>

//           {/* ACD Row */}
//           <div className="grid grid-cols-3 gap-4 mb-2 items-center">
//             <div className="flex items-center">
//               <span className="text-sm text-gray-700 mr-2 w-32 ml-6">ACD </span>
//               <div className='flex items-center'>
//                 <input
//                   type="number"
//                   step="0.01"
//                   value={safeValue(itemDetails.acd)}
//                   onChange={(e) => onItemDetailChange('acd', parseFloat(e.target.value))}
//                   className="flex-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 text-right focus:b9rd focus:border-2er-blue-500"
//                 />
//                 <span className='ml-2'>%</span>
//               </div>

//             </div>
//             <div>
//               <input
//                 type="number"
//                 step="0.01"
//                 value={Av_acd.toFixed(2)}
//                 disabled
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right"
//               />
//             </div>
//             <div>
//               <input
//                 type="number"
//                 step="0.01"
//                 value={Dv_acd.toFixed(2)}
//                 disabled
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right"
//               />
//             </div>
//           </div>

//           {/* RD Row */}
//           <div className="grid grid-cols-3 gap-4 mb-2 items-center">
//             <div className="flex items-center">
//               <span className="text-sm text-gray-700 mr-2 w-32 ml-6">RD </span>
//               <div className='flex items-center'>
//                 <input
//                   type="number"
//                   step="0.01"
//                   value={itemDetails.rd}
//                   onChange={(e) => onItemDetailChange('rd', parseFloat(e.target.value))}
//                   className="flex-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 text-right focus:b9rd focus:border-2er-blue-500"
//                 />
//                 <span className='ml-2'>%</span>
//               </div>

//             </div>
//             <div>
//               <input
//                 type="number"
//                 step="0.01"
//                 value={Av_rd.toFixed(2)}
//                 disabled
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right"
//               />
//             </div>
//             <div>
//               <input
//                 type="number"
//                 step="0.01"
//                 value={Dv_rd.toFixed(2)}
//                 disabled
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right"
//               />
//             </div>
//           </div>

//           {/* Sales Tax Row */}
//           <div className="grid grid-cols-3 gap-4 mb-2 items-center">
//             <div className="flex items-center">
//               <span className="text-sm text-gray-700 mr-2 w-32 ml-6">Sales Tax </span>
//               <div className='flex items-center'>
//                 <input
//                   type="number"
//                   step="0.01"
//                   value={safeValue(itemDetails.salesTax)}
//                   onChange={(e) => onItemDetailChange('salesTax', parseFloat(e.target.value))}
//                   className="flex-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 text-right focus:b9rd focus:border-2er-blue-500"
//                 />
//                 <span className='ml-2'>%</span>

//               </div>

//             </div>
//             <div>
//               <input
//                 type="number"
//                 step="0.01"
//                 value={Av_salesTax.toFixed(2)}
//                 disabled
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right"
//               />
//             </div>
//             <div>
//               <input
//                 type="number"
//                 step="0.01"
//                 value={Dv_salesTax.toFixed(2)}
//                 disabled
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right"
//               />
//             </div>
//           </div>

//           {/* Additional Sales Tax Row */}
//           <div className="grid grid-cols-3 gap-4 mb-2 items-center">
//             <div className="flex items-center">
//               <span className="text-sm text-gray-700 mr-2 w-32 ml-6">Additional Sales Tax </span>
//               <div className='flex items-center'>
//                 <input
//                   type="number"
//                   step="0.01"
//                   value={safeValue(itemDetails.additionalSalesTax)}
//                   onChange={(e) => onItemDetailChange('additionalSalesTax', parseFloat(e.target.value))}
//                   className="flex-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 text-right focus:b9rd focus:border-2er-blue-500"
//                 />
//                 <span className='ml-2'>%</span>
//               </div>

//             </div>
//             <div>
//               <input
//                 type="number"
//                 step="0.01"
//                 value={Av_additionalSalesTax.toFixed(2)}
//                 disabled
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right"
//               />
//             </div>
//             <div>
//               <input
//                 type="number"
//                 step="0.01"
//                 value={Dv_additionalSalesTax.toFixed(2)}
//                 disabled
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right"
//               />
//             </div>
//           </div>

//           {/* Income Tax Import Row */}
//           <div className="grid grid-cols-3 gap-4 mb-2 items-center">
//             <div className="flex items-center">
//               <span className="text-sm text-gray-700 mr-2 w-32 ml-6">Income Tax Import </span>
//               <div className='flex items-center'>
//                 <input
//                   type="number"
//                   step="0.01"
//                   value={safeValue(itemDetails.incomeTaxImport)}
//                   onChange={(e) => onItemDetailChange('incomeTaxImport', parseFloat(e.target.value))}
//                   className="flex-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 text-right focus:b9rd focus:border-2er-blue-500"
//                 />
//                 <span className='ml-2'>
//                   %
//                 </span>
//               </div>

//             </div>
//             <div>
//               <input
//                 type="number"
//                 step="0.01"
//                 value={Av_incomeTaxImport.toFixed(2)}
//                 disabled
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right"
//               />
//             </div>
//             <div>
//               <input
//                 type="number"
//                 step="0.01"
//                 value={Dv_incomeTaxImport.toFixed(2)}
//                 disabled
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right"
//               />
//             </div>
//           </div>


//           {/* Total Duty and Tax Row */}
//           <div className="grid grid-cols-3 gap-4 mb-2 items-center bg-blue-50 p-2 rounded">
//             <div className="text-sm font-bold text-gray-700">Total Duty and Tax </div>
//             <div className='flex items-center'>
//               <input
//                 type="number"
//                 step="0.01"
//                 value={(Av_total).toFixed(2)}
//                 disabled
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right font-bold"
//               />
//             </div>
//             <div>
//               <input
//                 type="number"
//                 step="0.01"
//                 value={(Dv_total).toFixed(2)}
//                 disabled
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right font-bold"
//               />
//             </div>
//           </div>



//           {/* Further Tax Row */}
//           <div className="grid grid-cols-3 gap-4 mb-2 items-center">
//             <div className="flex items-center">
//               <span className="text-sm text-gray-700 mr-2 w-32 ml-6">Further Tax </span>
//               <div className='flex items-center'>
//                 <input
//                   type="number"
//                   step="0.01"
//                   value={safeValue(itemDetails.furtherTax)}
//                   onChange={(e) => onItemDetailChange('furtherTax', parseFloat(e.target.value))}
//                   className="flex-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 text-right focus:b9rd focus:border-2er-blue-500"
//                 />
//                 <span className='ml-2'>%</span>
//               </div>

//             </div>
//             <div>
//               <input
//                 type="number"
//                 step="0.01"
//                 value={Av_furtherTax.toFixed(2)}
//                 disabled
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right"
//               />
//             </div>
//             <div>
//               <input
//                 type="number"
//                 step="0.01"
//                 value={Dv_furtherTax.toFixed(2)}
//                 disabled
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right"
//               />
//             </div>
//           </div>

//           {/* Income Tax Withheld Row */}
//           <div className="grid grid-cols-3 gap-4 mb-2 items-center">
//             <div className="flex items-center">
//               <span className="text-sm text-gray-700 w-[105px] ml-6">Income Tax Withheld </span>
//               <div>
//                 <input
//                   type="number"
//                   step="0.01"
//                   value={safeValue(itemDetails.incomeTaxWithheld)}
//                   onChange={(e) => onItemDetailChange('incomeTaxWithheld', parseFloat(e.target.value))}
//                   className="flex-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 text-right focus:b9rd focus:border-2er-blue-500"
//                 />
//                 <span className='ml-2'>
//                   %
//                 </span>
//               </div>

//             </div>
//             <div>
//               <input
//                 type="number"
//                 step="0.01"
//                 value={Av_incomeTaxWithheld.toFixed(2)}
//                 disabled
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right"
//               />
//             </div>
//             <div>
//               <input
//                 type="number"
//                 step="0.01"
//                 value={Dv_incomeTaxWithheld.toFixed(2)}
//                 disabled
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right"
//               />
//             </div>
//           </div>


//           {/* Grand Total Row */}
//           <div className="grid grid-cols-3 gap-4 mb-2 items-center bg-green-50 p-2 rounded">
//             <div className="text-sm font-bold text-gray-700">Grand Total</div>
//             <div>
//               <input
//                 type="number"
//                 step="0.01"
//                 value={Av_GrandTotal.toFixed(2)}
//                 disabled
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right font-bold"
//               />
//             </div>
//             <div>
//               <input
//                 type="number"
//                 step="0.01"
//                 value={Dv_GrandTotal.toFixed(2)}
//                 disabled
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right font-bold"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Remarks */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Remarks
//           </label>
//           <textarea
//             rows={2}
//             value={itemDetails.remarks || ''}
//             onChange={(e) => onItemDetailChange('remarks', e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900 focus:border-2"
//           />
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-end space-x-3">
//           {onCancelEdit && (
//             <button
//               type="button"
//               onClick={onCancelEdit}
//               className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
//             >
//               Cancel
//             </button>
//           )}

//           <button
//             type="button"
//             onClick={onAddItem}
//             disabled={saving}
//             className="px-4 py-2 bg-[#4a6fa5] text-white rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
//           >
//             {saving ? 'Processing...' : isEditing ? 'Update Item' : 'Add Item'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };



// console.log(avv.value)
// export default ItemDetails;









































































import React, { useState } from 'react';

let avv = {}

const ItemDetails = ({
  landedCost,
  exchangeRate,
  itemDetails,
  onItemDetailChange,
  onAddItem,
  onCancelEdit,
  isEditing,
  saving
}) => {

  // Format number with commas
  const formatNumber = (value, decimals = 2) => {
    const num = typeof value === 'number' ? value : parseFloat(value) || 0;
    return num.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };

  // Safe value function
  const safeValue = (value) => {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  // Handle number input focus (remove formatting for editing)
  const handleNumberFocus = (e) => {
    const value = e.target.value.replace(/,/g, '');
    e.target.value = value;
  };

  // Handle number input blur (add formatting after editing)
  const handleNumberBlur = (e, fieldName) => {
    const value = parseFloat(e.target.value.replace(/,/g, '')) || 0;
    onItemDetailChange(fieldName, value);
  };

  const [sales_tax, setSales_tex] = useState(null);

  // Calculate base values
  const totalAvPkr = exchangeRate * safeValue(itemDetails.totalAssessableValue) * (landedCost || 1.01);
  const totalDvPkr = exchangeRate * safeValue(itemDetails.totalDeclaredValue) * (landedCost || 1.01);

  // Determine which duty to use based on selection
  const selectedAvDuty = itemDetails.isCustomDutySelected ?
    (totalAvPkr * safeValue(itemDetails.customDuty)) / 100 :
    (totalAvPkr * safeValue(itemDetails.ftaCustomDuty)) / 100;

  const selectedDvDuty = itemDetails.isCustomDutySelected ?
    (totalDvPkr * safeValue(itemDetails.customDuty)) / 100 :
    (totalDvPkr * safeValue(itemDetails.ftaCustomDuty)) / 100;

  // Calculate individual components with the selected duty
  const Av_customDuty = itemDetails.isCustomDutySelected ? (totalAvPkr * safeValue(itemDetails.customDuty)) / 100 : 0;
  const Av_ftaCustomDuty = itemDetails.isFtaCustomDutySelected ? (totalAvPkr * safeValue(itemDetails.ftaCustomDuty)) / 100 : 0;
  const Av_acd = (totalAvPkr * safeValue(itemDetails.acd)) / 100;
  const Av_rd = (totalAvPkr * safeValue(itemDetails.rd)) / 100;

  // Use the selected duty in subsequent calculations
  const Av_salesTax = ((totalAvPkr + selectedAvDuty + Av_acd + Av_rd) * safeValue(itemDetails.salesTax)) / 100;
  const Av_additionalSalesTax = ((totalAvPkr + selectedAvDuty + Av_acd + Av_rd) * safeValue(itemDetails.additionalSalesTax)) / 100;
  const Av_incomeTaxImport = ((totalAvPkr + selectedAvDuty + Av_acd + Av_rd + Av_salesTax + Av_additionalSalesTax) * safeValue(itemDetails.incomeTaxImport)) / 100;

  // Calculate DV components
  const Dv_customDuty = itemDetails.isCustomDutySelected ? (totalDvPkr * safeValue(itemDetails.customDuty)) / 100 : 0;
  const Dv_ftaCustomDuty = itemDetails.isFtaCustomDutySelected ? (totalDvPkr * safeValue(itemDetails.ftaCustomDuty)) / 100 : 0;
  const Dv_acd = (totalDvPkr * safeValue(itemDetails.acd)) / 100;
  const Dv_rd = (totalDvPkr * safeValue(itemDetails.rd)) / 100;
  const Dv_salesTax = ((totalDvPkr + selectedDvDuty + Dv_acd + Dv_rd) * safeValue(itemDetails.salesTax)) / 100;
  const Dv_additionalSalesTax = ((totalDvPkr + selectedDvDuty + Dv_acd + Dv_rd) * safeValue(itemDetails.additionalSalesTax)) / 100;
  const Dv_incomeTaxImport = ((totalDvPkr + selectedDvDuty + Dv_acd + Dv_rd + Dv_salesTax + Dv_additionalSalesTax) * safeValue(itemDetails.incomeTaxImport)) / 100;

  // Add new calculations for Further Tax as requested
  const astSalesTaxRatio = safeValue(itemDetails.salesTax) > 0 ?
    (1 + (safeValue(itemDetails.additionalSalesTax) / safeValue(itemDetails.salesTax))) : 1;

  const Av_furtherTax = astSalesTaxRatio *
    (totalAvPkr + selectedAvDuty + Av_acd + Av_rd) *
    (safeValue(itemDetails.furtherTax) / 100);

  const Dv_furtherTax = astSalesTaxRatio *
    (totalDvPkr + selectedDvDuty + Dv_acd + Dv_rd) *
    (safeValue(itemDetails.furtherTax) / 100);

  // Add new calculations for Income Tax Withheld as requested
  const Av_incomeTaxWithheld = astSalesTaxRatio *
    (totalAvPkr + selectedAvDuty + Av_acd + Av_rd + Av_salesTax + Av_additionalSalesTax) *
    (safeValue(itemDetails.incomeTaxWithheld) / 100);

  const Dv_incomeTaxWithheld = astSalesTaxRatio *
    (totalDvPkr + selectedDvDuty + Dv_acd + Dv_rd + Dv_salesTax + Dv_additionalSalesTax) *
    (safeValue(itemDetails.incomeTaxWithheld) / 100);

  // Total Duty and Tax
  const Av_total = Av_acd + Av_additionalSalesTax +
    (itemDetails.isCustomDutySelected ? Av_customDuty : Av_ftaCustomDuty) +
    Av_rd + Av_salesTax + Av_incomeTaxImport;

  const Dv_total = Dv_acd + Dv_additionalSalesTax +
    (itemDetails.isCustomDutySelected ? Dv_customDuty : Dv_ftaCustomDuty) +
    Dv_rd + Dv_salesTax + Dv_incomeTaxImport;

  // Update Grand Totals to include all taxes
  const Av_GrandTotal = Av_total + Av_furtherTax + Av_incomeTaxWithheld;
  const Dv_GrandTotal = Dv_total + Dv_furtherTax + Dv_incomeTaxWithheld;

  // Handle duty type selection
  const handleDutyTypeChange = (type) => {
    if (type === 'custom') {
      console.log('User selected Custom Duty with value:', itemDetails.customDuty + '%');
      onItemDetailChange('isCustomDutySelected', true);
      onItemDetailChange('isFtaCustomDutySelected', false);
    } else {
      console.log('User selected FTA Custom Duty with value:', itemDetails.ftaCustomDuty + '%');
      onItemDetailChange('isCustomDutySelected', false);
      onItemDetailChange('isFtaCustomDutySelected', true);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md mb-6">
      <h3 className="text-lg font-medium mb-4 text-[#4a6fa5]">
        {isEditing ? `Edit Item: ${itemDetails.itemName}` : `Selected Item: ${itemDetails.itemName}`}
      </h3>

      <div className="space-y-4">
        {/* HS Code and UOM in one row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              HS Code
            </label>
            <input
              type="text"
              value={itemDetails.hsCode || ''}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit of Measurement
            </label>
            <input
              type="text"
              value={itemDetails.Unit?.unit || itemDetails.uomCode || ''}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
            />
          </div>
        </div>

        {/* Assessable values in one row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assessable Quantity
            </label>
            <input
              type="text"
              value={formatNumber(safeValue(itemDetails.assessableQuantity))}
              onFocus={handleNumberFocus}
              onBlur={(e) => handleNumberBlur(e, 'assessableQuantity')}
              onChange={(e) => {
                const value = e.target.value.replace(/,/g, '');
                if (!isNaN(value) || value === '' || value === '-') {
                  onItemDetailChange('assessableQuantity', parseFloat(value) || 0);
                }
              }}
              className="w-full px-3 text-right py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assessable Value
            </label>
            <input
              type="text"
              value={formatNumber(safeValue(itemDetails.assessableValue))}
              onFocus={handleNumberFocus}
              onBlur={(e) => handleNumberBlur(e, 'assessableValue')}
              onChange={(e) => {
                const value = e.target.value.replace(/,/g, '');
                if (!isNaN(value) || value === '' || value === '-') {
                  onItemDetailChange('assessableValue', parseFloat(value) || 0);
                }
              }}
              className="w-full px-3 text-right py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Assessable Value
            </label>
            <input
              type="text"
              value={formatNumber(safeValue(itemDetails.totalAssessableValue))}
              disabled
              className="w-full px-3 text-right py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Assessable Value PKR
            </label>
            <input
              type="text"
              value={formatNumber(totalAvPkr)}
              disabled
              className="w-full px-3 text-right py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
            />
          </div>
        </div>

        {/* Declared values in one row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Declared Quantity
            </label>
            <input
              type="text"
              value={formatNumber(safeValue(itemDetails.declaredQuantity))}
              onFocus={handleNumberFocus}
              onBlur={(e) => handleNumberBlur(e, 'declaredQuantity')}
              onChange={(e) => {
                const value = e.target.value.replace(/,/g, '');
                if (!isNaN(value) || value === '' || value === '-') {
                  onItemDetailChange('declaredQuantity', parseFloat(value) || 0);
                }
              }}
              className="w-full px-3 text-right py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Declared Value
            </label>
            <input
              type="text"
              value={formatNumber(safeValue(itemDetails.declaredValue))}
              onFocus={handleNumberFocus}
              onBlur={(e) => handleNumberBlur(e, 'declaredValue')}
              onChange={(e) => {
                const value = e.target.value.replace(/,/g, '');
                if (!isNaN(value) || value === '' || value === '-') {
                  onItemDetailChange('declaredValue', parseFloat(value) || 0);
                }
              }}
              className="w-full px-3 text-right py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Declared Value
            </label>
            <input
              type="text"
              value={formatNumber(safeValue(itemDetails.totalDeclaredValue || itemDetails.totalDutyValue))}
              disabled
              className="w-full px-3 text-right py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Declared Value PKR
            </label>
            <input
              type="text"
              value={formatNumber(totalDvPkr)}
              disabled
              className="w-full px-3 text-right py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
            />
          </div>
        </div>

        {/* Tax rates section with columns */}
        <div className="mb-6">
          <div className="grid grid-cols-3 gap-4 mb-2 bg-[#4a6fa5] text-white p-2 rounded">
            <div className="text-sm font-bold">Name</div>
            <div className="text-sm font-bold text-center">Value AV</div>
            <div className="text-sm font-bold text-center">Value DV</div>
          </div>

          {/* Custom Duty Row with Radio */}
          <div className="grid grid-cols-3 gap-4 mb-2 items-center">
            <div className="flex items-center">
              <div
                onClick={() => handleDutyTypeChange('custom')}
                className={`w-5 h-5 flex-shrink-0 rounded-full border mr-2 cursor-pointer flex items-center justify-center ${itemDetails.isCustomDutySelected ? "border-[#4a6fa5] bg-[#f0f5fa]" : "border-gray-400"
                  }`}
              >
                {itemDetails.isCustomDutySelected && (
                  <div className="w-3 h-3 bg-[#4a6fa5] rounded-full"></div>
                )}
              </div>
              <label
                htmlFor="customDuty"
                className={`text-sm mr-2 w-32 cursor-pointer ${itemDetails.isCustomDutySelected ? "text-[#4a6fa5] font-medium" : "text-gray-700"
                  }`}
                onClick={() => handleDutyTypeChange('custom')}
              >
                Custom Duty
              </label>
              <div className='flex items-center'>
                <input
                  type="number"
                  step="0.01"
                  value={safeValue(itemDetails.customDuty)}
                  onChange={(e) => onItemDetailChange('customDuty', parseFloat(e.target.value))}
                  className={`flex-1 px-2 py-1 border rounded-md shadow-sm focus:outline-none text-right ${itemDetails.isCustomDutySelected
                      ? "border-[#4a6fa5] focus:ring-[#4a6fa5] focus:border-[#4a6fa5]"
                      : "border-gray-300 bg-gray-50 text-gray-500"
                    }`}
                  disabled={!itemDetails.isCustomDutySelected}
                />
                <span className='ml-2'>%</span>
              </div>
            </div>
            <div>
              <input
                type="text"
                value={formatNumber(Av_customDuty)}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-right bg-gray-100"
              />
            </div>
            <div>
              <input
                type="text"
                value={formatNumber(Dv_customDuty)}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-right bg-gray-100"
              />
            </div>
          </div>

          {/* FTA Custom Duty Row with Radio */}
          <div className="grid grid-cols-3 gap-4 mb-2 items-center">
            <div className="flex items-center">
              <div
                onClick={() => handleDutyTypeChange('fta')}
                className={`w-5 h-5 flex-shrink-0 rounded-full border mr-2 cursor-pointer flex items-center justify-center ${itemDetails.isFtaCustomDutySelected ? "border-[#4a6fa5] bg-[#f0f5fa]" : "border-gray-400"
                  }`}
              >
                {itemDetails.isFtaCustomDutySelected && (
                  <div className="w-3 h-3 bg-[#4a6fa5] rounded-full"></div>
                )}
              </div>
              <label
                htmlFor="ftaCustomDuty"
                className={`text-sm mr-2 w-32 cursor-pointer ${itemDetails.isFtaCustomDutySelected ? "text-[#4a6fa5] font-medium" : "text-gray-700"
                  }`}
                onClick={() => handleDutyTypeChange('fta')}
              >
                FTA Custom Duty
              </label>
              <div className='flex items-center'>
                <input
                  type="number"
                  step="0.01"
                  value={safeValue(itemDetails.ftaCustomDuty)}
                  onChange={(e) => onItemDetailChange('ftaCustomDuty', parseFloat(e.target.value))}
                  className={`flex-1 px-2 py-1 border rounded-md shadow-sm focus:outline-none text-right ${itemDetails.isFtaCustomDutySelected
                      ? "border-[#4a6fa5] focus:ring-[#4a6fa5] focus:border-[#4a6fa5]"
                      : "border-gray-300 bg-gray-50 text-gray-500"
                    }`}
                  disabled={!itemDetails.isFtaCustomDutySelected}
                />
                <span className='ml-2'>%</span>
              </div>
            </div>
            <div>
              <input
                type="text"
                value={formatNumber(Av_ftaCustomDuty)}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right"
              />
            </div>
            <div>
              <input
                type="text"
                value={formatNumber(Dv_ftaCustomDuty)}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right"
              />
            </div>
          </div>

          {/* ACD Row */}
          <div className="grid grid-cols-3 gap-4 mb-2 items-center">
            <div className="flex items-center">
              <span className="text-sm text-gray-700 mr-2 w-32 ml-6">ACD </span>
              <div className='flex items-center'>
                <input
                  type="number"
                  step="0.01"
                  value={safeValue(itemDetails.acd)}
                  onChange={(e) => onItemDetailChange('acd', parseFloat(e.target.value))}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 text-right focus:border-blue-500"
                />
                <span className='ml-2'>%</span>
              </div>
            </div>
            <div>
              <input
                type="text"
                value={formatNumber(Av_acd)}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right"
              />
            </div>
            <div>
              <input
                type="text"
                value={formatNumber(Dv_acd)}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right"
              />
            </div>
          </div>

          {/* RD Row */}
          <div className="grid grid-cols-3 gap-4 mb-2 items-center">
            <div className="flex items-center">
              <span className="text-sm text-gray-700 mr-2 w-32 ml-6">RD </span>
              <div className='flex items-center'>
                <input
                  type="number"
                  step="0.01"
                  value={safeValue(itemDetails.rd)}
                  onChange={(e) => onItemDetailChange('rd', parseFloat(e.target.value))}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 text-right focus:border-blue-500"
                />
                <span className='ml-2'>%</span>
              </div>
            </div>
            <div>
              <input
                type="text"
                value={formatNumber(Av_rd)}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right"
              />
            </div>
            <div>
              <input
                type="text"
                value={formatNumber(Dv_rd)}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right"
              />
            </div>
          </div>

          {/* Sales Tax Row */}
          <div className="grid grid-cols-3 gap-4 mb-2 items-center">
            <div className="flex items-center">
              <span className="text-sm text-gray-700 mr-2 w-32 ml-6">Sales Tax </span>
              <div className='flex items-center'>
                <input
                  type="number"
                  step="0.01"
                  value={safeValue(itemDetails.salesTax)}
                  onChange={(e) => onItemDetailChange('salesTax', parseFloat(e.target.value))}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 text-right focus:border-blue-500"
                />
                <span className='ml-2'>%</span>
              </div>
            </div>
            <div>
              <input
                type="text"
                value={formatNumber(Av_salesTax)}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right"
              />
            </div>
            <div>
              <input
                type="text"
                value={formatNumber(Dv_salesTax)}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right"
              />
            </div>
          </div>

          {/* Additional Sales Tax Row */}
          <div className="grid grid-cols-3 gap-4 mb-2 items-center">
            <div className="flex items-center">
              <span className="text-sm text-gray-700 mr-2 w-32 ml-6">Additional Sales Tax </span>
              <div className='flex items-center'>
                <input
                  type="number"
                  step="0.01"
                  value={safeValue(itemDetails.additionalSalesTax)}
                  onChange={(e) => onItemDetailChange('additionalSalesTax', parseFloat(e.target.value))}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 text-right focus:border-blue-500"
                />
                <span className='ml-2'>%</span>
              </div>
            </div>
            <div>
              <input
                type="text"
                value={formatNumber(Av_additionalSalesTax)}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right"
              />
            </div>
            <div>
              <input
                type="text"
                value={formatNumber(Dv_additionalSalesTax)}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right"
              />
            </div>
          </div>

          {/* Income Tax Import Row */}
          <div className="grid grid-cols-3 gap-4 mb-2 items-center">
            <div className="flex items-center">
              <span className="text-sm text-gray-700 mr-2 w-32 ml-6">Income Tax Import </span>
              <div className='flex items-center'>
                <input
                  type="number"
                  step="0.01"
                  value={safeValue(itemDetails.incomeTaxImport)}
                  onChange={(e) => onItemDetailChange('incomeTaxImport', parseFloat(e.target.value))}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 text-right focus:border-blue-500"
                />
                <span className='ml-2'>%</span>
              </div>
            </div>
            <div>
              <input
                type="text"
                value={formatNumber(Av_incomeTaxImport)}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right"
              />
            </div>
            <div>
              <input
                type="text"
                value={formatNumber(Dv_incomeTaxImport)}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right"
              />
            </div>
          </div>

          {/* Total Duty and Tax Row */}
          <div className="grid grid-cols-3 gap-4 mb-2 items-center bg-blue-50 p-2 rounded">
            <div className="text-sm font-bold text-gray-700">Total Duty and Tax </div>
            <div className='flex items-center'>
              <input
                type="text"
                value={formatNumber(Av_total)}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right font-bold"
              />
            </div>
            <div>
              <input
                type="text"
                value={formatNumber(Dv_total)}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right font-bold"
              />
            </div>
          </div>

          {/* Further Tax Row */}
          <div className="grid grid-cols-3 gap-4 mb-2 items-center">
            <div className="flex items-center">
              <span className="text-sm text-gray-700 mr-2 w-32 ml-6">Further Tax </span>
              <div className='flex items-center'>
                <input
                  type="number"
                  step="0.01"
                  value={safeValue(itemDetails.furtherTax)}
                  onChange={(e) => onItemDetailChange('furtherTax', parseFloat(e.target.value))}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 text-right focus:border-blue-500"
                />
                <span className='ml-2'>%</span>
              </div>
            </div>
            <div>
              <input
                type="text"
                value={formatNumber(Dv_furtherTax)}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right"
              />
            </div>
          </div>

          {/* Income Tax Withheld Row */}
          <div className="grid grid-cols-3 gap-4 mb-2 items-center">
            <div className="flex items-center">
              <span className="text-sm text-gray-700 w-[105px] ml-6">Income Tax Withheld </span>
              <div className='flex items-center'>
                <input
                  type="number"
                  step="0.01"
                  value={safeValue(itemDetails.incomeTaxWithheld)}
                  onChange={(e) => onItemDetailChange('incomeTaxWithheld', parseFloat(e.target.value))}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 text-right focus:border-blue-500"
                />
                <span className='ml-2'>%</span>
              </div>
            </div>
            <div>
              <input
                type="text"
                value={formatNumber(Av_incomeTaxWithheld)}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right"
              />
            </div>
            <div>
              <input
                type="text"
                value={formatNumber(Dv_incomeTaxWithheld)}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right"
              />
            </div>
          </div>

          {/* Grand Total Row */}
          <div className="grid grid-cols-3 gap-4 mb-2 items-center bg-green-50 p-2 rounded">
            <div className="text-sm font-bold text-gray-700">Grand Total</div>
            <div>
              <input
                type="text"
                value={formatNumber(Av_GrandTotal)}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right font-bold"
              />
            </div>
            <div>
              <input
                type="text"
                value={formatNumber(Dv_GrandTotal)}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-right font-bold"
              />
            </div>
          </div>
        </div>

        {/* Remarks */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Remarks
          </label>
          <textarea
            rows={2}
            value={itemDetails.remarks || ''}
            onChange={(e) => onItemDetailChange('remarks', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900 focus:border-2"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          {onCancelEdit && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          )}

          <button
            type="button"
            onClick={onAddItem}
            disabled={saving}
            className="px-4 py-2 bg-[#4a6fa5] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {saving ? 'Processing...' : isEditing ? 'Update Item' : 'Add Item'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;

