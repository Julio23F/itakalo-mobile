import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ArrowRightIcon, LightbulbIcon } from 'phosphor-react-native'

export default function SellerTips() {
  return (
    <View className="p-4 bg-white rounded-xl shadow-md mx-3 mt-4 mb-4">
        <Text className="text-lg font-bold text-[#03233A] mb-3">
            Conseils pour Débuter
        </Text>
        
        <View className="flex-row items-start mb-3 p-3 bg-blue-50 rounded-lg">
            <LightbulbIcon size={20} color="#00A9FF" weight="fill" />
            <View className="ml-3 flex-1">
                <Text className="text-sm font-semibold text-[#03233A]">
                    Optimiser vos Photos
                </Text>
                <Text className="text-xs text-gray-600 mt-1">
                    Les annonces avec de bonnes photos se vendent 50% plus vite.
                </Text>
            </View>
        </View>
        
        <View className="flex-row items-start mb-2 p-3 bg-green-50 rounded-lg">
            <LightbulbIcon size={20} color="#10B981" weight="fill" />
            <View className="ml-3 flex-1">
                <Text className="text-sm font-semibold text-[#03233A]">
                    Le guide des Échanges
                </Text>
                <Text className="text-xs text-gray-600 mt-1">
                    Découvrez comment effectuer votre premier échange sécurisé.
                </Text>
            </View>
        </View>
        
        <TouchableOpacity className="mt-3 flex-row justify-between items-center py-1">
            <Text className="text-sm font-semibold text-gray-500">
                Accéder au Centre d'Aide
            </Text>
            <ArrowRightIcon size={16} color="#03233A" />
        </TouchableOpacity>
    </View>
  )
}