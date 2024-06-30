'use client';
import '../../globals.css';
import React, {useEffect, useState} from 'react';
import Loader from "@/components/shared/dashboard/Loader";
import Sidebar from "@/components/admin/shared/navs/sidebar/SideBar";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode; }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); //1 second

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className='mt-2 dark:text-bodydark'>
        <div className='flex'>
          {/* <!-- ===== Sidebar Start ===== --> */}
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          {/* <!-- ===== Sidebar End ===== --> */}

          {/* <!-- ===== Content Area Start ===== --> */}
          <div className='relative bg-white dark:bg-boxdark-mode flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
            {/* <!-- ===== Header Start ===== --> */}
            {/*<Header*/}
            {/*  sidebarOpen={sidebarOpen}*/}
            {/*  setSidebarOpen={setSidebarOpen}*/}
            {/*/>*/}
            {/* <!-- ===== Header End ===== --> */}

            {/* <!-- ===== Main Content Start ===== --> */}
            <main>
              <div className='sm:m-1 md:p-10 lg:p-6 2xl:p-6'>
                {children}
              </div>
            </main>
            {/* <!-- ===== Main Content End ===== --> */}
          </div>
          {/* <!-- ===== Content Area End ===== --> */}
        </div>
      </div>
    );
  }
}
