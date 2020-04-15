import { Purchases } from "./Purchases";
import { Sales } from "./Sales";
import { Form } from "./Form";
import { Settings } from "./Settings";
import { Home } from "./Home";
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonApp,
} from "@ionic/react";
import React, { useContext } from "react";
import { Route, Redirect } from "react-router";
import { home, cart, wallet, settings } from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";
import { AppContext } from "../contexts/appContext";
import { RESOURCES } from "../data/resources";
import { Languages } from "../enums/Languages";



const routes = [
  {
    title: 'Purchases',
    path: "/purchases",
    component: Purchases,
  },
  {
    title: 'Sales',
    path: "/sales",
    component: Sales,
  },
  {
    title: 'Form',
    path: "/form",
    component: Form,
  },
  {
    title: 'Settings',
    path: "/settings",
    component: Settings,
  },
  {
    title: 'Home',
    path: "/home",
    component: Home,
  },
];

export const App = () => {
  const { language } = useContext(AppContext);

  return (
    <IonApp lang={language} dir={language===Languages.Arabic? 'rtl':'ltr'}>
      <IonReactRouter >
          <IonTabs >
            <IonRouterOutlet >
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  children={()=><route.component title={route.title}/>}
                  exact={true}
                  strict={true}
                />
              ))}
              <Route path="/" exact stric={true} render={() => <Redirect to="/home" />} />
            </IonRouterOutlet>
          
          
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={home} />
              <IonLabel>{RESOURCES[language].layoutHomeLabel}</IonLabel>
              </IonTabButton>

              <IonTabButton tab="purchases" href="/purchases">
                <IonIcon icon={cart} />
                <IonLabel>{RESOURCES[language].layoutPurchasesLabel}</IonLabel>
              </IonTabButton>

              <IonTabButton tab="sales" href="/sales">
                <IonIcon icon={wallet} />
              <IonLabel>{RESOURCES[language].layoutSalesLabel}</IonLabel>
              </IonTabButton>

              <IonTabButton tab="settings" href="/settings">
                <IonIcon icon={settings} />
                <IonLabel>{RESOURCES[language].layoutSettingsLabel}</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};
