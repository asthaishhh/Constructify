// import React, {useState} from 'react'
// import AppSidebar from './components/layouts/sidebar'
// import Header from './components/layouts/Header';
// import Dashboard from './components/dashboard/Dashboard';
// import Bill from './components/pages/Bill';
// import TraderOrdersDashboard from './components/pages/Orders';



// function App() {
//   const [sideBarCollapsed, setSideBarCollapsed]= useState(false);
//   const [currentPage, setCurrentPage] = useState("dashboard");

//   // Optionally, you can define onPageChange to include side effects or logging
//   const onPageChange = (pageId) => {
//     setCurrentPage(pageId);
//     // Add more logic here if you want on page change (e.g., analytics)
//   };
 
  
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 
//    dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">
//       <div className="flex h-screen overflow-hidden">
//         <AppSidebar 
//         collapsed={sideBarCollapsed} 
//         onToggle={()=> setSideBarCollapsed(!sideBarCollapsed)}
//         currentPage={currentPage}
//         onPageChange={setCurrentPage}
//         />
//         <div className="flex-1 flex flex-col overflow-hidden">
//           <Header 
//           sideBarCollapsed={sideBarCollapsed} 
//            onToggleSideBar={()=> setSideBarCollapsed(!sideBarCollapsed)}
//            />

//            <main className="flex-1 overflow-y-auto bg-transparent">
//             <div className='p-6 space-y-6'> { currentPage === "dashboard" && <Dashboard/> }</div>
//             <div className='p-6 space-y-6'> { currentPage === "bill" && <Bill/> }</div>
//             <div className='p-6 space-y-6'> { currentPage === "orders" && <TraderOrdersDashboard/> }</div>
//            </main>
//         </div>
//         {/* <Logo/> */}
//       </div>
//     </div>
//   )
// }

// export default App
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AppSidebar from "./components/layouts/sidebar";
import Dashboard from "./components/dashboard/Dashboard";
import Bill from "./components/pages/Bill";
import Orders from "./components/pages/Orders";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  // ✅ this is the main navigation handler
  const onPageChange = (pageId) => {
    console.log("Navigating to:", pageId);
    setCurrentPage(pageId);
  };

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      {/* Sidebar */}
      <AppSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      {/* Page Content with Smooth Transition */}
      <div className="flex-1 p-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {currentPage === "dashboard" && <Dashboard />}
            {currentPage === "bill" && <Bill />}
            {currentPage === "orders" && <Orders />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;


