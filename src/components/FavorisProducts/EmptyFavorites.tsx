import { View, Text } from 'react-native';
import React from 'react';
import { HeartIcon } from 'phosphor-react-native';

export default function EmptyFavorites() {
  return (
    <View className="flex-1 justify-center items-center p-8 mt-10">
      <HeartIcon size={64} color="#C4C4C4" weight="light" />
      <Text className="text-xl font-bold mt-5 text-gray-700">
        Aucun article favori pour l'instant
      </Text>
      <Text className="text-center text-gray-500 mt-2">
        Explorez les annonces et appuyez sur l'icône de cœur pour ajouter des
        produits à votre liste.
      </Text>
    </View>
  );
}
