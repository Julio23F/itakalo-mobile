import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { formatDateTime } from '../../utils/date';
import {
  MapPinIcon, PhoneIcon, TagIcon, HeartIcon, ClockCounterClockwiseIcon, UserIcon, HandshakeIcon,
} from 'phosphor-react-native';


import { ProductDataI } from '../../context/ProductContext'; 
import { UserI } from '../../context/UserContext'; 

const descriptionLimit = 100;


interface ProductInfoProps {
    item: ProductDataI;
    author: UserI | undefined; 
    showFullDescription: boolean;
    setShowFullDescription: React.Dispatch<React.SetStateAction<boolean>>;
    handlePhonePress: () => void;
}



const ProductInfo: React.FC<ProductInfoProps> = ({ 
    item, 
    author,
    showFullDescription, 
    setShowFullDescription, 
    handlePhonePress 
}) => {
  const isEchange = item.type === 'ECHANGE';
  const isDonation = item.type === 'DONATION';
  const isSale = item.type === 'SALE';
  const profileImageSource = author?.image ? { uri: author.image } : undefined;
  
  const toggleDescription = () => setShowFullDescription(prev => !prev);
  
  const displayedDescription = showFullDescription
    ? item.description
    : item.description?.slice(0, descriptionLimit) +
      (item.description && item.description.length > descriptionLimit ? '...' : '');

  return (
    <View
      className="-mt-8 bg-white shadow-lg p-4"
      style={{
        borderRadius: 12,
      }}
    >

      <View className="flex-row items-start justify-between py-2 mb-4">
        <View className="flex-1 gap-1 pr-3">
          <Text className="text-2xl font-bold text-gray-900" numberOfLines={2}>
            {item.title}
          </Text>

          <View className="flex-row items-center mt-2 gap-2">
            {isSale && (
              <Text className="text-xl font-semibold text-gray-600">
                {item.price} Ar
              </Text>
            )}
            {isDonation && (
              <View className="flex-row items-center bg-red-50 px-2 py-1 rounded-full">
                <HeartIcon size={16} color="#EF4444" weight="fill" />
                <Text className="ml-1 text-base font-semibold text-red-600">Gratuit</Text>
              </View>
            )}
            {isEchange && (
              <View className="flex-row items-center bg-yellow-50 px-2 py-1 rounded-full">
                <HandshakeIcon size={16} color="#F59E0B" weight="fill" />
                <Text className="ml-1 text-base font-semibold text-yellow-800">Échange</Text>
              </View>
            )}
          </View>
        </View>
        <View className="flex-row items-center bg-gray-100 px-3 py-1.5 rounded-full self-start">
          <TagIcon size={16} color="#6B7280" />
          <Text className="ml-1 text-sm font-medium text-gray-600">
            {item.category}
          </Text>
        </View>
      </View>

      {/* secondar details */}
      <View className="flex-row flex-wrap items-center gap-3 mb-6 border-y border-gray-100 py-4">
         <View className="flex-row items-center px-3 py-1.5 bg-gray-100 rounded-full">
              <MapPinIcon size={16} color="#4b5563" weight="bold" />
              <Text className="ml-2 text-sm font-medium text-gray-700" numberOfLines={1}>
                {item.adresse}
              </Text>
            </View>
            <View className="flex-row items-center px-3 py-1.5 bg-gray-100 rounded-full">
              <ClockCounterClockwiseIcon size={16} color="#4b5563" weight="bold" />
              <Text className="ml-2 text-sm font-medium text-gray-700">
                Publié le {formatDateTime(item.created_at)}
              </Text>
            </View>
            <View className="flex-row items-center px-3 py-1 bg-red-50 rounded-full border border-red-200">
              <HeartIcon size={16} color="#EF4444" weight="fill" />
              <Text className="ml-2 text-sm font-bold text-red-600">
                {item.likes.length} J'aime
              </Text>
            </View>
      </View>

      {/* author info */}
      {author && (
        <View className="flex-row items-center p-3 mb-6 bg-white border border-gray-200 rounded-xl shadow-sm">
          {profileImageSource ? (
            <Image source={profileImageSource} className="mr-3 border-2 border-white rounded-full w-12 h-12" />
          ) : (
            <View className="items-center justify-center mr-3 bg-gray-300 border-2 border-white rounded-full w-12 h-12">
              <UserIcon size={24} color="white" weight="bold" />
            </View>
          )}
          <View className="flex-1">
            <Text className="text-base font-bold text-gray-800">{author.first_name}</Text>
            <Text className="text-sm text-gray-500" numberOfLines={1}>{author.email}</Text>
          </View>
          <TouchableOpacity onPress={handlePhonePress} className="p-3 bg-gray-100 rounded-full">
            <PhoneIcon size={20} color="#000" weight="bold" />
          </TouchableOpacity>
        </View>
      )}

      {/* description */}
      <View className="mb-6">
        <Text className="mb-3 text-xl font-bold text-gray-800">Description</Text>
        <Text className="leading-6 text-gray-600">{displayedDescription}</Text>
        {item.description && item.description.length > descriptionLimit && (
          <TouchableOpacity onPress={toggleDescription}>
            <Text className="mt-1 font-semibold text-blue-600">
              {showFullDescription ? 'Voir moins' : 'Voir plus'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* recherché EN ÉCHANGE */}
      {isEchange && item.mots_cles_recherches && item.mots_cles_recherches.length > 0 && (
        <View className="mb-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
          <View className="flex-row items-center mb-4">
            <HandshakeIcon size={24} color="#F59E0B" weight="fill" />
            <Text className="ml-3 text-xl font-extrabold text-gray-900">Recherché en échange</Text>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {item.mots_cles_recherches.map((keyword, index) => (
              <View key={index} className="px-3 py-1 bg-yellow-100 rounded-full">
                <Text className="text-sm font-semibold text-yellow-800 tracking-wide">
                  {keyword}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default ProductInfo;