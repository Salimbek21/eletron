import React, { FC } from "react";
import cls from "../constructor.module.scss";

interface LoaderProps {
  width: number | undefined;
  height: number | undefined;
}

const Loader: FC<LoaderProps> = ({ width = 60, height = 60 }) => {
  return (
    <div
      className={cls.loade}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: "30%",
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: "rgba(255,255,255,0.8)",
      }}
    >
      <svg
        width={38}
        height={38}
        viewBox="0 0 38 38"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#222f3e"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)" strokeWidth="2">
            <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
            <path d="M36 18c0-9.94-8.06-18-18-18">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Loader;
