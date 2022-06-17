import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const FeatureBanner = ({ featureBanner }) => {
    return (
        <div>
            <div className="feature-banner">
                <img src={urlFor(featureBanner.image)} alt="shoes" className="feature-banner-image"/>
                <h3>{featureBanner.midText}</h3>
                <div className="feature-banner-button">
                    <button type="button">{featureBanner.buttonText}</button>
                </div>
            </div>
        </div>
    )
}

export default FeatureBanner
