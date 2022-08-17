import React, { FC, useState } from "react";

import { isElementInArray } from "../../helpers/arrayOperations";
import {
  notifySuccess,
  notifyWarn,
  notifyError,
} from "../../helpers/NotifyBtn";
import { useTypedDispatch } from "../../store/hooks/useTypedDispatch";
import { useTypedSelector } from "../../store/hooks/useTypedSelector";

interface AddToCartBtnProps {
  id: number;
  txt: string;
  width?: number;
  bold?: boolean;
  disabled: boolean;
  className?: string;
  active?: number | boolean;
}

const AddToCartBtn: FC<AddToCartBtnProps> = ({
  txt,
  width,
  bold = false,
  disabled = false,
  id,
  className = "",
  active = false,
}) => {
  const { addToCart } = useTypedDispatch();
  const { cart, adding } = useTypedSelector((state) => state.cart);
  const [isCartActive, setCartActive] = useState(active);
  const [reactPixel, setReactPixel] = useState<any>();

  React.useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(process.env.fbp as string);
        ReactPixel.pageView();
        setReactPixel(ReactPixel);
      });
  }, []);

  const handleAddAction = () => {
    if (cart?.items && isElementInArray(cart?.items, +id)) {
      notifyWarn("Товар уже находится в корзине!");
    } else {
      if (id) {
        setCartActive(true);
        notifySuccess("Товар добавлен в корзину");
        reactPixel.track("AddToCart", { content_ids: [id] });
        addToCart(id, 1);
      } else notifyError("Id is missing!");
    }
  };

  return (
    <button
      className={`btn-eletron main ${className} ${
        isCartActive ? "active" : ""
      }`}
      type={"button"}
      disabled={disabled}
      style={{ width: width ? width : "auto" }}
      onClick={() => handleAddAction()}
    >
      {bold ? <strong>{txt}</strong> : txt}
    </button>
  );
};

export default AddToCartBtn;
