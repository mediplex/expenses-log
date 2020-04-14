import React, { useContext } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonIcon,
  IonLabel
} from "@ionic/react";
import { wifi, wine, warning, walk } from "ionicons/icons";
import { Layout } from "../components/Layout";
import { AppContext } from "../contexts/appContext";
import { RESOURCES } from "../data/resources";

export const Home = () => {
  const { language } = useContext(AppContext);
  return (
    <Layout currentPageTitle={RESOURCES[language].layoutHomeLabel}>

       <IonCard>
      <IonCardHeader>
        <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
        <IonCardTitle>Card Title</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        Keep close to Nature's heart... and break clear away, once in awhile,
        and climb a mountain or spend a week in the woods. Wash your spirit
        clean.
      </IonCardContent>
      <IonItem href="#" className="ion-activated">
        <IonIcon icon={wifi} slot="start" />
        <IonLabel>Card Link Item 1 activated</IonLabel>
      </IonItem>

      <IonItem href="#">
        <IonIcon icon={wine} slot="start" />
        <IonLabel>Card Link Item 2</IonLabel>
      </IonItem>

      <IonItem className="ion-activated">
        <IonIcon icon={warning} slot="start" />
        <IonLabel>Card Button Item 1 activated</IonLabel>
      </IonItem>

      <IonItem>
        <IonIcon icon={walk} slot="start" />
        <IonLabel>Card Button Item 2</IonLabel>
      </IonItem>
    </IonCard>
 
    </Layout>
    );
};
