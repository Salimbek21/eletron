import React, {useEffect, FC} from 'react';
import {useTypedSelector} from "../../store/hooks/useTypedSelector";
import {useTypedDispatch} from "../../store/hooks/useTypedDispatch";
import {CheckoutFormData} from "../../pages/checkout";
import CustomTooltip from "../Forms/CustomTooltip";

interface DeliveryProps {
   formData: CheckoutFormData,

   setFormData(formData: CheckoutFormData): void
}


const Delivery: FC<DeliveryProps> = ({formData, setFormData}) => {

   const {deliveryOptions} = useTypedSelector(state => state.checkout)
   const {fetchDeliveryOptions} = useTypedDispatch()
   const {delivery_id, address} = formData

   useEffect(() => {
      if (!deliveryOptions.length)
         fetchDeliveryOptions()
   }, [])

   const images = ['shopping-cart', 'shipped', 'location']

   const handleDeliveryClick = (id: number) => {
      setFormData({...formData, delivery_id: id})
   }


   const renderDeliveryOptions = () => {
      return deliveryOptions?.map((item, i) => {
         if (item.id === 2 && address.city_id && address.city_id !== 1)
            return null
         else if(item.id === 4 && address.city_id === 1)
            return null
         else
            return (
                <div className="col-4" key={i}>
                   <CustomTooltip title={item.description}>
                      <div
                          className={`checkout-option ${delivery_id === item.id ? 'active' : ''}`}
                          onClick={() => handleDeliveryClick(item.id)}
                      >
                         <img src={`/static/img/icons/${images[i]}.png`} alt={images[i]}/>
                         <h4 className="mt-3">{item.name}</h4>
                      </div>
                   </CustomTooltip>
                </div>)
      })
   }

   return (
       <div className="row delivery">
          <h5 className="col-12 mb-4"><strong>Способ доставки</strong></h5>
          {renderDeliveryOptions()}
       </div>
   );
};

export default Delivery;