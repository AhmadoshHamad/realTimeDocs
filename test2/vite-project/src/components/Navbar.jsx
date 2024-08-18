import React from 'react'
import Logo from '../assets/images/logo.png'
import { Link, NavLink } from 'react-router-dom'
import '../cssFiles/buttonsCss.css'
const Navbar = () => {
  return (
    <nav class="bg-transparent dark:bg-gray-900 w-full z-20  b dark:border-gray-600">
      <div class=" flex flex-wrap items-center justify-between mx-auto p-4 ">
         <a href="https://flowbite.com/" class="flex items-center space-x-3  ml-5">
            <img src={Logo} class="h-8" alt=""/>
            {/* <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Tapit</span> */}
         </a>
         <div class="flex md:order space-x-3 mr-5 ">
            <Link to='/login' type="button" className="px-9 py-[10px] text-white bg-stone-950 hover-transparent-and-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold text-[16px] rounded-lg text-sm  text-center dark:bg-blue-950 dark:hover:bg-blue-950 dark:focus:ring-blue-800">Login</Link>
         </div>   
      



      {/* <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button> */}
 
      </div>
</nav>
  )
}

export default Navbar