import React, {useEffect} from 'react';
import Layout from "../../components/Layout";
import {useTypedSelector} from "../../store/hooks/useTypedSelector";
import {useTypedDispatch} from "../../store/hooks/useTypedDispatch";
import {useRouter} from "next/router";
import {getAsString} from "../../helpers/arrayOperations";
import Head from "next/head";
import ProductCard from "../../components/Product/Card";
import SearchPagination from "../../components/Search/SearchPagination";

const SearchPage = () => {

   const {searchProducts, searchMeta} = useTypedSelector(state => state.search)
   const {getSearchResults} = useTypedDispatch()
   const {query} = useRouter()

   useEffect(() => {
      if (query.param && !searchProducts.length) {
         getSearchResults(getAsString(query.param))
      }
      return () => {
      }
   }, [])

   const renderSearchedProducts = () => (
       searchProducts.map((item, i) => (
           <div key={i} className={"col-xl-3 col-lg-4 col-6"}>
              <ProductCard
                  id={item.random_shop.item_shop_id}
                  product_id={item.id}
                  name={item.name}
                  animateTime={i}
                  slug={item.slug}
                  quantity={item.random_shop.quantity}
                  price={item.random_shop.price}
                  img={item.image}
                  isNew={item.is_new}
                  isInCompare={item.is_in_comparison}
                  isInFav={item.favorite}
                  isInCart={item.is_in_cart}
              />
           </div>
       ))
   )

   return (
       <>
          <Head>
             <title>{`Поиск по запросу: "${query.param}"`}</title>
             <meta name="description"
                   content={"Интернет-магазин электрических и информационных систем в Ташкенте. Если вы ищите решения по электрике, освещению и автоматизации – добро пожаловать в Eletron.uz. Также, у нас широкий ассортимент лампочек, розеток, выключателей, автоматов, щитов, систем умного дома и автоматизации в Узбекистане. Узнать цены!"}/>
             <meta name="keywords"
                   content={"электрические системы зданий, информационные системы зданий, сетевые светодиоды, сетевые системы, освещение IOT, высоковольтные кабельные крепления, монтажные системы, платформа IOT, умный дом, купить в ташкенте, в узбекистане"}/>

             <meta property="og:title" content={`Поиск по запросу: "${query.param}"`}/>
             <meta property="og:description"
                   content={"Интернет-магазин электрических и информационных систем в Ташкенте. Если вы ищите решения по электрике, освещению и автоматизации – добро пожаловать в Eletron.uz. Также, у нас широкий ассортимент лампочек, розеток, выключателей, автоматов, щитов, систем умного дома и автоматизации в Узбекистане. Узнать цены!"}/>
             <meta property="og:image" content={"/static/img/brand/ogimage.png"}/>
             <meta property="og:url" content={"https://eletron.uz"}/>
             <meta property="og:type" content={"website"}/>
             <meta property="og:site_name" content="Eletron.uz"/>
             <meta property="og:locale" content={"ru_RU"}/>
          </Head>

          <Layout>
             <section className="search-section">
                <div className="container-fluid">
                   <div className="row">
                      <div className="offset-0 offset-md-1 col-md-10">
                         <div className="search-results">
                            <h3 className="mb-4">
                               Найдено{" "}
                               <span className="txt-yellow">
                                 {
                                    searchMeta.last_page === 1 ? searchProducts.length :
                                        (searchMeta?.last_page || 0) * 30
                                 }
                               </span>
                               {" "}товаров по запросу: <span className="txt-yellow">{query.param}</span>
                            </h3>
                            <div className="row">
                               {renderSearchedProducts()}
                            </div>
                            <div className="row">
                               <SearchPagination/>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </section>
          </Layout>
       </>
   );
};

export default SearchPage;