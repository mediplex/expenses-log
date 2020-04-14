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
  IonPicker,
  IonIcon,
  IonInput,
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
  transactionDate: "",
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
    };
  }, [photoBase64, history]);

  const [canSubmit, setCanSubmit] = useState(false);
  const [editingControl, setEditingControl] = useState(null);

  const [pickerAttributes, setPickerAttributes] = useState({
    columns: [],
    isOpen: false,
  });

  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    if (
      values.amount !== "" &&
      values.category !== "" &&
      values.currency !== "" &&
      values.paymentMethod !== "" &&
      values.responsible !== "" &&
      values.supplierOrCustomer !== "" &&
      values.transactionDate !== ""
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
        `https://us-central1-golden-stream-turkey.cloudfunctions.net/server/api/add${location.state['operationType']}`,
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
        console.log(error)
        setLoading({ duration: 0, isOpen: false, message: "" });
        setToast({
          duration: 2000,
          isOpen: true,
          color: "danger",
          message: RESOURCES[language].toastFailureMessage,
        });
      });
  };

  const handlePicker = (id) => {
    setEditingControl(id);
    switch (id) {
      case RESOURCES[Languages.English].transactionDateLabel:
        const date = new Date();
        setPickerAttributes({
          isOpen: true,
          columns: [
            {
              name: "month",
              options: Array.from({ length: 12 }, (_, i) => i + 1).map(
                (value) => ({
                  text: value.toString().padStart(2, "0"),
                  value: value.toString().padStart(2, "0"),
                })
              ),
              selectedIndex: date.getMonth(),
            },
            {
              name: "day",
              options: Array.from({ length: 31 }, (_, i) => i + 1).map(
                (value) => ({
                  text: value.toString().padStart(2, "0"),
                  value: value.toString().padStart(2, "0"),
                })
              ),
              selectedIndex: date.getDate() - 1,
            },
            {
              name: "year",
              options: Array.from(
                { length: date.getFullYear() - 1900 },
                (_, i) => date.getFullYear() - i
              ).map((value) => ({
                text: value.toString().padStart(4, "0"),
                value: value.toString().padStart(4, "0"),
              })),
              selectedIndex: 0,
            },
          ],
        });
        break;

      case RESOURCES[Languages.English].categoryLabel:
        setPickerAttributes({
          isOpen: true,
          columns: [
            {
              name: RESOURCES[Languages.English].categoryLabel,
              options: Object.entries(RESOURCES[language].categoryOptions).map(
                ([key, value]) => ({
                  text: value,
                  value: RESOURCES[Languages.English].categoryOptions[key],
                })
              ),
            },
          ],
        });
        break;

      case RESOURCES[Languages.English].paymentMethodLabel:
        setPickerAttributes({
          isOpen: true,
          columns: [
            {
              name: RESOURCES[Languages.English].paymentMethodLabel,
              options: Object.entries(
                RESOURCES[language].paymentMethodOptions
              ).map(([key, value]) => ({
                text: value,
                value: RESOURCES[Languages.English].paymentMethodOptions[key],
              })),
            },
          ],
        });
        break;

      case RESOURCES[Languages.English].currencyLabel:
        setPickerAttributes({
          isOpen: true,
          columns: [
            {
              name: RESOURCES[Languages.English].currencyLabel,
              options: Object.entries(RESOURCES[language].currencyOptions).map(
                ([key, value]) => ({
                  text: value,
                  value: RESOURCES[Languages.English].currencyOptions[key],
                })
              ),
            },
          ],
        });
        break;
    }
  };

  const handlePickerOk = (e) => {
    switch (editingControl) {
      case RESOURCES[Languages.English].transactionDateLabel:
        setValues({
          ...values,
          transactionDate: `${e["day"].value}/${e["month"].value}/${e["year"].value}`,
        });
        break;

      case RESOURCES[Languages.English].categoryLabel:
        setValues({
          ...values,
          category: e[RESOURCES[Languages.English].categoryLabel].value,
        });
        break;

      case RESOURCES[Languages.English].paymentMethodLabel:
        setValues({
          ...values,
          paymentMethod:
            e[RESOURCES[Languages.English].paymentMethodLabel].value,
        });
        break;

      case RESOURCES[Languages.English].currencyLabel:
        setValues({
          ...values,
          currency: e[RESOURCES[Languages.English].currencyLabel].value,
        });

        break;
    }

    setPickerAttributes({ ...pickerAttributes, isOpen: false });
  };

  return (
 <> { (location.state &&  location.state['operationType'] ) ?  <IonPage>
      <IonContent fullscreen={true} className={""}>
        <IonContent fullscreen={true}>
          <form className={"form"} onSubmit={submit}>
            {photoBase64 && (
              <IonImg
                className="ion-margin-bottom"
                src={`data:image/png;base64, ${photoBase64}`}
            
              />
            )}

            {/* Picker */}
            <IonPicker
              columns={pickerAttributes.columns}
              isOpen={pickerAttributes.isOpen}
              buttons={[
                {
                  text: RESOURCES[language].pickerOkButton,
                  handler: handlePickerOk,
                },
              ]}
              onDidDismiss={() =>
                setPickerAttributes({ ...pickerAttributes, isOpen: false })
              }
            />

            <IonList lines="full" className="ion-no-margin ion-no-padding">
              {/* Category */}
              <IonItem
                tabIndex={1}
                button
                detail={false}
                onClick={() => {
                  handlePicker(RESOURCES[Languages.English].categoryLabel);
                }}
                dir={language === Languages.Arabic ? "rtl" : "ltr"}
              >
                <IonIcon
                  icon={bookOutline}
                  color="medium"
                  class="ion-margin-end"
                />
                <IonLabel color="medium">
                  {RESOURCES[language].categoryLabel}
                  <IonText color="danger"> *</IonText>
                </IonLabel>
                {values.category === "" ? (
                  <IonText color="medium">...</IonText>
                ) : (
                  <IonText color="dark">
                    {RESOURCES[language].categoryOptions[values.category]}
                  </IonText>
                )}
              </IonItem>

              {/* supplier or customer*/}
              <IonItem
                detail={false}
              >
                <IonIcon
                  icon={walletOutline}
                  color="medium"
                  class="ion-margin-end"
                />
                <IonLabel
                color="medium"
                >
                  {location.state['operationType'] === OperationType.Purchase
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
                    setValues({ ...values, supplierOrCustomer: e.detail.value })
                  }
                />
              </IonItem>

              {/* Transaction Date */}
              <IonItem
                tabIndex={3}
                button
                detail={false}
                onClick={() => {
                  handlePicker(
                    RESOURCES[Languages.English].transactionDateLabel
                  );
                }}
                dir={language === Languages.Arabic ? "rtl" : "ltr"}
              >
                <IonIcon
                  icon={calendarOutline}
                  color="medium"
                  class="ion-margin-end"
                />
                <IonLabel color="medium">
                  {RESOURCES[language].transactionDateLabel}
                  <IonText color="danger"> *</IonText>
                </IonLabel>
                {values.transactionDate === "" ? (
                  <IonText color="medium">...</IonText>
                ) : (
                  <IonText color="dark">{values.transactionDate}</IonText>
                )}
              </IonItem>

              {/* Payment Method */}
              <IonItem
                tabIndex={4}
                button
                detail={false}
                onClick={() => {
                  handlePicker(RESOURCES[Languages.English].paymentMethodLabel);
                }}
                dir={language === Languages.Arabic ? "rtl" : "ltr"}
              >
                <IonIcon
                  icon={cardOutline}
                  color="medium"
                  class="ion-margin-end"
                />
                <IonLabel color="medium">
                  {RESOURCES[language].paymentMethodLabel}
                  <IonText color="danger"> *</IonText>
                </IonLabel>
                {values.paymentMethod === "" ? (
                  <IonText color="medium">...</IonText>
                ) : (
                  <IonText color="dark">
                    {
                      RESOURCES[language].paymentMethodOptions[
                        values.paymentMethod
                      ]
                    }
                  </IonText>
                )}
              </IonItem>

              {/* Amount */}
              <IonItem
                detail={false}
                dir={language === Languages.Arabic ? "rtl" : "ltr"}
              >
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
                  tabIndex={5}
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
              <IonItem
                tabIndex={6}
                button
                detail={false}
                onClick={() => {
                  handlePicker(RESOURCES[Languages.English].currencyLabel);
                }}
                dir={language === Languages.Arabic ? "rtl" : "ltr"}
              >
                <IonIcon
                  icon={cashOutline}
                  color="medium"
                  class="ion-margin-end"
                />
                <IonLabel color="medium">
                  {RESOURCES[language].currencyLabel}
                  <IonText color="danger"> *</IonText>
                </IonLabel>
                {values.currency === "" ? (
                  <IonText color="medium">...</IonText>
                ) : (
                  <IonText color="dark">
                    {RESOURCES[language].currencyOptions[values.currency]}
                  </IonText>
                )}
              </IonItem>

              {/* Notes */}
              <IonItem
                tabIndex={7}
                detail={false}
                dir={language === Languages.Arabic ? "rtl" : "ltr"}
              >
                <IonIcon
                  icon={createOutline}
                  color="medium"
                  class="ion-margin-end"
                />
                <IonLabel color="medium">
                  {RESOURCES[language].notesLabel}
                </IonLabel>
                <IonTextarea
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
              tabIndex={8}
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
    </IonPage> : <Redirect to={"/home"}/>
 }</> );
};
