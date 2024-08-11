import React from 'react'
import loginImage from '../assets/images/login.png'
import '../cssFiles/login.css'






const Login = () => {
return (
    <>
        <div class="mx-auto mt-40 ">
            <div class=" flex justify-center sm:px-8 px-10">
                {/* <!-- <div class="col-span-2"></div> --> */}
                <div class="  grid grid-cols-1 md:grid-cols-2  shadow-2xl  rounded-2xl max-w-5xl">
                    <div class="col-span-1  rounded-s-2xl pb-5 ">
                        <img class="rounded-s-2xl hidden md:block" src="login.png" alt="" />
                    </div>
                    <div class="col-span-1 ">
                        <div class="sm:w-full w-96  h-full flex flex-col items-center justify-center bg-sky-200 md:rounded-e-2xl rounded-2xl  sm:mb-0" style={{ backgroundColor: '#8eddec' }}>
                            <img class="rounded-2xl md:hidden min-w-40 " src="login.png" alt="" />

                            <h1 class="text-4xl font-bold mt-5" style={{ color: '#2f2e41' }}>Login</h1>
                            {/* <!-- login form --> */}
                            <form action="" method="post" class="w-3/4 flex flex-col items-center mt-6 gap-y-1 ">
                                <input type="text" name="username" id="username" placeholder="Username" class="w-full rounded-md p-2  m-2 outline-none mt-7" />
                                <input type="password" name="password" id="password" placeholder="Password" class="w-full rounded-md p-2 m-2 outline-none mt-4" />
                                
                                <button type="submit" class=" mt-10 btn text-white rounded-lg px-7 py-2 font-bold hover-transparent-and-black" >Register</button>
                                <span  class=" mt-4 bg-transparent  px-7 py-2  ">Not a member ? <a href="#" class="font-bold hover:text-white cursor-pointer" style={{ color: '#2f2e41' }}>Sign up</a></span>
                                
                            </form>
                            <br />
                            <br />
                        </div>
                    </div>
                </div>
                {/* <!-- <div class="cols-span-2"></div> --> */}
            </div>
        </div>
    </>
)
} 

export default Login

