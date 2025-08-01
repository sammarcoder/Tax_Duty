// import React, { useState, useEffect } from 'react';

// const FileDetailForm = ({ fileDetail, onSubmit, onCancel }) => {
//   const [formData, setFormData] = useState({
//     itemName: '',
//     assessableValue: '',
//     dutyValue: '',
//     totalAssessableValue: '',
//     totalDutyValue: '',
//     remarks: ''
//   });
//   const [taxItems, setTaxItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch available tax items for the dropdown
//   useEffect(() => {
//     const fetchTaxItems = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch('http://localhost:5000/api/v1/taxInfo');
//         if (!response.ok) throw new Error('Failed to fetch tax items');

//         const data = await response.json();
//         setTaxItems(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchTaxItems();
//   }, []);

//   // If editing, populate form with existing data
//   useEffect(() => {
//     if (fileDetail) {
//       setFormData({
//         itemName: fileDetail.taxInfo?.itemName || '',
//         assessableValue: fileDetail.fileDetail.assessableValue || '',
//         dutyValue: fileDetail.fileDetail.dutyValue || '',
//         totalAssessableValue: fileDetail.fileDetail.totalAssessableValue || '',
//         totalDutyValue: fileDetail.fileDetail.totalDutyValue || '',
//         remarks: fileDetail.fileDetail.remarks || ''
//       });
//     }
//   }, [fileDetail]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <div>
//       <h2>{fileDetail ? 'Edit File Detail' : 'Create New File Detail'}</h2>

//       {error && <div>Error: {error}</div>}
//       {isLoading && <div>Loading tax items...</div>}

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>
//             Item Name:
//             {fileDetail ? (
//               <input
//                 type="text"
//                 name="itemName"
//                 value={formData.itemName}
//                 disabled
//               />
//             ) : (
//               <select
//                 name="itemName"
//                 value={formData.itemName}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select an item</option>
//                 {taxItems.map(item => (
//                   <option key={item.id} value={item.itemName}>
//                     {item.itemName}
//                   </option>
//                 ))}
//               </select>
//             )}
//           </label>
//         </div>

//         <div>
//           <label>
//             Assessable Value:
//             <input
//               type="number"
//               name="assessableValue"
//               value={formData.assessableValue}
//               onChange={handleChange}
//               step="0.0001"
//               required
//             />
//           </label>
//         </div>

//         <div>
//           <label>
//             Duty Value:
//             <input
//               type="number"
//               name="dutyValue"
//               value={formData.dutyValue}
//               onChange={handleChange}
//               step="0.0001"
//               required
//             />
//           </label>
//         </div>

//         <div>
//           <label>
//             Total Assessable Value:
//             <input
//               type="number"
//               name="totalAssessableValue"
//               value={formData.totalAssessableValue}
//               onChange={handleChange}
//               step="0.0001"
//               required
//             />
//           </label>
//         </div>

//         <div>
//           <label>
//             Total Duty Value:
//             <input
//               type="number"
//               name="totalDutyValue"
//               value={formData.totalDutyValue}
//               onChange={handleChange}
//               step="0.0001"
//               required
//             />
//           </label>
//         </div>

//         <div>
//           <label>
//             Remarks:
//             <textarea
//               name="remarks"
//               value={formData.remarks}
//               onChange={handleChange}
//             />
//           </label>
//         </div>

//         <div className='flex gap-2'>
//           <button type="submit">
//             {fileDetail ? 'Update' : 'Create'}
//           </button>
//           <button type="button" onClick={onCancel}>
//             Cancel
//           </button>
//         </div>

//       </form>
//     </div>
//   );
// };

// export default FileDetailForm;
































// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const FileDetailForm = ({ fileDetail, onSubmit, onCancel }) => {
//   const [formData, setFormData] = useState({
//     itemName: '',
//     assessableValue: '',
//     dutyValue: '',
//     totalAssessableValue: '',
//     totalDutyValue: '',
//     remarks: ''
//   });
//   const [taxItems, setTaxItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   // Fetch available tax items for the dropdown
//   useEffect(() => {
//     const fetchTaxItems = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch('http://localhost:5000/api/v1/taxInfo');
//         if (!response.ok) throw new Error('Failed to fetch tax items');
        
//         const data = await response.json();
//         setTaxItems(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     fetchTaxItems();
//   }, []);

//   // If editing, populate form with existing data
//   useEffect(() => {
//     if (fileDetail) {
//       setFormData({
//         itemName: fileDetail.taxInfo?.itemName || '',
//         assessableValue: fileDetail.fileDetail.assessableValue || '',
//         dutyValue: fileDetail.fileDetail.dutyValue || '',
//         totalAssessableValue: fileDetail.fileDetail.totalAssessableValue || '',
//         totalDutyValue: fileDetail.fileDetail.totalDutyValue || '',
//         remarks: fileDetail.fileDetail.remarks || ''
//       });
//     }
//   }, [fileDetail]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   // Animation variants
//   const dropdownVariants = {
//     hidden: { opacity: 0, height: 0, overflow: 'hidden' },
//     visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
//     exit: { opacity: 0, height: 0, transition: { duration: 0.2 } }
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6">{fileDetail ? 'Edit File Detail' : 'Create New File Detail'}</h2>
      
//       {error && (
//         <div className="mb-6 p-4 rounded-lg bg-red-100 text-red-800">
//           <p>Error: {error}</p>
//         </div>
//       )}
      
//       {isLoading && !fileDetail ? (
//         <div className="flex justify-center p-12">
//           <p className="text-gray-500">Loading tax items...</p>
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Item Name */}
//             <div>
//               <label className="block font-medium mb-1">Item Name</label>
//               {fileDetail ? (
//                 <input
//                   type="text"
//                   name="itemName"
//                   value={formData.itemName}
//                   className="w-full p-2 border rounded-md bg-gray-100"
//                   disabled
//                 />
//               ) : (
//                 <div className="relative">
//                   <div
//                     className="w-full p-2 border rounded-md flex justify-between items-center cursor-pointer"
//                     onClick={() => setDropdownOpen(!dropdownOpen)}
//                   >
//                     <span>{formData.itemName || 'Select an item'}</span>
//                     <span>▼</span>
//                   </div>
//                   <AnimatePresence>
//                     {dropdownOpen && (
//                       <motion.ul
//                         variants={dropdownVariants}
//                         initial="hidden"
//                         animate="visible"
//                         exit="exit"
//                         className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto"
//                       >
//                         {taxItems.map(item => (
//                           <li
//                             key={item.id}
//                             className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
//                             onClick={() => {
//                               setFormData(prev => ({ ...prev, itemName: item.itemName }));
//                               setDropdownOpen(false);
//                             }}
//                           >
//                             {item.itemName}
//                           </li>
//                         ))}
//                       </motion.ul>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               )}
//             </div>
            
//             {/* Assessable Value */}
//             <div>
//               <label className="block font-medium mb-1">Assessable Value</label>
//               <input
//                 type="number"
//                 name="assessableValue"
//                 value={formData.assessableValue}
//                 onChange={handleChange}
//                 step="0.0001"
//                 className="w-full p-2 border rounded-md"
//                 required
//               />
//             </div>
            
//             {/* Duty Value */}
//             <div>
//               <label className="block font-medium mb-1">Duty Value</label>
//               <input
//                 type="number"
//                 name="dutyValue"
//                 value={formData.dutyValue}
//                 onChange={handleChange}
//                 step="0.0001"
//                 className="w-full p-2 border rounded-md"
//                 required
//               />
//             </div>
            
//             {/* Total Assessable Value */}
//             <div>
//               <label className="block font-medium mb-1">Total Assessable Value</label>
//               <input
//                 type="number"
//                 name="totalAssessableValue"
//                 value={formData.totalAssessableValue}
//                 onChange={handleChange}
//                 step="0.0001"
//                 className="w-full p-2 border rounded-md"
//                 required
//               />
//             </div>
            
//             {/* Total Duty Value */}
//             <div>
//               <label className="block font-medium mb-1">Total Duty Value</label>
//               <input
//                 type="number"
//                 name="totalDutyValue"
//                 value={formData.totalDutyValue}
//                 onChange={handleChange}
//                 step="0.0001"
//                 className="w-full p-2 border rounded-md"
//                 required
//               />
//             </div>
            
//             {/* Remarks */}
//             <div className="col-span-1 md:col-span-2">
//               <label className="block font-medium mb-1">Remarks</label>
//               <textarea
//                 name="remarks"
//                 value={formData.remarks}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded-md h-24"
//               />
//             </div>
//           </div>
          
//           <div className="flex justify-end space-x-4">
//             <button
//               type="button"
//               onClick={onCancel}
//               className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//             >
//               {fileDetail ? 'Update' : 'Create'}
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default FileDetailForm;









































import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FileDetailForm = ({ fileDetail, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    itemId: '',
    hsCode: '',
    uomCode: '',
    assessableValue: '',
    dutyValue: '',
    customDuty: '',
    acd: '',
    rd: '',
    ftaCustomDuty: '',
    salesTax: '',
    additionalSalesTax: '',
    furtherTax: '',
    incomeTaxImport: '',
    incomeTaxWithheld: '',
    totalAssessableValue: '',
    totalDutyValue: '',
    remarks: ''
  });
  const [taxItems, setTaxItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch available tax items for the dropdown
  useEffect(() => {
    const fetchTaxItems = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/v1/taxInfo');
        if (!response.ok) throw new Error('Failed to fetch tax items');
        
        const data = await response.json();
        setTaxItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTaxItems();
  }, []);

  // If editing, populate form with existing data
  useEffect(() => {
    if (fileDetail) {
      const file = fileDetail.fileDetail;
      setFormData({
        itemName: fileDetail.taxInfo?.itemName || '',
        itemId: fileDetail.taxInfo?.id || '',
        hsCode: file.hsCode || '',
        uomCode: file.uomCode || '',
        assessableValue: file.assessableValue || '',
        dutyValue: file.dutyValue || '',
        customDuty: file.customDuty || '',
        acd: file.acd || '',
        rd: file.rd || '',
        ftaCustomDuty: file.ftaCustomDuty || '',
        salesTax: file.salesTax || '',
        additionalSalesTax: file.additionalSalesTax || '',
        furtherTax: file.furtherTax || '',
        incomeTaxImport: file.incomeTaxImport || '',
        incomeTaxWithheld: file.incomeTaxWithheld || '',
        totalAssessableValue: file.totalAssessableValue || '',
        totalDutyValue: file.totalDutyValue || '',
        remarks: file.remarks || ''
      });
      setSelectedItem(fileDetail.taxInfo);
    }
  }, [fileDetail]);

  const handleSelectItem = async (item) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/api/v1/taxInfo/${item.id}`);
      if (!response.ok) throw new Error('Failed to fetch tax item details');
      
      const taxItemData = await response.json();
      setSelectedItem(taxItemData);
      
      // Calculate potential duty value based on tax percentages
      const av = parseFloat(taxItemData.assessableValue || 0);
      const customDuty = (parseFloat(taxItemData.customDuty || 0) / 100) * av;
      const acd = (parseFloat(taxItemData.acd || 0) / 100) * av;
      const rd = (parseFloat(taxItemData.rd || 0) / 100) * av;
      const ftaCustomDuty = (parseFloat(taxItemData.ftaCustomDuty || 0) / 100) * av;
      const salesTax = (parseFloat(taxItemData.salesTax || 0) / 100) * av;
      const additionalSalesTax = (parseFloat(taxItemData.additionalSalesTax || 0) / 100) * av;
      const furtherTax = (parseFloat(taxItemData.furtherTax || 0) / 100) * av;
      const incomeTaxImport = (parseFloat(taxItemData.incomeTaxImport || 0) / 100) * av;
      const incomeTaxWithheld = (parseFloat(taxItemData.incomeTaxWithheld || 0) / 100) * av;
      
      const calculatedDutyValue = customDuty + acd + rd + ftaCustomDuty + salesTax + 
                          additionalSalesTax + furtherTax + incomeTaxImport + incomeTaxWithheld;
      
      // Populate the form with all the tax info data
      setFormData({
        itemName: taxItemData.itemName,
        itemId: taxItemData.id,
        hsCode: taxItemData.hsCode,
        uomCode: taxItemData.uomCode,
        assessableValue: taxItemData.assessableValue?.toString() || '0.0000',
        dutyValue: calculatedDutyValue.toFixed(4),
        customDuty: taxItemData.customDuty?.toString() || '0.00',
        acd: taxItemData.acd?.toString() || '0.00',
        rd: taxItemData.rd?.toString() || '0.00',
        ftaCustomDuty: taxItemData.ftaCustomDuty?.toString() || '0.00',
        salesTax: taxItemData.salesTax?.toString() || '0.00',
        additionalSalesTax: taxItemData.additionalSalesTax?.toString() || '0.00',
        furtherTax: taxItemData.furtherTax?.toString() || '0.00',
        incomeTaxImport: taxItemData.incomeTaxImport?.toString() || '0.00',
        incomeTaxWithheld: taxItemData.incomeTaxWithheld?.toString() || '0.00',
        totalAssessableValue: taxItemData.assessableValue?.toString() || '0.0000',
        totalDutyValue: calculatedDutyValue.toFixed(4),
        remarks: `File for ${taxItemData.itemName}`
      });
      
      setDropdownOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, height: 0, overflow: 'hidden' },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2 } }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">{fileDetail ? 'Edit File Detail' : 'Create New File Detail'}</h2>
      
      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-100 text-red-800">
          <p>Error: {error}</p>
        </div>
      )}
      
      {isLoading && !fileDetail ? (
        <div className="flex justify-center p-12">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Item Selection */}
          <div className="mb-6">
            <label className="block font-medium mb-1">Item Selection</label>
            {fileDetail ? (
              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                className="w-full p-2 border rounded-md bg-gray-100"
                disabled
              />
            ) : (
              <div className="relative">
                <div
                  className="w-full p-2 border rounded-md flex justify-between items-center cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span>{formData.itemName || 'Select an item'}</span>
                  <span>▼</span>
                </div>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.ul
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto"
                    >
                      {taxItems.map(item => (
                        <li
                          key={item.id}
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                          onClick={() => handleSelectItem(item)}
                        >
                          {item.itemName}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Display Selected Item Info */}
          {selectedItem && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Basic Info Fields */}
              <div>
                <label className="block font-medium mb-1">HS Code</label>
                <input
                  type="text"
                  name="hsCode"
                  value={formData.hsCode}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block font-medium mb-1">UOM Code</label>
                <input
                  type="text"
                  name="uomCode"
                  value={formData.uomCode}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  disabled
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Assessable Value</label>
                <input
                  type="number"
                  name="assessableValue"
                  value={formData.assessableValue}
                  onChange={handleChange}
                  step="0.0001"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Duty Value</label>
                <input
                  type="number"
                  name="dutyValue"
                  value={formData.dutyValue}
                  onChange={handleChange}
                  step="0.0001"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              
              {/* Tax Rates Section */}
              <div>
                <label className="block font-medium mb-1">Custom Duty (%)</label>
                <input
                  type="number"
                  name="customDuty"
                  value={formData.customDuty}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">ACD (%)</label>
                <input
                  type="number"
                  name="acd"
                  value={formData.acd}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">RD (%)</label>
                <input
                  type="number"
                  name="rd"
                  value={formData.rd}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">FTA Custom Duty (%)</label>
                <input
                  type="number"
                  name="ftaCustomDuty"
                  value={formData.ftaCustomDuty}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Sales Tax (%)</label>
                <input
                  type="number"
                  name="salesTax"
                  value={formData.salesTax}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Additional Sales Tax (%)</label>
                <input
                  type="number"
                  name="additionalSalesTax"
                  value={formData.additionalSalesTax}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Further Tax (%)</label>
                <input
                  type="number"
                  name="furtherTax"
                  value={formData.furtherTax}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Income Tax Import (%)</label>
                <input
                  type="number"
                  name="incomeTaxImport"
                  value={formData.incomeTaxImport}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Income Tax Withheld (%)</label>
                <input
                  type="number"
                  name="incomeTaxWithheld"
                  value={formData.incomeTaxWithheld}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Totals Section */}
              <div>
                <label className="block font-medium mb-1">Total Assessable Value</label>
                <input
                  type="number"
                  name="totalAssessableValue"
                  value={formData.totalAssessableValue}
                  onChange={handleChange}
                  step="0.0001"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Total Duty Value</label>
                <input
                  type="number"
                  name="totalDutyValue"
                  value={formData.totalDutyValue}
                  onChange={handleChange}
                  step="0.0001"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              {/* Remarks */}
              <div className="col-span-1 md:col-span-2 lg:col-span-3">
                <label className="block font-medium mb-1">Remarks</label>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md h-24"
                />
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {fileDetail ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default FileDetailForm;
