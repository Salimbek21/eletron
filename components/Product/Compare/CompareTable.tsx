import React, {useEffect, useState} from 'react'
import PriceRefactor from "../../Refactors/PriceRefactor"
import MainButton from "../../Buttons/MainButton"
import {MdCancel} from "react-icons/md"
import {notifyError} from "../../../helpers/NotifyBtn"
import {useRouter} from "next/router";
import {useTypedSelector} from "../../../store/hooks/useTypedSelector";
import {useTypedDispatch} from "../../../store/hooks/useTypedDispatch";
import AddToCartBtn from "../../Buttons/AddToCartBtn";

const CompareTable = () => {

   const [isOffset, setOffset] = useState<boolean>(false) // offset to set box shadow for products
   const router = useRouter()
   const {compareProducts, compareFeatures} = useTypedSelector(state => state.compare)
   const {fetchCompare, toggleCompare, fetchCompareClasses} = useTypedDispatch()
   const {push} = useRouter()

   useEffect(() => {
      window.addEventListener('scroll', tableScroller)
      return () => {
         window.removeEventListener('scroll', tableScroller)
      }
   }, [])

   useEffect(() => {
      if (router.query.compareClass && router.query.compareClass.length)
         fetchCompare(+router.query.compareClass)
   }, [router])

   const tableScroller = (e: any) => {
      if (window.pageYOffset >= 414)
         setOffset(true)
      else if (window.pageYOffset < 310)
         setOffset(false)
   }

   const handleCompareDelete = async (id: number) => {
      await toggleCompare(id)
      notifyError("Продукт удален со Сравнений")
      console.log(router.query.compareClass)
      if (router.query.compareClass && router.query.compareClass.length) {
         await fetchCompare(+router.query.compareClass)
      }
      fetchCompareClasses()
   }

   const addOffsetClass = () => {
      if (isOffset)
         return "with-offset"
      else
         return ""
   }

   const pushToProductPage = (slug: string) => {
      push(`/product/${slug}`)
   }

   const renderCompareProdByClass = () => (
       compareProducts.map((item, i) => (
           router && router.query.compareClass
           && +router.query.compareClass === item.class.id ?
               <div
                   key={item.id}
                   className={`element ${addOffsetClass()}`}>
                  <div>
                     <img src={item.images[0].types?.home_default} alt={item.name}/>
                     <p
                         className="title-p c-pointer"
                         onClick={() => pushToProductPage(item.slug)}
                     >
                        {item.name}
                     </p>
                     <p><strong><PriceRefactor price={item.random_shop.price}/></strong></p>
                     <AddToCartBtn id={item.random_shop.item_shop_id} txt={"Купить"}
                                   disabled={!item.random_shop.price}/>
                     <button
                         onClick={() => handleCompareDelete(item.id)}
                         className="button-unstyled"
                         type={"button"}
                     >
                        <MdCancel/>
                     </button>
                  </div>
               </div>
               : null
       ))
   )


   const renderFeatures = () => (
       compareFeatures.map((item, i) => (
           <div className="compare-row" key={i}>
              <div className="container-fluid">
                 <div className="compare-features">
                    {
                       item.values.map((value, j) => (
                           <div className="feature" key={`${i}-${j}`}>
                              <p className={"light"}>{item.name}</p>
                              <p>{value.value}</p>
                           </div>
                       ))
                    }
                 </div>
              </div>
           </div>
       ))
   )

   return (
       <div className="compare-table-wrapper">
          <div
              className={`compare-row border-0 positioned ${isOffset && compareFeatures.length ? 'box-shadow-true' : ''}`}>
             <div className="container-fluid">
                <div className={`compare-products`}>
                   {renderCompareProdByClass()}
                </div>
             </div>
          </div>

          <div className="compare-row p-0 border-0">
          </div>

          <div className="compare-row">
             <div className="container-fluid">
                {
                   compareFeatures.length ?
                       <h4 className="mt-5 specs-h4"><strong>Общие характеристики</strong></h4>
                       : null
                }
             </div>
          </div>
          {renderFeatures()}
       </div>
   );
};

export default CompareTable;