import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { PhotoContext } from "../contexts/photoContext";
import { Layout } from "../components/Layout";
import { camera } from "ionicons/icons";
import { OperationType } from "../enums/OperationType";
import { RESOURCES } from "../data/resources";
import { AppContext } from "../contexts/appContext";

export const Sales = () => {
  const history = useHistory();
  const { triggerCamera } = useContext(PhotoContext);
  const { language } = useContext(AppContext);
  return (
    <Layout currentPageTitle={RESOURCES[language].layoutSalesLabel}>
      <IonFab vertical="center" horizontal="center" slot="fixed">
        <IonFabButton
          onClick={() =>
            triggerCamera(() =>
              history.push("/form", { operationType: OperationType.Sale })
            )
          }
        >
          <IonIcon icon={camera} />
        </IonFabButton>
      </IonFab>
    </Layout>
  );
};
