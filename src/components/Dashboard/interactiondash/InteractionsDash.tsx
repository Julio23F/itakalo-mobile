import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { HeartIcon, ImageSquareIcon } from 'phosphor-react-native';

const fakeInteractions = [
  { id: '1', title: 'Annonce PS5', likes: 42  , Type:"Echange"},
  { id: '2', title: 'Chaussures Nike', likes: 30 , Type:"vente"},
  { id: '3', title: 'Laptop HP', likes: 15 , Type:"Vente"},
  { id: '4', title: 'Montre connectée', likes: 20 , Type:"Echange" },
];

export default function InteractionsDash() {
  return (
    <View className="px-3 mt-4 flex-1">
      <Text className="text-lg font-bold text-[#03233A] mb-3">
        Détails des interactions
      </Text>

      <FlatList
        data={fakeInteractions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row items-center bg-white rounded-xl p-4 mb-3 border border-gray-100 shadow-sm">
            
            <View className="w-12 h-12 rounded-xl bg-gray-200 justify-center items-center mr-4">
              <ImageSquareIcon size={20} color="#9CA3AF" weight="bold" />
            </View>

            <View className="flex-1">
              <Text className="text-[#03233A] font-semibold">{item.title}</Text>
              <Text className="text-gray-500 text-sm mt-1">{item.Type}</Text>
            </View>

            <View className="flex-row items-center">
              <HeartIcon color="#EF4444" size={20} weight="fill" />
              <Text className="text-[#EF4444] font-semibold ml-1">{item.likes}</Text>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
