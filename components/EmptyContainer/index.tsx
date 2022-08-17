import React, {FC} from 'react';

interface EmptyContainerProps {
   type: string,
   txt: string
}

const EmptyContainer: FC<EmptyContainerProps> = ({type, txt}) => {
   return (
       <div className={"empty-container"}>
          <div className={"empty-img"}>
             <img src={`/static/img/icons/e-${type}.png`} alt={type}/>
          </div>
          <h1><strong>{txt}</strong></h1>
       </div>
   );
};

export default EmptyContainer;