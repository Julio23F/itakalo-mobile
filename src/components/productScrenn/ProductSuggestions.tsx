import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import SuggestionCard from './SuggestionCard'; 

import { ProductSuggestionI } from '../../context/ProductContext'; 

interface ProductSuggestionsProps {
    suggestionProducts: ProductSuggestionI[];
    handleSuggestionPress: (suggestion: ProductSuggestionI) => void;
}

const ProductSuggestions: React.FC<ProductSuggestionsProps> = ({ suggestionProducts, handleSuggestionPress }) => {
  if (suggestionProducts.length === 0) return null;

  return (
    <View className="p-4 pt-8 bg-white">
      <Text className="mb-4 text-2xl font-extrabold text-gray-900">
        Suggestions pour vous
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 16, paddingHorizontal: 2 }}
      >
        {suggestionProducts.map(suggestion => (
          <SuggestionCard
            key={suggestion.id}
            suggestion={suggestion}
            onPress={handleSuggestionPress}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default ProductSuggestions;