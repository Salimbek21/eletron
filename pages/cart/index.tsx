import React, {useEffect} from 'react';
import Layout from "../../components/Layout";
import CartTable from "../../components/Tables/Cart";
import Link from "next/link"
import {useTypedDispatch} from "../../store/hooks/useTypedDispatch";
import {useTypedSelector} from "../../store/hooks/useTypedSelector";
import PriceRefactor from "../../components/Refactors/PriceRefactor";
import Head from "next/head";
import LoaderCircle from "../../components/Loader/LoaderCircle";
import EmptyContainer from "../../components/EmptyContainer";

const Cart = () => {

  const {fetchCart} = useTypedDispatch()
  const {cart, cartLoading} = useTypedSelector(state => state.cart)

  useEffect(() => {
    fetchCart()
  }, [])

  return (
    <>
      <Head>
        <title>Корзина пользователя</title>
        <meta name="description"
              content={"Интернет-магазин электрических и информационных систем в Ташкенте. Если вы ищите решения по электрике, освещению и автоматизации – добро пожаловать в Eletron.uz. Также, у нас широкий ассортимент лампочек, розеток, выключателей, автоматов, щитов, систем умного дома и автоматизации в Узбекистане. Узнать цены!"}/>
        <meta name="keywords"
              content={"электрические системы зданий, информационные системы зданий, сетевые светодиоды, сетевые системы, освещение IOT, высоковольтные кабельные крепления, монтажные системы, платформа IOT, умный дом, купить в ташкенте, в узбекистане"}/>

        <meta property="og:title"
              content={"Магазин решений электрических и информационных сетей в Ташкенте | Eletron"}/>
        <meta property="og:description"
              content={"Интернет-магазин электрических и информационных систем в Ташкенте. Если вы ищите решения по электрике, освещению и автоматизации – добро пожаловать в Eletron.uz. Также, у нас широкий ассортимент лампочек, розеток, выключателей, автоматов, щитов, систем умного дома и автоматизации в Узбекистане. Узнать цены!"}/>
        <meta property="og:image" content={"/static/img/brand/ogimage.png"}/>
        <meta property="og:url" content={"https://eletron.uz/cart"}/>
        <meta property="og:type" content={"website"}/>
        <meta property="og:site_name" content="Eletron.uz"/>
        <meta property="og:locale" content={"ru_RU"}/>
      </Head>

      <Layout>
        <section className="cart-section">
          <div className="container">
            <div className="row">

              {
                cartLoading ?
                  <div className={"col-12"}>
                    <LoaderCircle/>
                  </div>
                  : !cartLoading && cart?.total_count === 0 ?
                    <div className={"col-12"}>
                      <EmptyContainer type={'cart'} txt={"Корзина пуста!"}/>
                    </div>
                    :
                    <>
                      <div className="col-12">
                        <h3 className="mb-3"><strong>Корзина</strong></h3>
                      </div>
                      <div className="col-lg-12 col-xl-8 mb-4">
                        <CartTable columns={['', 'Наименование', 'Цена за ед.', 'Кол-во', 'Всего']}/>
                      </div>
                      <div className="col-lg-12 col-xl-4 ">
                        <div className="cartSummary">
                          <div className="cartSummaryTitle">
                            <strong>Итого:</strong>
                          </div>
                          <div className="cartSummaryCount">
                            <strong>Кол-во товаров:</strong> {cart?.total_count}
                          </div>

                          <div className="cartSummaryTotal">
                            <strong>Итого к оплате:</strong> <PriceRefactor price={cart?.total}/>
                          </div>

                          <div className="cartSummaryButtons">
                            <Link href={"/"}>
                              <a className="btn-eletron silver">Продолжить покупки</a>
                            </Link>
                            {
                              cart?.total_count ?
                                <Link href={`/checkout`}>
                                  <a className="btn-eletron main">Оформить заказ</a>
                                </Link>
                                :
                                <Link href={`/`}>
                                  <a className="btn-eletron main">Оформить заказ</a>
                                </Link>
                            }
                          </div>
                        </div>
                      </div>
                      {/*<div className="col-12">
                        <CartTable
                          columns={['', 'Наименование', 'Цена за ед.', 'Кол-во', 'Всего']}
                        />
                        <div className="mt-5 summary">
                          <div className="content">
                            <div className="top">
                              <strong>Итог:</strong>
                            </div>
                            <div className="middle">
                              <p><strong>Кол-во товаров:</strong> {cart?.total_count} шт</p>
                              <p><strong>Итого к оплате:</strong> <PriceRefactor price={cart?.total}/></p>
                            </div>
                          </div>
                        </div>
                        <div className="control-cart mt-4">
                          <Link href={"/"}>
                            <a className="btn-eletron silver mr-4">Продолжить покупки</a>
                          </Link>
                          {
                            cart?.total_count ?
                              <Link href={`/checkout`}>
                                <a className="btn-eletron main">Оформить заказ</a>
                              </Link>
                              :
                              <Link href={`/`}>
                                <a className="btn-eletron main">Оформить заказ</a>
                              </Link>
                          }
                        </div>
                      </div>*/}
                    </>
              }

            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Cart;