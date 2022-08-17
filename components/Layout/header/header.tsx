import React, { FC, useEffect } from "react";
import HeaderContact from "./headerTop/headerContact";
import HeaderMain from "./headerTop/headerMain";
import Menu from "./headerOpened/menu";
import { useTypedDispatch } from "../../../store/hooks/useTypedDispatch";
import { useTypedSelector } from "../../../store/hooks/useTypedSelector";

const Header = () => {
  const { fetchCategories } = useTypedDispatch();
  const { category } = useTypedSelector((state) => state); // typescript validated useSelector
  const contacts = useTypedSelector((state) => state.contacts);
  const { categories } = category;

  useEffect(() => {
    if (!categories.length) fetchCategories();
  }, []);

  return (
    <header className="header">
      <HeaderContact />
      <HeaderMain />
      <Menu />
    </header>
  );
};

export default Header;
