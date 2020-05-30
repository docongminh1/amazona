import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder, detailsOrder, payOrder } from '../actions/orderActions';
import PaypalButton from '../components/PaypalButton';
function OrderScreen(props) {

    const orderPay = useSelector(state => state.orderPay);
    const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
    const dispatch = useDispatch();
    useEffect(() => {
        if (successPay) {
            props.history.push("/profile");
        } else {
            dispatch(detailsOrder(props.match.params.id));
        }
        return () => {
        };
    }, [successPay]);

    const handleSuccessPayment = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    }

    const orderDetails = useSelector(state => state.orderDetails);
    const { loading, order, error } = orderDetails;

    return loading ? <div>Loading ...</div> : error ? <div>{error}</div> :

        <div>
            <div className="placeorder">
                <div className="placeorder-info">
                    <div>
                        <h3>
                            Giao hàng
          </h3>
                        <div>
                            {order.shipping.address}, {order.shipping.city},
          {order.shipping.postalCode}, {order.shipping.country},
          </div>
                        <div>
                            {order.isDelivered ? "Giao hàng tại " + order.deliveredAt : "Không giao hàng"}
                        </div>
                    </div>
                    <div>
                        <h3>Thanh toán</h3>
                        <div>
                            Hình thức thanh toán: {order.payment.paymentMethod}
                        </div>
                        <div>
                            {order.isPaid ? "Đã thanh toán " + order.paidAt : "Chưa thanh toán"}
                        </div>
                    </div>
                    <div>
                        <ul className="cart-list-container">
                            <li>
                                <h3>
                                    Sản phẩm
          </h3>
                                <div>
                                    Giá
          </div>
                            </li>
                            {
                                order.orderItems.length === 0 ?
                                    <div>
                                        Giỏ hàng rỗng
          </div>
                                    :
                                    order.orderItems.map(item =>
                                        <li key={item._id}>
                                            <div className="cart-image">
                                                <img src={item.image} alt="product" />
                                            </div>
                                            <div className="cart-name">
                                                <div>
                                                    <Link to={"/product/" + item.product}>
                                                        {item.name}
                                                    </Link>

                                                </div>
                                                <div>
                                                    Số lượng: {item.qty}
                                                </div>
                                            </div>
                                            <div className="cart-price">
                                                ${item.price}
                                            </div>
                                        </li>
                                    )
                            }
                        </ul>
                    </div>


                </div>
                <div className="placeorder-action">
                    <ul>
                        
                        <li>
                            <h3>Hóa đơn</h3>
                        </li>
                        <li>
                            <div>Giá tiền</div>
                            <div>${order.itemsPrice}</div>
                        </li>
                        <li>
                            <div>Phí giao hàng</div>
                            <div>${order.shippingPrice}</div>
                        </li>
                        <li>
                            <div>Thuế</div>
                            <div>${order.taxPrice}</div>
                        </li>
                        <li>
                            <div>Tổng tiền</div>
                            <div>${order.totalPrice}</div>
                        </li>
                        <li className="placeorder-actions-payment">
                            {loadingPay && <div>Hoàn tất thanh toán...</div>}
                            {!order.isPaid &&
                                <PaypalButton
                                    amount={order.totalPrice}
                                    onSuccess={handleSuccessPayment} />
                            }
                        </li>
                    </ul>



                </div>

            </div>
        </div>

}

export default OrderScreen;