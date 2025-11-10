import React from 'react';
import {  Modal,  View,  Image,  Dimensions,  TouchableOpacity,Text, StatusBar} from 'react-native';
import Carousel from 'react-native-reanimated-carousel'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 

const { width, height } = Dimensions.get('window');

interface ImageGalleryModalProps {
  isVisible: boolean;
  onClose: () => void;
  images: string[];
  initialImageIndex: number; 
}

// Hauteur fixe (en pixels) nécessaire pour dégager le bouton et son padding
const BUTTON_CLEARANCE_HEIGHT = 50; 

const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
  isVisible,
  onClose,
  images,
  initialImageIndex,
}) => {
  const insets = useSafeAreaInsets();

  if (!isVisible || images.length === 0) return null;

  // Calcul de la hauteur disponible pour le Carrousel 
  const availableCarouselHeight = height - (insets.top + BUTTON_CLEARANCE_HEIGHT) - insets.bottom;

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose} 
    >
    {/*importan nle status bar ty */}     
   <StatusBar 
                backgroundColor={'#000000'} 
                barStyle="light-content" 
            />
      <View className="flex-1 bg-black"> 
        
        <TouchableOpacity
          onPress={onClose}
          style={{ 
            top: insets.top + 10, 
            right: insets.right + 10,
            zIndex: 100, 
          }} 
          className="absolute py-2 px-5 border border-white  rounded-xl  bg-black/50 flex-row items-center" 
        >
           <Text className="text-white text-base font-semibold">FERMER</Text>
        </TouchableOpacity>
        
       
        <View 
            style={{ 
                marginTop: insets.top + BUTTON_CLEARANCE_HEIGHT, 
                flex: 1, 
                marginBottom: insets.bottom,
            }}
            className="flex-1"
        >
            <Carousel
              loop={false}
              width={width}
              height={availableCarouselHeight} 
              defaultIndex={initialImageIndex}
              data={images}
              renderItem={({ item: imageUri }) => (
                <View className="flex-1 justify-center items-center">
                  <Image
                    source={{ uri: imageUri }}
                    style={{ width: width, height: '100%' }} 
                    resizeMode="contain" 
                  />
                </View>
              )}
            />
        </View>

      </View>
    </Modal>
  );
};

export default ImageGalleryModal;