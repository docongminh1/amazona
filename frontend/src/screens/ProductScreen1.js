import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';

function ProductScreen(props) {
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        return () => {
            //
        };
    }, []);

    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
    }

    return <div>
        <div className="back-to-result">
            <Link to="/">Trở lại</Link>
        </div>
        {loading ? <div>Loading...</div> :
            error ? <div>{error} </div> :
                (
                    <div className="details">
                        <div className="details-image">
                            <img src={product.image} alt="product" ></img>
                        </div>
                        <div className="details-info">
                            <ul>
                                <li>
                                    <h4>{product.name}</h4>
                                </li>
                                <li>
                                    {product.rating} Sao ({product.numReviews} Đánh giá)
                </li>
                                <li>
                                    Giá: <b>${product.price}</b>
                                </li>
                                <li>
                                    Mô tả:
                  <div>
                                        {product.description}
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="details-action">
                            <ul>
                                <li>
                                    Giá: {product.price}
                                </li>
                                <li>
                                    Tình trạng: {product.countInStock > 0 ? "Còn hàng" : "Hết hàng"}
                                </li>
                                <li>
                                    Số lượng: <select value={qty} onChange={(e) => { setQty(e.target.value) }}>
                                        {[...Array(product.countInStock).keys()].map(x =>
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        )}
                                    </select>
                                </li>
                                <li>
                                    {product.countInStock > 0 && <button onClick={handleAddToCart} className="button primary" >Thêm vào giỏ hàng</button>}
                                </li>
                            </ul>
                        </div>
                    </div>
                )
        }


    </div>
}
export default ProductScreen;