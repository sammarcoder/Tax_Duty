// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const Uom = ({ onClose }) => {
//     const [items, setItems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [unit, setUnit] = useState('');
//     const [submitMessage, setSubmitMessage] = useState('');
//     const [submitting, setSubmitting] = useState(false);
//     const [deleteLoading, setDeleteLoading] = useState({});

//     // Fetch units from API
//     const fetchItems = async () => {
//         try {
//             setLoading(true);
//             const response = await fetch('http://localhost:5000/api/v1/unit');
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             const data = await response.json();
//             setItems(data);
//         } catch (err) {
//             setError(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchItems();
//     }, []);

//     // Submit unit to API
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!unit.trim()) return;

//         setSubmitting(true);
//         setSubmitMessage('');

//         try {
//             const response = await fetch('http://localhost:5000/api/v1/unit', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ unit }),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'Failed to create unit');
//             }

//             const newItem = await response.json();
//             setItems((prev) => [...prev, newItem]);
//             setSubmitMessage('✅ Unit added successfully');
//             setUnit('');
//         } catch (err) {
//             setSubmitMessage(`❌ Error: ${err.message}`);
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     // Delete unit from API
//     const handleDelete = async (id) => {
//         setDeleteLoading(prev => ({ ...prev, [id]: true }));

//         try {
//             const response = await fetch(`http://localhost:5000/api/v1/unit/${id}`, {
//                 method: 'DELETE',
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.error || 'Failed to delete unit');
//             }

//             setItems(items.filter(item => item.id !== id));
//             setSubmitMessage('✅ Unit deleted successfully');
//         } catch (err) {
//             console.error('Error deleting unit:', err);
//             setSubmitMessage(`❌ Error: ${err.message}`);
//         } finally {
//             setDeleteLoading(prev => ({ ...prev, [id]: false }));
//         }
//     };

//     // Item animation variants
//     const itemVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: { opacity: 1, y: 0 },
//         exit: { opacity: 0, scale: 0.8 }
//     };

//     return (
//         <div className="p-6 max-w-3xl mx-auto">
//             <div className="flex justify-between items-center mb-6">
//                 <motion.h2 
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     className="text-2xl font-bold text-[#061525]"
//                 >
//                     Manage Units of Measurement
//                 </motion.h2>
//             </div>

//             <motion.div 
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="mb-8"
//             >
//                 <h3 className="text-lg font-medium text-[#061525] mb-3">Add New Unit</h3>
//                 <form onSubmit={handleSubmit} className="flex gap-2">
//                     <motion.input
//                         type="text"
//                         value={unit}
//                         onChange={(e) => setUnit(e.target.value)}
//                         placeholder="Enter Unit"
//                         className="flex-grow p-3 border-2 rounded-md border-[#4d555b]/30 hover:border-[#4d555b]/50 focus:border-[#061525] focus:outline-none focus:shadow-lg transition-all duration-300"
//                         required
//                         whileFocus={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
//                     />
//                     <motion.button
//                         type="submit"
//                         disabled={submitting}
//                         className="px-6 py-3 bg-[#061525] text-white font-bold rounded-lg shadow-md hover:bg-[#0c2542] disabled:opacity-50"
//                         whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
//                         whileTap={{ scale: 0.95 }}
//                     >
//                         {submitting ? 'Adding...' : 'Add Unit'}
//                     </motion.button>
//                 </form>
//                 {submitMessage && (
//                     <motion.p 
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="mt-2 text-sm"
//                     >
//                         {submitMessage}
//                     </motion.p>
//                 )}
//             </motion.div>

//             <motion.h3 
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="text-lg font-medium text-[#061525] mb-3"
//             >
//                 Available Units
//             </motion.h3>

//             {loading ? (
//                 <motion.div 
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="flex justify-center p-4"
//                 >
//                     <div className="loader">Loading...</div>
//                 </motion.div>
//             ) : error ? (
//                 <motion.p 
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="text-red-500 p-4"
//                 >
//                     Error: {error.message}
//                 </motion.p>
//             ) : (
//                 <motion.ul className="space-y-2 max-h-80 overflow-y-auto">
//                     <AnimatePresence>
//                         {items.map((item) => (
//                             <motion.li 
//                                 key={item.id}
//                                 initial="hidden"
//                                 animate="visible"
//                                 exit="exit"
//                                 variants={itemVariants}
//                                 className="border-2 border-[#4d555b]/20 p-3 rounded-md shadow-sm flex justify-between items-center hover:border-[#4d555b]/40 transition-colors"
//                             >
//                                 <div>
//                                     <h3 className="font-semibold text-[#061525]">{item.unit}</h3>
//                                     <p className="text-sm text-[#4d555b]">Code: {item.uomCode}</p>
//                                 </div>
//                                 <motion.button
//                                     onClick={() => handleDelete(item.id)}
//                                     disabled={deleteLoading[item.id]}
//                                     className="text-red-500 hover:text-red-700 transition-colors"
//                                     whileHover={{ scale: 1.1 }}
//                                     whileTap={{ scale: 0.9 }}
//                                 >
//                                     {deleteLoading[item.id] ? (
//                                         <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                         </svg>
//                                     ) : (
//                                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                         </svg>
//                                     )}
//                                 </motion.button>
//                             </motion.li>
//                         ))}
//                     </AnimatePresence>
//                 </motion.ul>
//             )}
//         </div>
//     );
// };

// export default Uom;
































import React, { useState } from 'react';
import { motion } from 'framer-motion';

const UomCreate = () => {
  const [unit, setUnit] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Submit unit to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!unit.trim()) return;

    setSubmitting(true);
    setSubmitMessage('');
    // const VITE_API_URL ="http://192.168.67.127:5000"
    try {
      const response = await fetch('/api/v1/unit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unit }),
      });

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Failed to create unit');
      // }
      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error details:", errorData);
        throw new Error(errorData.error || errorData.message || 'Failed to create unit');
      }

      setSubmitMessage('✅ Unit added successfully');
      setUnit('');
    } catch (err) {
      setSubmitMessage(`❌ Error: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto rounded-xl  shadow-md mt-10">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-semibold text-[#4a6fa5] mb-6"
      >
        Add New Unit of Measurement
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h3 className="text-gray-700 mb-3 ">Add New Unit</h3>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <motion.input
            type="text"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            placeholder="Enter Unit"
            className="flex-grow p-3 border-2 rounded-md border-[#4a6fa5]/30 hover:border-[#4a6fa5]/50 focus:border-[#4a6fa5] focus:outline-none focus:shadow-lg transition-all duration-300"
            required
            whileFocus={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
          />
          <motion.button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 bg-[#4a6fa5] text-white font-medium rounded-lg shadow-md hover:bg-[#0c2542] disabled:opacity-50"
            whileHover={{ scale: 1.05, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)' }}
            whileTap={{ scale: 0.95 }}
          >
            {submitting ? 'Adding...' : 'Add Unit'}
          </motion.button>
        </form>
        {submitMessage && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm"
          >
            {submitMessage}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default UomCreate;