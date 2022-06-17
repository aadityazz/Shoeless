import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const IntroBanner = ({ introBanner }) => {
    return (
        <div className="intro-banner-container">
            <div className="intro-banner-mage">
                <img src={urlFor(introBanner.image)} alt="shoes"/>
                <h3>{introBanner.midText}</h3>
                <h3 className={"h3-next"}>{introBanner.midText}</h3>
                <h4>{introBanner.smallText}</h4>
            </div>
        </div>
    )
}

export default IntroBanner
