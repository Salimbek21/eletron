import React from 'react';
import Layout from "../../components/Layout";
import Head from "next/head";
import Breadcrumbs from "../../components/BreadCrumbs";
import { useFetch } from 'usehooks-ts'

const url = "https://api2.eletron.uz/api/get_label"

interface Post {
   val: string
 }


const Loyalty = () => {
   const { data } = useFetch<Post[]>(url)
   return (
       <>
          <Head>
             <title>Правила программы лояльности | Eletron.uz</title>
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
                         <h4 className={"text-center"}>ПРАВИЛА ПРОГРАММЫ ЛОЯЛЬНОСТИ «ELETRON CASHBACK»</h4>
                      </div>

                      <div className="mt-5">
                         <p><strong>1. Общие положения</strong></p>
                         <p>
                            1.1. Настоящие Правила определяют условия и порядок участия в программе лояльности «Eletron
                            CASHBACK» (далее – Программа «Eletron CASHBACK», Программа). С момента регистрации в
                            Интернет-магазине «Eletron» Участник вступает во взаимоотношения с интернет-магазином
                            «Eletron», полностью и безоговорочно принимает настоящие Правила, обязуется их выполнять и
                            имеет право на получение Привилегий в соответствии с настоящими Правилами. Правила
                            размещаются на Сайте Интернет-магазина «Eletron», а также в других источниках по усмотрению
                            ООО «Eletron».
                            <br/>
                            1.2. Программа «ELETRON CASHBACK» действует на территории Республики Узбекистан.
                            <br/>
                            1.3. Программа «ELETRON CASHBACK» действует с момента её запуска и до полной её отмены по
                            решению ООО «Eletron».
                         </p>


                         <p><strong>2. Термины и определения</strong></p>
                         <p>
                            <strong>Акция </strong>- маркетинговое мероприятие, рассчитанное на определённый период
                            времени и/или географию действия и/или перечень Участников, целью которого является
                            формирование и увеличение лояльности Участников к Программе «ELETRON CASHBACK». Инициатором
                            организации и проведении Акции выступает ООО «Eletron» при возможном участии Партнёров.

                            <br/>
                            <br/>
                            <strong>Анкета </strong>- информация о Клиенте, желающем стать Участником Программы «ELETRON
                            CASHBACK», вносимая Клиентом либо сообщаемая Клиентом при регистрации в Интернет-магазине в
                            порядке, предусмотренном настоящими правилами.

                            <br/>
                            <br/>
                            <strong>Бонусные Баллы (также - Баллы) </strong>расчётные бонусные единицы, зачисляемые на
                            аккаунт Участника за приобретение товаров и/или услуг в интернет-магазине «Eletron» и/или
                            Партнёров в соответствии с настоящими правилами, а также при выполнении Участниками иных
                            условий, определённых ООО «Eletron» самостоятельно либо по согласованию с Партнёрами,
                            являющихся основанием для начисления Баллов. Сумма начисленных Баллов может быть
                            использована Участником в интернет-магазине «Eletron» на товары и/или услуги, приобретаемые
                            в интернет-магазине «Eletron» и/или Партнёров, а также для получения иных Привилегий. 1
                            бонусный балл равен 1 условному сумму.

                            <br/>
                            <br/>
                            <strong>Горячая линия Программы «ELETRON CASHBACK» (также - Горячая линия) </strong>
                            )- центр поддержки Программы «ELETRON CASHBACK», организованный ООО «Eletron» и
                            осуществляющий информационно-справочное обслуживание Участников по телефону: {data?.[1]?.val}.

                            <br/>
                            <br/>
                            <strong>Клиент </strong>– любое физическое лицо, достигшее совершеннолетия, являющееся
                            дееспособным, но не осуществившее регистрацию в Программе в соответствии с настоящими
                            правилами.

                            <br/>
                            <br/>
                            <strong>Аккаунт </strong>— персональная страница Участника, доступная в интернет-магазине
                            «Eletron», на которой содержится информация об Участнике, о балансе накопленных Баллов
                            Участника, Транзакциях, совершенных Участником, а также о персональных акциях и скидках
                            (если предусмотрены).

                            <br/>
                            <br/>
                            <strong>ИНТЕРНЕТ-МАГАЗИН «Eletron» </strong>— Общество с ограниченной ответственностью
                            «Eletron» (ИНН 308028084, юридический адрес: город Ташкент, Яккасарайский район, ул.
                            У.Носира, 23), обладающее исключительными правами по управлению и развитию Программы
                            «ELETRON CASHBACK» и обеспечивающее предоставление Участникам Программы «ELETRON CASHBACK»
                            Привилегий, предусмотренных настоящими Правилами.


                            <br/>
                            <br/>
                            <strong>Партнёры </strong>— лица, с которыми у ООО «Eletron» в рамках Программы «ELETRON
                            CASHBACK» имеются заключённые соглашения и/или договора в рамках, которых Участникам
                            предоставляется возможность начисления/списания Баллов при приобретении товаров и/или услуг
                            этих лиц, а также предоставление иных Привилегий. Условия начисления/списания Баллов, а
                            также условия предоставления Участникам иных Привилегий, определяются на основании
                            соответствующих соглашений и/или договоров, заключаемых ООО «Eletron» с Партнёрами, условия
                            которых могут изменяться.


                            <br/>
                            <br/>
                            <strong>Привилегии </strong>- возможность приобретения товаров и/или услуг в
                            интернет-магазине
                            «Eletron» и/или Партнёров с финансовой или нефинансовой выгодой. Привилегии могут
                            предоставляться методом отложенной скидки – начисления Баллов за приобретение товаров и/или
                            услуг в интернет-магазине «Eletron» и/или Партнёров и/или третьих лиц, в соответствии с
                            Правилами Программы, и последующего списания Участником накопленных Баллов при приобретении
                            им товаров и/или услуг в интернет-магазине «Eletron» и/или Партнёров в соответствии с
                            настоящими Правилами.


                            <br/>
                            <br/>
                            <strong>Сайт Программы «ELETRON CASHBACK» (также – Сайт) </strong>– интернет-сайт,
                            размещённый по адресу: https://eletron.uz.

                            <br/>
                            <br/>
                            <strong>Транзакции </strong>– операции (покупки/платежи), совершаемые Участником в
                            интернет-магазине «Eletron», которые в соответствии с настоящими Правилами являются
                            основанием для начисления Баллов либо списания Баллов (при оплате баллами).

                            <br/>
                            <br/>
                            <strong>Уведомление </strong>— информация, в том числе рекламного содержания, передаваемая
                            Участнику по одному или нескольким средствам (способам) связи, указанным им при регистрации
                            в Программе: мобильному телефону, электронной почте, почтовому адресу или иными способами.

                            <br/>
                            <br/>
                            <strong>Участник </strong>— Клиент, зарегистрированный в Программе в соответствии с
                            настоящими Правилами.

                         </p>


                         <p><strong>3. Регистрация в Программе «Eletron»</strong></p>

                         <p>
                            3.1. Зарегистрированный пользователь автоматически становится участником программы "ELETRON
                            CASHBACK". Участником может стать любое лицо, которому на момент регистрации в Программе
                            лояльности исполнилось 18 (восемнадцать) лет и использующего национальный телефонный номер
                            сети подвижной связи узбекской системы нумерации.
                            <br/>
                            3.2. Для участия в Программе необходимо зарегистрироваться в Программе в соответствии с
                            настоящими Правилами.
                            <br/>
                            3.3. Зарегистрироваться можно одним из следующих способов:
                            <br/>
                            3.3.1. Через приложение ELETRON.UZ.
                            <br/>
                            3.3.2. Через веб-сайт по адресу https://eletron.uz.
                            <br/>

                            3.4. При регистрации в Программе одним из способов, предусмотренных настоящими Правилами,
                            Участник также даёт согласие ООО «Eletron», а также лицам, входящим с ним в одну группу лиц:
                            <br/>
                            3.4.1. осуществлять с использованием средств автоматизации и/или без таковых обработку всех
                            персональных данных, указанных Участником при регистрации в Программе, в т.ч. в Анкете,
                            включая сбор, запись, систематизацию, накопление, хранение, уточнение (обновление,
                            изменение), извлечение, использование, передачу, обезличивание, блокирование, удаление,
                            уничтожение, а также информации о произведённых Участником покупках, их сумме, способах и
                            средствах их оплаты, в целях, связанных с возможностью предоставления Участнику информации
                            (рекламы), в т.ч. о товарах и/или услугах, о проводимых рекламных акциях, о персональных
                            предложениях, которые потенциально могут предоставлять для Участника интерес, а также в
                            целях сбора, возможностью обеспечения предоставления Участникам Привилегий, предусмотренных
                            Правилами, а также обработки статистической информации и проведения маркетинговых
                            исследований, в том числе с возможностью коммерческого использования результатов данных
                            исследований;
                            <br/>
                            3.4.2. поручать обработку всех персональных данных, указанных Участником при регистрации в
                            Программе, в т.ч. в Аккаунте, другим лицам любым способом в вышеуказанных целях.
                            <br/>
                            3.5. Согласие на обработку персональных данных в соответствии с указанными выше условиями
                            предоставляется Участником сроком на 50 (Пятьдесят) лет и может быть отозвано Участником
                            посредством направления ООО «Eletron» письменного заявления почтовым отправлением по адресу:
                            Общество с ограниченной ответственностью «Eletron» (ИНН 308028084, юридический адрес: город
                            Ташкент, Яккасарайский район, ул. У.Носира, 23)

                         </p>

                         <p><strong>4. Баллы Программы «ELETRON CASHBACK»</strong></p>

                         <p>
                            4.1. 1 бонусный балл равен 1 условному узбекскому сумму.
                            <br/>
                            4.2. Баллы начисляются за покупки в интернет-магазине (без учёта стоимости доставки), после
                            72 часов после получения товара Участником.
                            <br/>
                            4.3. Списание баллов доступно сразу после их зачисления на Бонусный счет Участника. Оплата
                            покупки баллами может быть осуществлена максимально в 100% размере стоимости товара, при
                            этом Участнику начисляется от 1 до 10% кэшбэк на сумму конечной оплаты. Ответственность за
                            передачу информации третьим лицам и использование счета и баллов на нем лежит на Участнике.
                            При совершении покупки могут быть использованы баллы только одного Участника Программы.
                            Скидки не суммируются (cash back и промокод).
                            <br/>
                            4.4. Программа «ELETRON CASHBACK» не распространятся на услуги по доставке приобретённых
                            товаров Участнику.
                            <br/>
                            4.5. Баллы, начисленные с покупки возвращённого товара, будут аннулированы. Если зачисленные
                            баллы за возвращаемый товар уже использованы на другую покупку, то счёт станет
                            отрицательным. В этом случае оплата баллами будет доступна после очередной покупки и
                            положительного баланса. Баллы, потраченные на товар, который впоследствии возвращён, будут
                            возвращены на счёт.
                         </p>

                         <p><strong>5. Заключительные положения</strong></p>

                         <p>
                            5.1. Взаимоотношения между Участником и ООО «Eletron» в рамках Программы, регулируются
                            действующим законодательством Республики Узбекистан.
                            <br/>
                            5.2. Все споры, возникающие между Участником и ООО «Eletron» в рамках Программы решаются
                            мирным путём, при не урегулировании спора мирным путём, спор передаётся на рассмотрение
                            соответствующего суда по месту нахождения ООО «Eletron».
                         </p>

                      </div>
                   </div>


                </div>
             </section>
          </Layout>
       </>
   );
};

export default Loyalty;