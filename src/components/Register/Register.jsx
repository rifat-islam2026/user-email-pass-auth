import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import auth from "../../firebase/firebase-config";

function Register() {
    const [registerError,setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPass,setShowPass] = useState(false);
    
    const handelRegister=(e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(email, password)
        
        // reset error 
        setRegisterError('');
        setSuccess('')

        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters or longer!')
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Your password should have at last or one upper case characters.')
            return;
        }
        else if (!accepted) {
            setRegisterError('Please accept your terms and condition')
            return;
        }
        // create user 
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                setSuccess('Register Successfully')
                console.log(loggedUser)
            })
            .catch(error => {
            setRegisterError(error.message)
        })

    }

  return (
      <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-col">
              <div className="text-center lg:text-left">
                  <h1 className="text-5xl mb-4 font-bold">Register now!</h1>
              </div>
              <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                  <form onSubmit={handelRegister} className="card-body">
                      <div className="form-control">
                          <label className="label">
                              <span className="label-text">Email</span>
                          </label>
                          <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                      </div>
                      <div className="form-control relative">
                          <label className="label">
                              <span className="label-text">Password</span>
                          </label>
                          <input
                              type={showPass ? "text" : "password"}
                              placeholder="password"
                              name="password"
                              className="input input-bordered "
                              required /> 
                          <span
                              onClick={()=>setShowPass(!showPass)}
                              className="absolute left-[280px] top-[52px]">
                              {
                                  showPass ? <FaEye /> : <FaEyeSlash/>
                              }
                          </span>
                          
                          <div className="flex item-center gap-3 py-3">
                              <input type="checkbox" name="terms" />
                              <label htmlFor="terms">Please accept your terms and condition</label>
                          </div>
                          <label className="label">
                              <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                          </label>
                      </div>
                      <div className="form-control mt-6">
                          <button type="submit" className="btn btn-primary">Submit</button>
                      </div>

                      {
                          registerError && <p className="text-red-600 p-3">{registerError}</p>
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

export default Register
