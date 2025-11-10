import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { ProductDataI, ProductContext } from "../../context/ProductContext";
import { HeartIcon } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamListHomenavigatorScreen } from "../../types/Types";
import { AuthContext } from "../../context/AuthContext";
import { UserContext, UserI } from "../../context/UserContext";

interface ProductCardProps {
  item: ProductDataI;
  cardWidth: any;
}

type ProductCardNavigationProp = NativeStackNavigationProp<
  RootStackParamListHomenavigatorScreen,
  "Product"
>;

export default function ProductFullCard({ item, cardWidth }: ProductCardProps) {
  const navigation = useNavigation<ProductCardNavigationProp>();
  const { user } = useContext(AuthContext);
  const { fetchAuthorById } = useContext(UserContext);
  const { ToggleLike } = useContext(ProductContext);

  const [isLiking, setIsLiking] = useState(false);
  const [author, setAuthor] = useState<UserI | undefined>(undefined);
  const [loadingAuthor, setLoadingAuthor] = useState(true);

  const mainImageUri =
    item.images && item.images.length > 0 ? item.images[0] : null;
  const isLiked = user && item.likes.includes(user.id);
  const isSale = item.type === "SALE";

  const profileImageSource = author?.image ? { uri: author.image } : null;

  useEffect(() => {
    let isMounted = true; // Pour éviter les fuites de mémoire (setState sur un composant démonté)
    const loadAuthor = async () => {
      if (!item.author || !isMounted) {
        setLoadingAuthor(false);
        return;
      }
      try {
        const fetchedAuthor = await fetchAuthorById(item.author);
        if (isMounted) {
            setAuthor(fetchedAuthor);
        }
      } catch (error) {
          console.error("Erreur lors du chargement de l'auteur:", error);
      } finally {
        if (isMounted) {
            setLoadingAuthor(false);
        }
      }
    };
    loadAuthor();
    
    return () => {
        isMounted = false; // Cleanup
    };
  }, [item.author, fetchAuthorById]); 

  const handleLikePress = async () => {
    if (!user || isLiking) return;
    setIsLiking(true);
    await ToggleLike(item.id);
    setIsLiking(false);
  };

  const handlePressCard = () => {
    navigation.navigate("Product", { item });
  };

  return (
    <TouchableOpacity
      onPress={handlePressCard}
      activeOpacity={0.8}
      className="bg-white rounded-sm shadow-sm mb-5 overflow-hidden"
      style={{ width: cardWidth, elevation: 1 }}
    >
      
      <View className="w-full h-52 bg-gray-100 items-center justify-center">
        {mainImageUri ? (
          <Image
            source={{ uri: mainImageUri }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <Text className="text-gray-400 text-sm">Aucune image</Text>
        )}

        {!loadingAuthor && profileImageSource && (
            <View className="absolute top-4 left-4 w-10 h-10 rounded-full overflow-hidden border-2 border-white bg-white shadow-lg">
                <Image
                    source={profileImageSource}
                    className="w-full h-full"
                    resizeMode="cover"
                />
            </View>
        )}
        
        {loadingAuthor && (
             <View className="absolute top-4 left-4 w-10 h-10 rounded-full bg-gray-300 items-center justify-center border-2 border-white">
                <ActivityIndicator size="small" color="#03233A" />
            </View>
        )}

      </View>

      <View className="p-3">
        <Text
          numberOfLines={1}
          className="text-[16px] font-bold text-[#212529] mb-1"
        >
          {item.title}
        </Text>

        <Text
          numberOfLines={2}
          className="text-[13px] text-gray-500 leading-5 mb-2"
        >
          {item.description}
        </Text>

        <View className="flex-row items-center justify-between mt-1">
          <Text
            className={`text-[15px] ${
              isSale ? "text-gray-600" : "text-[#03233A]"
            }`}
          >
            {isSale ? `${item.price} Ar` : "Échange"}
          </Text>

          <TouchableOpacity
            onPress={handleLikePress}
            disabled={isLiking}
            className="flex-row items-center bg-gray-100 px-2.5 py-1 rounded-lg"
          >
            {isLiking ? (
              <ActivityIndicator size="small" color="#03233A" />
            ) : (
              <HeartIcon
                size={20}
                color={isLiked ? "#e63946" : "#212529"}
                weight={isLiked ? "fill" : "regular"}
              />
            )}
            <Text className="ml-1 text-xs text-[#212529]">
              {item.likes.length}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}