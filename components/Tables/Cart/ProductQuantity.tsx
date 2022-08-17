import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useTypedDispatch } from "../../../store/hooks/useTypedDispatch";
import useDebounce from "../../../helpers/useDebounce";

interface ProductQuantityProps {
  id: number;
  productQuant: number;
  stockQuant: number;
}

const ProductQuantity = ({
  id,
  productQuant,
  stockQuant,
}: ProductQuantityProps) => {
  const [quantity, setQuantity] = useState<number | string>(productQuant);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { addToCart } = useTypedDispatch();
  const debouncedQuantity = useDebounce(quantity, 200);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      import("react-facebook-pixel")
        .then((x) => x.default)
        .then((ReactPixel) => {
          ReactPixel.init(process.env.fbp as string);
          ReactPixel.pageView();
          ReactPixel.track("AddToCart", { content_ids: [id] });
        });
      addToCart(id, debouncedQuantity);
    }
  }, [debouncedQuantity]);

  const handleCartQuantity = (id: number, quantity: number) => {
    if (quantity >= 1) {
      // setCurrentItem(id)
      setQuantity(quantity);
    }
  };

  const handleQuantChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    // setCurrentItem(id)
    setQuantity(e.target.value);
  };

  return (
    <div className="quant-changer">
      <button
        disabled={quantity === 1}
        onClick={() => handleCartQuantity(id, +quantity - 1)}
        className="button-unstyled"
        type={"button"}
      >
        <AiOutlineMinus />
      </button>
      <span>
        {/*style={{padding: `${adding && currentItem === id ? '10px' : 0}`}}*/}
        {/*{adding && currentItem === id ?*/}
        {/*    <div className="cart-adding-spinner">*/}
        {/*    </div>*/}
        {/*    :*/}
        <input
          type={"number"}
          value={quantity}
          // placeholder={`${item.quantity}`}
          onChange={(e) => handleQuantChange(e, id)}
        />
        {/*}*/}
      </span>
      <button
        disabled={quantity === stockQuant}
        onClick={() => handleCartQuantity(id, +quantity + 1)}
        className="button-unstyled"
        type={"button"}
      >
        <AiOutlinePlus />
      </button>
    </div>
  );
};

export default ProductQuantity;
