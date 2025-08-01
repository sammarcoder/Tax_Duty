// import React, { useState, useEffect } from 'react';
// import FileDetailForm from './FileDetailForm';
// import FileDetailList from './FileDetailList';
// import FileDetailView from './FileDetailView';

// const FileDetailPage = () => {
//   const [fileDetails, setFileDetails] = useState([]);
//   const [selectedFileDetail, setSelectedFileDetail] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [view, setView] = useState('list'); // list, view, create, edit

//   useEffect(() => {
//     fetchFileDetails();
//   }, []);

//   const fetchFileDetails = async () => {
//     try {
//       setIsLoading(true);
//       const response = await fetch('http://localhost:5000/api/v1/file-details');
//       if (!response.ok) throw new Error('Failed to fetch file details');

//       const data = await response.json();
//       setFileDetails(data);
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSelectFileDetail = async (id) => {
//     try {
//       setIsLoading(true);
//       const response = await fetch(`http://localhost:5000/api/v1/file-details/${id}`);
//       if (!response.ok) throw new Error('Failed to fetch file detail');

//       const data = await response.json();
//       setSelectedFileDetail(data);
//       setView('view');
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCreateFileDetail = () => {
//     setSelectedFileDetail(null);
//     setView('create');
//   };

//   const handleEditFileDetail = () => {
//     setView('edit');
//   };

//   const handleDeleteFileDetail = async (id) => {
//     if (window.confirm('Are you sure you want to delete this file detail?')) {
//       try {
//         const response = await fetch(`http://localhost:5000/api/v1/file-details/${id}`, {
//           method: 'DELETE'
//         });

//         if (!response.ok) throw new Error('Failed to delete file detail');

//         await fetchFileDetails();
//         setSelectedFileDetail(null);
//         setView('list');
//       } catch (err) {
//         setError(err.message);
//       }
//     }
//   };

//   const handleFormSubmit = async (formData, isEdit) => {
//     try {
//       let url = 'http://localhost:5000/api/v1/file-details';
//       let method = 'POST';

//       if (isEdit) {
//         url = `http://localhost:5000/api/v1/file-details/${selectedFileDetail.fileDetail.id}`;
//         method = 'PUT';
//       }

//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });

//       if (!response.ok) throw new Error(`Failed to ${isEdit ? 'update' : 'create'} file detail`);

//       await fetchFileDetails();

//       if (isEdit) {
//         // Refetch the updated detail
//         await handleSelectFileDetail(selectedFileDetail.fileDetail.id);
//       } else {
//         setView('list');
//       }
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className='max-w-[1200px] flex flex-col gap-4 mx-auto mt-5'>
//       <h1>File Detail Management</h1>

//       {error && <div>Error: {error}</div>}

//       <div >
//         {view === 'list' && (
//           <div className='mb-3'>
//             <button onClick={handleCreateFileDetail}>Create New File Detail</button>
//             {isLoading ? (
//               <div>Loading...</div>
//             ) : (
//               <FileDetailList 
//                 fileDetails={fileDetails} 
//                 onSelect={handleSelectFileDetail} 
//               />
//             )}
//           </div>
//         )}

//         {view === 'view' && selectedFileDetail && (
//           <FileDetailView 
//             fileDetail={selectedFileDetail}
//             onEdit={handleEditFileDetail}
//             onDelete={() => handleDeleteFileDetail(selectedFileDetail.fileDetail.id)}
//             onBack={() => setView('list')}
//           />
//         )}

//         {(view === 'create' || view === 'edit') && (
//           <FileDetailForm 
//             fileDetail={view === 'edit' ? selectedFileDetail : null}
//             onSubmit={(formData) => handleFormSubmit(formData, view === 'edit')}
//             onCancel={() => view === 'edit' ? setView('view') : setView('list')}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default FileDetailPage;
































import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Add animation library
import FileDetailForm from './FileDetailForm';
import FileDetailList from './FileDetailList';
import FileDetailView from './FileDetailView';

const FileDetailPage = () => {

  const [fileDetails, setFileDetails] = useState([]);
  const [selectedFileDetail, setSelectedFileDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('list'); // list, view, create, edit

  useEffect(() => {
    fetchFileDetails();
  }, []);

  const fetchFileDetails = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/v1/file-details');
      if (!response.ok) throw new Error('Failed to fetch file details');

      const data = await response.json();
      setFileDetails(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectFileDetail = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/api/v1/file-details/${id}`);
      if (!response.ok) throw new Error('Failed to fetch file detail');

      const data = await response.json();
      setSelectedFileDetail(data);
      setView('view');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateFileDetail = () => {
    setSelectedFileDetail(null);
    setView('create');
  };

  const handleEditFileDetail = () => {
    setView('edit');
  };

  const handleDeleteFileDetail = async (id) => {
    if (window.confirm('Are you sure you want to delete this file detail?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/file-details/${id}`, {
          method: 'DELETE'
        });

        if (!response.ok) throw new Error('Failed to delete file detail');

        await fetchFileDetails();
        setSelectedFileDetail(null);
        setView('list');
      } catch (err) {
        setError(err.message);
      }
    }
  }; 

  const handleFormSubmit = async (formData, isEdit) => {
    try {
      let url = 'http://localhost:5000/api/v1/file-details';
      let method = 'POST';

      if (isEdit) {
        url = `http://localhost:5000/api/v1/file-details/${selectedFileDetail.fileDetail.id}`;
        method = 'PUT';
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error(`Failed to ${isEdit ? 'update' : 'create'} file detail`);

      await fetchFileDetails();

      if (isEdit) {
        // Refetch the updated detail
        await handleSelectFileDetail(selectedFileDetail.fileDetail.id);
      } else {
        setView('list');
      }
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header with Search */}
        <div className="flex justify-between mb-6 items-center">
          <h1 className="text-2xl font-bold">File Detail Management</h1>
          {view === 'list' && (
            <div className="flex space-x-4 items-center">
              <input
                type="text"
                placeholder="Search files..."
                className="px-4 py-2 border rounded-md"
              // Add search functionality if needed
              />
              <button
                onClick={handleCreateFileDetail}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Create New File Detail
              </button>
            </div>
          )}
        </div>

        {/* Error notification */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-100 text-red-800">
            <p>Error: {error}</p>
          </div>
        )}

        {/* Main content area */}
        <AnimatePresence mode="wait">
          {view === 'list' && (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              {isLoading ? (
                <div className="flex justify-center p-12">
                  <p className="text-gray-500">Loading...</p>
                </div>
              ) : (
                <FileDetailList
                  fileDetails={fileDetails}
                  onSelect={handleSelectFileDetail}
                />
              )}
            </motion.div>
          )}

          {view === 'view' && selectedFileDetail && (
            <motion.div
              key="view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <FileDetailView
                fileDetail={selectedFileDetail}
                onEdit={handleEditFileDetail}
                onDelete={() => handleDeleteFileDetail(selectedFileDetail.fileDetail.id)}
                onBack={() => setView('list')}
              />
            </motion.div>
          )}

          {(view === 'create' || view === 'edit') && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <FileDetailForm
                fileDetail={view === 'edit' ? selectedFileDetail : null}
                onSubmit={(formData) => handleFormSubmit(formData, view === 'edit')}
                onCancel={() => view === 'edit' ? setView('view') : setView('list')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FileDetailPage;
