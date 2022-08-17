import React, { useState,useEffect } from "react";
import Link from "next/link";
import PriceRefactor from "../Refactors/PriceRefactor";
import AddToCartBtn from "../Buttons/AddToCartBtn";
import { useTypedDispatch } from "../../store/hooks/useTypedDispatch";
import { useTypedSelector } from "../../store/hooks/useTypedSelector";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import LoaderDots from "../Loader/LoaderDots";
import { useRouter } from "next/router";
import { FaTimes } from "react-icons/fa";
import useDebounce from "./use-debounce"

const Search = () => {
  const [searchHidden, setSearchHidden] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [reactPixel, setReactPixel] = useState<any>({});
  const { getSearchResults, clearSearchResults } = useTypedDispatch();
  const { searchProducts, searchLoading } = useTypedSelector(
    (state) => state.search
  );
  const router = useRouter();

    const debouncedSearchTerm = useDebounce(search, 500);

  const handleClickAway = () => {
    setSearchHidden(true);
  };

  React.useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(process.env.fbp as string);
        ReactPixel.pageView();
        setReactPixel(ReactPixel);
      });
  }, []);

  const searchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search && search.length) {
      reactPixel.track("Search", { searchString: search });
      router.push(`/search?param=${search}`);
      setSearchHidden(true);
    }
  };


  React.useEffect(
    () => {
      if (debouncedSearchTerm) {
        setSearchHidden(true);
        getSearchResults(debouncedSearchTerm).then(() => {
          setSearchHidden(false);
          searchProducts
        });
      } else {
        searchProducts
        setSearchHidden(false);
      }
    },
    [debouncedSearchTerm] 
  );

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (searchHidden) {
  //     setSearchHidden(false);
  //   }
  //   setSearch(e.target.value);
  //   clearSearchResults();
  //   setTimeout(() => {
  //     getSearchResults(e.target.value);
  //   }, 250);
  // };

  const shouldSearchHide = () => {
    if (searchHidden) {
      return true;
    } else if (searchLoading) {
      return false;
    } else if (!searchProducts.length) {
      return true;
    }
  };

  const handleSearchClear = () => {
    setSearch("");
    setSearchHidden(true);
  };

  return (
    <div className="col-xl-6 col-lg-5 col-12 order-lg-2 order-3 text-lg-left text-right">
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className="header_search">
          <div className="header_search_content">
            <div className="header_search_form_container">
              <form
                autoComplete="off"
                onSubmit={searchSubmit}
                className="header_search_form"
              >
                <ul
                  className={`search-dropdown ${
                    shouldSearchHide() ? "hidden" : ""
                  }`}
                >
                  {searchLoading ? <LoaderDots /> : null}
                  {searchProducts.map((item, i) => (
                    <li key={i}>
                      <Link href={`/product/${item.slug}`}>
                        <a className={""}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className={"search-img"}
                          />
                          <span className="text-truncate">{item.name}</span>
                        </a>
                      </Link>
                      <div className="price-cart">
                        <strong>
                          <PriceRefactor price={item.random_shop.price} />
                        </strong>
                        <AddToCartBtn
                          id={item.random_shop.item_shop_id}
                          txt={"В корзину"}
                          disabled={!item.random_shop.price}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
                <input
                  autoComplete="off"
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  name="search"
                  value={search}
                  required={true}
                  className="header_search_input"
                  placeholder="Поиск по товарам..."
                />

                {search.length ? (
                  <div onClick={handleSearchClear} className="search_clear">
                    <FaTimes />
                  </div>
                ) : null}

                <button type="submit" className="header_search_button">
                  <img src={"/static/img/icons/search.png"} alt="search" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default Search;
