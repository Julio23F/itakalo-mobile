import { View, Text, TouchableOpacity, StatusBar, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { ProfilStackNavigation } from "../ProfileScreen";

export default function ConditionToUse() {
  const navigation = useNavigation<ProfilStackNavigation>();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View className="flex-row items-center px-6 mt-4 mb-5">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full bg-gray-100"
        >
          <ArrowLeftIcon size={24} color="black" weight="bold" />
        </TouchableOpacity>
        <Text className="text-lg font-bold ml-5 text-[#03233A]">
          Conditions d’utilisation
        </Text>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <Text className="text-base text-gray-700 leading-6 mb-4">
          En utilisant iTakalo, vous acceptez nos conditions générales : respecter les
          utilisateurs, ne pas publier de contenu frauduleux, et fournir des informations
          exactes. Toute violation peut entraîner la suspension du compte.
        </Text>
        <Text className="text-base text-gray-700 leading-6 mb-4">
          Les échanges, ventes et dons doivent être faits avec courtoisie et transparence.
          iTakalo n’est pas responsable des transactions hors plateforme.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
