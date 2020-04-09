import {
  IonContent,
  IonPage,
  IonFab,
  IonFabButton,
  IonModal,
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
} from "ionicons/icons";
import { camera } from "ionicons/icons";
import React, { useState, useCallback, useEffect } from "react";

import { useCamera } from "@ionic/react-hooks/camera";
import {
  CameraResultType,
  CameraSource,
  CameraOptions,
  CameraDirection,
} from "@capacitor/core";

import axios from "axios";
import { Languages } from "../data/Languages";
import { RESOURCES } from "../data/resources";

const language: Languages = Languages.Turkish as Languages;

const initialValues = {
  category: "",
  supplier: "",
  transactionDate: "",
  paymentMethod: "",
  amount: "",
  currency: "",
  responsible: "Mehdi Karim", // should come from the current logged user or predefined list
  notes: "",
};

const cameraOptions: CameraOptions = {
  resultType: CameraResultType.Base64,
  correctOrientation: true,
  allowEditing: true,
  direction: CameraDirection.Front,
  presentationStyle: "fullscreen",
  quality: 100,
  saveToGallery: false,
  source: CameraSource.Prompt,
};

// console.log(navigator.language);

export const Home = () => {
  const [canSubmit, setCanSubmit] = useState(false)
  const [showModal, setShowModal] = useState(true);
  const [editingControl, setEditingControl] = useState(null);
  const [pickerAttributes, setPickerAttributes] = useState({
    columns: [],
    isOpen: false,
  });
  const { isAvailable, getPhoto, photo } = useCamera();
  const [values, setValues] = useState(initialValues);

  useEffect(()=>{
  if (
    values.amount !== '' &&
    values.category !== '' &&
    values.currency !== '' &&
    values.paymentMethod !== '' &&
    values.responsible !== '' &&
    values.supplier !== '' &&
    values.transactionDate !== '' 

  ) setCanSubmit(true)

  },[values])

  const triggerCamera = useCallback(async () => {
    if (isAvailable) {
      console.log("Camera is available");
      getPhoto(cameraOptions)
        .then(() => {
          setShowModal(true);
        })
        .catch((err) => console.log(err));
    } else console.log("Camera is not available");
  }, [isAvailable, getPhoto]);

  const submit = (e) => {
    e.preventDefault();
    // 0 1 3 5
    const transValues = new Array(8);

    //0 category: "",
    // supplier: "",
    // transactionDate: "",
    //3 paymentMethod: "",
    // amount: "",
    //5 currency: "",
    // responsible: "Mehdi Karim", // should come from the current logged user or predefined list
    // notes: "",

    Object.values(values).map((value, index) => {
      switch (index) {
        case 0:
          transValues[index] = Object.entries(
            RESOURCES[language].categoryOptions
          ).find(([k, v]) => value === v)[0];

          break;

        case 3:
          transValues[index] = Object.entries(
            RESOURCES[language].paymentMethodOptions
          ).find(([k, v]) => value === v)[0];
          break;

        case 5:
          transValues[index] = Object.entries(
            RESOURCES[language].currencyOptions
          ).find(([k, v]) => value === v)[0];
          break;

        default:
          transValues[index] = value;
          break;
      }
      return null;
    });

    const cleanData = {
      image: photo.base64String,
      values: [[...transValues]],
    };

    // show spinner
    axios
      .post("http://127.0.0.1:8080/api/addInvoice", cleanData, {
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        console.log(response);
        // close spinner
        //modal info
        setShowModal(false);
        setValues(initialValues);
      })
      .catch(function (error) {
        // close spinner
        // modal info
        console.log(error);
      });
  };

  const handlePicker = (id) => {
    setEditingControl(id);
    console.log(id);
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
              options: Object.keys(RESOURCES[language].categoryOptions).map(
                (key) => ({
                  text: RESOURCES[language].categoryOptions[key],
                  value: RESOURCES[language].categoryOptions[key],
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
              options: Object.values(
                RESOURCES[language].paymentMethodOptions
              ).map((value) => ({
                text: value,
                value: value,
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
              options: Object.values(RESOURCES[language].currencyOptions).map(
                (value) => ({
                  text: value,
                  value: value,
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
        console.log(e);
        setValues({
          ...values,
          category: `${e[RESOURCES[Languages.English].categoryLabel].value}`,
        });
        break;

      case RESOURCES[Languages.English].paymentMethodLabel:
        console.log(e);
        setValues({
          ...values,
          paymentMethod: `${
            e[RESOURCES[Languages.English].paymentMethodLabel].value
          }`,
        });
        break;

      case RESOURCES[Languages.English].currencyLabel:
        setValues({
          ...values,
          currency: `${e[RESOURCES[Languages.English].currencyLabel].value}`,
        });

        break;
    }

    setPickerAttributes({ ...pickerAttributes, isOpen: false });
  };

  return (
    <IonPage>
      <IonContent fullscreen={true} className={""}>
        <IonFab vertical="center" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => triggerCamera()}>
            <IonIcon icon={camera} />
          </IonFabButton>
        </IonFab>

        <IonModal
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
          swipeToClose={false}
        >
          <IonContent fullscreen={true}>
            <form onSubmit={submit}>
              <>
                {photo && (
                  <IonImg
                    className="ion-margin-bottom"
                    src={`data:image/png;base64, ${photo.base64String}`}
                  />
                )}
              </>
              <IonList lines="full" className="ion-no-margin ion-no-padding">
                {/* Picker */}
                <IonPicker
                  //cssClass= 'ion-hide'
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

                {/* Category */}
                <IonItem
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
                    <IonText color="dark">{values.category}</IonText>
                  )}
                </IonItem>

                {/* supplier */}
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
                    {RESOURCES[language].supplierLabel}
                    <IonText color="danger"> *</IonText>
                  </IonLabel>
                  <IonInput
                    className="ion-no-padding"
                    placeholder="..."
                    dir={language === Languages.Arabic ? "ltr" : "rtl"}
                    type="text"
                    autocomplete="off"
                    value={values.supplier}
                    onIonChange={(e) =>
                      setValues({ ...values, supplier: e.detail.value })
                    }
                  />
                </IonItem>

                {/* Transaction Date */}
                <IonItem
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
                  button
                  detail={false}
                  onClick={() => {
                    handlePicker(
                      RESOURCES[Languages.English].paymentMethodLabel
                    );
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
                    <IonText color="dark">{values.paymentMethod}</IonText>
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
                    <IonText color="dark">{values.currency}</IonText>
                  )}
                </IonItem>

                {/* Notes */}
                <IonItem
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
                    <IonText color="danger"> *</IonText>
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
              disabled={!canSubmit}
                expand="block"
                type="submit"
                className="ion-padding ion-margin"
              >
                Send
              </IonButton>
            </form>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};
