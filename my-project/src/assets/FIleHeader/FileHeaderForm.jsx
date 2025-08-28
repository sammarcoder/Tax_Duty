






// // src/assets/FileHeader/FileHeaderForm.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import HeaderSection from './HeaderSection';
// import ItemSelector from './ItemSelector';
// import ItemDetails from './ItemDetails';
// import ItemsList from './ItemsList';

// const API_URL = 'http://localhost:5000/api/v1';

// const FileHeaderForm = ({ readOnly = false }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const isEditMode = !!id;

//   // States
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [taxItems, setTaxItems] = useState([]);
//   const [alert, setAlert] = useState({ show: false, message: '', type: 'info' });

//   // New state to control visibility of item selector
//   const [showItemSelector, setShowItemSelector] = useState(false);

//   // Header data
//   const [headerData, setHeaderData] = useState({
//     fileName: '',
//     fileNumber: '',
//     exchangeRate: '',
//     valueAdditionRate: 1.1,
//     currency: ''
//   });

//   // Current item being edited
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [currentItemDetails, setCurrentItemDetails] = useState(null);
//   const [editingItemId, setEditingItemId] = useState(null);

//   // List of items in the file
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     // Load tax items
//     const fetchTaxItems = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`${API_URL}/taxInfo`);
//         setTaxItems(response.data);
//       } catch (error) {
//         console.error('Error loading tax items:', error);
//         showAlert('Failed to load tax items', 'error');
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchFileData = async () => {
//       if (id) {
//         try {
//           setLoading(true);
//           const response = await axios.get(`${API_URL}/fileheaders/${id}`);
//           const fileData = response.data;

//           // Ensure fileName is included in the headerData state
//           setHeaderData({
//             id: fileData.id,
//             fileName: fileData.fileName || '', 
//             fileNumber: fileData.fileNumber || '',
//             exchangeRate: fileData.exchangeRate || 280.50,
//             valueAdditionRate: fileData.valueAdditionRate || 1.1,
//             currency: fileData.currency || 'USD'
//           });

//           if (fileData.details && fileData.details.length > 0) {
//             setItems(fileData.details);
//           }
//         } catch (error) {
//           console.error('Error loading file data:', error);
//           showAlert('Failed to load file data', 'error');
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchTaxItems();
//     if (isEditMode) {
//       fetchFileData();
//     }
//   }, [id, isEditMode]);

//   const showAlert = (message, type = 'info') => {
//     setAlert({ show: true, message, type });
//     setTimeout(() => {
//       setAlert({ show: false, message: '', type: 'info' });
//     }, 3000);
//   };

//   const handleHeaderChange = (field, value) => {
//     setHeaderData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleItemSelect = (item) => {
//     setSelectedItem(item);

//     // Initialize current item details with tax info values
//     const assessableValue = parseFloat(item.assessableValue) || 0;
//     const customDuty = parseFloat(item.customDuty) || 0;
//     const acd = parseFloat(item.acd) || 0;
//     const rd = parseFloat(item.rd) || 0;
//     const ftaCustomDuty = parseFloat(item.ftaCustomDuty) || 0;
//     const salesTax = parseFloat(item.salesTax) || 0;
//     const additionalSalesTax = parseFloat(item.additionalSalesTax) || 0;
//     const furtherTax = parseFloat(item.furtherTax) || 0;
//     const incomeTaxImport = parseFloat(item.incomeTaxImport) || 0;
//     const incomeTaxWithheld = parseFloat(item.incomeTaxWithheld) || 0;

//     // Calculate declared value
//     const declaredValue = assessableValue * (
//       customDuty + acd + rd + ftaCustomDuty + salesTax +
//       additionalSalesTax + furtherTax + incomeTaxImport +
//       incomeTaxWithheld
//     ) / 100;

//     setCurrentItemDetails({
//       taxInfoId: item.id,
//       itemName: item.itemName,
//       hsCode: item.hsCode,
//       uomCode: item.uomCode,
//       assessableQuantity: 1,
//       assessableValue,
//       totalAssessableValue: assessableValue,
//       declaredQuantity: 1,
//       declaredValue,
//       totalDeclaredValue: declaredValue,
//       total: assessableValue + declaredValue,
//       isCustomDutySelected: true,
//       isFtaCustomDutySelected: false,
//       customDuty,
//       acd,
//       rd,
//       ftaCustomDuty,
//       salesTax,
//       additionalSalesTax,
//       furtherTax,
//       incomeTaxImport,
//       incomeTaxWithheld,
//       remarks: ''
//     });

//     // Hide the item selector once an item is selected
//     setShowItemSelector(false);
//   };

//   const handleItemDetailChange = (field, value) => {
//     setCurrentItemDetails(prev => {
//       if (!prev) return null;

//       const updated = { ...prev, [field]: value };

//       // Handle duty type selection
//       if (field === 'isCustomDutySelected' && value === true) {
//         updated.isFtaCustomDutySelected = false;
//       }
//       if (field === 'isFtaCustomDutySelected' && value === true) {
//         updated.isCustomDutySelected = false;
//       }

//       // Recalculate values based on field changes
//       if (['assessableQuantity', 'assessableValue'].includes(field)) {
//         updated.totalAssessableValue = updated.assessableQuantity * updated.assessableValue;
//       }

//       if (['declaredQuantity', 'declaredValue'].includes(field)) {
//         updated.totalDeclaredValue = updated.declaredQuantity * updated.declaredValue;
//       }

//       // Recalculate declared value if tax rates or assessable value changes
//       if ([
//         'assessableValue', 'customDuty', 'acd', 'rd', 'ftaCustomDuty',
//         'salesTax', 'additionalSalesTax', 'furtherTax',
//         'incomeTaxImport', 'incomeTaxWithheld',
//         'isCustomDutySelected', 'isFtaCustomDutySelected'
//       ].includes(field)) {
//         const customDutyRate = updated.isCustomDutySelected ? parseFloat(updated.customDuty || 0) : 0;
//         const ftaCustomDutyRate = updated.isFtaCustomDutySelected ? parseFloat(updated.ftaCustomDuty || 0) : 0;

//         const newDeclaredValue = updated.assessableValue * (
//           customDutyRate +
//           ftaCustomDutyRate +
//           parseFloat(updated.acd || 0) +
//           parseFloat(updated.rd || 0) +
//           parseFloat(updated.salesTax || 0) +
//           parseFloat(updated.additionalSalesTax || 0) +
//           parseFloat(updated.furtherTax || 0) +
//           parseFloat(updated.incomeTaxImport || 0) +
//           parseFloat(updated.incomeTaxWithheld || 0)
//         ) / 100;

//         updated.declaredValue = newDeclaredValue;
//         updated.totalDeclaredValue = updated.declaredQuantity * newDeclaredValue;
//       }

//       // Update grand total
//       updated.total = parseFloat(updated.totalAssessableValue || 0) +
//         parseFloat(updated.totalDeclaredValue || 0);

//       return updated;
//     });
//   };

//   const handleAddItem = async () => {
//     if (!currentItemDetails) return;

//     try {
//       if (isEditMode) {
//         // If editing file and adding new item
//         setSaving(true);
//         const response = await axios.post(`${API_URL}/fileheaders/${id}/items`, currentItemDetails);
//         setItems(prev => [...prev, response.data]);
//         showAlert('Item added successfully', 'success');
//       } else {
//         // For new file, just add to local state
//         setItems(prev => [...prev, { ...currentItemDetails, id: Date.now() }]);
//         showAlert('Item added', 'success');
//       }
//     } catch (error) {
//       showAlert(`Error adding item: ${error.message}`, 'error');
//     } finally {
//       setSaving(false);
//       setSelectedItem(null);
//       setCurrentItemDetails(null);
//     }
//   };

//   const handleEditItem = (item) => {
//     setEditingItemId(item.id);
//     setCurrentItemDetails({
//       ...item,
//       taxInfoId: item.taxInfoId || item.TaxInfo?.id
//     });
//     // Hide item selector when editing
//     setShowItemSelector(false);
//   };

//   const handleUpdateItem = async () => {
//     if (!currentItemDetails || !editingItemId) return;

//     try {
//       if (isEditMode) {
//         // If editing an existing file item
//         setSaving(true);
//         const response = await axios.put(
//           `${API_URL}/fileheaders/items/${editingItemId}`,
//           currentItemDetails
//         );
//         setItems(prev => prev.map(item =>
//           item.id === editingItemId ? response.data : item
//         ));
//       } else {
//         // For new file, update local state
//         setItems(prev => prev.map(item =>
//           item.id === editingItemId ? { ...currentItemDetails, id: item.id } : item
//         ));
//       }
//       showAlert('Item updated successfully', 'success');
//     } catch (error) {
//       showAlert(`Error updating item: ${error.message}`, 'error');
//     } finally {
//       setSaving(false);
//       setEditingItemId(null);
//       setCurrentItemDetails(null);
//     }
//   };

//   const handleRemoveItem = async (itemId) => {
//     try {
//       if (isEditMode) {
//         // If removing from existing file
//         await axios.delete(`${API_URL}/fileheaders/items/${itemId}`);
//       }
//       setItems(prev => prev.filter(item => item.id !== itemId));
//       showAlert('Item removed', 'info');
//     } catch (error) {
//       showAlert(`Error removing item: ${error.message}`, 'error');
//     }
//   };

//   const handleSave = async () => {
//     if (items.length === 0) {
//       showAlert('Please add at least one item', 'error');
//       return;
//     }

//     try {
//       setSaving(true);

//       const fileData = {
//         fileName: headerData.fileName,
//         exchangeRate: headerData.exchangeRate,
//         valueAdditionRate: headerData.valueAdditionRate,
//         currency: headerData.currency,
//         items: items.map(item => ({
//           id: item.id, // Include ID for existing items
//           taxInfoId: item.taxInfoId,
//           assessableQuantity: parseFloat(item.assessableQuantity) || 1,
//           assessableValue: parseFloat(item.assessableValue) || 0,
//           declaredQuantity: parseFloat(item.declaredQuantity) || 1,
//           declaredValue: parseFloat(item.declaredValue) || 0,
//           isCustomDutySelected: item.isCustomDutySelected,
//           isFtaCustomDutySelected: item.isFtaCustomDutySelected,
//           customDuty: parseFloat(item.customDuty) || 0,
//           ftaCustomDuty: parseFloat(item.ftaCustomDuty) || 0,
//           acd: parseFloat(item.acd) || 0,
//           rd: parseFloat(item.rd) || 0,
//           salesTax: parseFloat(item.salesTax) || 0,
//           additionalSalesTax: parseFloat(item.additionalSalesTax) || 0,
//           furtherTax: parseFloat(item.furtherTax) || 0,
//           incomeTaxImport: parseFloat(item.incomeTaxImport) || 0,
//           incomeTaxWithheld: parseFloat(item.incomeTaxWithheld) || 0,
//           totalAssessableValue: parseFloat(item.totalAssessableValue) || 0,
//           totalDeclaredValue: parseFloat(item.totalDeclaredValue) || 0,
//           total: parseFloat(item.total) || 0,
//           remarks: item.remarks || ''
//         }))
//       };

//       let response;

//       if (isEditMode) {
//         // Update existing file
//         response = await axios.put(`${API_URL}/fileheaders/${id}`, fileData);
//         showAlert(`File updated successfully: ${headerData.fileNumber}`, 'success');
//       } else {
//         // Create new file
//         response = await axios.post(`${API_URL}/fileheaders`, fileData);
//         showAlert(`File created successfully: ${response.data.fileHeader.fileNumber}`, 'success');

//         // Reset form after successful save (only for new files)
//         setHeaderData({
//           fileName: '',
//           fileNumber: '',
//           exchangeRate: 280.50,
//           valueAdditionRate: 1.1,
//           currency: 'USD'
//         });
//         setItems([]);
//       }

//       // Navigate to files list after successful save/update
//       setTimeout(() => {
//         navigate('/files');
//       }, 1500);
//     } catch (error) {
//       console.error('Error saving file:', error);

//       // Better error messaging
//       if (error.response) {
//         showAlert(`Error: ${error.response.data.message || error.response.data.error || 'Server error'}`, 'error');
//       } else if (error.request) {
//         showAlert('Network error - no response from server', 'error');
//       } else {
//         showAlert(`Error: ${error.message}`, 'error');
//       }
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return <div className="flex justify-center items-center h-64">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//     </div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       {alert.show && (
//         <div className={`p-4 mb-4 rounded ${alert.type === 'error' ? 'bg-red-100 text-red-700' :
//             'bg-green-100 text-green-700'
//           }`}>
//           {alert.message}
//         </div>
//       )}

//       <div className="bg-white shadow-md rounded-lg p-6">
//         <h1 className="text-2xl font-bold mb-6">
//           {readOnly ? 'View File' : isEditMode ? 'Edit File' : 'Create New File'}
//         </h1>

//         {/* Header Section */}
//         <HeaderSection
//           headerData={headerData}
//           onHeaderChange={handleHeaderChange}
//           readOnly={readOnly}
//         />

//         {/* Item Selection & Details Section - Only if not readOnly */}
//         {!readOnly && (
//           <div className="mt-8 border-t pt-6">
//             <h2 className="text-xl font-semibold mb-4">
//               {editingItemId ? 'Edit Item' : 'Add Items'}
//             </h2>

//             {/* New "Add Items" button that shows the item selector when clicked */}
//             {!editingItemId && !currentItemDetails && !showItemSelector && (
//               <button 
//                 onClick={() => setShowItemSelector(true)}
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//               >
//                 Add Items
//               </button>
//             )}

//             {/* Item Selector - only show when button is clicked and not editing */}
//             {!editingItemId && showItemSelector && (
//               <ItemSelector
//                 taxItems={taxItems}
//                 onItemSelect={handleItemSelect}
//               />
//             )}

//             {currentItemDetails && (
//               <ItemDetails
//                 itemDetails={currentItemDetails}
//                 onItemDetailChange={handleItemDetailChange}
//                 onAddItem={editingItemId ? handleUpdateItem : handleAddItem}
//                 onCancelEdit={() => {
//                   setEditingItemId(null);
//                   setCurrentItemDetails(null);
//                   setShowItemSelector(false); // Reset the selector visibility on cancel
//                 }}
//                 isEditing={!!editingItemId}
//                 saving={saving}
//               />
//             )}
//           </div>
//         )}

//         {/* Items List Section */}
//         {items.length > 0 && (
//           <div className="mt-8 border-t pt-6">
//             <h2 className="text-xl font-semibold mb-4">File Items</h2>

//             <ItemsList
//               items={items}
//               onEditItem={!readOnly && !editingItemId ? handleEditItem : undefined}
//               onRemoveItem={!readOnly && !editingItemId ? handleRemoveItem : undefined}
//             />

//             {/* File Totals */}
//             <div className="mt-6 border-t pt-4">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="text-lg font-semibold">File Totals:</p>
//                   <p>Total Assessable Value: {items.reduce((sum, item) =>
//                     sum + parseFloat(item.totalAssessableValue || 0), 0).toFixed(2)}
//                   </p>
//                   <p>Total Declared Value: {items.reduce((sum, item) =>
//                     sum + parseFloat(item.totalDeclaredValue || 0), 0).toFixed(2)}
//                   </p>
//                   <p className="font-bold">Grand Total: {items.reduce((sum, item) =>
//                     sum + parseFloat(item.total || 0), 0).toFixed(2)}
//                   </p>
//                 </div>

//                 {!readOnly && !editingItemId && (
//                   <button
//                     onClick={handleSave}
//                     disabled={items.length === 0 || saving}
//                     className={`bg-blue-600 text-white py-2 px-6 rounded-lg
//                       hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
//                       ${(items.length === 0 || saving) ? 'opacity-50 cursor-not-allowed' : ''}`}
//                   >
//                     {saving ? 'Processing...' : isEditMode ? 'Update File' : 'Save File'}
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FileHeaderForm;





































































// src/assets/FileHeader/FileHeaderForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderSection from './HeaderSection';
import ItemSelector from './ItemSelector';
import ItemDetails from './ItemDetails';
import ItemsList from './ItemsList';

const API_URL = '/api/v1';
// const API_URL = 'http://localhost:5000/api/v1';
// const VITE_API_URL ="http://192.168.67.127:5000"
// const API_URL = VITE_API_URL || 'http://localhost:5000/api/v1';

const FileHeaderForm = ({ readOnly = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  // States
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [taxItems, setTaxItems] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'info' });

  // New state to control visibility of item selector popup
  const [showItemSelector, setShowItemSelector] = useState(false);

  // Header data
  const [headerData, setHeaderData] = useState({
    fileName: '',
    fileNumber: '',
    landedCost: 1.01,
    exchangeRate: '',
    valueAdditionRate: 1.1,
    currency: ''
  });






  // Formulas section 




  // Current item being edited
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentItemDetails, setCurrentItemDetails] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null);

  // List of items in the file
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Load tax items
    const fetchTaxItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/taxInfo`);
        setTaxItems(response.data);
      } catch (error) {
        console.error('Error loading tax items:', error);
        showAlert('Failed to load tax items', 'error');
      } finally {
        setLoading(false);
      }
    };

    const fetchFileData = async () => {
      if (id) {
        try {
          setLoading(true);
          const response = await axios.get(`${API_URL}/fileheaders/${id}`);
          const fileData = response.data;

          // console.log(fileData)
          // Ensure fileName is included in the headerData state
          setHeaderData({
            id: fileData.id,
            fileName: fileData.fileName || '',
            fileNumber: fileData.fileNumber || '',
            exchangeRate: fileData.exchangeRate || 280.50,
            landedCost: fileData.landedCost || 1.01,
            valueAdditionRate: fileData.valueAdditionRate || 1.1,
            currency: fileData.currency || 'USD'
          });

          if (fileData.details && fileData.details.length > 0) {
            setItems(fileData.details);
          }
        } catch (error) {
          console.error('Error loading file data:', error);
          showAlert('Failed to load file data', 'error');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTaxItems();
    if (isEditMode) {
      fetchFileData();
    }
  }, [id, isEditMode]);

  const showAlert = (message, type = 'info') => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: '', type: 'info' });
    }, 3000);
  };

  const handleHeaderChange = (field, value) => {
    setHeaderData(prev => ({ ...prev, [field]: value }));
  };






  const handleItemSelect = (item) => {
    setSelectedItem(item);

    // Parse all values to ensure they're numbers
    const assessableValue = parseFloat(item.assessableValue) || 0;

    setCurrentItemDetails({
      taxInfoId: item.id,
      itemName: item.itemName,
      hsCode: item.hsCode,
      uomCode: item.uomCode,
      assessableQuantity: 1,
      assessableValue: assessableValue,
      totalAssessableValue: assessableValue, // This will be a number
      declaredQuantity: 1,
      declaredValue: 0,
      totalDeclaredValue: 0,
      total: assessableValue,
      isCustomDutySelected: false,
      isFtaCustomDutySelected: true,
      customDuty: parseFloat(item.customDuty) || 0,
      acd: parseFloat(item.acd) || 0,
      rd: parseFloat(item.rd) || 0,
      ftaCustomDuty: parseFloat(item.ftaCustomDuty) || 0,
      salesTax: parseFloat(item.salesTax) || 0,
      additionalSalesTax: parseFloat(item.additionalSalesTax) || 0,
      furtherTax: parseFloat(item.furtherTax) || 0,
      incomeTaxImport: parseFloat(item.incomeTaxImport) || 0,
      incomeTaxWithheld: parseFloat(item.incomeTaxWithheld) || 0,
      remarks: ''
    });

    setShowItemSelector(false);
  };







  // const handleItemSelect = (item) => {
  //   setSelectedItem(item);

  //   // Initialize with FTA selected by default (matching model defaults)
  //   setCurrentItemDetails({
  //     taxInfoId: item.id,
  //     itemName: item.itemName,
  //     hsCode: item.hsCode,
  //     uomCode: item.uomCode,
  //     assessableQuantity: 1,
  //     assessableValue: parseFloat(item.assessableValue) || 0,
  //     totalAssessableValue: parseFloat(item.assessableValue) || 0,
  //     declaredQuantity: 1,
  //     declaredValue: 0,
  //     totalDeclaredValue: 0,
  //     total: parseFloat(item.assessableValue) || 0,
  //     isCustomDutySelected: false,         // Default to false (matching model)
  //     isFtaCustomDutySelected: true,       // Default to true (matching model)
  //     customDuty: parseFloat(item.customDuty) || 0,
  //     acd: parseFloat(item.acd) || 0,
  //     rd: parseFloat(item.rd) || 0,
  //     ftaCustomDuty: parseFloat(item.ftaCustomDuty) || 0,
  //     salesTax: parseFloat(item.salesTax) || 0,
  //     additionalSalesTax: parseFloat(item.additionalSalesTax) || 0,
  //     furtherTax: parseFloat(item.furtherTax) || 0,
  //     incomeTaxImport: parseFloat(item.incomeTaxImport) || 0,
  //     incomeTaxWithheld: parseFloat(item.incomeTaxWithheld) || 0,
  //     remarks: ''
  //   });

  //   console.log('this is ', typeof (item.assessableValue))
  //   // Close the popup when an item is selected
  //   setShowItemSelector(false);
  // };













  const handleItemDetailChange = (field, value) => {
    setCurrentItemDetails(prev => {
      if (!prev) return null;

      const updated = { ...prev, [field]: value };

      // Handle duty type selection
      if (field === 'isCustomDutySelected' && value === true) {
        updated.isFtaCustomDutySelected = false;
      }
      if (field === 'isFtaCustomDutySelected' && value === true) {
        updated.isCustomDutySelected = false;
      }

      // Recalculate values based on field changes
      if (['assessableQuantity', 'assessableValue'].includes(field)) {
        updated.totalAssessableValue = updated.assessableQuantity * updated.assessableValue;
      }

      if (['declaredQuantity', 'declaredValue'].includes(field)) {
        updated.totalDeclaredValue = updated.declaredQuantity * updated.declaredValue;
      }

      // REMOVE THE AUTOMATIC RECALCULATION OF DECLARED VALUE
      // This block was causing declared value to be overwritten when tax rates changed
      // We're removing it to allow manual entry of declared value

      // Update grand total
      updated.total = parseFloat(updated.totalAssessableValue || 0) +
        parseFloat(updated.totalDeclaredValue || 0);

      return updated;
    });
  };










  // const handleAddItem = async () => {
  //   if (!currentItemDetails) return;

  //   try {
  //     if (isEditMode) {
  //       // If editing file and adding new item
  //       setSaving(true);
  //       const response = await axios.post(`${API_URL}/fileheaders/${id}/items`, currentItemDetails);
  //       setItems(prev => [...prev, response.data]);
  //       showAlert('Item added successfully', 'success');
  //     } else {
  //       // For new file, just add to local state
  //       setItems(prev => [...prev, { ...currentItemDetails, id: Date.now() }]);
  //       showAlert('Item added', 'success');
  //     }
  //   } catch (error) {
  //     showAlert(`Error adding item: ${error.message}`, 'error');
  //   } finally {
  //     setSaving(false);
  //     setSelectedItem(null);
  //     setCurrentItemDetails(null);
  //   }
  // };







// Around line 1246 - Fixed handleAddItem
const handleAddItem = async () => {
  if (!currentItemDetails) return;
  
  try {
    // Get values from headerData
    const exchangeRate = parseFloat(headerData.exchangeRate) || 1;
    const landedCost = parseFloat(headerData.landedCost) || 1.01;
    
    // Add calculated tax values to the item
    const itemWithCalculations = {
      ...currentItemDetails,
      exchangeRate: exchangeRate,
      landedCost: landedCost
    };
    
    if (isEditMode) {
      setSaving(true);
      const response = await axios.post(`${API_URL}/fileheaders/${id}/items`, itemWithCalculations);
      setItems(prev => [...prev, response.data]);
      showAlert('Item added successfully', 'success');
    } else {
      setItems(prev => [...prev, { ...itemWithCalculations, id: Date.now() }]);
      showAlert('Item added', 'success');
    }
  } catch (error) {
    showAlert(`Error adding item: ${error.message}`, 'error');
  } finally {
    setSaving(false);
    setSelectedItem(null);
    setCurrentItemDetails(null);
  }
};























  // const handleEditItem = (item) => {
  //   setEditingItemId(item.id);
  //   setCurrentItemDetails({
  //     ...item,
  //     taxInfoId: item.taxInfoId || item.TaxInfo?.id
  //   });
  //   // Close popup when editing an item
  //   setShowItemSelector(false);
  // };



  // const handleEditItem = (item) => {
  //   setEditingItemId(item.id);

  //   // ✅ NEW: Normalize duty selection flags to ensure mutual exclusivity
  //   const isCustomSelected = Boolean(item.isCustomDutySelected);
  //   const isFtaSelected = Boolean(item.isFtaCustomDutySelected);

  //   // If both are true or both are false, set defaults (FTA true, Custom false)
  //   let normalizedIsCustom = isCustomSelected;
  //   let normalizedIsFta = isFtaSelected;

  //   if (isCustomSelected === isFtaSelected) {
  //     normalizedIsCustom = false;
  //     normalizedIsFta = true;
  //   }

  //   setCurrentItemDetails({
  //     ...item,
  //     taxInfoId: item.taxInfoId || item.TaxInfo?.id,
  //     isCustomDutySelected: normalizedIsCustom,
  //     isFtaCustomDutySelected: normalizedIsFta
  //   });

  //   // Close popup when editing an item
  //   setShowItemSelector(false);
  // };










  const handleEditItem = (item) => {
    setEditingItemId(item.id);

    // Ensure all numeric values are properly parsed
    const normalizedItem = {
      ...item,
      taxInfoId: item.taxInfoId || item.TaxInfo?.id,
      // Parse all numeric fields to ensure they're numbers
      assessableQuantity: parseFloat(item.assessableQuantity) || 1,
      assessableValue: parseFloat(item.assessableValue) || 0,
      totalAssessableValue: parseFloat(item.totalAssessableValue) || 0,
      declaredQuantity: parseFloat(item.declaredQuantity) || 1,
      declaredValue: parseFloat(item.declaredValue) || 0,
      totalDeclaredValue: parseFloat(item.totalDeclaredValue) || 0,
      total: parseFloat(item.total) || 0,
      customDuty: parseFloat(item.customDuty) || 0,
      ftaCustomDuty: parseFloat(item.ftaCustomDuty) || 0,
      acd: parseFloat(item.acd) || 0,
      rd: parseFloat(item.rd) || 0,
      salesTax: parseFloat(item.salesTax) || 0,
      additionalSalesTax: parseFloat(item.additionalSalesTax) || 0,
      furtherTax: parseFloat(item.furtherTax) || 0,
      incomeTaxImport: parseFloat(item.incomeTaxImport) || 0,
      incomeTaxWithheld: parseFloat(item.incomeTaxWithheld) || 0,
      // Handle boolean flags
      isCustomDutySelected: Boolean(item.isCustomDutySelected),
      isFtaCustomDutySelected: Boolean(item.isFtaCustomDutySelected)
    };

    // Ensure mutual exclusivity of duty selection
    if (normalizedItem.isCustomDutySelected === normalizedItem.isFtaCustomDutySelected) {
      normalizedItem.isCustomDutySelected = false;
      normalizedItem.isFtaCustomDutySelected = true;
    }

    setCurrentItemDetails(normalizedItem);
    setShowItemSelector(false);
  };



  const handleUpdateItem = async () => {
    if (!currentItemDetails || !editingItemId) return;

    try {
      if (isEditMode) {
        // If editing an existing file item
        setSaving(true);
        const response = await axios.put(
          `${API_URL}/fileheaders/items/${editingItemId}`,
          currentItemDetails
        );
        setItems(prev => prev.map(item =>
          item.id === editingItemId ? response.data : item
        ));
      } else {
        // For new file, update local state
        setItems(prev => prev.map(item =>
          item.id === editingItemId ? { ...currentItemDetails, id: item.id } : item
        ));
      }
      showAlert('Item updated successfully', 'success');
    } catch (error) {
      showAlert(`Error updating item: ${error.message}`, 'error');
    } finally {
      setSaving(false);
      setEditingItemId(null);
      setCurrentItemDetails(null);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      if (isEditMode) {
        // If removing from existing file
        await axios.delete(`${API_URL}/fileheaders/items/${itemId}`);
      }
      setItems(prev => prev.filter(item => item.id !== itemId));
      showAlert('Item removed', 'info');
    } catch (error) {
      showAlert(`Error removing item: ${error.message}`, 'error');
    }
  };

  const handleSave = async () => {
    if (items.length === 0) {
      showAlert('Please add at least one item', 'error');
      return;
    }

    try {
      setSaving(true);
      const fileData = {
        fileName: headerData.fileName,
        exchangeRate: headerData.exchangeRate,
        landedCost: headerData.landedCost,
        valueAdditionRate: headerData.valueAdditionRate,
        currency: headerData.currency,
        items: items.map(item => ({
          id: item.id, // Include ID for existing items
          taxInfoId: item.taxInfoId,
          assessableQuantity: parseFloat(item.assessableQuantity) || 1,
          assessableValue: parseFloat(item.assessableValue) || 0,
          declaredQuantity: parseFloat(item.declaredQuantity) || 1,
          declaredValue: parseFloat(item.declaredValue) || 0,
          isCustomDutySelected: item.isCustomDutySelected,
          isFtaCustomDutySelected: item.isFtaCustomDutySelected,
          customDuty: parseFloat(item.customDuty) || 0,
          ftaCustomDuty: parseFloat(item.ftaCustomDuty) || 0,
          acd: parseFloat(item.acd) || 0,
          rd: parseFloat(item.rd) || 0,
          salesTax: parseFloat(item.salesTax) || 0,
          additionalSalesTax: parseFloat(item.additionalSalesTax) || 0,
          furtherTax: parseFloat(item.furtherTax) || 0,
          incomeTaxImport: parseFloat(item.incomeTaxImport) || 0,
          incomeTaxWithheld: parseFloat(item.incomeTaxWithheld) || 0,
          totalAssessableValue: item.totalAssessableValue || 0,
          totalDeclaredValue: item.totalDeclaredValue || 0,
          total: parseFloat(item.total) || 0,
          remarks: item.remarks || ''
        }))
      };

      let response;

      if (isEditMode) {
        // Update existing file
        response = await axios.put(`${API_URL}/fileheaders/${id}`, fileData);
        showAlert(`File updated successfully: ${headerData.fileNumber}`, 'success');
      } else {
        // Create new file
        response = await axios.post(`${API_URL}/fileheaders`, fileData);
        showAlert(`File created successfully: ${response.data.fileHeader.fileNumber}`, 'success');

        // Reset form after successful save (only for new files)
        setHeaderData({
          fileName: '',
          fileNumber: '',
          exchangeRate: 280.50,
          landedCost: 1.01,
          valueAdditionRate: 1.1,
          currency: 'USD'
        });
        setItems([]);
      }

      // Navigate to files list after successful save/update
      setTimeout(() => {
        navigate('/files');
      }, 1500);
    } catch (error) {
      console.error('Error saving file:', error);

      // Better error messaging
      if (error.response) {
        showAlert(`Error: ${error.response.data.message || error.response.data.error || 'Server error'}`, 'error');
      } else if (error.request) {
        showAlert('Network error - no response from server', 'error');
      } else {
        showAlert(`Error: ${error.message}`, 'error');
      }
    } finally {
      setSaving(false);
    }
  };





  //Formulas

  const total_Av_PKR = headerData.exchangeRate
  const landedCost = headerData.landedCost



  // console.log(landedCost)



  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* {total_Av_PKR} */}
      {alert.show && (
        <div className={`p-4 mb-4 rounded ${alert.type === 'error' ? 'bg-red-100 text-red-700' :
          'bg-green-100 text-green-700'
          }`}>
          {alert.message}
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-medium text-[#4a6fa5] mb-6">
          {readOnly ? 'View File' : isEditMode ? 'Edit File' : 'Create New File'}
        </h1>

        {/* Header Section */}
        <HeaderSection
          headerData={headerData}
          onHeaderChange={handleHeaderChange}
          readOnly={readOnly}
        />

        {/* Item Selection & Details Section - Only if not readOnly */}
        {!readOnly && (
          <div className="mt-8 border-t-2 border-gray-300 pt-6">
            <h2 className="text-xl font-medium text-[#4a6fa5] mb-4">
              {editingItemId ? 'Edit Item' : 'Add Items'}
            </h2>

            {/* "Add Items" button that shows the popup */}
            {!editingItemId && !currentItemDetails && !showItemSelector && (
              <button
                onClick={() => setShowItemSelector(true)}
                className="bg-[#4a6fa5] hover:bg-[#336699]  text-white  py-2 px-4 rounded-lg"
              >
                Add Items
              </button>
            )}

            {/* Popup with semi-transparent overlay */}
            {showItemSelector && (
              <>
                {/* Semi-transparent overlay */}
                <div
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                  onClick={() => setShowItemSelector(false)}
                ></div>

                {/* Popup content */}
                <div className="fixed inset-0 z-50 flex items-center max-w-4xl mx-auto justify-center p-4">
                  <div
                    className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[80vh] overflow-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-2 px-4  flex justify-between items-center">
                      <h3 className="text-lg text-[#4a6fa5] font-semibold">Select an Item</h3>
                      <button
                        onClick={() => setShowItemSelector(false)}
                        className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                      >
                        ×
                      </button>
                    </div>

                    <div className="p-4 px-4">
                      <ItemSelector
                        taxItems={taxItems}
                        onItemSelect={handleItemSelect}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {currentItemDetails && (
              <ItemDetails
                exchangeRate={total_Av_PKR}
                landedCost={landedCost}
                itemDetails={currentItemDetails}
                onItemDetailChange={handleItemDetailChange}
                onAddItem={editingItemId ? handleUpdateItem : handleAddItem}
                onCancelEdit={() => {
                  setEditingItemId(null);
                  setCurrentItemDetails(null);
                }}
                isEditing={!!editingItemId}
                saving={saving}
              />
            )}
          </div>
        )}

        {/* Items List Section */}
        {items.length > 0 && (
          <div className="mt-8 border-t-2 border-gray-300 pt-6">
            <h2 className="text-xl text-[#4a6fa5] font-medium mb-4">File Items</h2>

            {/* <ItemsList
              
              items={items}
              onEditItem={!readOnly && !editingItemId ? handleEditItem : undefined}
              onRemoveItem={!readOnly && !editingItemId ? handleRemoveItem : undefined}
            /> */}



           <ItemsList
  items={items}
  onEditItem={!readOnly && !editingItemId ? handleEditItem : undefined}
  onRemoveItem={!readOnly && !editingItemId ? handleRemoveItem : undefined}
  exchangeRate={headerData.exchangeRate}
  landedCost={headerData.landedCost}
/>


            {/* File Totals */}
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between items-center">
                {/* <div>
                  <p className="text-lg font-semibold">File Totals:</p>
                  <p>Total Assessable Value: {items.reduce((sum, item) =>
                    sum + parseFloat(item.totalAssessableValue || 0), 0).toFixed(2)}
                  </p>
                  <p>Total Declared Value: {items.reduce((sum, item) =>
                    sum + parseFloat(item.totalDeclaredValue || 0), 0).toFixed(2)}
                  </p>
                  <p className="font-bold">Grand Total: {items.reduce((sum, item) =>
                    sum + parseFloat(item.total || 0), 0).toFixed(2)}
                  </p>
                </div>  */}

                {!readOnly && !editingItemId && (
                  <button
                    onClick={handleSave}
                    disabled={items.length === 0 || saving}
                    className={`bg-[#4a6fa5] text-white py-2 px-6 rounded-lg
                      hover:bg-[#336699] focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${(items.length === 0 || saving) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {saving ? 'Processing...' : isEditMode ? 'Update File' : 'Save File'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileHeaderForm;
