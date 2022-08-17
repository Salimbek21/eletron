import React, {useEffect, useState} from 'react';
import PriceRefactor from "../Refactors/PriceRefactor";
import Link from "next/link"
import NameRefactor from "../Refactors/NameRefactor";
import {motion} from "framer-motion";
import CompareBtn from "../Buttons/CompareBtn";
import AddToCartBtn from '../Buttons/AddToCartBtn';
import FavouriteBtn from "../Buttons/FavouriteBtn";

// animate: defines animation
// initial: defines initial state of animation or starting point
// exit: defines animation when component exits

interface CardProps {
   id: number,
   product_id: number,
   name: string
   isNew?: number,
   isInCompare?: number,
   isInFav?: number,
   isInCart?: number,
   animateTime: number | undefined,
   slug: string,
   img?: string,
   quantity: number,
   price: number
}

const ProductCard: React.FC<CardProps> = (
    {
       id,
       product_id,
       name,
       slug,
       img,
       isNew = false,
       isInCompare = false,
       isInFav = false,
       isInCart= false,
       price,
       animateTime = 0
    }) => {

   const [deviceWidth, setDeviceWidth] = useState<number>(0)

   useEffect(() => {
      if (window && window.innerWidth)
         setDeviceWidth(window.innerWidth)
   }, [])

   const generateTransition = (time: number) => {
      return {
         type: "ease",
         duration: 0.3 + time / 8
      }
   }

   return (
       <div className="product-card">
          <figure>
             <Link
                 href={{
                    pathname: '/product/[product]',
                    query: {product: slug}
                 }}
                 as={`/product/${slug}`}
             >
                <a className={isNew ? 'prod-new' : ''}>
                   <motion.div
                       initial={{filter: 'blur(8px)'}}
                       animate={{filter: 'blur(0px)'}}
                       // exit={{scale: 'blue'}}
                       transition={generateTransition(animateTime)}
                   >
                      <img src={img} alt={name}/>
                   </motion.div>
                   <figcaption>
                      <h4><NameRefactor txt={name} length={48}/></h4>
                      <div className="card-price">
                         <PriceRefactor price={price}/>
                      </div>
                   </figcaption>
                </a>
             </Link>
          </figure>
          <div className="functional-btns">
             <AddToCartBtn
                 txt={"В корзину"}
                 width={deviceWidth < 576 ? 100 : 125}
                 id={id}
                 bold={true}
                 active={isInCart}
                 disabled={!price}
                 className={"px-2"}
             />
             <CompareBtn id={product_id} active={isInCompare}/>
             <FavouriteBtn
                 id={product_id}
                 active={isInFav}
             />
          </div>
       </div>
   );
};

export default ProductCard;