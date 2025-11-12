import React, { useState } from "react";
import {
  ViroARScene,
  ViroARSceneNavigator,
  Viro3DObject,
  ViroAmbientLight,
  ViroTrackingReason,
  ViroTrackingStateConstants,
} from "@reactvision/react-viro";
import { StyleSheet } from "react-native";

const HelloWorldSceneAR = () => {
  const [text, setText] = useState("Déplace ton téléphone pour scanner la surface...");

  function onInitialized(state: ViroTrackingStateConstants, reason: any) {
    console.log("onInitialized", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("Objet chargé !");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      setText("Perte de suivi AR...");
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      {/* Lumière ambiante pour bien éclairer l’objet */}
      <ViroAmbientLight color="#FFFFFF" intensity={500} />

      {/* Ton objet 3D */}
      <Viro3DObject
        source={require("../../Object3D/products/sac_luxe.glb")}
        type="GLB"
        position={[0, 0, -0.3]}   // Plus proche de la caméra
        scale={[0.3, 0.3, 0.3]}   // Plus grand
        rotation={[0, 0, 0]}
        dragType="FixedToWorld"
        onDrag={() => {}}
      />

    </ViroARScene>
  );
};

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
  );
};

const styles = StyleSheet.create({
  f1: { flex: 1 },
});
