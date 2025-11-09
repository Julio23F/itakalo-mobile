import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CubeTransparentIcon, ChatTeardropTextIcon } from 'phosphor-react-native';

interface BottomActionsBarProps {
  isTomponProduct: boolean;
  authorLoaded: boolean;
  handleARPress: () => void;
  handlePressMessage: () => void;
}

export default function BottomActionsBar({
  isTomponProduct,
  authorLoaded,
  handleARPress,
  handlePressMessage,
}: BottomActionsBarProps) {
  const canSendMessage = !isTomponProduct && authorLoaded;

  return (
    <View className="absolute bottom-0 inset-x-0 py-4 px-5 bg-white border-t border-gray-100 flex-row items-center justify-center gap-3 shadow-2xl z-50">
      
      <TouchableOpacity
        className={`flex-row items-center justify-center p-4 border rounded-lg bg-white ${
          canSendMessage ? 'w-1/2 border-gray-300' : 'flex-1 border-gray-300'
        }`}
        onPress={handleARPress}
      >
        <CubeTransparentIcon size={20} color="#03233A" weight="bold" />
        <Text className="ml-2 text-base font-bold text-gray-900">
          Voir en AR
        </Text>
      </TouchableOpacity>
      
      {canSendMessage && (
        <TouchableOpacity
          className="w-1/2 flex-row items-center justify-center p-4 bg-[#03233A] rounded-lg"
          onPress={handlePressMessage}
        >
          <ChatTeardropTextIcon size={20} color="#FEF094" weight="bold" />
          <Text className="ml-2 text-base font-bold text-white">Message</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}