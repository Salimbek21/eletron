import React, {FC, useEffect, useState} from 'react';
import PriceRefactor from "../../Refactors/PriceRefactor";
import CompareBtn from "../../Buttons/CompareBtn";
import FavouriteBtn from "../../Buttons/FavouriteBtn";
import {Feature} from "../../../store/types/product";
import AddToCartBtn from "../../Buttons/AddToCartBtn";
import {stagger, fadeInUp} from "../../../helpers/motion-animations";
import {motion} from "framer-motion";
import {useTypedDispatch} from "../../../store/hooks/useTypedDispatch";
import useDebounce from "../../../helpers/useDebounce";
import ProductQuantity from "../../Tables/Cart/ProductQuantity";
import {useTypedSelector} from "../../../store/hooks/useTypedSelector";

interface GeneralProps {
   id: number,
   product_id: number,
   isInCompare?: number,
   isInFavourite?: number,
   isInCart?: number,
   name: string,
   price: number,
   discountPrice?: number,
   stockQuant: number,
   reference: string,
   brandName: string,
   brandImg?: string,
   features: Feature[]
}

const General: FC<GeneralProps> = (
    {
       id,
       product_id,
       isInCompare,
       isInFavourite,
       isInCart,
       name,
       price,
       discountPrice,
       stockQuant,
       reference,
       brandName,
       brandImg,
       features
    }) => {



   const {cart} = useTypedSelector(state => state.cart)


   const renderBasicFeatures = (features: Feature[]) => {
      if (features.length > 3) {
         return [{...features[0]}, {...features[1]}, {...features[2]}]
             .map((item, i) => <li className="mb-3" key={i}><strong>{item.name}:</strong>&nbsp;{item.value}</li>)
      } else {
         return features.map((item, i) => (
             <li className="mb-3" key={i}><strong>{item.name}:</strong>&nbsp;{item.value}</li>
         ))
      }
   }

   return (
       <motion.div
           initial="initial"
           animate="animate"
           variants={stagger}
           className="product-description"
       >
          <motion.h1 variants={fadeInUp}>{name}</motion.h1>
          <motion.div variants={fadeInUp} className="product-brand">
             {brandImg?.length ? <img src={brandImg} alt={brandName}/> : null}
          </motion.div>
          <motion.h5 variants={fadeInUp} className="mb-3"><strong>Коротко о товаре:</strong></motion.h5>
          <motion.ul variants={fadeInUp} className="general-chars">
             <li className="mb-3"><strong>Артикул:</strong>&nbsp;{reference}</li>
             <li className="mb-3"><strong>Бренд:</strong>&nbsp;{brandName}</li>
             {renderBasicFeatures(features)}
          </motion.ul>
          <motion.div variants={fadeInUp} className={`price-big ${discountPrice ? 'old-price' : ''}`}>
             {
                price === 0 ? 'Цена по запросу' : <PriceRefactor price={price}/>
             }
          </motion.div>
          {
             discountPrice ?
                 <motion.div variants={fadeInUp} className={`price-big with-discount`}>
                    <PriceRefactor price={discountPrice} currency={false}/> <span> сум</span>
                 </motion.div>
                 : null
          }
          <motion.div variants={fadeInUp} className="mt-4 d-flex">
             <ProductQuantity
                 id={id}
                 stockQuant={stockQuant}
                 productQuant={cart?.items?.find(i => i.item_shop_id === id)?.quantity || 1}
             />
             <div className="ml-3">
                <CompareBtn
                    id={product_id}
                    active={isInCompare}
                />
             </div>
             <div className="ml-3">
                <FavouriteBtn id={product_id} active={isInFavourite}/>
             </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-4 d-flex">
             <AddToCartBtn
                 id={id}
                 txt={"В корзину"}
                 active={isInCart}
                 disabled={!price}
                 bold={true}
                 width={195}
                 className={'align-items-center'}
             />
          </motion.div>
       </motion.div>
   );
};

export default General;