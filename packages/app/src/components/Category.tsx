import React from "react";
import {
  IonItem,
  IonLabel,
  IonText,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { Languages } from "../data/Languages";
import { RESOURCES } from "../data/resources";

export const Category = ({ values, setValues, language, editMode }) => {
  return (
    <>
      <IonItem dir={language === Languages.Arabic ? "rtl" : "ltr"}>
        <IonLabel color="medium">
          {RESOURCES[language].categoryLabel}
          <IonText color="danger"> *</IonText>
        </IonLabel>
        <IonSelect
          defaultValue="Wages"
          value={values.category}
          onIonChange={(e) =>
            setValues({ ...values, category: e.detail.value! })
          }
        >
          {Object.values(RESOURCES[language].categoryOptions).map(
            (value, index) => (
              <IonSelectOption
                key={index}
                value={RESOURCES[Languages.English].categoryOptions[index]}
              >
                {value}
              </IonSelectOption>
            )
          )}
        </IonSelect>
      </IonItem>
    </>
  );
};
