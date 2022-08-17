import React, {useEffect} from 'react';
import Cookies from "universal-cookie";
import Link from "next/link";
import Search from "../../../Search";
import {useTypedSelector} from '../../../../store/hooks/useTypedSelector';
import {useTypedDispatch} from '../../../../store/hooks/useTypedDispatch';
import {useRouter} from "next/router";
import CustomTooltip from "../../../Forms/CustomTooltip";


const HeaderMain = () => {

   const cookies = new Cookies()
   const {push} = useRouter()
   const {cart} = useTypedSelector(state => state.cart)
   const {fetchCart} = useTypedDispatch();
   const {classes} = useTypedSelector(state => state.compare)

   useEffect(() => {
      if (!cart || !cart.total)
         fetchCart()
   }, [])

   const authIconClicked = () => {
      if (cookies.get("access_token"))
         return push('/profile?nav=orders')
      else
         return push('/login')
   }

   return (
       <div className="header_main">
          <div className="container-fluid">
             <div className="row">
                <div className="col-lg-3 col-sm-3 col-3 order-1">
                   <div className="logo_container">
                      <div className="logo">
                         <Link href="/">
                            <a className="d-block"><img src="/static/img/brand/logo.png" alt="Eletron"/></a>
                         </Link>
                      </div>
                   </div>
                </div>
                <Search/>
                <div
                    className="col-xl-3 col-lg-4 col-9 order-lg-3 order-2 text-lg-left text-right d-flex align-items-center justify-content-end">
                   <div className="wishlist_cart d-flex flex-row align-items-center justify-content-end">
                      <div className="wishlist d-flex flex-row align-items-center justify-content-end">


                         <CustomTooltip title={"Сравнение"}>
                            <div className="wishlist_icon">
                               <Link
                                   href={{
                                      pathname: '/compare',
                                      query: {compareClass: classes.length ? classes[0].id.toString() : ''}
                                   }}
                                   as={`/compare?compareClass=${classes.length ? classes[0].id.toString() : ''}`}
                               >
                                  <a><img src="/static/img/icons/compare.svg" alt="compare"/></a>
                               </Link>
                            </div>
                         </CustomTooltip>
                      </div>
                      <div className="wishlist d-flex flex-row align-items-center justify-content-end">


                         <CustomTooltip title={"Избранное"}>
                            <div className="wishlist_icon">
                               <Link href={"/favourite"}>
                                  <a><img src="/static/img/icons/star.svg" alt="favourite"/></a>
                               </Link>
                            </div>
                         </CustomTooltip>
                      </div>

                      <div className="wishlist d-flex flex-row align-items-center justify-content-end">


                         <CustomTooltip title={"Профиль"}>
                            <div className="wishlist_icon">
                               <img
                                   src="/static/img/icons/user.svg"
                                   alt="user"
                                   onClick={authIconClicked}
                                   className={"c-pointer"}
                               />
                               {/*<Link {...url}>*/}
                               {/*   <a><img src="/static/img/icons/user.png" alt="user"/></a>*/}
                               {/*</Link>*/}
                            </div>
                         </CustomTooltip>
                      </div>

                      <div className="cart">
                         <div
                             className="cart_container d-flex flex-row align-items-center justify-content-end">


                            <CustomTooltip title={"Корзина"}>
                               <div className="cart_icon">
                                  <Link href={"/cart"}>
                                     <a>
                                        <img src="/static/img/icons/cart.svg" alt="cart"/>
                                        <div className="cart_count">
                                       <span>
                                          <strong>
                                             {cart?.total_count ? cart?.total_count : 0}
                                          </strong>
                                       </span>
                                        </div>
                                     </a>
                                  </Link>
                               </div>
                            </CustomTooltip>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
   );
};

export default HeaderMain;