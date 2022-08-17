import React, {useEffect, useState} from 'react';
import Layout from "../../../components/Layout";
import {useRouter} from "next/router";
import {useTypedDispatch} from "../../../store/hooks/useTypedDispatch";
import {useTypedSelector} from "../../../store/hooks/useTypedSelector";
import {getAsString} from "../../../helpers/arrayOperations";
import PriceRefactor from "../../../components/Refactors/PriceRefactor";
import {Order} from "../../../store/types/profile";

const UserOrderPage = () => {

   const {query} = useRouter();
   const {getUserOrder, clearUserOrder} = useTypedDispatch()
   const {order} = useTypedSelector(state => state.profile)
   // const [queryOrder, setQueryOrder] = useState<Order | undefined>(undefined)

   useEffect(() => {
      clearUserOrder()
      if (query.auth && getAsString(query.auth) === "false" && query.orderID && query.code) {
         getUserOrder(+getAsString(query.orderID), getAsString(query.code))
         // setQueryOrder(JSON.parse(getAsString(query.order)))
      } else if (query.orderID && !query.auth)
         getUserOrder(+getAsString(query.orderID))
   }, [query])

   const renderOrderProducts = (order: Order | undefined) => (
       order?.cart?.items.map((cartItem, i) => (
           <div key={i}>
              <hr/>
              <div className="row">
                 <div className="col-md-9 col-7 d-flex align-items-center">
                    <img
                        width={60}
                        height={60}
                        src={cartItem.product.images[0].types.medium_default}
                        alt={cartItem.product.name}
                    />
                    <span className="ml-3">{cartItem.product.name}</span>
                 </div>
                 <div className="col-md-3 col-5 d-flex align-items-center justify-content-between">
                    <div>{cartItem.quantity}</div>
                    <div><PriceRefactor price={cartItem.total}/></div>
                 </div>
              </div>
           </div>
       ))
   )

   const renderOrderDetails = (order: Order | undefined) => (
       <>
          <p><strong>Способ доставки: </strong> {order?.delivery.name}</p>
          <p>
             <strong>Адрес доставки: </strong>
             {order?.address.region?.city?.name}, {order?.address.region?.name}, {order?.address.address}
          </p>
          <p><strong>Контактный номер: </strong>+{order?.address.phone}</p>
          <p><strong>Контактное лицо: </strong> {order?.address.full_name}</p>
       </>
   )

   let parsedOrder = order ? order : null

   return (
       <Layout title="Ваш заказ">
          <section className="order-page">
             <div className="container-fluid">

                <div className="row">
                   <div className="col-3">
                      <h5>Заказ №{parsedOrder?.id}</h5>
                   </div>
                   <div className="col text-right">
                      <p><strong>Создан: </strong>{parsedOrder?.created_at}</p>
                      <p><strong>Метод оплаты: </strong>{parsedOrder?.payment.name}</p>
                      <p><strong>Статус: </strong>{parsedOrder?.state.name}</p>
                   </div>
                </div>
                <div className="row mt-5">
                   <div className="col-12">
                      <p>Информация о заказе</p>
                   </div>
                   <div className="col-12">
                      <div className="row order-card-wrap">
                         <div className="col-lg-4 order-card-left">
                            <p><strong>СУММА ЗАКАЗА:</strong></p>
                            <h4><PriceRefactor price={parsedOrder?.total}/></h4>
                            <p>К-во товаров: {parsedOrder?.cart?.items.length}</p>
                         </div>
                         <div className="col-lg-8 order-card-right">
                            {renderOrderProducts(order)}
                         </div>
                      </div>
                   </div>
                </div>

                <div className="mt-5 d-flex justify-content-between align-items-end">
                   <div>
                      <p>Информация о доставке</p>
                      {renderOrderDetails(order)}
                   </div>
                   {
                      order && order.url ?
                          <a className="btn-eletron main" target={"_blank"}
                             href={order.url}>Оплатить</a>
                          : null
                   }
                </div>

             </div>
          </section>
       </Layout>
   );
};

export default UserOrderPage;