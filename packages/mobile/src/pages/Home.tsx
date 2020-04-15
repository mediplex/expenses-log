import React, { useContext } from "react";
import { Layout } from "../components/Layout";
import { AppContext } from "../contexts/appContext";
import { RESOURCES } from "../data/resources";

export const Home = () => {
  const { language } = useContext(AppContext);
  return (
    <Layout currentPageTitle={RESOURCES[language].layoutHomeLabel}>

   
 
    </Layout>
    );
};
