// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/v1';

// const FilesList = () => {
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`${API_URL}/fileheaders`);
//         setFiles(response.data);
//       } catch (err) {
//         console.error('Error fetching files:', err);
//         setError('Failed to load files. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFiles();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${API_URL}/fileheaders/${id}`);
//       setFiles(files.filter(file => file.id !== id));
//       setShowDeleteConfirm(null);
//     } catch (err) {
//       console.error('Error deleting file:', err);
//       alert('Failed to delete file. Please try again.');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 bg-red-100 text-red-700 rounded-md">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-3xl font-medium text-[#4a6fa5]">Files</h1>
//           <p className='text-[14px] text-gray-700'>Manage your files </p>
//         </div>

//         <Link
//           to="/files/new"
//           className="bg-[#4a6fa5] hover:bg-blue-700 text-white py-2 px-4 rounded"
//         >
//           Create New File
//         </Link>
//       </div>

//       {files.length === 0 ? (
//         <div className="bg-white shadow-md rounded-lg p-8 text-center">
//           <p className="text-gray-500 mb-4">No files found.</p>
//           <Link
//             to="/files/new"
//             className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
//           >
//             Create Your First File
//           </Link>
//         </div>
//       ) : (
//         <div className="bg-white shadow-md rounded-lg overflow-hidden">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   File Number
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Currency
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Exchange Rate
//                 </th>
//                 <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   1.1
//                 </th>
//                 {/* <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Items Count
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Created
//                 </th> */}
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {files.map(file => (
//                 <tr key={file.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="font-medium text-gray-900">{file.fileNumber}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">{file.currency}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">{file.exchangeRate}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-center">
//                     <div className="text-sm text-gray-900">{file.valueAdditionRate}%</div>
//                   </td>
//                   {/* <td className="px-6 py-4 whitespace-nowrap text-center">
//                     <div className="text-sm text-gray-900">{file.itemCount || 0}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">
//                       {new Date(file.createdAt).toLocaleDateString()}
//                     </div>
//                   </td> */}
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <div className="flex justify-end space-x-2">
//                       <Link to={`/files/${file.id}/view`} className="text-blue-600 hover:text-blue-900">
//                         View
//                       </Link>
//                       <Link to={`/files/${file.id}/edit`} className="text-green-600 hover:text-green-900">
//                         Edit
//                       </Link>
//                       <button
//                         onClick={() => setShowDeleteConfirm(file.id)}
//                         className="text-red-600 hover:text-red-900"
//                       >
//                         Delete
//                       </button>
//                     </div>

//                     {showDeleteConfirm === file.id && (
//                       <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 p-2">
//                         <p className="text-sm mb-2">Delete this file?</p>
//                         <div className="flex justify-between">
//                           <button
//                             onClick={() => setShowDeleteConfirm(null)}
//                             className="px-2 py-1 text-xs bg-gray-200 rounded"
//                           >
//                             Cancel
//                           </button>
//                           <button
//                             onClick={() => handleDelete(file.id)}
//                             className="px-2 py-1 text-xs bg-red-500 text-white rounded"
//                           >
//                             Confirm
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FilesList;










































import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/v1';
const API_URL = '/api/v1';

const FilesList = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFiles, setFilteredFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/fileheaders`);
        setFiles(response.data);
        setFilteredFiles(response.data);
      } catch (err) {
        console.error('Error fetching files:', err);
        setError('Failed to load files. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  // Filter files when search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredFiles(files);
    } else {
      const filtered = files.filter(file => 
        (file.fileName && file.fileName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        file.fileNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (file.currency && file.currency.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredFiles(filtered);
    }
  }, [searchTerm, files]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/fileheaders/${id}`);
      setFiles(files.filter(file => file.id !== id));
      setFilteredFiles(filteredFiles.filter(file => file.id !== id));
      setShowDeleteConfirm(null);
    } catch (err) {
      console.error('Error deleting file:', err);
      alert('Failed to delete file. Please try again.');
    }
  };

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

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  if (loading) {
    return (
      <div className="p-6 bg-[#f8f9fa] min-h-screen">
        <div className="max-w-6xl mx-auto p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center p-12"
          >
            <svg
              className="animate-spin h-12 w-12 text-[#4a6fa5] mb-4"
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
            <p className="text-[#4a6fa5] text-lg font-medium">Loading files...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-[#f8f9fa] min-h-screen">
        <div className="max-w-6xl mx-auto p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 p-4 rounded-md border border-red-200"
          >
            <div className="flex items-center">
              <svg className="h-6 w-6 text-red-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 bg-white text-red-700 border border-red-300 hover:bg-red-50 px-4 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#f8f9fa] min-h-screen">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header with title, subtitle and border-b - exactly like UomTable */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 border-b border-gray-200 pb-4"
        >
          <h2 className="text-3xl font-semibold text-[#4a6fa5] mb-2">Files</h2>
          <p className="text-gray-600">Manage your files</p>
        </motion.div>

        {/* Search and action buttons in one row - EXACTLY like UomTable */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div className="relative w-full md:w-[300px]">
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
          <Link to="/files/new">
            <motion.button
              className="bg-[#4a6fa5] text-white py-2 px-4 rounded-md font-medium flex items-center hover:bg-[#5a85c0] transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Create New File
            </motion.button>
          </Link>
        </motion.div>

        {filteredFiles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow-md rounded-lg p-8 text-center"
          >
            <div className="flex flex-col items-center">
              <svg className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg font-medium text-gray-700 mb-4">
                {searchTerm ? "No matching files found" : "No files found"}
              </p>
              {!searchTerm && (
                <Link
                  to="/files/new"
                  className="bg-[#4a6fa5] hover:bg-[#5a85c0] text-white py-2 px-4 rounded-md transition-colors"
                >
                  Create Your First File
                </Link>
              )}
              {searchTerm && (
                <p className="text-sm text-gray-400 mt-1">Try adjusting your search</p>
              )}
            </div>
          </motion.div>
        ) : (
          <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#4a6fa5]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    File Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    File Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Currency
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Exchange Rate
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                    Value Addition Rate
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {filteredFiles.map((file, index) => (
                    <motion.tr
                      key={file.id}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={itemVariants}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {file.fileName || `File ${index + 1}`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{file.fileNumber}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <code className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-mono">
                          {file.currency}
                        </code>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{file.exchangeRate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {file.valueAdditionRate}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex justify-center space-x-2">
                          <Link 
                            to={`/files/${file.id}/view`}
                            className="text-[#4a6fa5] hover:text-[#5a85c0]  bg-white px-2 py-1 font-medium rounded-md inline-flex items-center"
                          >
                            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View
                          </Link>
                          <Link 
                            to={`/files/${file.id}/edit`}
                            className="text-[#4a6fa5] hover:text-[#5a85c0]  bg-white px-2 py-1 rounded-md font-medium inline-flex items-center"
                          >
                            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            Edit
                          </Link>
                          <button
                            onClick={() => setShowDeleteConfirm(file.id)}
                            className="text-red-600 hover:text-red-800 font-medium bg-white px-2 py-1 rounded-md  inline-flex items-center"
                          >
                            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4"
            >
              <div className="border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <svg className="h-6 w-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Delete File
                </h3>
              </div>

              <div className="px-6 py-4">
                <p className="text-gray-700">
                  Are you sure you want to delete this file? This action cannot be undone.
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
                        File Number: <span className="font-bold">{files.find(f => f.id === showDeleteConfirm)?.fileNumber}</span>
                        <br />
                        File Name: <span className="font-bold">{files.find(f => f.id === showDeleteConfirm)?.fileName || 'Unnamed File'}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="px-4 py-2 bg-red-600 border border-transparent rounded-lg text-white hover:bg-red-700 flex items-center"
                >
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete File
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilesList;
