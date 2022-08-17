import React, {MouseEventHandler} from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import {useTypedSelector} from "../../../../store/hooks/useTypedSelector";
import {motion} from "framer-motion";
import {Category} from "../../../../store/types/category";

interface HeaderCategoriesProps {
   handleClickAway: MouseEventHandler<HTMLElement>
}

const HeaderCategories: React.FC<HeaderCategoriesProps> = ({handleClickAway}) => {

   const router = useRouter();

   const {categories} = useTypedSelector(state => state.category) // typescript validated useSelector

   const handleHeaderLink = (link = "/") => {
      router.push(link)
   }

   const renderGrandChildren = (grandChildren: Category[] | undefined) => (
       grandChildren?.map((gchild, i) => (
           <Link
               key={`${gchild.id} ${i}`}
               href={`/catalog/${gchild.slug}`}
           >
              <a
                  className={"third-level-link"}
                  onClick={e => {
                     handleClickAway(e)
                     e.stopPropagation()
                  }}
              >
                 {gchild.name}
              </a>
           </Link>
       ))
   )

   const renderCategories = () => (
       categories.map((item, i) => (
           <div
               key={i}
               className="text_label"
               onClick={handleClickAway}
           >
              <li
                  className={`menu_label${i === 0 ? '_opened' : ''}`}
                  onClick={() => handleHeaderLink(`/catalog/${item.slug}`)}
              >
                 <div>
                    {/*<img*/}
                    {/*    className="menu_label_image"*/}
                    {/*    src={item.wicon}*/}
                    {/*    alt={`иконка ${item.name}`}*/}
                    {/*/>*/}
                    <span>
                       {item.name}
                    </span>
                 </div>
                 <i className="fas fa-chevron-right">
                 </i>
                 <div className="sub_list h-100" >
                    <div className="row h-100">
                       <div className="col-12 pl-5">
                          <div
                              className="sub_label"
                              onClick={() => handleHeaderLink(`/catalog/${item.slug}`)}
                          >
                             <h3>{item.name}</h3>
                          </div>
                          {/*<ul className="menu_list">*/}
                          {/*</ul>*/}
                          {/*<div className={"w-50"}>*/}

                          <ul className="second-level-wrap">
                             {
                                item.childs?.map((child, i) => (
                                    <li
                                        key={`${child.slug}-${i}}`}
                                        className="second-level-parent"
                                    >
                                       <Link
                                           href={`/catalog/${child.slug}`}
                                       >
                                          <a
                                              className="text_label"
                                              onClick={e => {
                                                 handleClickAway(e)
                                                 e.stopPropagation()
                                              }}
                                          >
                                             <div className="menu_label">
                                                <span className="second-level-cat">{child.name}</span>
                                             </div>
                                          </a>
                                       </Link>

                                       {
                                          renderGrandChildren(child.childs)
                                       }

                                    </li>
                                ))
                             }
                          </ul>
                          {/*</div>*/}

                       </div>
                       {/*<div className="col-md-6">*/}
                       {/*    <div className="category_image">*/}
                       {/*        <Link href={`/catalog/${item.slug}`}>*/}
                       {/*            <a>*/}
                       {/*                <img*/}
                       {/*                    src={item.ad?.image}*/}
                       {/*                    alt={item.name}*/}
                       {/*                />*/}
                       {/*            </a>*/}
                       {/*        </Link>*/}
                       {/*    </div>*/}
                       {/*</div>*/}
                    </div>
                 </div>
              </li>
           </div>
       ))
   )

   return (
       <div className="menu">
          {/*style={{minHeight: categories.length * 40 + 50}}*/}
          <motion.div
              initial={{filter: 'blur(8px)'}}
              animate={{filter: 'blur(0px)'}}
              transition={{type: "ease", duration: 0.25}}
          >
             <div className="container-fluid">
                <div className="list">
                   <ul className="menu_list">
                      {renderCategories()}
                   </ul>
                </div>
             </div>
          </motion.div>
       </div>
   );
};

export default HeaderCategories;