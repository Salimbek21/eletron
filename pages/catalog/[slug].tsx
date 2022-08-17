import React, {useEffect} from 'react';
import Layout from "../../components/Layout";
import Breadcrumbs from "../../components/BreadCrumbs";
import FilterSidebar from "../../components/Filters/FilterSidebar/FilterSidebar";
import {GetServerSideProps} from 'next'
import axios from "axios";
import url from "../../api/url";
import {useRouter} from "next/router";
import {useTypedDispatch} from "../../store/hooks/useTypedDispatch";
import {stringToArrayParser} from "../../helpers/arrayOperations";
import FilterPagination from "../../components/Filters/Pagination";
import FilteredProducts from "../../components/Filters/FilteredProducts";
import Head from "next/head";

interface CategoryProps {
   singleCategory: {
      id: number,
      name: string,
      slug: string,
      description: string,
      meta_description: string,
      meta_keywords: string,
      meta_title: string,
      image: string,
      parent: {}
   }
}

const Category: React.FC<CategoryProps> = ({singleCategory}) => {

   const {query} = useRouter();
   const {fetchCategoryFilteredProducts, clearFilteredProducts, fetchFilters} = useTypedDispatch();

   const {
      description, meta_description,
      meta_keywords, meta_title, name, image
   } = singleCategory;

   const createMarkup = (html: any) => {
      return {__html: html};
   }

   useEffect(() => {
      const page = query.page ? query.page : 1
      const brand_ids = stringToArrayParser(query.brand_ids)
      const feature_value_ids = stringToArrayParser(query.feature_value_ids)

      if (query.slug && singleCategory.id) {
         const params = {
            category_id: singleCategory.id,
            page,
            brand_ids,
            feature_value_ids,
         }
         fetchFilters(params)
         clearFilteredProducts({})
         fetchCategoryFilteredProducts(params)
      }
   }, [query.slug])

   return (
       <>
          <Head>
             <title>{meta_title}</title>
             <meta charSet="UTF-8"/>
             <meta name="description" content={meta_description}/>
             <meta name="keywords" content={meta_keywords}/>

             <meta property="og:title" content={meta_title}/>
             <meta property="og:description" content={meta_description}/>
             <meta property="og:image" content={image}/>
             <meta property="og:url" content={`https://eletron.uz/catalog/${singleCategory.slug}`}/>
             <meta property="og:type" content={"website"}/>
             <meta property="og:site_name" content="Eletron.uz"/>
             <meta property="og:locale" content={"ru_RU"}/>
          </Head>
          <Layout
              title={meta_title}
              description={meta_description}
              keywords={meta_keywords}
              img={image}
          >
             <section className="catalog-section">
                <Breadcrumbs
                    catalogCrumbs={{
                       id: singleCategory.id,
                       slug: singleCategory.slug,
                       name: singleCategory.name,
                       parent: singleCategory.parent
                    }}
                    url={'/catalog'}
                />
                <div className="container-fluid">
                   <div className="row">
                      <div className="col-xl-3 col-lg-3 col-md-4">
                         <FilterSidebar key={"catalog-filter"} type={"category"}/>
                      </div>
                      <div className="col-xl-9 col-lg-9 col-md-8">
                         <div className="row">
                            <div className="col-12">
                               <div className="category-description">
                                  <h5
                                      className={
                                         `${!description || description.length === 0 ? 'mb-0' : ''}`
                                      }
                                  >
                                     <strong>{name}</strong>
                                  </h5>
                                  <div dangerouslySetInnerHTML={createMarkup(description)}>
                                  </div>
                               </div>
                            </div>
                         </div>

                         <FilteredProducts/>

                         <FilterPagination type={"category"} id={singleCategory.id}/>


                      </div>
                   </div>
                </div>
             </section>
          </Layout>
       </>
   );
};


export const getServerSideProps: GetServerSideProps = async (context) => {

   let data = {};

   await axios.get(
       `${url}/api/categories?slug=${context.query.slug}`
   )
       .then(res => data = res.data.data)
       .catch(e => {
          context.res.statusCode = 302
          context.res.setHeader('Location', `/404`)
          return {props: {}}
       })

   return {
      props: {
         singleCategory: data
      }
   }
}


export default Category;