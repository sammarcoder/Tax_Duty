// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import DecimalInput from './assets/components/DecimalInput';

// function App() {

//   return (
//     <>
//       <div className="mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
//          <DecimalInput/>
//       </div>
//     </>
//   )
// }

// export default App































// // src/App.js
// import React from 'react';
// import { Routes, Route, Link } from 'react-router-dom';
// import DecimalInput from './assets/components/DecimalInput';
// import Uom from './assets/components/Uom';
// import './App.css'
// import Home from './assets/components/Home';
// import UomTable from './assets/components/UomTable';
// import TaxInfoTable from './assets/components/TaxInfoTable';
// import Header from './assets/components/Header';
// import Sidebar from './assets/components/Sidebar';
// // import FileDetailPage from './assets/FileDetail/FileDetailPage';
// import { useLocation } from 'react-router-dom';

// import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
// import { SnackbarProvider } from 'notistack';
// import FileHeaderForm from './assets/FIleHeader/FileHeaderForm';


// function App() {
//   const location = useLocation();
//   const isHomePage = location.pathname === '/';

//   return (
//     <div className={`${isHomePage ? '' : 'flex'} min-h-screen`}>
//       {/* Conditionally render the sidebar */}
//       {!isHomePage && (
//         <div className="flex-shrink-0">
//           <Sidebar />
//         </div>
//       )}

//       {/* Main content area - auto-adjusts width */}
//       <div className={`${isHomePage ? 'w-full' : 'flex-grow'}`}>
//         <Routes>
//           <Route path="/items" element={<DecimalInput />} />
//           <Route path="/uom" element={<Uom />} />
//           <Route path="/" element={<Home />} />
//           <Route path="/uom-table" element={<UomTable />} />
//           <Route path="/tax-table" element={<TaxInfoTable />} />
//           <Route path="/file-details" element={<FileHeaderForm />} />
         
//         </Routes>
//       </div>
//     </div>
//   );
// }

// export default App;





















// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DecimalInput from './assets/components/DecimalInput';
import Uom from './assets/components/Uom';
import './App.css'
import Home from './assets/components/Home';
import UomTable from './assets/components/UomTable';
import TaxInfoTable from './assets/components/TaxInfoTable';
import Sidebar from './assets/components/Sidebar';
import { useLocation } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

// Import file management components
import FileHeaderForm from './assets/FileHeader/FileHeaderForm';
import FilesList from './assets/FileHeader/FilesList';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <div className={`${isHomePage ? '' : 'flex'} min-h-screen bg-[#FAF9F9]`}>
        {/* Conditionally render the sidebar */}
        {!isHomePage && (
          <div className="flex-shrink-0">
            <Sidebar />
          </div>
        )}

        {/* Main content area - auto-adjusts width */}
        <div className={`${isHomePage ? 'w-full' : 'flex-grow'}`}>
          <Routes>
            {/* Original routes */}
            <Route path="/items" element={<DecimalInput />} />
            <Route path="/uom" element={<Uom />} />
            <Route path="/" element={<Home />} />
            <Route path="/uom-table" element={<UomTable />} />
            <Route path="/tax-table" element={<TaxInfoTable />} />
            <Route path="/file-details" element={<FileHeaderForm />} />
            
            {/* New file management routes */}
            <Route path="/files" element={<FilesList />} />
            <Route path="/files/new" element={<FileHeaderForm />} />
            <Route path="/files/:id/edit" element={<FileHeaderForm />} />
            <Route path="/files/:id/view" element={<FileHeaderForm readOnly={true} />} />
          </Routes>
        </div>
      </div>
    </SnackbarProvider>
  );
}

export default App;
