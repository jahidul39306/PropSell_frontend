import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { toast } from 'react-toastify';
import { GlobalContext } from "../provider/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";

const RegistrationPage = () => {
    const [showPass, setShowPass] = useState(false);
    const [err, setErr] = useState("");
    const { createUser, setUser, setLoading, updateUserProfile, createUserWithGoogle } = useContext(GlobalContext)
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        const photoURL = event.target.photoURL.value;


        // email verification
        if (!email) {
            toast.error('Email can not be empty.');
            setErr('Email can not be empty.');
            return
        }

        // name
        if (!name) {
            toast.error('Name can not be empty.');
            setErr('Name can not be empty.');
            return
        }

        // password empty check
        if (!password) {
            toast.error('password can not be empty.');
            setErr('password can not be empty.');
            return
        }

        // password regex check
        const regex = /^(?=.*[A-Z])(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;
        if (!regex.test(password)) {
            toast.error('Password must have one upper case, one lower case and minimum of 6 character.');
            setErr('Password must have one upper case, one special character and minimum of 6 character.');
            return
        }

        try {
            const userCredential = await createUser(email, password);
            await setUser(userCredential.user);
            await axiosPublic.post('/add-user', { email: email, createdAt: new Date(), role: 'user', userName: name, firebase_uid: userCredential.user.uid });
            await updateUserProfile({ displayName: name, photoURL: photoURL });
            setLoading(false);
            toast.success('Registration Successfull');
            navigate('/');
        }
        catch (error) {
            setLoading(false);
            toast.error(error.message);
            setErr(error.message);
        }
    }

    // google registration
    const handleGoogleSignIn = async () => {
        try {
            const userCredential = await createUserWithGoogle();
            await setUser(userCredential.user);
            await axiosPublic.post('/add-user', { email: userCredential.user.email, createdAt: new Date(), role: 'user', userName: userCredential.user.displayName, firebase_uid: userCredential.user.uid });
            toast.success('Registration Successfull');
            navigate('/');
        }
        catch (error) {
            setLoading(false);
            toast.error(error.message);
            setErr(error.message);
        }
    }

    return (
        <div>
            <div className="flex justify-center items-center min-h-screen p-1">
                <form onSubmit={handleSubmit} className="card-body max-w-lg bg-white shadow-lg rounded-md">
                    {/* name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Name</span>
                        </label>
                        <input name="name" type="text" placeholder="name" className="input input-bordered" required />
                    </div>

                    {/* photoURL */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Photo URL (optional)</span>
                        </label>
                        <input name="photoURL" type="text" placeholder="photo URL" className="input input-bordered" />
                    </div>

                    {/* email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Email</span>
                        </label>
                        <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                    </div>

                    {/* password */}
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text text-black">Password</span>
                        </label>
                        <input name="password" type={showPass ? "text" : "password"} placeholder="password" className="input input-bordered" required />
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
                        err && <p className="text-lg text-red-500 p-2">{err}</p>
                    }

                    <div className="mt-3 flex justify-between text-sm md:text-base">
                        <Link to='/login' className="link link-hover text-black">Already a user? Login</Link>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Register</button>
                    </div>
                    <div className="space-y-5 mt-5">
                        <hr />
                        <p className="text-lg text-center text-black">or Register with:</p>
                        <div className="flex justify-center text-2xl">
                            <div
                                onClick={handleGoogleSignIn}
                                className="bg-red-600 p-2 rounded-full text-white cursor-pointer">
                                <FaGoogle />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;