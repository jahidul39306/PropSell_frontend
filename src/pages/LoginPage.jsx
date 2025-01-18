import { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import useAxiosPublic from "../hooks/useAxiosPublic";

const LoginPage = () => {
    const { loginUser, setUser, setLoading, loginWithGoogle } = useContext(GlobalContext);
    const navigate = useNavigate();
    const [err, setErr] = useState(false);
    const location = useLocation();
    const [showPass, setShowPass] = useState(false);
    const axiosPublic = useAxiosPublic();

    // email pass login
    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        try {
            const userCredential = await loginUser(email, password);
            await setUser(userCredential.user);
            toast.success("Successfully logged in");
            navigate(location?.state ? location.state : '/');
        }
        catch (error) {
            setLoading(false);
            console.error(error);
            toast.error("Login failed");
            setErr(true);
        }
    }


    // google login
    const handleGoogleLogIn = async () => {
        try {
            const result = await loginWithGoogle();
            await axiosPublic.post('/add-user', { email: result.user.email, createdAt: new Date(), role: 'user', userName: result.user.displayName, firebase_uid: result.user.uid });
            setUser(result.user);
            toast.success("Successfully logged in");
            navigate(location?.state ? location.state : '/');
        }
        catch (error) {
            setLoading(false);
            console.error(error);
            toast.error("Login failed");
            setErr(true);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen p-1">
            <form onSubmit={handleSubmit} className="card-body max-w-lg bg-white shadow-lg rounded-md">
                {/* email */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black">Email</span>
                    </label>
                    <input name="email" type="email" placeholder="email" className="input input-bordered" />
                </div>

                {/* password */}
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text text-black">Password</span>
                    </label>
                    <input name="password" type={showPass ? "text" : "password"} placeholder="password" className="input input-bordered" />
                    <div
                        onClick={() => setShowPass(!showPass)}
                        className="text-lg absolute bottom-3 right-5">
                        {
                            showPass ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>
                        }

                    </div>
                </div>

                {/* error */}
                {
                    err && <p className="text-lg text-red-500 p-2">Login failed. Wrong password or email.</p>
                }
                {/* document.getElementsByName('email')[0].value */}
                <div className="mt-3 flex justify-between text-sm md:text-base">
                    <Link to='/registration' className="link link-hover text-black">New user? Register</Link>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Login</button>
                </div>
                <div className="space-y-5 mt-5">
                    <hr />
                    <p className="text-lg text-center text-black">or Login with:</p>
                    <div className="flex justify-center text-2xl">
                        <div
                            onClick={handleGoogleLogIn}
                            className="bg-red-600 p-2 rounded-full text-white cursor-pointer">
                            <FaGoogle />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;