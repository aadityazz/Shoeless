import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {BsFillBagXFill} from 'react-icons/bs';
import {
    SpecialBanner
} from "../components";
import {SpecialCollection} from "../components";
import {client} from "../lib/client";

const specialCollection = ({specialCollections}) => (
    <div>
        <div className="products-heading" style={{marginTop:"110px"}}>
            <h2>Special Collection</h2>
        </div>

        <div className="products-container">
           {specialCollections?.map((specialCollection) => <SpecialCollection key={specialCollection._id} specialCollection={specialCollection} />)}
        </div>
    </div>
);


export const getServerSideProps = async () => {

    const specialBannerQuery = '*[_type == "specialBanner"]';
    const specialBannerData = await client.fetch(specialBannerQuery);


    const specialCollectionQuery = '*[_type == "specialCollection"]';
    const specialCollections = await client.fetch(specialCollectionQuery);


    return {
        props: { specialBannerData, specialCollections}
    }
}

export default specialCollection;
