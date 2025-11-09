import { View, Text, TouchableOpacity, StatusBar, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { 
  ArrowLeftIcon, 
  LeafIcon, 
  GlobeHemisphereWestIcon, 
  ShieldCheckIcon, 
  ChatCircleTextIcon, 
  SparkleIcon, 
  EnvelopeSimpleIcon 
} from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { ProfilStackNavigation } from "../ProfileScreen";

export default function About() {
  const navigation = useNavigation<ProfilStackNavigation>();
  const PRIMARY_COLOR = "#03233A"; 
  const ACCENT_GREEN = "#4ade80"; 

  const keyFacts = [
    { 
      title: "Impact Écologique", 
      text: "Chaque objet échangé ou vendu réduit le gaspillage. Contribuez concrètement à l'économie circulaire de Madagascar.", 
      icon: LeafIcon, 
      color: ACCENT_GREEN 
    }, 
    { 
      title: "Confiance & Sûreté", 
      text: "Profils vérifiés (KYC) et modération pour garantir des transactions sécurisées et des utilisateurs de confiance.", 
      icon: ShieldCheckIcon, 
      color: "#f59e0b"
    }, 
    { 
      title: "Ancrage Local", 
      text: "Une application 100% Malgache, développée localement et conçue pour répondre aux besoins spécifiques de notre île.", 
      icon: GlobeHemisphereWestIcon, 
      color: "#3b82f6" 
    }, 
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <View className="flex-row items-center px-6 pt-4 pb-3 mb-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full bg-gray-100"
        >
          <ArrowLeftIcon size={24} color="black" weight="bold" />
        </TouchableOpacity>
        <Text className="text-xl font-extrabold ml-5 text-gray-900">Notre Histoire</Text>
      </View>

      <ScrollView 
        className="flex-1 px-6" 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        
        <View className="items-start mb-8 border-b border-gray-100 pb-6">
            <Text style={{ color: PRIMARY_COLOR }} className="text-3xl font-black mb-3 leading-9">
                La plateforme d'échange malgache est lancée !
            </Text>
            <Text className="text-base text-gray-700 leading-6">
                iTakalo est maintenant disponible pour tous. Notre mission est de faciliter la vente, l'échange et le don d'objets, en créant une **communauté forte et digne de confiance** à travers Madagascar.
            </Text>
        </View>

        <Text className="text-lg font-bold text-gray-900 mb-4">Notre Engagement : 3 Piliers</Text>

        {keyFacts.map((fact, index) => (
            <View 
                key={index} 
                className="flex-row p-4 rounded-xl mb-4 bg-white border border-gray-100 shadow-sm"
                style={{
                    shadowColor: PRIMARY_COLOR,
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 3,
                    elevation: 1, 
                }}
            >
                <View className="w-10 h-10 rounded-lg items-center justify-center mr-4" style={{ backgroundColor: fact.color + '15' }}>
                    <fact.icon size={20} color={fact.color} weight="fill" />
                </View>

                <View className="flex-1">
                    <Text style={{ color: PRIMARY_COLOR }} className="text-base font-extrabold mb-1">{fact.title}</Text>
                    <Text className="text-sm text-gray-700 leading-5">{fact.text}</Text>
                </View>
            </View>
        ))}
        
        <View className="mt-8 border-t border-gray-100 pt-6">
            <View className="flex-row items-center mb-4">
                 <SparkleIcon size={22} color={PRIMARY_COLOR} weight="fill" />
                 <Text className="text-lg font-bold ml-2 text-gray-900">Rejoignez-nous au lancement !</Text>
            </View>
            
            <Text className="text-base text-gray-700 leading-6 mb-4">
                En tant que nouvel utilisateur, votre participation est vitale. Vous êtes les pionniers de cette communauté. **Commencez dès aujourd'hui** à échanger et à vendre.
            </Text>
             <View className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <Text className="text-sm font-semibold text-blue-800">
                    Découvrez des objets uniques et publiez gratuitement votre première annonce pour faire partie du mouvement iTakalo !
                </Text>
            </View>
        </View>

        <View className="mt-8 border-t border-gray-100 pt-6">
            <View className="flex-row items-center mb-4">
                 <ChatCircleTextIcon size={22} color={PRIMARY_COLOR} weight="fill" />
                 <Text className="text-lg font-bold ml-2 text-gray-900">Aide Rapide</Text>
            </View>

            <View className="bg-gray-50 p-4 rounded-xl mb-4">
                <Text className="text-sm font-bold mb-1 text-gray-800">Comment puis-je commencer à publier ?</Text>
                <Text className="text-sm text-gray-600">Après avoir vérifié votre profil (KYC), accédez à l'onglet "Publier" pour créer votre première annonce en moins de deux minutes.</Text>
            </View>

            <View className="bg-gray-50 p-4 rounded-xl mb-4">
                <Text className="text-sm font-bold mb-1 text-gray-800">Y a-t-il des frais sur les échanges ?</Text>
                <Text className="text-sm text-gray-600">L'échange et le don sont gratuits. Seules les ventes sont soumises à une commission minime pour couvrir les coûts opérationnels et la sécurité.</Text>
            </View>
            
             <TouchableOpacity className="flex-row items-center justify-center p-3 rounded-xl border border-gray-300 bg-white mt-4">
                <EnvelopeSimpleIcon size={20} color={PRIMARY_COLOR} weight="bold" />
                <Text style={{ color: PRIMARY_COLOR }} className="text-base font-bold ml-2">Nous Contacter (Support)</Text>
             </TouchableOpacity>
        </View>
        
        <View className="mt-8 pt-4 border-t border-gray-100">
            <Text className="text-xs font-medium text-gray-500 text-center">
                iTakalo • Version 1.0.0 (Lancement Officiel) • Fièrement développé à Madagascar.
            </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}