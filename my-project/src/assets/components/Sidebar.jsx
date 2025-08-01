// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';

// const Sidebar = () => {
//     // State for permanent expansion (via toggle button)
//     const [isPermanentlyExpanded, setIsPermanentlyExpanded] = useState(false);
//     // State for hover expansion
//     const [isHovered, setIsHovered] = useState(false);
//     // State for mobile menu visibility
//     const [isMobileOpen, setIsMobileOpen] = useState(false);
//     const location = useLocation();

//     // Combined state - sidebar is expanded if either permanently expanded or hovered
//     const isExpanded = isPermanentlyExpanded || isHovered;

//     // Close mobile menu when route changes
//     useEffect(() => {
//         setIsMobileOpen(false);
//     }, [location.pathname]);

//     const navItems = [
//         { path: '/', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
//         { path: '/items', label: 'Add Tax & Duty', icon: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z' },
//         { path: '/uom', label: 'Add Unit', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
//         { path: '/uom-table', label: 'View UOMT', icon: 'M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
//         { path: '/tax-table', label: 'View Tax Info', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
//     ];

//     return (
//         <>
//             {/* Mobile sidebar toggle button */}
//             <div className="fixed top-4 left-4 z-50 md:hidden">
//                 <button
//                     onClick={() => setIsMobileOpen(!isMobileOpen)}
//                     className="inline-flex items-center justify-center p-2 rounded-md bg-[#061525] text-white shadow-lg hover:bg-[#0c2542] focus:outline-none"
//                     aria-label="Toggle mobile menu"
//                 >
//                     <svg
//                         className="h-6 w-6"
//                         stroke="currentColor"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                     >
//                         {isMobileOpen ? (
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                         ) : (
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                         )}
//                     </svg>
//                 </button>
//             </div>

//             {/* Desktop Sidebar */}
//             <motion.aside
//                 className="hidden md:block fixed top-0 left-0 h-full bg-[#061525] text-white shadow-lg z-40 overflow-hidden"
//                 animate={{ width: isExpanded ? '240px' : '72px' }}
//                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//             >
//                 <div className="flex flex-col h-full">
//                     {/* Logo/Brand and Toggle Button */}
//                     <div className="flex items-center justify-between h-16 px-4 border-b border-blue-900">
//                         <Link to="/" className="flex items-center space-x-3">
//                             <motion.svg
//                                 whileHover={{ rotate: 10 }}
//                                 className="h-8 w-8 text-blue-400 flex-shrink-0"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
//                             </motion.svg>
//                             <AnimatePresence>
//                                 {isExpanded && (
//                                     <motion.span
//                                         className="font-bold text-xl whitespace-nowrap"
//                                         initial={{ opacity: 0, width: 0 }}
//                                         animate={{ opacity: 1, width: 'auto' }}
//                                         exit={{ opacity: 0, width: 0 }}
//                                         transition={{ duration: 0.2 }}
//                                     >
//                                         TaxDuty
//                                     </motion.span>
//                                 )}
//                             </AnimatePresence>
//                         </Link>

//                         {/* Toggle button */}
//                         <button
//                             onClick={() => setIsPermanentlyExpanded(!isPermanentlyExpanded)}
//                             className="p-1 rounded-full hover:bg-[#0c2542] focus:outline-none"
//                             aria-label="Toggle sidebar"
//                         >
//                             <svg
//                                 className="h-5 w-5 text-blue-400"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d={isPermanentlyExpanded ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
//                                 />
//                             </svg>
//                         </button>
//                     </div>

//                     {/* Navigation Links */}
//                     <nav className="flex-1 px-2 py-4 space-y-1">
//                         {navItems.map((item) => (
//                             <Link
//                                 key={item.path}
//                                 to={item.path}
//                                 className={`flex items-center px-2 py-2 rounded-md text-sm font-medium group transition-all duration-200
//                                     ${location.pathname === item.path
//                                         ? "bg-blue-800 text-white"
//                                         : "text-gray-200 hover:bg-[#0c2542] hover:text-white"
//                                     }`}
//                             >
//                                 <svg
//                                     className="h-6 w-6 flex-shrink-0"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     viewBox="0 0 24 24"
//                                     strokeWidth="1.5"
//                                 >
//                                     <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
//                                 </svg>
//                                 <AnimatePresence>
//                                     {isExpanded && (
//                                         <motion.span
//                                             className="ml-3 whitespace-nowrap"
//                                             initial={{ opacity: 0, width: 0 }}
//                                             animate={{ opacity: 1, width: 'auto' }}
//                                             exit={{ opacity: 0, width: 0 }}
//                                             transition={{ duration: 0.2 }}
//                                         >
//                                             {item.label}
//                                         </motion.span>
//                                     )}
//                                 </AnimatePresence>
                                
//                                 {/* Active indicator */}
//                                 {location.pathname === item.path && (
//                                     <motion.span
//                                         layoutId="activeTab"
//                                         className="absolute right-0 w-1 h-8 bg-blue-400 rounded-l-md"
//                                     />
//                                 )}
//                             </Link>
//                         ))}
//                     </nav>
//                 </div>
//             </motion.aside>

//             {/* Mobile Sidebar */}
//             <AnimatePresence>
//                 {isMobileOpen && (
//                     <>
//                         {/* Backdrop */}
//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 0.5 }}
//                             exit={{ opacity: 0 }}
//                             className="md:hidden fixed inset-0 bg-black z-30"
//                             onClick={() => setIsMobileOpen(false)}
//                         />
                        
//                         {/* Mobile Sidebar Panel */}
//                         <motion.aside
//                             initial={{ x: '-100%' }}
//                             animate={{ x: 0 }}
//                             exit={{ x: '-100%' }}
//                             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                             className="md:hidden fixed top-0 left-0 h-full w-64 bg-[#061525] text-white shadow-lg z-40"
//                         >
//                             <div className="flex flex-col h-full">
//                                 {/* Logo/Brand */}
//                                 <div className="flex items-center justify-between h-16 px-4 border-b border-blue-900">
//                                     <Link to="/" className="flex items-center space-x-3" onClick={() => setIsMobileOpen(false)}>
//                                         <motion.svg
//                                             whileHover={{ rotate: 10 }}
//                                             className="h-8 w-8 text-blue-400"
//                                             viewBox="0 0 24 24"
//                                             fill="none"
//                                             stroke="currentColor"
//                                             strokeWidth="2"
//                                         >
//                                             <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
//                                         </motion.svg>
//                                         <span className="font-bold text-xl">TaxDuty</span>
//                                     </Link>
                                    
//                                     {/* Close button */}
//                                     <button
//                                         onClick={() => setIsMobileOpen(false)}
//                                         className="p-2 rounded-md hover:bg-[#0c2542] focus:outline-none"
//                                     >
//                                         <svg
//                                             className="h-6 w-6"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke="currentColor"
//                                         >
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                         </svg>
//                                     </button>
//                                 </div>
                                
//                                 {/* Navigation Links */}
//                                 <nav className="flex-1 px-2 py-4 space-y-1">
//                                     {navItems.map((item) => (
//                                         <Link
//                                             key={item.path}
//                                             to={item.path}
//                                             onClick={() => setIsMobileOpen(false)}
//                                             className={`flex items-center px-4 py-2 rounded-md text-base font-medium transition-colors
//                                                 ${location.pathname === item.path
//                                                     ? "bg-blue-800 text-white"
//                                                     : "text-gray-200 hover:bg-[#0c2542] hover:text-white"
//                                                 }`}
//                                         >
//                                             <svg
//                                                 className="h-6 w-6 mr-3"
//                                                 fill="none"
//                                                 stroke="currentColor"
//                                                 viewBox="0 0 24 24"
//                                                 strokeWidth="1.5"
//                                             >
//                                                 <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
//                                             </svg>
//                                             <span>{item.label}</span>
//                                         </Link>
//                                     ))}
//                                 </nav>
//                             </div>
//                         </motion.aside>
//                     </>
//                 )}
//             </AnimatePresence>

//             {/* Content margin - adds margin to main content when sidebar is visible */}
//             <div className="md:ml-[72px] transition-all duration-300" style={{ marginLeft: isPermanentlyExpanded ? '240px' : '' }} />
//         </>
//     );
// };

// export default Sidebar;































// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';

// const Sidebar = () => {
//     // State for permanent expansion (via toggle button)
//     const [isPermanentlyExpanded, setIsPermanentlyExpanded] = useState(false);
//     // State for hover expansion
//     const [isHovered, setIsHovered] = useState(false);
//     // State for mobile menu visibility
//     const [isMobileOpen, setIsMobileOpen] = useState(false);
//     const location = useLocation();

//     // Combined state - sidebar is expanded if either permanently expanded or hovered
//     const isExpanded = isPermanentlyExpanded || isHovered;

//     // Close mobile menu when route changes
//     useEffect(() => {
//         setIsMobileOpen(false);
//     }, [location.pathname]);

//     const navItems = [
//         { path: '/', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
//         { path: '/items', label: 'Add Tax & Duty', icon: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z' },
//         { path: '/uom', label: 'Add Unit', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
//         { path: '/uom-table', label: 'View UOMT', icon: 'M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
//         { path: '/tax-table', label: 'View Tax Info', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
//         // Added File Management Navigation Items
//         { path: '/files', label: 'Files List', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
//         { path: '/files/new', label: 'Create File', icon: 'M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
//     ];

//     // Group navigation items by category
//     const navGroups = {
//         main: [navItems[0]], // Home
//         taxManagement: [navItems[1], navItems[2], navItems[3], navItems[4]],
//         fileManagement: [navItems[5], navItems[6]]
//     };

//     return (
//         <>
//             {/* Mobile sidebar toggle button */}
//             <div className="fixed top-4 left-4 z-50 md:hidden">
//                 <button
//                     onClick={() => setIsMobileOpen(!isMobileOpen)}
//                     className="inline-flex items-center justify-center p-2 rounded-md bg-[#061525] text-white shadow-lg hover:bg-[#0c2542] focus:outline-none"
//                     aria-label="Toggle mobile menu"
//                 >
//                     <svg
//                         className="h-6 w-6"
//                         stroke="currentColor"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                     >
//                         {isMobileOpen ? (
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                         ) : (
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                         )}
//                     </svg>
//                 </button>
//             </div>

//             {/* Desktop Sidebar */}
//             <motion.aside
//                 className="hidden md:block fixed top-0 left-0 h-full bg-[#061525] text-white shadow-lg z-40 overflow-hidden"
//                 animate={{ width: isExpanded ? '240px' : '72px' }}
//                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//             >
//                 <div className="flex flex-col h-full">
//                     {/* Logo/Brand and Toggle Button */}
//                     <div className="flex items-center justify-between h-16 px-4 border-b border-blue-900">
//                         <Link to="/" className="flex items-center space-x-3">
//                             <motion.svg
//                                 whileHover={{ rotate: 10 }}
//                                 className="h-8 w-8 text-blue-400 flex-shrink-0"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
//                             </motion.svg>
//                             <AnimatePresence>
//                                 {isExpanded && (
//                                     <motion.span
//                                         className="font-bold text-xl whitespace-nowrap"
//                                         initial={{ opacity: 0, width: 0 }}
//                                         animate={{ opacity: 1, width: 'auto' }}
//                                         exit={{ opacity: 0, width: 0 }}
//                                         transition={{ duration: 0.2 }}
//                                     >
//                                         TaxDuty
//                                     </motion.span>
//                                 )}
//                             </AnimatePresence>
//                         </Link>

//                         {/* Toggle button */}
//                         <button
//                             onClick={() => setIsPermanentlyExpanded(!isPermanentlyExpanded)}
//                             className="p-1 rounded-full hover:bg-[#0c2542] focus:outline-none"
//                             aria-label="Toggle sidebar"
//                         >
//                             <svg
//                                 className="h-5 w-5 text-blue-400"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d={isPermanentlyExpanded ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
//                                 />
//                             </svg>
//                         </button>
//                     </div>

//                     {/* Navigation Links */}
//                     <nav className="flex-1 px-2 py-4 space-y-4 overflow-y-auto">
//                         {/* Main Navigation */}
//                         <div>
//                             {navGroups.main.map((item) => (
//                                 <Link
//                                     key={item.path}
//                                     to={item.path}
//                                     className={`flex items-center px-2 py-2 rounded-md text-sm font-medium group transition-all duration-200
//                                         ${location.pathname === item.path
//                                             ? "bg-blue-800 text-white"
//                                             : "text-gray-200 hover:bg-[#0c2542] hover:text-white"
//                                         }`}
//                                 >
//                                     <svg
//                                         className="h-6 w-6 flex-shrink-0"
//                                         fill="none"
//                                         stroke="currentColor"
//                                         viewBox="0 0 24 24"
//                                         strokeWidth="1.5"
//                                     >
//                                         <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
//                                     </svg>
//                                     <AnimatePresence>
//                                         {isExpanded && (
//                                             <motion.span
//                                                 className="ml-3 whitespace-nowrap"
//                                                 initial={{ opacity: 0, width: 0 }}
//                                                 animate={{ opacity: 1, width: 'auto' }}
//                                                 exit={{ opacity: 0, width: 0 }}
//                                                 transition={{ duration: 0.2 }}
//                                             >
//                                                 {item.label}
//                                             </motion.span>
//                                         )}
//                                     </AnimatePresence>
                                    
//                                     {/* Active indicator */}
//                                     {location.pathname === item.path && (
//                                         <motion.span
//                                             layoutId="activeTab"
//                                             className="absolute right-0 w-1 h-8 bg-blue-400 rounded-l-md"
//                                         />
//                                     )}
//                                 </Link>
//                             ))}
//                         </div>
                        
//                         {/* Tax Management Section */}
//                         <div>
//                             {isExpanded && (
//                                 <h3 className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                                     Tax Management
//                                 </h3>
//                             )}
//                             {navGroups.taxManagement.map((item) => (
//                                 <Link
//                                     key={item.path}
//                                     to={item.path}
//                                     className={`flex items-center px-2 py-2 rounded-md text-sm font-medium group transition-all duration-200 mt-1
//                                         ${location.pathname === item.path
//                                             ? "bg-blue-800 text-white"
//                                             : "text-gray-200 hover:bg-[#0c2542] hover:text-white"
//                                         }`}
//                                 >
//                                     <svg
//                                         className="h-6 w-6 flex-shrink-0"
//                                         fill="none"
//                                         stroke="currentColor"
//                                         viewBox="0 0 24 24"
//                                         strokeWidth="1.5"
//                                     >
//                                         <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
//                                     </svg>
//                                     <AnimatePresence>
//                                         {isExpanded && (
//                                             <motion.span
//                                                 className="ml-3 whitespace-nowrap"
//                                                 initial={{ opacity: 0, width: 0 }}
//                                                 animate={{ opacity: 1, width: 'auto' }}
//                                                 exit={{ opacity: 0, width: 0 }}
//                                                 transition={{ duration: 0.2 }}
//                                             >
//                                                 {item.label}
//                                             </motion.span>
//                                         )}
//                                     </AnimatePresence>
                                    
//                                     {/* Active indicator */}
//                                     {location.pathname === item.path && (
//                                         <motion.span
//                                             layoutId="activeTabTax"
//                                             className="absolute right-0 w-1 h-8 bg-blue-400 rounded-l-md"
//                                         />
//                                     )}
//                                 </Link>
//                             ))}
//                         </div>
                        
//                         {/* File Management Section */}
//                         <div>
//                             {isExpanded && (
//                                 <h3 className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                                     File Management
//                                 </h3>
//                             )}
//                             {navGroups.fileManagement.map((item) => (
//                                 <Link
//                                     key={item.path}
//                                     to={item.path}
//                                     className={`flex items-center px-2 py-2 rounded-md text-sm font-medium group transition-all duration-200 mt-1
//                                         ${location.pathname === item.path || (item.path === '/files' && location.pathname.startsWith('/files/'))
//                                             ? "bg-blue-800 text-white"
//                                             : "text-gray-200 hover:bg-[#0c2542] hover:text-white"
//                                         }`}
//                                 >
//                                     <svg
//                                         className="h-6 w-6 flex-shrink-0"
//                                         fill="none"
//                                         stroke="currentColor"
//                                         viewBox="0 0 24 24"
//                                         strokeWidth="1.5"
//                                     >
//                                         <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
//                                     </svg>
//                                     <AnimatePresence>
//                                         {isExpanded && (
//                                             <motion.span
//                                                 className="ml-3 whitespace-nowrap"
//                                                 initial={{ opacity: 0, width: 0 }}
//                                                 animate={{ opacity: 1, width: 'auto' }}
//                                                 exit={{ opacity: 0, width: 0 }}
//                                                 transition={{ duration: 0.2 }}
//                                             >
//                                                 {item.label}
//                                             </motion.span>
//                                         )}
//                                     </AnimatePresence>
                                    
//                                     {/* Active indicator */}
//                                     {(location.pathname === item.path || (item.path === '/files' && location.pathname.startsWith('/files/'))) && (
//                                         <motion.span
//                                             layoutId="activeTabFile"
//                                             className="absolute right-0 w-1 h-8 bg-blue-400 rounded-l-md"
//                                         />
//                                     )}
//                                 </Link>
//                             ))}
//                         </div>
//                     </nav>
//                 </div>
//             </motion.aside>

//             {/* Mobile Sidebar */}
//             <AnimatePresence>
//                 {isMobileOpen && (
//                     <>
//                         {/* Backdrop */}
//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 0.5 }}
//                             exit={{ opacity: 0 }}
//                             className="md:hidden fixed inset-0 bg-black z-30"
//                             onClick={() => setIsMobileOpen(false)}
//                         />
                        
//                         {/* Mobile Sidebar Panel */}
//                         <motion.aside
//                             initial={{ x: '-100%' }}
//                             animate={{ x: 0 }}
//                             exit={{ x: '-100%' }}
//                             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                             className="md:hidden fixed top-0 left-0 h-full w-64 bg-[#061525] text-white shadow-lg z-40"
//                         >
//                             <div className="flex flex-col h-full">
//                                 {/* Logo/Brand */}
//                                 <div className="flex items-center justify-between h-16 px-4 border-b border-blue-900">
//                                     <Link to="/" className="flex items-center space-x-3" onClick={() => setIsMobileOpen(false)}>
//                                         <motion.svg
//                                             whileHover={{ rotate: 10 }}
//                                             className="h-8 w-8 text-blue-400"
//                                             viewBox="0 0 24 24"
//                                             fill="none"
//                                             stroke="currentColor"
//                                             strokeWidth="2"
//                                         >
//                                             <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
//                                         </motion.svg>
//                                         <span className="font-bold text-xl">TaxDuty</span>
//                                     </Link>
                                    
//                                     {/* Close button */}
//                                     <button
//                                         onClick={() => setIsMobileOpen(false)}
//                                         className="p-2 rounded-md hover:bg-[#0c2542] focus:outline-none"
//                                     >
//                                         <svg
//                                             className="h-6 w-6"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke="currentColor"
//                                         >
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                         </svg>
//                                     </button>
//                                 </div>
                                
//                                 {/* Mobile Navigation Links */}
//                                 <nav className="flex-1 px-2 py-4 space-y-4 overflow-y-auto">
//                                     {/* Main Navigation */}
//                                     <div>
//                                         {navGroups.main.map((item) => (
//                                             <Link
//                                                 key={item.path}
//                                                 to={item.path}
//                                                 onClick={() => setIsMobileOpen(false)}
//                                                 className={`flex items-center px-4 py-2 rounded-md text-base font-medium transition-colors
//                                                     ${location.pathname === item.path
//                                                         ? "bg-blue-800 text-white"
//                                                         : "text-gray-200 hover:bg-[#0c2542] hover:text-white"
//                                                     }`}
//                                             >
//                                                 <svg
//                                                     className="h-6 w-6 mr-3"
//                                                     fill="none"
//                                                     stroke="currentColor"
//                                                     viewBox="0 0 24 24"
//                                                     strokeWidth="1.5"
//                                                 >
//                                                     <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
//                                                 </svg>
//                                                 <span>{item.label}</span>
//                                             </Link>
//                                         ))}
//                                     </div>
                                    
//                                     {/* Tax Management Section */}
//                                     <div>
//                                         <h3 className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                                             Tax Management
//                                         </h3>
//                                         {navGroups.taxManagement.map((item) => (
//                                             <Link
//                                                 key={item.path}
//                                                 to={item.path}
//                                                 onClick={() => setIsMobileOpen(false)}
//                                                 className={`flex items-center px-4 py-2 rounded-md text-base font-medium transition-colors mt-1
//                                                     ${location.pathname === item.path
//                                                         ? "bg-blue-800 text-white"
//                                                         : "text-gray-200 hover:bg-[#0c2542] hover:text-white"
//                                                     }`}
//                                             >
//                                                 <svg
//                                                     className="h-6 w-6 mr-3"
//                                                     fill="none"
//                                                     stroke="currentColor"
//                                                     viewBox="0 0 24 24"
//                                                     strokeWidth="1.5"
//                                                 >
//                                                     <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
//                                                 </svg>
//                                                 <span>{item.label}</span>
//                                             </Link>
//                                         ))}
//                                     </div>
                                    
//                                     {/* File Management Section */}
//                                     <div>
//                                         <h3 className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                                             File Management
//                                         </h3>
//                                         {navGroups.fileManagement.map((item) => (
//                                             <Link
//                                                 key={item.path}
//                                                 to={item.path}
//                                                 onClick={() => setIsMobileOpen(false)}
//                                                 className={`flex items-center px-4 py-2 rounded-md text-base font-medium transition-colors mt-1
//                                                     ${location.pathname === item.path || (item.path === '/files' && location.pathname.startsWith('/files/'))
//                                                         ? "bg-blue-800 text-white"
//                                                         : "text-gray-200 hover:bg-[#0c2542] hover:text-white"
//                                                     }`}
//                                             >
//                                                 <svg
//                                                     className="h-6 w-6 mr-3"
//                                                     fill="none"
//                                                     stroke="currentColor"
//                                                     viewBox="0 0 24 24"
//                                                     strokeWidth="1.5"
//                                                 >
//                                                     <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
//                                                 </svg>
//                                                 <span>{item.label}</span>
//                                             </Link>
//                                         ))}
//                                     </div>
//                                 </nav>
//                             </div>
//                         </motion.aside>
//                     </>
//                 )}
//             </AnimatePresence>

//             {/* Content margin - adds margin to main content when sidebar is visible */}
//             <div className="md:ml-[72px] transition-all duration-300" style={{ marginLeft: isPermanentlyExpanded ? '240px' : '' }} />
//         </>
//     );
// };

// export default Sidebar;




























// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';

// const Sidebar = () => {
//     // State for permanent expansion (via toggle button)
//     const [isPermanentlyExpanded, setIsPermanentlyExpanded] = useState(false);
//     // State for hover expansion
//     const [isHovered, setIsHovered] = useState(false);
//     // State for mobile menu visibility
//     const [isMobileOpen, setIsMobileOpen] = useState(false);
//     const location = useLocation();

//     // Combined state - sidebar is expanded if either permanently expanded or hovered
//     const isExpanded = isPermanentlyExpanded || isHovered;

//     // Close mobile menu when route changes
//     useEffect(() => {
//         setIsMobileOpen(false);
//     }, [location.pathname]);

//     const navItems = [
//         { path: '/', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
//         { path: '/items', label: 'Add Tax & Duty', icon: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z' },
//         { path: '/uom', label: 'Add Unit', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
//         { path: '/uom-table', label: 'View UOMT', icon: 'M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
//         { path: '/tax-table', label: 'View Tax Info', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
//         // Added File Management Navigation Items
//         { path: '/files', label: 'Files List', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
//         { path: '/files/new', label: 'Create File', icon: 'M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
//     ];

//     // Group navigation items by category
//     const navGroups = {
//         main: [navItems[0]], // Home
//         taxManagement: [navItems[1], navItems[2], navItems[3], navItems[4]],
//         fileManagement: [navItems[5], navItems[6]]
//     };

//     return (
//         <>
//             {/* Mobile sidebar toggle button */}
//             <div className="fixed top-4 left-4 z-50 md:hidden">
//                 <button
//                     onClick={() => setIsMobileOpen(!isMobileOpen)}
//                     className="inline-flex items-center justify-center p-2 rounded-md bg-[#4a6fa5] text-white shadow-lg hover:bg-[#5a85c0] focus:outline-none focus:ring-2 focus:ring-[#e6e6e6]"
//                     aria-label="Toggle mobile menu"
//                 >
//                     <svg
//                         className="h-6 w-6"
//                         stroke="currentColor"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                     >
//                         {isMobileOpen ? (
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                         ) : (
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                         )}
//                     </svg>
//                 </button>
//             </div>

//             {/* Desktop Sidebar */}
//             <motion.aside
//                 className="hidden md:block fixed top-0 left-0 h-full bg-[#4a6fa5] text-white shadow-lg z-40 overflow-hidden"
//                 animate={{ width: isExpanded ? '240px' : '72px' }}
//                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//             >
//                 <div className="flex flex-col h-full">
//                     {/* Logo/Brand and Toggle Button */}
//                     <div className="flex items-center justify-between h-16 px-4 border-b border-[#5a85c0]">
//                         <Link to="/" className="flex items-center space-x-3">
//                             <motion.svg
//                                 whileHover={{ rotate: 10 }}
//                                 className="h-8 w-8 text-white flex-shrink-0"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
//                             </motion.svg>
//                             <AnimatePresence>
//                                 {isExpanded && (
//                                     <motion.span
//                                         className="font-bold text-xl whitespace-nowrap"
//                                         initial={{ opacity: 0, width: 0 }}
//                                         animate={{ opacity: 1, width: 'auto' }}
//                                         exit={{ opacity: 0, width: 0 }}
//                                         transition={{ duration: 0.2 }}
//                                     >
//                                         TaxDuty
//                                     </motion.span>
//                                 )}
//                             </AnimatePresence>
//                         </Link>

//                         {/* Toggle button */}
//                         <button
//                             onClick={() => setIsPermanentlyExpanded(!isPermanentlyExpanded)}
//                             className="p-1 rounded-full hover:bg-[#5a85c0] focus:outline-none focus:ring-2 focus:ring-white/50"
//                             aria-label="Toggle sidebar"
//                         >
//                             <svg
//                                 className="h-5 w-5 text-white"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d={isPermanentlyExpanded ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
//                                 />
//                             </svg>
//                         </button>
//                     </div>

//                     {/* Navigation Links */}
//                     <nav className="flex-1 px-2 py-4 space-y-4 overflow-y-auto">
//                         {/* Main Navigation */}
//                         <div>
//                             {navGroups.main.map((item) => (
//                                 <Link
//                                     key={item.path}
//                                     to={item.path}
//                                     className={`flex items-center px-2 py-2 rounded-md text-sm font-medium group transition-all duration-200
//                                         ${location.pathname === item.path
//                                             ? "bg-[#5a85c0] text-white"
//                                             : "text-white hover:bg-[#5a85c0] hover:text-white"
//                                         }`}
//                                 >
//                                     <svg
//                                         className="h-6 w-6 flex-shrink-0"
//                                         fill="none"
//                                         stroke="currentColor"
//                                         viewBox="0 0 24 24"
//                                         strokeWidth="1.5"
//                                     >
//                                         <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
//                                     </svg>
//                                     <AnimatePresence>
//                                         {isExpanded && (
//                                             <motion.span
//                                                 className="ml-3 whitespace-nowrap"
//                                                 initial={{ opacity: 0, width: 0 }}
//                                                 animate={{ opacity: 1, width: 'auto' }}
//                                                 exit={{ opacity: 0, width: 0 }}
//                                                 transition={{ duration: 0.2 }}
//                                             >
//                                                 {item.label}
//                                             </motion.span>
//                                         )}
//                                     </AnimatePresence>
                                    
//                                     {/* Active indicator */}
//                                     {location.pathname === item.path && (
//                                         <motion.span
//                                             layoutId="activeTab"
//                                             className="absolute right-0 w-1 h-8 bg-white rounded-l-md"
//                                         />
//                                     )}
//                                 </Link>
//                             ))}
//                         </div>
                        
//                         {/* Tax Management Section */}
//                         <div>
//                             {isExpanded && (
//                                 <h3 className="px-2 text-xs font-semibold text-gray-100 uppercase tracking-wider">
//                                     Tax Management
//                                 </h3>
//                             )}
//                             {navGroups.taxManagement.map((item) => (
//                                 <Link
//                                     key={item.path}
//                                     to={item.path}
//                                     className={`flex items-center px-2 py-2 rounded-md text-sm font-medium group transition-all duration-200 mt-1
//                                         ${location.pathname === item.path
//                                             ? "bg-[#5a85c0] text-white"
//                                             : "text-white hover:bg-[#5a85c0] hover:text-white"
//                                         }`}
//                                 >
//                                     <svg
//                                         className="h-6 w-6 flex-shrink-0"
//                                         fill="none"
//                                         stroke="currentColor"
//                                         viewBox="0 0 24 24"
//                                         strokeWidth="1.5"
//                                     >
//                                         <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
//                                     </svg>
//                                     <AnimatePresence>
//                                         {isExpanded && (
//                                             <motion.span
//                                                 className="ml-3 whitespace-nowrap"
//                                                 initial={{ opacity: 0, width: 0 }}
//                                                 animate={{ opacity: 1, width: 'auto' }}
//                                                 exit={{ opacity: 0, width: 0 }}
//                                                 transition={{ duration: 0.2 }}
//                                             >
//                                                 {item.label}
//                                             </motion.span>
//                                         )}
//                                     </AnimatePresence>
                                    
//                                     {/* Active indicator */}
//                                     {location.pathname === item.path && (
//                                         <motion.span
//                                             layoutId="activeTabTax"
//                                             className="absolute right-0 w-1 h-8 bg-white rounded-l-md"
//                                         />
//                                     )}
//                                 </Link>
//                             ))}
//                         </div>
                        
//                         {/* File Management Section */}
//                         <div>
//                             {isExpanded && (
//                                 <h3 className="px-2 text-xs font-semibold text-gray-100 uppercase tracking-wider">
//                                     File Management
//                                 </h3>
//                             )}
//                             {navGroups.fileManagement.map((item) => (
//                                 <Link
//                                     key={item.path}
//                                     to={item.path}
//                                     className={`flex items-center px-2 py-2 rounded-md text-sm font-medium group transition-all duration-200 mt-1
//                                         ${location.pathname === item.path || (item.path === '/files' && location.pathname.startsWith('/files/'))
//                                             ? "bg-[#5a85c0] text-white"
//                                             : "text-white hover:bg-[#5a85c0] hover:text-white"
//                                         }`}
//                                 >
//                                     <svg
//                                         className="h-6 w-6 flex-shrink-0"
//                                         fill="none"
//                                         stroke="currentColor"
//                                         viewBox="0 0 24 24"
//                                         strokeWidth="1.5"
//                                     >
//                                         <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
//                                     </svg>
//                                     <AnimatePresence>
//                                         {isExpanded && (
//                                             <motion.span
//                                                 className="ml-3 whitespace-nowrap"
//                                                 initial={{ opacity: 0, width: 0 }}
//                                                 animate={{ opacity: 1, width: 'auto' }}
//                                                 exit={{ opacity: 0, width: 0 }}
//                                                 transition={{ duration: 0.2 }}
//                                             >
//                                                 {item.label}
//                                             </motion.span>
//                                         )}
//                                     </AnimatePresence>
                                    
//                                     {/* Active indicator */}
//                                     {(location.pathname === item.path || (item.path === '/files' && location.pathname.startsWith('/files/'))) && (
//                                         <motion.span
//                                             layoutId="activeTabFile"
//                                             className="absolute right-0 w-1 h-8 bg-white rounded-l-md"
//                                         />
//                                     )}
//                                 </Link>
//                             ))}
//                         </div>
//                     </nav>
//                 </div>
//             </motion.aside>

//             {/* Mobile Sidebar */}
//             <AnimatePresence>
//                 {isMobileOpen && (
//                     <>
//                         {/* Backdrop */}
//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 0.5 }}
//                             exit={{ opacity: 0 }}
//                             className="md:hidden fixed inset-0 bg-black z-30"
//                             onClick={() => setIsMobileOpen(false)}
//                         />
                        
//                         {/* Mobile Sidebar Panel */}
//                         <motion.aside
//                             initial={{ x: '-100%' }}
//                             animate={{ x: 0 }}
//                             exit={{ x: '-100%' }}
//                             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                             className="md:hidden fixed top-0 left-0 h-full w-64 bg-[#4a6fa5] text-white shadow-lg z-40"
//                         >
//                             <div className="flex flex-col h-full">
//                                 {/* Logo/Brand */}
//                                 <div className="flex items-center justify-between h-16 px-4 border-b border-[#5a85c0]">
//                                     <Link to="/" className="flex items-center space-x-3" onClick={() => setIsMobileOpen(false)}>
//                                         <motion.svg
//                                             whileHover={{ rotate: 10 }}
//                                             className="h-8 w-8 text-white"
//                                             viewBox="0 0 24 24"
//                                             fill="none"
//                                             stroke="currentColor"
//                                             strokeWidth="2"
//                                         >
//                                             <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
//                                         </motion.svg>
//                                         <span className="font-bold text-xl">TaxDuty</span>
//                                     </Link>
                                    
//                                     {/* Close button */}
//                                     <button
//                                         onClick={() => setIsMobileOpen(false)}
//                                         className="p-2 rounded-md hover:bg-[#5a85c0] focus:outline-none focus:ring-2 focus:ring-white/50"
//                                     >
//                                         <svg
//                                             className="h-6 w-6"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke="currentColor"
//                                         >
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                         </svg>
//                                     </button>
//                                 </div>
                                
//                                 {/* Mobile Navigation Links */}
//                                 <nav className="flex-1 px-2 py-4 space-y-4 overflow-y-auto">
//                                     {/* Main Navigation */}
//                                     <div>
//                                         {navGroups.main.map((item) => (
//                                             <Link
//                                                 key={item.path}
//                                                 to={item.path}
//                                                 onClick={() => setIsMobileOpen(false)}
//                                                 className={`flex items-center px-4 py-2 rounded-md text-base font-medium transition-colors
//                                                     ${location.pathname === item.path
//                                                         ? "bg-[#5a85c0] text-white"
//                                                         : "text-white hover:bg-[#5a85c0] hover:text-white"
//                                                     }`}
//                                             >
//                                                 <svg
//                                                     className="h-6 w-6 mr-3"
//                                                     fill="none"
//                                                     stroke="currentColor"
//                                                     viewBox="0 0 24 24"
//                                                     strokeWidth="1.5"
//                                                 >
//                                                     <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
//                                                 </svg>
//                                                 <span>{item.label}</span>
//                                             </Link>
//                                         ))}
//                                     </div>
                                    
//                                     {/* Tax Management Section */}
//                                     <div>
//                                         <h3 className="px-2 text-xs font-semibold text-gray-100 uppercase tracking-wider">
//                                             Tax Management
//                                         </h3>
//                                         {navGroups.taxManagement.map((item) => (
//                                             <Link
//                                                 key={item.path}
//                                                 to={item.path}
//                                                 onClick={() => setIsMobileOpen(false)}
//                                                 className={`flex items-center px-4 py-2 rounded-md text-base font-medium transition-colors mt-1
//                                                     ${location.pathname === item.path
//                                                         ? "bg-[#5a85c0] text-white"
//                                                         : "text-white hover:bg-[#5a85c0] hover:text-white"
//                                                     }`}
//                                             >
//                                                 <svg
//                                                     className="h-6 w-6 mr-3"
//                                                     fill="none"
//                                                     stroke="currentColor"
//                                                     viewBox="0 0 24 24"
//                                                     strokeWidth="1.5"
//                                                 >
//                                                     <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
//                                                 </svg>
//                                                 <span>{item.label}</span>
//                                             </Link>
//                                         ))}
//                                     </div>
                                    
//                                     {/* File Management Section */}
//                                     <div>
//                                         <h3 className="px-2 text-xs font-semibold text-gray-100 uppercase tracking-wider">
//                                             File Management
//                                         </h3>
//                                         {navGroups.fileManagement.map((item) => (
//                                             <Link
//                                                 key={item.path}
//                                                 to={item.path}
//                                                 onClick={() => setIsMobileOpen(false)}
//                                                 className={`flex items-center px-4 py-2 rounded-md text-base font-medium transition-colors mt-1
//                                                     ${location.pathname === item.path || (item.path === '/files' && location.pathname.startsWith('/files/'))
//                                                         ? "bg-[#5a85c0] text-white"
//                                                         : "text-white hover:bg-[#5a85c0] hover:text-white"
//                                                     }`}
//                                             >
//                                                 <svg
//                                                     className="h-6 w-6 mr-3"
//                                                     fill="none"
//                                                     stroke="currentColor"
//                                                     viewBox="0 0 24 24"
//                                                     strokeWidth="1.5"
//                                                 >
//                                                     <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
//                                                 </svg>
//                                                 <span>{item.label}</span>
//                                             </Link>
//                                         ))}
//                                     </div>
//                                 </nav>
//                             </div>
//                         </motion.aside>
//                     </>
//                 )}
//             </AnimatePresence>

//             {/* Content margin - adds margin to main content when sidebar is visible */}
//             <div className="md:ml-[72px] transition-all duration-300" style={{ marginLeft: isPermanentlyExpanded ? '240px' : '' }} />
//         </>
//     );
// };

// export default Sidebar;











































// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';

// const Sidebar = () => {
//     // State for permanent expansion (via toggle button)
//     const [isPermanentlyExpanded, setIsPermanentlyExpanded] = useState(false);
//     // State for hover expansion
//     const [isHovered, setIsHovered] = useState(false);
//     // State for mobile menu visibility
//     const [isMobileOpen, setIsMobileOpen] = useState(false);
//     const location = useLocation();

//     // Combined state - sidebar is expanded if either permanently expanded or hovered
//     const isExpanded = isPermanentlyExpanded || isHovered;

//     // Close mobile menu when route changes
//     useEffect(() => {
//         setIsMobileOpen(false);
//     }, [location.pathname]);

//     const navItems = [
//         { path: '/', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
//         { path: '/items', label: 'Add Tax & Duty', icon: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z' },
//         { path: '/uom', label: 'Add Unit', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
//         { path: '/uom-table', label: 'View UOMT', icon: 'M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
//         { path: '/tax-table', label: 'View Tax Info', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
//         // Added File Management Navigation Items
//         { path: '/files', label: 'Files List', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
//         { path: '/files/new', label: 'Create File', icon: 'M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
//     ];

//     // Group navigation items by category
//     const navGroups = {
//         main: [navItems[0]], // Home
//         taxManagement: [navItems[1], navItems[2], navItems[3], navItems[4]],
//         fileManagement: [navItems[5], navItems[6]]
//     };

//     return (
//         <>
//             {/* Mobile sidebar toggle button */}
//             <div className="fixed top-4 left-4 z-50 md:hidden">
//                 <button
//                     onClick={() => setIsMobileOpen(!isMobileOpen)}
//                     className="inline-flex items-center justify-center p-2 rounded-md bg-[#161c2d] text-white shadow-lg hover:bg-[#1e2a45] focus:outline-none focus:ring-2 focus:ring-blue-400/30"
//                     aria-label="Toggle mobile menu"
//                 >
//                     <svg
//                         className="h-6 w-6"
//                         stroke="currentColor"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                     >
//                         {isMobileOpen ? (
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                         ) : (
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                         )}
//                     </svg>
//                 </button>
//             </div>

//             {/* Desktop Sidebar */}
//             <motion.aside
//                 className="hidden md:block fixed top-0 left-0 h-full bg-[#161c2d] text-white shadow-lg z-40 overflow-hidden"
//                 animate={{ width: isExpanded ? '240px' : '72px' }}
//                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//             >
//                 <div className="flex flex-col h-full">
//                     {/* Logo/Brand and Toggle Button */}
//                     <div className="flex items-center justify-between h-16 px-4 border-b border-[#232b42]">
//                         <Link to="/" className="flex items-center space-x-3">
//                             <motion.svg
//                                 whileHover={{ rotate: 10 }}
//                                 className="h-8 w-8 text-[#5e9cf9] flex-shrink-0"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
//                             </motion.svg>
//                             <AnimatePresence>
//                                 {isExpanded && (
//                                     <motion.span
//                                         className="font-bold text-xl whitespace-nowrap"
//                                         initial={{ opacity: 0, width: 0 }}
//                                         animate={{ opacity: 1, width: 'auto' }}
//                                         exit={{ opacity: 0, width: 0 }}
//                                         transition={{ duration: 0.2 }}
//                                     >
//                                         TaxDuty
//                                     </motion.span>
//                                 )}
//                             </AnimatePresence>
//                         </Link>

//                         {/* Toggle button */}
//                         <button
//                             onClick={() => setIsPermanentlyExpanded(!isPermanentlyExpanded)}
//                             className="p-1 rounded-full hover:bg-[#1e2a45] focus:outline-none focus:ring-2 focus:ring-blue-400/30"
//                             aria-label="Toggle sidebar"
//                         >
//                             <svg
//                                 className="h-5 w-5 text-[#5e9cf9]"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d={isPermanentlyExpanded ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
//                                 />
//                             </svg>
//                         </button>
//                     </div>

//                     {/* Navigation Links */}
//                     <nav className="flex-1 px-2 py-4 space-y-4 overflow-y-auto">
//                         {/* Main Navigation */}
//                         <div>
//                             {navGroups.main.map((item) => (
//                                 <Link
//                                     key={item.path}
//                                     to={item.path}
//                                     className={`flex items-center px-2 py-2 rounded-md text-sm font-medium group transition-all duration-200
//                                         ${location.pathname === item.path
//                                             ? "bg-[#1e2a45] text-white"
//                                             : "text-gray-200 hover:bg-[#1e2a45] hover:text-white"
//                                         }`}
//                                 >
//                                     <svg
//                                         className={`h-6 w-6 flex-shrink-0 ${location.pathname === item.path ? "text-[#5e9cf9]" : ""}`}
//                                         fill="none"
//                                         stroke="currentColor"
//                                         viewBox="0 0 24 24"
//                                         strokeWidth="1.5"
//                                     >
//                                         <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
//                                     </svg>
//                                     <AnimatePresence>
//                                         {isExpanded && (
//                                             <motion.span
//                                                 className="ml-3 whitespace-nowrap"
//                                                 initial={{ opacity: 0, width: 0 }}
//                                                 animate={{ opacity: 1, width: 'auto' }}
//                                                 exit={{ opacity: 0, width: 0 }}
//                                                 transition={{ duration: 0.2 }}
//                                             >
//                                                 {item.label}
//                                             </motion.span>
//                                         )}
//                                     </AnimatePresence>
                                    
//                                     {/* Active indicator */}
//                                     {location.pathname === item.path && (
//                                         <motion.span
//                                             layoutId="activeTab"
//                                             className="absolute right-0 w-1 h-8 bg-[#5e9cf9] rounded-l-md"
//                                         />
//                                     )}
//                                 </Link>
//                             ))}
//                         </div>
                        
//                         {/* Tax Management Section */}
//                         <div>
//                             {isExpanded && (
//                                 <h3 className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                                     Tax Management
//                                 </h3>
//                             )}
//                             {navGroups.taxManagement.map((item) => (
//                                 <Link
//                                     key={item.path}
//                                     to={item.path}
//                                     className={`flex items-center px-2 py-2 rounded-md text-sm font-medium group transition-all duration-200 mt-1
//                                         ${location.pathname === item.path
//                                             ? "bg-[#1e2a45] text-white"
//                                             : "text-gray-200 hover:bg-[#1e2a45] hover:text-white"
//                                         }`}
//                                 >
//                                     <svg
//                                         className={`h-6 w-6 flex-shrink-0 ${location.pathname === item.path ? "text-[#5e9cf9]" : ""}`}
//                                         fill="none"
//                                         stroke="currentColor"
//                                         viewBox="0 0 24 24"
//                                         strokeWidth="1.5"
//                                     >
//                                         <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
//                                     </svg>
//                                     <AnimatePresence>
//                                         {isExpanded && (
//                                             <motion.span
//                                                 className="ml-3 whitespace-nowrap"
//                                                 initial={{ opacity: 0, width: 0 }}
//                                                 animate={{ opacity: 1, width: 'auto' }}
//                                                 exit={{ opacity: 0, width: 0 }}
//                                                 transition={{ duration: 0.2 }}
//                                             >
//                                                 {item.label}
//                                             </motion.span>
//                                         )}
//                                     </AnimatePresence>
                                    
//                                     {/* Active indicator */}
//                                     {location.pathname === item.path && (
//                                         <motion.span
//                                             layoutId="activeTabTax"
//                                             className="absolute right-0 w-1 h-8 bg-[#5e9cf9] rounded-l-md"
//                                         />
//                                     )}
//                                 </Link>
//                             ))}
//                         </div>
                        
//                         {/* File Management Section */}
//                         <div>
//                             {isExpanded && (
//                                 <h3 className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                                     File Management
//                                 </h3>
//                             )}
//                             {navGroups.fileManagement.map((item) => (
//                                 <Link
//                                     key={item.path}
//                                     to={item.path}
//                                     className={`flex items-center px-2 py-2 rounded-md text-sm font-medium group transition-all duration-200 mt-1
//                                         ${location.pathname === item.path || (item.path === '/files' && location.pathname.startsWith('/files/'))
//                                             ? "bg-[#1e2a45] text-white"
//                                             : "text-gray-200 hover:bg-[#1e2a45] hover:text-white"
//                                         }`}
//                                 >
//                                     <svg
//                                         className={`h-6 w-6 flex-shrink-0 ${location.pathname === item.path || (item.path === '/files' && location.pathname.startsWith('/files/')) ? "text-[#5e9cf9]" : ""}`}
//                                         fill="none"
//                                         stroke="currentColor"
//                                         viewBox="0 0 24 24"
//                                         strokeWidth="1.5"
//                                     >
//                                         <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
//                                     </svg>
//                                     <AnimatePresence>
//                                         {isExpanded && (
//                                             <motion.span
//                                                 className="ml-3 whitespace-nowrap"
//                                                 initial={{ opacity: 0, width: 0 }}
//                                                 animate={{ opacity: 1, width: 'auto' }}
//                                                 exit={{ opacity: 0, width: 0 }}
//                                                 transition={{ duration: 0.2 }}
//                                             >
//                                                 {item.label}
//                                             </motion.span>
//                                         )}
//                                     </AnimatePresence>
                                    
//                                     {/* Active indicator */}
//                                     {(location.pathname === item.path || (item.path === '/files' && location.pathname.startsWith('/files/'))) && (
//                                         <motion.span
//                                             layoutId="activeTabFile"
//                                             className="absolute right-0 w-1 h-8 bg-[#5e9cf9] rounded-l-md"
//                                         />
//                                     )}
//                                 </Link>
//                             ))}
//                         </div>
//                     </nav>
//                 </div>
//             </motion.aside>

//             {/* Mobile Sidebar */}
//             <AnimatePresence>
//                 {isMobileOpen && (
//                     <>
//                         {/* Backdrop */}
//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 0.5 }}
//                             exit={{ opacity: 0 }}
//                             className="md:hidden fixed inset-0 bg-black z-30"
//                             onClick={() => setIsMobileOpen(false)}
//                         />
                        
//                         {/* Mobile Sidebar Panel */}
//                         <motion.aside
//                             initial={{ x: '-100%' }}
//                             animate={{ x: 0 }}
//                             exit={{ x: '-100%' }}
//                             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                             className="md:hidden fixed top-0 left-0 h-full w-64 bg-[#161c2d] text-white shadow-lg z-40"
//                         >
//                             <div className="flex flex-col h-full">
//                                 {/* Logo/Brand */}
//                                 <div className="flex items-center justify-between h-16 px-4 border-b border-[#232b42]">
//                                     <Link to="/" className="flex items-center space-x-3" onClick={() => setIsMobileOpen(false)}>
//                                         <motion.svg
//                                             whileHover={{ rotate: 10 }}
//                                             className="h-8 w-8 text-[#5e9cf9]"
//                                             viewBox="0 0 24 24"
//                                             fill="none"
//                                             stroke="currentColor"
//                                             strokeWidth="2"
//                                         >
//                                             <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
//                                         </motion.svg>
//                                         <span className="font-bold text-xl">TaxDuty</span>
//                                     </Link>
                                    
//                                     {/* Close button */}
//                                     <button
//                                         onClick={() => setIsMobileOpen(false)}
//                                         className="p-2 rounded-md hover:bg-[#1e2a45] focus:outline-none focus:ring-2 focus:ring-blue-400/30"
//                                     >
//                                         <svg
//                                             className="h-6 w-6"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke="currentColor"
//                                         >
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                         </svg>
//                                     </button>
//                                 </div>
                                
//                                 {/* Mobile Navigation Links */}
//                                 <nav className="flex-1 px-2 py-4 space-y-4 overflow-y-auto">
//                                     {/* Main Navigation */}
//                                     <div>
//                                         {navGroups.main.map((item) => (
//                                             <Link
//                                                 key={item.path}
//                                                 to={item.path}
//                                                 onClick={() => setIsMobileOpen(false)}
//                                                 className={`flex items-center px-4 py-2 rounded-md text-base font-medium transition-colors
//                                                     ${location.pathname === item.path
//                                                         ? "bg-[#1e2a45] text-white"
//                                                         : "text-gray-200 hover:bg-[#1e2a45] hover:text-white"
//                                                     }`}
//                                             >
//                                                 <svg
//                                                     className={`h-6 w-6 mr-3 ${location.pathname === item.path ? "text-[#5e9cf9]" : ""}`}
//                                                     fill="none"
//                                                     stroke="currentColor"
//                                                     viewBox="0 0 24 24"
//                                                     strokeWidth="1.5"
//                                                 >
//                                                     <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
//                                                 </svg>
//                                                 <span>{item.label}</span>
//                                             </Link>
//                                         ))}
//                                     </div>
                                    
//                                     {/* Tax Management Section */}
//                                     <div>
//                                         <h3 className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                                             Tax Management
//                                         </h3>
//                                         {navGroups.taxManagement.map((item) => (
//                                             <Link
//                                                 key={item.path}
//                                                 to={item.path}
//                                                 onClick={() => setIsMobileOpen(false)}
//                                                 className={`flex items-center px-4 py-2 rounded-md text-base font-medium transition-colors mt-1
//                                                     ${location.pathname === item.path
//                                                         ? "bg-[#1e2a45] text-white"
//                                                         : "text-gray-200 hover:bg-[#1e2a45] hover:text-white"
//                                                     }`}
//                                             >
//                                                 <svg
//                                                     className={`h-6 w-6 mr-3 ${location.pathname === item.path ? "text-[#5e9cf9]" : ""}`}
//                                                     fill="none"
//                                                     stroke="currentColor"
//                                                     viewBox="0 0 24 24"
//                                                     strokeWidth="1.5"
//                                                 >
//                                                     <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
//                                                 </svg>
//                                                 <span>{item.label}</span>
//                                             </Link>
//                                         ))}
//                                     </div>
                                    
//                                     {/* File Management Section */}
//                                     <div>
//                                         <h3 className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                                             File Management
//                                         </h3>
//                                         {navGroups.fileManagement.map((item) => (
//                                             <Link
//                                                 key={item.path}
//                                                 to={item.path}
//                                                 onClick={() => setIsMobileOpen(false)}
//                                                 className={`flex items-center px-4 py-2 rounded-md text-base font-medium transition-colors mt-1
//                                                     ${location.pathname === item.path || (item.path === '/files' && location.pathname.startsWith('/files/'))
//                                                         ? "bg-[#1e2a45] text-white"
//                                                         : "text-gray-200 hover:bg-[#1e2a45] hover:text-white"
//                                                     }`}
//                                             >
//                                                 <svg
//                                                     className={`h-6 w-6 mr-3 ${location.pathname === item.path || (item.path === '/files' && location.pathname.startsWith('/files/')) ? "text-[#5e9cf9]" : ""}`}
//                                                     fill="none"
//                                                     stroke="currentColor"
//                                                     viewBox="0 0 24 24"
//                                                     strokeWidth="1.5"
//                                                 >
//                                                     <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
//                                                 </svg>
//                                                 <span>{item.label}</span>
//                                             </Link>
//                                         ))}
//                                     </div>
//                                 </nav>
//                             </div>
//                         </motion.aside>
//                     </>
//                 )}
//             </AnimatePresence>

//             {/* Content margin - adds margin to main content when sidebar is visible */}
//             <div className="md:ml-[72px] transition-all duration-300" style={{ marginLeft: isPermanentlyExpanded ? '240px' : '' }} />
//         </>
//     );
// };

// export default Sidebar;













































// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';

// const Sidebar = () => {
//     // State for permanent expansion (via toggle button)
//     const [isPermanentlyExpanded, setIsPermanentlyExpanded] = useState(false);
//     // State for hover expansion
//     const [isHovered, setIsHovered] = useState(false);
//     // State for mobile menu visibility
//     const [isMobileOpen, setIsMobileOpen] = useState(false);
//     const location = useLocation();

//     // Combined state - sidebar is expanded if either permanently expanded or hovered
//     const isExpanded = isPermanentlyExpanded || isHovered;

//     // Close mobile menu when route changes
//     useEffect(() => {
//         setIsMobileOpen(false);
//     }, [location.pathname]);

//     const navItems = [
//         { path: '/', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
//         { path: '/items', label: 'Add Tax & Duty', icon: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z' },
//         { path: '/uom', label: 'Add Unit', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
//         { path: '/uom-table', label: 'View UOMT', icon: 'M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
//         { path: '/tax-table', label: 'View Tax Info', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
//         // Added File Management Navigation Items
//         { path: '/files', label: 'Files List', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
//         { path: '/files/new', label: 'Create File', icon: 'M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
//     ];

//     // Group navigation items by category
//     const navGroups = {
//         main: [navItems[0]], // Home
//         taxManagement: [navItems[1], navItems[2], navItems[3], navItems[4]],
//         fileManagement: [navItems[5], navItems[6]]
//     };

//     return (
//         <>
//             {/* Mobile sidebar toggle button */}
//             <div className="fixed top-4 left-4 z-50 md:hidden">
//                 <button
//                     onClick={() => setIsMobileOpen(!isMobileOpen)}
//                     className="inline-flex items-center justify-center p-2 rounded-md bg-[#19181A] text-[#CEBC81] shadow-lg hover:bg-[#2a292b] focus:outline-none focus:ring-2 focus:ring-[#479761]/50"
//                     aria-label="Toggle mobile menu"
//                 >
//                     <svg
//                         className="h-6 w-6"
//                         stroke="currentColor"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                     >
//                         {isMobileOpen ? (
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                         ) : (
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                         )}
//                     </svg>
//                 </button>
//             </div>

//             {/* Desktop Sidebar */}
//             <motion.aside
//                 className="hidden md:block fixed top-0 left-0 h-full bg-[#19181A] text-white shadow-lg z-40 overflow-hidden"
//                 animate={{ width: isExpanded ? '240px' : '72px' }}
//                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//             >
//                 <div className="flex flex-col h-full">
//                     {/* Logo/Brand and Toggle Button */}
//                     <div className="flex items-center justify-between h-16 px-4 border-b border-[#2a292b]">
//                         <Link to="/" className="flex items-center space-x-3">
//                             <motion.svg
//                                 whileHover={{ rotate: 10 }}
//                                 className="h-8 w-8 text-[#479761] flex-shrink-0"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
//                             </motion.svg>
//                             <AnimatePresence>
//                                 {isExpanded && (
//                                     <motion.span
//                                         className="font-bold text-xl whitespace-nowrap text-[#479761]"
//                                         initial={{ opacity: 0, width: 0 }}
//                                         animate={{ opacity: 1, width: 'auto' }}
//                                         exit={{ opacity: 0, width: 0 }}
//                                         transition={{ duration: 0.2 }}
//                                     >
//                                         TaxDuty
//                                     </motion.span>
//                                 )}
//                             </AnimatePresence>
//                         </Link>

//                         {/* Toggle button */}
//                         <button
//                             onClick={() => setIsPermanentlyExpanded(!isPermanentlyExpanded)}
//                             className="p-1 rounded-full hover:bg-[#2a292b] focus:outline-none focus:ring-2 focus:ring-[#479761]/50"
//                             aria-label="Toggle sidebar"
//                         >
//                             <svg
//                                 className="h-5 w-5 text-[#479761]"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d={isPermanentlyExpanded ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
//                                 />
//                             </svg>
//                         </button>
//                     </div>

//                     {/* Navigation Links */}
//                     <nav className="flex-1 px-2 py-4 space-y-4 overflow-y-auto">
//                         {/* Main Navigation */}
//                         <div>
//                             {navGroups.main.map((item) => (
//                                 <Link
//                                     key={item.path}
//                                     to={item.path}
//                                     className={`flex items-center px-2 py-2 rounded-md text-sm font-medium group transition-all duration-200
//                                         ${location.pathname === item.path
//                                             ? "bg-[#2a292b] text-[#CEBC81]"
//                                             : "text-[#B19F9E] hover:bg-[#2a292b] hover:text-[#CEBC81]"
//                                         }`}
//                                 >
//                                     <svg
//                                         className={`h-6 w-6 flex-shrink-0 ${location.pathname === item.path ? "text-[#479761]" : ""}`}
//                                         fill="none"
//                                         stroke="currentColor"
//                                         viewBox="0 0 24 24"
//                                         strokeWidth="1.5"
//                                     >
//                                         <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
//                                     </svg>
//                                     <AnimatePresence>
//                                         {isExpanded && (
//                                             <motion.span
//                                                 className="ml-3 whitespace-nowrap"
//                                                 initial={{ opacity: 0, width: 0 }}
//                                                 animate={{ opacity: 1, width: 'auto' }}
//                                                 exit={{ opacity: 0, width: 0 }}
//                                                 transition={{ duration: 0.2 }}
//                                             >
//                                                 {item.label}
//                                             </motion.span>
//                                         )}
//                                     </AnimatePresence>
                                    
//                                     {/* Active indicator */}
//                                     {location.pathname === item.path && (
//                                         <motion.span
//                                             layoutId="activeTab"
//                                             className="absolute left-0 w-1 h-8 bg-[#479761] rounded-r-md"
//                                         />
//                                     )}
//                                 </Link>
//                             ))}
//                         </div>
                        
//                         {/* Tax Management Section */}
//                         <div>
//                             {isExpanded && (
//                                 <h3 className="px-2 text-xs font-semibold text-[#CEBC81] uppercase tracking-wider mb-2">
//                                     Tax Management
//                                 </h3>
//                             )}
//                             {navGroups.taxManagement.map((item) => (
//                                 <Link
//                                     key={item.path}
//                                     to={item.path}
//                                     className={`flex items-center px-2 py-2 rounded-md text-sm font-medium group transition-all duration-200 mt-1
//                                         ${location.pathname === item.path
//                                             ? "bg-[#2a292b] text-[#CEBC81]"
//                                             : "text-[#B19F9E] hover:bg-[#2a292b] hover:text-[#CEBC81]"
//                                         }`}
//                                 >
//                                     <svg
//                                         className={`h-6 w-6 flex-shrink-0 ${location.pathname === item.path ? "text-[#CEBC81]" : ""}`}
//                                         fill="none"
//                                         stroke="currentColor"
//                                         viewBox="0 0 24 24"
//                                         strokeWidth="1.5"
//                                     >
//                                         <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
//                                     </svg>
//                                     <AnimatePresence>
//                                         {isExpanded && (
//                                             <motion.span
//                                                 className="ml-3 whitespace-nowrap"
//                                                 initial={{ opacity: 0, width: 0 }}
//                                                 animate={{ opacity: 1, width: 'auto' }}
//                                                 exit={{ opacity: 0, width: 0 }}
//                                                 transition={{ duration: 0.2 }}
//                                             >
//                                                 {item.label}
//                                             </motion.span>
//                                         )}
//                                     </AnimatePresence>
                                    
//                                     {/* Active indicator */}
//                                     {location.pathname === item.path && (
//                                         <motion.span
//                                             layoutId="activeTabTax"
//                                             className="absolute left-0 w-1 h-8 bg-[#CEBC81] rounded-r-md"
//                                         />
//                                     )}
//                                 </Link>
//                             ))}
//                         </div>
                        
//                         {/* File Management Section */}
//                         <div className="pt-2 mt-2 border-t border-[#2a292b]">
//                             {isExpanded && (
//                                 <h3 className="px-2 text-xs font-semibold text-[#CEBC81] uppercase tracking-wider mt-2 mb-2">
//                                     File Management
//                                 </h3>
//                             )}
//                             {navGroups.fileManagement.map((item) => (
//                                 <Link
//                                     key={item.path}
//                                     to={item.path}
//                                     className={`flex items-center px-2 py-2 rounded-md text-sm font-medium group transition-all duration-200 mt-1
//                                         ${location.pathname === item.path || (item.path === '/files' && location.pathname.startsWith('/files/'))
//                                             ? "bg-[#2a292b] text-[#CEBC81]"
//                                             : "text-[#B19F9E] hover:bg-[#2a292b] hover:text-[#CEBC81]"
//                                         }`}
//                                 >
//                                     <svg
//                                         className={`h-6 w-6 flex-shrink-0 ${(location.pathname === item.path || (item.path === '/files' && location.pathname.startsWith('/files/'))) ? "text-[#CEBC81]" : ""}`}
//                                         fill="none"
//                                         stroke="currentColor"
//                                         viewBox="0 0 24 24"
//                                         strokeWidth="1.5"
//                                     >
//                                         <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
//                                     </svg>
//                                     <AnimatePresence>
//                                         {isExpanded && (
//                                             <motion.span
//                                                 className="ml-3 whitespace-nowrap"
//                                                 initial={{ opacity: 0, width: 0 }}
//                                                 animate={{ opacity: 1, width: 'auto' }}
//                                                 exit={{ opacity: 0, width: 0 }}
//                                                 transition={{ duration: 0.2 }}
//                                             >
//                                                 {item.label}
//                                             </motion.span>
//                                         )}
//                                     </AnimatePresence>
                                    
//                                     {/* Active indicator */}
//                                     {(location.pathname === item.path || (item.path === '/files' && location.pathname.startsWith('/files/'))) && (
//                                         <motion.span
//                                             layoutId="activeTabFile"
//                                             className="absolute left-0 w-1 h-8 bg-[#CEBC81] rounded-r-md"
//                                         />
//                                     )}
//                                 </Link>
//                             ))}
//                         </div>
//                     </nav>
//                 </div>
//             </motion.aside>

//             {/* Mobile Sidebar */}
//             <AnimatePresence>
//                 {isMobileOpen && (
//                     <>
//                         {/* Backdrop */}
//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 0.5 }}
//                             exit={{ opacity: 0 }}
//                             className="md:hidden fixed inset-0 bg-black z-30"
//                             onClick={() => setIsMobileOpen(false)}
//                         />
                        
//                         {/* Mobile Sidebar Panel */}
//                         <motion.aside
//                             initial={{ x: '-100%' }}
//                             animate={{ x: 0 }}
//                             exit={{ x: '-100%' }}
//                             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                             className="md:hidden fixed top-0 left-0 h-full w-64 bg-[#19181A] text-white shadow-lg z-40"
//                         >
//                             <div className="flex flex-col h-full">
//                                 {/* Logo/Brand */}
//                                 <div className="flex items-center justify-between h-16 px-4 border-b border-[#2a292b]">
//                                     <Link to="/" className="flex items-center space-x-3" onClick={() => setIsMobileOpen(false)}>
//                                         <motion.svg
//                                             whileHover={{ rotate: 10 }}
//                                             className="h-8 w-8 text-[#479761]"
//                                             viewBox="0 0 24 24"
//                                             fill="none"
//                                             stroke="currentColor"
//                                             strokeWidth="2"
//                                         >
//                                             <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
//                                         </motion.svg>
//                                         <span className="font-bold text-xl text-[#CEBC81]">TaxDuty</span>
//                                     </Link>
                                    
//                                     {/* Close button */}
//                                     <button
//                                         onClick={() => setIsMobileOpen(false)}
//                                         className="p-2 rounded-md hover:bg-[#2a292b] focus:outline-none focus:ring-2 focus:ring-[#479761]/50"
//                                     >
//                                         <svg
//                                             className="h-6 w-6 text-[#B19F9E]"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke="currentColor"
//                                         >
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                         </svg>
//                                     </button>
//                                 </div>
                                
//                                 {/* Mobile Navigation Links */}
//                                 <nav className="flex-1 px-2 py-4 space-y-4 overflow-y-auto">
//                                     {/* Main Navigation */}
//                                     <div>
//                                         {navGroups.main.map((item) => (
//                                             <Link
//                                                 key={item.path}
//                                                 to={item.path}
//                                                 onClick={() => setIsMobileOpen(false)}
//                                                 className={`flex items-center px-4 py-2 rounded-md text-base font-medium transition-colors
//                                                     ${location.pathname === item.path
//                                                         ? "bg-[#2a292b] text-[#CEBC81]"
//                                                         : "text-[#B19F9E] hover:bg-[#2a292b] hover:text-[#CEBC81]"
//                                                     }`}
//                                             >
//                                                 <svg
//                                                     className={`h-6 w-6 mr-3 ${location.pathname === item.path ? "text-[#479761]" : ""}`}
//                                                     fill="none"
//                                                     stroke="currentColor"
//                                                     viewBox="0 0 24 24"
//                                                     strokeWidth="1.5"
//                                                 >
//                                                     <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
//                                                 </svg>
//                                                 <span>{item.label}</span>
//                                             </Link>
//                                         ))}
//                                     </div>
                                    
//                                     {/* Tax Management Section */}
//                                     <div>
//                                         <h3 className="px-2 text-xs font-semibold text-[#CEBC81] uppercase tracking-wider">
//                                             Tax Management
//                                         </h3>
//                                         {navGroups.taxManagement.map((item) => (
//                                             <Link
//                                                 key={item.path}
//                                                 to={item.path}
//                                                 onClick={() => setIsMobileOpen(false)}
//                                                 className={`flex items-center px-4 py-2 rounded-md text-base font-medium transition-colors mt-1
//                                                     ${location.pathname === item.path
//                                                         ? "bg-[#2a292b] text-[#CEBC81]"
//                                                         : "text-[#B19F9E] hover:bg-[#2a292b] hover:text-[#CEBC81]"
//                                                     }`}
//                                             >
//                                                 <svg
//                                                     className={`h-6 w-6 mr-3 ${location.pathname === item.path ? "text-[#A16E83]" : ""}`}
//                                                     fill="none"
//                                                     stroke="currentColor"
//                                                     viewBox="0 0 24 24"
//                                                     strokeWidth="1.5"
//                                                 >
//                                                     <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
//                                                 </svg>
//                                                 <span>{item.label}</span>
//                                             </Link>
//                                         ))}
//                                     </div>
                                    
//                                     {/* File Management Section */}
//                                     <div className="pt-2 mt-2 border-t border-[#2a292b]">
//                                         <h3 className="px-2 text-xs font-semibold text-[#CEBC81] uppercase tracking-wider mt-2">
//                                             File Management
//                                         </h3>
//                                         {navGroups.fileManagement.map((item) => (
//                                             <Link
//                                                 key={item.path}
//                                                 to={item.path}
//                                                 onClick={() => setIsMobileOpen(false)}
//                                                 className={`flex items-center px-4 py-2 rounded-md text-base font-medium transition-colors mt-1
//                                                     ${location.pathname === item.path || (item.path === '/files' && location.pathname.startsWith('/files/'))
//                                                         ? "bg-[#2a292b] text-[#CEBC81]"
//                                                         : "text-[#B19F9E] hover:bg-[#2a292b] hover:text-[#CEBC81]"
//                                                     }`}
//                                             >
//                                                 <svg
//                                                     className={`h-6 w-6 mr-3 ${(location.pathname === item.path || (item.path === '/files' && location.pathname.startsWith('/files/'))) ? "text-[#CEBC81]" : ""}`}
//                                                     fill="none"
//                                                     stroke="currentColor"
//                                                     viewBox="0 0 24 24"
//                                                     strokeWidth="1.5"
//                                                 >
//                                                     <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
//                                                 </svg>
//                                                 <span>{item.label}</span>
//                                             </Link>
//                                         ))}
//                                     </div>
//                                 </nav>
//                             </div>
//                         </motion.aside>
//                     </>
//                 )}
//             </AnimatePresence>

//             {/* Content margin - adds margin to main content when sidebar is visible */}
//             <div className="md:ml-[72px] transition-all duration-300" style={{ marginLeft: isPermanentlyExpanded ? '240px' : '' }} />
//         </>
//     );
// };

// export default Sidebar;

































import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
    const [isPermanentlyExpanded, setIsPermanentlyExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const location = useLocation();

    const isExpanded = isPermanentlyExpanded || isHovered;

    useEffect(() => {
        setIsMobileOpen(false);
    }, [location.pathname]);

    const navItems = [
        { path: '/', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { path: '/items', label: 'Add Tax & Duty', icon: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z' },
        { path: '/uom', label: 'Add Unit', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
        { path: '/uom-table', label: 'View UOMT', icon: 'M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
        { path: '/tax-table', label: 'View Tax Info', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
        { path: '/files', label: 'Files List', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
        { path: '/files/new', label: 'Create File', icon: 'M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    ];

    // Group navigation items by category
    const navGroups = {
        main: [navItems[0]], // Home
        taxManagement: [navItems[1], navItems[2], navItems[3], navItems[4]],
        fileManagement: [navItems[5], navItems[6]]
    };

    return (
        <>
            {/* Mobile sidebar toggle button */}
            <div className="fixed top-4 left-4 z-50 md:hidden">
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="p-2 rounded-md bg-[#4a6fa5] text-white shadow"
                    aria-label="Toggle mobile menu"
                >
                    <svg
                        className="h-6 w-6"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        {isMobileOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Desktop Sidebar */}
            <motion.aside
                className="hidden md:block fixed top-0 left-0 h-full bg-gradient-to-b from-[#4a6fa5] to-gray-800 text-white shadow z-40"
                animate={{ width: isExpanded ? '240px' : '72px' }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="flex flex-col h-full">
                    {/* Logo and Toggle Button */}
                    <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
                        <Link to="/" className="flex items-center space-x-3">
                            <svg
                                className="h-8 w-8 text-white"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.span
                                        className="font-bold text-xl text-white"
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: 'auto' }}
                                        exit={{ opacity: 0, width: 0 }}
                                    >
                                        TaxDuty
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>

                        {/* Toggle button */}
                        <button
                            onClick={() => setIsPermanentlyExpanded(!isPermanentlyExpanded)}
                            className="p-1 rounded-full hover:bg-white/10"
                        >
                            <svg
                                className="h-5 w-5 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={isPermanentlyExpanded ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 px-2 py-4 space-y-4 overflow-y-auto">
                        {/* Main Navigation */}
                        <div>
                            {navGroups.main.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center px-2 py-2 rounded-md text-sm font-medium relative
                                        ${location.pathname === item.path
                                            ? "bg-white/10 text-white"
                                            : "text-white/70 hover:bg-white/10 hover:text-white"
                                        }`}
                                >
                                    <svg
                                        className="h-6 w-6 flex-shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                    </svg>
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.span
                                                className="ml-3 whitespace-nowrap"
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: 'auto' }}
                                                exit={{ opacity: 0, width: 0 }}
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                    
                                    {location.pathname === item.path && (
                                        <motion.div 
                                            layoutId="activeTab"
                                            className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-md"
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>
                        
                        {/* Tax Management Section */}
                        <div>
                            {isExpanded && (
                                <h3 className="px-2 text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                                    Tax Management
                                </h3>
                            )}
                            {navGroups.taxManagement.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center px-2 py-2 rounded-md text-sm font-medium relative mt-1
                                        ${location.pathname === item.path
                                            ? "bg-white/10 text-white"
                                            : "text-white/70 hover:bg-white/10 hover:text-white"
                                        }`}
                                >
                                    <svg
                                        className="h-6 w-6 flex-shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                    </svg>
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.span
                                                className="ml-3 whitespace-nowrap"
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: 'auto' }}
                                                exit={{ opacity: 0, width: 0 }}
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                    
                                    {location.pathname === item.path && (
                                        <motion.div 
                                            layoutId="activeTabTax"
                                            className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-md"
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>
                        
                        {/* File Management Section */}
                        <div className="pt-2 mt-2 border-t border-white/10">
                            {isExpanded && (
                                <h3 className="px-2 text-xs font-semibold text-white/70 uppercase tracking-wider mt-2 mb-2">
                                    File Management
                                </h3>
                            )}
                            {navGroups.fileManagement.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center px-2 py-2 rounded-md text-sm font-medium relative mt-1
                                        ${location.pathname === item.path || (item.path === '/files' && location.pathname.startsWith('/files/') && item.path !== '/files/new')
                                            ? "bg-white/10 text-white"
                                            : "text-white/70 hover:bg-white/10 hover:text-white"
                                        }`}
                                >
                                    <svg
                                        className="h-6 w-6 flex-shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                    </svg>
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.span
                                                className="ml-3 whitespace-nowrap"
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: 'auto' }}
                                                exit={{ opacity: 0, width: 0 }}
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                    
                                    {(location.pathname === item.path || (item.path === '/files' && location.pathname.startsWith('/files/') && item.path !== '/files/new')) && (
                                        <motion.div 
                                            layoutId="activeTabFile"
                                            className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-md"
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>
                    </nav>
                </div>
            </motion.aside>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            className="md:hidden fixed inset-0 bg-black z-30"
                            onClick={() => setIsMobileOpen(false)}
                        />
                        
                        {/* Mobile Sidebar Panel */}
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="md:hidden fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-[#4a6fa5] to-gray-800 text-white shadow z-40"
                        >
                            <div className="flex flex-col h-full">
                                {/* Logo/Brand */}
                                <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
                                    <Link to="/" className="flex items-center space-x-3" onClick={() => setIsMobileOpen(false)}>
                                        <svg
                                            className="h-8 w-8 text-white"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                        </svg>
                                        <span className="font-bold text-xl text-white">TaxDuty</span>
                                    </Link>
                                    
                                    {/* Close button */}
                                    <button
                                        onClick={() => setIsMobileOpen(false)}
                                        className="p-2 rounded-md hover:bg-white/10"
                                    >
                                        <svg
                                            className="h-6 w-6 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                
                                {/* Mobile Navigation Links */}
                                <nav className="flex-1 px-2 py-4 space-y-4 overflow-y-auto">
                                    {/* Main Navigation */}
                                    <div>
                                        {navGroups.main.map((item) => (
                                            <Link
                                                key={item.path}
                                                to={item.path}
                                                onClick={() => setIsMobileOpen(false)}
                                                className={`flex items-center px-4 py-2 rounded-md text-base font-medium
                                                    ${location.pathname === item.path
                                                        ? "bg-white/10 text-white"
                                                        : "text-white/70 hover:bg-white/10 hover:text-white"
                                                    }`}
                                            >
                                                <svg
                                                    className="h-6 w-6 mr-3"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                                </svg>
                                                <span>{item.label}</span>
                                            </Link>
                                        ))}
                                    </div>
                                    
                                    {/* Tax Management Section */}
                                    <div>
                                        <h3 className="px-2 text-xs font-semibold text-white/70 uppercase tracking-wider">
                                            Tax Management
                                        </h3>
                                        {navGroups.taxManagement.map((item) => (
                                            <Link
                                                key={item.path}
                                                to={item.path}
                                                onClick={() => setIsMobileOpen(false)}
                                                className={`flex items-center px-4 py-2 rounded-md text-base font-medium mt-1
                                                    ${location.pathname === item.path
                                                        ? "bg-white/10 text-white"
                                                        : "text-white/70 hover:bg-white/10 hover:text-white"
                                                    }`}
                                            >
                                                <svg
                                                    className="h-6 w-6 mr-3"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                                </svg>
                                                <span>{item.label}</span>
                                            </Link>
                                        ))}
                                    </div>
                                    
                                    {/* File Management Section */}
                                    <div className="pt-2 mt-2 border-t border-white/10">
                                        <h3 className="px-2 text-xs font-semibold text-white/70 uppercase tracking-wider mt-2">
                                            File Management
                                        </h3>
                                        {navGroups.fileManagement.map((item) => (
                                            <Link
                                                key={item.path}
                                                to={item.path}
                                                onClick={() => setIsMobileOpen(false)}
                                                className={`flex items-center px-4 py-2 rounded-md text-base font-medium mt-1
                                                    ${location.pathname === item.path || (item.path === '/files' && location.pathname.startsWith('/files/') && item.path !== '/files/new')
                                                        ? "bg-white/10 text-white"
                                                        : "text-white/70 hover:bg-white/10 hover:text-white"
                                                    }`}
                                            >
                                                <svg
                                                    className="h-6 w-6 mr-3"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                                </svg>
                                                <span>{item.label}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </nav>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Content margin */}
            <div className="md:ml-[72px] transition-all duration-300" style={{ marginLeft: isPermanentlyExpanded ? '240px' : '' }} />
        </>
    );
};

export default Sidebar;
