import React, { useState, useEffect } from "react";
import Link from "next/link";
import HeaderCategories from "./headerCategories";
import ClickAwayListener from "react-click-away-listener";
import HeaderCategoriesMob from "../mobile/headerCategoriesMob";

const Menu = () => {
  const [isCatMenuOpen, setCatMenuOpen] = useState(false);
  const [anchor, setAnchor] = useState("left");
  const [deviceWidth, setDeviceWidth] = useState(0);

  useEffect(() => {
    // component did mount
    setDeviceWidth(window.innerWidth);
  }, []);

  const handleClickAway = () => {
    setCatMenuOpen(false);
  };

  const handleMenuOpen = (anchor = "left") => {
    setAnchor(anchor);
    setCatMenuOpen(!isCatMenuOpen);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <nav className="main_nav">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="main_nav_content d-flex flex-row">
                <div
                  className="cat_menu_container left"
                  onClick={() => handleMenuOpen("left")}
                >
                  <div className="cat_menu_title d-flex flex-row align-items-center">
                    <div style={{width: "50px"}}>
                        <img src='/123a.svg'/>
                    </div>
                    <div className="cat_menu_text">Категории</div>
                  </div>
                </div>

                {/* HeaderCategories opened nav-bar for large screens */}
                {isCatMenuOpen && deviceWidth > 1200 ? (
                  <HeaderCategories handleClickAway={handleClickAway} />
                ) : (
                  <HeaderCategoriesMob
                    anchor={anchor}
                    open={isCatMenuOpen}
                    onMenuOpen={handleMenuOpen}
                    deviceWidth={deviceWidth}
                  />
                )}

                <div
                  className="cat_menu_container right"
                  onClick={() => handleMenuOpen("right")}
                >
                  <div className="cat_menu_title d-flex flex-row align-items-center">
                    <div className="cat_menu_text">Меню</div>
                    <div style={{width: "50px"}}>
                        <img src='/neww.svg'/>
                    </div>
                  </div>
                </div>

                {/* Same nav-bar for mobile devices */}
                {
                  // isCatMenuOpen && deviceWidth >= 768 ? <HeaderCategories/> : null
                }

                <div className="main_nav_menu ml-auto">
                  <ul className="standard_dropdown main_nav_dropdown">
                    {/* <li className="special">
                      <Link href={"/constructor"}>
                        <a>Конструктор</a>
                      </Link>
                    </li> */}
                    <li className="special">
                      <Link href={"/about"}>
                        <a>О нас</a>
                      </Link>
                    </li>
                    <li className="special">
                      <Link href={"/branches"}>
                        <a>Филиалы</a>
                      </Link>
                    </li>
                    <li className="special">
                      <Link href={"/news"}>
                        <a>Новости</a>
                      </Link>
                    </li>
                    <li className="special">
                      <Link href={"/contact"}>
                        <a>Контакты</a>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="menu_trigger_container ml-auto">
                  <div
                    // onClick={this.props.Callback}
                    className="menu_trigger d-flex flex-row align-items-center justify-content-end"
                  >
                    <div className="menu_burger">
                      <div className="menu_trigger_text">Меню</div>
                      <div className="cat_burger menu_burger_inner">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </ClickAwayListener>
  );
};

export default Menu;
