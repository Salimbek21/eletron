import React, {FC, useEffect} from 'react';
import MainButton from "../../Buttons/MainButton";
import ProductCard from "../Card";
import {useTypedSelector} from "../../../store/hooks/useTypedSelector";
import {useTypedDispatch} from "../../../store/hooks/useTypedDispatch";
import {Product} from "../../../store/types/product";
import {useRouter} from "next/router";
import SkeletonProductCard from "../../Skeletons/SkeletonProductCard";

interface SimilarProductsProps {
   product_id: number
}

const SimilarProducts: FC<SimilarProductsProps> = ({product_id}) => {

   const responsiveClass = "col-lg-2-5 col-lg-3 col-md-4 col-sm-6";
   const {similar, similarLoading} = useTypedSelector(state => state.product)
   const {fetchSimilarProducts, clearSimilarProducts} = useTypedDispatch()
   const router = useRouter()

   useEffect(() => {
      fetchSimilarProducts(product_id)
      return () => {
         clearSimilarProducts()
      }
   }, [router.query])

   const renderSimilarProduct = (products: Product[]) => (
       products.length ? products.map((item, i: number) => (
               <div key={i} className={responsiveClass}>
                  <ProductCard
                      product_id={item.id}
                      isNew={item.is_new}
                      isInCompare={item.is_in_comparison}
                      isInCart={item.is_in_cart}
                      isInFav={item.favorite}
                      price={item.random_shop.price}
                      slug={item.slug}
                      id={item.random_shop.item_shop_id}
                      quantity={item.random_shop.quantity}
                      animateTime={i}
                      name={item.name}
                      img={item.images.length ? item.images[0].types?.home_default : ''}
                  />
               </div>
           ))
           : null
   );

   return (
       <div className={"row"}>
          <div className="col-12 mb-5 product-similar">
             <MainButton txt={"Похожие товары"} bold={true}/>
          </div>
          {
             similar.length ?
                 renderSimilarProduct(similar)
                 : similarLoading ? <SkeletonProductCard count={5} />
                 : <div className="col-12">Похожих товаров не найдено!</div>
          }
       </div>
   );
};

export default SimilarProducts;