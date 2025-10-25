import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { HeartIcon } from 'phosphor-react-native';

const fakeInteractions = [
  { id: '1', title: 'Annonce PS5', likes: 42 },
  { id: '2', title: 'Chaussures Nike', likes: 30 },
  { id: '3', title: 'Laptop HP', likes: 15 },
  { id: '4', title: 'Montre connectée', likes: 20 },
];

export default function InteractionsDash() {
  return (
    <View className="px-3 mt-4">
      <Text className="text-lg font-bold text-[#03233A] mb-3">
        Détails des interactions
      </Text>

      <FlatList
        data={fakeInteractions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white rounded-xl p-4 mb-3 border border-gray-100 shadow-sm flex-row justify-between items-center">
            <View>
              <Text className="text-[#03233A] font-semibold">{item.title}</Text>
              <Text className="text-gray-500 text-sm mt-1">
                {item.likes} j'aime
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <HeartIcon color="#EF4444" size={20} />
              <Text style={{ color: '#EF4444', fontWeight: '600', marginLeft: 4 }}>
                {item.likes}
              </Text>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
