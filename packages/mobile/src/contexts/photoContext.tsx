import React, { createContext, useContext, useCallback } from "react";
import { useCamera } from "@ionic/react-hooks/camera";
import { RESOURCES } from "../data/resources";
import {
  CameraOptions,
  CameraResultType,
  CameraDirection,
  CameraSource,
} from "@capacitor/core";

import {AppContext} from '../contexts/appContext'

export const PhotoContext = createContext(null);

const cameraOptions: CameraOptions = {
  resultType: CameraResultType.Base64,
  correctOrientation: true,
  direction: CameraDirection.Rear,
  presentationStyle: "fullscreen",
  quality: 40,
  saveToGallery: false,
  source: CameraSource.Prompt

};

export const PhotoContextProvider = ({ children }) => {
  const { setToast, language } = useContext(AppContext);
  const { isAvailable, getPhoto, photo } = useCamera();

  const triggerCamera = useCallback(async (callback) => {
    if (isAvailable) {
      getPhoto(cameraOptions)
        .then(() => {
          callback();
        })
        .catch((err) =>
          setToast({
            duration: 2000,
            color: "danger",
            isOpen: true,
            message: RESOURCES[language].cameraClosedMessage,
          })
        );
    } else
      setToast({
        duration: 2000,
        color: "danger",
        isOpen: true,
        message: RESOURCES[language].cameraNotAvailableMessage,
      });
  }, [isAvailable, getPhoto, setToast, language]);

  return (
    <PhotoContext.Provider
      value={{
        photoBase64: photo?.base64String,
        triggerCamera
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};
