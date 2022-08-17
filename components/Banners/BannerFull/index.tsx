import React from 'react';
import Link from 'next/link'
import MainButton from "../../Buttons/MainButton";

const BannerFull = () => {
    return (
        <div className="col-12">
            <Link href="/catalog/lamps">
                <a className="b-card-full-link">
                    <div className="banner-info">
                        <h5>Световые технологии для</h5>
                        <h5>Вашего офиса</h5>
                        <MainButton txt={"Каталог"} />
                    </div>
                    <img src="/static/img/b-card/full.jpg" alt="B-Card full" loading="lazy"/>
                </a>
            </Link>
        </div>
    );
};

export default BannerFull;