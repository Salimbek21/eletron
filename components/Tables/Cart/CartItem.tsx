import React, {FC, useEffect, useState} from 'react';
import Link from "next/link";
import PriceRefactor from "../../Refactors/PriceRefactor";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {MdCancel} from "react-icons/md";
import {notifyError} from "../../../helpers/NotifyBtn";
import FavouriteBtn from "../../Buttons/FavouriteBtn";
import {useTypedSelector} from "../../../store/hooks/useTypedSelector";
import {useTypedDispatch} from "../../../store/hooks/useTypedDispatch";
import useDebounce from "../../../helpers/useDebounce"
import ProductQuantity from "./ProductQuantity";

interface CartItemRowProps {
  id: number,
  imgURL: string,
  slug: string,
  name: string,
  isInFavourite?: number,
  reference: string,
  discountPrice: number,
  price: number,
  productQuant: number,
  stockQuant: number,
  totalWithDiscount: number,
}

const CartItemRow = ({
                       id,
                       imgURL,
                       slug,
                       name,
                       reference,
                       isInFavourite,
                       discountPrice,
                       price,
                       productQuant,
                       stockQuant,
                       totalWithDiscount
                     }: CartItemRowProps) => {

  const {cart, adding} = useTypedSelector(state => state.cart)
  // const [currentItem, setCurrentItem] = useState<number>();
  const {deleteFromCart} = useTypedDispatch()

  const handleItemDelete = (id: number) => {
    deleteFromCart(id)
    notifyError("Ваш товар удален с корзины")
  }

  return (
    <>
      {/*<tr>
        <td className="product-img">
          <img src={imgURL} alt={slug}/>
        </td>
        <td className="product-data">
          <div>
            <Link
              href={{pathname: '/product/[product]', query: {product: slug}}}
              as={`/product/${slug}`}
            >
              <a><p><strong>{name}</strong></p></a>
            </Link>
            <p><strong>Артикул:</strong> {reference}</p>
          </div>
        </td>
        <td><strong><PriceRefactor price={discountPrice || price}/></strong></td>
        <td>
          <ProductQuantity
            id={id}
            productQuant={productQuant}
            stockQuant={stockQuant}
          />
        </td>
        <td>
          <div className="total">
            <strong><PriceRefactor price={totalWithDiscount}/></strong>
            <button
              onClick={() => handleItemDelete(id)}
              className="button-unstyled cancel"
              type={"button"}
            >
              <MdCancel/>
            </button>
          </div>
        </td>
      </tr>*/}

      <div className="cartItem">
        <div className="cartItemImg">
          <img src={imgURL} alt={slug}/>
        </div>

        <div className="cartItemText">
          <Link
            href={{pathname: '/product/[product]', query: {product: slug}}}
            as={`/product/${slug}`}
          >
            <a className="cartItemName"><p><strong>{name}</strong></p></a>
          </Link>
          <div className="cartItemCode">
            <strong>Артикул:</strong> {reference}
          </div>
        </div>
        <ProductQuantity
          id={id}
          productQuant={productQuant}
          stockQuant={stockQuant}
        />
        <div className="cartItemPrice">
          <PriceRefactor price={totalWithDiscount}/>
        </div>
        <button
          onClick={() => handleItemDelete(id)}
          className="button-unstyled cancel"
          type={"button"}
        >
          <svg viewBox="0 0 512 512">
            <path d="M346 320.5c0 25.89-.1 51.78 0 77.67.07 12.95-5.21 23.89-18.61 21.13-6.82-1.4-16.11-13.34-16.31-20.73-1.42-51.75-.75-103.55-.77-155.34 0-12.75 5-24.11 18.56-21.28 6.85 1.41 15.71 13.23 16.32 20.93 2.03 25.73.81 51.72.81 77.62ZM200 321c0 25.85 1.26 51.79-.78 77.47-.6 7.61-9.5 19.3-16.3 20.66-13.52 2.71-18.47-8.46-18.46-21.26.05-51.69-.69-103.39.74-155 .21-7.38 9.71-19.28 16.64-20.71 13.78-2.84 18.28 8.73 18.26 21.36q-.1 38.75-.1 77.48ZM273.33 321c0 25.08.1 50.16-.05 75.23-.07 11.83-2.28 23.14-17.16 23.51-16.22.4-18.75-11.51-18.78-24.22-.11-50.15-.8-100.33.76-150.44.26-8.14 9.79-21.51 16.78-22.78 15-2.72 18.56 10.34 18.49 23.47-.13 25.04-.03 50.12-.04 75.23Z"/>
            <path d="M400.05 54.52c-15.52-.78-31.19.68-46.62-.71-5.74-.52-13.85-5-16-9.86C321.82 9.51 308.59.13 271.47.06c-14.07 0-28.16-.29-42.22.12-26.4.82-46.25 12.66-53.57 38.44-4.06 14.34-11.6 16-23.91 16-19.17-.07-38.71-.53-57.44 2.81-25.14 4.49-42.7 27.19-45.62 53.73-3.82 34.66-1.54 39.09 28.46 53.46 0 89.72-.14 180 0 270.39.11 49.95 27 76.74 77.05 76.92 65.19.24 130.38.13 195.58.08 58.66 0 83.77-25.19 83.79-83.91v-261c11.7-9.1 23.25-13.57 26.41-21.4 17-42.23-14.22-88.86-59.95-91.18ZM220.72 22c31.24-.41 38.36-.41 69.6-.1 6 .05 21.84 9.73 21.95 30.79H199.73c.27-20.2 14.99-30.57 20.99-30.69Zm177 409.49c-.07 33.21-11.09 44.44-43.58 44.52q-98.79.25-197.56.06c-32.08-.05-43.32-10.79-43.39-42.05-.18-90.24-.06-180.47-.06-273.57h283.56c.41 8 1.1 15.23 1.11 22.43q.09 124.33-.04 248.64ZM84.25 121.27c.89-20.23 10.28-30.6 28.49-30.68q142.17-.59 284.36-.11c18.2 0 28.27 9.73 28.6 30.79Z"/>
          </svg>
        </button>
      </div>
    </>
  );
};

export default CartItemRow;