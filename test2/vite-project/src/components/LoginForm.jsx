import React, { useState } from 'react';
import axios from 'axios';
import loginImage from '../assets/images/login.png'
import '../cssFiles/login.css'







const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        
            axios.post('http://localhost:5000/login', {
                username : username,
                password : password
            }).then((response) => {
                alert(response);
            }).catch((error) => {
                console.error(error);
            });
         
            
            localStorage.setItem('token', response.data.access_token);
            alert("Logged in successfully!");
            return <Redirect to="/" />;
            // redirect to home page
            // window.location.href = '/home';

        };
    




return (
    <>
        <div className="mx-auto mt-32 ">
            <div className=" flex justify-center sm:px-8 px-10">
                {/* <!-- <div className="col-span-2"></div> --> */}
                <div className="  grid grid-cols-1 md:grid-cols-2  shadow-2xl  rounded-2xl max-w-5xl">
                    <div className="col-span-1  rounded-s-2xl pb-5 ">
                        <img className="rounded-s-2xl hidden md:block" src="login.png" alt="" />
                    </div>
                    <div className="col-span-1 ">
                        <div className="sm:w-full w-96  h-full flex flex-col items-center justify-center bg-sky-200 md:rounded-e-2xl rounded-2xl  sm:mb-0" style={{ backgroundColor: '#8eddec' }}>
                            <img className="rounded-2xl md:hidden min-w-40 " src={loginImage} alt="" />

                            <h1 className="text-4xl font-bold mt-5" style={{ color: '#2f2e41' }}>Login</h1>
                            {/* <!-- login form --> */}
                            <form action="" method="post" className="w-3/4 flex flex-col items-center mt-6 gap-y-1 ">
                                <input type="text" name="username" id="username" placeholder="Username" className="w-full rounded-md p-2  m-2 outline-none mt-7" value={username} onChange={(e) => setUsername(e.target.value)}/>
                                <input type="password" name="password" id="password" placeholder="Password" className="w-full rounded-md p-2 m-2 outline-none mt-4" value={password}  onChange={(e) => setPassword(e.target.value)} />
                                
                                <button type="submit" className=" mt-10 btn text-white rounded-lg px-7 py-2 font-bold hover-transparent-and-black" onClick={handleLogin} >Register</button>
                                <span  className=" mt-4 bg-transparent  px-7 py-2  ">Not a member ? <a href="#" className="font-bold hover:text-white cursor-pointer" style={{ color: '#2f2e41' }}>Sign up</a></span>
                                
                            </form>
                            <br />
                            <br />
                        </div>
                    </div>
                </div>
                {/* <!-- <div className="cols-span-2"></div> --> */}
            </div>
        </div>
    </>
)
} 

export default Login

