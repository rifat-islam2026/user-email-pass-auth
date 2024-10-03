
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import auth from "../../firebase/firebase-config";

function Login() {
    const [loginError, setLoginError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef(null);



    const handelLogin = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)

        // reset error 
        setLoginError('');
        setSuccess('')

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                if (result.user.emailVerified) {
                    setSuccess('User Login successfully')
                }
                else {
                    alert('Please check your email and verify.')
                }
            })
            .catch(error => {
                console.log(error.message)
                setLoginError(error.message)
            })
    }
    const handelForgetPass = () => {
        const email = emailRef.current.value;
        if (!email) {
            alert('Please provided a email!')
            return;
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            alert('Please write a valid email address!')
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Please checked your email.')
            })
            .catch((error) => {
                setLoginError(error.message)
            });

    }


    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl mb-4 font-bold">Login now!</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handelLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                ref={emailRef}
                                type="email"
                                name="email"
                                placeholder="email"
                                className="input input-bordered"
                                required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                name="password"
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                required />
                            <label className="label">
                                <a
                                    onClick={handelForgetPass}
                                    href="#"
                                    className="label-text-alt link link-hover">
                                    Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <span className="p-3">New to this website? please <Link to="/register">Register</Link></span>
                        {
                            loginError && <p className="text-red-600 p-3">{loginError}</p>
                        }
                        {
                            success && <p className="text-green-600 p-3">{success}</p>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
