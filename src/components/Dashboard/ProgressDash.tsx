import { View, Text, Image } from 'react-native';
import React, { useContext } from 'react';
import { UserIcon, HeartIcon, CheckCircleIcon } from 'phosphor-react-native'; 
import { AuthContext } from '../../context/AuthContext'; 

const PROGRESS_DATA = {
    totalLikes: '1,2 K', 
    activityStatus: 'Compte vérifié', 
    progressionLevel: 'Top Vendeur', 
    progressPercent: 75, 
    nextLevelGoal: 'Atteindre le Niveau Or (10 ventes)', 
};

export default function ProgressDash() {
  const { user } = useContext(AuthContext); 
  const hasProfilimage = user?.image && user.image.length > 0;
  
  const primaryColor = '#03233A';
  const accentColor = '#03233A'; 
  const successColor = '#10B981'; 
  const grayText = '#6B7280'; 

  const progressWidth = Math.min(100, Math.max(0, PROGRESS_DATA.progressPercent));

  return (
    <View className="p-4 bg-white rounded-xl shadow-lg my-3 border border-gray-100  mt-4">  
      <View className="flex-row items-center mb-3">
        <View className="relative w-14 h-14">
          {hasProfilimage ? (
            <Image
              source={{ uri: user.image }}
              className="w-full h-full rounded-full border-2 border-gray-200"
              resizeMode="cover"
            />
          ) : (
            <View className="w-full h-full rounded-full border-2 border-gray-200 bg-gray-100 items-center justify-center">
              <UserIcon size={26} color={grayText} weight="light" />
            </View>
          )}

          {/* Badge de Compte Vérifié (KYC) */}
          <View 
            style={{ backgroundColor: successColor }} 
            className="absolute bottom-0 right-0 p-0.5 rounded-full border-2 border-white"
          >
            <CheckCircleIcon size={14} color="white" weight="fill" /> 
          </View>
        </View>

        <View className="ml-3 flex-1">
          <Text className="text-lg font-extrabold text-[#03233A]" numberOfLines={1} ellipsizeMode="tail">
            {user?.first_name || 'Utilisateur'}
          </Text>
          
          <View className="flex-row items-center mt-1">
            <HeartIcon size={16} color={grayText} weight="fill" />
            <Text className="text-xs font-semibold text-gray-600 ml-1 mr-2">
              {PROGRESS_DATA.totalLikes} J'adore
            </Text>
            <View className="w-1 h-1 bg-gray-300 rounded-full mx-1" />
            <Text className="text-xs text-gray-500 ml-2">
              {PROGRESS_DATA.activityStatus}
            </Text>
          </View>
        </View>
      </View>

      <View className="mt-2 pt-3 border-t border-gray-100">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-sm font-semibold text-gray-700">
            Niveau actuel : <Text style={{ color: primaryColor }} className="font-bold">{PROGRESS_DATA.progressionLevel}</Text>
          </Text>
          <Text className="text-sm font-bold text-gray-600">
            {PROGRESS_DATA.progressPercent}%
          </Text>
        </View>

        {/* Barre de Progression dynamique*/}
        <View className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <View 
            style={{ width: `${progressWidth}%`, backgroundColor: accentColor }} 
            className="h-full rounded-full"
          />
        </View>

        <Text className="text-xs text-gray-500 mt-2">
          Prochain objectif : <Text className="font-medium">{PROGRESS_DATA.nextLevelGoal}</Text>
        </Text>
      </View>
      
    </View>
  );
}