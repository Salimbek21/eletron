import React, {useEffect} from 'react';
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";
import PriceRefactor from "../../Refactors/PriceRefactor";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";
import {useTypedSelector} from "../../../store/hooks/useTypedSelector";
import {useTypedDispatch} from "../../../store/hooks/useTypedDispatch";


const OrdersTable = () => {

   const {orders, ordersMeta} = useTypedSelector(state => state.profile);
   const {getUserOrders} = useTypedDispatch();

   useEffect(() => {
      if (!orders.length)
         getUserOrders({page: 1});
   }, [])

   const renderTableRows = () => (
       orders.map((item, i) => (
           <tr key={i}>
              <td>{item.id}</td>
              <td>{item.created_at}</td>
              <td><PriceRefactor price={item.total} currency={false}/> UZS</td>
              <td>{item.state.name}</td>
              <td>
                 <div className="cashback-stat">
                    <div className="available"><MdKeyboardArrowUp color="#5dae4c"/> <PriceRefactor
                        price={item.cart.potential_cashback}/></div>
                    <div className="spent"><MdKeyboardArrowDown color="#e94627"/> <PriceRefactor
                        price={item.cart.used_cashback}/></div>
                 </div>
              </td>
              <td>
                 <Link
                     href={{pathname: '/profile/order/[orderID]', query: {orderID: item.id}}}
                     as={`/profile/order/${item.id}`}
                 >
                    <a className="btn-eletron">Подробно</a>
                 </Link>
              </td>
           </tr>
       ))
   )

   const paginateHandler = (pageObj: any) => {
      const page = pageObj.selected + 1;
      getUserOrders({page})
   }

   return (
       <>
          <div className={"orders-table"}>
             <table className="table eletron-table">
                <thead>
                <tr>
                   <th>Заказ</th>
                   <th>Дата оформления</th>
                   <th>Общая сумма</th>
                   <th>Статус</th>
                   <th>Cashback</th>
                   <th></th>
                </tr>
                </thead>
                <tbody>
                {renderTableRows()}
                </tbody>
             </table>
          </div>

          <div className="d-flex justify-content-end mt-4">
             {
                ordersMeta.total && ordersMeta.total > 10 ?
                    <ReactPaginate
                        marginPagesDisplayed={5} //
                        pageRangeDisplayed={2} // three dots margin
                        pageCount={ordersMeta.last_page ? ordersMeta.last_page : 0}
                        onPageChange={paginateHandler}
                        containerClassName={'list'}
                        forcePage={ordersMeta.current_page ? ordersMeta.current_page - 1 : 0}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        previousClassName={'page-item'}
                        previousLinkClassName={'page-link'}
                        nextClassName={'page-item'}
                        nextLinkClassName={'page-link'}
                        breakClassName={'page-item break'}
                        breakLinkClassName={'page-link break-link'}
                        previousLabel={
                           // filteredProducts.products.length > 1 ?
                           <FiChevronLeft/>
                           // : null
                        }
                        nextLabel={
                           // filteredProducts.products.length > 1 ?
                           <FiChevronRight/>
                           // : null
                        }
                    />
                    : null
             }

          </div>
       </>
   );
};

export default OrdersTable;