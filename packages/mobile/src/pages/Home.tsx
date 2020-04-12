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
  IonFabList,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonLoading,
  IonToast,
} from "@ionic/react";
import {
  calendarOutline,
  bookOutline,
  cardOutline,
  cashOutline,
  walletOutline,
  createOutline,
  paperPlaneOutline,
  globeOutline,
} from "ionicons/icons";
import { camera } from "ionicons/icons";
import React, { useState, useCallback, useEffect, useRef } from "react";

import { useCamera } from "@ionic/react-hooks/camera";
import {
  CameraResultType,
  CameraSource,
  CameraOptions,
  CameraDirection,
} from "@capacitor/core";

import axios from "axios";
import { Languages } from "../enums/Languages";
import { RESOURCES } from "../data/resources";

import "./Home.css";

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
  // allowEditing: true,
  direction: CameraDirection.Front,
  presentationStyle: "fullscreen",
  quality: 100,
  saveToGallery: false,
  source: CameraSource.Prompt,
};

// console.log(navigator.language);
// console.log(navigator.onLine);
// console.log(navigator.storage);

export const Home = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [language, setLanguage] = useState(Languages.English);
  const [canSubmit, setCanSubmit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingControl, setEditingControl] = useState(null);
  const [toast, setToast] = useState({
    message: "",
    isOpen: false,
    duration: 1000,
    color: "",
  });
  const [pickerAttributes, setPickerAttributes] = useState({
    columns: [],
    isOpen: false,
  });
  const { isAvailable, getPhoto, photo } = useCamera();
  const [values, setValues] = useState(initialValues);

  const supplierInputRef = useRef(null);
  const amountInputRef = useRef(null);

  useEffect(() => {
    if (
      values.amount !== "" &&
      values.category !== "" &&
      values.currency !== "" &&
      values.paymentMethod !== "" &&
      values.responsible !== "" &&
      values.supplier !== "" &&
      values.transactionDate !== ""
    )
      setCanSubmit(true);
  }, [values]);

  const triggerCamera = useCallback(async () => {
    if (isAvailable) {
      getPhoto(cameraOptions)
        .then(() => {
          setShowModal(true);
        })
        .catch((err) =>setToast({...toast,color:"danger", isOpen:true, message: err}));
    } else setToast({...toast,color:"warning", isOpen:true, message:'The camera is not available'})
  }, [isAvailable, getPhoto, toast]);

  const submit = (e) => {
    e.preventDefault();

    setShowLoading(true);

    const transValues = new Array(8);

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
      .post(
        "https://us-central1-golden-stream-turkey.cloudfunctions.net/s/api/addInvoice",
        cleanData,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(function (response) {
        setShowModal(false);
        setValues(initialValues);
        setShowLoading(false);
        setToast({
          ...toast,
          isOpen: true,
          color: "success",
          message: RESOURCES[language].toastSuccessMessage,
        });
      })
      .catch(function (error) {
        setShowLoading(false);
        setToast({
          ...toast,
          isOpen: true,
          color: "danger",
          message: RESOURCES[language].toastFailureMessage,
        });
      });
  };

  const getFocus = () => {
    console.log('get focus')
    supplierInputRef.current.focus();
  }


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
        setValues({
          ...values,
          category: `${e[RESOURCES[Languages.English].categoryLabel].value}`,
        });
        getFocus();
        break;

      case RESOURCES[Languages.English].paymentMethodLabel:
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
          cssClass={"modal"}
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
          swipeToClose={false}
        >
          <IonHeader translucent>
            <IonToolbar>
              <IonTitle>Expenses App</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen={true}>
            <form className={"form"} onSubmit={submit}>
              {photo && (
                <IonImg
                  className="ion-margin-bottom"
                  src={`data:image/png;base64, ${photo.base64String}`}
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
                onDidDismiss={() =>setPickerAttributes({ ...pickerAttributes, isOpen: false })}
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
                    tabIndex={2}
                    onFocus={()=> console.log('got focus')}
                    onBlur={()=> console.log('lost focus')}
                    ref={supplierInputRef}
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
                    ref={amountInputRef}
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
                    <IonText color="dark">{values.currency}</IonText>
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
          <IonFab
            vertical="bottom"
            horizontal="end"
            slot="fixed"
            color="medium"
          >
            <IonFabButton>
              <IonIcon icon={globeOutline} />
            </IonFabButton>
            <IonFabList side="start">
              <IonFabButton
                color={language === Languages.Turkish ? "primary" : "medium"}
                onClick={() => setLanguage(Languages.Turkish)}
              >
                TR
              </IonFabButton>
              <IonFabButton
                color={language === Languages.English ? "primary" : "medium"}
                onClick={() => setLanguage(Languages.English)}
              >
                EN
              </IonFabButton>
              <IonFabButton
                color={language === Languages.Arabic ? "primary" : "medium"}
                onClick={() => setLanguage(Languages.Arabic)}
              >
                AR
              </IonFabButton>
            </IonFabList>
          </IonFab>
        </IonModal>

        <IonLoading
          isOpen={showLoading}
          // onDidDismiss={() => setShowLoading(false)}
          message={"Please wait..."}
          duration={0}
        />

        <IonToast
          cssClass="ion-text-center"
          isOpen={toast.isOpen}
          onDidDismiss={() => setToast({ ...toast, isOpen: false })}
          message={toast.message}
          duration={toast.duration}
          color={toast.color}
        />
      </IonContent>
    </IonPage>
  );
};
