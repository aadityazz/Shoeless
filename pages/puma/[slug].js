import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { client, urlFor } from '../../lib/client';
import { Puma } from '../../components';
import { useStateContext } from '../../context/StateContext';

const PumaDetails = ({ puma, pumas }) => {
    const { image, name, details, price } = puma;
    const [index, setIndex] = useState(0);
    const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

    const handleBuyNow = () => {
        onAdd(puma, qty);

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
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>
                            (20)
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
                        <button type="button" className="add-to-cart" onClick={() => onAdd(puma, qty)}>Add to Cart</button>
                        <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
                    </div>
                </div>
            </div>

            <div className="product-detail-desc">
                <h2>About Puma</h2>
                <img src={"https://www.ajio.com/_ui/brand-logo/puma.jpg"}/>
                <p>PUMA is one of the world’s leading Sports Brands, designing, developing, selling and marketing footwear,
                    apparel and accessories. For 70 years, PUMA has established a history of making fast product designs
                    for the fastest athletes on the planet. PUMA offers performance and sport-inspired lifestyle products
                    in categories such as Running and Training, Motorsports, Football, Badminton and Basketball. Sport
                    style categories from PUMA include Sneakers, Slip-ons and Loungewear. It engages in exciting
                    collaborations with renowned design brands to bring innovative and fast designs to the sports and
                    sports-inspired lifestyle world. The company distributes its products in more than 120 countries and
                    is headquartered in Herzogenaurach/Germany.</p>
            </div>


            <div className="maylike-products-wrapper">
                <h2>More from Puma</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {pumas.map((item) => (
                            <Puma key={item._id} puma={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "puma"] {
    slug {
      current
    }
  }
  `
    const pumas = await client.fetch(query);

    const paths = pumas.map((puma) => ({
        params: {
            slug: puma.slug.current
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: { slug }}) => {
    const query = `*[_type == "puma" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "puma"]'

    const puma = await client.fetch(query);
    const pumas = await client.fetch(productsQuery);

    console.log(puma);

    return {
        props: { pumas, puma }
    }
}

export default PumaDetails
