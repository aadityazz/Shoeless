import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const SpecialBanner = ({ specialBanner }) => {
    return (
        <div className="special-banner-container">
            <div>

                <h3>{specialBanner.midText}</h3>
                <p>{specialBanner.desc}</p>
                <img src={urlFor(specialBanner.image)} alt="headphones" className="special-banner-image" />

                <div>
                    <Link href={`/specialCollection`}>
                        <button className="special-banner-button" type="button">{specialBanner.buttonText}</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SpecialBanner
