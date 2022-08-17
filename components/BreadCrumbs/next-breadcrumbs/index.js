import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import styles from './styles.module.css';
import {useTypedSelector} from "../../../store/hooks/useTypedSelector";
import {useTypedDispatch} from "../../../store/hooks/useTypedDispatch";

const convertBreadcrumb = (string, router) => {
  if (string.includes('?'))
    return string.split('?')[0]

  return string
    .replace(/-/g, ' ')
    // .replace(/oe/g, 'ö')
    // .replace(/ae/g, 'ä')
    // .replace(/ue/g, 'ü')
    .replace('catalog', 'Каталог')
    .replace('news', 'Новости')
    .replace('constructor', 'Конструктор')
    .replace('about', 'О нас')
    .replace('contact', 'Контакты')
    .replace('branches', 'Филиалы')
    .replace('rules', 'Правила')
    .replace('confidentiality', 'Политика конфиденциальности')
    .replace('delivery', 'Способы оплаты и доставки')
    .replace('coupon', 'Правила использования купонов')
    .replace('loyalty', 'Программа лояльности')
    .replace('returning', 'Возврат и Обмен Товара')
    .replace('site usage', 'Правила пользования')
};

export const Breadcrumbs = (props) => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState(null);
  const {categories} = useTypedSelector(state => state.category)
  const {fetchCategories} = useTypedDispatch();

  // useEffect(() => {
  //    if (!categories.length)
  //       fetchCategories();
  // }, [])

  // useEffect(() => {
  //    if (router) {
  //       let linkPath = router.asPath.split('/');
  //       linkPath.shift();
  //       let pathArray = [];
  //
  //       if (linkPath[0] === 'catalog' && categories.length) {
  //          pathArray = parentChecker()
  //       } else {
  //          linkPath = linkPath.filter(link => link !== 'brand' && link !== 'product')
  //          pathArray = linkPath.map((path, i) => {
  //             return {breadcrumb: path, href: '/' + linkPath.slice(0, i + 1).join('/')};
  //          });
  //       }
  //       setBreadcrumbs([...pathArray]);
  //    }
  // }, [router]);

  // const parentChecker = () => {
  //    if (router.pathname.includes('catalog') && categories.length) {
  //       const slug = router.query.slug;
  //       let category = [];
  //
  //       categories.forEach(item => {
  //          if (item.slug === slug) category = [{href: `/catalog/${item.slug}`, breadcrumb: item.name}]
  //          else
  //             item.childs.forEach(child => {
  //                if (child.slug === slug)
  //                   category = [
  //                      {href: `/catalog/${item.slug}`, breadcrumb: item.name},
  //                      {href: `/catalog/${child.slug}`, breadcrumb: child.name}
  //                   ]
  //             })
  //       })
  //       return category
  //    }
  // }

  useEffect(() => {
    if (router) {
      let linkPath = router.asPath.split('/');
      linkPath.shift();
      let pathArray = [];

      linkPath = linkPath.filter(link => link !== 'brand' && link !== 'product')
      pathArray = linkPath.map((path, i) => {
        return {breadcrumb: path, href: '/' + linkPath.slice(0, i + 1).join('/')};
      });
      setBreadcrumbs([...pathArray]);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <nav aria-label="breadcrumbs">
      <ol className={styles.breadcrumb}>
        <li>
          <Link href={"/"}>
            <a>Главная /&nbsp;</a>
          </Link>
        </li>


        {
          props.parsedCrumbs && props.parsedCrumbs.length ?
            props.parsedCrumbs.map((breadcrumb, i) => {
              return (
                <li key={`${breadcrumb.href}${i}`}>
                  <Link href={breadcrumb.href}>
                    <a>
                      {convertBreadcrumb(breadcrumb.breadcrumb, router)}
                      {i + 1 === props.parsedCrumbs.length ? null : <>&nbsp;/&nbsp;</>}
                    </a>
                  </Link>
                </li>
              );
            })
            :
            breadcrumbs.map((breadcrumb, i) => {
              return (
                <li key={`${breadcrumb.href}${i}`}>
                  <Link href={breadcrumb.href}>
                    <a>
                      {convertBreadcrumb(breadcrumb.breadcrumb, router)}
                      {i + 1 === breadcrumbs.length ? null : <>&nbsp;/&nbsp;</>}
                    </a>
                  </Link>
                </li>
              );
            })
        }

      </ol>
    </nav>
  );
};