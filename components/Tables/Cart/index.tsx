import React, {FC, useState} from 'react';
import PriceRefactor from "../../Refactors/PriceRefactor";
import {AiOutlinePlus, AiOutlineMinus} from "react-icons/ai"
import {MdCancel} from "react-icons/md"
import {notifyError, notifyWarn, notifySuccess} from "../../../helpers/NotifyBtn"
import {useTypedSelector} from "../../../store/hooks/useTypedSelector";
import {CartItem} from "../../../store/types/cart";
import {useTypedDispatch} from "../../../store/hooks/useTypedDispatch";
import {BiLoaderAlt} from "react-icons/bi"
import Link from "next/link";
import CartItemRow from "./CartItem";

interface MyTableProps {
   columns: string[]
}

const CartTable: FC<MyTableProps> = ({columns}) => {

   const {cart, adding} = useTypedSelector(state => state.cart)
   const [currentItem, setCurrentItem] = useState<number>();
   const [quantity, setQuantity] = useState<number>();
   const {addToCart, deleteFromCart} = useTypedDispatch()

   // const renderHeads = (ths: string[]) => {
   //    return ths.map((item, i) => (
   //        <th key={i}>{item}</th>
   //    ))
   // }

   const renderTableBody = (tds: CartItem[] | undefined) => (
       tds && tds.length ?
           tds.map((item, i) => (
               <CartItemRow
                   key={item.item_shop_id}
                   id={item.item_shop_id}
                   imgURL={item.product.images[0].types.medium_default}
                   slug={item.product.slug}
                   name={item.product.name}
                   reference={item.shop_reference}
                   discountPrice={item.discount?.price}
                   price={item.price}
                   productQuant={item.quantity}
                   stockQuant={item.stock_quantity}
                   totalWithDiscount={item.total_with_discount}
               />
           ))
           : null
   )

   return (
       <div className="cartBlock">
         {renderTableBody(cart?.items)}
       </div>
   );
};

export default CartTable