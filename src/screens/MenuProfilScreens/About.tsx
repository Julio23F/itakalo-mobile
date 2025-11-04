import { View, Text, TouchableOpacity, StatusBar, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { ProfilStackNavigation } from "../ProfileScreen";

export default function About() {
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
        <Text className="text-lg font-bold ml-5 text-[#03233A]">À propos de iTakalo</Text>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <Text className="text-base text-gray-700 leading-6 mb-4">
          iTakalo est une plateforme malgache innovante permettant de vendre, échanger
          ou donner des objets facilement et en toute sécurité.
        </Text>
        <Text className="text-base text-gray-700 leading-6 mb-4">
          Notre objectif est de promouvoir une économie circulaire, réduire le gaspillage
          et renforcer la confiance entre les utilisateurs grâce à la vérification KYC.
        </Text>
        <Text className="text-base text-gray-700 leading-6">
          Version 1.0 — Développé avec ❤️ par notre équipe à Madagascar.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
