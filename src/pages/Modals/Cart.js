import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "../../styles/Modal/Cart.scss";

const Cart = () => {
  const navigate = useNavigate()
  const AlertCartSuccess = () => {
    Swal.fire({
      position: 'center',
      fontSize: 18,
      color: "#3c7026",
      icon: 'success',
      title: 'Item has been added to your shopping cart',
      showConfirmButton: false,
      timer: 1500
    })
  }
  const AlertCartError = () => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Your cart! The quantity must be less or equal than product quantity!',
      button: "Ok",
    })
  }

  const AlertSendSuccess = () => {
    Swal.fire({
      position: 'center',
      fontSize: 18,
      color: "#3c7026",
      icon: 'success',
      title: 'The OTP verification code has been sent to your Email. Please enter...',
      showConfirmButton: false,
      timer: 1500
    })
  }
  const AlertPaymentSuccess = () => {
    Swal.fire({
      color: "#3c7026",
      icon: 'success',
      title: 'Check your email address to see bill detail.',
      button: "Go To Homepage",
    })
      .then(function () {
        navigate("/")
      })
  }
  const AlertPaymentError = () => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please enter your address!',
      button: "Ok",
    })
  }
  return {
    AlertCartError, AlertCartSuccess, AlertSendSuccess, AlertPaymentError, AlertPaymentSuccess
  }
}
export default Cart
