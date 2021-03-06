import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { client, urlFor } from '../../lib/client';
import { Adidas } from '../../components';
import { useStateContext } from '../../context/StateContext';
import {Rating} from "@mui/material";

const AdidasDetails = ({ adidas, adidass }) => {
    const { image, name, details, price } = adidas;
    const [index, setIndex] = useState(0);
    const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

    const handleBuyNow = () => {
        onAdd(adidas, qty);

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
                            <Rating value={adidas.rating} readOnly></Rating>
                        </div>
                        <p>
                            ({adidas.numReviews})
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
                        <button type="button" className="add-to-cart" onClick={() => onAdd(adidas, qty)}>Add to Cart</button>
                        <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
                    </div>
                </div>
            </div>

            <div className="product-detail-desc">
                <h2>About Adidas</h2>
                <img style={{width:"75px", height:"75px" }} src={"https://www.ajio.com/_ui/brand-logo/adidas.jpg"}/>
                <p>STORIES, STYLES AND SPORTSWEAR AT ADIDAS, SINCE 1949
                    Through sport we have the power to change lives. Adidas offers a home to the runner, the basketball
                    player, the soccer kid and the fitness enthusiast. Our footwear and clothing lines keep you focused
                    and supported during that race and right through the finish line!.</p>
            </div>

            <div className="maylike-products-wrapper">
                <h2>More from Adidas</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {adidass.map((item) => (
                            <Adidas key={item._id} adidas={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "adidas"] {
    slug {
      current
    }
  }
  `
    const adidass = await client.fetch(query);

    const paths = adidass.map((adidas) => ({
        params: {
            slug: adidas.slug.current
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: { slug }}) => {
    const query = `*[_type == "adidas" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "adidas"]'

    const adidas = await client.fetch(query);
    const adidass = await client.fetch(productsQuery);

    console.log(adidas);

    return {
        props: { adidass, adidas }
    }
}

export default AdidasDetails
