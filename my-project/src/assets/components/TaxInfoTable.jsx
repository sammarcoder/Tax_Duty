// import React, { useState, useEffect, useMemo } from 'react';

// export default function TaxInfoTable() {
//   const [taxData, setTaxData] = useState([]);
//   const [unitOptions, setUnitOptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editingId, setEditingId] = useState(null);
//   const [editFormData, setEditFormData] = useState(null);
//   const [notification, setNotification] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showConfirmDelete, setShowConfirmDelete] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [sortField, setSortField] = useState("hsCode");
//   const [sortDirection, setSortDirection] = useState("asc");

//   const ITEMS_PER_PAGE = 5;

//   // Fetch tax data
//   const fetchTaxData = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('http://localhost:5000/api/v1/taxInfo');
//       if (!response.ok) throw new Error(`API Error: ${response.status}`);
//       const data = await response.json();
//       setTaxData(data);
//     } catch (err) {
//       setError(err.message);
//       showNotification('error', `Failed to load data: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch unit options
//   const fetchUnits = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/v1/unit');
//       if (!response.ok) throw new Error(`API Error: ${response.status}`);
//       const data = await response.json();
//       setUnitOptions(data);
//     } catch (err) {
//       showNotification('error', `Failed to load units: ${err.message}`);
//     }
//   };

//   useEffect(() => {
//     fetchTaxData();
//     fetchUnits();
//   }, []);

//   const getUnitName = (uomCode) => {
//     const unit = unitOptions.find(unit => unit.uomCode === uomCode);
//     return unit?.unit || uomCode || '-';
//   };

//   // Show notification
//   const showNotification = (type, message) => {
//     setNotification({ type, message });
//     setTimeout(() => setNotification(null), 5000);
//   };

//   // Delete handlers
//   const confirmDelete = (id) => setShowConfirmDelete(id);

//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/v1/taxInfo/${id}`, {
//         method: 'DELETE',
//       });
//       if (!response.ok) throw new Error(`API Error: ${response.status}`);

//       setTaxData(prev => prev.filter(item => item.id !== id));
//       showNotification('success', 'Record deleted successfully');
//     } catch (err) {
//       showNotification('error', `Delete failed: ${err.message}`);
//     } finally {
//       setShowConfirmDelete(null);
//     }
//   };

//   // Edit handlers
//   const handleEdit = (item, e) => {
//     if (e) e.stopPropagation(); // Stop event bubbling

//     setEditingId(item.id);
//     setEditFormData({
//       hsCode: item.hsCode || '',
//       itemName: item.itemName || '',
//       unitOfMeasurement: item.Unit?.unit || getUnitName(item.uomCode) || '',
//       uomCode: item.uomCode || '',
//       assessableValue: item.assessableValue?.toString() || '0.00',
//       customDuty: item.customDuty?.toString() || '0.00',
//       acd: item.acd?.toString() || '0.00',
//       rd: item.rd?.toString() || '0.00',
//       ftaCustomDuty: item.ftaCustomDuty?.toString() || '0.00',
//       salesTax: item.salesTax?.toString() || '0.00',
//       additionalSalesTax: item.additionalSalesTax?.toString() || '0.00',
//       furtherTax: item.furtherTax?.toString() || '0.00',
//       incomeTaxImport: item.incomeTaxImport?.toString() || '0.00',
//       incomeTaxWithheld: item.incomeTaxWithheld?.toString() || '0.00',
//     });
//     setShowEditModal(true);
//   };

//   const handleEditChange = (e) => {
//     e.stopPropagation(); // Stop event bubbling
//     const { name, value } = e.target;
//     setEditFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     e.stopPropagation(); // Stop event bubbling

//     if (!editFormData.uomCode) {
//       showNotification('error', 'Please select a Unit of Measurement');
//       return;
//     }

//     try {
//       const parsedData = {
//         hsCode: editFormData.hsCode,
//         itemName: editFormData.itemName,
//         uomCode: editFormData.uomCode,
//         assessableValue: parseFloat(editFormData.assessableValue) || 0,
//         customDuty: parseFloat(editFormData.customDuty) || 0,
//         acd: parseFloat(editFormData.acd) || 0,
//         rd: parseFloat(editFormData.rd) || 0,
//         ftaCustomDuty: parseFloat(editFormData.ftaCustomDuty) || 0,
//         salesTax: parseFloat(editFormData.salesTax) || 0,
//         additionalSalesTax: parseFloat(editFormData.additionalSalesTax) || 0,
//         furtherTax: parseFloat(editFormData.furtherTax) || 0,
//         incomeTaxImport: parseFloat(editFormData.incomeTaxImport) || 0,
//         incomeTaxWithheld: parseFloat(editFormData.incomeTaxWithheld) || 0,
//       };

//       const response = await fetch(`http://localhost:5000/api/v1/taxInfo/${editingId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(parsedData),
//       });

//       if (!response.ok) throw new Error(`API Error: ${response.status}`);

//       const updatedItem = await response.json();
//       setTaxData(prev => prev.map(item => 
//         item.id === editingId 
//           ? { ...updatedItem, Unit: { unit: editFormData.unitOfMeasurement } } 
//           : item
//       ));

//       showNotification('success', 'Record updated successfully');
//       setShowEditModal(false);
//       setEditingId(null);
//       setEditFormData(null);
//     } catch (err) {
//       showNotification('error', `Update failed: ${err.message}`);
//     }
//   };

//   const handleCancelEdit = (e) => {
//     if (e) e.stopPropagation(); // Stop event bubbling
//     setShowEditModal(false);
//     setEditingId(null);
//     setEditFormData(null);
//   };

//   // Search and sort
//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1);
//   };

//   const handleSort = (field) => {
//     if (sortField === field) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc");
//     } else {
//       setSortField(field);
//       setSortDirection("asc");
//     }
//   };

//   // Fixed the critical error in filteredData
//   const filteredData = useMemo(() => {
//     let result = [...taxData];
//     if (searchTerm) {
//       result = result.filter(item => 
//         (item.hsCode?.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (item.itemName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (item.uomCode?.toLowerCase().includes(searchTerm.toLowerCase()))
//       );
//     }

//     result.sort((a, b) => {
//       const fieldA = a[sortField] || '';
//       const fieldB = b[sortField] || ''; // Fixed from NumericFormatb[sortField]

//       if (!isNaN(fieldA) && !isNaN(fieldB)) {
//         return sortDirection === "asc" ? Number(fieldA) - Number(fieldB) : Number(fieldB) - Number(fieldA);
//       }
//       return sortDirection === "asc" ? fieldA.toString().localeCompare(fieldB.toString()) : fieldB.toString().localeCompare(fieldA.toString());
//     });

//     return result;
//   }, [taxData, searchTerm, sortField, sortDirection]);

//   const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
//   const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
//   const handlePageChange = (page) => setCurrentPage(page);

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">Tax & Duty Information</h1>
//             <p className="text-gray-600 mt-1">Manage and monitor tax information records</p>
//           </div>
//           {/* Search */}
//           <div className="mt-4 md:mt-0">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search records..."
//                 value={searchTerm}
//                 onChange={handleSearch}
//                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm"
//               />
//               <div className="absolute left-3 top-2.5 text-gray-400">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Notification */}
//         {notification && (
//           <div className={`mb-6 p-4 rounded-lg shadow-md ${notification.type === 'success' ? 'bg-green-100 border-l-4 border-green-500' : 'bg-red-100 border-l-4 border-red-500'}`}>
//             <div className="flex items-center">
//               {notification.type === 'success' ? (
//                 <svg className="w-6 h-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//               ) : (
//                 <svg className="w-6 h-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                 </svg>
//               )}
//               <span className={notification.type === 'success' ? 'text-green-800' : 'text-red-800'}>
//                 {notification.message}
//               </span>
//               <button onClick={() => setNotification(null)} className="ml-auto text-gray-500 hover:text-gray-700">
//                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Main Table */}
//         <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
//           {loading && (
//             <div className="flex items-center justify-center p-12">
//               <div className="flex flex-col items-center">
//                 <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//                 <p className="mt-4 text-gray-600">Loading data...</p>
//               </div>
//             </div>
//           )}

//           {error && !loading && (
//             <div className="bg-red-50 p-6">
//               <div className="flex">
//                 <div className="flex-shrink-0">
//                   <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                   </svg>
//                 </div>
//                 <div className="ml-4">
//                   <h3 className="text-lg font-medium text-red-800">Error loading tax information</h3>
//                   <p className="mt-1 text-red-700">{error}</p>
//                   <button
//                     className="mt-3 inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
//                     onClick={fetchTaxData}
//                   >
//                     Retry
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {!loading && !error && (
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('hsCode')}>
//                     HS Code {sortField === 'hsCode' && (sortDirection === "asc" ? "▲" : "▼")}
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('itemName')}>
//                     Item Name {sortField === 'itemName' && (sortDirection === "asc" ? "▲" : "▼")}
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('uomCode')}>
//                     Unit {sortField === 'uomCode' && (sortDirection === "asc" ? "▲" : "▼")}
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Values
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {paginatedData.length === 0 ? (
//                   <tr>
//                     <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
//                       <div className="flex flex-col items-center">
//                         <p className="text-lg font-medium">No records found</p>
//                         <p className="text-sm text-gray-400 mt-1">{searchTerm ? 'Try adjusting your search' : 'Add some tax information to get started'}</p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   paginatedData.map((item) => (
//                     <tr key={item.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className="px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
//                           {item.hsCode || "-"}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">{item.itemName || "-"}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                           {item.Unit?.unit || getUnitName(item.uomCode) || "-"}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <details className="cursor-pointer">
//                           <summary className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none">View Details</summary>
//                           <div className="mt-3 bg-gray-50 p-3 rounded-md border border-gray-200">
//                             {/* Details content here */}
//                             <p>Value: {item.assessableValue || "-"}</p>
//                             <p>Custom Duty: {item.customDuty || "-"}%</p>
//                           </div>
//                         </details>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <div className="flex space-x-2">
//                           <button
//                             onClick={(e) => handleEdit(item, e)}
//                             className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               confirmDelete(item.id);
//                             }}
//                             className="px-3 py-2 border border-gray-300 rounded-md text-red-700 bg-white hover:bg-red-50"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           )}

//           {/* Pagination */}
//           {filteredData.length > 0 && (
//             <div className="bg-white px-4 py-3 border-t border-gray-200">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-700">
//                     Showing <span className="font-medium">{((currentPage - 1) * ITEMS_PER_PAGE) + 1}</span> to{" "}
//                     <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)}</span> of{" "}
//                     <span className="font-medium">{filteredData.length}</span> results
//                   </p>
//                 </div>
//                 <div>
//                   <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
//                     {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                       <button
//                         key={page}
//                         onClick={() => handlePageChange(page)}
//                         className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
//                           currentPage === page ? "bg-blue-50 border-blue-500 text-blue-600" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
//                         }`}
//                       >
//                         {page}
//                       </button>
//                     ))}
//                   </nav>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       {showConfirmDelete && (
//         <div 
//           className="fixed z-50 inset-0 overflow-y-auto"
//           onClick={(e) => {
//             // Only close if clicked directly on backdrop
//             if (e.target === e.currentTarget) {
//               setShowConfirmDelete(null);
//             }
//           }}
//         >
//           <div className="flex items-center justify-center min-h-screen">
//             <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
//             <div 
//               className="relative bg-white rounded-lg p-6 max-w-lg w-full z-50"
//               onClick={(e) => e.stopPropagation()} // Stop propagation
//             >
//               <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3>
//               <p className="text-sm text-gray-500 mb-6">Are you sure you want to delete this tax record?</p>
//               <div className="flex justify-end space-x-4">
//                 <button
//                   className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setShowConfirmDelete(null);
//                   }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleDelete(showConfirmDelete);
//                   }}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Edit Modal */}
//       {showEditModal && (
//         <div 
//           className="fixed z-50 inset-0 overflow-y-auto"
//           onClick={(e) => {
//             // Only close if clicked directly on backdrop
//             if (e.target === e.currentTarget) {
//               handleCancelEdit(e);
//             }
//           }}
//         >
//           <div className="flex items-center justify-center min-h-screen p-4">
//             <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
//             <div 
//               className="relative bg-white rounded-lg p-6 w-full max-w-3xl z-50"
//               onClick={(e) => e.stopPropagation()} // Stop propagation
//             >
//               <h2 className="text-xl font-bold mb-6">Edit Tax & Duty Information</h2>
//               <form onSubmit={handleEditSubmit}>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   {/* HS Code Field */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">HS Code</label>
//                     <input
//                       type="text"
//                       name="hsCode"
//                       value={editFormData.hsCode}
//                       onChange={handleEditChange}
//                       className="w-full p-2 border border-gray-300 rounded-md"
//                       required
//                     />
//                   </div>

//                   {/* Item Name Field */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
//                     <input
//                       type="text"
//                       name="itemName"
//                       value={editFormData.itemName}
//                       onChange={handleEditChange}
//                       className="w-full p-2 border border-gray-300 rounded-md"
//                       required
//                     />
//                   </div>

//                   {/* Unit of Measurement */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Unit of Measurement</label>
//                     <select
//                       name="uomCode"
//                       value={editFormData.uomCode}
//                       onChange={handleEditChange}
//                       className="w-full p-2 border border-gray-300 rounded-md"
//                       required
//                     >
//                       <option value="">Select Unit</option>
//                       {unitOptions.map(unit => (
//                         <option key={unit.id} value={unit.uomCode}>{unit.unit}</option>
//                       ))}
//                     </select>
//                   </div>

//                   {/* Assessable Value Field */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Assessable Value</label>
//                     <input
//                       type="number"
//                       name="assessableValue"
//                       value={editFormData.assessableValue}
//                       onChange={handleEditChange}
//                       className="w-full p-2 border border-gray-300 rounded-md"
//                       required
//                     />
//                   </div>

//                   {/* Custom Duty Field */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Custom Duty (%)</label>
//                     <input
//                       type="number"
//                       name="customDuty"
//                       value={editFormData.customDuty}
//                       onChange={handleEditChange}
//                       className="w-full p-2 border border-gray-300 rounded-md"
//                     />
//                   </div>
//                 </div>

//                 <div className="flex justify-end space-x-4">
//                   <button
//                     type="button"
//                     onClick={handleCancelEdit}
//                     className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                   >
//                     Save
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

















































import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';

export default function TaxInfoTable() {
  // State variables remain the same
  const [taxData, setTaxData] = useState([]);
  const [unitOptions, setUnitOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState(null);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [sortField, setSortField] = useState("hsCode");
  const [sortDirection, setSortDirection] = useState("asc");
  const [editDropdownOpen, setEditDropdownOpen] = useState(false);

  const ITEMS_PER_PAGE = 5;

  // Regular data fetching functions
  const fetchTaxData = async () => {
    try {
      setLoading(true);
      // 'http://localhost:5000/api/v1/taxInfo'
      const response = await fetch('/api/v1/taxInfo');
      const data = await response.json();
      setTaxData(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch tax data error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnits = async () => {
    try {
      // 'http://localhost:5000/api/v1/unit'
      const response = await fetch('/api/v1/unit');
      const data = await response.json();
      setUnitOptions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch units:", err);
    }
  };

  useEffect(() => {
    fetchTaxData();
    fetchUnits();
  }, []);

  const getUnitName = (uomCode) => {
    if (!uomCode) return '-';
    const unit = unitOptions.find(unit => unit.uomCode === uomCode);
    return unit?.unit || uomCode || '-';
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  // FIXED DELETE FUNCTION - CRITICAL FIX: Never close or propagate events on modal clicks
  const confirmDelete = (id) => setShowConfirmDelete(id);

  const handleDelete = async (id) => {
    try {
      // `http://localhost:5000/api/v1/taxInfo/${id}`
      const response = await fetch(`/api/v1/taxInfo/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Delete failed with status: ${response.status}`);
      }

      setTaxData(prev => prev.filter(item => item.id !== id));
      showNotification('success', 'Record deleted successfully');
      setShowConfirmDelete(null); // Only close after successful deletion
    } catch (err) {
      console.error('Delete error:', err);
      showNotification('error', `Delete failed: ${err.message}`);
    }
  };

  // FIXED EDIT FUNCTION - CRITICAL FIX: Never close or propagate events on modal clicks
  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditFormData({
      hsCode: item.hsCode || '',
      itemName: item.itemName || '',
      unitOfMeasurement: item.Unit?.unit || getUnitName(item.uomCode) || '',
      uomCode: item.uomCode || '',
      assessableValue: item.assessableValue?.toString() || '0.0000',
      customDuty: item.customDuty?.toString() || '0.00',
      acd: item.acd?.toString() || '0.00',
      rd: item.rd?.toString() || '0.00',
      ftaCustomDuty: item.ftaCustomDuty?.toString() || '0.00',
      salesTax: item.salesTax?.toString() || '0.00',
      additionalSalesTax: item.additionalSalesTax?.toString() || '0.00',
      furtherTax: item.furtherTax?.toString() || '0.00',
      incomeTaxImport: item.incomeTaxImport?.toString() || '0.00',
      incomeTaxWithheld: item.incomeTaxWithheld?.toString() || '0.00',
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditUnitSelect = (unitObject) => {
    setEditFormData(prev => ({
      ...prev,
      unitOfMeasurement: unitObject.unit,
      uomCode: unitObject.uomCode,
    }));
    setEditDropdownOpen(false);
  };

  // FIXED SUBMIT FUNCTION - CRITICAL FIX: Proper error handling
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!editFormData.uomCode) {
      showNotification('error', 'Please select a Unit of Measurement');
      return;
    }

    try {
      const parsedData = {
        hsCode: editFormData.hsCode,
        itemName: editFormData.itemName,
        uomCode: editFormData.uomCode,
        assessableValue: parseFloat(editFormData.assessableValue) || 0,
        customDuty: parseFloat(editFormData.customDuty) || 0,
        acd: parseFloat(editFormData.acd) || 0,
        rd: parseFloat(editFormData.rd) || 0,
        ftaCustomDuty: parseFloat(editFormData.ftaCustomDuty) || 0,
        salesTax: parseFloat(editFormData.salesTax) || 0,
        additionalSalesTax: parseFloat(editFormData.additionalSalesTax) || 0,
        furtherTax: parseFloat(editFormData.furtherTax) || 0,
        incomeTaxImport: parseFloat(editFormData.incomeTaxImport) || 0,
        incomeTaxWithheld: parseFloat(editFormData.incomeTaxWithheld) || 0,
      };
// `http://localhost:5000/api/v1/taxInfo/${editingId}`
      const response = await fetch(`/api/v1/taxInfo/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedData),
      });

      if (!response.ok) {
        throw new Error(`Update failed with status: ${response.status}`);
      }

      const updatedItem = await response.json();
      setTaxData(prev => prev.map(item =>
        item.id === editingId
          ? { ...updatedItem, Unit: { unit: editFormData.unitOfMeasurement } }
          : item
      ));

      showNotification('success', 'Record updated successfully');
      setShowEditModal(false);
      setEditingId(null);
      setEditFormData(null);
    } catch (err) {
      console.error('Edit error:', err);
      showNotification('error', `Update failed: ${err.message}`);
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingId(null);
    setEditFormData(null);
    setEditDropdownOpen(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // FIXED CRITICAL ERROR: Changed NumericFormatb[sortField] to b[sortField]
  const filteredData = useMemo(() => {
    let result = [...taxData];

    if (searchTerm) {
      result = result.filter(item =>
        (item.hsCode?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.itemName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.uomCode?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    result.sort((a, b) => {
      const fieldA = a[sortField] || '';
      const fieldB = b[sortField] || ''; // FIXED from NumericFormatb[sortField]

      if (!isNaN(fieldA) && !isNaN(fieldB)) {
        return sortDirection === "asc" ? Number(fieldA) - Number(fieldB) : Number(fieldB) - Number(fieldA);
      }

      return sortDirection === "asc"
        ? fieldA.toString().localeCompare(fieldB.toString())
        : fieldB.toString().localeCompare(fieldA.toString());
    });

    return result;
  }, [taxData, searchTerm, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const handlePageChange = (page) => setCurrentPage(page);

  // Fixed animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, height: 0, overflow: 'hidden' },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } }, // FIXED from "transtion"
    exit: { opacity: 0, height: 0, transition: { duration: 0.2 } }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };

  const percentageFields = [
    { id: 'customDuty', name: 'customDuty', label: 'Custom Duty (%)' },
    { id: 'acd', name: 'acd', label: 'ACD (%)' },
    { id: 'rd', name: 'rd', label: 'RD (%)' },
    { id: 'ftaCustomDuty', name: 'ftaCustomDuty', label: 'FTA Custom Duty (%)' },
    { id: 'salesTax', name: 'salesTax', label: 'Sales Tax (%)' },
    { id: 'additionalSalesTax', name: 'additionalSalesTax', label: 'Additional Sales Tax (%)' },
    { id: 'furtherTax', name: 'furtherTax', label: 'Further Tax (%)' },
    { id: 'incomeTaxImport', name: 'incomeTaxImport', label: 'Income Tax Import (%)' },
    { id: 'incomeTaxWithheld', name: 'incomeTaxWithheld', label: 'Income Tax Withheld (%)' },
  ];

  // Main component render
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 border-b border-gray-200 pb-4"
        >
          <h2 className="text-3xl font-semibold text-[#4a6fa5] mb-2">Items</h2>
          <p className="text-gray-600">Manage Items Data</p>
        </motion.div>
        <div className="flex justify-between mb-6">

          <div>
            <input
              type="text"
              placeholder="Search records..."
              value={searchTerm}
              onChange={handleSearch}
              className="px-4 py-2 border border-[#4a6fa5] w-[400px] rounded-md outline-none focus:ring-2 focus:ring-[#4a6fa5]"
            />
          </div>
          <Link to='/items'>
            <motion.button
              className='bg-[#4a6fa5] text-white p-2 px-4 mt-2 w-full hover:bg-[#5a85c0] transition-colors rounded-lg font-medium flex items-center justify-center'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add items
            </motion.button>
          </Link>
        </div>

        {notification && (
          <div className={`mb-6 p-4 rounded-lg ${notification.type === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
            <p className={notification.type === 'success' ? 'text-green-800' : 'text-red-800'}>
              {notification.message}
            </p>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {loading ? (
            <div className="flex justify-center p-12">
              <p>Loading data...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 p-6">
              <p className="text-red-800">{error}</p>
              <button onClick={fetchTaxData}>Retry</button>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#4a6fa5]">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-white uppercase cursor-pointer" onClick={() => handleSort('hsCode')}>
                    HS Code {sortField === 'hsCode' ? (sortDirection === "asc" ? "▲" : "▼") : ""}
                  </th>
                  <th className="px-6 py-3 text-left text-white font-medium uppercase cursor-pointer" onClick={() => handleSort('itemName')}>
                    Item Name {sortField === 'itemName' ? (sortDirection === "asc" ? "▲" : "▼") : ""}
                  </th>
                  <th className="px-6 py-3 text-left text-white font-medium uppercase cursor-pointer" onClick={() => handleSort('uomCode')}>
                    Unit {sortField === 'uomCode' ? (sortDirection === "asc" ? "▲" : "▼") : ""}
                  </th>
                  <th className="px-6 py-3 text-left text-white font-medium uppercase">Values</th>
                  <th className="px-6 py-3 text-white font-medium text-center uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      <p className="text-lg font-medium">No records found</p>
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="bg-gray-100 rounded-md px-2 py-1">
                          {item.hsCode || "-"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.itemName || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-xs">
                          {item.Unit?.unit || getUnitName(item.uomCode) || "-"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <details className="cursor-pointer">
                          <summary className="text-[#477ac9]">View Details</summary>
                          <div className="p-3 bg-gray-50 rounded-md">
                            <p>Assessable Value: {item.assessableValue || "-"}</p>
                            <p>Custom Duty: {item.customDuty || "-"}%</p>
                            <p>ACD: {item.acd || "-"}%</p>
                            <p>RD: {item.rd || "-"}%</p>
                            <p>FTA Custom Duty: {item.ftaCustomDuty || "-"}%</p>
                            <p>Sales Tax: {item.salesTax || "-"}%</p>
                            <p>Additional Sales Tax: {item.additionalSalesTax || "-"}%</p>
                            <p>Further Tax: {item.furtherTax || "-"}%</p>
                            <p>Income Tax Import: {item.incomeTaxImport || "-"}%</p>
                            <p>Income Tax Withheld: {item.incomeTaxWithheld || "-"}%</p>
                          </div>
                        </details>
                      </td>
                      <td className="px-6  whitespace-nowrap font-medium">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-[#4a6fa5] px-3 py-2 flex items-center  rounded-md"
                          >
                            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            Edit
                          </button>
                          <button
                            onClick={() => confirmDelete(item.id)}
                            className="text-red-700 px-3 py-2 rounded-md flex items-center"
                          >
                             <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {filteredData.length > 0 && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <p>
                  Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)} of {filteredData.length} results
                </p>
                <div className="flex">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 border ${currentPage === page ? "bg-blue-50 text-blue-600 border-2 border-[#4a6fa5]" : "text-gray-500"}`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* COMPLETELY REWRITTEN DELETE MODAL */}
      {showConfirmDelete && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        // CRITICAL FIX: Modal backdrop does NOT close when clicked
        >
          <div className="bg-white p-6 rounded-lg max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <div className="border-b border-gray-200 py-1">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <svg className="h-6 w-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Delete File
                </h3>
              </div>
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this record? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md"
                onClick={() => setShowConfirmDelete(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md"
                onClick={() => handleDelete(showConfirmDelete)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COMPLETELY REWRITTEN EDIT MODAL */}
      {showEditModal && (
        <div
          className="fixed inset-0 bg-black opacity-[0.9] flex items-center justify-center  z-50"
        // CRITICAL FIX: Modal backdrop does NOT close when clicked
        >
          
          <div className="bg-white  rounded-lg max-w-4xl xl:h-[580px] w-full" onClick={e => e.stopPropagation()}>
            <h2 className="text-3xl font-semibold bg-[#4a6fa5] p-4 rounded-t-lg text-white">Edit Tax & Duty Information</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 my-10 py-1 px-6 ">
                {/* HS Code */}
                <div>
                  <label className="block  mb-1">HS Code</label>
                  <input
                    type="text"
                    name="hsCode"
                    value={editFormData.hsCode}
                    onChange={handleEditChange}
                    className="w-full p-2 border border-[#4a6fa5] rounded-md outline-none focus:ring-2 focus:ring-[#4a6fa5]"
                    required
                  />
                </div>

                {/* Item Name */}
                <div>
                  <label className="block  mb-1">Item Name</label>
                  <input
                    type="text"
                    name="itemName"
                    value={editFormData.itemName}
                    onChange={handleEditChange}
                    className="w-full p-2 border border-[#4a6fa5] rounded-md outline-none focus:ring-2 focus:ring-[#4a6fa5]"
                    required
                  />
                </div>

                {/* Unit of Measurement */}
                <div>
                  <label className="block  mb-1">Unit of Measurement</label>
                  <div className="relative">
                    <div
                      className="w-full p-2 border border-[#4a6fa5] rounded-md flex justify-between items-center cursor-pointer outline-none hover:border-2 hover:border-[#4a6fa5]"
                      onClick={() => setEditDropdownOpen(!editDropdownOpen)}
                    >
                      <span>{editFormData.unitOfMeasurement || 'Select Unit'}</span>
                      <span>▼</span>
                    </div>
                    {editDropdownOpen && (
                      <ul className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {unitOptions.map((option) => (
                          <li
                            key={option.id}
                            className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                            onClick={() => handleEditUnitSelect(option)}
                          >
                            {option.unit}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Assessable Value */}
                <div>
                  <label className="block  mb-1">Assessable Value</label>
                  <input
                    type="number"
                    step="0.0001"
                    name="assessableValue"
                    value={editFormData.assessableValue}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded-md border-[#4a6fa5] outline-none focus:ring-2 focus:ring-[#4a6fa5]"
                    required
                  />
                </div>

                {/* Percentage Fields */}
                {percentageFields.map(field => (
                  <div key={field.id}>
                    <label className="block  mb-1">{field.label}</label>
                    <input
                      type="number"
                      step="0.01"
                      name={field.name}
                      value={editFormData[field.name]}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-[#4a6fa5] rounded-md outline-none focus:ring-2 focus:ring-[#4a6fa5]"
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-4 mr-6">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-4 py-2 bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#4a6fa5] text-white rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
































