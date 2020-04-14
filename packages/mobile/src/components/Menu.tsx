import {
  IonContent,
  IonItem,
  IonList,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/react';
import React from 'react';

export const  Menu = () => {

  return (
    <IonMenu contentId="main" type="overlay" >
      <IonHeader>
        <IonToolbar color="danger">
          <IonTitle>End Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>Menu Item</IonItem>
          <IonItem>Menu Item</IonItem>
          <IonItem>Menu Item</IonItem>
          <IonItem>Menu Item</IonItem>
          <IonItem>Menu Item</IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};
