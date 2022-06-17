import React, { useState, useEffect } from 'react';
import {Sketchers} from "../components";
import {client} from "../lib/client";

const sketchers = ({sketcherss}) => (
    <div>
        <div className="products-heading" style={{marginTop:"110px"}}>
            <h2 style={{marginBottom:"100px"}}> Sketchers</h2>
        </div>
        <img className="feature-page-logo" src={"https://raw.githubusercontent.com/aadityazz/ASSETS/main/SKECHERS_logo.png"}/>
        <p style={{marginBottom:"100px"}}>A brand that’s synonymous with comfort, style and athletic performance, Sketchers brings to Shoeless a
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

        <div className="products-container">
            {sketcherss?.map((sketchers) => <Sketchers key={sketchers._id} sketchers={sketchers} />)}
        </div>
    </div>
);


export const getServerSideProps = async () => {

    const featureBannerQuery = '*[_type == "featureBanner"]';
    const featureBannerData = await client.fetch(featureBannerQuery);


    const sketchersQuery = '*[_type == "sketchers"]';
    const sketcherss = await client.fetch(sketchersQuery);


    return {
        props: { featureBannerData, sketcherss}
    }
}

export default sketchers;
