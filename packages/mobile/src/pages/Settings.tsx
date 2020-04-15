import {
  IonText,
  IonIcon,
  IonLabel,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonButton
} from "@ionic/react";
import React, { useContext } from "react";
import { person, globe, moon } from "ionicons/icons";
import { Languages } from "../enums/Languages";
import { AppContext } from "../contexts/appContext";
import { Layout } from "../components/Layout";
import { RESOURCES } from "../data/resources";

export const Settings = ({ title }) => {
  const { language, setLanguage } = useContext(AppContext);

  return (
    <>
      <Layout currentPageTitle={RESOURCES[language].layoutSettingsLabel}>
        <IonList>
          <IonItem>
            <IonIcon icon={person} slot="start" />
            <IonLabel>
              <IonText>Mehdi Karim</IonText>
            </IonLabel>
            <IonButton>{RESOURCES[language].signOutButton}</IonButton>
          </IonItem>

          <IonItem>
            <IonIcon icon={globe} slot="start" />
            <IonLabel>{RESOURCES[language].languages}</IonLabel>
            <IonSelect
              slot="end"
              value={language}
              okText={RESOURCES[language].okButton}
              cancelText={RESOURCES[language].cancelButton}
              onIonChange={(e) => setLanguage(e.detail.value)}
            >
              {Object.entries(Languages).map(([key, value]) => (
                <IonSelectOption value={value} key={key}>
                  {RESOURCES[language].languageOptions[key]}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>


          <IonItem>
            <IonIcon icon={moon} slot="start" />
            <IonLabel>{RESOURCES[language].darkModeLabel}</IonLabel>
            <IonToggle />
          </IonItem>
        </IonList>
      </Layout>
    </>
  );
};
