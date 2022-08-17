import React, {FC} from 'react';

interface FieldCheckoutProps {
   inputState: string,

   onChange(): void,

   p: string,
   placeHolder: string
}

const FieldCheckout: FC<FieldCheckoutProps> = ({inputState, p, placeHolder, onChange}) => {
   return (
       <div>
          <p className="mb-1">{p}</p>
          <input
              type="text"
              className="verify-element"
              value={inputState}
              placeholder={placeHolder}
              onChange={onChange}
          />
       </div>
   );
};

export default FieldCheckout;