import React, {FC, useEffect, useState} from 'react';
import PriceRefactor from "../Refactors/PriceRefactor";
import {useTypedSelector} from "../../store/hooks/useTypedSelector";
import {useTypedDispatch} from "../../store/hooks/useTypedDispatch";
import {CheckoutFormData} from "../../pages/checkout";
import CustomTooltip from "../Forms/CustomTooltip";
import NumberFormat from "react-number-format";
import {notifyError, notifySuccess} from "../../helpers/NotifyBtn";
import Cookies from "universal-cookie";
import InstallmentModal from "./InstallmentModal";

interface PaymentDetailsProps {
   formData: CheckoutFormData,

   setFormData(formData: CheckoutFormData): void
}

const PaymentDetails: FC<PaymentDetailsProps> = ({formData, setFormData}) => {


   const cookies = new Cookies()
   const [cashback, setCashback] = useState<string>("")
   const [coupon, setCoupon] = useState<string>("")
   const [isInstallmentOpen, setInstallmentOpen] = useState(false)
   const {paymentOptions} = useTypedSelector(state => state.checkout)
   const {cart} = useTypedSelector(state => state.cart)
   const {userInfo} = useTypedSelector(state => state.profile)
   const {fetchPaymentOptions, profileInfo, fetchCart} = useTypedDispatch()
   const {payment_id, delivery_id} = formData
   console.log(delivery_id)
   useEffect(() => {
      if (!paymentOptions.length)
         fetchPaymentOptions()
      if (cookies.get('access_token') && !userInfo?.id)
         profileInfo()
   }, [])

   const handlePayClick = (id: number, name: string = "") => {
      if(name === "installment") {
         setInstallmentOpen(true)
      }
      setFormData({...formData, payment_id: id})
   }
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.name === 'cashback') setCashback(e.target.value)
      else if (e.target.name === 'coupon') setCoupon(e.target.value)
   }


   const applyCoupon = async () => {
      notifySuccess('Вы применили купон')
      await fetchCart({code: coupon})
   }

   const applyCashback = async () => {
      const formattedCashback = +cashback.replace(/\s/g, '')
      if (userInfo?.cashback && (formattedCashback <= userInfo?.cashback)) {
         await fetchCart({cashback: formattedCashback})
         notifySuccess('Вы применили cashback')
      } else
         notifyError('Недостаточно средств на балансе')
   }

   const renderPaymentOptions = () => (
       paymentOptions?.map((item) => (
           <div className="col-4 mb-3" key={item.id}>
              <CustomTooltip title={item.description}>
                 <div
                     className={`checkout-option ${payment_id === item.id ? 'active' : ''}`}
                     onClick={() => handlePayClick(item.id, item.code)}
                 >
                    <img src={`/static/img/icons/${item.code}.png`} alt={item.code}/>
                    <h4 className="mt-3">{item.name}</h4>
                 </div>
              </CustomTooltip>
           </div>
       ))
   )


   return (
       <div className="payment-details row">
          <div className="col-xl-6">
             <div>
                <p className="mb-3">У вас есть купон? Примените его для получения скидки на Вашу корзину!</p>
                <div className={"d-flex"}>
                   <input
                       type="text"
                       name="coupon"
                       style={{width: 'fit-content'}}
                       className="verify-element mr-0 mr-sm-5"
                       placeholder={"Код купона"}
                       value={coupon}
                       onChange={handleChange}
                   />
                   <button
                       onClick={applyCoupon}
                       className="verify-element action"
                       style={{width: 'fit-content'}}
                   >
                      Применить
                   </button>
                </div>
             </div>

             <p className="mt-3"><strong>или</strong></p>
             <div>
                <p className="mb-3">Используйте накопленные вами средства. Чтобы приобрести <br/>
                   товары максимально выгодно</p>

                <div className={"d-flex"}>
                   <NumberFormat
                       placeholder={"Например: 50 000"}
                       className="verify-element mr-0 mr-sm-5"
                       allowNegative={false}
                       style={{width: 'fit-content'}}
                       thousandSeparator={' '}
                       disabled={!userInfo?.cashback}
                       name={'cashback'}
                       value={cashback}
                       onChange={handleChange}
                   />
                   <button
                       onClick={applyCashback}
                       className="verify-element action"
                       style={{width: 'fit-content'}}
                   >
                      Применить
                   </button>
                </div>
             </div>

             <div className="mt-4">
                <strong>
                   Доступно на счету:
                   <span className="txt-yellow"> &nbsp; <PriceRefactor price={userInfo?.cashback}
                                                                       noText={true}/></span>
                </strong>
             </div>
          </div>

          <div className="col-xl-6 mt-xl-0 mt-4">
             <div className="content">
                <div className="top"><strong>Итог:</strong></div>
                <div className="middle">
                   <p>
                      <strong>Cashback с покупки: </strong>
                      <PriceRefactor price={cart?.potential_cashback} noText={true}/>
                   </p>
                   <p><strong>Кол-во товаров:</strong> {cart?.total_count} шт</p>
                   <p><strong>Доставка:</strong> <PriceRefactor price={delivery_id === 4 ? 25000 : 0}/></p>
                   <p><strong>Итого к оплате:</strong><span> <PriceRefactor price={cart?.total}/></span></p>
                   <p><strong>Итого к оплате со скидкой:</strong><span> <PriceRefactor
                       price={cart?.total_with_discount}/></span></p>
                </div>
             </div>
          </div>

          <h5 className="col-12 mb-4 mt-5"><strong>Способ оплаты</strong></h5>

          {renderPaymentOptions()}

          <InstallmentModal
              formData={formData}
              setFormData={setFormData}
              open={isInstallmentOpen}
              setInstallmentOpen={setInstallmentOpen}
          />

       </div>
   );
};

export default PaymentDetails;