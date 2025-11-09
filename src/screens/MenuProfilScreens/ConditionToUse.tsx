import { View, Text, TouchableOpacity, StatusBar, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { ProfilStackNavigation } from "../ProfileScreen";

export default function ConditionToUse() {
  const navigation = useNavigation<ProfilStackNavigation>();
  
  // Liste des points clés pour la clarté
  const mainConditions = [
    "Respecter les autres utilisateurs et faire preuve de courtoisie.",
    "Ne pas publier de contenu illégal, frauduleux ou offensant.",
    "Fournir des informations exactes et à jour lors de l'inscription.",
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* HEADER AMÉLIORÉ */}
      <View className="flex-row items-center px-6 pt-4 pb-3 mb-2 border-b border-gray-100 shadow-sm bg-white">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full bg-gray-100"
        >
          <ArrowLeftIcon size={24} color="black" weight="bold" />
        </TouchableOpacity>
        <Text className="text-xl font-extrabold ml-5 text-gray-900">
          Conditions d’utilisation
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* INTRODUCTION */}
        <Text className="text-base text-gray-700 leading-6 mb-6">
          En utilisant iTakalo, vous acceptez les présentes conditions générales. Le non-respect de celles-ci peut entraîner la suspension ou la désactivation de votre compte.
        </Text>

        {/* SECTION 1: Règles de Conduite */}
        <Text className="text-xl font-bold text-gray-900 mb-3">1. Règles de Conduite de Base</Text>
        
        {mainConditions.map((item, index) => (
            <View key={index} className="flex-row items-start mb-3">
                <Text className="text-lg text-[#03233A] mr-2">•</Text>
                <Text className="text-base text-gray-700 leading-6 flex-1">{item}</Text>
            </View>
        ))}

        {/* SECTION 2: Responsabilité des Transactions */}
        <Text className="text-xl font-bold text-gray-900 mb-3 mt-6">2. Transactions et Échanges</Text>
        <Text className="text-base text-gray-700 leading-6 mb-4">
          Les échanges, ventes et dons doivent être faits avec **transparence** et **bonne foi**. iTakalo facilite la mise en relation mais n’est pas responsable de la qualité des objets ni des transactions effectuées hors plateforme.
        </Text>
        <View className="bg-red-50 p-3 rounded-lg mb-6 border border-red-200">
            <Text className="text-sm font-semibold text-red-700">
                Avertissement : Soyez vigilant et privilégiez les remises en main propre et sécurisées.
            </Text>
        </View>

        {/* SECTION 3: Propriété Intellectuelle */}
        <Text className="text-xl font-bold text-gray-900 mb-3 mt-6">3. Propriété Intellectuelle</Text>
        <Text className="text-base text-gray-700 leading-6 mb-4">
          Le contenu de l'application (logo, design, code) appartient à iTakalo. L'utilisateur conserve les droits sur les photos et descriptions de ses objets, mais autorise leur publication sur la plateforme.
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}