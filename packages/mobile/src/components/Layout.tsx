import {
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonContent,
  IonTitle,
  IonText,
} from "@ionic/react";
import React, { useContext } from "react";
import { chevronBack, chevronForward } from "ionicons/icons";
import { AppContext } from "../contexts/appContext";
import { Languages } from "../enums/Languages";
import { useLocation } from "react-router";

export const Layout = ({ children, currentPageTitle }) => {
  const { language } = useContext(AppContext);
  const { pathname } = useLocation();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {!pathname.includes("home") && (
              <IonBackButton
                icon={
                  language === Languages.Arabic ? chevronForward : chevronBack
                }
                text={""}
                defaultHref="/home"
              />
            )}
          </IonButtons>
          <IonTitle>
            <IonText>{currentPageTitle}</IonText>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        {children}
      </IonContent>
    </IonPage>
  );
};
