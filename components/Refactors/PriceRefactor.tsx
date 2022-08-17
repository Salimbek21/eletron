import React from 'react';

interface PriceRefactorProps {
   price: any,
   currency?: boolean,
   noText?: boolean,
}

const PriceRefactor: React.FC<PriceRefactorProps> = ({price = 0, currency= true, noText = false}) => {

   const formatPrice = (priceF: any) => {
      priceF = priceF.toString();

      if (priceF === "0" && !noText) return <span>Цена по запросу</span>

      switch (priceF.length) {
         case 4:
            priceF = priceF.slice(0, 1) + ' ' + priceF.slice(1, 4);
            break;
         case 5:
            priceF = priceF.slice(0, 2) + ' ' + priceF.slice(2, 5);
            break;
         case 6:
            priceF = priceF.slice(0, 3) + ' ' + priceF.slice(3, 6)
            break;
         case 7:
            priceF = priceF.slice(0, 1) + ' ' + priceF.slice(1, 4) + ' ' + priceF.slice(4, 7)
            break;
         case 8:
            priceF = priceF.slice(0, 2) + ' ' + priceF.slice(2, 5) + ' ' + priceF.slice(5, 8)
            break;
         case 9:
            priceF = priceF.slice(0, 3) + ' ' + priceF.slice(3, 6) + ' ' + priceF.slice(6, 9)
            break;
      }

      return (<div>{priceF}{currency ? <span> сум</span> : ''}</div>)
   };

   return (
       <React.Fragment>
          {formatPrice(price)}
       </React.Fragment>
   );
};

export default PriceRefactor;