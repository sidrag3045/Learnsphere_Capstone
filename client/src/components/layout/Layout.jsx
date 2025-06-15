// import Sidebar from './Sidebar';
// import Topbar from './Topbar';
// import { Outlet } from 'react-router-dom';

// const Layout = () => {
//   return (
//     <div className="min-h-screen flex">
//       <Sidebar />
//       <div className="flex-1">
//         <Topbar />
//         <main className="p-6 pt-20"> {/* Account for Topbar height */}
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };


// export default Layout;


import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
