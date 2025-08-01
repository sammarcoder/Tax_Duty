// import React from 'react'
// import { Link } from 'react-router-dom'
// import { motion } from 'framer-motion' // For animations

// const Home = () => {

//     const containerVariants = {
//         // hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.2
//             }
//         }
//     }

//     const itemVariants = {
//         // hidden: { y: 20, opacity: 0 },
//         visible: {
//             y: 0,
//             opacity: 1,
//             transition: { type: "spring", stiffness: 100 }
//         }
//     }

//     return (
//         <div className='min-h-screen w-full bg-gray-50 flex items-center justify-center p-4'>
//             <motion.div
//                 className='bg-white shadow-lg w-full max-w-2xl p-6 overflow-hidden'
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5 }}
//             >
//                 <motion.h1
//                     className='text-2xl font-bold text-gray-800 mb-6 text-center'
//                     initial={{ y: -20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: 0.2 }}
//                 >
//                     Dashboard
//                 </motion.h1>


//                 <motion.div
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="visible"
//                     className='mb-6'
//                 >
//                     <motion.div
//                         className='border border-gray-200 overflow-hidden transition-shadow'
//                         variants={itemVariants}
//                     >
//                         <div className='p-4'>
//                             <p className='text-gray-600 mb-2'>Calculate import duties and taxes</p>
//                             <Link to='/calculation'>
//                                 <motion.button
//                                     className='bg-[#061525] text-white p-3 px-6 mt-2 w-full hover:bg-[#0a2540] transition-colors'
//                                     whileHover={{ scale: 1.03 }}
//                                     whileTap={{ scale: 0.97 }}
//                                 >
//                                     Duty Calculation
//                                 </motion.button>
//                             </Link>
//                         </div>
//                     </motion.div>
//                 </motion.div>


//                 <motion.div
//                     className='grid grid-cols-2 gap-4'
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="visible"
//                 >

//                     <motion.div
//                         className='border border-gray-200 overflow-hidden transition-shadow'
//                         variants={itemVariants}
//                     >
//                         <div className='p-4'>
//                             <p className='text-gray-600 mb-2'>Manage measurement units</p>
//                             <Link to='/uom'>
//                                 <motion.button
//                                     className='bg-[#061525] text-white p-3 px-6 mt-2 w-full hover:bg-[#0a2540] transition-colors'
//                                     whileHover={{ scale: 1.03 }}
//                                     whileTap={{ scale: 0.97 }}
//                                 >
//                                     Add measurement
//                                 </motion.button>
//                             </Link>
//                         </div>
//                     </motion.div>


//                     <motion.div
//                         className='border border-gray-200 overflow-hidden transition-shadow'
//                         variants={itemVariants}
//                     >
//                         <div className='p-4'>
//                             <p className='text-gray-600 mb-2'>Add new items to inventory</p>
//                             <Link to='/items'>
//                                 <motion.button
//                                     className='bg-[#061525] text-white p-3 px-6 mt-2 w-full hover:bg-[#0a2540] transition-colors'
//                                     whileHover={{ scale: 1.03 }}
//                                     whileTap={{ scale: 0.97 }}
//                                 >
//                                     Add items
//                                 </motion.button>
//                             </Link>
//                         </div>
//                     </motion.div>
//                 </motion.div>
//             </motion.div>
//         </div>
//     )
// }

// export default Home






























import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Home = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100, damping: 10 }
        }
    }

    return (
        <div className='min-h-screen w-full bg-[#f5f5f7] flex items-center justify-center p-6'>
            <motion.div
                className='bg-white shadow-sm w-full max-w-4xl p-8 overflow-hidden rounded-xl'
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <motion.div
                    className='flex items-center justify-center mb-8'
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <div className='relative'>
                        <h1 className='text-3xl font-bold text-[#333333] text-center'>
                            Dashboard
                        </h1>
                        <motion.div 
                            className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 w-16 bg-[#4a6fa5] rounded-full'
                            initial={{ width: 0 }}
                            animate={{ width: 60 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        />
                    </div>
                </motion.div>

                {/* Main Functions */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className='mb-8'
                >
                    <motion.div
                        className='border border-[#e6e6e6] rounded-xl overflow-hidden transition-all hover:shadow-md bg-white'
                        variants={itemVariants}
                        whileHover={{ y: -3 }}
                    >
                        <div className='p-5'>
                            <div className='flex items-center mb-3'>
                                <div className='p-2 rounded-lg bg-[#f2f6fc] mr-3'>
                                    <svg className="w-6 h-6 text-[#4a6fa5]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <p className='text-[#333333] font-medium'>Calculate import duties and taxes</p>
                            </div>
                            <Link to='/files'>
                                <motion.button
                                    className='bg-[#4a6fa5] text-white p-3 px-6 mt-2 w-full hover:bg-[#5a85c0] transition-colors rounded-lg font-medium flex items-center justify-center'
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                    </svg>
                                    Duty Calculation
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Add/Create Functions */}
                {/* <motion.h2
                    className='text-lg font-semibold text-[#333333] mb-4'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Manage Data
                </motion.h2>
                
                <motion.div
                    className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        className='border border-[#e6e6e6] rounded-xl overflow-hidden transition-all hover:shadow-md bg-white'
                        variants={itemVariants}
                        whileHover={{ y: -3 }}
                    >
                        <div className='p-5'>
                            <div className='flex items-center mb-3'>
                                <div className='p-2 rounded-lg bg-[#f2f6fc] mr-3'>
                                    <svg className="w-6 h-6 text-[#4a6fa5]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
                                    </svg>
                                </div>
                                <p className='text-[#333333] font-medium'>Manage measurement units</p>
                            </div>
                            <Link to='/uom'>
                                <motion.button
                                    className='bg-[#4a6fa5] text-white p-3 px-6 mt-2 w-full hover:bg-[#5a85c0] transition-colors rounded-lg font-medium flex items-center justify-center'
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg>
                                    Add measurement
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        className='border border-[#e6e6e6] rounded-xl overflow-hidden transition-all hover:shadow-md bg-white'
                        variants={itemVariants}
                        whileHover={{ y: -3 }}
                    >
                        <div className='p-5'>
                            <div className='flex items-center mb-3'>
                                <div className='p-2 rounded-lg bg-[#f2f6fc] mr-3'>
                                    <svg className="w-6 h-6 text-[#4a6fa5]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                                    </svg>
                                </div>
                                <p className='text-[#333333] font-medium'>Add new items to inventory</p>
                            </div>
                            <Link to='/items'>
                                <motion.button
                                    className='bg-[#4a6fa5] text-white p-3 px-6 mt-2 w-full hover:bg-[#5a85c0] transition-colors rounded-lg font-medium flex items-center justify-center'
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg>
                                    Add items
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </motion.div> */}

                {/* View Functions */}
                <motion.h2
                    className='text-lg font-semibold text-[#333333] mb-4 flex items-center'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <svg className="w-5 h-5 mr-2 text-[#4a6fa5]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    View Data
                </motion.h2>
                
                <motion.div
                    className='grid grid-cols-1 md:grid-cols-2 gap-4'
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        className='border border-[#e6e6e6] rounded-xl overflow-hidden transition-all hover:shadow-md bg-white'
                        variants={itemVariants}
                        whileHover={{ y: -3 }}
                    >
                        <div className='p-5'>
                            <div className='flex items-center mb-3'>
                                <div className='p-2 rounded-lg bg-[#f2f6fc] mr-3'>
                                    <svg className="w-6 h-6 text-[#4a6fa5]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                    </svg>
                                </div>
                                <p className='text-[#333333] font-medium'>View all tax information</p>
                            </div>
                            <Link to='/tax-table'>
                                <motion.button
                                    className='bg-[#4a6fa5] text-white p-3 px-6 mt-2 w-full hover:bg-[#5a85c0] transition-colors rounded-lg font-medium flex items-center justify-center'
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                    </svg>
                                    View Items
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        className='border border-[#e6e6e6] rounded-xl overflow-hidden transition-all hover:shadow-md bg-white'
                        variants={itemVariants}
                        whileHover={{ y: -3 }}
                    >
                        <div className='p-5'>
                            <div className='flex items-center mb-3'>
                                <div className='p-2 rounded-lg bg-[#f2f6fc] mr-3'>
                                    <svg className="w-6 h-6 text-[#4a6fa5]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                                    </svg>
                                </div>
                                <p className='text-[#333333] font-medium'>View all measurement units</p>
                            </div>
                            <Link to='/uom-table'>
                                <motion.button
                                    className='bg-[#4a6fa5] text-white p-3 px-6 mt-2 w-full hover:bg-[#5a85c0] transition-colors rounded-lg font-medium flex items-center justify-center'
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                                    </svg>
                                    View UOM
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>
                
                
            </motion.div>
        </div>
    )
}

export default Home





// import React from 'react'
// import { Link } from 'react-router-dom'
// import { motion } from 'framer-motion'

// const Home = () => {
//     const containerVariants = {
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.2
//             }
//         }
//     }

//     const itemVariants = {
//         visible: {
//             y: 0,
//             opacity: 1,
//             transition: { type: "spring", stiffness: 100 }
//         }
//     }

//     return (
//         <div className='min-h-screen w-full bg-gray-50 flex items-center justify-center p-4'>
//             <motion.div
//                 className='bg-white shadow-lg w-full max-w-2xl p-6 overflow-hidden rounded-2xl'
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5 }}
//             >
//                 <motion.h1
//                     className='text-2xl font-bold text-gray-800 mb-6 text-center'
//                     initial={{ y: -20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: 0.2 }}
//                 >
//                     Dashboard
//                 </motion.h1>

//                 {/* Main Functions */}
//                 <motion.div
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="visible"
//                     className='mb-6'
//                 >
//                     <motion.div
//                         className='border border-gray-200 rounded-xl overflow-hidden transition-shadow'
//                         variants={itemVariants}
//                     >
//                         <div className='p-4'>
//                             <p className='text-gray-600 mb-2'>Calculate import duties and taxes</p>
//                             <Link to='/calculation'>
//                                 <motion.button
//                                     className='bg-[#061525] text-white p-3 px-6 mt-2 w-full hover:bg-[#0a2540] transition-colors rounded-lg'
//                                     whileHover={{ scale: 1.03 }}
//                                     whileTap={{ scale: 0.97 }}
//                                 >
//                                     Duty Calculation
//                                 </motion.button>
//                             </Link>
//                         </div>
//                     </motion.div>
//                 </motion.div>

//                 {/* Add/Create Functions */}
//                 <motion.div
//                     className='grid grid-cols-2 gap-4 mb-6'
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="visible"
//                 >
//                     <motion.div
//                         className='border border-gray-200 rounded-xl overflow-hidden transition-shadow'
//                         variants={itemVariants}
//                     >
//                         <div className='p-4'>
//                             <p className='text-gray-600 mb-2'>Manage measurement units</p>
//                             <Link to='/uom'>
//                                 <motion.button
//                                     className='bg-[#061525] text-white p-3 px-6 mt-2 w-full hover:bg-[#0a2540] transition-colors rounded-lg'
//                                     whileHover={{ scale: 1.03 }}
//                                     whileTap={{ scale: 0.97 }}
//                                 >
//                                     Add measurement
//                                 </motion.button>
//                             </Link>
//                         </div>
//                     </motion.div>

//                     <motion.div
//                         className='border border-gray-200 rounded-xl overflow-hidden transition-shadow'
//                         variants={itemVariants}
//                     >
//                         <div className='p-4'>
//                             <p className='text-gray-600 mb-2'>Add new items to inventory</p>
//                             <Link to='/items'>
//                                 <motion.button
//                                     className='bg-[#061525] text-white p-3 px-6 mt-2 w-full hover:bg-[#0a2540] transition-colors rounded-lg'
//                                     whileHover={{ scale: 1.03 }}
//                                     whileTap={{ scale: 0.97 }}
//                                 >
//                                     Add items
//                                 </motion.button>
//                             </Link>
//                         </div>
//                     </motion.div>
//                 </motion.div>

//                 {/* View Functions */}
//                 <motion.h2
//                     className='text-lg font-semibold text-gray-700 mb-4'
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.4 }}
//                 >
//                     View Data
//                 </motion.h2>
                
//                 <motion.div
//                     className='grid grid-cols-2 gap-4'
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="visible"
//                 >
//                     <motion.div
//                         className='border border-gray-200 rounded-xl overflow-hidden transition-shadow hover:shadow-md'
//                         variants={itemVariants}
//                     >
//                         <div className='p-4'>
//                             <p className='text-gray-600 mb-2'>View all tax information</p>
//                             <Link to='/tax-table'>
//                                 <motion.button
//                                     className='bg-[#061525] text-white p-3 px-6 mt-2 w-full hover:bg-[#0a2540] transition-colors rounded-lg flex items-center justify-center'
//                                     whileHover={{ scale: 1.03 }}
//                                     whileTap={{ scale: 0.97 }}
//                                 >
//                                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
//                                     </svg>
//                                     View Items
//                                 </motion.button>
//                             </Link>
//                         </div>
//                     </motion.div>

//                     <motion.div
//                         className='border border-gray-200 rounded-xl overflow-hidden transition-shadow hover:shadow-md'
//                         variants={itemVariants}
//                     >
//                         <div className='p-4'>
//                             <p className='text-gray-600 mb-2'>View all measurement units</p>
//                             <Link to='/uom-table'>
//                                 <motion.button
//                                     className='bg-[#061525] text-white p-3 px-6 mt-2 w-full hover:bg-[#0a2540] transition-colors rounded-lg flex items-center justify-center'
//                                     whileHover={{ scale: 1.03 }}
//                                     whileTap={{ scale: 0.97 }}
//                                 >
//                                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
//                                     </svg>
//                                     View UOM
//                                 </motion.button>
//                             </Link>
//                         </div>
//                     </motion.div>
//                 </motion.div>
//             </motion.div>
//         </div>
//     )
// }

// export default Home




















































// import React from 'react'
// import { Link } from 'react-router-dom'
// import { motion } from 'framer-motion'

// const Home = () => {
//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.15,
//                 delayChildren: 0.3
//             }
//         }
//     }

//     const itemVariants = {
//         hidden: { y: 20, opacity: 0 },
//         visible: {
//             y: 0,
//             opacity: 1,
//             transition: { type: "spring", stiffness: 100, damping: 10 }
//         }
//     }

//     return (
//         <div className='min-h-screen w-full bg-[#F8F9FA] flex items-center justify-center p-6'>
//             <motion.div
//                 className='bg-white shadow-xl w-full max-w-4xl p-8 overflow-hidden rounded-3xl'
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.6, ease: "easeOut" }}
//             >
//                 <motion.div
//                     className='flex items-center justify-center mb-8'
//                     initial={{ y: -20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: 0.2, duration: 0.6 }}
//                 >
//                     <div className='relative'>
//                         <h1 className='text-3xl font-bold text-[#212529] text-center'>
//                             Dashboard
//                         </h1>
//                         <motion.div 
//                             className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 w-16 bg-[#4361EE] rounded-full'
//                             initial={{ width: 0 }}
//                             animate={{ width: 60 }}
//                             transition={{ delay: 0.5, duration: 0.6 }}
//                         />
//                     </div>
//                 </motion.div>

//                 {/* Main Functions */}
//                 <motion.div
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="visible"
//                     className='mb-8'
//                 >
//                     <motion.div
//                         className='border border-[#E9ECEF] rounded-xl overflow-hidden transition-all hover:shadow-md bg-[#F8F9FA]'
//                         variants={itemVariants}
//                         whileHover={{ y: -4 }}
//                     >
//                         <div className='p-5'>
//                             <div className='flex items-center mb-3'>
//                                 <div className='p-2 rounded-lg bg-[#4361EE]/10 mr-3'>
//                                     <svg className="w-6 h-6 text-[#4361EE]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
//                                     </svg>
//                                 </div>
//                                 <p className='text-[#495057] font-medium'>Calculate import duties and taxes</p>
//                             </div>
//                             <Link to='/calculation'>
//                                 <motion.button
//                                     className='bg-[#4361EE] text-white p-3 px-6 mt-2 w-full hover:bg-[#3A0CA3] transition-colors rounded-lg font-medium flex items-center justify-center'
//                                     whileHover={{ scale: 1.02 }}
//                                     whileTap={{ scale: 0.98 }}
//                                 >
//                                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
//                                     </svg>
//                                     Duty Calculation
//                                 </motion.button>
//                             </Link>
//                         </div>
//                     </motion.div>
//                 </motion.div>

//                 {/* Add/Create Functions */}
//                 <motion.h2
//                     className='text-lg font-semibold text-[#343A40] mb-4'
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.3 }}
//                 >
//                     Manage Data
//                 </motion.h2>
                
//                 <motion.div
//                     className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="visible"
//                 >
//                     <motion.div
//                         className='border border-[#E9ECEF] rounded-xl overflow-hidden transition-all hover:shadow-md bg-[#F8F9FA]'
//                         variants={itemVariants}
//                         whileHover={{ y: -4 }}
//                     >
//                         <div className='p-5'>
//                             <div className='flex items-center mb-3'>
//                                 <div className='p-2 rounded-lg bg-[#4361EE]/10 mr-3'>
//                                     <svg className="w-6 h-6 text-[#4361EE]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
//                                     </svg>
//                                 </div>
//                                 <p className='text-[#495057] font-medium'>Manage measurement units</p>
//                             </div>
//                             <Link to='/uom'>
//                                 <motion.button
//                                     className='bg-[#4361EE] text-white p-3 px-6 mt-2 w-full hover:bg-[#3A0CA3] transition-colors rounded-lg font-medium flex items-center justify-center'
//                                     whileHover={{ scale: 1.02 }}
//                                     whileTap={{ scale: 0.98 }}
//                                 >
//                                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
//                                     </svg>
//                                     Add measurement
//                                 </motion.button>
//                             </Link>
//                         </div>
//                     </motion.div>

//                     <motion.div
//                         className='border border-[#E9ECEF] rounded-xl overflow-hidden transition-all hover:shadow-md bg-[#F8F9FA]'
//                         variants={itemVariants}
//                         whileHover={{ y: -4 }}
//                     >
//                         <div className='p-5'>
//                             <div className='flex items-center mb-3'>
//                                 <div className='p-2 rounded-lg bg-[#4361EE]/10 mr-3'>
//                                     <svg className="w-6 h-6 text-[#4361EE]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
//                                     </svg>
//                                 </div>
//                                 <p className='text-[#495057] font-medium'>Add new items to inventory</p>
//                             </div>
//                             <Link to='/items'>
//                                 <motion.button
//                                     className='bg-[#4361EE] text-white p-3 px-6 mt-2 w-full hover:bg-[#3A0CA3] transition-colors rounded-lg font-medium flex items-center justify-center'
//                                     whileHover={{ scale: 1.02 }}
//                                     whileTap={{ scale: 0.98 }}
//                                 >
//                                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
//                                     </svg>
//                                     Add items
//                                 </motion.button>
//                             </Link>
//                         </div>
//                     </motion.div>
//                 </motion.div>

//                 {/* View Functions */}
//                 <motion.h2
//                     className='text-lg font-semibold text-[#343A40] mb-4 flex items-center'
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.4 }}
//                 >
//                     <svg className="w-5 h-5 mr-2 text-[#4361EE]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
//                     </svg>
//                     View Data
//                 </motion.h2>
                
//                 <motion.div
//                     className='grid grid-cols-1 md:grid-cols-2 gap-4'
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="visible"
//                 >
//                     <motion.div
//                         className='border border-[#E9ECEF] rounded-xl overflow-hidden transition-all hover:shadow-md bg-[#F8F9FA]'
//                         variants={itemVariants}
//                         whileHover={{ y: -4 }}
//                     >
//                         <div className='p-5'>
//                             <div className='flex items-center mb-3'>
//                                 <div className='p-2 rounded-lg bg-[#4361EE]/10 mr-3'>
//                                     <svg className="w-6 h-6 text-[#4361EE]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
//                                     </svg>
//                                 </div>
//                                 <p className='text-[#495057] font-medium'>View all tax information</p>
//                             </div>
//                             <Link to='/tax-table'>
//                                 <motion.button
//                                     className='bg-[#4361EE] text-white p-3 px-6 mt-2 w-full hover:bg-[#3A0CA3] transition-colors rounded-lg font-medium flex items-center justify-center'
//                                     whileHover={{ scale: 1.02 }}
//                                     whileTap={{ scale: 0.98 }}
//                                 >
//                                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
//                                     </svg>
//                                     View Items
//                                 </motion.button>
//                             </Link>
//                         </div>
//                     </motion.div>

//                     <motion.div
//                         className='border border-[#E9ECEF] rounded-xl overflow-hidden transition-all hover:shadow-md bg-[#F8F9FA]'
//                         variants={itemVariants}
//                         whileHover={{ y: -4 }}
//                     >
//                         <div className='p-5'>
//                             <div className='flex items-center mb-3'>
//                                 <div className='p-2 rounded-lg bg-[#4361EE]/10 mr-3'>
//                                     <svg className="w-6 h-6 text-[#4361EE]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
//                                     </svg>
//                                 </div>
//                                 <p className='text-[#495057] font-medium'>View all measurement units</p>
//                             </div>
//                             <Link to='/uom-table'>
//                                 <motion.button
//                                     className='bg-[#4361EE] text-white p-3 px-6 mt-2 w-full hover:bg-[#3A0CA3] transition-colors rounded-lg font-medium flex items-center justify-center'
//                                     whileHover={{ scale: 1.02 }}
//                                     whileTap={{ scale: 0.98 }}
//                                 >
//                                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
//                                     </svg>
//                                     View UOM
//                                 </motion.button>
//                             </Link>
//                         </div>
//                     </motion.div>
//                 </motion.div>
                
//                 {/* Stats summary */}
//                 <motion.div
//                     className='mt-8 p-4 bg-[#F8F9FA] rounded-xl border border-[#E9ECEF]'
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.8, duration: 0.5 }}
//                 >
//                     <div className='grid grid-cols-3 gap-4'>
//                         <div className='flex flex-col items-center p-3'>
//                             <div className='text-[#4361EE] text-xl font-bold mb-1'>42</div>
//                             <div className='text-[#6C757D] text-sm'>Total Items</div>
//                         </div>
//                         <div className='flex flex-col items-center p-3 border-l border-r border-[#E9ECEF]'>
//                             <div className='text-[#4361EE] text-xl font-bold mb-1'>12</div>
//                             <div className='text-[#6C757D] text-sm'>UOM Types</div>
//                         </div>
//                         <div className='flex flex-col items-center p-3'>
//                             <div className='text-[#4361EE] text-xl font-bold mb-1'>87</div>
//                             <div className='text-[#6C757D] text-sm'>Calculations</div>
//                         </div>
//                     </div>
//                 </motion.div>
//             </motion.div>
//         </div>
//     )
// }

// export default Home
