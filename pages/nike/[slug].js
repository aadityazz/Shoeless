import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { client, urlFor } from '../../lib/client';
import { Nike } from '../../components';
import { useStateContext } from '../../context/StateContext';
import {Rating} from "@mui/material";

const NikeDetails = ({ nike, nikes }) => {
    const { image, name, details, price } = nike;
    const [index, setIndex] = useState(0);
    const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

    const handleBuyNow = () => {
        onAdd(nike, qty);

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
                            <Rating value={nike.rating} readOnly></Rating>
                        </div>
                        <p>
                            ({nike.numReviews})
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
                        <button type="button" className="add-to-cart" onClick={() => onAdd(nike, qty)}>Add to Cart</button>
                        <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
                    </div>
                </div>
            </div>

            <div className="product-detail-desc">
                <h2>About Nike</h2>
                <img src={"https://www.ajio.com/_ui/brand-logo/nike.jpg"}/>
                <p>Powerful, strong, durable – every athlete and their clothes. With innovative sportswear designed to
                    bring optimum comfort and support, Nike brings to you the best you’ll ever get. Shop for Nike sports
                    shoes now with shoeless!
                    Choose from a variety of styles
                    NIKE footwear: Providing sustainable innovations and solutions to athlete everywhere, Nike brings to
                    you the best of sports shoes for men and women alike. +
                    Shop these supportive, comfortable and long-lasting shoes with the comfort of online shopping from your home.
                    Nike clothes: Have your pick from an exciting collection of Nike clothing to make work out as trendy
                    as possible. Shop from shoeless and get Nike tank tops , t-shirts , track pants , Sports bras for women ,
                    and caps for men . Pair them up with stylish hoodies for women and hoodies for men.
                </p>
            </div>

            <div className="maylike-products-wrapper">
                <h2>More from Nike</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {nikes.map((item) => (
                            <Nike key={item._id} nike={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "nike"] {
    slug {
      current
    }
  }
  `
    const nikes = await client.fetch(query);

    const paths = nikes.map((nike) => ({
        params: {
            slug: nike.slug.current
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: { slug }}) => {
    const query = `*[_type == "nike" && slug.current == '${slug}'][0]`;
    const nikeQuery = '*[_type == "nike"]'

    const nike = await client.fetch(query);
    const nikes = await client.fetch(nikeQuery);

    console.log(nike);

    return {
        props: { nikes, nike }
    }
}

export default NikeDetails
