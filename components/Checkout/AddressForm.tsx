import React, {FC, useEffect, useState} from 'react';
import Select from "react-select";
import NumberFormat from 'react-number-format';
import {useTypedDispatch} from "../../store/hooks/useTypedDispatch";
import {useTypedSelector} from "../../store/hooks/useTypedSelector";
import {CheckoutFormData} from "../../pages/checkout";
import Cookies from "universal-cookie";

interface OptionType {
   value?: number,
   label?: string
}

interface AddressFormProps {
   formData: CheckoutFormData,

   setFormData(formData: CheckoutFormData): void
}

const AddressForm: FC<AddressFormProps> = ({formData, setFormData}) => {

   const cookies = new Cookies()
   const {fetchCities, getUserAddresses} = useTypedDispatch()
   const {cities} = useTypedSelector(state => state.checkout)
   const {userAddresses} = useTypedSelector(state => state.profile)
   const [cityOption, setCityOption] = useState<OptionType>()
   const [regionOption, setRegionOption] = useState<OptionType>()
   const [registeredAddrOption, setRegAddrOption] = useState<OptionType>()
   const [phone, setPhone] = useState<string>("")
   const {address} = formData

   const themeCustom = (theme: any) => ({
      ...theme,
      colors: {
         ...theme.colors,
         neutral0: '#fafafa',
         primary: '#FFF212',
         // neutral10: '#000000',
         primary25: '#FFFBB3',
         primary50: '#FFF212',
         primary75: '#FFF212'
      }
   })

   useEffect(() => {
      if (cookies.get('access_token') && !userAddresses?.length)
         getUserAddresses()
      if (!cities.length)
         fetchCities()
   }, [])

   const handleCitySelect = (selectOption: OptionType) => {
      setRegionOption({value: undefined, label: 'Выберите город/район'})
      setCityOption(selectOption)
      setFormData({
         ...formData,
         address: {...address, city_id: selectOption.value ? selectOption.value : 0}
      })
   }

   const handleRegionSelect = (selectOption: OptionType) => {
      setRegionOption(selectOption)
      setFormData({
         ...formData,
         address_id: '',
         address: {...address, region_id: selectOption.value ? selectOption.value : 0}
      })
   }

   const handleCheckoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({...formData, address_id: '', address: {...address, [e.target.name]: e.target.value}})
   }

   const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formattedPhone = e.target.value.replace(/\s|\+|_/g, '')
      setPhone(e.target.value)
      setFormData({...formData, address_id: '', address: {...address, phone: formattedPhone}})
   }

   const handleRegisteredAddr = (selectOption: OptionType) => {
      setRegAddrOption(selectOption)
      const selectAddr = userAddresses?.find(addr => addr.id === selectOption.value)
      if (selectAddr) {
         const {region, full_name, address: addr, phone: ph} = selectAddr
         const [a,b,c, ...rest] = ph.split('') // get all of 998935917381 except 998
         const arrayPhone = [...rest].join('')

         setRegionOption({value: region.id, label: region.name})
         setCityOption({value: region.city.id, label: region.city.name})
         setPhone(arrayPhone)

         setFormData({
            ...formData,
            address_id: selectAddr.id.toString(),
            address: {
               ...address,
               region_id: region.id,
               full_name: full_name,
               address: addr,
               phone: ph,
               city_id: region.city.id
            }
         })
      }
   }

   const parseCitiOptions = () => (cities.map((item) => ({value: item.id, label: item.name})))

   const parseRegionOptions = () => {
      if (cities.length && cityOption?.value) {
         const city = cities.find(c => c.id === cityOption.value)
         if (city?.regions?.length) {
            return city.regions.map(r => ({value: r.id, label: r.name}))
         }
      }
   }

   const parseRegisteredAddressOptions = () => userAddresses?.map((addr) => ({value: addr.id, label: addr.name}))

   return (
       <form autoComplete={"off"} className="address-form row mb-5">

          {
             userAddresses?.length ?
                 <>
                    <div className="col-xl-4">
                       <div>
                          <p className="mb-1">Выберите существующий адрес доставки:</p>
                          <Select
                              instanceId={'existing-addr'}
                              className="my-select"
                              color={"red"}
                              value={registeredAddrOption}
                              //@ts-ignore
                              onChange={handleRegisteredAddr}
                              options={parseRegisteredAddressOptions()}
                              placeholder={"Адрес"}
                              theme={theme => themeCustom(theme)}
                          />
                          <p className="mt-2">или укажите новый адрес:</p>
                       </div>
                    </div>
                    <div className="col-xl-8">
                    </div>
                 </>
                 : null
          }

          <div className="col-xl-3 receiver-name">
             <div>
                <p className="mb-1">Имя получателя</p>
                <input
                    type="text"
                    name="full_name"
                    value={address.full_name}
                    onChange={handleCheckoutChange}
                    className="verify-element"
                    placeholder={"Имя"}
                    required
                    autoComplete={"new-password"}
                />
             </div>
          </div>

          <div className="col-xl-3 mb-3 receiver-phone">
             <div>
                <p className="mb-1">Телефон</p>
                <NumberFormat
                    placeholder={"+998"}
                    className="verify-element"
                    value={phone}
                    onChange={handlePhoneChange}
                    prefix={'+998'}
                    format="+998 ## ### ## ##" mask="_"
                    allowEmptyFormatting
                    required
                    autoComplete={"new-password"}
                />
             </div>
          </div>

          <div className="col-xl-6">
          </div>

          <div className="col-xl-3 region mt-4">
             <div>
                <p className="mb-1">Область</p>
                <Select
                    instanceId={'new-city-addr'}
                    className="my-select"
                    color={"red"}
                    value={cityOption}
                    //@ts-ignore
                    onChange={handleCitySelect}
                    options={parseCitiOptions()}
                    placeholder={"Выберите область"}
                    theme={theme => themeCustom(theme)}
                />
             </div>
          </div>
          <div className="col-xl-3 city mt-4">
             <div>
                <p className="mb-1">Город/Район</p>
                <Select
                    instanceId={'new-region-addr'}
                    className="my-select"
                    color={"red"}
                    value={regionOption}
                    //@ts-ignore
                    onChange={handleRegionSelect}
                    options={parseRegionOptions()}
                    placeholder={"Выберите город/район"}
                    theme={theme => themeCustom(theme)}
                />
             </div>
          </div>

          <div className="col-xl-3 full-addr mt-4">
             <div>
                <p className="mb-1">Полный адрес</p>
                <input
                    type="text"
                    name="address"
                    value={address.address}
                    className="verify-element"
                    placeholder={"Например: д.1, кв. 8"}
                    onChange={handleCheckoutChange}
                    required
                    autoComplete={"new-password"}
                />
             </div>
          </div>

       </form>
   )
};

export default AddressForm;