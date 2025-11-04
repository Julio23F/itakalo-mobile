import { View, Text, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { ProfilStackNavigation } from '../ProfileScreen';
import { confidentialityData } from '../../data/confidentialityData'; 
export default function ConfidentialityScreen() {
    const navigation = useNavigation<ProfilStackNavigation>();
    
    return (
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

        <View className="flex-row items-center px-6 pt-4 pb-3 mb-2 border-b border-gray-100 shadow-sm bg-white">
          <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-full bg-gray-100">
            <ArrowLeftIcon size={24} color="black" weight="bold" />
          </TouchableOpacity>
          <Text className="text-xl font-extrabold ml-5 text-gray-900">{confidentialityData.mainTitle}</Text>
        </View>

        <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          
          <Text className="text-base text-gray-600 leading-6 mb-6 font-medium italic">
            Dernière mise à jour : 04 Novembre 2025.
          </Text>

          {confidentialityData.sections.map((section, index) => (
            <View key={index} className="mb-8">
              <Text className="text-xl font-extrabold text-[#03233A] mb-2">{section.title}</Text>
              <Text className="text-base text-gray-700 leading-7">{section.content}</Text>
            </View>
          ))}
          
           {/* CTA / Lien vers Contact */}
           <View className="mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <Text className="text-sm font-semibold text-yellow-800">
                    Pour toute question relative à cette politique, veuillez contacter notre support directement via l'application.
                </Text>
            </View>

        </ScrollView>
      </SafeAreaView>
    );
}