import React, {useEffect, useState} from 'react';
import {useTypedDispatch} from "../../../store/hooks/useTypedDispatch";
import {useTypedSelector} from "../../../store/hooks/useTypedSelector";
import {notifySuccess} from "../../../helpers/NotifyBtn";
import {BiPhoneCall, BiMapPin, BiCalendar, BiUserCircle} from "react-icons/bi"

const Addresses = () => {

   const {getUserAddresses, changeUserMainAddr} = useTypedDispatch();
   const {userAddresses, mainAddressChanged} = useTypedSelector(state => state.profile)
   const [deviceWidth, setDeviceWidth] = useState<number>(0)

   useEffect(() => {
      if(window && window.innerWidth)
         setDeviceWidth(window.innerWidth)
      if (!userAddresses?.length)
         getUserAddresses()
   }, [])

   useEffect(() => {
      if(mainAddressChanged)
         notifySuccess('Вы поменяли основной адрес')
         getUserAddresses()
   }, [mainAddressChanged])

   const mainAddressUpdater = (id: number) => {
      changeUserMainAddr(id)
   }

   const renderAddresses = () => (
       userAddresses ? userAddresses.map((address, i) => (
               <div className="my-address" key={i}>
                  <div className="address-head">
                     <p><strong>Наименование:</strong> {address.name}</p>
                     {
                        address.main ?
                            <button className="btn btn-eletron silver">
                               <strong>Основной</strong>
                            </button>
                            : null
                     }

                  </div>
                  <div className="address-body">
                     <ul>
                        <li>
                           {/*<img src="/static/img/icons/user.svg" alt="User"/>*/}
                           <BiUserCircle />
                           <p>
                              <strong>Получатель:</strong>
                              <span> {address.full_name}</span>
                           </p>
                        </li>
                        <li>
                           <BiPhoneCall />
                           <p>
                              <strong>Телефон:</strong>
                              <span> +{address.phone}</span>
                           </p>
                        </li>
                        <li>
                           <BiMapPin />
                           <p>
                              <strong>Адрес доставки:</strong>
                              <span> {address.region.city.name}, {address.region.name}, {address.address}</span>
                           </p>
                        </li>
                        <li>
                           <BiCalendar />
                           <p>
                              <strong>Дата создания:</strong>
                              <span> {address.date}</span>
                           </p>
                        </li>
                     </ul>

                     {
                        !address.main ?
                            <button
                                className="btn btn-eletron main address-changer"
                                onClick={() => mainAddressUpdater(address.id)}
                            >
                               <strong>{deviceWidth < 576 ? 'Сд. основным' : 'Сделать основным'}</strong>
                            </button>
                            : null
                     }
                  </div>

               </div>
           ))
           : null
   )

   return (
       <div className="user-addresses-wrap">
          {renderAddresses()}
       </div>
   );
};

export default Addresses;