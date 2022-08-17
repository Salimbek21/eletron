import React from 'react';
import Head from "next/head";
import Layout from "../../components/Layout";
import Breadcrumbs from "../../components/BreadCrumbs";

const Returning = () => {
   return (
       <>
          <Head>
             <title>Возврат и Обмен Товара на сайте Eletron.uz</title>
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
             <section className="rules-section">
                <Breadcrumbs/>

                <div className="container-fluid">
                   <div className="row mb-4">
                      <div className="col-12">
                         <h4 className={"text-center"}>Возврат и Обмен Товара</h4>
                      </div>

                      <div className="mt-5">
                         <p><strong>Возврат и обмен товара надлежащего качества.</strong></p>
                         <p>
                            Покупатель вправе отказаться от заказанного товара надлежащего качества:
                            <br/>
                            <br/>
                            • До его получения, а также после получения — в течение 5 дней. Обратите внимание! Возврат
                            или обмен товара возможны, когда сохранен его товарный вид (упаковка, пломбы, фабричные
                            ярлыки), потребительские свойства, а также документ, подтверждающий факт и условия покупки
                            указанного товара (чек). На товаре не должно быть следов эксплуатации, товар не был в
                            употреблении и не был использован.
                            <br/>
                            • Возврату не подлежат товары надлежащего качества, согласно Приложению №1 к Правилам
                            розничной торговли Республики Узбекистан, утвержденных Постановлением Кабинета Министров
                            Республики Узбекистан № 75 от 13 февраля 2003 года.
                         </p>


                         <p><strong>Возврат и обмен товара ненадлежащего качества</strong></p>
                         <p>
                            - Покупатель, при получении товара ненадлежащего качества, если недостатки не были оговорены
                            Продавцом, вправе в течение 24 часов после покупки по своему выбору потребовать от Продавца:
                            <br/>
                            - Замены на товар аналогичной марки (модели, артикула) в день возврата товара, при наличии
                            его на складе или в течение 60 дней при отсутствии;
                            <br/>
                            - Замены на такой же товар другой марки (модели, артикула) с соответствующим перерасчетом
                            покупной цены;
                            <br/>
                            - Незамедлительного безвозмездного устранения недостатков товара;
                            <br/>
                            - Возмещения расходов на устранение недостатков товаров.
                            <br/>
                            <ul className={"pl-4"}>
                               <li>
                                  • Процедура возврата товара, подчиняется требованиям Правил розничной торговли в
                                  Республике Узбекистан (Приложение №1 к Постановлению КМ РУз №75 от 13.02.2003 года),
                                  Закона РУз «О защите прав потребителей», Гражданского кодекса РУз.
                               </li>
                               <li>
                                  • В Заявлении на возврат товара должно быть указано, какой именно дефект содержит
                                  возвращаемый Покупателем товар. Форма Заявления на возврат товара доступна на
                                  официальном сайте Продавца по ссылке: www.shop.eletron.uz.
                               </li>
                               <li>
                                  • Порядок замены товара с недостатками:
                                  <br/>
                                  - В течение 7 дней (при явных признаках заводского брака)
                                  <br/>
                                  - В течение 20 дней (при необходимости дополнительной проверки)
                                  <br/>
                                  - В течение 1 месяца (при отсутствии товара аналогичной марки)
                                  <br/>
                                  - В течение 2 месяцев (при доставке в отдаленные территории)
                               </li>
                            </ul>
                         </p>

                         <p><strong>Для возврата товара, Покупателю необходимо:</strong></p>
                         <p>
                            - Позвонить в интернет-магазин по телефонам, указанным в разделе Контакты;
                            <br/>
                            - Заполнить и распечатать Заявление на возврат;
                            <br/>
                            <strong>- Внимание.</strong> Мы можем вернуть деньги за товар и компенсировать возврат,
                            только если вы будете
                            точно следовать инструкциям и советам службы поддержки. Возврат денежных средств будет
                            осуществлен на банковскую карту Покупателя (только сумма товара без учета доставки), в
                            течение 5-ти банковских дней после получения товара.
                         </p>

                         <p><strong>Возврат товара осуществляется двумя способами</strong></p>
                         <p>
                            <strong>1. Самостоятельный возврат</strong>
                            <br/>
                            Покупатель может самостоятельно вернуть товар в наш фирменный пункт возврата.
                            <br/>
                            Адрес для возврата: город Ташкент, Яккасарайский район, ул. У.Насыра, 23
                         </p>

                         <p>
                            <strong>2. Возврат курьером</strong>
                            <br/>
                            Услуга доступна для жителей города Ташкента. Стоимость выезда курьера за возвратом
                            составляет 20.000 сум.
                         </p>

                         <p><strong>Проведение экспертизы</strong></p>
                         <p>
                            Если между вами и магазином возник спор о причинах возникновения недостатков, магазин вправе
                            провести экспертизу товара. Экспертиза проводится за счет магазина. Вы вправе присутствовать
                            при ее проведении. Для этого рекомендуем направить продавцу письменное заявление с пометкой
                            о том, что проверка должна производиться в вашем присутствии. После того, как магазин
                            уведомит вас о времени проведении экспертизы, вы должны привезти товар для установления
                            причин поломки. Это позволит избежать недоразумений, которые могут возникнуть, если вы не
                            согласны с заключением экспертизы.
                         </p>
                         <p>
                            Если в результате экспертизы будет установлено, что недостатки товара возникли не по вине
                            магазина или изготовителя, вы будете обязаны возместить магазину расходы на проведение
                            экспертизы, а также связанные с ее проведением расходы на хранение и транспортировку товара.
                            Если вы не согласны с результатами экспертизы, вы вправе оспорить заключение в судебном
                            порядке.
                         </p>
                      </div>
                   </div>


                </div>
             </section>
          </Layout>
       </>
   );
};

export default Returning;