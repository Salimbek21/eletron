import React from 'react';
import ProductCard from "../Product/Card";
import SkeletonProductCard from "../Skeletons/SkeletonProductCard";
import {useTypedSelector} from "../../store/hooks/useTypedSelector";

const FilteredProducts = () => {

   const {filteredProducts} = useTypedSelector(state => state.category)

   return (
       <div className="row">
          {
             filteredProducts.products && filteredProducts.products.length ?
                 filteredProducts.products.map((item, i) => (
                     <div key={i} className="col-xl-3 col-lg-4 col-6">
                        <ProductCard
                            id={item.random_shop.item_shop_id}
                            isInCompare={item.is_in_comparison}
                            isInCart={item.is_in_cart}
                            isInFav={item.favorite}
                            product_id={item.id}
                            name={item.name}
                            quantity={item.random_shop.quantity}
                            slug={item.slug}
                            price={item.random_shop.price}
                            isNew={item.is_new}
                            img={item.images.length ? item.images[0].types?.home_default : ''}
                            animateTime={0}
                        />
                     </div>
                 ))
                 : !filteredProducts.loading ?
                 <div className="col-12">
                    <h3 className="mt-5 text-center">
                       Ничего не найдено!
                    </h3>
                 </div>
                 : <SkeletonProductCard count={12} type={"catalog"}/>
          }
       </div>
   );
};

export default FilteredProducts;