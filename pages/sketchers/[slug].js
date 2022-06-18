import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { client, urlFor } from '../../lib/client';
import { Sketchers } from '../../components';
import { useStateContext } from '../../context/StateContext';
import {Rating} from "@mui/material";

const SketchersDetails = ({ sketchers, sketcherss }) => {
    const { image, name, details, price } = sketchers;
    const [index, setIndex] = useState(0);
    const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

    const handleBuyNow = () => {
        onAdd(sketchers, qty);

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
                            <Rating value={sketchers.rating} readOnly></Rating>
                        </div>
                        <p>
                            ({sketchers.numReviews})
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
                        <button type="button" className="add-to-cart" onClick={() => onAdd(sketchers, qty)}>Add to Cart</button>
                        <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
                    </div>
                </div>
            </div>

            <div className="product-detail-desc">
                <h2>About Sketchers</h2>
                <img src={"https://www.ajio.com/_ui/brand-logo/skechers.jpg"}/>
                <p>A brand that’s synonymous with comfort, style and athletic performance, Skechers brings to Shoeless a
                    modish collection of shoes and sport-inspired lifestyle products for men and women. Indulge in the
                    brand’s exhaustive range of running shoes, stylish slip-ons, embellished flip-flops and more that
                    are designed for performance and comfort. +
                    Skechers for men and women
                    Among the brand’s range of unisex casual shoes, you’ll find sporty and smart styles. Pick a pair of
                    rugged black mid-top casual shoes with elasticated gussets to hang out in comfort all day. If
                    running is your favourite sport, you’ll love the Skechers GORun 400 training shoes . Browse through
                    the collection of versatile designs that include slip-on sneakers, high-energy training shoes, casual
                    slip-on convertible walking shoes and lots more.
                    Styles in Skechers
                    Besides the collection of training and performance shoes, Skechers also has a charming range of
                    yoga-inspired flip flops for women . You can take your pick from black meditation flip flops with
                    embellished straps and thong-style cushioned flip flops with sparkling sequinned straps that are
                    perfect for the beach or pool.Pamper your feet in the elegant styles in Skechers footwear!</p>
            </div>

            <div className="maylike-products-wrapper">
                <h2>More from Sketchers</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {sketcherss.map((item) => (
                            <Sketchers key={item._id} sketchers={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "sketchers"] {
    slug {
      current
    }
  }
  `
    const sketcherss = await client.fetch(query);

    const paths = sketcherss.map((sketchers) => ({
        params: {
            slug: sketchers.slug.current
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: { slug }}) => {
    const query = `*[_type == "sketchers" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "sketchers"]'

    const sketchers = await client.fetch(query);
    const sketcherss = await client.fetch(productsQuery);

    console.log(sketchers);

    return {
        props: { sketcherss, sketchers }
    }
}

export default SketchersDetails
