import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import folder from '../assets/images/folder.png'
import Logo from '../assets/images/logo.png'

const Home = () => {
    // useState[navelement, setNavelement] = useState(false)
    let isActive = false;
    const Navclass = () => {
        
    }

  return (
    <div className=" w-full  h-3/4  flex flex-col" >
        <div className="row rounded-lg mt-5 m-7 mb-3 pb-8" style={{ backgroundColor: '#8eddec' }}>
            <nav className="bg-transparent px-4">
                    <div className="grid grid-cols-8 h-16">
                        <div className="col-span-1 flex items-center justify-center ">
                          <img src={Logo} width="60" alt=""/>
                        </div>
                        <div className="col-span-6 place-items-center px-3 mx-4 hidden md:block">
                          <ul className="flex space-x-10 justify-center items-center h-full" >
                            {/* <!-- <li className="col-span-1 sm:hidden lg:block"></li> --> */}
                            <NavLink className="p-2 text-lg font-bold text-center hover-black-and-white">Home</NavLink>
                            <NavLink className="p-2 text-lg font-bold text-center hover-black-and-white">How it works</NavLink>
                            <NavLink className="p-2 text-lg font-bold text-center hover-black-and-white">FAQ</NavLink>
                            <NavLink className="p-2 text-lg font-bold text-center hover-black-and-white">pricing</NavLink>
                            {/* <!-- <li className="col-span-1 sm:hidden lg:block"></li> --> */}
                          </ul>
                        </div>
                        <div className="md:col-span-1 flex items-center justify-center ">
                          <Link to='/login' className="bg-transparent border-2 border-black rounded-lg px-5 py-2 font-bold hover:bg-black hover:text-white">Log in</Link>
                        </div>
                    </div>
                      
               
              </nav>

              
                  <div className="grid grid-cols-12 h-64  mt-8">
                      <div className="col-span-6  px-4 mt-4 flex flex-col items-center gap-4">
                              <span className="text-5xl font-bold block">Get Started !</span>
                              <span className="text-3xl font-bold text-center px-8">work with your mates on a real time file editor</span>
                              <div className="flex justify-center items-center gap-x-4  w-full mt-4">
                                    <button className="bg-black rounded-lg px-5 py-2  text-white hover-transparent-and-black">Get started</button>
                                    <button className="bg-black  text-white rounded-lg px-5 py-2 hover-transparent-and-black" style={{ fontFamily: 'Roboto' }}>see a demo</button>
                              </div>
                      </div>
                      <div className="col-span-6  mx-auto">
                        <img src={folder} alt=""/>
                      </div>
                  </div>
                  
                  
              
        </div>
        {/* <!-- bottom bar section --> */}
        <section className="mt-2 px-4">
            <div className="grid lg:grid-cols-4 grid-cols-2  px-3 gap-x-4">
                <div className="col-span-1 bg-indigo-400 p-2 px-4 pb-4 rounded-2xl">
                    <div className="card grid grid-rows-2">
                        <div className="row-span-1"></div>
                        <div className="row-span-1 grid grid-cols-2">
                            <div className="col-span-1">
                                <span className=" block">Active users</span>
                                <span className="font-bold text-4xl ">1M+</span>
                            </div>
                            <div className="col-span-1  grid justify-center items-end mb-1">
                                <img src={Logo} width="55" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 bg-indigo-400 p-2 px-4 rounded-2xl">
                    <div className="card grid grid-rows-2">
                        <div className="row-span-1"></div>
                        <div className="row-span-1 grid grid-cols-2">
                            <div className="col-span-1">
                                <span className=" block">Active users</span>
                                <span className="font-bold text-4xl ">1M+</span>
                            </div>
                            <div className="col-span-1  grid place-items-center">
                                <img src={Logo} width="55" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 bg-indigo-400 p-2 px-4 rounded-2xl">
                    <div className="card grid grid-rows-2">
                        <div className="row-span-1"></div>
                        <div className="row-span-1 grid grid-cols-2">
                            <div className="col-span-1">
                                <span className=" block">Active users</span>
                                <span className="font-bold text-4xl ">1M+</span>
                            </div>
                            <div className="col-span-1  grid place-items-center">
                                <img src={Logo} width="55" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 bg-indigo-400 p-2 px-4 rounded-2xl">
                    <div className="card grid grid-rows-2">
                        <div className="row-span-1"></div>
                        <div className="row-span-1 grid grid-cols-2">
                            <div className="col-span-1">
                                <span className=" block">Active users</span>
                                <span className="font-bold text-4xl ">1M+</span>
                            </div>
                            <div className="col-span-1  grid place-items-center">
                                <img src={Logo} width="55" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
       
            </div>
         </section>
        
     </div>
  )
}

export default Home