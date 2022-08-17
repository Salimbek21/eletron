import React, { FC, useState, useEffect } from "react";
import cls from "../constructor.module.scss";

interface BottomProps {
  totalPrice: number;
  numberOfPositions: number;
  addToCart: () => void;
}
const titles = ["позиция", "позиции", "позиций"];

const Bottom: FC<BottomProps> = ({
  totalPrice,
  numberOfPositions,
  addToCart,
}) => {
  const [declarationOfPositions, setDeclarationOfPositions] =
    useState<string>("");

  useEffect(() => {
    changeDeclarationOfPositions();
  }, [numberOfPositions]);

  const changeDeclarationOfPositions = (): void => {
    setDeclarationOfPositions(
      titles[
        numberOfPositions % 10 === 1 && numberOfPositions % 100 !== 11
          ? 0
          : numberOfPositions % 10 >= 2 &&
            numberOfPositions % 10 <= 4 &&
            (numberOfPositions % 100 < 10 || numberOfPositions % 100 >= 20)
          ? 1
          : 2
      ]
    );
  };
  return (
    <div
      style={{
        maxWidth: "1220px",
        paddingRight: "20px",
        paddingLeft: "20px",
        marginRight: "auto",
        marginLeft: "auto",
      }}
    >
      <div className={cls.config__bottom}>
        <div className={cls.config__bottomLeft}>
          <div className={cls.configBottomSettings}>
            <div className={cls.configBottomSettings__blocks}>
              <div
                className={`${cls.configBottomSettings__block} ${cls.configBottomSettings__block_choice}`}
              >
                <div className={`${cls.myBtn} ${cls.myBtn_gray} ${cls.filled}`}>
                  выбор рамки
                </div>
              </div>

              <div
                className={`${cls.configBottomSettings__block} ${cls.configBottomSettings__block_choice}`}
              >
                <div className={`${cls.myBtn} ${cls.myBtn_gray} ${cls.filled}`}>
                  выбор механизма
                </div>
              </div>
            </div>
            <div className={cls.configBottomSettings__result}>
              <div className={cls.configResult}>
                <div className={cls.configResult__top}>
                  <div className={cls.configResult__topLeft}>
                    <div className={cls.configResult__price}>
                      <div className={cls.configResult__priceText}>
                        Стоимость комплекта
                      </div>
                      <div className={cls.configResult__pricePos}>
                        (
                        <span>
                          {numberOfPositions} {declarationOfPositions}
                        </span>
                        )
                      </div>
                    </div>
                  </div>

                  <div className={cls.configResult__topRight}>
                    <div className={cls.configResult__rub}>
                      <span>{totalPrice}</span> сум.
                    </div>
                  </div>
                </div>

                <div className={cls.configResult__bottom}>
                  <div className={cls.configResult__add}>
                    <a
                      className={`${cls.configResult__button} ${cls.button} ${cls.myBtn}`}
                      onClick={() => addToCart()}
                    >
                      Добавить в корзину
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bottom;
