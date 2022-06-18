import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { client, urlFor } from '../../lib/client';
import { NewProduct } from '../../components';
import { useStateContext } from '../../context/StateContext';
import {Rating} from "@mui/material";

const NewProductDetails = ({ newProduct, newProducts }) => {
    const { image, name, details, price } = newProduct;
    const [index, setIndex] = useState(0);
    const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

    const handleBuyNow = () => {
        onAdd(newProduct, qty);

        setShowCart(true);
    }

    return (
        <div>
            <div className="product-detail-container">
                <div>
                    <div className="image-container">
                        <img src={urlFor(image && image[index])} className="product-detail-image" />
                    </div>
                    <div className="small-images-container">
                        {image?.map((item, i) => (
                            <img
                                key={i}
                                src={urlFor(item)}
                                className={i === index ? 'small-image selected-image' : 'small-image'}
                                onMouseEnter={() => setIndex(i)}
                            />
                        ))}
                    </div>
                </div>

                <div className="product-detail-desc">
                    <h1>{name}</h1>
                    <div className="reviews">
                        <div>
                            <Rating value={newProduct.rating} readOnly></Rating>
                        </div>
                        <p>
                            ({newProduct.numReviews})
                        </p>
                    </div>
                    <h4>Details: </h4>
                    <p>{details}</p>
                    <p className="price">Rs. {price}</p>
                    <div className="quantity">
                        <h3>Quantity:</h3>
                        <p className="quantity-desc">
                            <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
                            <span className="num">{qty}</span>
                            <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
                        </p>
                    </div>
                    <div className="buttons">
                        <button type="button" className="add-to-cart" onClick={() => onAdd(newProduct, qty)}>Add to Cart</button>
                        <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
                    </div>
                </div>
            </div>

            <div className="maylike-products-wrapper">
                <h2>More new Arrivals</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {newProducts.map((item) => (
                            <NewProduct key={item._id} newProduct={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "newProduct"] {
    slug {
      current
    }
  }
  `
    const newProducts = await client.fetch(query);

    const paths = newProducts.map((newProduct) => ({
        params: {
            slug: newProduct.slug.current
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: { slug }}) => {
    const query = `*[_type == "newProduct" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "newProduct"]'

    const newProduct = await client.fetch(query);
    const newProducts = await client.fetch(productsQuery);

    console.log(newProduct);

    return {
        props: { newProducts, newProduct }
    }
}

export default NewProductDetails
