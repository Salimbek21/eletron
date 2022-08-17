import React, {FC, useEffect} from 'react';
import ProductCard from "../Product/Card";
import {useTypedDispatch} from "../../store/hooks/useTypedDispatch";
import {useTypedSelector} from "../../store/hooks/useTypedSelector";
import {SectionProducts} from "../../store/types/home";
import SkeletonProductCard from "../Skeletons/SkeletonProductCard";

interface ProductSectionProps {
   type: string,
   title: string
}

const ProductSection: FC<ProductSectionProps> = ({type, title}) => {

   const responsiveClass = "col-lg-2-5 col-lg-3 col-sm-6";
   const {fetchHomeProducts} = useTypedDispatch()
   const {
      popularProducts,
      recommendedProducts,
      newProducts,
      rloading, nloading, ploading
   } = useTypedSelector(state => state.home)

   useEffect(() => {
      switch (type) {
         case 'popular_products':
            // if (!popularProducts.length && !ploading)    // fetch only if it is not available at redux
            fetchHomeProducts(type)     // fetch every time on mount
            break
         case 'recommended_products':
            // if (!recommendedProducts.length && !rloading)
            fetchHomeProducts(type)
            break
         case 'new':
            // if (!newProducts.length && !nloading)
            fetchHomeProducts(type)
            break
      }
   }, [])

   const renderSectionProducts = () => {
      switch (type) {
         case 'popular_products':
            return renderCard(popularProducts)
         case 'recommended_products':
            return renderCard(recommendedProducts)
         case 'new':
            return renderCard(newProducts)
         default:
            return null
      }
   }

   const renderCard = (products: SectionProducts[]) => (
       products.length ?
           products.map((item, i) => (
               <div key={i} className={responsiveClass}>
                  <ProductCard
                      id={item.random_shop.item_shop_id}
                      product_id={item.id}
                      slug={item.slug}
                      isNew={item.is_new}
                      isInCompare={item.is_in_comparison}
                      isInCart={item.is_in_cart}
                      isInFav={item.favorite}
                      name={item.name}
                      quantity={item.random_shop.quantity}
                      price={item.random_shop.price}
                      animateTime={i}
                      img={item.images.length ? item.images[0].types?.home_default : ''}
                  />
               </div>
           ))
           : <SkeletonProductCard count={6}/>
   )

   return (
       <div className="row">
          <div className={responsiveClass}>
             <div
                 className={`products-small-banner ${type === 'recommended_products' ? 'recommended' : ''}`}
             >
                <img src="/static/img/brand/black.svg" alt="Eletron"/>
                <h3>
                   {title}
                </h3>
             </div>
          </div>

          {renderSectionProducts()}

       </div>
   );
};

export default ProductSection;