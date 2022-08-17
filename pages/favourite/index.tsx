import React, {useEffect} from 'react';
import Layout from "../../components/Layout";
import FavouriteTable from "../../components/Tables/Favourite";
import {useTypedSelector} from "../../store/hooks/useTypedSelector";
import {useTypedDispatch} from "../../store/hooks/useTypedDispatch";
import LoaderCircle from "../../components/Loader/LoaderCircle";
import Head from "next/head";
import EmptyContainer from "../../components/EmptyContainer";

const Favourite = () => {

   const {favLoading, meta, favouriteProducts} = useTypedSelector(state => state.favourite)
   const {fetchFavourites} = useTypedDispatch()

   useEffect(() => {
      fetchFavourites(1)
   }, [])

   return (
       <>
          <Head>
             <title>Избранные товары</title>
             <meta name="description"
                   content={"Интернет-магазин электрических и информационных систем в Ташкенте. Если вы ищите решения по электрике, освещению и автоматизации – добро пожаловать в Eletron.uz. Также, у нас широкий ассортимент лампочек, розеток, выключателей, автоматов, щитов, систем умного дома и автоматизации в Узбекистане. Узнать цены!"}/>
             <meta name="keywords" content={"электрические системы зданий, информационные системы зданий, сетевые светодиоды, сетевые системы, освещение IOT, высоковольтные кабельные крепления, монтажные системы, платформа IOT, умный дом, купить в ташкенте, в узбекистане"}/>

             <meta property="og:title" content={"Магазин решений электрических и информационных сетей в Ташкенте | Eletron"}/>
             <meta property="og:description"
                   content={"Интернет-магазин электрических и информационных систем в Ташкенте. Если вы ищите решения по электрике, освещению и автоматизации – добро пожаловать в Eletron.uz. Также, у нас широкий ассортимент лампочек, розеток, выключателей, автоматов, щитов, систем умного дома и автоматизации в Узбекистане. Узнать цены!"}/>
             <meta property="og:image" content={"/static/img/brand/ogimage.png"}/>
             <meta property="og:url" content={"https://eletron.uz"}/>
             <meta property="og:type" content={"website"}/>
             <meta property="og:site_name" content="Eletron.uz"/>
             <meta property="og:locale" content={"ru_RU"}/>
          </Head>

          <Layout>
             <section className="favourite-section">
                <div className="container-fluid">
                   <div className="row">

                      {
                         favouriteProducts.length > 0 &&
                         <div className="col-12">
                            <h5 className="mb-5"><strong>Избранное</strong></h5>
                         </div>
                      }


                   </div>
                   <div className="row">
                      <div className="col-12">
                         {
                            favLoading && !favouriteProducts.length ? <LoaderCircle/>
                                :
                                !favLoading && !favouriteProducts.length ?
                                    <EmptyContainer type={'fav'} txt={'Список избранного пуст!'}/>
                                    :
                                    <FavouriteTable
                                        columns={['', 'Наименование', 'Цена', '']}
                                        body={favouriteProducts}
                                    />
                         }
                      </div>
                   </div>
                </div>
             </section>
          </Layout>
       </>
   );
};

export default Favourite;