import React from "react";
import { IonItem, IonLabel, IonPicker, IonText } from "@ionic/react";
import { Languages } from "../data/Languages";

const date = new Date();


export const TransactionDate = ({ values, setValues, language , editMode, onClick}) => {
  return (
    <>
      <IonItem button onClick={onClick} dir={language === Languages.Arabic ? "rtl" : "ltr"}>
        <IonLabel color="medium">
          Transaction Date<IonText color="danger"> *</IonText>
        </IonLabel>
        <IonText>{values.transactionDate}</IonText>
      </IonItem>
      <IonPicker
        onDidDismiss={() => console.log("onDismiss")}
        isOpen={editMode}
        columns={[
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
        ]}
        buttons={[
          {
            text: "Ok",
            handler: (e) =>
              setValues({
                ...values,
                transactionDate: `${e["day"].value}/${e["month"].value}/${e["year"].value}`,
              }),
          },
        ]}
      />
    </>
  );
};
