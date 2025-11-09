import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { UserIcon, HandshakeIcon } from 'phosphor-react-native';
import { ProductSuggestionI } from '../../context/ProductContext'; 

interface SuggestionCardProps {
    suggestion: ProductSuggestionI;
    onPress: (suggestion: ProductSuggestionI) => void;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ suggestion, onPress }) => {
  const izyAtakalo = suggestion.type === 'ECHANGE';
  const izyOmena = suggestion.type === 'DONATION';
  const izyAmidy = suggestion.type === 'SALE';
  const firstImage = suggestion.images?.[0];
  const authorProfileImage = suggestion.author_image ? { uri: suggestion.author_image } : undefined;

  return (
    <TouchableOpacity
      className="w-44 h-64 bg-white shadow-lg overflow-hidden rounded-md"
      onPress={() => onPress(suggestion)}
    >
      <ImageBackground
        source={{ uri: firstImage }}
        className="w-full relative h-full"
        resizeMode="cover"
      >
        <View className="absolute inset-0 bg-black opacity-30"></View>

        <View className="absolute top-3 right-3 z-20 p-1 bg-white rounded-full shadow-md">
          {authorProfileImage ? (
            <Image
              source={authorProfileImage}
              className="w-8 h-8 rounded-full border border-gray-100"
              resizeMode="cover"
            />
          ) : (
            <View className="items-center justify-center w-8 h-8 bg-gray-300 rounded-full border border-gray-100">
              <UserIcon size={16} color="white" weight="bold" />
            </View>
          )}
        </View>

        <View className="p-3 flex-1 justify-end absolute bottom-0 inset-x-0">
          <View className="mb-2 flex-row justify-between items-center">
            <View className="flex-1 pr-1">
              <Text className="text-base font-extrabold text-white shadow-md" numberOfLines={2}>
                {suggestion.title}
              </Text>
              <Text className="text-xs font-medium text-gray-200">{suggestion.category}</Text>
            </View>
            
            <View>
              {izyAtakalo && (
                <View className="flex-row items-center self-end bg-yellow-50 px-2 py-1 rounded-lg">
                  <HandshakeIcon size={17} color="#F59E0B" weight="fill" />
                </View>
              )}
              {izyAmidy && (
                <View className="flex-row items-center self-end bg-white px-2 py-1 rounded-lg">
                  <Text className="text-sm font-bold text-gray-800">{suggestion.price} Ar</Text>
                </View>
              )}
              {izyOmena && (
                <View className="flex-row items-center self-end bg-red-50 px-2 py-1 rounded-lg">
                  <Text className="text-sm font-bold text-red-600">GRATUIT</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

export default SuggestionCard;