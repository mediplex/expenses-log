import {
  IonContent,
  IonPage,
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonButton,
  IonImg,
  IonItemDivider,
  IonItem,
  IonInput,
  IonLabel,
  IonList,
} from "@ionic/react";
import { camera } from "ionicons/icons";
import React, { useState, useCallback } from "react";

import { useCamera } from "@ionic/react-hooks/camera";
import {
  CameraResultType,
  CameraSource,
  CameraOptions,
  CameraDirection,
} from "@capacitor/core";

import axios from "axios";

const initialValues = {
  category: "",
  debiter: "",
  date: "",
  paymentMethod: "Cash",
  amount: 0.0,
  currency: "TRY",
  responsible: "", // should come from the current logged user or predefined list
  note: "",
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

export const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const { isAvailable, getPhoto, photo } = useCamera();
  const [values, setValues] = useState(initialValues);

  const triggerCamera = useCallback(async () => {
    if (isAvailable) {
      console.log("Camera is available");
      getPhoto(cameraOptions)
        .then(() => {
          setShowModal(true);
        })
        .catch((err) => console.log(err));
    } else console.log("Camera is not available");
  }, [getPhoto]);

  const submit = (e) => {
    e.preventDefault();

    const cleanData = {
      image: photo.base64String,
      values: [[...Object.values(values)]],
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
      })
      .catch(function (error) {
        // close spinner
        // modal info
        console.log(error);
      });
  };

  return (
    <IonPage>
      <IonContent fullscreen={true}>
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
          <IonContent>
            {photo && (
              <IonImg src={`data:image/png;base64, ${photo.base64String}`} />
            )}
            <IonButton onClick={submit}>Close Modal</IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};
