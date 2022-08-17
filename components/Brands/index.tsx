import React, {FC, useEffect} from 'react';
import {useTypedSelector} from "../../store/hooks/useTypedSelector";
import {useTypedDispatch} from "../../store/hooks/useTypedDispatch";
import {Brand} from "../../store/types/home";
import SingleBrand from "./Brand";

const Brands: FC = () => {

    const responsiveClass = "col-lg-2-5 col-lg-3 col-md-4 col-sm-6";
    const home = useTypedSelector(state => state.home)
    const {fetchBrands} = useTypedDispatch()
    const {brands} = home


    useEffect(() => {
        if(!brands.length)
            fetchBrands()
    }, [])

    const renderBrands = (brands: Brand[]) => (
        brands.length ? brands.map((brand: Brand, i: number) => (
                <div className={`${responsiveClass} mb-3`} key={i}>
                    <SingleBrand img={brand.image?.url} brand_id={brand.id} slug={brand.name} />
                </div>
            ))
            : null
    )


    return (
        <>
            {renderBrands(brands)}
        </>
    );
};

export default Brands;