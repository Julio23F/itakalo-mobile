import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import { ImageSquareIcon} from 'phosphor-react-native';
import Carousel from 'react-native-reanimated-carousel';


import { ProductDataI } from '../../context/ProductContext';

const { width } = Dimensions.get('window');


interface ProductHeaderProps {
  item: ProductDataI;
  isTomponProduct: boolean; 
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onImagePress: (index: number) => void;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ item, activeIndex, setActiveIndex, onImagePress}) => {
  
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
           <TouchableOpacity 
                key={index} 
                className="w-full h-full" 
                activeOpacity={1}
                onPress={() => onImagePress(index)}
              >
                <Image
                  source={{ uri: imageUri }}
                  style={{ width: width, height: '100%' }}
                  resizeMode="cover"
                  className="rounded-b-3xl"
                />
              </TouchableOpacity>
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
      
    </View>
  );
};
export default ProductHeader;