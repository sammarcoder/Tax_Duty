// // src/components/ItemSelector.jsx
// import React, { useState } from 'react';
// import { 
//   Paper, 
//   Typography, 
//   TextField, 
//   List, 
//   ListItem, 
//   ListItemText, 
//   ListItemSecondaryAction, 
//   IconButton,
//   CircularProgress,
//   Box
// } from '@mui/material';
// import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';

// const ItemSelector = ({ taxItems, loading, onItemSelect }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredItems = taxItems.filter(item => 
//     item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.hsCode.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Paper elevation={2} sx={{ p: 2 }}>
//       <Typography variant="h6" gutterBottom>
//         Select an Item
//       </Typography>

//       <TextField
//         fullWidth
//         label="Search Items"
//         variant="outlined"
//         margin="normal"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         InputProps={{
//           startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
//         }}
//       />

//       {loading ? (
//         <Box display="flex" justifyContent="center" p={3}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <List sx={{ maxHeight: '300px', overflow: 'auto' }}>
//           {filteredItems.length > 0 ? (
//             filteredItems.map(item => (
//               <ListItem key={item.id} divider>
//                 <ListItemText 
//                   primary={item.itemName} 
//                   secondary={`HS Code: ${item.hsCode} | Value: ${item.assessableValue}`} 
//                 />
//                 <ListItemSecondaryAction>
//                   <IconButton edge="end" onClick={() => onItemSelect(item)}>
//                     <AddIcon />
//                   </IconButton>
//                 </ListItemSecondaryAction>
//               </ListItem>
//             ))
//           ) : (
//             <ListItem>
//               <ListItemText primary="No items found" />
//             </ListItem>
//           )}
//         </List>
//       )}
//     </Paper>
//   );
// };

// export default ItemSelector;






















































// import React, { useState } from 'react';

// const ItemSelector = ({ taxItems, onItemSelect }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredItems = taxItems.filter(item =>
//     item.itemName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.hsCode?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className=' '>
//       <div className="mb-6  mx-auto">
//         <h1 className='text-white text-3xl mb-4'>Search the item</h1>
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Search items by name or HS code..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full px-3 py-2 text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>

//         <div className="border rounded-md overflow-hidden">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Item Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   HS Code
//                 </th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Base Value
//                 </th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredItems.length === 0 ? (
//                 <tr>
//                   <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
//                     No items found matching your search.
//                   </td>
//                 </tr>
//               ) : (
//                 filteredItems.map(item => (
//                   <tr key={item.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {item.itemName}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {item.hsCode}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
//                       {parseFloat(item.assessableValue || 0).toFixed(2)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <button
//                         onClick={() => onItemSelect(item)}
//                         className="text-blue-600 hover:text-blue-900 focus:outline-none focus:underline"
//                       >
//                         Select
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>

//   );
// };

// export default ItemSelector;





























































// ItemSelector.jsx
import React, { useState } from 'react';

const ItemSelector = ({ taxItems, onItemSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = taxItems.filter(item =>
    item.itemName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.hsCode?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white">
      <div className="mb-6">
        <div className="mb-4">
          <label htmlFor="search-items" className="block text-sm font-medium text-gray-700 mb-1">
            Search Items
          </label>
          <div className="relative">
            <input
              id="search-items"
              type="text"
              placeholder="Search by name or HS code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4a6fa5] focus:border-[#4a6fa5]"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-[#4a6fa5] text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Item Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  HS Code
                </th>
                {/* <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                  Base Value
                </th> */}
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center">
                    <div className="flex flex-col items-center">
                      <svg className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-lg font-medium text-gray-700">No items found</p>
                      <p className="text-sm text-gray-500 mt-1">Try adjusting your search</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredItems.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.itemName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-mono">
                        {item.hsCode}
                      </code>
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm text-gray-500">
                        {parseFloat(item.assessableValue || 0).toFixed(2)}
                      </div>
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => onItemSelect(item)}
                        className="inline-flex items-center px-3 py-1.5 border border-[#4a6fa5] text-sm font-medium rounded-md text-[#4a6fa5] bg-white hover:bg-[#4a6fa5] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4a6fa5]"
                      >
                        <svg className="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                        Select
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItemSelector;
