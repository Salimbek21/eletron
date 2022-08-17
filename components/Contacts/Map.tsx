import React from 'react';
import {YMaps, Map, ZoomControl, Placemark, FullscreenControl} from 'react-yandex-maps';

const ContactMap = () => {
   return (
       <div className={"contact-map"}>
          <YMaps query={{lang: 'en_RU'}}>
             <div>
                <Map
                    width={'100%'} height={650}
                    /*Here center is chosen between Riga and Tashkent,
                     so that 2 cities could be clearly visible*/
                    defaultState={{center: [41.291756, 69.261752], zoom: 13}}>
                   <Placemark
                       geometry={[41.291700, 69.261552]}
                       options={{iconColor: '#FF4433', preset: 'islands#dotIcon'}}
                       properties={{iconCaption: 'Офис в Ташкенте'}}
                   />
                    <Placemark
                       geometry={[41.276386, 69.2647714]}
                       options={{iconColor: '#FF4433', preset: 'islands#dotIcon'}}
                       properties={{iconCaption: 'Офис в Ташкенте'}}
                   />
                   <ZoomControl options={{float: 'right'}}/>
                   <FullscreenControl />
                </Map>
             </div>
          </YMaps>
       </div>
   );
};

export default ContactMap;