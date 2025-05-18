import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initFlowbite } from 'flowbite';

const DashboardNavbar = ({Isdocs}) => {
  // Initialize Flowbite when component mounts
  useEffect(() => {
    // Initialize all Flowbite components
    initFlowbite();
  }, []);

  function logout(){
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  console.log(Isdocs);

  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');

  return (
    <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 ">
  <div className=" w-screen  flex flex-wrap items-center justify-between mx-auto p-4 pr-6">
   <div className="flex gap-x-3 items-center">
    <button  className="text-gray-500 hover:scale-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="drawer-navigation" data-drawer-show="drawer-navigation" aria-controls="drawer-navigation">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    {Isdocs?
    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#1E293B"><path d="M318.67-243.67h322.66V-324H318.67v80.33Zm0-167.33H642v-79.33H318.67V-411ZM236-50.67q-42.43 0-74.21-31.28Q130-113.24 130-156.67v-646.66q0-43.7 31.79-75.19Q193.57-910 236-910h349l245.67 243.67v509.66q0 43.43-31.99 74.72Q766.7-50.67 724-50.67H236ZM529.67-612H724L529.67-803.33V-612Z"/></svg>
     :
     <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#48752C"><path d="M275-274h90v-291h-90v291Zm160 0h90v-412h-90v412Zm160 0h90v-171h-90v171ZM212-76q-57.12 0-96.56-39.44Q76-154.88 76-212v-536q0-57.13 39.44-96.56Q154.88-884 212-884h536q57.13 0 96.56 39.44Q884-805.13 884-748v536q0 57.12-39.44 96.56Q805.13-76 748-76H212Z"/></svg>
     }
    <span className='font-bold text-xl'>{ Isdocs?'Docs':'Sheets'}</span>
   </div>

{/* <!-- drawer component --> */}
  <div id="drawer-navigation" className="shadow-lg rounded-e-lg fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white dark:bg-gray-800" tabIndex="-1" aria-labelledby="drawer-navigation-label">
      <h5 id="drawer-navigation-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Menu</h5>
      <button type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
          <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          <span className="sr-only">Close menu</span>
      </button>
    <div className="py-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          <li >
              <a href='/docs' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="28px" fill="#1E293B"><path d="M314-231h332v-103H314v103Zm0-164h332v-102H314v102ZM250-34q-55.73 0-95.86-39.64Q114-113.28 114-170v-620q0-56.72 40.14-96.36Q194.27-926 250-926h319l277 275v481q0 56.72-40.14 96.36T710-34H250Zm249-546h211L499-790v210Z"/></svg>
                <span className="ms-3">Docs</span>
              </a>
          </li>
          <li >
              <a href='/sheets' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="28px" fill="#48752C"><path d="M275-274h90v-291h-90v291Zm160 0h90v-412h-90v412Zm160 0h90v-171h-90v171ZM212-76q-57.12 0-96.56-39.44Q76-154.88 76-212v-536q0-57.13 39.44-96.56Q154.88-884 212-884h536q57.13 0 96.56 39.44Q884-805.13 884-748v536q0 57.12-39.44 96.56Q805.13-76 748-76H212Z"/></svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Sheets</span>
                <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
              </a>
          </li>


          <li className='cursor-pointer' onClick={logout}>
              <a className=" flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" >
              <svg className='rotate-180' xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="28px" fill="#BB271A"><path d="M210-74q-57.12 0-96.56-39.44Q74-152.88 74-210v-540q0-57.13 39.44-96.56Q152.88-886 210-886h278v136H210v540h278v136H210Zm414-143-96-96 99-99H350v-136h277l-99-99 96-96 262 263-262 263Z"/></svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
              </a>
          </li>

        </ul>
    </div>
  </div>
  <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <button type="button" className=" flex text-sm bg-red-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        <span className="sr-only">Open user menu</span>
        <div style={{ backgroundColor: Isdocs ? '#1E253B' : '#48752c' }} className='bg-slate-800 rounded-full p-3 px-4 text-white font-bold'>{username ?username.toUpperCase().slice(0,1): "A"}</div>
      </button>
      {/* <!-- Dropdown menu --> */}
      <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
        <div className="px-4 py-3 ">
          <span className="block text-sm text-gray-900 dark:text-white">{username?username:"Ahmad hamad"}</span>
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{email?email:"ahamd@hamad.com"}</span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <a href="/" className="block px-4 py-2 text-sm  text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
          </li>
          <li onClick={logout}>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
          </li>
        </ul>
      </div>
      <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  </div>
</nav>
  )
}

export default DashboardNavbar