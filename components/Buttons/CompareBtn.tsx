import React, {FC, useState} from 'react';
import {useTypedDispatch} from "../../store/hooks/useTypedDispatch";
import {notifySuccess, notifyError} from '../../helpers/NotifyBtn';
import CustomTooltip from "../Forms/CustomTooltip";

function SvgComponent() {
   return (
       <svg
           xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 64 64"
           width={50}
           height={50}
       >
          <path
              d="M48 22.5V25a1 1 0 001 1v3.143a1 1 0 00.725.961l3 .857a.989.989 0 00.55 0l3-.857a1 1 0 00.725-.963V26a1 1 0 001-1v-2.5a4.3 4.3 0 011.285-3.065A8.916 8.916 0 0062 13a9 9 0 10-15.383 6.335A4.514 4.514 0 0148 22.5zm7 5.884l-2 .572-2-.572V26h4zm-8.912-16.515a7.055 7.055 0 016.061-5.821A7 7 0 0157.889 18 6.309 6.309 0 0056 22.5V24h-2v-8.14A4 4 0 0057 12h-2a2 2 0 01-4 0h-2a4 4 0 003 3.858V24h-2v-1.5a6.5 6.5 0 00-1.965-4.579 6.973 6.973 0 01-1.947-6.052z"/>
          <path
              d="M44 33h8v4.069L36.12 38.2a4.25 4.25 0 00-8.345.6L12 39.926V36h8v-2H2v2h8v5a1 1 0 001 1h.071l16.947-1.211a4.2 4.2 0 00.253.528L16.586 53H16a4 4 0 00-4 4v2a1 1 0 001 1h38a1 1 0 001-1v-2a4 4 0 00-4-4h-.586L35.729 41.315a4.2 4.2 0 00.434-1.11L53.071 39A1 1 0 0054 38v-5h8v-2H44zm-12 4a2.273 2.273 0 11-2.272 2.272A2.275 2.275 0 0132 37zm18 20v1H14v-1a2 2 0 012-2h32a2 2 0 012 2zm-30.586-4l10.191-10.191a4.26 4.26 0 004.79 0L44.586 53z"/>
          <path
              d="M14.275 33.1a1 1 0 00.725-.957V29a1 1 0 001-1v-2.5a4.3 4.3 0 011.286-3.066A8.919 8.919 0 0020 16a9 9 0 10-15.383 6.335A4.514 4.514 0 016 25.5V28a1 1 0 001 1v3.143a1 1 0 00.726.962l3 .856a.986.986 0 00.549 0zm-8.24-12.18a6.97 6.97 0 01-1.946-6.053 7.054 7.054 0 016.06-5.822A7 7 0 0115.89 21 6.312 6.312 0 0014 25.5V27h-2v-7.142a4 4 0 10-2 0V27H8v-1.5a6.5 6.5 0 00-1.965-4.575zM11 18a2 2 0 112-2 2 2 0 01-2 2zM9 31.389V29h4v2.389l-2 .571z"/>
       </svg>
   )
}

interface CompareBtnProps {
   id: number,
   active?: number | boolean
}

const CompareBtn: FC<CompareBtnProps> = ({id, active = false}) => {

   const {toggleCompare} = useTypedDispatch();
   const [isCompareActive, setCompareActive] = useState(active)

   const handleCompareClick = (id: number) => {
      if (isCompareActive) {
         notifyError("Продукт удален со Сравнений")
      } else {
         notifySuccess("Продукт добавлен в Сравнение")
      }
      toggleCompare(id)
      setCompareActive(prevState => !prevState)
   }

   return (
       <CustomTooltip title={"В сравнение"}>
          <div
              className={`compare-btn ${isCompareActive ? 'active' : ''}`}
              onClick={() => handleCompareClick(id)}
          >
             {/*<img src={"/static/img/icons/compare.svg"} alt={"compare"} />*/}
             <SvgComponent/>
          </div>
       </CustomTooltip>
   );
};

export default CompareBtn;