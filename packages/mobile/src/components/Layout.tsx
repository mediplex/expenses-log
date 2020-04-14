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
import { RESOURCES } from "../data/resources";

export const Layout = ({ children, currentPageTitle }) => {
  const {language} = useContext(AppContext);
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {currentPageTitle!=="Home" && <IonBackButton  icon={language === Languages.Arabic ? chevronForward :chevronBack} text={RESOURCES[language].backButtonLabel}  defaultHref="/" />}
          </IonButtons>
          <IonTitle>
            <IonText>{currentPageTitle}</IonText>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true} className={""}>
        {children}
      </IonContent>
    </IonPage>
  );
};
