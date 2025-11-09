import { View, Text, FlatList, Dimensions } from 'react-native';
import React from 'react';
import ProductCard from './products/ProductCard';
import { ProductDataI } from '../context/ProductContext';

interface AnnoncesByUserProps {
  userallProducts: ProductDataI[];
}

const { width } = Dimensions.get('window');
const GAP = 9;

export default function AnnoncesByUser({
  userallProducts,
}: AnnoncesByUserProps) {
  const cardWidth = (width - GAP * 2.7) / 2; 

  return (
    <View className="flex-1 bg-white">
      {userallProducts.length > 0 ? (
        <FlatList
          data={userallProducts}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard cardWidth={cardWidth} item={item} />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: GAP,
            paddingHorizontal: GAP,
          }}
          contentContainerStyle={{ paddingVertical: GAP }}
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500 text-lg">
            Vous n'avez pas encore publié d'annonces.
          </Text>
        </View>
      )}
    </View>
  );
}
