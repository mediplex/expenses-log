import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { camera } from "ionicons/icons";
import React, { useContext } from "react";
import { PhotoContext } from "../contexts/photoContext";
import { Layout } from "../components/Layout";
import { useHistory } from "react-router";
import { OperationType } from "../enums/OperationType";
import { AppContext } from "../contexts/appContext";
import { RESOURCES } from "../data/resources";
import { title } from "process";

export const Purchases = () => {
  const history = useHistory();
  const { triggerCamera } = useContext(PhotoContext);
  const { language } = useContext(AppContext);
  return (
    <Layout currentPageTitle={RESOURCES[language].layoutPurchasesLabel}>
      <IonFab vertical="center" horizontal="center" slot="fixed">
        <IonFabButton
          onClick={() =>
            triggerCamera(() =>
              history.push("/form", { operationType: OperationType.Purchase })
            )
          }
        >
          <IonIcon icon={camera} />
        </IonFabButton>
      </IonFab>
    </Layout>
  );
};
