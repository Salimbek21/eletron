import React, { useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useTypedSelector } from "../../store/hooks/useTypedSelector";
import { useRouter } from "next/router";
import { useTypedDispatch } from "../../store/hooks/useTypedDispatch";

const FilterPagination = ({ type = 'category', id = 0 }) => {

   const { filteredProducts, params } = useTypedSelector(state => state.category)
   const { query, push } = useRouter();
   const [deviceWidth, setDeviceWidth] = useState(0)
   const { fetchCategoryFilteredProducts, clearFilteredProducts } = useTypedDispatch();

   useEffect(() => {
      setDeviceWidth(window.innerWidth)
   }, [])

   const smoothScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
   }

   // @ts-ignore
   const paginateHandlerBrand = (pageObj: any) => { // pagination for brands
      const page = pageObj.selected + 1;
      const brand = query.brand;
      const brand_id = query.brand_id;
      const feature_value_ids = query.feature_value_ids ? query.feature_value_ids : '';

      clearFilteredProducts(filteredProducts.meta)
      fetchCategoryFilteredProducts({
         ...params,
         page
      })
      push(
         { pathname: `/brand/[brand]`, query: { brand, page, brand_id, feature_value_ids } },
         `/brand/${brand}?brand_id=${brand_id}&page=${page}&feature_value_ids=${feature_value_ids}`,
         { shallow: true, scroll: true }   // shallow:true will not recall getServerSideProps()
      ).then(() => smoothScrollToTop())
   }

   // @ts-ignore
   const paginateHandlerCategory = (pageObj: any) => { // pagination for categories
      const page = pageObj.selected + 1;
      const slug = query.slug;
      const brand_ids = query.brand_ids ? query.brand_ids : '';
      const feature_value_ids = query.feature_value_ids ? query.feature_value_ids : '';

      clearFilteredProducts(filteredProducts.meta)
      fetchCategoryFilteredProducts({
         ...params,
         category_id: id,
         page
      })
      push(
         { pathname: `/catalog/[slug]`, query: { slug, page, brand_ids } },
         `/catalog/${slug}?page=${page}&feature_value_ids=${feature_value_ids}&brand_ids=${brand_ids}`,
         { shallow: true, scroll: true }   // shallow:true will not recall getServerSideProps()
      ).then(() => smoothScrollToTop())
   }

   return (
      <div className="row">
         <div className="col-12">
            <div className="catalog-paginate">
               {
                  filteredProducts.meta?.total !== 0 ?
                     <ReactPaginate
                        marginPagesDisplayed={deviceWidth <= 991 ? 2 : 5} //
                        pageRangeDisplayed={2} // three dots margin
                        pageCount={filteredProducts.meta && filteredProducts.meta.last_page ?
                           filteredProducts.meta.last_page : 0}
                        onPageChange={type === 'brand' ? paginateHandlerBrand : paginateHandlerCategory}
                        containerClassName={'list'}
                        // necessary when register is refreshed F5
                        forcePage={filteredProducts.meta?.current_page ?
                           filteredProducts.meta?.current_page - 1 : 0}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        previousClassName={'page-item'}
                        previousLinkClassName={'page-link'}
                        nextClassName={'page-item'}
                        nextLinkClassName={'page-link'}
                        breakClassName={'page-item break'}
                        breakLinkClassName={'page-link break-link'}
                        previousLabel={
                           // filteredProducts.products.length > 1 ?
                           <FiChevronLeft />
                           // : null
                        }
                        nextLabel={
                           // filteredProducts.products.length > 1 ?
                           <FiChevronRight />
                           // : null
                        }
                     />
                     : null
               }
            </div>
         </div>
      </div>
   );
};

export default FilterPagination;