import React from 'react';
import Link from "next/link";

const BannerHalf = () => {
    return (
        <>
            <div className="col-md-6 mb-4 mb-md-0">
                <Link href="/catalog/vyklyuchateli?page=1&feature_value_ids=101&brand_ids=">
                    <a className="b-card-half-link">
                        <img src="/static/img/b-card/half-1.jpg" alt="B-Card 1" loading="lazy"/>
                    </a>
                </Link>
            </div>
            <div className="col-md-6">
                <Link href="/catalog/ustroystva-dlya-umnogo-doma">
                    <a className="b-card-half-link">
                        <img src="/static/img/b-card/half-2.jpg" alt="B-Card 2" loading="lazy"/>
                    </a>
                </Link>
            </div>
        </>
    );
};

export default BannerHalf;