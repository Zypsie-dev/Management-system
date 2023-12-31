import { useState } from "react"
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
function Login(props){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const title=props.title;
    const setIsLogged = props.setIsLogged;
    return (<section className="bg-gray-50 dark:bg-gray-900 w-screen h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
            <a href="#" className="flex items-center mb-12 text-2xl font-semibold text-gray-900 dark:text-white">
                Zypsie
            </a>
            <div
                className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1
                        className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        {title}
                    </h1>
                    {error && <Alert severity="error">{error}</Alert>}
                    {success && <Alert severity="success">{success}</Alert>}
                    <div className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                Username</label>
                            <input type="username" name="username" onChange={(e) => setUsername(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Username" required=""/>
                        </div>
                        <div>
                            <label 
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" onChange={(e) => setPassword(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required=""/>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        required=""/>
                                </div>
                                <div className="ml-3 text-sm">
                                    <label className="text-gray-500 dark:text-gray-300">Remember
                                        me</label>
                                </div>
                            </div>
                            {title ==="Login" ? <a href="#"
                                className="text-sm font-medium text-primary-600 hover:underline dark:text-gray-300">Forgot
                                password?</a>: null}
                        </div>
                        {title === "Login" ? <button
                            onClick={() => {
                                setError(null)
                                setSuccess(null)
                                console.log("Logging in...")
                                window.ipcRender.invoke('login', { username, password }).then((res) => {
                                        console.log(res)
                                        if (!res.success)
                                            setError(res.message)
                                        else
                                            {
                                                setSuccess(res.message)
                                                window.ipcRender.send('login_success')
                                            }
                                    })
                                    .catch((error) => {
                                        console.error("Error:", error);
                                    });
                            }}
                            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            {title}</button>
                            : <button
                            onClick={() => {
                                setError(null)
                                setSuccess(null)
                                console.log("Processing...")
                                console.log(window.ipcRender)
                                window.ipcRender.invoke('register', { username, password }).then((res) => {
                                        console.log(res)
                                        if (!res.success)
                                            setError(res.message)
                                        else
                                            setSuccess(res.message)
                                    }   
                                )
                                }}
                            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            {title}</button>
                            }
                    </div>
                    {title === "Login" ? <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                        <Link to="/register"
                            className="text-primary-600 hover:underline dark:text-primary-400">Create
                            an account</Link>
                    </p> : null}
                </div>
            </div>
        </div>
    </section>)
}
export default Login;