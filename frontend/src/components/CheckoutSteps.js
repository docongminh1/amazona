import React from 'react';
function CheckoutSteps(props) {
  return <div className="checkout-steps">
    <div className={props.step1 ? 'active' : ''} >Đăng nhập</div>
    <div className={props.step2 ? 'active' : ''} >Giao hàng</div>
    <div className={props.step3 ? 'active' : ''} >Thanh toán</div>
    <div className={props.step4 ? 'active' : ''} >Đặt hàng</div>
  </div>
}

export default CheckoutSteps;