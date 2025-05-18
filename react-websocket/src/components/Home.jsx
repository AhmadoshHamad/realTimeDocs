import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import folder from '../assets/images/folder.png'
// import Logo from '../assets/images/logo.png'
import Navbar from './Navbar'
const Home = () => {
    // useState[navelement, setNavelement] = useState(false)
    let isActive = false;


  return (
    <div className=" w-11/12  h-3/4  flex flex-col bg-white mt-6 pt-4 rounded-xl" >
        <div className="row rounded-3xl mt-5 m-7 mb-3 pb-8" style={{ backgroundColor: '#8eddec' }}>
            {/* <nav className="bg-transparent px-4">
                    <div className="grid grid-cols-8 h-16">
                        <div className="col-span-1 flex items-center justify-center ">
                          <img src={Logo} width="60" alt=""/>
                        </div>
                        <div className="col-span-6 place-items-center px-3 mx-4 hidden md:block">
                          <ul className="flex space-x-10 justify-center items-center h-full" >
                         
                            <NavLink className="p-2 text-lg font-bold text-center hover-black-and-white">Home</NavLink>
                            <NavLink className="p-2 text-lg font-bold text-center hover-black-and-white">How it works</NavLink>
                            <NavLink className="p-2 text-lg font-bold text-center hover-black-and-white">FAQ</NavLink>
                            <NavLink className="p-2 text-lg font-bold text-center hover-black-and-white">pricing</NavLink>
                            
                          </ul>
                        </div>
                        <div className="md:col-span-1 flex items-center justify-center ">
                          <Link to='/login' className="bg-transparent border-2 border-black rounded-lg px-5 py-2 font-bold hover:bg-black hover:text-white">Log in</Link>
                        </div>
                    </div>
                      
               
              </nav> */}
              

<Navbar/>
                




              
                  <div className="grid grid-cols-12 h-64  mt-8">
                      <div className="col-span-12 sm:col-span-8 md:col-span-6  px-4 mt-4 flex flex-col items-center gap-4 ">
                              <span className="text-5xl font-bold block">Get Started !</span>
                              <span className="text-3xl font-bold text-center px-8 max-[400px]:hidden">work with your mates on a real time file editor</span>
                              
                              <div className="flex justify-center items-center gap-x-4  w-full mt-4 max-[400px]:hidden">
                                    <a href='/login' className="bg-black rounded-lg px-5 py-2  text-white hover-transparent-and-black duration-700">Get started</a>
                                    <a href='/playground' className="bg-transparent border border-black  rounded-lg px-5 py-2 hover:bg-black hover:text-white duration-500" style={{ fontFamily: 'Roboto' }}>Try it now !</a>
                              </div>
                      </div>
                      <div className="hidden sm:flex sm:col-span-4 md:col-span-6  mx-auto  items-center">
                        <img src={folder} width={'300px'} alt=""/>
                      </div>
                  </div>
                  
                  
              <br /><br />
        </div>
        {/* <!-- bottom bar section --> */}
        <section className="mt-2 px-4 bg-white pb-6 rounded-3xl">
            <div className="grid lg:grid-cols-4  sm:grid-cols-2 grid-cols-1  px-3 gap-4 ">

            <div className="col-span-1 bg-[#a8afff] p-2 px-4 pb-4 rounded-3xl">
                    <div className="card grid grid-rows-2">
                        <div className="row-span-1"></div>
                        <div className="row-span-1 grid grid-cols-2  ">
                            <div className="col-span-1 ms-4">
                                <span className=" block text-nowrap">Active users</span>
                                <span className="font-bold text-4xl ">1M+</span>
                            </div>
                            <div className="col-span-1 grid place-items-center">
                            {/* <svg xmlns="http://www.w3.org/2000/svg" height="75px" viewBox="0 -960 960 960" width="75px" fill="#6875f5"><path d="M140-160q-24 0-42-18.5T80-220v-520q0-23 18-41.5t42-18.5h281l60 60h339q23 0 41.5 18.5T880-680v460q0 23-18.5 41.5T820-160H140Zm0-60h680v-460H456l-60-60H140v520Zm0 0v-520 520Z"/></svg> */}
                                <div className="flex items-center h-[75px]" >
                                
                                    <span className='rounded-full p-2 px-[15px] bg-slate-800 text-white font-bold text-center' style={{ position: 'relative', zIndex: 3, left: '0px' }}>A</span>
                                    <span className='rounded-full p-2 px-[15px] bg-red-800 text-white font-bold text-center' style={{ position: 'relative', zIndex: 2, left: '-8px' }}>B</span>
                                    <span className='rounded-full p-2 px-[15px] bg-orange-500 text-white font-bold text-center' style={{ position: 'relative', zIndex: 1, left: '-16px' }}>C</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 bg-[#a8afff] p-2 px-4 pb-4 rounded-3xl">
                    <div className="card grid grid-rows-2">
                        <div className="row-span-1"></div>
                        <div className="row-span-1 grid grid-cols-2 ">
                            <div className="col-span-1 ms-4">
                                <span className=" block text-nowrap">Files stored</span>
                                <span className="font-bold text-4xl ">15M+</span>
                            </div>
                            <div className="col-span-1  grid place-items-center ">
                                <svg xmlns="http://www.w3.org/2000/svg" height="75px" viewBox="0 -960 960 960" width="75px" fill="#6875f5"><path d="M140-160q-24 0-42-18.5T80-220v-520q0-23 18-41.5t42-18.5h281l60 60h339q23 0 41.5 18.5T880-680v460q0 23-18.5 41.5T820-160H140Zm0-60h680v-460H456l-60-60H140v520Zm0 0v-520 520Z"/></svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 bg-[#a8afff] p-2 px-4 pb-4 rounded-3xl">
                    <div className="card grid grid-rows-2">
                        <div className="row-span-1"></div>
                        <div className="row-span-1 grid grid-cols-2 ">
                            <div className="col-span-1 ms-4">
                                <span className=" block text-nowrap">Words written</span>
                                <span className="font-bold text-4xl ">6G+</span>
                            </div>
                            <div className="col-span-1  grid place-items-center justify-end me-4">
                            <svg xmlns="http://www.w3.org/2000/svg" height="75px" viewBox="0 -960 960 960" width="75px" fill="#6875f5"><path d="M380-337 160-557l43-42 177 177 378-378 42 43-420 420ZM200-160v-60h560v60H200Z"/></svg>
                            </div>
                        </div>
                    </div>
                </div>
                <a href="/playground" className="col-span-1 border border-black border-3  p-2 px-4 pb-4 rounded-3xl cursor-pointer">
                    <div className="card grid grid-rows-2">
                        <div className="row-span-1 flex justify-end">
                        <svg xmlns="http://www.w3.org/2000/svg" height="70px" viewBox="0 -960 960 960" width="70px" fill="#000000"><path d="m202-160-42-42 498-498H364v-60h396v396h-60v-294L202-160Z"/></svg>
                        </div>
                        <div className="row-span-1 grid grid-cols-2 ">
                            <div className="col-span-2 ms-4">
                                <span className=" block">Request free</span>
                                <span className="font-bold text-4xl ">Demo</span>
                            </div>
                            <div className="col-span-1  grid place-items-center">
                           
                            </div>
                        </div>
                    </div>
                </a>
       
            </div>
         </section>
        
     </div>
  )
}

export default Home

