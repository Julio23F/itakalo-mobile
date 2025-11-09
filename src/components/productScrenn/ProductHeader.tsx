import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {
  ArrowLeftIcon,
  HeartIcon,
  DotsThreeIcon,
  ImageSquareIcon,
} from 'phosphor-react-native';
import Carousel from 'react-native-reanimated-carousel';
import PopUpProduct from '../popup/PopUpProduct';

import { ProductDataI } from '../../context/ProductContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamListHomenavigatorScreen } from '../../types/Types';

const { width } = Dimensions.get('window');

type HeaderNavigationProp =
  NativeStackNavigationProp<RootStackParamListHomenavigatorScreen>;

interface ProductHeaderProps {
  item: ProductDataI;
  isTomponProduct: boolean;
  isLiked: boolean;
  isLiking: boolean;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  showPopup: boolean;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  handleLikePress: () => Promise<void>;
  navigation: HeaderNavigationProp | any;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  item,
  isTomponProduct,
  isLiked,
  isLiking,
  activeIndex,
  setActiveIndex,
  showPopup,
  setShowPopup,
  handleLikePress,
  navigation,
}) => {
  const heroItems = item.images || [];
  const hasImages = heroItems.length > 0;

  return (
    <View className="w-full h-[400px] relative">
      {hasImages ? (
        <View className="w-full h-full">
          <Carousel
            loop
            width={width}
            height={400}
            autoPlay
            autoPlayInterval={4000}
            data={heroItems}
            onSnapToItem={setActiveIndex}
            /*mode='parallax'*/
            renderItem={({ item: imageUri, index }) => (
              <Image
                key={index}
                source={{ uri: imageUri }}
                style={{ width: width, height: '100%' }}
                resizeMode="cover"
                className="rounded-b-3xl"
              />
            )}
          />

          {/* Pagination */}
          {heroItems.length > 1 && (
            <View className="absolute bottom-5 w-full flex-row justify-center space-x-2">
              {heroItems.map((_, index) => (
                <View
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === activeIndex ? 'bg-white' : 'bg-gray-400/50'
                  }`}
                />
              ))}
            </View>
          )}
        </View>
      ) : (
        <View className="items-center justify-center w-full h-full bg-gray-200 rounded-b-3xl">
          <ImageSquareIcon size={50} color="#6B7280" weight="light" />
          <Text className="mt-2 text-gray-500 text-sm">
            Aucune photo disponible
          </Text>
        </View>
      )}

      {/* btn  (Retour, Like/pop up ) */}
      <View className="absolute z-10 flex-row items-center justify-between top-6 left-4 right-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-3 rounded-full shadow"
          style={{ backgroundColor: 'rgba(243, 244, 246, 0.7)' }}
        >
          <ArrowLeftIcon size={24} color="black" weight="bold" />
        </TouchableOpacity>

        <View className="flex-row items-center space-x-2">
          {isTomponProduct ? (
            <View className="relative">
              <TouchableOpacity
                className="p-3 rounded-full shadow"
                style={{ backgroundColor: 'rgba(243, 244, 246, 0.7)' }}
                onPress={() => setShowPopup(!showPopup)}
              >
                <DotsThreeIcon size={24} color="black" weight="bold" />
              </TouchableOpacity>
              {showPopup && (
                <PopUpProduct setShowPopup={setShowPopup} productId={item.id} />
              )}
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleLikePress}
              disabled={isLiking}
              className="p-3 rounded-full shadow"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
            >
              {isLiking ? (
                <ActivityIndicator size="small" color="#03233A" />
              ) : (
                <HeartIcon
                  color={isLiked ? 'red' : '#03233A'}
                  weight={isLiked ? 'fill' : 'regular'}
                  size={24}
                />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default ProductHeader;
