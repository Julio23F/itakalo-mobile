import { View, Text, TouchableOpacity, StatusBar, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon, LightbulbFilamentIcon, RecycleIcon, ShieldCheckIcon } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { ProfilStackNavigation } from "../ProfileScreen";

export default function About() {
  const navigation = useNavigation<ProfilStackNavigation>();
  const PRIMARY_COLOR = "#03233A";

  // Faits saillants pour rendre l'information moins dense
  const keyFacts = [
    { icon: RecycleIcon, text: "Économie circulaire : Lutte contre le gaspillage.", color: "#4ade80" }, // Vert
    { icon: LightbulbFilamentIcon, text: "Plateforme malgache : 100% développée à Madagascar.", color: "#3b82f6" }, // Bleu
    { icon: ShieldCheckIcon, text: "Sécurité & Confiance : Grâce à la vérification d’identité (KYC).", color: "#f59e0b" }, // Jaune
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* HEADER AMÉLIORÉ (Avec ombre subtile pour effet flottant) */}
      <View className="flex-row items-center px-6 pt-4 pb-3 mb-2 border-b border-gray-100 shadow-sm bg-white">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full bg-gray-100"
        >
          <ArrowLeftIcon size={24} color="black" weight="bold" />
        </TouchableOpacity>
        <Text className="text-xl font-extrabold ml-5 text-gray-900">À propos de iTakalo</Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* SECTION INTRODUCTION */}
        <Text className="text-lg font-semibold text-gray-900 mb-3">Notre Mission : Faciliter le partage</Text>
        <Text className="text-base text-gray-700 leading-6 mb-6">
          iTakalo est une plateforme malgache innovante permettant de **vendre, échanger ou donner** des objets facilement et en toute sécurité. Nous sommes le pont entre ceux qui ont et ceux qui cherchent.
        </Text>

        {/* SECTION VALEURS CLÉS (Visuel) */}
        <View className="bg-gray-50 rounded-xl p-4 mb-8 border border-gray-200">
            <Text className="text-md font-bold text-gray-800 mb-3">Nos valeurs en action :</Text>
            {keyFacts.map((fact, index) => (
                <View key={index} className="flex-row items-start mb-3">
                    <fact.icon size={20} color={fact.color} weight="fill" className="mt-0.5" />
                    <Text className="text-base text-gray-700 ml-3 flex-1 leading-6">
                        {fact.text}
                    </Text>
                </View>
            ))}
        </View>

        {/* SECTION DÉVELOPPEMENT */}
        <Text className="text-lg font-semibold text-gray-900 mb-3">Le Moteur de l'Application</Text>
        <Text className="text-base text-gray-700 leading-6 mb-4">
          Nous sommes une petite équipe passionnée, dédiée à l'amélioration constante de votre expérience. Chaque ligne de code est écrite avec l'ambition de servir la communauté malgache.
        </Text>
        
        {/* FOOTER DE LA PAGE */}
        <View className="mt-8 border-t border-gray-200 pt-4">
            <Text className="text-sm font-medium text-gray-500 text-center">
                Version 1.0.1 (Build 2025)
            </Text>
            <Text className="text-sm font-medium text-gray-500 text-center mt-1">
                Développé avec ❤️ à Madagascar.
            </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}