import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const IntroBanner = ({ introBanner }) => {
    return (
        <div>
            <div className="feature-banner">
                <img src={urlFor(introBanner.image)} alt="shoes" className="intro-banner-image"/>
                <h3>{introBanner.midText}</h3>
                <h4>{introBanner.smallText}</h4>
            </div>
        </div>
    )
}

export default IntroBanner
