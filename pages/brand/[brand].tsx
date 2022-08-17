import React, {useEffect} from 'react';
import FilterSidebar from "../../components/Filters/FilterSidebar/FilterSidebar";
import Layout from "../../components/Layout";
import {useRouter} from "next/router";
import Breadcrumbs from "../../components/BreadCrumbs";
import {useTypedSelector} from "../../store/hooks/useTypedSelector";
import {useTypedDispatch} from "../../store/hooks/useTypedDispatch";
import {stringToArrayParser} from "../../helpers/arrayOperations";
import FilterPagination from "../../components/Filters/Pagination";
import FilteredProducts from "../../components/Filters/FilteredProducts";
import Head from "next/head";

const Brand = () => {

   const {query, push} = useRouter();
   const {filteredProducts, params} = useTypedSelector(state => state.category);
   const {fetchCategoryFilteredProducts, clearFilteredProducts, fetchFilters} = useTypedDispatch();

   useEffect(() => {
      const page = query.page ? query.page : 1
      const brand_id = query.brand_id
      const feature_value_ids = stringToArrayParser(query.feature_value_ids)

      if (query.brand && brand_id) {
         const params = {
            page,
            brand_id,
            feature_value_ids,
         }
         fetchFilters(params)
         clearFilteredProducts({})
         fetchCategoryFilteredProducts(params)
      }
   }, [query.brand])


   return (
       <>
          <Head>
             <title>{`Eletron - ${query.brand}`}</title>
             <meta name="description"
                   content={"Интернет-магазин электрических и информационных систем в Ташкенте. Если вы ищите решения по электрике, освещению и автоматизации – добро пожаловать в Eletron.uz. Также, у нас широкий ассортимент лампочек, розеток, выключателей, автоматов, щитов, систем умного дома и автоматизации в Узбекистане. Узнать цены!"}/>
             <meta name="keywords" content={"электрические системы зданий, информационные системы зданий, сетевые светодиоды, сетевые системы, освещение IOT, высоковольтные кабельные крепления, монтажные системы, платформа IOT, умный дом, купить в ташкенте, в узбекистане"}/>

             <meta property="og:title" content={`Eletron - ${query.brand}`}/>
             <meta property="og:description"
                   content={"Интернет-магазин электрических и информационных систем в Ташкенте. Если вы ищите решения по электрике, освещению и автоматизации – добро пожаловать в Eletron.uz. Также, у нас широкий ассортимент лампочек, розеток, выключателей, автоматов, щитов, систем умного дома и автоматизации в Узбекистане. Узнать цены!"}/>
             <meta property="og:image" content={"/static/img/brand/ogimage.png"}/>
             <meta property="og:url" content={`https://eletron.uz/brand/${query.brand}?brand_id=${query.brand_id}`}/>
             <meta property="og:type" content={"website"}/>
             <meta property="og:site_name" content="Eletron.uz"/>
             <meta property="og:locale" content={"ru_RU"}/>
          </Head>

          <Layout>
             <section className="catalog-section">
                <Breadcrumbs/>
                <div className="container-fluid">
                   <div className="row">
                      <div className="col-lg-3 col-md-4">
                         <FilterSidebar type={"brand"}/>
                      </div>
                      <div className="col-lg-9 col-md-8">
                         {/*<div className="row">*/}
                         {/*   <div className="col-12">*/}
                         {/*      <div className="category-description">*/}
                         {/*         <h5><strong>{query.brand}</strong></h5>*/}
                         {/*      </div>*/}
                         {/*   </div>*/}
                         {/*</div>*/}

                         <FilteredProducts/>

                         <FilterPagination type={"brand"}/>

                      </div>
                   </div>
                </div>
             </section>
          </Layout>
       </>
   );
};

export default Brand;