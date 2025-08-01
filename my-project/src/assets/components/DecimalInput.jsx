// import React, { useState } from 'react';

// const DecimalInput = () => {
//   const [value, setValue] = useState('');

//   const handleChange = (e) => {
//     let inputValue = e.target.value;

//     // Remove any non-digit characters except for the first decimal point
//     inputValue = inputValue.replace(/[^\d.]/g, '');
//     const parts = inputValue.split('.');
//     if (parts.length > 2) {
//       inputValue = parts[0] + '.' + parts.slice(1).join('');
//     }

//     // Automatically add a decimal point after two digits
//     if (inputValue.length === 2 && !inputValue.includes('.')) {
//       inputValue = inputValue + '.';
//     }

//     // Prevent more than two digits after the decimal
//     if (parts[1] && parts[1].length > 2) {
//       inputValue = parts[0] + '.' + parts[1].substring(0, 2);
//     }

//     setValue(inputValue);
//   };

//   return (
//     <input
//       type="text"
//       inputMode="decimal"
//       value={value}
//       onChange={handleChange}
//       placeholder="e.g., 12.90"
//     />
//   );
// };

// export default DecimalInput;



























// import React, { useState } from 'react';

// // This is the main App component that renders our formatted input.
// // You can integrate the FormattedCustomerIdInput component into your own application.
// export default function DecimalInput() {
//     return (
//         <div className="bg-gray-100 flex items-center justify-center h-screen font-sans">
//             <div className="w-full max-w-md mx-auto">
//                 <FormattedCustomerIdInput />
//                 <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Hs code</label>
//                 <input
//                     name="Hs code"
//                     type="text"
//                     // value={formData.email}
//                     minlength="3"
//                     placeholder='1234.0000'
//                     maxlength="20"
//                     required />

//             </div>
//         </div>
//     );
// }



// const FormattedCustomerIdInput = () => {

//     const [value, setValue] = useState('');

//     /**
//     \\
//      * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
//      */
//     const handleChange = (e) => {
//         // 1. Get the raw value from the input field.
//         const rawValue = e.target.value;

//         // 2. Remove all non-digit characters. This gives us a clean string of numbers to work with.
//         const digits = rawValue.replace(/[^\d]/g, '');

//         // 3. Limit the total number of digits to 8 (4 before the decimal, 4 after).
//         const limitedDigits = digits.substring(0, 8);

//         // 4. Apply the XXXX.XXXX formatting logic.
//         let formattedValue = limitedDigits;
//         if (limitedDigits.length > 4) {
//             // If there are more than 4 digits, insert a decimal point after the 4th digit.
//             formattedValue = `${limitedDigits.substring(0, 4)}.${limitedDigits.substring(4)}`;
//         }

//         // 5. Update the component's state with the newly formatted value.
//         // This re-renders the input field with the correct format.
//         setValue(formattedValue);
//     };

//     return (
//         <div className="">
//             <label htmlFor="customerId" className="block text-lg font-medium text-gray-800 mb-2">
//                 HS Code
//             </label>
//             <input
//                 // Using "tel" is often better for custom numeric formats on mobile devices,
//                 // as it typically brings up a numeric keypad.
//                 type="tel"
//                 id="customerId"
//                 name="customerId"
//                 value={value}
//                 onChange={handleChange}
//                 placeholder="e.g., 1234.5678"
//                 className="w-full p-3 border border-gray-300 rounded-md shadow-sm text-lg
//                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500
//                    transition duration-150 ease-in-out"
//                 // Set maxLength to 9 to account for the 8 digits plus the decimal point.
//                 maxLength={9}
//             />
//             {/* <p className="text-sm text-gray-500 mt-2"> */}
//                 {/* Please enter the HS Code in the format XXXX.XXXX. The decimal will be added automatically. */}
//                 {/* XXXX.XXXX. */}
//             {/* </p> */}
//         </div>
//     );
// };

































































// import React, { useState } from 'react';

// // Main component to render the form
// export default function DecimalInput() {
//     return (
//         <div className="bg-gray-100 min-h-screen font-sans p-4 sm:p-8">
//             <ComprehensiveTaxForm />
//         </div>
//     );
// }

// // The main form component with all 13 fields and formatting logic
// const ComprehensiveTaxForm = () => {
//     // A single state object to hold all form data
//     const [formData, setFormData] = useState({
//         hsCode: '',
//         itemName: '',
//         unitOfMeasurement: '',
//         assessableValue: '',
//         customDuty: '',
//         acd: '',
//         rd: '',
//         ftaCustomDuty: '',
//         salesTax: '',
//         additionalSalesTax: '',
//         furtherTax: '',
//         incomeTaxImport: '',
//         incomeTaxWithheld: ''
//     });

//     // State to manage focus on percentage fields for better UX
//     const [focusedField, setFocusedField] = useState(null);

//     // --- INPUT HANDLERS WITH FORMATTING ---

//     /**
//      * Handles the HS Code input, formatting it as XXXX.XXXX
//      */
//     const handleHsCodeChange = (e) => {
//         const rawValue = e.target.value;
//         const digits = rawValue.replace(/[^\d]/g, ''); // Remove non-digits
//         const limitedDigits = digits.substring(0, 8); // Limit to 8 digits total

//         let formattedValue = limitedDigits;
//         if (limitedDigits.length > 4) {
//             formattedValue = `${limitedDigits.substring(0, 4)}.${limitedDigits.substring(4)}`;
//         }
//         setFormData({ ...formData, hsCode: formattedValue });
//     };

//     /**
//      * Handles generic numeric inputs, allowing a specified number of decimal places.
//      * @param {React.ChangeEvent<HTMLInputElement>} e - The input event.
//      * @param {number} decimalPlaces - The maximum number of decimal places allowed.
//      */
//     const handleNumericChange = (e, decimalPlaces) => {
//         const { name, value } = e.target;
//         // Regex to allow numbers and a single decimal point with a specific precision
//         const regex = new RegExp(`^\\d*\\.?\\d{0,${decimalPlaces}}$`);
//         if (regex.test(value)) {
//             setFormData({ ...formData, [name]: value });
//         }
//     };

//     /**
//      * Handles percentage fields, allowing up to two decimal places.
//      */
//     const handlePercentageChange = (e) => {
//         const { name, value } = e.target;
//         // Regex to allow numbers with up to 2 decimal places
//         const regex = /^\d*\.?\d{0,2}$/;
//         if (regex.test(value)) {
//             setFormData({ ...formData, [name]: value });
//         }
//     };

//     // --- FORM SUBMISSION AND FOCUS/BLUR FOR % FIELDS ---

//     const handleFocus = (e) => setFocusedField(e.target.name);
//     const handleBlur = () => setFocusedField(null);

//     const handleSubmit = (e) => {
//         e.preventDefault(); // Prevent default form submission

//         // Prepare data for logging, adding '%' to percentage fields
//         const dataToLog = { ...formData };
//         const percentageFields = [
//             'customDuty', 'acd', 'rd', 'ftaCustomDuty', 'salesTax', 
//             'additionalSalesTax', 'furtherTax', 'incomeTaxImport', 'incomeTaxWithheld'
//         ];

//         percentageFields.forEach(field => {
//             if (dataToLog[field]) {
//                 dataToLog[field] = `${dataToLog[field]}%`;
//             }
//         });

//         console.log("Form Submitted Data:", dataToLog);
//         alert("Form data has been logged to the console. Press F12 to view.");
//     };

//     return (
//         <div className="max-w-7xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg">
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Tax & Duty Information Form</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">

//                     {/* Field 1: HS Code */}
//                     <div className="mb-2">
//                         <label htmlFor="hsCode" className="block text-sm font-medium text-gray-700">HS Code</label>
//                         <input
//                             type="tel"
//                             id="hsCode"
//                             name="hsCode"
//                             value={formData.hsCode}
//                             onChange={handleHsCodeChange}
//                             placeholder="1234.5678"
//                             className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                             maxLength={9}
//                             required
//                         />
//                     </div>

//                     {/* Field 2: Item Name */}
//                     <div className="mb-2">
//                         <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">Item Name</label>
//                         <input
//                             type="text"
//                             id="itemName"
//                             name="itemName"
//                             value={formData.itemName}
//                             onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
//                             placeholder="e.g., Industrial Machinery Part"
//                             className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                             maxLength={30}
//                             required
//                         />
//                     </div>

//                     {/* Field 3: Unit of Measurement */}
//                     <div className="mb-2">
//                         <label htmlFor="unitOfMeasurement" className="block text-sm font-medium text-gray-700">Unit of Measurement</label>
//                         <input
//                             type="text"
//                             id="unitOfMeasurement"
//                             name="unitOfMeasurement"
//                             value={formData.unitOfMeasurement}
//                             onChange={(e) => setFormData({ ...formData, unitOfMeasurement: e.target.value })}
//                             placeholder="e.g., KGS, PCS"
//                             className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                             maxLength={10}
//                             required
//                         />
//                     </div>

//                     {/* Field 4: Assessable Value */}
//                     <div className="mb-2">
//                         <label htmlFor="assessableValue" className="block text-sm font-medium text-gray-700">Assessable Value</label>
//                         <input
//                             type="text"
//                             id="assessableValue"
//                             name="assessableValue"
//                             value={formData.assessableValue}
//                             onChange={(e) => handleNumericChange(e, 4)}
//                             placeholder="123456.7890"
//                             className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                             required
//                         />
//                     </div>

//                     {/* --- Percentage Fields (5-13) --- */}
//                     {[
//                         { name: 'customDuty', label: 'Custom Duty (%)' },
//                         { name: 'acd', label: 'ACD (%)' },
//                         { name: 'rd', label: 'RD (%)' },
//                         { name: 'ftaCustomDuty', label: 'FTA Custom Duty (%)' },
//                         { name: 'salesTax', label: 'Sales Tax (%)' },
//                         { name: 'additionalSalesTax', label: 'Additional Sales Tax (%)' },
//                         { name: 'furtherTax', label: 'Further Tax (%)' },
//                         { name: 'incomeTaxImport', label: 'Income Tax Import (%)' },
//                         { name: 'incomeTaxWithheld', label: 'Income Tax Withheld (%)' }
//                     ].map(field => (
//                         <div className="mb-2" key={field.name}>
//                             <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">{field.label}</label>
//                             <div className="relative mt-1">
//                                 <input
//                                     type="text"
//                                     id={field.name}
//                                     name={field.name}
//                                     value={focusedField === field.name ? formData[field.name] : (formData[field.name] ? `${formData[field.name]}%` : '')}
//                                     onChange={handlePercentageChange}
//                                     onFocus={handleFocus}
//                                     onBlur={handleBlur}
//                                     placeholder="e.g., 15.50"
//                                     className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                                     required
//                                 />
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Submit Button */}
//                 <div className="mt-8 text-right">
//                     <button
//                         type="submit"
//                         className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                     >
//                         Submit and Log Data
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };









































// import React, { useState } from 'react';

// // The main form component with all 13 fields and corrected formatting logic
// export default function DecimalInput() {
//     // A single state object to hold all form data
//     const [formData, setFormData] = useState({
//         hsCode: '',
//         itemName: '',
//         unitOfMeasurement: '',
//         assessableValue: '',
//         customDuty: '',
//         acd: '',
//         rd: '',
//         ftaCustomDuty: '',
//         salesTax: '',
//         additionalSalesTax: '',
//         furtherTax: '',
//         incomeTaxImport: '',
//         incomeTaxWithheld: ''
//     });

//     // State to manage focus on percentage fields for better UX
//     const [focusedField, setFocusedField] = useState(null);

//     // --- INPUT HANDLERS WITH CORRECTED FORMATTING LOGIC ---

//     /**
//      * LOGIC 1: Handles the HS Code input, formatting it as XXXX.XXXX
//      * The Harmonized System (HS) code is a standardized numerical method for classifying products [[1]].
//      */
//     const handleHsCodeChange = (e) => {
//         const rawValue = e.target.value;
//         const digits = rawValue.replace(/[^\d]/g, ''); // Remove non-digits
//         const limitedDigits = digits.substring(0, 8); // Limit to 8 digits total

//         let formattedValue = limitedDigits;
//         if (limitedDigits.length > 4) {
//             // Insert decimal point after the 4th digit
//             formattedValue = `${limitedDigits.substring(0, 4)}.${limitedDigits.substring(4)}`;
//         }
//         setFormData({ ...formData, hsCode: formattedValue });
//     };

//     /**
//      * LOGIC 2: Handles generic numeric inputs, allowing a specified number of decimal places.
//      * This is used for 'Assessable Value' and all percentage fields.
//      * @param {React.ChangeEvent<HTMLInputElement>} e - The input event.
//      * @param {number} decimalPlaces - The maximum number of decimal places allowed.
//      */
//     const handleNumericChange = (e, decimalPlaces) => {
//         const { name, value } = e.target;
//         // This regex allows any number of digits before the decimal,
//         // but restricts the number of digits after the decimal.
//         const regex = new RegExp(`^\\d*\\.?\\d{0,${decimalPlaces}}$`);

//         if (regex.test(value)) {
//             setFormData({ ...formData, [name]: value });
//         }
//     };

//     // --- FORM SUBMISSION AND FOCUS/BLUR FOR % FIELDS ---

//     const handleFocus = (e) => setFocusedField(e.target.name);
//     const handleBlur = () => setFocusedField(null);

//     const handleSubmit = (e) => {
//         e.preventDefault(); // Prevent default form submission
//         console.log("Form Submitted Data:", formData);
//         alert("Form data has been logged to the console. Press F12 or right-click -> Inspect to view.");
//     };

//     return (
//         <div className="bg-gray-100 min-h-screen font-sans p-4 sm:p-8 flex items-center justify-center">
//             <div className="w-full max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg">
//                 <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Tax & Duty Information Form</h1>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

//                         {/* Field 1: HS Code */}
//                         <div>
//                             <label htmlFor="hsCode" className="block text-sm font-medium text-gray-700">HS Code</label>
//                             <input
//                                 type="tel" // 'tel' is often better for custom numeric formats on mobile
//                                 id="hsCode"
//                                 name="hsCode"
//                                 value={formData.hsCode}
//                                 onChange={handleHsCodeChange}
//                                 placeholder="1234.5678"
//                                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                                 maxLength={9} // 8 digits + 1 decimal point
//                                 required
//                             />
//                         </div>

//                         {/* Field 2: Item Name */}
//                         <div>
//                             <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">Item Name</label>
//                             <input
//                                 type="text"
//                                 id="itemName"
//                                 name="itemName"
//                                 value={formData.itemName}
//                                 onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
//                                 placeholder="e.g., Industrial Machinery Part"
//                                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                                 maxLength={30}
//                                 required
//                             />
//                         </div>

//                         {/* Field 3: Unit of Measurement */}
//                         <div>
//                             <label htmlFor="unitOfMeasurement" className="block text-sm font-medium text-gray-700">Unit of Measurement</label>
//                             <input
//                                 type="text"
//                                 id="unitOfMeasurement"
//                                 name="unitOfMeasurement"
//                                 value={formData.unitOfMeasurement}
//                                 onChange={(e) => setFormData({ ...formData, unitOfMeasurement: e.target.value })}
//                                 placeholder="e.g., KGS, PCS"
//                                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                                 maxLength={10}
//                                 required
//                             />
//                         </div>

//                         {/* Field 4: Assessable Value */}
//                         <div className="lg:col-span-3">
//                             <label htmlFor="assessableValue" className="block text-sm font-medium text-gray-700">Assessable Value</label>
//                             <input
//                                 type="text"
//                                 id="assessableValue"
//                                 name="assessableValue"
//                                 value={formData.assessableValue}
//                                 onChange={(e) => handleNumericChange(e, 4)} // Use handler with 4 decimal places
//                                 placeholder="123456.7890"
//                                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                                 required
//                             />
//                         </div>

//                         {/* --- Percentage Fields (5-13) --- */}
//                         {[
//                             { name: 'customDuty', label: 'Custom Duty' },
//                             { name: 'acd', label: 'ACD' },
//                             { name: 'rd', label: 'RD' },
//                             { name: 'ftaCustomDuty', label: 'FTA Custom Duty' },
//                             { name: 'salesTax', label: 'Sales Tax' },
//                             { name: 'additionalSalesTax', label: 'Additional Sales Tax' },
//                             { name: 'furtherTax', label: 'Further Tax' },
//                             { name: 'incomeTaxImport', label: 'Income Tax Import' },
//                             { name: 'incomeTaxWithheld', label: 'Income Tax Withheld' }
//                         ].map(field => (
//                             <div key={field.name}>
//                                 <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">{field.label}</label>
//                                 <div className="relative mt-1">
//                                     <input
//                                         type="text"
//                                         id={field.name}
//                                         name={field.name}
//                                         // LOGIC 3: Show raw value on focus, show with '%' on blur
//                                         value={focusedField === field.name ? formData[field.name] : (formData[field.name] ? `${formData[field.name]}` : '')}
//                                         onChange={(e) => handleNumericChange(e, 2)} // Use handler with 2 decimal places
//                                         onFocus={handleFocus}
//                                         onBlur={handleBlur}
//                                         placeholder="123.45"
//                                         className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pr-8"
//                                         required
//                                     />
//                                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
//                                         <span className="text-gray-500 sm:text-sm">%</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Submit Button */}
//                     <div className="pt-5 text-right">
//                         <button
//                             type="submit"
//                             className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                         >
//                             Submit and Log Data
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }































































// import React, { useState, useRef, useEffect } from 'react';

// export default function DecimalInput() {
//     const [formData, setFormData] = useState({
//         hsCode: '',
//         itemName: '',
//         unitOfMeasurement: '',
//         assessableValue: '',
//         customDuty: '',
//         acd: '',
//         rd: '',
//         ftaCustomDuty: '',
//         salesTax: '',
//         additionalSalesTax: '',
//         furtherTax: '',
//         incomeTaxImport: '',
//         incomeTaxWithheld: ''
//     });

//     // Refs to access input elements for cursor position management
//     const inputRefs = {
//         hsCode: useRef(null),
//         assessableValue: useRef(null),
//         customDuty: useRef(null),
//         acd: useRef(null),
//         rd: useRef(null),
//         ftaCustomDuty: useRef(null),
//         salesTax: useRef(null),
//         additionalSalesTax: useRef(null),
//         furtherTax: useRef(null),
//         incomeTaxImport: useRef(null),
//         incomeTaxWithheld: useRef(null)
//     };

//     // Store cursor positions to restore after formatting
//     const [cursorPositions, setCursorPositions] = useState({});

//     // Apply cursor positions after render
//     useEffect(() => {
//         Object.keys(cursorPositions).forEach(fieldName => {
//             const ref = inputRefs[fieldName];
//             if (ref && ref.current && cursorPositions[fieldName] !== undefined) {
//                 ref.current.setSelectionRange(cursorPositions[fieldName], cursorPositions[fieldName]);
//             }
//         });
//     }, [cursorPositions, formData]);

//     // HS CODE LOGIC - Format XXXX.XXXX (4 digits, decimal, 4 digits)
//     const handleHsCodeChange = (e) => {
//         const input = e.target;
//         const value = input.value;
//         const cursorPos = input.selectionStart;
//         const prevValue = formData.hsCode;

//         // Remove non-digits
//         const digits = value.replace(/[^\d]/g, '');
//         const limitedDigits = digits.substring(0, 8);

//         // Add decimal after 4th digit
//         let formattedValue = limitedDigits;
//         if (limitedDigits.length > 4) {
//             formattedValue = `${limitedDigits.substring(0, 4)}.${limitedDigits.substring(4)}`;
//         }

//         // Calculate new cursor position
//         let newCursorPos = cursorPos;
//         if (formattedValue.length !== value.length) {
//             // If we're adding a decimal point and cursor is after position 4
//             if (formattedValue.length > value.length && cursorPos > 4) {
//                 newCursorPos = cursorPos + 1;
//             }
//             // If we're removing the decimal point
//             else if (formattedValue.length < value.length && prevValue.includes('.') && !formattedValue.includes('.')) {
//                 newCursorPos = cursorPos - 1;
//             }
//         }

//         setFormData({ ...formData, hsCode: formattedValue });
//         setCursorPositions({ ...cursorPositions, hsCode: newCursorPos });
//     };

//     // ASSESSABLE VALUE LOGIC - Format XXXXXX.XXXX (6 digits, decimal, 4 digits)
//     const handleAssessableValueChange = (e) => {
//         const input = e.target;
//         const value = input.value;
//         const cursorPos = input.selectionStart;
//         const prevValue = formData.assessableValue;

//         // Remove non-digits
//         const digits = value.replace(/[^\d]/g, '');
//         const limitedDigits = digits.substring(0, 10); // Limit to 10 digits total

//         // Add decimal after 6th digit
//         let formattedValue = limitedDigits;
//         if (limitedDigits.length > 6) {
//             formattedValue = `${limitedDigits.substring(0, 6)}.${limitedDigits.substring(6)}`;
//         }

//         // Calculate new cursor position
//         let newCursorPos = cursorPos;
//         if (formattedValue.length !== value.length) {
//             // If we're adding a decimal point and cursor is after position 6
//             if (formattedValue.length > value.length && cursorPos > 6) {
//                 newCursorPos = cursorPos + 1;
//             }
//             // If we're removing the decimal point
//             else if (formattedValue.length < value.length && prevValue.includes('.') && !formattedValue.includes('.')) {
//                 newCursorPos = cursorPos - 1;
//             }
//         }

//         setFormData({ ...formData, assessableValue: formattedValue });
//         setCursorPositions({ ...cursorPositions, assessableValue: newCursorPos });
//     };

//     // PERCENTAGE FIELDS LOGIC - Format XXX.XX% (3 digits, decimal, 2 digits)
//     const handlePercentageChange = (e) => {
//         const input = e.target;
//         const { name, value } = input;
//         const cursorPos = input.selectionStart;
//         const prevValue = formData[name] || '';

//         // Remove non-digits and percentage sign
//         const cleanValue = value.replace(/[^\d.]/g, '');

//         // Handle decimal points - only allow one
//         const parts = cleanValue.split('.');
//         let formattedValue = parts[0] || '';

//         // Add decimal after 3rd digit if no decimal exists and we have more than 3 digits
//         if (parts.length === 1 && formattedValue.length > 3) {
//             formattedValue = `${formattedValue.substring(0, 3)}.${formattedValue.substring(3, 5)}`;
//         } 
//         // Otherwise, preserve existing decimal but limit to 2 places after
//         else if (parts.length > 1) {
//             formattedValue = `${formattedValue}.${parts[1].substring(0, 2)}`;
//         }

//         // Calculate new cursor position
//         let newCursorPos = cursorPos;
//         if (value.length !== formattedValue.length) {
//             // If adding decimal and cursor was after position 3
//             if (formattedValue.includes('.') && !prevValue.includes('.') && cursorPos > 3) {
//                 newCursorPos = cursorPos + 1;
//             }
//             // If removing decimal
//             else if (!formattedValue.includes('.') && prevValue.includes('.')) {
//                 newCursorPos = cursorPos - 1;
//             }
//         }

//         setFormData({ ...formData, [name]: formattedValue });
//         setCursorPositions({ ...cursorPositions, [name]: newCursorPos });
//     };

//     const handleTextChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // Format the data for display with appropriate % symbols
//         const displayData = { ...formData };

//         // Add % to percentage fields
//         const percentageFields = [
//             'customDuty', 'acd', 'rd', 'ftaCustomDuty', 'salesTax', 
//             'additionalSalesTax', 'furtherTax', 'incomeTaxImport', 'incomeTaxWithheld'
//         ];

//         percentageFields.forEach(field => {
//             if (displayData[field]) {
//                 displayData[field] = `${displayData[field]}%`;
//             }
//         });

//         console.log("Form Submitted Data:", displayData);
//         alert("Form data has been logged to the console.");
//     };

//     return (
//         <div className="bg-gray-100 min-h-screen font-sans p-4 sm:p-8 flex items-center justify-center">
//             <div className="w-full max-w-6xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg">
//                 <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Tax & Duty Information Form</h1>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

//                         {/* Field 1: HS Code - XXXX.XXXX format */}
//                         <div>
//                             <label htmlFor="hsCode" className="block text-sm font-medium text-gray-700">HS Code</label>
//                             <input
//                                 ref={inputRefs.hsCode}
//                                 type="text"
//                                 id="hsCode"
//                                 name="hsCode"
//                                 value={formData.hsCode}
//                                 onChange={handleHsCodeChange}
//                                 placeholder="1234.5678"
//                                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                                 required
//                             />
//                             <p className="text-xs text-gray-500 mt-1">Format: XXXX.XXXX</p>
//                         </div>

//                         {/* Field 2: Item Name */}
//                         <div>
//                             <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">Item Name</label>
//                             <input
//                                 type="text"
//                                 id="itemName"
//                                 name="itemName"
//                                 value={formData.itemName}
//                                 onChange={handleTextChange}
//                                 placeholder="Enter item name"
//                                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                                 maxLength={30}
//                                 required
//                             />
//                             <p className="text-xs text-gray-500 mt-1">Max 30 characters</p>
//                         </div>

//                         {/* Field 3: Unit of Measurement */}
//                         <div>
//                             <label htmlFor="unitOfMeasurement" className="block text-sm font-medium text-gray-700">Unit of Measurement</label>
//                             <input
//                                 type="text"
//                                 id="unitOfMeasurement"
//                                 name="unitOfMeasurement"
//                                 value={formData.unitOfMeasurement}
//                                 onChange={handleTextChange}
//                                 placeholder="e.g., KG, PCS, etc."
//                                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                                 maxLength={10}
//                                 required
//                             />
//                             <p className="text-xs text-gray-500 mt-1">Max 10 characters</p>
//                         </div>

//                         {/* Field 4: Assessable Value - XXXXXX.XXXX format */}
//                         <div>
//                             <label htmlFor="assessableValue" className="block text-sm font-medium text-gray-700">Assessable Value</label>
//                             <input
//                                 ref={inputRefs.assessableValue}
//                                 type="text"
//                                 id="assessableValue"
//                                 name="assessableValue"
//                                 value={formData.assessableValue}
//                                 onChange={handleAssessableValueChange}
//                                 placeholder="123456.7890"
//                                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                                 required
//                             />
//                             <p className="text-xs text-gray-500 mt-1">Format: XXXXXX.XXXX</p>
//                         </div>

//                         {/* Fields 5-13: Percentage Fields - XXX.XX% format */}
//                         {[
//                             { id: 'customDuty', name: 'customDuty', label: 'Custom Duty' },
//                             { id: 'acd', name: 'acd', label: 'ACD' },
//                             { id: 'rd', name: 'rd', label: 'RD' },
//                             { id: 'ftaCustomDuty', name: 'ftaCustomDuty', label: 'FTA Custom Duty' },
//                             { id: 'salesTax', name: 'salesTax', label: 'Sale Tax' },
//                             { id: 'additionalSalesTax', name: 'additionalSalesTax', label: 'Additional Sale Tax' },
//                             { id: 'furtherTax', name: 'furtherTax', label: 'Further Tax' },
//                             { id: 'incomeTaxImport', name: 'incomeTaxImport', label: 'Income Tax Import' },
//                             { id: 'incomeTaxWithheld', name: 'incomeTaxWithheld', label: 'Income Tax Withheld' }
//                         ].map((field) => (
//                             <div key={field.id}>
//                                 <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">{field.label}</label>
//                                 <div className="relative mt-1">
//                                     <input
//                                         ref={inputRefs[field.name]}
//                                         type="text"
//                                         id={field.id}
//                                         name={field.name}
//                                         value={formData[field.name]}
//                                         onChange={handlePercentageChange}
//                                         placeholder="123.45"
//                                         className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pr-8"
//                                         required
//                                     />
//                                     <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                                         <span className="text-gray-500">%</span>
//                                     </div>
//                                 </div>
//                                 <p className="text-xs text-gray-500 mt-1">Format: XXX.XX%</p>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Submit Button */}
//                     <div className="pt-5 text-right">
//                         <button
//                             type="submit"
//                             className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                         >
//                             Submit and Log Data
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }
































// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// export default function DecimalInput() {
//     const [formData, setFormData] = useState({
//         hsCode: '',
//         itemName: '',
//         unitOfMeasurement: '',
//         uomCode: '',
//         assessableValue: '',
//         customDuty: '',
//         acd: '',
//         rd: '',
//         ftaCustomDuty: '',
//         salesTax: '',
//         additionalSalesTax: '',
//         furtherTax: '',
//         incomeTaxImport: '',
//         incomeTaxWithheld: ''
//     });

//     const [showUomManager, setShowUomManager] = useState(false);
//     const [unitOptions, setUnitOptions] = useState([]);
//     const [loadingUnits, setLoadingUnits] = useState(true);
//     const [error, setError] = useState(null);
//     const [focusedField, setFocusedField] = useState(null);
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const [hoveredOption, setHoveredOption] = useState(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const percentageFields = [
//         { id: 'customDuty', name: 'customDuty', label: 'Custom Duty (%)', placeholder: 'e.g., 000.00 %' },
//         { id: 'acd', name: 'acd', label: 'ACD (%)', placeholder: 'e.g., 000.00 %' },
//         { id: 'rd', name: 'rd', label: 'RD (%)', placeholder: 'e.g., 000.00 %' },
//         { id: 'ftaCustomDuty', name: 'ftaCustomDuty', label: 'FTA Custom Duty (%)', placeholder: 'e.g., 000.00 %' },
//         { id: 'salesTax', name: 'salesTax', label: 'Sales Tax (%)', placeholder: 'e.g., 000.00 %' },
//         { id: 'additionalSalesTax', name: 'additionalSalesTax', label: 'Additional Sales Tax (%)', placeholder: 'e.g., 000.00 %' },
//         { id: 'furtherTax', name: 'furtherTax', label: 'Further Tax (%)', placeholder: 'e.g., 000.00 %' },
//         { id: 'incomeTaxImport', name: 'incomeTaxImport', label: 'Income Tax Import (%)', placeholder: 'e.g., 000.00 %' },
//         { id: 'incomeTaxWithheld', name: 'incomeTaxWithheld', label: 'Income Tax Withheld (%)', placeholder: 'e.g., 000.00 %' }
//     ];

//     const inputRefs = {
//         hsCode: useRef(null),
//         assessableValue: useRef(null),
//         customDuty: useRef(null),
//         acd: useRef(null),
//         rd: useRef(null),
//         ftaCustomDuty: useRef(null),
//         salesTax: useRef(null),
//         additionalSalesTax: useRef(null),
//         furtherTax: useRef(null),
//         incomeTaxImport: useRef(null),
//         incomeTaxWithheld: useRef(null)
//     };

//     const dropdownRef = useRef(null);
//     const [cursorPositions, setCursorPositions] = useState({});

//     const fetchUnits = async () => {
//         try {
//             setLoadingUnits(true);
//             const response = await fetch('http://localhost:5000/api/v1/unit'); // Fixed URL to match backend route
//             if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//             const data = await response.json();
//             setUnitOptions(data);
//         } catch (err) {
//             setError(err.message);
//             console.error("Failed to fetch units:", err);
//         } finally {
//             setLoadingUnits(false);
//         }
//     };

//     useEffect(() => {
//         fetchUnits();
//     }, []);

//     const handleUomClose = () => {
//         setShowUomManager(false);
//         fetchUnits();
//     };

//     useEffect(() => {
//         Object.keys(cursorPositions).forEach(fieldName => {
//             const ref = inputRefs[fieldName];
//             if (ref?.current && cursorPositions[fieldName] !== undefined) {
//                 ref.current.setSelectionRange(cursorPositions[fieldName], cursorPositions[fieldName]);
//             }
//         });
//     }, [cursorPositions, formData]);

//     useEffect(() => {
//         const handleClickOutside = (e) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsDropdownOpen(false);
//         };
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => document.removeEventListener('mousedown', handleClickOutside);
//     }, []);

//     const resetForm = () => {
//         setFormData({
//             hsCode: '',
//             itemName: '',
//             unitOfMeasurement: '',
//             uomCode: '',
//             assessableValue: '',
//             customDuty: '',
//             acd: '',
//             rd: '',
//             ftaCustomDuty: '',
//             salesTax: '',
//             additionalSalesTax: '',
//             furtherTax: '',
//             incomeTaxImport: '',
//             incomeTaxWithheld: ''
//         });
//     };

//     const handleHsCodeChange = (e) => {
//         const input = e.target;
//         const value = input.value;
//         const cursorPos = input.selectionStart;
//         const prevValue = formData.hsCode;
//         const digits = value.replace(/[^\d]/g, '').substring(0, 8);
//         let formattedValue = digits;
//         if (digits.length > 4) formattedValue = `${digits.substring(0, 4)}.${digits.substring(4)}`;
//         let newCursorPos = cursorPos;
//         if (formattedValue.length !== value.length) {
//             if (formattedValue.length > value.length && cursorPos > 4) newCursorPos = cursorPos + 1;
//             else if (formattedValue.length < value.length && prevValue.includes('.') && !formattedValue.includes('.')) newCursorPos = cursorPos - 1;
//         }
//         setFormData({ ...formData, hsCode: formattedValue });
//         setCursorPositions({ ...cursorPositions, hsCode: newCursorPos });
//     };

//     const handleAssessableValueChange = (e) => {
//         const input = e.target;
//         const value = input.value;
//         const cursorPos = input.selectionStart;
//         if (!/^[0-9]*\.?[0-9]*$/.test(value) && value !== '') return;
//         let formattedValue = value;
//         let newCursorPos = cursorPos;
//         if (value.includes('.')) {
//             const parts = value.split('.');
//             const beforeDecimal = parts[0].substring(0, 6);
//             const afterDecimal = parts[1].substring(0, 4);
//             formattedValue = `${beforeDecimal}.${afterDecimal}`;
//             if (beforeDecimal.length < parts[0].length && cursorPos > beforeDecimal.length) newCursorPos = beforeDecimal.length;
//             else if (parts[1].length > 4 && cursorPos > beforeDecimal.length + 1 + 4) newCursorPos = beforeDecimal.length + 1 + 4;
//         } else if (value.length > 6) {
//             formattedValue = `${value.substring(0, 6)}.${value.substring(6, 10)}`;
//             if (cursorPos > 6) newCursorPos = cursorPos + 1;
//         }
//         setFormData({ ...formData, assessableValue: formattedValue });
//         setCursorPositions({ ...cursorPositions, assessableValue: newCursorPos });
//     };

//     const handlePercentageChange = (e) => {
//         const input = e.target;
//         const { name, value } = input;
//         const cursorPos = input.selectionStart;
//         const prevValue = formData[name] || '';
//         const cleanValue = value.replace(/[^\d.]/g, '');
//         const parts = cleanValue.split('.');
//         let formattedValue = parts[0] || '';
//         if (parts.length === 1 && formattedValue.length > 3) formattedValue = `${formattedValue.substring(0, 3)}.${formattedValue.substring(3, 5)}`;
//         else if (parts.length > 1) formattedValue = `${formattedValue}.${parts[1].substring(0, 2)}`;
//         let newCursorPos = cursorPos;
//         if (value.length !== formattedValue.length) {
//             if (formattedValue.includes('.') && !prevValue.includes('.') && cursorPos > 3) newCursorPos = cursorPos + 1;
//             else if (!formattedValue.includes('.') && prevValue.includes('.')) newCursorPos = cursorPos - 1;
//         }
//         setFormData({ ...formData, [name]: formattedValue });
//         setCursorPositions({ ...cursorPositions, [name]: newCursorPos });
//     };

//     const handleTextChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleUnitSelect = (unitObject) => {
//         setFormData({
//             ...formData,
//             unitOfMeasurement: unitObject.unit,
//             uomCode: unitObject.uomCode
//         });
//         setIsDropdownOpen(false);
//         setHoveredOption(null);
//     };

//     const handleFocus = (fieldName) => setFocusedField(fieldName);
//     const handleBlur = () => setFocusedField(null);

//     const handleInputBlur = (e) => {
//         const { name, value } = e.target;
//         if (!value) {
//             handleBlur();
//             return;
//         }
//         let formattedValue = value;
//         const isPercentageField = percentageFields.some(field => field.name === name);
//         if (name === 'assessableValue' || isPercentageField) {
//             if (!value.includes('.')) formattedValue = `${value}.00`;
//             else {
//                 const parts = value.split('.');
//                 if (parts[1] === '') formattedValue = `${parts[0]}.00`;
//                 else if (parts[1].length === 1) formattedValue = `${parts[0]}.${parts[1]}0`;
//             }
//         }
//         setFormData(prev => ({ ...prev, [name]: formattedValue }));
//         handleBlur();
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!formData.uomCode) {
//             alert('Please select a Unit of Measurement');
//             return;
//         }
//         setIsSubmitting(true);
//         try {
//             const dataToSend = {
//                 ...formData,
//                 assessableValue: parseFloat(formData.assessableValue) || 0,
//                 customDuty: parseFloat(formData.customDuty) || 0,
//                 acd: parseFloat(formData.acd) || 0,
//                 rd: parseFloat(formData.rd) || 0,
//                 ftaCustomDuty: parseFloat(formData.ftaCustomDuty) || 0,
//                 salesTax: parseFloat(formData.salesTax) || 0,
//                 additionalSalesTax: parseFloat(formData.additionalSalesTax) || 0,
//                 furtherTax: parseFloat(formData.furtherTax) || 0,
//                 incomeTaxImport: parseFloat(formData.incomeTaxImport) || 0,
//                 incomeTaxWithheld: parseFloat(formData.incomeTaxWithheld) || 0
//             };
//             console.log("Submitting data:", dataToSend);
//             const response = await fetch('http://localhost:5000/api/v1/taxInfo', { // Fixed URL to match backend route
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(dataToSend),
//             });
//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || `API request failed: ${response.status}`);
//             }
//             await response.json();
//             alert("Form submitted successfully!");
//             resetForm();
//         } catch (error) {
//             console.error("Error submitting form data:", error);
//             alert(`Failed to submit data: ${error.message}`);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.1 } } };
//     const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } } };
//     const buttonVariants = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { delay: 0.5, type: "spring" } }, hover: { scale: 1.05, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)", backgroundColor: "#0c2542", transition: { type: "spring", stiffness: 400, damping: 10 } }, tap: { scale: 0.95 } };
//     const inputLabelVariants = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } } };
//     const dropdownVariants = { hidden: { opacity: 0, height: 0, overflow: 'hidden' }, visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } }, exit: { opacity: 0, height: 0, transition: { duration: 0.2 } } };
//     const modalVariants = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 30 } }, exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } } };

//     return (
//         <div className="min-h-screen font-sans bg-white flex items-center my-10 justify-center">
//             <motion.div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-xl" variants={containerVariants} initial="hidden" animate="visible">
//                 <motion.h1 className="text-3xl bg-[#061525] p-5 py-10 sm:text-4xl font-bold text-white mb-8 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, type: "spring" }}>
//                     Tax & Duty Information Form
//                 </motion.h1>
//                 <form onSubmit={handleSubmit} className="space-y-6 p-4 sm:p-6">
//                     <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants}>
//                         <motion.div variants={itemVariants}>
//                             <motion.label htmlFor="hsCode" className="block text-sm font-medium text-[#061525] mb-1" variants={inputLabelVariants}>HS Code</motion.label>
//                             <div className="relative">
//                                 <motion.input ref={inputRefs.hsCode} type="text" id="hsCode" name="hsCode" value={formData.hsCode} onChange={handleHsCodeChange} onFocus={() => handleFocus('hsCode')} onBlur={handleInputBlur} placeholder="1234.5678" className={`block w-full p-3 border-2 transition-all duration-300 ${focusedField === 'hsCode' ? 'border-[#061525] shadow-lg outline-none rounded-none' : 'border-[#4d555b]/30 rounded-md hover:border-[#4d555b]/50'}`} required />
//                                 <AnimatePresence>{formData.hsCode && <motion.div className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#061525] text-white text-xs px-2 py-1 rounded-full" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} transition={{ type: "spring", stiffness: 500 }}>{formData.hsCode.replace(/\D/g, '').length}/8</motion.div>}</AnimatePresence>
//                             </div>
//                             <motion.p className="text-xs text-[#4d555b] mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Format: XXXX.XXXX</motion.p>
//                         </motion.div>
//                         <motion.div variants={itemVariants}>
//                             <motion.label htmlFor="itemName" className="block text-sm font-medium text-[#061525] mb-1" variants={inputLabelVariants}>Item Name</motion.label>
//                             <div className="relative">
//                                 <motion.input type="text" id="itemName" name="itemName" value={formData.itemName} onChange={handleTextChange} onFocus={() => handleFocus('itemName')} onBlur={handleBlur} placeholder="Enter item name" className={`block w-full p-3 border-2 transition-all duration-300 ${focusedField === 'itemName' ? 'border-[#061525] shadow-lg outline-none rounded-none' : 'border-[#4d555b]/30 rounded-md hover:border-[#4d555b]/50'}`} maxLength={30} required />
//                                 <AnimatePresence>{formData.itemName && <motion.div className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#061525] text-white text-xs px-2 py-1 rounded-full" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}>{formData.itemName.length}/30</motion.div>}</AnimatePresence>
//                             </div>
//                             <motion.p className="text-xs text-[#4d555b] mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Max 30 characters</motion.p>
//                         </motion.div>
//                         <motion.div variants={itemVariants}>
//                             <motion.label htmlFor="unitOfMeasurement" className="block text-sm font-medium text-[#061525] mb-1" variants={inputLabelVariants}>Unit of Measurement</motion.label>
//                             <div className="relative" ref={dropdownRef}>
//                                 <motion.div className={`flex items-center justify-between w-full p-3 border-2 transition-all duration-300 cursor-pointer ${focusedField === 'unitOfMeasurement' || isDropdownOpen ? 'border-[#061525] shadow-lg outline-none rounded-none' : 'border-[#4d555b]/30 rounded-md hover:border-[#4d555b]/50'}`} onClick={() => setIsDropdownOpen(!isDropdownOpen)} onFocus={() => handleFocus('unitOfMeasurement')} onBlur={handleBlur} tabIndex={0}>
//                                     <span className={formData.unitOfMeasurement ? 'text-[#061525]' : 'text-gray-400'}>{formData.unitOfMeasurement || 'Select Unit'}</span>
//                                     <motion.svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" animate={{ rotate: isDropdownOpen ? 180 : 0, color: isDropdownOpen ? '#061525' : '#71717a' }} transition={{ duration: 0.3 }}>
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                                     </motion.svg>
//                                 </motion.div>
//                                 <AnimatePresence>
//                                     {isDropdownOpen && (
//                                         <motion.ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto" variants={dropdownVariants} initial="hidden" animate="visible" exit="exit">
//                                             {loadingUnits ? <li className="px-4 py-2 text-gray-500">Loading...</li> : error ? <li className="px-4 py-2 text-red-500">Error: {error}</li> :
//                                                 unitOptions.map((option) => (
//                                                     <motion.li key={option.id} className={`px-4 py-2 cursor-pointer transition duration-200 ease-in-out ${hoveredOption === option.id ? 'bg-blue-500 text-white' : ''}`} onClick={() => handleUnitSelect(option)} onMouseEnter={() => setHoveredOption(option.id)} onMouseLeave={() => setHoveredOption(null)} whileHover={{ backgroundColor: "#3b82f6", color: "white" }}>
//                                                         {option.unit}
//                                                     </motion.li>
//                                                 ))
//                                             }
//                                         </motion.ul>
//                                     )}
//                                 </AnimatePresence>
//                             </div>
//                         </motion.div>
//                         <motion.div variants={itemVariants}>
//                             <motion.label htmlFor="assessableValue" className="block text-sm font-medium text-[#061525] mb-1" variants={inputLabelVariants}>Assessable Value</motion.label>
//                             <div className="relative">
//                                 <motion.input ref={inputRefs.assessableValue} type="text" id="assessableValue" name="assessableValue" value={formData.assessableValue} onChange={handleAssessableValueChange} onFocus={() => handleFocus('assessableValue')} onBlur={handleInputBlur} placeholder="e.g., 0000.00" className={`block w-full p-3 border-2 transition-all duration-300 ${focusedField === 'assessableValue' ? 'border-[#061525] shadow-lg outline-none rounded-none' : 'border-[#4d555b]/30 rounded-md hover:border-[#4d555b]/50'}`} required />
//                             </div>
//                             <motion.p className="text-xs text-[#4d555b] mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Up to 6 digits and 4 decimal places</motion.p>
//                         </motion.div>
//                         {percentageFields.map((field) => (
//                             <motion.div key={field.id} variants={itemVariants}>
//                                 <motion.label htmlFor={field.id} className="block text-sm font-medium text-[#061525] mb-1" variants={inputLabelVariants}>{field.label}</motion.label>
//                                 <div className="relative">
//                                     <motion.input ref={inputRefs[field.name]} type="text" id={field.id} name={field.name} value={formData[field.name]} onChange={handlePercentageChange} onFocus={() => handleFocus(field.name)} onBlur={handleInputBlur} placeholder={field.placeholder} className={`block text-right w-full p-3 border-2 transition-all duration-300 ${focusedField === field.name ? 'border-[#061525] shadow-lg outline-none rounded-none' : 'border-[#4d555b]/30 rounded-md hover:border-[#4d555b]/50'}`} />
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </motion.div>
//                     <motion.div className="flex flex-col sm:flex-row justify-center gap-4 pt-6" variants={buttonVariants} initial="hidden" animate="visible">
//                         <motion.button type="submit" className="px-10 py-4 bg-[#061525] text-white font-bold rounded-lg shadow-md hover:bg-[#0c2542] disabled:opacity-50" disabled={isSubmitting} whileHover="hover" whileTap="tap">
//                             {isSubmitting ? 'Submitting...' : 'Submit'}
//                         </motion.button>
//                     </motion.div>
//                 </form>
//             </motion.div>
//         </div>
//     );
// }






























































// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// export default function DecimalInput() {
//   const [formData, setFormData] = useState({
//     hsCode: '',
//     itemName: '',
//     unitOfMeasurement: '',
//     uomCode: '',
//     assessableValue: '',
//     customDuty: '',
//     acd: '',
//     rd: '',
//     ftaCustomDuty: '',
//     salesTax: '',
//     additionalSalesTax: '',
//     furtherTax: '',
//     incomeTaxImport: '',
//     incomeTaxWithheld: ''
//   });

//   const [showUomManager, setShowUomManager] = useState(false);
//   const [unitOptions, setUnitOptions] = useState([]);
//   const [loadingUnits, setLoadingUnits] = useState(true);
//   const [error, setError] = useState(null);
//   const [focusedField, setFocusedField] = useState(null);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [hoveredOption, setHoveredOption] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const percentageFields = [
//     { id: 'customDuty', name: 'customDuty', label: 'Custom Duty (%)', placeholder: 'e.g., 000.00 %' },
//     { id: 'acd', name: 'acd', label: 'ACD (%)', placeholder: 'e.g., 000.00 %' },
//     { id: 'rd', name: 'rd', label: 'RD (%)', placeholder: 'e.g., 000.00 %' },
//     { id: 'ftaCustomDuty', name: 'ftaCustomDuty', label: 'FTA Custom Duty (%)', placeholder: 'e.g., 000.00 %' },
//     { id: 'salesTax', name: 'salesTax', label: 'Sales Tax (%)', placeholder: 'e.g., 000.00 %' },
//     { id: 'additionalSalesTax', name: 'additionalSalesTax', label: 'Additional Sales Tax (%)', placeholder: 'e.g., 000.00 %' },
//     { id: 'furtherTax', name: 'furtherTax', label: 'Further Tax (%)', placeholder: 'e.g., 000.00 %' },
//     { id: 'incomeTaxImport', name: 'incomeTaxImport', label: 'Income Tax Import (%)', placeholder: 'e.g., 000.00 %' },
//     { id: 'incomeTaxWithheld', name: 'incomeTaxWithheld', label: 'Income Tax Withheld (%)', placeholder: 'e.g., 000.00 %' }
//   ];

//   const inputRefs = {
//     hsCode: useRef(null),
//     assessableValue: useRef(null),
//     customDuty: useRef(null),
//     acd: useRef(null),
//     rd: useRef(null),
//     ftaCustomDuty: useRef(null),
//     salesTax: useRef(null),
//     additionalSalesTax: useRef(null),
//     furtherTax: useRef(null),
//     incomeTaxImport: useRef(null),
//     incomeTaxWithheld: useRef(null)
//   };

//   const dropdownRef = useRef(null);
//   const [cursorPositions, setCursorPositions] = useState({});

//   const fetchUnits = async () => {
//     try {
//       setLoadingUnits(true);
//       const response = await fetch('http://localhost:5000/api/v1/unit');
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const data = await response.json();
//       setUnitOptions(data);
//     } catch (err) {
//       setError(err.message);
//       console.error("Failed to fetch units:", err);
//     } finally {
//       setLoadingUnits(false);
//     }
//   };

//   useEffect(() => {
//     fetchUnits();
//   }, []);

//   const handleUomClose = () => {
//     setShowUomManager(false);
//     fetchUnits();
//   };

//   useEffect(() => {
//     Object.keys(cursorPositions).forEach(fieldName => {
//       const ref = inputRefs[fieldName];
//       if (ref?.current && cursorPositions[fieldName] !== undefined) {
//         ref.current.setSelectionRange(cursorPositions[fieldName], cursorPositions[fieldName]);
//       }
//     });
//   }, [cursorPositions, formData]);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsDropdownOpen(false);
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const resetForm = () => {
//     setFormData({
//       hsCode: '',
//       itemName: '',
//       unitOfMeasurement: '',
//       uomCode: '',
//       assessableValue: '',
//       customDuty: '',
//       acd: '',
//       rd: '',
//       ftaCustomDuty: '',
//       salesTax: '',
//       additionalSalesTax: '',
//       furtherTax: '',
//       incomeTaxImport: '',
//       incomeTaxWithheld: ''
//     });
//   };

//   const handleHsCodeChange = (e) => {
//     const input = e.target;
//     const value = input.value;
//     const cursorPos = input.selectionStart;
//     const prevValue = formData.hsCode;
//     const digits = value.replace(/[^\d]/g, '').substring(0, 8);
//     let formattedValue = digits;
//     if (digits.length > 4) formattedValue = `${digits.substring(0, 4)}.${digits.substring(4)}`;
//     let newCursorPos = cursorPos;
//     if (formattedValue.length !== value.length) {
//       if (formattedValue.length > value.length && cursorPos > 4) newCursorPos = cursorPos + 1;
//       else if (formattedValue.length < value.length && prevValue.includes('.') && !formattedValue.includes('.')) newCursorPos = cursorPos - 1;
//     }
//     setFormData({ ...formData, hsCode: formattedValue });
//     setCursorPositions({ ...cursorPositions, hsCode: newCursorPos });
//   };

//   const handleAssessableValueChange = (e) => {
//     const input = e.target;
//     const value = input.value;
//     const cursorPos = input.selectionStart;
//     if (!/^[0-9]*\.?[0-9]*$/.test(value) && value !== '') return;
//     let formattedValue = value;
//     let newCursorPos = cursorPos;
//     if (value.includes('.')) {
//       const parts = value.split('.');
//       const beforeDecimal = parts[0].substring(0, 6);
//       const afterDecimal = parts[1].substring(0, 4);
//       formattedValue = `${beforeDecimal}.${afterDecimal}`;
//       if (beforeDecimal.length < parts[0].length && cursorPos > beforeDecimal.length) newCursorPos = beforeDecimal.length;
//       else if (parts[1].length > 4 && cursorPos > beforeDecimal.length + 1 + 4) newCursorPos = beforeDecimal.length + 1 + 4;
//     } else if (value.length > 6) {
//       formattedValue = `${value.substring(0, 6)}.${value.substring(6, 10)}`;
//       if (cursorPos > 6) newCursorPos = cursorPos + 1;
//     }
//     setFormData({ ...formData, assessableValue: formattedValue });
//     setCursorPositions({ ...cursorPositions, assessableValue: newCursorPos });
//   };

//   const handlePercentageChange = (e) => {
//     const input = e.target;
//     const { name, value } = input;
//     const cursorPos = input.selectionStart;
//     const prevValue = formData[name] || '';
//     const cleanValue = value.replace(/[^\d.]/g, '');
//     const parts = cleanValue.split('.');
//     let formattedValue = parts[0] || '';
//     if (parts.length === 1 && formattedValue.length > 3) formattedValue = `${formattedValue.substring(0, 3)}.${formattedValue.substring(3, 5)}`;
//     else if (parts.length > 1) formattedValue = `${formattedValue}.${parts[1].substring(0, 2)}`;
//     let newCursorPos = cursorPos;
//     if (value.length !== formattedValue.length) {
//       if (formattedValue.includes('.') && !prevValue.includes('.') && cursorPos > 3) newCursorPos = cursorPos + 1;
//       else if (!formattedValue.includes('.') && prevValue.includes('.')) newCursorPos = cursorPos - 1;
//     }
//     setFormData({ ...formData, [name]: formattedValue });
//     setCursorPositions({ ...cursorPositions, [name]: newCursorPos });
//   };

//   const handleTextChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleUnitSelect = (unitObject) => {
//     setFormData({
//       ...formData,
//       unitOfMeasurement: unitObject.unit, // Display name
//       uomCode: unitObject.uomCode // Store code for DB
//     });
//     setIsDropdownOpen(false);
//     setHoveredOption(null);
//   };

//   const handleFocus = (fieldName) => setFocusedField(fieldName);
//   const handleBlur = () => setFocusedField(null);

//   const handleInputBlur = (e) => {
//     const { name, value } = e.target;
//     if (!value) {
//       handleBlur();
//       return;
//     }
//     let formattedValue = value;
//     const isPercentageField = percentageFields.some(field => field.name === name);
//     if (name === 'assessableValue' || isPercentageField) {
//       if (!value.includes('.')) formattedValue = `${value}.00`;
//       else {
//         const parts = value.split('.');
//         if (parts[1] === '') formattedValue = `${parts[0]}.00`;
//         else if (parts[1].length === 1) formattedValue = `${parts[0]}.${parts[1]}0`;
//       }
//     }
//     setFormData(prev => ({ ...prev, [name]: formattedValue }));
//     handleBlur();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.uomCode) {
//       alert('Please select a Unit of Measurement');
//       return;
//     }
//     setIsSubmitting(true);
//     try {
//       const dataToSend = {
//         ...formData,
//         assessableValue: parseFloat(formData.assessableValue) || 0,
//         customDuty: parseFloat(formData.customDuty) || 0,
//         acd: parseFloat(formData.acd) || 0,
//         rd: parseFloat(formData.rd) || 0,
//         ftaCustomDuty: parseFloat(formData.ftaCustomDuty) || 0,
//         salesTax: parseFloat(formData.salesTax) || 0,
//         additionalSalesTax: parseFloat(formData.additionalSalesTax) || 0,
//         furtherTax: parseFloat(formData.furtherTax) || 0,
//         incomeTaxImport: parseFloat(formData.incomeTaxImport) || 0,
//         incomeTaxWithheld: parseFloat(formData.incomeTaxWithheld) || 0
//       };
//       console.log("Submitting data:", dataToSend);
//       const response = await fetch('http://localhost:5000/api/v1/taxInfo', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(dataToSend),
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || `API request failed: ${response.status}`);
//       }
//       await response.json();
//       alert("Form submitted successfully!");
//       resetForm();
//     } catch (error) {
//       console.error("Error submitting form data:", error);
//       alert(`Failed to submit data: ${error.message}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.1 } } };
//   const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } } };
//   const buttonVariants = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { delay: 0.5, type: "spring" } }, hover: { scale: 1.05, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)", backgroundColor: "#0c2542", transition: { type: "spring", stiffness: 400, damping: 10 } }, tap: { scale: 0.95 } };
//   const inputLabelVariants = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } } };
//   const dropdownVariants = { hidden: { opacity: 0, height: 0, overflow: 'hidden' }, visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } }, exit: { opacity: 0, height: 0, transition: { duration: 0.2 } } };
//   const modalVariants = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 30 } }, exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } } };

//   return (
//     <div className="min-h-screen font-sans bg-white flex items-center my-10 justify-center">
//       <motion.div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-xl" variants={containerVariants} initial="hidden" animate="visible">
//         <motion.h1 className="text-3xl bg-[#061525] p-5 py-10 sm:text-4xl font-bold text-white mb-8 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, type: "spring" }}>
//           Tax & Duty Information Form
//         </motion.h1>
//         <form onSubmit={handleSubmit} className="space-y-6 p-4 sm:p-6">
//           <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants}>
//             <motion.div variants={itemVariants}>
//               <motion.label htmlFor="hsCode" className="block text-sm font-medium text-[#061525] mb-1" variants={inputLabelVariants}>HS Code</motion.label>
//               <div className="relative">
//                 <motion.input ref={inputRefs.hsCode} type="text" id="hsCode" name="hsCode" value={formData.hsCode} onChange={handleHsCodeChange} onFocus={() => handleFocus('hsCode')} onBlur={handleInputBlur} placeholder="1234.5678" className={`block w-full p-3 border-2 transition-all duration-300 ${focusedField === 'hsCode' ? 'border-[#061525] shadow-lg outline-none rounded-none' : 'border-[#4d555b]/30 rounded-md hover:border-[#4d555b]/50'}`} required />
//                 <AnimatePresence>{formData.hsCode && <motion.div className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#061525] text-white text-xs px-2 py-1 rounded-full" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} transition={{ type: "spring", stiffness: 500 }}>{formData.hsCode.replace(/\D/g, '').length}/8</motion.div>}</AnimatePresence>
//               </div>
//               <motion.p className="text-xs text-[#4d555b] mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Format: XXXX.XXXX</motion.p>
//             </motion.div>
//             <motion.div variants={itemVariants}>
//               <motion.label htmlFor="itemName" className="block text-sm font-medium text-[#061525] mb-1" variants={inputLabelVariants}>Item Name</motion.label>
//               <div className="relative">
//                 <motion.input type="text" id="itemName" name="itemName" value={formData.itemName} onChange={handleTextChange} onFocus={() => handleFocus('itemName')} onBlur={handleBlur} placeholder="Enter item name" className={`block w-full p-3 border-2 transition-all duration-300 ${focusedField === 'itemName' ? 'border-[#061525] shadow-lg outline-none rounded-none' : 'border-[#4d555b]/30 rounded-md hover:border-[#4d555b]/50'}`} maxLength={30} required />
//                 <AnimatePresence>{formData.itemName && <motion.div className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#061525] text-white text-xs px-2 py-1 rounded-full" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}>{formData.itemName.length}/30</motion.div>}</AnimatePresence>
//               </div>
//               <motion.p className="text-xs text-[#4d555b] mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Max 30 characters</motion.p>
//             </motion.div>
//             <motion.div variants={itemVariants}>
//               <motion.label htmlFor="unitOfMeasurement" className="block text-sm font-medium text-[#061525] mb-1" variants={inputLabelVariants}>Unit of Measurement</motion.label>
//               <div className="relative" ref={dropdownRef}>
//                 <motion.div className={`flex items-center justify-between w-full p-3 border-2 transition-all duration-300 cursor-pointer ${focusedField === 'unitOfMeasurement' || isDropdownOpen ? 'border-[#061525] shadow-lg outline-none rounded-none' : 'border-[#4d555b]/30 rounded-md hover:border-[#4d555b]/50'}`} onClick={() => setIsDropdownOpen(!isDropdownOpen)} onFocus={() => handleFocus('unitOfMeasurement')} onBlur={handleBlur} tabIndex={0}>
//                   <span className={formData.unitOfMeasurement ? 'text-[#061525]' : 'text-gray-400'}>{formData.unitOfMeasurement || 'Select Unit'}</span>
//                   <motion.svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" animate={{ rotate: isDropdownOpen ? 180 : 0, color: isDropdownOpen ? '#061525' : '#71717a' }} transition={{ duration: 0.3 }}>
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </motion.svg>
//                 </motion.div>
//                 <AnimatePresence>
//                   {isDropdownOpen && (
//                     <motion.ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto" variants={dropdownVariants} initial="hidden" animate="visible" exit="exit">
//                       {loadingUnits ? <li className="px-4 py-2 text-gray-500">Loading...</li> : error ? <li className="px-4 py-2 text-red-500">Error: {error}</li> :
//                         unitOptions.map((option) => (
//                           <motion.li key={option.id} className={`px-4 py-2 cursor-pointer transition duration-200 ease-in-out ${hoveredOption === option.id ? 'bg-blue-500 text-white' : ''}`} onClick={() => handleUnitSelect(option)} onMouseEnter={() => setHoveredOption(option.id)} onMouseLeave={() => setHoveredOption(null)} whileHover={{ backgroundColor: "#3b82f6", color: "white" }}>
//                             {option.unit} {/* Display name */}
//                           </motion.li>
//                         ))
//                       }
//                     </motion.ul>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </motion.div>
//             <motion.div variants={itemVariants}>
//               <motion.label htmlFor="assessableValue" className="block text-sm font-medium text-[#061525] mb-1" variants={inputLabelVariants}>Assessable Value</motion.label>
//               <div className="relative">
//                 <motion.input ref={inputRefs.assessableValue} type="text" id="assessableValue" name="assessableValue" value={formData.assessableValue} onChange={handleAssessableValueChange} onFocus={() => handleFocus('assessableValue')} onBlur={handleInputBlur} placeholder="e.g., 0000.00" className={`block w-full p-3 border-2 transition-all duration-300 ${focusedField === 'assessableValue' ? 'border-[#061525] shadow-lg outline-none rounded-none' : 'border-[#4d555b]/30 rounded-md hover:border-[#4d555b]/50'}`} required />
//               </div>
//               <motion.p className="text-xs text-[#4d555b] mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Up to 6 digits and 4 decimal places</motion.p>
//             </motion.div>
//             {percentageFields.map((field) => (
//               <motion.div key={field.id} variants={itemVariants}>
//                 <motion.label htmlFor={field.id} className="block text-sm font-medium text-[#061525] mb-1" variants={inputLabelVariants}>{field.label}</motion.label>
//                 <div className="relative">
//                   <motion.input ref={inputRefs[field.name]} type="text" id={field.id} name={field.name} value={formData[field.name]} onChange={handlePercentageChange} onFocus={() => handleFocus(field.name)} onBlur={handleInputBlur} placeholder={field.placeholder} className={`block text-right w-full p-3 border-2 transition-all duration-300 ${focusedField === field.name ? 'border-[#061525] shadow-lg outline-none rounded-none' : 'border-[#4d555b]/30 rounded-md hover:border-[#4d555b]/50'}`} />
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//           <motion.div className="flex flex-col sm:flex-row justify-center gap-4 pt-6" variants={buttonVariants} initial="hidden" animate="visible">
//             <motion.button type="submit" className="px-10 py-4 bg-[#061525] text-white font-bold rounded-lg shadow-md hover:bg-[#0c2542] disabled:opacity-50" disabled={isSubmitting} whileHover="hover" whileTap="tap">
//               {isSubmitting ? 'Submitting...' : 'Submit'}
//             </motion.button>
//           </motion.div>
//         </form>
//       </motion.div>
//     </div>
//   );
// }


























































import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DecimalInput() {
  const [formData, setFormData] = useState({
    hsCode: '',
    itemName: '',
    unitOfMeasurement: '',
    uomCode: '',
    assessableValue: '',
    customDuty: '',
    ftaCustomDuty: '',
    acd: '',
    rd: '',
    salesTax: '',
    additionalSalesTax: '',
    incomeTaxImport: '',
    furtherTax: '',
    incomeTaxWithheld: ''
  });

  const [showUomManager, setShowUomManager] = useState(false);
  const [unitOptions, setUnitOptions] = useState([]);
  const [loadingUnits, setLoadingUnits] = useState(true);
  const [error, setError] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reordered according to requirements
  const percentageFields = [
    { id: 'customDuty', name: 'customDuty', label: 'Custom Duty (%)', placeholder: 'e.g., 000.00 %' },
    { id: 'ftaCustomDuty', name: 'ftaCustomDuty', label: 'FTA Custom Duty (%)', placeholder: 'e.g., 000.00 %' },
    { id: 'acd', name: 'acd', label: 'ACD (%)', placeholder: 'e.g., 000.00 %' },
    { id: 'rd', name: 'rd', label: 'RD (%)', placeholder: 'e.g., 000.00 %' },
    { id: 'salesTax', name: 'salesTax', label: 'Sales Tax (%)', placeholder: 'e.g., 000.00 %' },
    { id: 'additionalSalesTax', name: 'additionalSalesTax', label: 'Additional Sales Tax (%)', placeholder: 'e.g., 000.00 %' },
    { id: 'incomeTaxImport', name: 'incomeTaxImport', label: 'Income Tax Import (%)', placeholder: 'e.g., 000.00 %' },
    { id: 'furtherTax', name: 'furtherTax', label: 'Further Tax (%)', placeholder: 'e.g., 000.00 %' },
    { id: 'incomeTaxWithheld', name: 'incomeTaxWithheld', label: 'Income Tax Withheld (%)', placeholder: 'e.g., 000.00 %' }
  ];

  const inputRefs = {
    hsCode: useRef(null),
    assessableValue: useRef(null),
    customDuty: useRef(null),
    ftaCustomDuty: useRef(null),
    acd: useRef(null),
    rd: useRef(null),
    salesTax: useRef(null),
    additionalSalesTax: useRef(null),
    incomeTaxImport: useRef(null),
    furtherTax: useRef(null),
    incomeTaxWithheld: useRef(null)
  };

  const dropdownRef = useRef(null);
  const [cursorPositions, setCursorPositions] = useState({});

  const fetchUnits = async () => {
    try {
      setLoadingUnits(true);
      // 'http://localhost:5000/api/v1/unit'
      const response = await fetch('/api/v1/unit');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setUnitOptions(data);
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch units:", err);
    } finally {
      setLoadingUnits(false);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  const handleUomClose = () => {
    setShowUomManager(false);
    fetchUnits();
  };

  useEffect(() => {
    Object.keys(cursorPositions).forEach(fieldName => {
      const ref = inputRefs[fieldName];
      if (ref?.current && cursorPositions[fieldName] !== undefined) {
        ref.current.setSelectionRange(cursorPositions[fieldName], cursorPositions[fieldName]);
      }
    });
  }, [cursorPositions, formData]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const resetForm = () => {
    setFormData({
      hsCode: '',
      itemName: '',
      unitOfMeasurement: '',
      uomCode: '',
      assessableValue: '',
      customDuty: '',
      ftaCustomDuty: '',
      acd: '',
      rd: '',
      salesTax: '',
      additionalSalesTax: '',
      incomeTaxImport: '',
      furtherTax: '',
      incomeTaxWithheld: ''
    });
  };

  const handleHsCodeChange = (e) => {
    const input = e.target;
    const value = input.value;
    const cursorPos = input.selectionStart;
    const prevValue = formData.hsCode;
    const digits = value.replace(/[^\d]/g, '').substring(0, 8);
    let formattedValue = digits;
    if (digits.length > 4) formattedValue = `${digits.substring(0, 4)}.${digits.substring(4)}`;
    let newCursorPos = cursorPos;
    if (formattedValue.length !== value.length) {
      if (formattedValue.length > value.length && cursorPos > 4) newCursorPos = cursorPos + 1;
      else if (formattedValue.length < value.length && prevValue.includes('.') && !formattedValue.includes('.')) newCursorPos = cursorPos - 1;
    }
    setFormData({ ...formData, hsCode: formattedValue });
    setCursorPositions({ ...cursorPositions, hsCode: newCursorPos });
  };

  const handleAssessableValueChange = (e) => {
    const input = e.target;
    const value = input.value;
    const cursorPos = input.selectionStart;
    if (!/^[0-9]*\.?[0-9]*$/.test(value) && value !== '') return;
    let formattedValue = value;
    let newCursorPos = cursorPos;
    if (value.includes('.')) {
      const parts = value.split('.');
      const beforeDecimal = parts[0].substring(0, 6);
      const afterDecimal = parts[1].substring(0, 4);
      formattedValue = `${beforeDecimal}.${afterDecimal}`;
      if (beforeDecimal.length < parts[0].length && cursorPos > beforeDecimal.length) newCursorPos = beforeDecimal.length;
      else if (parts[1].length > 4 && cursorPos > beforeDecimal.length + 1 + 4) newCursorPos = beforeDecimal.length + 1 + 4;
    } else if (value.length > 6) {
      formattedValue = `${value.substring(0, 6)}.${value.substring(6, 10)}`;
      if (cursorPos > 6) newCursorPos = cursorPos + 1;
    }
    setFormData({ ...formData, assessableValue: formattedValue });
    setCursorPositions({ ...cursorPositions, assessableValue: newCursorPos });
  };

  const handlePercentageChange = (e) => {
    const input = e.target;
    const { name, value } = input;
    const cursorPos = input.selectionStart;
    const prevValue = formData[name] || '';
    const cleanValue = value.replace(/[^\d.]/g, '');
    const parts = cleanValue.split('.');
    let formattedValue = parts[0] || '';
    if (parts.length === 1 && formattedValue.length > 3) formattedValue = `${formattedValue.substring(0, 3)}.${formattedValue.substring(3, 5)}`;
    else if (parts.length > 1) formattedValue = `${formattedValue}.${parts[1].substring(0, 2)}`;
    let newCursorPos = cursorPos;
    if (value.length !== formattedValue.length) {
      if (formattedValue.includes('.') && !prevValue.includes('.') && cursorPos > 3) newCursorPos = cursorPos + 1;
      else if (!formattedValue.includes('.') && prevValue.includes('.')) newCursorPos = cursorPos - 1;
    }
    setFormData({ ...formData, [name]: formattedValue });
    setCursorPositions({ ...cursorPositions, [name]: newCursorPos });
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUnitSelect = (unitObject) => {
    setFormData({
      ...formData,
      unitOfMeasurement: unitObject.unit, // Display name
      uomCode: unitObject.uomCode // Store code for DB
    });
    setIsDropdownOpen(false);
    setHoveredOption(null);
  };

  const handleFocus = (fieldName) => setFocusedField(fieldName);
  const handleBlur = () => setFocusedField(null);

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    if (!value) {
      handleBlur();
      return;
    }
    let formattedValue = value;
    const isPercentageField = percentageFields.some(field => field.name === name);
    if (name === 'assessableValue' || isPercentageField) {
      if (!value.includes('.')) formattedValue = `${value}.00`;
      else {
        const parts = value.split('.');
        if (parts[1] === '') formattedValue = `${parts[0]}.00`;
        else if (parts[1].length === 1) formattedValue = `${parts[0]}.${parts[1]}0`;
      }
    }
    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    handleBlur();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.uomCode) {
      alert('Please select a Unit of Measurement');
      return;
    }
    setIsSubmitting(true);
    try {
      const dataToSend = {
        ...formData,
        assessableValue: parseFloat(formData.assessableValue) || 0,
        customDuty: parseFloat(formData.customDuty) || 0,
        ftaCustomDuty: parseFloat(formData.ftaCustomDuty) || 0,
        acd: parseFloat(formData.acd) || 0,
        rd: parseFloat(formData.rd) || 0,
        salesTax: parseFloat(formData.salesTax) || 0,
        additionalSalesTax: parseFloat(formData.additionalSalesTax) || 0,
        incomeTaxImport: parseFloat(formData.incomeTaxImport) || 0,
        furtherTax: parseFloat(formData.furtherTax) || 0,
        incomeTaxWithheld: parseFloat(formData.incomeTaxWithheld) || 0
      };
      // 'http://localhost:5000/api/v1/taxInfo'
      console.log("Submitting data:", dataToSend);
      const response = await fetch('/api/v1/taxInfo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `API request failed: ${response.status}`);
      }
      await response.json();
      alert("Form submitted successfully!");
      resetForm();
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert(`Failed to submit data: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } } };
  const buttonVariants = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { delay: 0.5, type: "spring" } }, hover: { scale: 1.05, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)", backgroundColor: "#6df8bd", transition: { type: "spring", stiffness: 400, damping: 10 } }, tap: { scale: 0.95 } };
  const inputLabelVariants = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } } };
  const dropdownVariants = { hidden: { opacity: 0, height: 0, overflow: 'hidden' }, visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } }, exit: { opacity: 0, height: 0, transition: { duration: 0.2 } } };
  const modalVariants = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 30 } }, exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } } };

  return (
    <div className="font-sans mt-8 flex mt-2 justify-center">
      <motion.div className="w-full max-w-6xl mx-auto " variants={containerVariants} initial="hidden" animate="visible">
        <div className='border-b-2 border-zinc-300 pb-4 mb-4'>
          <h1 className='text-3xl text-[#4a6fa5] font-medium'>Tax and Duty Form</h1>
          <p className="text-gray-600">Enter the item data</p>
        </div>

        <motion.h1 className="text-xl bg-[#4a6fa5] rounded-t-xl p-4  sm:text-2xl font-medium text-white mb-6 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, type: "spring" }}>
          Data Form
        </motion.h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-[#FAF9F9] p-4 bg-gradient-to-br from-[#FAF9F9] to-[#FFFFFF] rounded-xl shadow-md sm:p-6">
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <motion.label htmlFor="hsCode" className="block text-sm font-medium text-[#4a6fa5] mb-0.5" variants={inputLabelVariants}>HS Code</motion.label>
              <div className="relative">
                <motion.input ref={inputRefs.hsCode} type="text" id="hsCode" name="hsCode" value={formData.hsCode} onChange={handleHsCodeChange} onFocus={() => handleFocus('hsCode')} onBlur={handleInputBlur} placeholder="1234.5678" className={`block w-full p-2 border transition-all duration-300 rounded-md ${focusedField === 'hsCode' ? 'border-[#4a6fa5] shadow-sm outline-none' : 'border-[#B19F9E] hover:border-[#4a6fa5]/70'}`} required />
                <AnimatePresence>{formData.hsCode && <motion.div className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#4a6fa5] text-white text-xs px-2 py-0.5 rounded-full" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} transition={{ type: "spring", stiffness: 500 }}>{formData.hsCode.replace(/\D/g, '').length}/8</motion.div>}</AnimatePresence>
              </div>
              <motion.p className="text-xs text-[#B19F9E] mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Format: XXXX.XXXX</motion.p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <motion.label htmlFor="itemName" className="block text-sm font-medium text-[#4a6fa5] mb-0.5" variants={inputLabelVariants}>Item Name</motion.label>
              <div className="relative">
                <motion.input type="text" id="itemName" name="itemName" value={formData.itemName} onChange={handleTextChange} onFocus={() => handleFocus('itemName')} onBlur={handleBlur} placeholder="Enter item name" className={`block w-full p-2 border transition-all duration-300 rounded-md ${focusedField === 'itemName' ? 'border-[#4a6fa5] shadow-sm outline-none' : 'border-[#B19F9E] hover:border-[#4a6fa5]/70'}`} maxLength={30} required />
                <AnimatePresence>{formData.itemName && <motion.div className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#4a6fa5] text-white text-xs px-2 py-0.5 rounded-full" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}>{formData.itemName.length}/30</motion.div>}</AnimatePresence>
              </div>
              <motion.p className="text-xs text-[#B19F9E] mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Max 30 characters</motion.p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <motion.label htmlFor="unitOfMeasurement" className="block text-sm font-medium text-[#4a6fa5] mb-0.5" variants={inputLabelVariants}>Unit of Measurement</motion.label>
              <div className="relative" ref={dropdownRef}>
                <motion.div className={`flex items-center justify-between w-full p-2 border transition-all duration-300 cursor-pointer rounded-md ${focusedField === 'unitOfMeasurement' || isDropdownOpen ? 'border-[#4a6fa5] shadow-sm outline-none' : 'border-[#B19F9E] hover:border-[#4a6fa5]/70'}`} onClick={() => setIsDropdownOpen(!isDropdownOpen)} onFocus={() => handleFocus('unitOfMeasurement')} onBlur={handleBlur} tabIndex={0}>
                  <span className={formData.unitOfMeasurement ? 'text-[#4a6fa5]' : 'text-[#B19F9E]'}>{formData.unitOfMeasurement || 'Select Unit'}</span>
                  <motion.svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#B19F9E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" animate={{ rotate: isDropdownOpen ? 180 : 0, color: isDropdownOpen ? '#4a6fa5' : '#B19F9E' }} transition={{ duration: 0.3 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </motion.div>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.ul className="absolute z-10 w-full mt-1 bg-white border border-[#B19F9E] rounded-md shadow-md max-h-60 overflow-y-auto" variants={dropdownVariants} initial="hidden" animate="visible" exit="exit">
                      {loadingUnits ? <li className="px-4 py-2 text-[#B19F9E]">Loading...</li> : error ? <li className="px-4 py-2 text-[#A16E83]">Error: {error}</li> :
                        unitOptions.map((option) => (
                          <motion.li key={option.id} className={`px-4 py-2 cursor-pointer transition duration-200 ease-in-out ${hoveredOption === option.id ? 'bg-[#4a6fa5] text-white' : 'text-[#19181A]'}`} onClick={() => handleUnitSelect(option)} onMouseEnter={() => setHoveredOption(option.id)} onMouseLeave={() => setHoveredOption(null)} whileHover={{ backgroundColor: "#4a6fa5", color: "#fff" }}>
                            {option.unit}
                          </motion.li>
                        ))
                      }
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <motion.label htmlFor="assessableValue" className="block text-sm font-medium text-[#4a6fa5] mb-0.5" variants={inputLabelVariants}>Assessable Value</motion.label>
              <div className="relative">
                <motion.input ref={inputRefs.assessableValue} type="text" id="assessableValue" name="assessableValue" value={formData.assessableValue} onChange={handleAssessableValueChange} onFocus={() => handleFocus('assessableValue')} onBlur={handleInputBlur} placeholder="e.g., 0000.00" className={`block w-full p-2 border transition-all duration-300 rounded-md ${focusedField === 'assessableValue' ? 'border-[#4a6fa5] shadow-sm outline-none' : 'border-[#B19F9E] hover:border-[#4a6fa5]/70'}`} required />
              </div>
              <motion.p className="text-xs text-[#B19F9E] mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Up to 6 digits and 4 decimal places</motion.p>
            </motion.div>
            {percentageFields.map((field) => (
              <motion.div key={field.id} variants={itemVariants}>
                <motion.label htmlFor={field.id} className="block text-sm font-medium text-[#4a6fa5] mb-0.5" variants={inputLabelVariants}>{field.label}</motion.label>
                <div className="relative">
                  <motion.input ref={inputRefs[field.name]} type="text" id={field.id} name={field.name} value={formData[field.name]} onChange={handlePercentageChange} onFocus={() => handleFocus(field.name)} onBlur={handleInputBlur} placeholder={field.placeholder} className={`block text-right w-full p-2 border transition-all duration-300 rounded-md ${focusedField === field.name ? 'border-[#4a6fa5] shadow-sm outline-none' : 'border-[#B19F9E] hover:border-[#4a6fa5]/70'}`} />
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div className="flex flex-col sm:flex-row justify-center gap-4 pt-4" variants={buttonVariants} initial="hidden" animate="visible">
            <motion.button type="submit" className="px-8 py-3 bg-[#4a6fa5] text-white font-bold rounded-lg shadow-md  transition-colors duration-300 disabled:opacity-50" disabled={isSubmitting} whileHover="hover" whileTap="tap">
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}



























// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// export default function DecimalInput() {
//   const [formData, setFormData] = useState({
//     hsCode: '',
//     itemName: '',
//     unitOfMeasurement: '',
//     uomCode: '',
//     assessableValue: '',
//     customDuty: '',
//     acd: '',
//     rd: '',
//     ftaCustomDuty: '',
//     salesTax: '',
//     additionalSalesTax: '',
//     furtherTax: '',
//     incomeTaxImport: '',
//     incomeTaxWithheld: ''
//   });

//   const [showUomManager, setShowUomManager] = useState(false);
//   const [unitOptions, setUnitOptions] = useState([]);
//   const [loadingUnits, setLoadingUnits] = useState(true);
//   const [error, setError] = useState(null);
//   const [focusedField, setFocusedField] = useState(null);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [hoveredOption, setHoveredOption] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const percentageFields = [
//     { id: 'customDuty', name: 'customDuty', label: 'Custom Duty (%)', placeholder: 'e.g., 000.00 %' },
//     { id: 'acd', name: 'acd', label: 'ACD (%)', placeholder: 'e.g., 000.00 %' },
//     { id: 'rd', name: 'rd', label: 'RD (%)', placeholder: 'e.g., 000.00 %' },
//     { id: 'ftaCustomDuty', name: 'ftaCustomDuty', label: 'FTA Custom Duty (%)', placeholder: 'e.g., 000.00 %' },
//     { id: 'salesTax', name: 'salesTax', label: 'Sales Tax (%)', placeholder: 'e.g., 000.00 %' },
//     { id: 'additionalSalesTax', name: 'additionalSalesTax', label: 'Additional Sales Tax (%)', placeholder: 'e.g., 000.00 %' },
//     { id: 'furtherTax', name: 'furtherTax', label: 'Further Tax (%)', placeholder: 'e.g., 000.00 %' },
//     { id: 'incomeTaxImport', name: 'incomeTaxImport', label: 'Income Tax Import (%)', placeholder: 'e.g., 000.00 %' },
//     { id: 'incomeTaxWithheld', name: 'incomeTaxWithheld', label: 'Income Tax Withheld (%)', placeholder: 'e.g., 000.00 %' }
//   ];

//   const inputRefs = {
//     hsCode: useRef(null),
//     assessableValue: useRef(null),
//     customDuty: useRef(null),
//     acd: useRef(null),
//     rd: useRef(null),
//     ftaCustomDuty: useRef(null),
//     salesTax: useRef(null),
//     additionalSalesTax: useRef(null),
//     furtherTax: useRef(null),
//     incomeTaxImport: useRef(null),
//     incomeTaxWithheld: useRef(null)
//   };

//   const dropdownRef = useRef(null);
//   const [cursorPositions, setCursorPositions] = useState({});

//   const fetchUnits = async () => {
//     try {
//       setLoadingUnits(true);
//       const response = await fetch('http://localhost:5000/api/v1/unit');
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const data = await response.json();
//       setUnitOptions(data);
//     } catch (err) {
//       setError(err.message);
//       console.error("Failed to fetch units:", err);
//     } finally {
//       setLoadingUnits(false);
//     }
//   };

//   useEffect(() => {
//     fetchUnits();
//   }, []);

//   const handleUomClose = () => {
//     setShowUomManager(false);
//     fetchUnits();
//   };

//   useEffect(() => {
//     Object.keys(cursorPositions).forEach(fieldName => {
//       const ref = inputRefs[fieldName];
//       if (ref?.current && cursorPositions[fieldName] !== undefined) {
//         ref.current.setSelectionRange(cursorPositions[fieldName], cursorPositions[fieldName]);
//       }
//     });
//   }, [cursorPositions, formData]);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsDropdownOpen(false);
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const resetForm = () => {
//     setFormData({
//       hsCode: '',
//       itemName: '',
//       unitOfMeasurement: '',
//       uomCode: '',
//       assessableValue: '',
//       customDuty: '',
//       acd: '',
//       rd: '',
//       ftaCustomDuty: '',
//       salesTax: '',
//       additionalSalesTax: '',
//       furtherTax: '',
//       incomeTaxImport: '',
//       incomeTaxWithheld: ''
//     });
//   };

//   const handleHsCodeChange = (e) => {
//     const input = e.target;
//     const value = input.value;
//     const cursorPos = input.selectionStart;
//     const prevValue = formData.hsCode;
//     const digits = value.replace(/[^\d]/g, '').substring(0, 8);
//     let formattedValue = digits;
//     if (digits.length > 4) formattedValue = `${digits.substring(0, 4)}.${digits.substring(4)}`;
//     let newCursorPos = cursorPos;
//     if (formattedValue.length !== value.length) {
//       if (formattedValue.length > value.length && cursorPos > 4) newCursorPos = cursorPos + 1;
//       else if (formattedValue.length < value.length && prevValue.includes('.') && !formattedValue.includes('.')) newCursorPos = cursorPos - 1;
//     }
//     setFormData({ ...formData, hsCode: formattedValue });
//     setCursorPositions({ ...cursorPositions, hsCode: newCursorPos });
//   };

//   const handleAssessableValueChange = (e) => {
//     const input = e.target;
//     const value = input.value;
//     const cursorPos = input.selectionStart;
//     if (!/^[0-9]*\.?[0-9]*$/.test(value) && value !== '') return;
//     let formattedValue = value;
//     let newCursorPos = cursorPos;
//     if (value.includes('.')) {
//       const parts = value.split('.');
//       const beforeDecimal = parts[0].substring(0, 6);
//       const afterDecimal = parts[1].substring(0, 4);
//       formattedValue = `${beforeDecimal}.${afterDecimal}`;
//       if (beforeDecimal.length < parts[0].length && cursorPos > beforeDecimal.length) newCursorPos = beforeDecimal.length;
//       else if (parts[1].length > 4 && cursorPos > beforeDecimal.length + 1 + 4) newCursorPos = beforeDecimal.length + 1 + 4;
//     } else if (value.length > 6) {
//       formattedValue = `${value.substring(0, 6)}.${value.substring(6, 10)}`;
//       if (cursorPos > 6) newCursorPos = cursorPos + 1;
//     }
//     setFormData({ ...formData, assessableValue: formattedValue });
//     setCursorPositions({ ...cursorPositions, assessableValue: newCursorPos });
//   };

//   const handlePercentageChange = (e) => {
//     const input = e.target;
//     const { name, value } = input;
//     const cursorPos = input.selectionStart;
//     const prevValue = formData[name] || '';
//     const cleanValue = value.replace(/[^\d.]/g, '');
//     const parts = cleanValue.split('.');
//     let formattedValue = parts[0] || '';
//     if (parts.length === 1 && formattedValue.length > 3) formattedValue = `${formattedValue.substring(0, 3)}.${formattedValue.substring(3, 5)}`;
//     else if (parts.length > 1) formattedValue = `${formattedValue}.${parts[1].substring(0, 2)}`;
//     let newCursorPos = cursorPos;
//     if (value.length !== formattedValue.length) {
//       if (formattedValue.includes('.') && !prevValue.includes('.') && cursorPos > 3) newCursorPos = cursorPos + 1;
//       else if (!formattedValue.includes('.') && prevValue.includes('.')) newCursorPos = cursorPos - 1;
//     }
//     setFormData({ ...formData, [name]: formattedValue });
//     setCursorPositions({ ...cursorPositions, [name]: newCursorPos });
//   };

//   const handleTextChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleUnitSelect = (unitObject) => {
//     setFormData({
//       ...formData,
//       unitOfMeasurement: unitObject.unit, // Display name
//       uomCode: unitObject.uomCode // Store code for DB
//     });
//     setIsDropdownOpen(false);
//     setHoveredOption(null);
//   };

//   const handleFocus = (fieldName) => setFocusedField(fieldName);
//   const handleBlur = () => setFocusedField(null);

//   const handleInputBlur = (e) => {
//     const { name, value } = e.target;
//     if (!value) {
//       handleBlur();
//       return;
//     }
//     let formattedValue = value;
//     const isPercentageField = percentageFields.some(field => field.name === name);
//     if (name === 'assessableValue' || isPercentageField) {
//       if (!value.includes('.')) formattedValue = `${value}.00`;
//       else {
//         const parts = value.split('.');
//         if (parts[1] === '') formattedValue = `${parts[0]}.00`;
//         else if (parts[1].length === 1) formattedValue = `${parts[0]}.${parts[1]}0`;
//       }
//     }
//     setFormData(prev => ({ ...prev, [name]: formattedValue }));
//     handleBlur();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.uomCode) {
//       alert('Please select a Unit of Measurement');
//       return;
//     }
//     setIsSubmitting(true);
//     try {
//       const dataToSend = {
//         ...formData,
//         assessableValue: parseFloat(formData.assessableValue) || 0,
//         customDuty: parseFloat(formData.customDuty) || 0,
//         acd: parseFloat(formData.acd) || 0,
//         rd: parseFloat(formData.rd) || 0,
//         ftaCustomDuty: parseFloat(formData.ftaCustomDuty) || 0,
//         salesTax: parseFloat(formData.salesTax) || 0,
//         additionalSalesTax: parseFloat(formData.additionalSalesTax) || 0,
//         furtherTax: parseFloat(formData.furtherTax) || 0,
//         incomeTaxImport: parseFloat(formData.incomeTaxImport) || 0,
//         incomeTaxWithheld: parseFloat(formData.incomeTaxWithheld) || 0
//       };
//       console.log("Submitting data:", dataToSend);
//       const response = await fetch('http://localhost:5000/api/v1/taxInfo', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(dataToSend),
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || `API request failed: ${response.status}`);
//       }
//       await response.json();
//       alert("Form submitted successfully!");
//       resetForm();
//     } catch (error) {
//       console.error("Error submitting form data:", error);
//       alert(`Failed to submit data: ${error.message}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.1 } } };
//   const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } } };
//   const buttonVariants = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { delay: 0.5, type: "spring" } }, hover: { scale: 1.05, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)", backgroundColor: "#2e2c31", transition: { type: "spring", stiffness: 400, damping: 10 } }, tap: { scale: 0.95 } };
//   const inputLabelVariants = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } } };
//   const dropdownVariants = { hidden: { opacity: 0, height: 0, overflow: 'hidden' }, visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } }, exit: { opacity: 0, height: 0, transition: { duration: 0.2 } } };
//   const modalVariants = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 30 } }, exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } } };

//   return (
//     <div className="font-sans bg-[#FAF9F9] flex mt-2 justify-center">
//       <motion.div className="w-full max-w-6xl mx-auto bg-gradient-to-br from-[#FAF9F9] to-[#FFFFFF] rounded-xl shadow-md" variants={containerVariants} initial="hidden" animate="visible">
//         <motion.h1 className="text-3xl bg-[#19181A] p-5 py-10 sm:text-4xl font-bold text-[#CEBC81] mb-8 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, type: "spring" }}>
//           Tax & Duty Information Form
//         </motion.h1>
//         <form onSubmit={handleSubmit} className="space-y-6 p-4 sm:p-6">
//           <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants}>
//             <motion.div variants={itemVariants}>
//               <motion.label htmlFor="hsCode" className="block text-sm font-medium text-[#19181A] mb-1" variants={inputLabelVariants}>HS Code</motion.label>
//               <div className="relative">
//                 <motion.input ref={inputRefs.hsCode} type="text" id="hsCode" name="hsCode" value={formData.hsCode} onChange={handleHsCodeChange} onFocus={() => handleFocus('hsCode')} onBlur={handleInputBlur} placeholder="1234.5678" className={`block w-full p-3 border transition-all duration-300 ${focusedField === 'hsCode' ? 'border-[#19181A] shadow-sm outline-none rounded-none' : 'border-[#B19F9E] rounded-md hover:border-[#19181A]/70'}`} required />
//                 <AnimatePresence>{formData.hsCode && <motion.div className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#19181A] text-white text-xs px-2 py-1 rounded-full" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} transition={{ type: "spring", stiffness: 500 }}>{formData.hsCode.replace(/\D/g, '').length}/8</motion.div>}</AnimatePresence>
//               </div>
//               <motion.p className="text-xs text-[#B19F9E] mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Format: XXXX.XXXX</motion.p>
//             </motion.div>
//             <motion.div variants={itemVariants}>
//               <motion.label htmlFor="itemName" className="block text-sm font-medium text-[#19181A] mb-1" variants={inputLabelVariants}>Item Name</motion.label>
//               <div className="relative">
//                 <motion.input type="text" id="itemName" name="itemName" value={formData.itemName} onChange={handleTextChange} onFocus={() => handleFocus('itemName')} onBlur={handleBlur} placeholder="Enter item name" className={`block w-full p-3 border transition-all duration-300 ${focusedField === 'itemName' ? 'border-[#19181A] shadow-sm outline-none rounded-none' : 'border-[#B19F9E] rounded-md hover:border-[#19181A]/70'}`} maxLength={30} required />
//                 <AnimatePresence>{formData.itemName && <motion.div className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#19181A] text-white text-xs px-2 py-1 rounded-full" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}>{formData.itemName.length}/30</motion.div>}</AnimatePresence>
//               </div>
//               <motion.p className="text-xs text-[#B19F9E] mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Max 30 characters</motion.p>
//             </motion.div>
//             <motion.div variants={itemVariants}>
//               <motion.label htmlFor="unitOfMeasurement" className="block text-sm font-medium text-[#19181A] mb-1" variants={inputLabelVariants}>Unit of Measurement</motion.label>
//               <div className="relative" ref={dropdownRef}>
//                 <motion.div className={`flex items-center justify-between w-full p-3 border transition-all duration-300 cursor-pointer ${focusedField === 'unitOfMeasurement' || isDropdownOpen ? 'border-[#19181A] shadow-sm outline-none rounded-none' : 'border-[#B19F9E] rounded-md hover:border-[#19181A]/70'}`} onClick={() => setIsDropdownOpen(!isDropdownOpen)} onFocus={() => handleFocus('unitOfMeasurement')} onBlur={handleBlur} tabIndex={0}>
//                   <span className={formData.unitOfMeasurement ? 'text-[#19181A]' : 'text-[#B19F9E]'}>{formData.unitOfMeasurement || 'Select Unit'}</span>
//                   <motion.svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#B19F9E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" animate={{ rotate: isDropdownOpen ? 180 : 0, color: isDropdownOpen ? '#19181A' : '#B19F9E' }} transition={{ duration: 0.3 }}>
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </motion.svg>
//                 </motion.div>
//                 <AnimatePresence>
//                   {isDropdownOpen && (
//                     <motion.ul className="absolute z-10 w-full mt-1 bg-white border border-[#B19F9E] rounded-md shadow-md max-h-60 overflow-y-auto" variants={dropdownVariants} initial="hidden" animate="visible" exit="exit">
//                       {loadingUnits ? <li className="px-4 py-2 text-[#B19F9E]">Loading...</li> : error ? <li className="px-4 py-2 text-[#A16E83]">Error: {error}</li> :
//                         unitOptions.map((option) => (
//                           <motion.li key={option.id} className={`px-4 py-2 cursor-pointer transition duration-200 ease-in-out ${hoveredOption === option.id ? 'bg-[#CEBC81] text-[#19181A]' : 'text-[#19181A]'}`} onClick={() => handleUnitSelect(option)} onMouseEnter={() => setHoveredOption(option.id)} onMouseLeave={() => setHoveredOption(null)} whileHover={{ backgroundColor: "#CEBC81", color: "#19181A" }}>
//                             {option.unit} {/* Display name */}
//                           </motion.li>
//                         ))
//                       }
//                     </motion.ul>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </motion.div>
//             <motion.div variants={itemVariants}>
//               <motion.label htmlFor="assessableValue" className="block text-sm font-medium text-[#19181A] mb-1" variants={inputLabelVariants}>Assessable Value</motion.label>
//               <div className="relative">
//                 <motion.input ref={inputRefs.assessableValue} type="text" id="assessableValue" name="assessableValue" value={formData.assessableValue} onChange={handleAssessableValueChange} onFocus={() => handleFocus('assessableValue')} onBlur={handleInputBlur} placeholder="e.g., 0000.00" className={`block w-full p-3 border transition-all duration-300 ${focusedField === 'assessableValue' ? 'border-[#19181A] shadow-sm outline-none rounded-none' : 'border-[#B19F9E] rounded-md hover:border-[#19181A]/70'}`} required />
//               </div>
//               <motion.p className="text-xs text-[#B19F9E] mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Up to 6 digits and 4 decimal places</motion.p>
//             </motion.div>
//             {percentageFields.map((field) => (
//               <motion.div key={field.id} variants={itemVariants}>
//                 <motion.label htmlFor={field.id} className="block text-sm font-medium text-[#19181A] mb-1" variants={inputLabelVariants}>{field.label}</motion.label>
//                 <div className="relative">
//                   <motion.input ref={inputRefs[field.name]} type="text" id={field.id} name={field.name} value={formData[field.name]} onChange={handlePercentageChange} onFocus={() => handleFocus(field.name)} onBlur={handleInputBlur} placeholder={field.placeholder} className={`block text-right w-full p-3 border transition-all duration-300 ${focusedField === field.name ? 'border-[#19181A] shadow-sm outline-none rounded-none' : 'border-[#B19F9E] rounded-md hover:border-[#19181A]/70'}`} />
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//           <motion.div className="flex flex-col sm:flex-row justify-center gap-4 pt-6" variants={buttonVariants} initial="hidden" animate="visible">
//             <motion.button type="submit" className="px-10 py-4 bg-[#19181A] text-white font-bold rounded-lg shadow-md hover:bg-[#2e2c31] transition-colors duration-300 disabled:opacity-50" disabled={isSubmitting} whileHover="hover" whileTap="tap">
//               {isSubmitting ? 'Submitting...' : 'Submit'}
//             </motion.button>
//           </motion.div>
//         </form>
//       </motion.div>
//     </div>
//   );
// }







































// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// export default function DecimalInput() {
//   const [formData, setFormData] = useState({
//     hsCode: '',
//     itemName: '',
//     unitOfMeasurement: '',
//     uomCode: '',
//     assessableValue: '',
//     customDuty: '',
//     acd: '',
//     rd: '',
//     ftaCustomDuty: '',
//     salesTax: '',
//     additionalSalesTax: '',
//     furtherTax: '',
//     incomeTaxImport: '',
//     incomeTaxWithheld: ''
//   });

//   const [showUomManager, setShowUomManager] = useState(false);
//   const [unitOptions, setUnitOptions] = useState([]);
//   const [loadingUnits, setLoadingUnits] = useState(true);
//   const [error, setError] = useState(null);
//   const [focusedField, setFocusedField] = useState(null);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [hoveredOption, setHoveredOption] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const percentageFields = [
//     { id: 'customDuty', name: 'customDuty', label: 'Custom Duty (%)', placeholder: 'e.g., 000.00 %' },
//     { id: 'acd', name: 'acd', label: 'ACD (%)', placeholder: 'e.g., 000.00 %' },
//     { id: 'rd', name: 'rd', label: 'RD (%)', placeholder: 'e.g., 000.00 %' },
//     { id: 'ftaCustomDuty', name: 'ftaCustomDuty', label: 'FTA Custom Duty (%)', placeholder: 'e.g., 000.00 %' },
//     { id: 'salesTax', name: 'salesTax', label: 'Sales Tax (%)', placeholder: 'e.g., 000.00 %' },
//     { id: 'additionalSalesTax', name: 'additionalSalesTax', label: 'Additional Sales Tax (%)', placeholder: 'e.g., 000.00 %' },
//     { id: 'furtherTax', name: 'furtherTax', label: 'Further Tax (%)', placeholder: 'e.g., 000.00 %' },
//     { id: 'incomeTaxImport', name: 'incomeTaxImport', label: 'Income Tax Import (%)', placeholder: 'e.g., 000.00 %' },
//     { id: 'incomeTaxWithheld', name: 'incomeTaxWithheld', label: 'Income Tax Withheld (%)', placeholder: 'e.g., 000.00 %' }
//   ];

//   const inputRefs = {
//     hsCode: useRef(null),
//     assessableValue: useRef(null),
//     customDuty: useRef(null),
//     acd: useRef(null),
//     rd: useRef(null),
//     ftaCustomDuty: useRef(null),
//     salesTax: useRef(null),
//     additionalSalesTax: useRef(null),
//     furtherTax: useRef(null),
//     incomeTaxImport: useRef(null),
//     incomeTaxWithheld: useRef(null)
//   };

//   const dropdownRef = useRef(null);
//   const [cursorPositions, setCursorPositions] = useState({});

//   const fetchUnits = async () => {
//     try {
//       setLoadingUnits(true);
//       const response = await fetch('http://localhost:5000/api/v1/unit');
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const data = await response.json();
//       setUnitOptions(data);
//     } catch (err) {
//       setError(err.message);
//       console.error("Failed to fetch units:", err);
//     } finally {
//       setLoadingUnits(false);
//     }
//   };

//   useEffect(() => {
//     fetchUnits();
//   }, []);

//   const handleUomClose = () => {
//     setShowUomManager(false);
//     fetchUnits();
//   };

//   useEffect(() => {
//     Object.keys(cursorPositions).forEach(fieldName => {
//       const ref = inputRefs[fieldName];
//       if (ref?.current && cursorPositions[fieldName] !== undefined) {
//         ref.current.setSelectionRange(cursorPositions[fieldName], cursorPositions[fieldName]);
//       }
//     });
//   }, [cursorPositions, formData]);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsDropdownOpen(false);
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const resetForm = () => {
//     setFormData({
//       hsCode: '',
//       itemName: '',
//       unitOfMeasurement: '',
//       uomCode: '',
//       assessableValue: '',
//       customDuty: '',
//       acd: '',
//       rd: '',
//       ftaCustomDuty: '',
//       salesTax: '',
//       additionalSalesTax: '',
//       furtherTax: '',
//       incomeTaxImport: '',
//       incomeTaxWithheld: ''
//     });
//   };

//   const handleHsCodeChange = (e) => {
//     const input = e.target;
//     const value = input.value;
//     const cursorPos = input.selectionStart;
//     const prevValue = formData.hsCode;
//     const digits = value.replace(/[^\d]/g, '').substring(0, 8);
//     let formattedValue = digits;
//     if (digits.length > 4) formattedValue = `${digits.substring(0, 4)}.${digits.substring(4)}`;
//     let newCursorPos = cursorPos;
//     if (formattedValue.length !== value.length) {
//       if (formattedValue.length > value.length && cursorPos > 4) newCursorPos = cursorPos + 1;
//       else if (formattedValue.length < value.length && prevValue.includes('.') && !formattedValue.includes('.')) newCursorPos = cursorPos - 1;
//     }
//     setFormData({ ...formData, hsCode: formattedValue });
//     setCursorPositions({ ...cursorPositions, hsCode: newCursorPos });
//   };

//   const handleAssessableValueChange = (e) => {
//     const input = e.target;
//     const value = input.value;
//     const cursorPos = input.selectionStart;
//     if (!/^[0-9]*\.?[0-9]*$/.test(value) && value !== '') return;
//     let formattedValue = value;
//     let newCursorPos = cursorPos;
//     if (value.includes('.')) {
//       const parts = value.split('.');
//       const beforeDecimal = parts[0].substring(0, 6);
//       const afterDecimal = parts[1].substring(0, 4);
//       formattedValue = `${beforeDecimal}.${afterDecimal}`;
//       if (beforeDecimal.length < parts[0].length && cursorPos > beforeDecimal.length) newCursorPos = beforeDecimal.length;
//       else if (parts[1].length > 4 && cursorPos > beforeDecimal.length + 1 + 4) newCursorPos = beforeDecimal.length + 1 + 4;
//     } else if (value.length > 6) {
//       formattedValue = `${value.substring(0, 6)}.${value.substring(6, 10)}`;
//       if (cursorPos > 6) newCursorPos = cursorPos + 1;
//     }
//     setFormData({ ...formData, assessableValue: formattedValue });
//     setCursorPositions({ ...cursorPositions, assessableValue: newCursorPos });
//   };

//   const handlePercentageChange = (e) => {
//     const input = e.target;
//     const { name, value } = input;
//     const cursorPos = input.selectionStart;
//     const prevValue = formData[name] || '';
//     const cleanValue = value.replace(/[^\d.]/g, '');
//     const parts = cleanValue.split('.');
//     let formattedValue = parts[0] || '';
//     if (parts.length === 1 && formattedValue.length > 3) formattedValue = `${formattedValue.substring(0, 3)}.${formattedValue.substring(3, 5)}`;
//     else if (parts.length > 1) formattedValue = `${formattedValue}.${parts[1].substring(0, 2)}`;
//     let newCursorPos = cursorPos;
//     if (value.length !== formattedValue.length) {
//       if (formattedValue.includes('.') && !prevValue.includes('.') && cursorPos > 3) newCursorPos = cursorPos + 1;
//       else if (!formattedValue.includes('.') && prevValue.includes('.')) newCursorPos = cursorPos - 1;
//     }
//     setFormData({ ...formData, [name]: formattedValue });
//     setCursorPositions({ ...cursorPositions, [name]: newCursorPos });
//   };

//   const handleTextChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleUnitSelect = (unitObject) => {
//     setFormData({
//       ...formData,
//       unitOfMeasurement: unitObject.unit, // Display name
//       uomCode: unitObject.uomCode // Store code for DB
//     });
//     setIsDropdownOpen(false);
//     setHoveredOption(null);
//   };

//   const handleFocus = (fieldName) => setFocusedField(fieldName);
//   const handleBlur = () => setFocusedField(null);

//   const handleInputBlur = (e) => {
//     const { name, value } = e.target;
//     if (!value) {
//       handleBlur();
//       return;
//     }
//     let formattedValue = value;
//     const isPercentageField = percentageFields.some(field => field.name === name);
//     if (name === 'assessableValue' || isPercentageField) {
//       if (!value.includes('.')) formattedValue = `${value}.00`;
//       else {
//         const parts = value.split('.');
//         if (parts[1] === '') formattedValue = `${parts[0]}.00`;
//         else if (parts[1].length === 1) formattedValue = `${parts[0]}.${parts[1]}0`;
//       }
//     }
//     setFormData(prev => ({ ...prev, [name]: formattedValue }));
//     handleBlur();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.uomCode) {
//       alert('Please select a Unit of Measurement');
//       return;
//     }
//     setIsSubmitting(true);
//     try {
//       const dataToSend = {
//         ...formData,
//         assessableValue: parseFloat(formData.assessableValue) || 0,
//         customDuty: parseFloat(formData.customDuty) || 0,
//         acd: parseFloat(formData.acd) || 0,
//         rd: parseFloat(formData.rd) || 0,
//         ftaCustomDuty: parseFloat(formData.ftaCustomDuty) || 0,
//         salesTax: parseFloat(formData.salesTax) || 0,
//         additionalSalesTax: parseFloat(formData.additionalSalesTax) || 0,
//         furtherTax: parseFloat(formData.furtherTax) || 0,
//         incomeTaxImport: parseFloat(formData.incomeTaxImport) || 0,
//         incomeTaxWithheld: parseFloat(formData.incomeTaxWithheld) || 0
//       };
//       console.log("Submitting data:", dataToSend);
//       const response = await fetch('http://localhost:5000/api/v1/taxInfo', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(dataToSend),
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || `API request failed: ${response.status}`);
//       }
//       await response.json();
//       alert("Form submitted successfully!");
//       resetForm();
//     } catch (error) {
//       console.error("Error submitting form data:", error);
//       alert(`Failed to submit data: ${error.message}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.1 } } };
//   const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } } };
//   const buttonVariants = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { delay: 0.5, type: "spring" } }, hover: { scale: 1.05, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)", backgroundColor: "#3a918b", transition: { type: "spring", stiffness: 400, damping: 10 } }, tap: { scale: 0.95 } };
//   const inputLabelVariants = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } } };
//   const dropdownVariants = { hidden: { opacity: 0, height: 0, overflow: 'hidden' }, visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } }, exit: { opacity: 0, height: 0, transition: { duration: 0.2 } } };

//   return (
//     <div className="min-h-screen font-sans bg-[#C5C6C7]/20 flex items-center my-10 justify-center">
//       <motion.div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-lg" variants={containerVariants} initial="hidden" animate="visible">
//         <motion.h1 className="text-3xl bg-[#1F2833] p-5 py-10 sm:text-4xl font-bold text-[#C5C6C7] mb-8 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, type: "spring" }}>
//           Tax & Duty Information Form
//         </motion.h1>
//         <form onSubmit={handleSubmit} className="space-y-6 p-4 sm:p-6">
//           <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants}>
//             <motion.div variants={itemVariants}>
//               <motion.label htmlFor="hsCode" className="block text-sm font-medium text-[#1F2833] mb-1" variants={inputLabelVariants}>HS Code</motion.label>
//               <div className="relative">
//                 <motion.input ref={inputRefs.hsCode} type="text" id="hsCode" name="hsCode" value={formData.hsCode} onChange={handleHsCodeChange} onFocus={() => handleFocus('hsCode')} onBlur={handleInputBlur} placeholder="1234.5678" className={`block w-full p-3 border transition-all duration-300 ${focusedField === 'hsCode' ? 'border-[#45A29E] shadow-md outline-none rounded-md' : 'border-[#C5C6C7] rounded-md hover:border-[#45A29E]/70'}`} required />
//                 <AnimatePresence>{formData.hsCode && <motion.div className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#45A29E] text-white text-xs px-2 py-1 rounded-full" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} transition={{ type: "spring", stiffness: 500 }}>{formData.hsCode.replace(/\D/g, '').length}/8</motion.div>}</AnimatePresence>
//               </div>
//               <motion.p className="text-xs text-[#1F2833]/70 mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Format: XXXX.XXXX</motion.p>
//             </motion.div>
//             <motion.div variants={itemVariants}>
//               <motion.label htmlFor="itemName" className="block text-sm font-medium text-[#1F2833] mb-1" variants={inputLabelVariants}>Item Name</motion.label>
//               <div className="relative">
//                 <motion.input type="text" id="itemName" name="itemName" value={formData.itemName} onChange={handleTextChange} onFocus={() => handleFocus('itemName')} onBlur={handleBlur} placeholder="Enter item name" className={`block w-full p-3 border transition-all duration-300 ${focusedField === 'itemName' ? 'border-[#45A29E] shadow-md outline-none rounded-md' : 'border-[#C5C6C7] rounded-md hover:border-[#45A29E]/70'}`} maxLength={30} required />
//                 <AnimatePresence>{formData.itemName && <motion.div className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#45A29E] text-white text-xs px-2 py-1 rounded-full" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}>{formData.itemName.length}/30</motion.div>}</AnimatePresence>
//               </div>
//               <motion.p className="text-xs text-[#1F2833]/70 mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Max 30 characters</motion.p>
//             </motion.div>
//             <motion.div variants={itemVariants}>
//               <motion.label htmlFor="unitOfMeasurement" className="block text-sm font-medium text-[#1F2833] mb-1" variants={inputLabelVariants}>Unit of Measurement</motion.label>
//               <div className="relative" ref={dropdownRef}>
//                 <motion.div className={`flex items-center justify-between w-full p-3 border transition-all duration-300 cursor-pointer ${focusedField === 'unitOfMeasurement' || isDropdownOpen ? 'border-[#45A29E] shadow-md outline-none rounded-md' : 'border-[#C5C6C7] rounded-md hover:border-[#45A29E]/70'}`} onClick={() => setIsDropdownOpen(!isDropdownOpen)} onFocus={() => handleFocus('unitOfMeasurement')} onBlur={handleBlur} tabIndex={0}>
//                   <span className={formData.unitOfMeasurement ? 'text-[#1F2833]' : 'text-[#1F2833]/50'}>{formData.unitOfMeasurement || 'Select Unit'}</span>
//                   <motion.svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#C5C6C7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" animate={{ rotate: isDropdownOpen ? 180 : 0, color: isDropdownOpen ? '#45A29E' : '#C5C6C7' }} transition={{ duration: 0.3 }}>
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </motion.svg>
//                 </motion.div>
//                 <AnimatePresence>
//                   {isDropdownOpen && (
//                     <motion.ul className="absolute z-10 w-full mt-1 bg-white border border-[#C5C6C7] rounded-md shadow-lg max-h-60 overflow-y-auto" variants={dropdownVariants} initial="hidden" animate="visible" exit="exit">
//                       {loadingUnits ? <li className="px-4 py-2 text-[#1F2833]/50">Loading...</li> : error ? <li className="px-4 py-2 text-red-500">Error: {error}</li> :
//                         unitOptions.map((option) => (
//                           <motion.li key={option.id} className={`px-4 py-2 cursor-pointer transition duration-200 ease-in-out ${hoveredOption === option.id ? 'bg-[#45A29E] text-white' : 'text-[#1F2833]'}`} onClick={() => handleUnitSelect(option)} onMouseEnter={() => setHoveredOption(option.id)} onMouseLeave={() => setHoveredOption(null)} whileHover={{ backgroundColor: "#45A29E", color: "white" }}>
//                             {option.unit} {/* Display name */}
//                           </motion.li>
//                         ))
//                       }
//                     </motion.ul>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </motion.div>
//             <motion.div variants={itemVariants}>
//               <motion.label htmlFor="assessableValue" className="block text-sm font-medium text-[#1F2833] mb-1" variants={inputLabelVariants}>Assessable Value</motion.label>
//               <div className="relative">
//                 <motion.input ref={inputRefs.assessableValue} type="text" id="assessableValue" name="assessableValue" value={formData.assessableValue} onChange={handleAssessableValueChange} onFocus={() => handleFocus('assessableValue')} onBlur={handleInputBlur} placeholder="e.g., 0000.00" className={`block w-full p-3 border transition-all duration-300 ${focusedField === 'assessableValue' ? 'border-[#45A29E] shadow-md outline-none rounded-md' : 'border-[#C5C6C7] rounded-md hover:border-[#45A29E]/70'}`} required />
//               </div>
//               <motion.p className="text-xs text-[#1F2833]/70 mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Up to 6 digits and 4 decimal places</motion.p>
//             </motion.div>
//             {percentageFields.map((field) => (
//               <motion.div key={field.id} variants={itemVariants}>
//                 <motion.label htmlFor={field.id} className="block text-sm font-medium text-[#1F2833] mb-1" variants={inputLabelVariants}>{field.label}</motion.label>
//                 <div className="relative">
//                   <motion.input ref={inputRefs[field.name]} type="text" id={field.id} name={field.name} value={formData[field.name]} onChange={handlePercentageChange} onFocus={() => handleFocus(field.name)} onBlur={handleInputBlur} placeholder={field.placeholder} className={`block text-right w-full p-3 border transition-all duration-300 ${focusedField === field.name ? 'border-[#45A29E] shadow-md outline-none rounded-md' : 'border-[#C5C6C7] rounded-md hover:border-[#45A29E]/70'}`} />
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//           <motion.div className="flex flex-col sm:flex-row justify-center gap-4 pt-6" variants={buttonVariants} initial="hidden" animate="visible">
//             <motion.button type="submit" className="px-10 py-4 bg-[#45A29E] text-white font-bold rounded-lg shadow-md hover:bg-[#3a918b] transition-colors duration-300 disabled:opacity-50" disabled={isSubmitting} whileHover="hover" whileTap="tap">
//               {isSubmitting ? 'Submitting...' : 'Submit'}
//             </motion.button>
//           </motion.div>
//         </form>
//       </motion.div>
//     </div>
//   );
// }
