import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import CartTable from "../../components/Tables/Cart";
import AddressForm from "../../components/Checkout/AddressForm";
import Delivery from "../../components/Checkout/Delivery";
import PaymentDetails from "../../components/Checkout/PaymentDetails";
import Link from "next/link";
import { useTypedDispatch } from "../../store/hooks/useTypedDispatch";
import Cookies from "universal-cookie";
import { notifyError, notifySuccess } from "../../helpers/NotifyBtn";
import { useTypedSelector } from "../../store/hooks/useTypedSelector";
import VerifyPhone from "../../components/Checkout/VerifyPhone";
import { useRouter } from "next/router";

export interface CheckoutFormData {
  delivery_id: number;
  payment_id: number;
  address_id: string;
  address: {
    phone: string;
    full_name: string;
    address: string;
    region_id: number;
    city_id: number;
  };
  user_id: string;
  user_key?: string;
}

const CheckoutPage = () => {
  const [formData, setFormData] = useState<CheckoutFormData>({
    delivery_id: 0,
    payment_id: 0,
    address_id: "",
    address: {
      phone: "",
      full_name: "",
      address: "",
      region_id: 0,
      city_id: 0,
    },
    user_id: "",
    user_key: "",
  });

  const cookies = new Cookies();
  const router = useRouter();
  const { createOrder, fetchCart, getUserOrders } = useTypedDispatch();
  const { orderCreated, order } = useTypedSelector((state) => state.checkout);
  const {} = useTypedSelector((state) => state.auth);
  const { cart } = useTypedSelector((state) => state.cart);
  const [reactPixel, setReactPixel] = useState<any>();

  const formDataHandler = (newFormData: CheckoutFormData) => {
    setFormData(newFormData);
  };

  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(process.env.fbp as string);
        ReactPixel.pageView();
        ReactPixel.track("InitiateCheckout", {
          content_ids: cart?.items?.map((item) => item?.product?.id),
          num_items: cart?.total_count,
          currency: "UZS",
          value: cart?.total_with_discount,
          contents: cart?.items?.map((item) => {
            return {
              id: item?.product?.id,
              quantity: item?.quantity,
            };
          }),
        });
        setReactPixel(ReactPixel);
      });
  }, []);

  useEffect(() => {
    if (orderCreated) {
      notifySuccess("Успешно оформлено");
      fetchCart();
      if (cookies.get("access_token")) {
        // get authenticated user orders after creating the order
        getUserOrders({ page: 1 });
        router.push(`/profile/order/${order?.id}`);
      } else {
        router.push({
          pathname: `/profile/order/[orderID]`,
          query: {
            // order: JSON.stringify(order),
            auth: "false",
            orderID: order?.id,
            //@ts-ignore
            code: order.code,
          },
        });
      }
    }
  }, [orderCreated]);

  const validateOrderFormData = () => {
    const { payment_id, delivery_id, address } = formData;
    if (!address.full_name) {
      notifyError('Поле "Имя получателя" не может быть пустым');
      return false;
    }
    if (!address.address) {
      notifyError('Поле "Полный адрес" не может быть пустым');
      return false;
    }
    if (!delivery_id) {
      notifyError("Выберите способ доставки");
      return false;
    }
    if (!payment_id) {
      notifyError("Выберите способ оплаты");
      return false;
    }
    return true;
  };

  const submitOrder = async () => {
    if (validateOrderFormData()) {
      reactPixel.track("Purchase", {
        content_ids: cart?.items?.map((item) => item?.product?.id),
        currency: "UZS",
        value: cart?.total_with_discount,
        num_items: cart?.total_count,
        contents: cart?.items?.map((item) => {
          return {
            id: item?.product?.id,
            quantity: item?.quantity,
          };
        }),
      });
      await createOrder(formData);
    }
  };

  return (
    <Layout title="Оформление заказа">
      <section className="checkout-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <h5 className="mb-4">
                <strong>Оформление заказа</strong>
              </h5>
              <h5 className="mb-4">
                <strong>Информация о доставке</strong>
              </h5>
            </div>
          </div>

          {!cookies.get("access_token") && !formData.user_key ? (
            <VerifyPhone formData={formData} setFormData={formDataHandler} />
          ) : null}

          <AddressForm formData={formData} setFormData={formDataHandler} />

          <Delivery formData={formData} setFormData={formDataHandler} />

          <div className="row mb-4">
            <div className="col-12">
              <CartTable
                columns={["", "Наименование", "Цена за ед.", "Кол-во", "Всего"]}
              />
            </div>
          </div>

          <PaymentDetails setFormData={setFormData} formData={formData} />

          <div className="row mt-5">
            <div className="col-12">
              <div className="d-flex justify-content-end">
                <Link href="/">
                  <a className="btn-eletron silver">
                    <strong>Продолжить покупки</strong>
                  </a>
                </Link>
                <button onClick={submitOrder} className="btn-eletron main ml-4">
                  <strong>Оформить заказ</strong>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CheckoutPage;
