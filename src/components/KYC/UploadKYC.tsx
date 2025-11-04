import React from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { UploadSimpleIcon, XCircleIcon } from "phosphor-react-native";

interface UploadKYCProps {
  side: "front" | "back";
  imageUri: string | null;
  docType: string;
  onUpload: () => void;
  onClear: () => void;
}

const screenWidth = Dimensions.get("window").width;

export const UploadKYC: React.FC<UploadKYCProps> = ({ side, imageUri, docType, onUpload, onClear }) => {
  const sideText = side === "front" ? "Recto" : "Verso";
  const titleText = `Téléverser ${docType || "le document"} (${sideText})`;

  return (
    <TouchableOpacity
      onPress={onUpload}
      activeOpacity={0.8}
      className="border-2 border-dashed border-gray-400 rounded-2xl mb-5 items-center justify-center bg-gray-100 min-h-[180px] overflow-hidden"
    >
      {imageUri ? (
        <View>
          <Image
            source={{ uri: imageUri }}
            style={{ width: screenWidth - 48, height: 230, borderRadius: 14 }}
            resizeMode="contain"
          />
          <TouchableOpacity
            onPress={onClear}
            className="absolute top-2 right-2 p-1 rounded-full bg-white/70"
          >
            <XCircleIcon size={24} color="#D9534F" weight="fill" />
          </TouchableOpacity>
        </View>
      ) : (
        <View className="items-center justify-center py-6 px-4">
          <UploadSimpleIcon size={36} color="#03233A" weight="bold" />
          <Text className="mt-2 text-gray-700 font-bold text-center">{titleText}</Text>
          <Text className="text-xs text-gray-500 mt-1 text-center leading-4">
            Photo nette, bien éclairée, avec les 4 coins visibles. (JPG/PNG, max 5MB)
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
