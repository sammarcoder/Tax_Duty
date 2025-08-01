// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const UomTable = () => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [deleteLoading, setDeleteLoading] = useState({});
//   const [editItem, setEditItem] = useState(null);
//   const [editUnit, setEditUnit] = useState(''); // Keep for display only
//   const [editUomCode, setEditUomCode] = useState('');
//   const [editSerialNumber, setEditSerialNumber] = useState('');
//   const [showDeletePopup, setShowDeletePopup] = useState(null);
//   const [showUpdatePopup, setShowUpdatePopup] = useState(null);
//   const [submitMessage, setSubmitMessage] = useState('');

//   // Fetch units from API
//   const fetchItems = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('http://localhost:5000/api/v1/unit');
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setItems(data);
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   // Handle delete unit
//   const handleDelete = async (id) => {
//     setDeleteLoading((prev) => ({ ...prev, [id]: true }));
//     try {
//       const response = await fetch(`http://localhost:5000/api/v1/unit/${id}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to delete unit');
//       }

//       setItems(items.filter((item) => item.id !== id));
//       setSubmitMessage('✅ Unit deleted successfully');
//       fetchItems(); // Refresh to get updated serial numbers
//     } catch (err) {
//       console.error('Error deleting unit:', err);
//       setSubmitMessage(`❌ Error: ${err.message}`);
//     } finally {
//       setDeleteLoading((prev) => ({ ...prev, [id]: false }));
//       setShowDeletePopup(null);
//     }
//   };

//   // Handle update unit - modified to exclude unit name
//   const handleUpdate = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/v1/unit/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           // No longer sending unit name
//           uomCode: editUomCode,
//           serialNumber: parseInt(editSerialNumber, 10),
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to update unit');
//       }

//       const updatedData = await response.json();
//       setItems(updatedData.allUnits || items);
//       setSubmitMessage('✅ Unit updated successfully');
//       setEditItem(null);
//       setEditUnit('');
//       setEditUomCode('');
//       setEditSerialNumber('');
//     } catch (err) {
//       console.error('Error updating unit:', err);
//       setSubmitMessage(`❌ Error: ${err.message}`);
//     } finally {
//       setShowUpdatePopup(null);
//     }
//   };

//   // Item animation variants
//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//     exit: { opacity: 0, scale: 0.8 },
//   };

//   // Popup animation variants
//   const popupVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: { opacity: 1, scale: 1 },
//     exit: { opacity: 0, scale: 0.8 },
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <motion.h2
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         className="text-2xl font-bold text-[#061525] mb-6"
//       >
//         Manage Units of Measurement
//       </motion.h2>

//       {submitMessage && (
//         <motion.p
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-4 text-sm text-[#061525]"
//         >
//           {submitMessage}
//         </motion.p>
//       )}

//       {loading ? (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="flex justify-center p-4"
//         >
//           <div className="loader">Loading...</div>
//         </motion.div>
//       ) : error ? (
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-red-500 p-4"
//         >
//           Error: {error.message}
//         </motion.p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border-collapse border border-[#4d555b]/30">
//             <thead>
//               <tr className="bg-[#061525] text-white">
//                 <th className="border border-[#4d555b]/30 p-3 text-left">Serial</th>
//                 <th className="border border-[#4d555b]/30 p-3 text-left">Unit</th>
//                 <th className="border border-[#4d555b]/30 p-3 text-left">Code</th>
//                 <th className="border border-[#4d555b]/30 p-3 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               <AnimatePresence>
//                 {items.map((item) => (
//                   <motion.tr
//                     key={item.id}
//                     initial="hidden"
//                     animate="visible"
//                     exit="exit"
//                     variants={itemVariants}
//                     className="border-b border-[#4d555b]/20 hover:bg-[#4d555b]/5"
//                   >
//                     <td className="border border-[#4d555b]/30 p-3">{item.serialNumber}</td>
//                     <td className="border border-[#4d555b]/30 p-3">{item.unit}</td>
//                     <td className="border border-[#4d555b]/30 p-3">{item.uomCode}</td>
//                     <td className="border border-[#4d555b]/30 p-3">
//                       <motion.button
//                         onClick={() => {
//                           setEditItem(item);
//                           setEditUnit(item.unit); // Still set it for display only
//                           setEditUomCode(item.uomCode);
//                           setEditSerialNumber(item.serialNumber.toString());
//                           setShowUpdatePopup(item.id);
//                         }}
//                         className="text-blue-500 hover:text-blue-700 mr-4"
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                       >
//                         Edit
//                       </motion.button>
//                       <motion.button
//                         onClick={() => setShowDeletePopup(item.id)}
//                         disabled={deleteLoading[item.id]}
//                         className="text-red-500 hover:text-red-700"
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                       >
//                         {deleteLoading[item.id] ? (
//                           <svg
//                             className="animate-spin h-5 w-5"
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                           >
//                             <circle
//                               className="opacity-25"
//                               cx="12"
//                               cy="12"
//                               r="10"
//                               stroke="currentColor"
//                               strokeWidth="4"
//                             ></circle>
//                             <path
//                               className="opacity-75"
//                               fill="currentColor"
//                               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                             ></path>
//                           </svg>
//                         ) : (
//                           'Delete'
//                         )}
//                       </motion.button>
//                     </td>
//                   </motion.tr>
//                 ))}
//               </AnimatePresence>
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Delete Confirmation Popup */}
//       <AnimatePresence>
//         {showDeletePopup && (
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             variants={popupVariants}
//             className="fixed inset-0 bg-black/50 flex items-center justify-center"
//           >
//             <div className="bg-white p-6 rounded-lg shadow-lg">
//               <h3 className="text-lg font-semibold text-[#061525] mb-4">
//                 Are you sure you want to delete this unit?
//               </h3>
//               <div className="flex justify-end gap-2">
//                 <motion.button
//                   onClick={() => setShowDeletePopup(null)}
//                   className="px-4 py-2 bg-gray-300 text-[#061525] rounded hover:bg-gray-400"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Cancel
//                 </motion.button>
//                 <motion.button
//                   onClick={() => handleDelete(showDeletePopup)}
//                   className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Delete
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Update Confirmation Popup - Modified to disable unit name editing */}
//       <AnimatePresence>
//         {showUpdatePopup && (
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             variants={popupVariants}
//             className="fixed inset-0 bg-black/50 flex items-center justify-center"
//           >
//             <div className="bg-white p-6 rounded-lg shadow-lg">
//               <h3 className="text-lg font-semibold text-[#061525] mb-4">
//                 Update Unit
//               </h3>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-[#061525] mb-1">Unit Name (Not Editable)</label>
//                   <input
//                     type="text"
//                     value={editUnit}
//                     disabled
//                     className="w-full p-3 border-2 rounded-md border-[#4d555b]/30 bg-gray-100 text-gray-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-[#061525] mb-1">UOM Code</label>
//                   <input
//                     type="text"
//                     value={editUomCode}
//                     onChange={(e) => setEditUomCode(e.target.value)}
//                     placeholder="Enter UOM Code (e.g., U_0001)"
//                     className="w-full p-3 border-2 rounded-md border-[#4d555b]/30 hover:border-[#4d555b]/50 focus:border-[#061525] focus:outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-[#061525] mb-1">Serial Number</label>
//                   <input
//                     type="number"
//                     value={editSerialNumber}
//                     onChange={(e) => setEditSerialNumber(e.target.value)}
//                     placeholder="Enter Serial Number"
//                     className="w-full p-3 border-2 rounded-md border-[#4d555b]/30 hover:border-[#4d555b]/50 focus:border-[#061525] focus:outline-none"
//                     min="1"
//                   />
//                 </div>
//               </div>
//               <div className="flex justify-end gap-2 mt-4">
//                 <motion.button
//                   onClick={() => {
//                     setEditItem(null);
//                     setEditUnit('');
//                     setEditUomCode('');
//                     setEditSerialNumber('');
//                     setShowUpdatePopup(null);
//                   }}
//                   className="px-4 py-2 bg-gray-300 text-[#061525] rounded hover:bg-gray-400"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Cancel
//                 </motion.button>
//                 <motion.button
//                   onClick={() => handleUpdate(showUpdatePopup)}
//                   disabled={!editUomCode || !editSerialNumber}
//                   className="px-4 py-2 bg-[#061525] text-white rounded hover:bg-[#0c2542] disabled:opacity-50"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Update
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default UomTable;























// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const UomTable = () => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [deleteLoading, setDeleteLoading] = useState({});
//   const [editItem, setEditItem] = useState(null);
//   const [editUnit, setEditUnit] = useState('');
//   const [editUomCode, setEditUomCode] = useState('');
//   const [editSerialNumber, setEditSerialNumber] = useState('');
//   const [showDeletePopup, setShowDeletePopup] = useState(null);
//   const [showUpdatePopup, setShowUpdatePopup] = useState(null);
//   const [submitMessage, setSubmitMessage] = useState('');

//   const fetchItems = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('http://localhost:5000/api/v1/unit');
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setItems(data);
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const handleDelete = async (id) => {
//     setDeleteLoading((prev) => ({ ...prev, [id]: true }));
//     try {
//       const response = await fetch(`http://localhost:5000/api/v1/unit/${id}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to delete unit');
//       }

//       setItems(items.filter((item) => item.id !== id));
//       setSubmitMessage('✅ Unit deleted successfully');
//       fetchItems();
//     } catch (err) {
//       console.error('Error deleting unit:', err);
//       setSubmitMessage(`❌ Error: ${err.message}`);
//     } finally {
//       setDeleteLoading((prev) => ({ ...prev, [id]: false }));
//       setShowDeletePopup(null);
//     }
//   };

//   const handleUpdate = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/v1/unit/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           unit: editUnit,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to update unit');
//       }

//       const updatedData = await response.json();
//       setItems(updatedData.allUnits || items);
//       setSubmitMessage('✅ Unit updated successfully');
//       setEditItem(null);
//       setEditUnit('');
//       setEditUomCode('');
//       setEditSerialNumber('');
//     } catch (err) {
//       console.error('Error updating unit:', err);
//       setSubmitMessage(`❌ Error: ${err.message}`);
//     } finally {
//       setShowUpdatePopup(null);
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//     exit: { opacity: 0, scale: 0.8 },
//   };

//   const popupVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: { opacity: 1, scale: 1 },
//     exit: { opacity: 0, scale: 0.8 },
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <motion.h2
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         className="text-2xl font-bold text-[#061525] mb-6"
//       >
//         Manage Units of Measurement
//       </motion.h2>

//       {submitMessage && (
//         <motion.p
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-4 text-sm text-[#061525]"
//         >
//           {submitMessage}
//         </motion.p>
//       )}

//       {loading ? (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="flex justify-center p-4"
//         >
//           <div className="loader">Loading...</div>
//         </motion.div>
//       ) : error ? (
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-red-500 p-4"
//         >
//           Error: {error.message}
//         </motion.p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border-collapse border border-[#4d555b]/30">
//             <thead>
//               <tr className="bg-[#061525] text-white">
//                 <th className="border border-[#4d555b]/30 p-3 text-left">Serial</th>
//                 <th className="border border-[#4d555b]/30 p-3 text-left">Unit</th>
//                 <th className="border border-[#4d555b]/30 p-3 text-left">Code</th>
//                 <th className="border border-[#4d555b]/30 p-3 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               <AnimatePresence>
//                 {items.map((item) => (
//                   <motion.tr
//                     key={item.id}
//                     initial="hidden"
//                     animate="visible"
//                     exit="exit"
//                     variants={itemVariants}
//                     className="border-b border-[#4d555b]/20 hover:bg-[#4d555b]/5"
//                   >
//                     <td className="border border-[#4d555b]/30 p-3">{item.serialNumber}</td>
//                     <td className="border border-[#4d555b]/30 p-3">{item.unit}</td>
//                     <td className="border border-[#4d555b]/30 p-3">{item.uomCode}</td>
//                     <td className="border border-[#4d555b]/30 p-3">
//                       <motion.button
//                         onClick={() => {
//                           setEditItem(item);
//                           setEditUnit(item.unit);
//                           setEditUomCode(item.uomCode);
//                           setEditSerialNumber(item.serialNumber.toString());
//                           setShowUpdatePopup(item.id);
//                         }}
//                         className="text-blue-500 hover:text-blue-700 mr-4"
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                       >
//                         Edit
//                       </motion.button>
//                       <motion.button
//                         onClick={() => setShowDeletePopup(item.id)}
//                         disabled={deleteLoading[item.id]}
//                         className="text-red-500 hover:text-red-700"
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                       >
//                         {deleteLoading[item.id] ? (
//                           <svg
//                             className="animate-spin h-5 w-5"
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                           >
//                             <circle
//                               className="opacity-25"
//                               cx="12"
//                               cy="12"
//                               r="10"
//                               stroke="currentColor"
//                               strokeWidth="4"
//                             ></circle>
//                             <path
//                               className="opacity-75"
//                               fill="currentColor"
//                               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                             ></path>
//                           </svg>
//                         ) : (
//                           'Delete'
//                         )}
//                       </motion.button>
//                     </td>
//                   </motion.tr>
//                 ))}
//               </AnimatePresence>
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Update Popup - Unit Editable Only */}
//       <AnimatePresence>
//         {showUpdatePopup && (
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             variants={popupVariants}
//             className="fixed inset-0 bg-black/50 flex items-center justify-center"
//           >
//             <div className="bg-white p-6 rounded-lg shadow-lg">
//               <h3 className="text-lg font-semibold text-[#061525] mb-4">Update Unit</h3>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-[#061525] mb-1">Unit Name</label>
//                   <input
//                     type="text"
//                     value={editUnit}
//                     onChange={(e) => setEditUnit(e.target.value)}
//                     placeholder="Enter Unit Name"
//                     className="w-full p-3 border-2 rounded-md border-[#4d555b]/30 hover:border-[#4d555b]/50 focus:border-[#061525] focus:outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-[#061525] mb-1">UOM Code (Not Editable)</label>
//                   <input
//                     type="text"
//                     value={editUomCode}
//                     disabled
//                     className="w-full p-3 border-2 rounded-md border-[#4d555b]/30 bg-gray-100 text-gray-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-[#061525] mb-1">Serial Number (Not Editable)</label>
//                   <input
//                     type="number"
//                     value={editSerialNumber}
//                     disabled
//                     className="w-full p-3 border-2 rounded-md border-[#4d555b]/30 bg-gray-100 text-gray-500"
//                   />
//                 </div>
//               </div>
//               <div className="flex justify-end gap-2 mt-4">
//                 <motion.button
//                   onClick={() => {
//                     setEditItem(null);
//                     setEditUnit('');
//                     setEditUomCode('');
//                     setEditSerialNumber('');
//                     setShowUpdatePopup(null);
//                   }}
//                   className="px-4 py-2 bg-gray-300 text-[#061525] rounded hover:bg-gray-400"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Cancel
//                 </motion.button>
//                 <motion.button
//                   onClick={() => handleUpdate(showUpdatePopup)}
//                   disabled={!editUnit.trim()}
//                   className="px-4 py-2 bg-[#061525] text-white rounded hover:bg-[#0c2542] disabled:opacity-50"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Update
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Delete Confirmation */}
//       <AnimatePresence>
//         {showDeletePopup && (
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             variants={popupVariants}
//             className="fixed inset-0 bg-black/50 flex items-center justify-center"
//           >
//             <div className="bg-white p-6 rounded-lg shadow-lg">
//               <h3 className="text-lg font-semibold text-[#061525] mb-4">
//                 Are you sure you want to delete this unit?
//               </h3>
//               <div className="flex justify-end gap-2">
//                 <motion.button
//                   onClick={() => setShowDeletePopup(null)}
//                   className="px-4 py-2 bg-gray-300 text-[#061525] rounded hover:bg-gray-400"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Cancel
//                 </motion.button>
//                 <motion.button
//                   onClick={() => handleDelete(showDeletePopup)}
//                   className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Delete
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default UomTable;
































import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const UomTable = () => {
  // State management
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState({});
  const [editItem, setEditItem] = useState(null);
  const [editUnit, setEditUnit] = useState('');
  const [editUomCode, setEditUomCode] = useState('');
  const [editSerialNumber, setEditSerialNumber] = useState('');
  const [showDeletePopup, setShowDeletePopup] = useState(null);
  const [showUpdatePopup, setShowUpdatePopup] = useState(null);
  const [submitMessage, setSubmitMessage] = useState('');
  // New state for search and filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'serialNumber', direction: 'ascending' });
  const itemsPerPage = 5;

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/v1/unit');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    setDeleteLoading((prev) => ({ ...prev, [id]: true }));
    try {
      // `http://localhost:5000/api/v1/unit/${id}`
      const response = await fetch(`/api/v1/unit/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete unit');
      }

      setItems(items.filter((item) => item.id !== id));
      setSubmitMessage('✅ Unit deleted successfully');
      fetchItems();
    } catch (err) {
      console.error('Error deleting unit:', err);
      setSubmitMessage(`❌ Error: ${err.message}`);
    } finally {
      setDeleteLoading((prev) => ({ ...prev, [id]: false }));
      setShowDeletePopup(null);
    }
  };

  const handleUpdate = async (id) => {
    try {
      // http://localhost:5000/api/v1/unit/${id}
      const response = await fetch(`/api/v1/unit/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unit: editUnit,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update unit');
      }

      const updatedData = await response.json();
      setItems(updatedData.allUnits || items);
      setSubmitMessage('✅ Unit updated successfully');
      setEditItem(null);
      setEditUnit('');
      setEditUomCode('');
      setEditSerialNumber('');
    } catch (err) {
      console.error('Error updating unit:', err);
      setSubmitMessage(`❌ Error: ${err.message}`);
    } finally {
      setShowUpdatePopup(null);
    }
  };

  // New sort function
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Filter and sort items
  const filteredAndSortedItems = React.useMemo(() => {
    let filteredItems = [...items];

    // Apply search filter
    if (searchTerm) {
      filteredItems = filteredItems.filter(item =>
        item.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.uomCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      filteredItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredItems;
  }, [items, searchTerm, sortConfig]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAndSortedItems.length / itemsPerPage);

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    }),
    exit: { opacity: 0, scale: 0.8 }
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending'
        ? <span className="ml-1">↑</span>
        : <span className="ml-1">↓</span>;
    }
    return null;
  };

  return (
    <div className="p-6 bg-[#f8f9fa] min-h-screen">
      <div className="max-w-6xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 border-b border-gray-200 pb-4"
        >
          <h2 className="text-2xl font-semibold text-[#4a6fa5] mb-2">Units of Measurement</h2>
          <p className="text-gray-600">Manage your measurement units from this page</p>
        </motion.div>

        {/* Notification message */}
        <AnimatePresence>
          {submitMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-4 p-3 rounded-md ${submitMessage.includes('❌') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}
            >
              <div className="flex items-center">
                <span className="mr-2 text-lg">{submitMessage.includes('❌') ? '⚠️' : '✅'}</span>
                <span>{submitMessage}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search and filter controls */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div className="relative w-full md:w-[300px]">
            <input
              type="text"
              placeholder="Search units..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4a6fa5] focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          {/* <div className="text-sm text-gray-500">
            Showing {filteredAndSortedItems.length} units
          </div> */}
          <Link to='/uom'>
            <motion.button
              className='bg-[#4a6fa5] text-white py-2 px-3 mt-2 w-full hover:bg-[#5a85c0] transition-colors rounded-lg font-medium flex items-center justify-center'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add Unit
            </motion.button>
          </Link>
        </motion.div>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center p-12"
          >
            <svg
              className="animate-spin h-12 w-12 text-[#061525] mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="text-[#061525] text-lg font-medium">Loading units...</p>
          </motion.div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 p-4 rounded-md border border-red-200"
          >
            <div className="flex items-center">
              <svg className="h-6 w-6 text-red-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700 font-medium">Error: {error.message}</p>
            </div>
            <button
              onClick={fetchItems}
              className="mt-3 bg-white text-red-700 border border-red-300 hover:bg-red-50 px-4 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </button>
          </motion.div>
        ) : (
          <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#4a6fa5]">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('serialNumber')}
                  >
                    <div className="flex items-center">
                      <span>Serial</span>
                      {getSortIcon('serialNumber')}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('unit')}
                  >
                    <div className="flex items-center">
                      <span>Unit</span>
                      {getSortIcon('unit')}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer "
                    onClick={() => requestSort('uomCode')}
                  >
                    <div className="flex items-center">
                      <span>Code</span>
                      {getSortIcon('uomCode')}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {currentItems.length === 0 ? (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center">
                          <svg className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-lg font-medium">No units found</p>
                          <p className="text-sm text-gray-400 mt-1">Try adjusting your search</p>
                        </div>
                      </td>
                    </motion.tr>
                  ) : (
                    currentItems.map((item, index) => (
                      <motion.tr
                        key={item.id}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={itemVariants}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            {item.serialNumber}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.unit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <code className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-mono">
                            {item.uomCode}
                          </code>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <motion.button
                            onClick={() => {
                              setEditItem(item);
                              setEditUnit(item.unit);
                              setEditUomCode(item.uomCode);
                              setEditSerialNumber(item.serialNumber.toString());
                              setShowUpdatePopup(item.id);
                            }}
                            className="text-[#497dcc] mr-4 inline-flex items-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            Edit
                          </motion.button>
                          <motion.button
                            onClick={() => setShowDeletePopup(item.id)}
                            disabled={deleteLoading[item.id]}
                            className="text-red-600 hover:text-red-900 inline-flex items-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {deleteLoading[item.id] ? (
                              <svg
                                className="animate-spin h-4 w-4 mr-1"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                            ) : (
                              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            )}
                            Delete
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>

            {/* Pagination Controls */}
            {filteredAndSortedItems.length > itemsPerPage && (
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
              >
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                      <span className="font-medium">
                        {Math.min(indexOfLastItem, filteredAndSortedItems.length)}
                      </span>{' '}
                      of <span className="font-medium">{filteredAndSortedItems.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${currentPage === 1
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-500 hover:bg-gray-50'
                          }`}
                      >
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>

                      {/* Page Numbers */}
                      {[...Array(totalPages)].map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentPage(idx + 1)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === idx + 1
                              ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                          {idx + 1}
                        </button>
                      ))}

                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${currentPage === totalPages
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-500 hover:bg-gray-50'
                          }`}
                      >
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Update Popup - Styled with modern look */}
      <AnimatePresence>
        {showUpdatePopup && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={popupVariants}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
              <div className="border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Update Unit of Measurement
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Edit the unit name for this measurement
                </p>
              </div>

              <div className="px-6 py-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit Name</label>
                  <input
                    type="text"
                    value={editUnit}
                    onChange={(e) => setEditUnit(e.target.value)}
                    placeholder="Enter Unit Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">UOM Code</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={editUomCode}
                      disabled
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                    <div className="ml-2 relative group">
                      <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                        UOM Code cannot be modified
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
                  <input
                    type="text"
                    value={editSerialNumber}
                    disabled
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                <motion.button
                  onClick={() => {
                    setEditItem(null);
                    setEditUnit('');
                    setEditUomCode('');
                    setEditSerialNumber('');
                    setShowUpdatePopup(null);
                  }}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={() => handleUpdate(showUpdatePopup)}
                  disabled={!editUnit.trim()}
                  className="px-4 py-2 bg-indigo-600 border border-transparent rounded-lg text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-indigo-400"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Update Unit
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation - Styled with modern look */}
      <AnimatePresence>
        {showDeletePopup && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={popupVariants}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
              <div className="border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <svg className="h-6 w-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Confirm Deletion
                </h3>
              </div>

              <div className="px-6 py-4">
                <p className="text-gray-700">
                  Are you sure you want to delete this unit of measurement? This action cannot be undone.
                </p>

                <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">
                        This will permanently delete the unit and may affect any connected measurements or products.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                <motion.button
                  onClick={() => setShowDeletePopup(null)}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={() => handleDelete(showDeletePopup)}
                  className="px-4 py-2 bg-red-600 border border-transparent rounded-lg text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Unit
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UomTable;
