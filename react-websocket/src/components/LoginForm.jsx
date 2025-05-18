import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import loginImage from '../assets/images/login.png';
import registerImage from '../assets/images/register2.png';
import '../cssFiles/buttonsCss.css';
import ReactCardFlip from 'react-card-flip'


const socketURL = import.meta.env.VITE_SOCKET_URL + ":" + import.meta.env.VITE_SOCKET_PORT;

const Login = () => {

    const [isFlipped,setFlipped] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const navigate = useNavigate(); // Hook for navigation

    function flipCard(event){
        setFlipped(!isFlipped);
        event.preventDefault(); // Prevent default form submission
    }

    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent default form submission

        try {
            const response = await axios.post(`${socketURL}/login`, {
                email: email,
                password: password
            });
            console.log(response.data);
            
            localStorage.setItem('token' , response.data.token)
            alert("Logged in successfully!");
            console.log(response.data.username);
            window.location.href = '/docs';
            // navigate('/docs', { state: { user: { username: response.data.username } } });
            // navigate('/docs'); // Use navigate for redirecting
        } catch (error) {
            console.error(error.response.data.message);
            alert(`${error}\nmessage: ${error.response.data.message}` );
            // alert("Login failed. Please check your credentials.");
        }
    };


    const handleRegistration = async (event) => {
        event.preventDefault(); // Prevent default form submission

        try {
            const response = await axios.post(`${socketURL}/register`, {
                username : username,
                email: email,
                password: password
            });
            console.log(response.data);
            
            localStorage.setItem('token', response.data.token); // Store user id in local storage

            alert("Registered successfully!" , response.data);
            window.location.href = '/docs';
            // navigate('/docs'); // Use navigate for redirecting
        } catch (error) {
            console.error(error);
            alert("Registration failed. Please check your credentials.");
        }
    };

    return (
        <ReactCardFlip flipDirection='horizontal' isFlipped = {isFlipped}>
        <div className="card mt-32">
            <div className="flex justify-center sm:px-8 px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 shadow-2xl rounded-2xl max-w-5xl">
                    <div className="col-span-1 rounded-s-2xl pb-5">
                        <img className="rounded-s-2xl hidden md:block" src={loginImage} alt="" />
                    </div>
                    <div className="col-span-1">
                        <div
                            className="sm:w-full w-96 h-full flex flex-col items-center justify-center bg-sky-200 md:rounded-e-2xl rounded-2xl sm:mb-0"
                            style={{ backgroundColor: '#8eddec' }}
                        >
                            <img className="rounded-2xl md:hidden min-w-40" src={loginImage} alt="" />
                            <h1 className="text-4xl font-bold mt-5" style={{ color: '#2f2e41' }}>
                                Login
                            </h1>
                            <form onSubmit={handleLogin} className="w-3/4 flex flex-col items-center mt-6 gap-y-1">
                                <input
                                    type="text"
                                    name="email"
                                    id="email1"
                                    placeholder="Email"
                                    className="w-full rounded-md p-2 m-2 outline-none mt-7 border-none"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    id="password1"
                                    placeholder="Password"
                                    className="w-full rounded-md p-2 m-2 outline-none mt-4 border-none"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="mt-10 btn text-white rounded-lg px-10 py-2 font-bold hover-transparent-and-black"
                                >
                                    Login
                                </button>
                                <span className="mt-4 bg-transparent px-7 py-2">
                                    Not a member?{' '}
                                    <button onClick={flipCard}
                                        href="#"
                                        className="font-bold hover:text-white cursor-pointer"
                                        style={{ color: '#2f2e41' }}
                                    >
                                        Sign up
                                    </button>
                                </span>
                            </form>
                            <br />
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="card card-back mt-32">
        <div className="flex justify-center sm:px-8 px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 shadow-2xl rounded-2xl max-w-5xl">

                <div className="col-span-1">
                    <div
                        className="sm:w-full w-96 h-full flex flex-col items-center justify-center bg-sky-200 md:rounded-e-2xl rounded-2xl sm:mb-0"
                        style={{ backgroundColor: '#8eddec' }}
                    >
                        <img className="rounded-2xl md:hidden min-w-40" src={registerImage} alt="" />
                        <h1 className="text-4xl font-bold mt-8" style={{ color: '#2f2e41' }}>
                            Register
                        </h1>
                        <form onSubmit={handleRegistration} className="w-3/4 flex flex-col items-center mt-6 gap-y-1">
                        <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Username"
                                className="w-full rounded-md p-2 m-2 outline-none mt-7 border-none"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="text"
                                name="email"
                                id="email2"
                                placeholder="Email"
                                className="w-full rounded-md p-2 m-2 outline-none mt-4 border-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                name="password"
                                id="password2"
                                placeholder="Password"
                                className="w-full rounded-md p-2 m-2 outline-none mt-4 border-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="mt-10 btn text-white rounded-lg px-7 py-2 font-bold hover-transparent-and-black"
                            >
                                Register
                            </button>
                            <span className="mt-4 bg-transparent px-7 ">
                                have account?{' '}
                                <button onClick={flipCard}
                                    href="#"
                                    className="font-bold hover:text-white cursor-pointer"
                                    style={{ color: '#2f2e41' }}
                                >
                                    Login
                                </button>
                            </span>
                        </form>
                        <br />
                        <br />
                    </div>
                </div>
                <div className="col-span-1 rounded-s-2xl pb-5 grid place-items-center">
                    <img className="rounded-s-2xl hidden md:block" src={registerImage} alt="" />
                </div>
            </div>
        </div>
    </div>
    </ReactCardFlip>

    );
};

export default Login;
