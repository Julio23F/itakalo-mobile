import React from 'react';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator,} from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, interpolate} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon, DotsThreeIcon, HeartIcon } from 'phosphor-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 

import PopUpProduct from '../popup/PopUpProduct';

interface AnimatedProductHeaderProps {
  itemTitle: string;
  isTomponProduct: boolean;
  isLiked: boolean;
  isLiking: boolean;
  showPopup: boolean;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  handleLikePress: () => Promise<void>;
  productId: number;
  scrollY: SharedValue<number>; 
}

// Constantes pour la hauteur et la transition
const HEADER_COLLAPSE_POINT = 300; 
const HEADER_CONTENT_HEIGHT = 60; 

const AnimatedProductHeader: React.FC<AnimatedProductHeaderProps> = ({
  itemTitle,
  isTomponProduct,
  isLiked,
  isLiking,
  showPopup,
  setShowPopup,
  handleLikePress,
  productId,
  scrollY,
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  
  // 1. Style Animé du background du Header (change seulement le backgroundColor)
  const animatedBgStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [HEADER_COLLAPSE_POINT - 100, HEADER_COLLAPSE_POINT],
      [0, 1],
      'clamp',
    );
    // Utilisation d'une couleur de fond semi-transparente pour le début, puis blanche
    const headerBgColor = `rgba(255, 255, 255, ${opacity})`;

    return {
      backgroundColor: headerBgColor,
    };
  });

  // 2. Style Animé du Titre (change seulement l'opacité)
  const animatedTitleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [HEADER_COLLAPSE_POINT - 100, HEADER_COLLAPSE_POINT],
      [0, 1],
      'clamp',
    );
    return { opacity: opacity };
  });

  return (
    <Animated.View
      style={[
        styles.stickyHeader,
        animatedBgStyle, 
        { height: HEADER_CONTENT_HEIGHT + insets.top }, 
      ]}
      className="absolute z-20 top-0 left-0 right-0 border-b border-gray-200/0"
    >
      <View style={[styles.contentContainer, { paddingTop: insets.top }]}>
        
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-3 rounded-full shadow"
          style={{ backgroundColor: 'rgba(243, 244, 246, 0.7)' }}
        >
          <ArrowLeftIcon size={24} color="black" weight="bold" />
        </TouchableOpacity>

        {/* Titre qui apparaît au scroll */}
        <Animated.Text
          numberOfLines={1}
          style={animatedTitleStyle}
          className="flex-1 mx-4 text-lg font-bold text-center text-[#212529]"
        >
          {itemTitle}
        </Animated.Text>

        {/* btn de droite (Like/Options) */}
        <View className="flex-row items-center space-x-2">
          {isTomponProduct ? (
            <View className="relative"> 
              <TouchableOpacity
                className="p-1 rounded-full"
                onPress={() => setShowPopup(!showPopup)}
              >
                <DotsThreeIcon size={24} color="black" weight="bold" />
              </TouchableOpacity>
              {showPopup && (
                <PopUpProduct setShowPopup={setShowPopup} productId={productId} />
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
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden', 
    
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
});

export default AnimatedProductHeader;