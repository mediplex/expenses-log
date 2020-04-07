import React, { useState } from "react";
import {
  IonButton,
  IonImg,
  IonItemDivider,
  IonList,
  IonItem,
  IonInput,
  IonLabel,
} from "@ionic/react";

export const Form = ({ history, encodedBase64Image }) => {
  const [text, setText] = useState<string>();
  const [number, setNumber] = useState<number>();

  return (
    <>
      <IonImg src={`data:image/png;base64, ${encodedBase64Image}`} />

      <IonItemDivider>Default Input with Placeholder</IonItemDivider>
      <IonList>
        <IonItemDivider>Default Input with Placeholder</IonItemDivider>
        <IonItem>
          <IonInput
            value={text}
            placeholder="Enter Input"
            onIonChange={(e) => setText(e.detail.value!)}
          ></IonInput>
        </IonItem>

        <IonItemDivider>
          Input with clear button when there is a value
        </IonItemDivider>
        <IonItem>
          <IonInput
            value={text}
            placeholder="Enter Input"
            onIonChange={(e) => setText(e.detail.value!)}
            clearInput
          ></IonInput>
        </IonItem>

        <IonItemDivider>Number type input</IonItemDivider>
        <IonItem>
          <IonInput
            type="number"
            value={number}
            placeholder="Enter Number"
            onIonChange={(e) => setNumber(parseInt(e.detail.value!, 10))}
          ></IonInput>
        </IonItem>

        <IonItemDivider>Disabled input</IonItemDivider>
        <IonItem>
          <IonInput value={text} disabled></IonInput>
        </IonItem>

        <IonItemDivider>Readonly input</IonItemDivider>
        <IonItem>
          <IonInput value={text} readonly></IonInput>
        </IonItem>

        <IonItemDivider>Inputs with labels</IonItemDivider>

        <IonItem>
          <IonLabel>Default Label</IonLabel>
          <IonInput></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Floating Label</IonLabel>
          <IonInput value={text}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="fixed">Fixed Label</IonLabel>
          <IonInput value={text}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Stacked Label</IonLabel>
          <IonInput value={text}> </IonInput>
        </IonItem>
      </IonList>
      <IonButton
        onClick={(e) => {
          e.preventDefault();
          history.push("/home");
        }}
      >
        Go to User 1
      </IonButton>
    </>
  );
};
