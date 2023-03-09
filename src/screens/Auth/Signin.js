import { faFacebookF, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Image/logo.png";
import "../../styles/Auth/Signin.scss";
import ModalSigin from '../Modals/ModalSignin';
function Signin() {
  const URLSignin = "http://ec2-54-193-79-196.us-west-1.compute.amazonaws.com/api/login";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const initialErrors = Object.freeze({
    email: "",
    password: "",
    error: "",
    message: ""
  })

  const [errors, setErrors] = useState(initialErrors);

  const handleSigin = (e) => {
    resetErrors()
    e.preventDefault();
    axios.post(URLSignin, { email, password })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", res.data.username);
        localStorage.setItem("user_id", res.data.id);
        console.log("Signin:", res)
        setIsModalOpen(true)
        localStorage.setItem('shopOnwer', res.data.shopOwner)

      })
      .catch(err => {
        console.log("Err: ", err)
        console.log("Err Mess: ", err.response)
        if (err.response.status == 422) {
          setErrors(err.response.data.errors)
        }
        else {
          setErrors({ message: err.response.data.message })
        }
      })
  }

  const resetErrors = () => {
    setErrors(initialErrors)
  }

  return (
    <>
      <div id="container">
        {isModalOpen && <ModalSigin closeModal={setIsModalOpen} />}
        <div className='container-Signin'>
          <div className="signin">
            <div className="signin__left">
              <div className="signin__left--logo">
                <img src={logo} alt="" style={{ width: 100, height: 200 }} />
              </div>
              <div className="signin__left--text">
                <p className="signin__left--text-tittle">
                  Welcome to Plant &amp; Flower
                </p>
                <p className="signin__left--text-desc">
                  Please to meet you! Wish you have health and success
                </p>
              </div>
            </div>
            <div className="signin__right">
              <form action="" className='signin__right--form'>
                <p className='signin__right--title'>Sign In</p>
                <input type="text" className="email" name="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                {errors.email && <div style={{ color: "rgb(173, 3, 3)" }}>{errors.email}</div>}
                <input type="password" className="password" name="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                {errors.password && <div style={{ color: "rgb(173, 3, 3)" }}>{errors.password}</div>}
                {errors.error && <div style={{ color: "rgb(173, 3, 3)" }}>{errors.error}</div>}
                {errors.message && <div style={{ color: "rgb(173, 3, 3)" }}>{errors.message}</div>}
                <input type="submit" className="submit" value="Sign in" onClick={handleSigin} />
                <a className="forgotpassword" href=''>Forgot password</a>
              </form>
              <div className='signin__right--icon'>
                <div className='faFacebookF'><FontAwesomeIcon icon={faFacebookF} className='faFacebookF_icon' /><p>Facebook</p></div>
                <div className="faGoogle"><FontAwesomeIcon icon={faGoogle} className='faGoogle_icon' /><p>Google</p></div>
                <div className="faTwitter"><FontAwesomeIcon icon={faTwitter} className='faTwitter_icon' /><p>Twitter</p></div>
              </div>
              <p className='no__account'>Don't you have an? <Link to="/Sup">Sign up</Link> now</p>
            </div>
          </div >
        </div>

      </div >
    </>

  )
}
export default Signin