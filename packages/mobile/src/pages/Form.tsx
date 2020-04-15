import {
  IonContent,
  IonPage,
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonText,
  IonTextarea,
  IonImg,
  IonIcon,
  IonInput,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

import {
  calendarOutline,
  bookOutline,
  cardOutline,
  cashOutline,
  walletOutline,
  createOutline,
  paperPlaneOutline,
} from "ionicons/icons";

import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { Languages } from "../enums/Languages";
import { RESOURCES } from "../data/resources";

import { AppContext } from "../contexts/appContext";
import { PhotoContext } from "../contexts/photoContext";
import { useHistory, useLocation, Redirect } from "react-router";
import { OperationType } from "../enums/OperationType";

const initialValues = {
  category: "",
  supplierOrCustomer: "",
  transactionDate: "00/00/0000",
  paymentMethod: "",
  amount: "",
  currency: "",
  responsible: "Mehdi Karim", // should come from the current logged user or predefined list
  notes: "",
};

export const Form = () => {
  const history = useHistory();
  const location = useLocation();

  const { setLoading, setToast, language } = useContext(AppContext);

  const { photoBase64 } = useContext(PhotoContext);

  useEffect(() => {
    if (!photoBase64) {
      history.push("/home");
      //! error: Photo is missing. Cannot continue without photo
    }
  }, [photoBase64, history]);

  const [canSubmit, setCanSubmit] = useState(false);
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    console.info(values);
    if (
      values.amount !== "" &&
      values.category !== "" &&
      values.currency !== "" &&
      values.paymentMethod !== "" &&
      values.responsible !== "" &&
      values.supplierOrCustomer !== "" &&
      !values.transactionDate.includes("00/") &&
      !values.transactionDate.includes("0000")
    )
      setCanSubmit(true);
  }, [values]);

  const submit = (e) => {
    e.preventDefault();

    setLoading({
      duration: null,
      isOpen: true,
      message: RESOURCES[language].loadingMessage,
    });

    const cleanData = {
      image: photoBase64,
      values: [[...Object.values(values)]],
    };

    // show spinner
    axios
      .post(
        `https://us-central1-golden-stream-turkey.cloudfunctions.net/server/api/add${location.state["operationType"]}`,
        cleanData,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(() => {
        setValues(initialValues);
        setLoading({ duration: null, isOpen: false, message: "" });
        setToast({
          duration: 2000,
          isOpen: true,
          color: "success",
          message: RESOURCES[language].toastSuccessMessage,
        });
        history.push("/home");
      })
      .catch(function (error) {
        console.log(error);
        setLoading({ duration: 0, isOpen: false, message: "" });
        setToast({
          duration: 2000,
          isOpen: true,
          color: "danger",
          message: RESOURCES[language].toastFailureMessage,
        });
      });
  };

  return (
    <>
      {location.state && location.state["operationType"] ? (
        <IonPage>
          <IonContent fullscreen={true}>
            <IonContent fullscreen={true}>
              <form className={"form"} onSubmit={submit}>
                {photoBase64 && (
                  <IonImg
                    className="ion-margin-bottom"
                    src={`data:image/png;base64, ${photoBase64}`}
                  />
                )}

                <IonList lines="full" className="ion-no-margin ion-no-padding">
                  {/* Category */}
                  <IonItem>
                    <IonIcon
                      icon={bookOutline}
                      color="medium"
                      class="ion-margin-end"
                    />
                    <IonLabel color="medium">
                      {RESOURCES[language].categoryLabel}
                      <IonText color="danger"> *</IonText>
                    </IonLabel>

                    <IonSelect
                      tabIndex={1}
                      interface="popover"
                      okText={RESOURCES[language].okButton}
                      cancelText={RESOURCES[language].cancelButton}
                      value={
                        RESOURCES[language].categoryOptions[values.category]
                      }
                      placeholder="Select One"
                      onIonChange={(e) => {
                        setValues({ ...values, category: e.detail.value });
                      }}
                    >
                      {Object.entries(RESOURCES[language].categoryOptions).map(
                        ([key, value], index) => (
                          <IonSelectOption value={key} key={index}>
                            {value}
                          </IonSelectOption>
                        )
                      )}
                    </IonSelect>
                  </IonItem>

                  {/* supplier or customer*/}
                  <IonItem detail={false}>
                    <IonIcon
                      icon={walletOutline}
                      color="medium"
                      class="ion-margin-end"
                    />
                    <IonLabel color="medium">
                      {location.state["operationType"] ===
                      OperationType.Purchase
                        ? RESOURCES[language].supplierLabel
                        : RESOURCES[language].customerLabel}
                      <IonText color="danger"> *</IonText>
                    </IonLabel>
                    <IonInput
                      tabIndex={2}
                      className="ion-no-padding ion-text-end"
                      placeholder="..."
                      type="text"
                      autocomplete="off"
                      value={values.supplierOrCustomer}
                      onIonChange={(e) =>
                        setValues({
                          ...values,
                          supplierOrCustomer: e.detail.value,
                        })
                      }
                    />
                  </IonItem>

                  {/* Transaction Date */}
                  <IonItem>
                    <IonIcon
                      icon={calendarOutline}
                      color="medium"
                      class="ion-margin-end"
                    />
                    <IonLabel color="medium">
                      {RESOURCES[language].transactionDateLabel}
                      <IonText color="danger"> *</IonText>
                    </IonLabel>
                    <IonSelect
                      tabIndex={3}
                      interface="popover"
                      okText={RESOURCES[language].okButton}
                      cancelText={RESOURCES[language].cancelButton}
                      value={values.transactionDate.substring(0, 2)}
                      placeholder="DD"
                      onIonChange={(e) => {
                        setValues({
                          ...values,
                          transactionDate: values.transactionDate.replace(
                            /\d\d\//,
                            `${e.detail.value}/`
                          ),
                        });
                        console.log("DD Updated");
                      }}
                    >
                      {Array.from({ length: 31 }, (_, i) => i + 1).map(
                        (value, index) => (
                          <IonSelectOption
                            value={value.toString().padStart(2, "0")}
                            key={index}
                          >
                            {value.toString().padStart(2, "0")}
                          </IonSelectOption>
                        )
                      )}
                    </IonSelect>

                    <IonSelect
                      tabIndex={4}
                      interface="popover"
                      okText={RESOURCES[language].okButton}
                      cancelText={RESOURCES[language].cancelButton}
                      value={values.transactionDate.substring(3, 5)}
                      placeholder="MM"
                      onIonChange={(e) => {
                        setValues({
                          ...values,
                          transactionDate: values.transactionDate.replace(
                            /\/(\d\d)\//,
                            `/${e.detail.value}/`
                          ),
                        });
                        console.log("MM Updated");
                      }}
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(
                        (value, index) => (
                          <IonSelectOption
                            value={value.toString().padStart(2, "0")}
                            key={index}
                          >
                            {value.toString().padStart(2, "0")}
                          </IonSelectOption>
                        )
                      )}
                    </IonSelect>

                    <IonSelect
                      tabIndex={5}
                      interface="popover"
                      okText={RESOURCES[language].okButton}
                      cancelText={RESOURCES[language].cancelButton}
                      value={values.transactionDate.substring(6, 10)}
                      placeholder="YYYY"
                      onIonChange={(e) => {
                        setValues({
                          ...values,
                          transactionDate: values.transactionDate.replace(
                            /\/(\d\d\d\d)/,
                            `/${e.detail.value}`
                          ),
                        });
                        console.log("YYYY Updated");
                      }}
                    >
                      {Array.from(
                        { length: 10 },
                        (_, i) => new Date().getFullYear() - i
                      ).map((value, index) => (
                        <IonSelectOption
                          value={value.toString().padStart(4, "0")}
                          key={index}
                        >
                          {value.toString().padStart(4, "0")}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>

                  {/* Payment Method */}
                  <IonItem>
                    <IonIcon
                      icon={cardOutline}
                      color="medium"
                      class="ion-margin-end"
                    />
                    <IonLabel color="medium">
                      {RESOURCES[language].paymentMethodLabel}
                      <IonText color="danger"> *</IonText>
                    </IonLabel>
                    <IonSelect
                      tabIndex={6}
                      interface="popover"
                      okText={RESOURCES[language].okButton}
                      cancelText={RESOURCES[language].cancelButton}
                      value={values.paymentMethod}
                      placeholder="..."
                      onIonChange={(e) => {
                        setValues({ ...values, paymentMethod: e.detail.value });
                      }}
                    >
                      {Object.entries(RESOURCES[language].paymentMethodOptions).map(
                        ([key, value], index) => (
                          <IonSelectOption value={key} key={index}>
                            {value}
                          </IonSelectOption>
                        )
                      )}
                    </IonSelect>
                  </IonItem>

                  {/* Amount */}
                  <IonItem detail={false}>
                    <IonIcon
                      icon={walletOutline}
                      color="medium"
                      class="ion-margin-end"
                    />
                    <IonLabel color="medium">
                      {RESOURCES[language].amountLabel}
                      <IonText color="danger"> *</IonText>
                    </IonLabel>
                    <IonInput
                      tabIndex={7}
                      className="ion-no-padding"
                      placeholder="..."
                      min="0"
                      dir={language === Languages.Arabic ? "ltr" : "rtl"}
                      type="number"
                      step="any"
                      inputMode="decimal"
                      autocomplete="off"
                      value={values.amount}
                      onIonChange={(e) =>
                        setValues({ ...values, amount: e.detail.value })
                      }
                    />
                  </IonItem>

                  {/* Currency */}
                  <IonItem>
                    <IonIcon
                      icon={cashOutline}
                      color="medium"
                      class="ion-margin-end"
                    />
                    <IonLabel color="medium">
                      {RESOURCES[language].currencyLabel}
                      <IonText color="danger"> *</IonText>
                    </IonLabel>
                    <IonSelect
                      tabIndex={8}
                      interface="popover"
                      okText={RESOURCES[language].okButton}
                      cancelText={RESOURCES[language].cancelButton}
                      value={values.currency}
                      placeholder="..."
                      onIonChange={(e) => {
                        setValues({ ...values, currency: e.detail.value });
                      }}
                    >
                      {Object.entries(RESOURCES[language].currencyOptions).map(
                        ([key, value], index) => (
                          <IonSelectOption value={key} key={index}>
                            {value}
                          </IonSelectOption>
                        )
                      )}
                    </IonSelect>
                  </IonItem>

                  {/* Notes */}
                  <IonItem detail={false}>
                    <IonIcon
                      icon={createOutline}
                      color="medium"
                      class="ion-margin-end"
                    />
                    <IonLabel color="medium">
                      {RESOURCES[language].notesLabel}
                    </IonLabel>
                    <IonTextarea
                    tabIndex={9} 
                      className="ion-no-padding"
                      placeholder="..."
                      dir={language === Languages.Arabic ? "ltr" : "rtl"}
                      value={values.notes}
                      onIonChange={(e) =>
                        setValues({ ...values, notes: e.detail.value })
                      }
                    />
                  </IonItem>
                </IonList>

                <IonButton
                  tabIndex={10}
                  disabled={!canSubmit}
                  expand="block"
                  type="submit"
                  className=" ion-margin"
                >
                  <IonIcon slot="start" icon={paperPlaneOutline} />
                  {RESOURCES[language].sendButtonText}
                </IonButton>
              </form>
            </IonContent>
          </IonContent>
        </IonPage>
      ) : (
        <Redirect to={"/home"} />
      )}
    </>
  );
};
