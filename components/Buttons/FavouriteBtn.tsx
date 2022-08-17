import React, { FC, useState } from "react";
import { useTypedDispatch } from "../../store/hooks/useTypedDispatch";
import { notifySuccess, notifyError } from "../../helpers/NotifyBtn";
import CustomTooltip from "../Forms/CustomTooltip";

function SvgComponent(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 511.998 511.998"
      {...props}
    >
      <path d="M415.469 319.642l83.814-81.647c11.508-11.17 15.59-27.642 10.658-42.982-4.975-15.465-18.023-26.559-34.082-28.949l-115.838-16.929c-6.369-.664-11.856-4.66-14.692-10.68-2.558-5.438-9.042-7.773-14.485-5.215-5.438 2.558-7.779 9.042-5.215 14.485 6.102 12.972 18.111 21.6 31.681 23.015l115.375 16.875c7.893 1.176 14.071 6.44 16.526 14.077 2.417 7.512.512 15.247-5.106 20.702l-83.634 81.473c-10.451 9.695-14.921 23.897-12.041 37.577l19.602 114.853c1.355 7.953-1.72 15.465-8.22 20.103-6.304 4.491-14.159 4.921-21.159 1.094L275.25 423.069c-12.591-6.679-27.283-6.63-39.014-.011l-103.41 54.424c-6.973 3.647-14.959 3.037-21.366-1.628-6.358-4.638-9.363-11.938-8.035-19.564l19.618-114.983c2.167-13.739-2.232-27.626-11.84-37.234L27.88 222.377c-5.607-5.444-7.507-13.179-5.09-20.691 2.455-7.637 8.633-12.901 16.499-14.071l115.528-16.891c14.246-2.243 25.748-10.626 31.491-22.841l51.174-104.526c3.5-7.169 10.321-11.448 18.247-11.448 7.931-.005 14.752 4.279 18.258 11.448 2.64 5.4 9.151 7.648 14.561 5.003 5.4-2.64 7.643-9.156 5.003-14.561-7.126-14.594-21.622-23.663-37.822-23.663-16.194 0-30.68 9.069-37.805 23.657L166.679 138.46c-2.7 5.737-8.258 9.657-15.133 10.74L36.111 166.08c-16.026 2.39-29.074 13.478-34.049 28.943-4.937 15.345-.855 31.812 10.615 42.944l83.209 81.571c4.622 4.627 6.734 11.497 5.672 18.241L81.967 452.6c-2.733 15.71 3.653 31.36 16.657 40.848 13.054 9.515 30.026 10.794 44.321 3.31l103.699-54.571c5.514-3.108 12.4-3.048 18.443.142l103.269 54.348c6.336 3.473 13.228 5.188 20.087 5.188 8.427 0 16.799-2.602 24-7.735 13.266-9.444 19.798-25.345 17.049-41.496l-19.678-115.261c-1.394-6.637.598-13.033 5.655-17.731z" />
    </svg>
  );
}
interface FavouriteBtnProps {
  id: number;
  active?: number | boolean;
}
const FavouriteBtn: FC<FavouriteBtnProps> = ({ id, active }) => {
  const { toggleFavourite } = useTypedDispatch();
  const [isActive, setActive] = useState(active);
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

  const handleFavouriteClick = (id: number) => {
    if (isActive) {
      notifyError("Продукт удален из Избранных");
    } else {
      reactPixel.track("AddToWishlist", { content_ids: [id] });
      notifySuccess("Продукт добавлен в Избранные");
    }
    toggleFavourite(id);
    setActive((prevState) => !prevState);
  };

  return (
    <CustomTooltip title={"В избранное"}>
      <div
        className={`favourite-btn ${isActive ? "active" : ""}`}
        onClick={() => handleFavouriteClick(id)}
      >
        <SvgComponent />
      </div>
    </CustomTooltip>
  );
};

export default FavouriteBtn;
