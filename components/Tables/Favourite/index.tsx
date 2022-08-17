import React, {FC} from 'react';
import PriceRefactor from "../../Refactors/PriceRefactor";
import {MdCancel} from "react-icons/md"
import {notifyError} from "../../../helpers/NotifyBtn"
import {Product} from "../../../store/types/product";
import AddToCartBtn from "../../Buttons/AddToCartBtn";
import {useTypedDispatch} from "../../../store/hooks/useTypedDispatch";
import {useTypedSelector} from "../../../store/hooks/useTypedSelector";

interface MyTableProps {
   columns: string[],
   body: Product[]
}

const FavouriteTable: FC<MyTableProps> = ({columns, body}) => {

   const {toggleFavourite, fetchFavourites} = useTypedDispatch()
   const {} = useTypedSelector(state => state.favourite)

   const renderHeads = (ths: string[]) => {
      return ths.map((item, i) => (
          <th key={i}>{item}</th>
      ))
   }

   const handleFavouriteRemove = async (product_id: number) => {
      await toggleFavourite(product_id)
      notifyError("Продукт удален с Избранных")
      await fetchFavourites(1)
   }

   const renderTableBody = () => {
      return body.map((item, i) => (
          <tr key={i}>
             <td className="product-img">
                <img src={item.images[0].types?.home_default} alt={`favourite-${i + 1} ${item.name}`}/>
             </td>
             <td className="product-data">
                <div>
                   <p><strong>{item.name}</strong></p>
                   <p><strong>Артикул:</strong> {item.random_shop.shop_reference}</p>
                </div>
             </td>
             <td><strong><PriceRefactor price={item.random_shop.price}/></strong></td>
             <td>
                <div className="d-flex justify-content-around">
                   <AddToCartBtn
                       txt="В корзину"
                       id={item.random_shop.item_shop_id}
                       disabled={!item.random_shop.price}
                   />
                   <button
                       onClick={() => handleFavouriteRemove(item.id)}
                       className="button-unstyled cancel"
                       type={"button"}
                   >
                      <MdCancel/>
                   </button>
                </div>
             </td>
          </tr>
      ))
   }

   return (
       <div>
          <table className="table eletron-table">
             <thead>
             <tr>
                {renderHeads(columns)}
             </tr>
             </thead>
             <tbody>
             {renderTableBody()}
             </tbody>
          </table>
       </div>
   );
};

export default FavouriteTable;