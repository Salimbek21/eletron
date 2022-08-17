import React, {FC, useEffect, useState} from 'react';
import {
   Checkbox,
   FormControlLabel,
   Slider,
   OutlinedInput,
   FormControl,
   InputLabel,
   Tooltip,
   Accordion,
   AccordionSummary,
   Typography,
   AccordionDetails
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {BsFillCaretRightFill, BsFillCaretDownFill} from 'react-icons/bs';
import {useTypedSelector} from "../../../store/hooks/useTypedSelector";
import PriceRefactor from "../../Refactors/PriceRefactor";
import {useTypedDispatch} from "../../../store/hooks/useTypedDispatch";
import {checkSelectedFeatureValue, stringToArrayParser, toggleArrayElement} from "../../../helpers/arrayOperations";
import {useRouter} from "next/router";
import {MdDone, MdExpandMore} from "react-icons/md"
import ButtonDiscardFilter from "./ButtonDiscardFilter";

const useStyles = makeStyles({
   root: {
      padding: '5px 9px 5px 9px'
   },
   accordion: {
      boxShadow: 'none',
      '&::before': {
         display: 'none'
      }
   },
   accordionDetails: {
      padding: 0
   },
   accordionArrow: {
      position: 'absolute',
      zIndex: 1,
      right: 0,
      padding: 0,
      border: 'none',
   }
})

function valuetext(value: number) {
   return `${value} sums`;
}

function ValueLabelComponent(props: any) {
   const {children, open, value} = props;

   return (
       <Tooltip open={open} enterTouchDelay={0} placement="top" title={<PriceRefactor price={value} noText={true}/>}>
          {children}
       </Tooltip>
   );
}


const FilterSidebar = ({type = 'category'}) => {

   const {filters} = useTypedSelector(state => state.filters);
   const {params} = useTypedSelector(state => state.category);
   const {fetchCategoryFilteredProducts, clearFilteredProducts, fetchFilters} = useTypedDispatch();
   const {query, push} = useRouter();

   const classes = useStyles();
   const [deviceWidth, setDeviceWidth] = useState(0);
   const [isFilterOpen, setFilterOpen] = useState(false);
   const [priceFocused, setPriceFocused] = useState(false);
   const [feature_value_ids, setFeatureValueIds] = useState<any[]>([]);
   const [brand_ids, setBrandIds] = useState<any[]>([]);
   const [brand_id, setBrandId] = useState<any>();

   const [priceRange, setPriceRange] = useState<number[]>([
      filters.price?.min ? filters.price?.min : 0,
      filters.price?.max ? filters.price?.max : 100_000_000
   ]);

   let optionParamsCategory = {
      brand_ids: brand_ids,
      feature_value_ids: feature_value_ids,
      // @ts-ignore
      category_id: params.category_id,
      min_price: priceRange[0],
      max_price: priceRange[1]
   }

   let optionParamsBrand = {
      brand_id: brand_id,
      feature_value_ids: feature_value_ids,
      min_price: priceRange[0],
      max_price: priceRange[1]
   }

   const priceMinMaxFlag = filters.price?.min == 0 && filters.price?.max == 0

   // This useEffect is called first bcs it appears first
   useEffect(() => {
      setFeatureValueIds([])  // clear features and brand ids when slug is changed
      setBrandIds([])
      setPriceFocused(false) // every time the slug changes price range is cleared
      setPriceRange([0, 100_000_000])   // also clear the price range of slider
   }, [query.slug, query.brand])

   // Component Did Mount
   useEffect(() => {
      setDeviceWidth(window.innerWidth)
      parseParamsToState()
   }, [])

   useEffect(() => {
      setPriceRange([
         filters.price?.min ? filters.price?.min : 0,
         filters.price?.max ? filters.price?.max : 100_000_000
      ])
   }, [filters.price])

   const parseParamsToState = () => {
      // IF ROUTER HAS QUERY PARAMS, We need to take them as default state
      const brand_ids = stringToArrayParser(query.brand_ids)
      const feature_value_ids = stringToArrayParser(query.feature_value_ids)
      setBrandIds([...brand_ids])
      setBrandId(query.brand_id)
      setFeatureValueIds([...feature_value_ids])
   }

   const handleSlideChange = (event: any, newValue: number | number[]) => {
      setPriceRange(newValue as number[]);
   };

   const onSliderChangeComplete = () => {
      clearFilteredProducts({})
      fetchCategoryFilteredProducts({
         ...params,
         min_price: priceRange[0],
         max_price: priceRange[1],
         page: 1
      })
   }

   const handleCheckboxChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newFeatureValues = feature_value_ids
      let newBrands = brand_ids
      let productParams = {
         ...params,
         page: 1
      }
      const slug = query.slug;
      const page = 1;

      if (e.target.name === 'feature_value_ids') {
         newFeatureValues = toggleArrayElement(feature_value_ids, e.target.value)
         fetchFilters({...optionParamsCategory, feature_value_ids: newFeatureValues})
         fetchCategoryFilteredProducts({...productParams, feature_value_ids: newFeatureValues})
         setFeatureValueIds([...newFeatureValues])
      } else if (e.target.name === 'brand_ids') {
         newBrands = toggleArrayElement(brand_ids, e.target.value)
         fetchFilters({...optionParamsCategory, brand_ids: newBrands})
         fetchCategoryFilteredProducts({...productParams, brand_ids: newBrands})
         setBrandIds([...newBrands])
      }
      push(
          {
             pathname: `/catalog/[slug]`,
             query: {slug, page, brand_ids: newBrands, feature_value_ids: newFeatureValues}
          },
          `/catalog/${slug}?page=${page}&feature_value_ids=${newFeatureValues}&brand_ids=${newBrands}`,
          {shallow: true, scroll: true}   // shallow:true will not recall getServerSideProps()
      );
   };

   const handleCheckboxChangeBrand = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newFeatureValues = feature_value_ids
      let newBrand_id = brand_id
      let productParams = {
         ...params,
         page: 1
      }
      const brand = query.brand;
      const page = 1;

      if (e.target.name === 'feature_value_ids') {
         newFeatureValues = toggleArrayElement(feature_value_ids, e.target.value)
         fetchFilters({...optionParamsBrand, feature_value_ids: newFeatureValues})
         fetchCategoryFilteredProducts({...productParams, feature_value_ids: newFeatureValues})
         setFeatureValueIds([...newFeatureValues])

         push(
             {
                pathname: `/brand/[brand]`,
                query: {brand, page, brand_id: newBrand_id, feature_value_ids: newFeatureValues}
             },
             `/brand/${brand}?brand_id=${newBrand_id}?page=${page}&feature_value_ids=${newFeatureValues}`,
             {shallow: true, scroll: true}   // shallow:true will not recall getServerSideProps()
         );
      }
      // else if (e.target.name === 'brand_ids') {
      //    newBrands = toggleArrayElement(brand_ids, e.target.value)
      //    fetchFilters({...optionParamsBrand, brand_ids: newBrands})
      //    fetchCategoryFilteredProducts({...productParams, brand_ids: newBrands})
      //    setBrandIds([...newBrands])
      // }
   };

   const renderFeatureValues = (items: any, similar: boolean, short: boolean = false) => (
       items && items.length ?
           items.map((check: any, i: number) => (
               <FormControlLabel
                   key={check.id}
                   control={
                      <Checkbox
                          className={check.color ? 'd-none' : classes.root}
                          checked={feature_value_ids.includes(`${check.id}`)}
                          onChange={type === "category" ? handleCheckboxChangeCategory : handleCheckboxChangeBrand}
                          name="feature_value_ids"
                          color="primary"
                          value={check.id}
                          disabled={similar ? false : check.disabled === 1}
                      />
                   }
                   label={check.color ?
                       <span
                           className={`feature-colored ${feature_value_ids.includes(`${check.id}`) ? 'active' : ''}`}
                           style={{background: check.color}}
                           title={check.value}
                       >
                     {"----"}
                          <MdDone/>
                  </span>
                       : check.value}
               />
           ))
           : null
   )

   const renderFeatureBoxes = (checks: any) => (
       checks && checks.length ?
           checks.map((item: any, i: number) => (
               item.values.length > 1 ?
                   <div key={item.id}>
                      <h4>
                         {item.name}
                      </h4>

                      {/* Exception, margin bottom for color feature */}
                      {
                         (item.name === 'Цвeт' || item.name === 'Цвет') &&
                         <div className={"mb-3"}>
                            {
                               item.values.map((check: any, i: number) => (
                                   feature_value_ids.includes(`${check.id}`) && check.value + ', '
                               ))
                            }
                         </div>
                      }
                      {/* For regular features */}
                      {/* second parameter of renderFeatureValues(): if at least 1 value is selected
                            -> DO Not disable other children values */}
                      <Accordion className={classes.accordion} key={item.id}>
                         <div className="d-flex">
                            <div className="check-items" key="check-items-short">
                               {renderFeatureValues(
                                   item.values.slice(0, 4),   // first 4 elements
                                   checkSelectedFeatureValue(item.values, feature_value_ids)
                               )}
                            </div>
                            <AccordionSummary
                                expandIcon={item.values.length > 4 ? <MdExpandMore/> : null}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                className={classes.accordionArrow}
                            />
                         </div>
                         <AccordionDetails className={classes.accordionDetails}>
                            <div className="check-items" key="check-items-regular">
                               {renderFeatureValues(
                                   item.values.slice(4, item.values.length),  // all remaining elements after 4th
                                   checkSelectedFeatureValue(item.values, feature_value_ids)
                               )}
                            </div>
                         </AccordionDetails>
                      </Accordion>
                   </div>
                   : null
           ))
           : null
   )

   const renderBrandBoxes = () => (
       filters.brands && filters.brands.length ?
           filters.brands.map((item: any, i: number) => (
               <FormControlLabel
                   key={i}
                   control={
                      <Checkbox
                          className={classes.root}
                          checked={type === "brand" ? true : brand_ids.includes(`${item.id}`)}
                          onChange={type === "category" ? handleCheckboxChangeCategory : handleCheckboxChangeBrand}
                          name="brand_ids"
                          color="primary"
                          value={item.id}
                      />
                   }
                   label={item.name}
               />
           ))
           : null
   )

   const handleFilterMobile = () => {
      if (deviceWidth < 768) {
         setFilterOpen(prevState => !prevState)
      }
   }

   const handlePriceFocus = () => {
      setPriceFocused(true)
   }

   return (
       <aside className="filter-category" key={type}>
          <h4 onClick={handleFilterMobile} className="d-flex justify-content-between align-items-center">
             Фильтрация
             {
                deviceWidth < 768 && isFilterOpen ?
                    <div className="mr-3">
                       <BsFillCaretDownFill/>
                    </div>
                    : deviceWidth < 768 ?
                    <div className="mr-3">
                       <BsFillCaretRightFill/>
                    </div>
                    : null
             }
          </h4>

          {
             deviceWidth < 768 ?
                 isFilterOpen ? <ButtonDiscardFilter className={priceMinMaxFlag ? 'mb-0' : ''}/> : null
                 :
                 <ButtonDiscardFilter className={priceMinMaxFlag ? 'mb-0' : ''}/>
          }

          {
             deviceWidth > 767 || isFilterOpen ?
                 <form autoComplete="off">

                    {
                       priceMinMaxFlag ? null
                           :
                           <>
                              < Slider
                                  ValueLabelComponent={ValueLabelComponent}
                                  value={priceRange}
                                  min={filters.price?.min}
                                  max={filters.price?.max}
                                  onChange={handleSlideChange}
                                  onFocus={handlePriceFocus}
                                  onChangeCommitted={onSliderChangeComplete} // it will not send request on change complete
                                  valueLabelDisplay="auto"
                                  aria-labelledby="range-slider"
                                  getAriaValueText={valuetext}
                              />

                              <div className="from-to-slider">
                                 <FormControl variant="outlined">
                                    <InputLabel>от</InputLabel>
                                    <OutlinedInput
                                        id="from"
                                        label="от"
                                        onFocus={handlePriceFocus}
                                        value={priceFocused ? priceRange[0] : ''}
                                        endAdornment={priceFocused ? <span>сум</span> : null}
                                    />
                                 </FormControl>
                                 <FormControl variant="outlined">
                                    <InputLabel>до</InputLabel>
                                    <OutlinedInput
                                        label="до"
                                        onFocus={handlePriceFocus}
                                        value={priceFocused ? priceRange[1] : ''}
                                        endAdornment={priceFocused ? <span>сум</span> : null}
                                    />
                                 </FormControl>
                              </div>
                           </>
                    }

                    <div className="filter-checkbox">
                       {
                          filters.brands?.length ?
                              <>
                                 <h4>Бренды</h4>
                                 {renderBrandBoxes()}
                              </>
                              : null
                       }
                       {renderFeatureBoxes(filters.features)}
                    </div>
                 </form>
                 : null
          }

          {
             deviceWidth < 768 ?
                 isFilterOpen ? <ButtonDiscardFilter className={"end"}/> : null
                 :
                 <ButtonDiscardFilter className={"end"}/>
          }


       </aside>
   );
}

export default FilterSidebar