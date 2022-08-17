import React from 'react';
import ReactPaginate from "react-paginate";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";
import {useTypedSelector} from "../../store/hooks/useTypedSelector";
import useDeviceSize from "../../helpers/hooks/useDeviceSize";
import {useRouter} from "next/router";
import {getAsString} from "../../helpers/arrayOperations";
import {useTypedDispatch} from "../../store/hooks/useTypedDispatch";

const SearchPagination = () => {

   const {searchMeta} = useTypedSelector(state => state.search)
   const {getSearchResults, clearSearchResults} = useTypedDispatch()
   const {query} = useRouter()
   const [width] = useDeviceSize()

   const handleSearchPaginate = (pageObj: any) => {
      const page = pageObj.selected + 1;
      if (query.param) {
         window.scrollTo({top: 0, behavior: 'smooth'})
         clearSearchResults()
         getSearchResults(getAsString(query.param), page)
      }
   }

   return (
       <div className={"col-12"}>
          {
             searchMeta.total !== 0 ?
                 <ReactPaginate
                     marginPagesDisplayed={width <= 991 ? 2 : 5}
                     pageRangeDisplayed={2} // three dots margin
                     pageCount={searchMeta && searchMeta.last_page ? searchMeta.last_page : 0}
                     onPageChange={handleSearchPaginate}
                     containerClassName={'list'}
                     // necessary when page is refreshed "F5"
                     forcePage={searchMeta.current_page ? searchMeta.current_page - 1 : 0}
                     pageClassName={'page-item'}
                     pageLinkClassName={'page-link'}
                     previousClassName={'page-item'}
                     previousLinkClassName={'page-link'}
                     nextClassName={'page-item'}
                     nextLinkClassName={'page-link'}
                     breakClassName={'page-item break'}
                     breakLinkClassName={'page-link break-link'}
                     previousLabel={<FiChevronLeft/>}
                     nextLabel={<FiChevronRight/>}
                 />
                 : null
          }
       </div>
   );
};

export default SearchPagination;