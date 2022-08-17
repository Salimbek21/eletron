import React, { useEffect, useState } from "react";
import { Form, Formik, Field } from "formik";
import { CheckboxWithLabel, TextField } from "formik-material-ui";
import { object, number, string, boolean } from "yup";
import { makeStyles } from "@material-ui/core";
import { useTypedDispatch } from "../../../store/hooks/useTypedDispatch";
import { useTypedSelector } from "../../../store/hooks/useTypedSelector";
import { notifySuccess } from "../../../helpers/NotifyBtn";
import { useRouter } from "next/router";
/*
      id: this.state.userkeyid.id || 1,
      key: this.state.userkeyid.key || "asdasd",
      first_name: this.state.name,
      last_name: this.state.surname,
      password: this.state.password,
      password_confirmation: this.state.password_confirm,
      email: this.state.email,
*/

const useStyles = makeStyles((theme) => ({
  errorColor: {
    color: theme.palette.error.main,
  },
  terms: {
    color: "#000",
  },
}));

const RegForm = () => {
  const classes = useStyles();
  const { push } = useRouter();

  const [formFailed, setFormFailed] = useState(false);
  const { authRegister } = useTypedDispatch();
  const { userRegister, phoneVerified } = useTypedSelector(
    (state) => state.auth
  );
  const [reactPixel, setReactPixel] = useState<any>();

  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(process.env.fbp as string);
        ReactPixel.pageView();
        setReactPixel(ReactPixel);
      });
  }, []);

  useEffect(() => {
    if (userRegister?.access_token) {
      reactPixel.track("CompleteRegistration");
      notifySuccess("Регистрация прошла успешно!");
      push("/profile?nav=orders");
    }
  }, [userRegister]);

  const yupStringValidation = (field: string) => {
    return string()
      .required(`Поле ${field} не может быть пустым`)
      .min(1)
      .max(100);
  };

  return (
    <div className="registration-form">
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          password_confirmation: "",
          termsAndConditions: false,
        }}
        validationSchema={object({
          first_name: yupStringValidation("Имя"),
          last_name: yupStringValidation("Фамилия"),
          email: yupStringValidation("Email"),
          password: yupStringValidation("Пароль"),
          password_confirmation: yupStringValidation("Пароль"),
          termsAndConditions: boolean().isTrue("Необходимо принять условия"),
        })}
        onSubmit={async (values) => {
          await authRegister({
            ...values,
            id: phoneVerified?.id,
            key: phoneVerified?.key,
          });
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form autoComplete={"off"}>
            <div className="mb-3">
              <p className="mb-1">
                {errors.first_name && formFailed ? (
                  <span className={"alert-danger px-2 py-1 br-6"}>
                    {errors.first_name}
                  </span>
                ) : (
                  "Имя"
                )}
              </p>
              <Field
                name={"first_name"}
                className={"verify-element"}
                placeholder={"Введите ваше имя"}
                // component={TextField}
                // variant={"outlined"}
              />
            </div>
            <div className="mb-3">
              <p className="mb-1">
                {errors.last_name && formFailed ? (
                  <span className={"alert-danger px-2 py-1 br-6"}>
                    {errors.last_name}
                  </span>
                ) : (
                  "Фамилия"
                )}
              </p>
              <Field
                name={"last_name"}
                className={"verify-element"}
                placeholder={"Введите вашу фамилию"}
              />
            </div>
            <div className="mb-3">
              <p className="mb-1">
                {errors.email && formFailed ? (
                  <span className={"alert-danger px-2 py-1 br-6"}>
                    {errors.email}
                  </span>
                ) : (
                  "E-mail"
                )}
              </p>
              <Field
                name={"email"}
                type={"email"}
                className={"verify-element"}
                placeholder={"Введите ваш e-mail"}
              />
            </div>

            <div className="mb-3">
              <p className="mb-1">
                {errors.password && formFailed ? (
                  <span className={"alert-danger px-2 py-1 br-6"}>
                    {errors.password}
                  </span>
                ) : (
                  "Пароль"
                )}
              </p>
              <Field
                name={"password"}
                type={"password"}
                className={"verify-element"}
                placeholder={"Введите пароль"}
              />
            </div>

            <div className="mb-3">
              <p className="mb-1">
                {errors.password_confirmation && formFailed ? (
                  <span className={"alert-danger px-2 py-1 br-6"}>
                    {errors.password_confirmation}
                  </span>
                ) : (
                  "Подтверждение Пароля"
                )}
              </p>
              <Field
                name={"password_confirmation"}
                type={"password"}
                className={"verify-element"}
                placeholder={"Подтвердите пароль"}
              />
            </div>

            <div className="mb-3">
              <Field
                name={"termsAndConditions"}
                type={"checkbox"}
                component={CheckboxWithLabel}
                Label={{
                  label:
                    "Я согласен с политикой конфиденциальности, \n" +
                    "правилами пользования сайтом и правилами \n" +
                    "возврата и обмена.",
                  className:
                    errors.termsAndConditions && formFailed
                      ? classes.errorColor
                      : undefined,
                }}
              />
            </div>

            <div className={"text-right"}>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn main btn-eletron"
                onClick={() => setFormFailed(true)}
              >
                {isSubmitting ? "Подтверждается" : "Подтвердить"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegForm;
