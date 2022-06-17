import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {BsFillBagXFill} from 'react-icons/bs';

export default canceled => (
        <div className="success-wrapper">
            <div className="success">
                <p className="icon">
                    <BsFillBagXFill style={{color:"indianred"}}/>
                </p>
                <h2>Your Transaction is Not Completed!</h2>
                <p className="email-msg">You are redirected to Home Page.</p>
                <p className="description">
                    If you have any query, please email
                    <a className="email" href="mailto:shoeless@example.com">
                        shoeless@example.com
                    </a>
                </p>
                <Link href="/">
                    <button type="button" width="300px" className="btn">
                        Continue
                    </button>
                </Link>
            </div>
        </div>
    );

