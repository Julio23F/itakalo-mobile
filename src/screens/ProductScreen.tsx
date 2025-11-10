import React, { useContext, useState, useEffect } from 'react';
import { Dimensions, View, ScrollView, Linking } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ProductDataI,
  ProductSuggestionI,
  ProductContext,
} from '../context/ProductContext';
import { AuthContext } from '../context/AuthContext';
import { UserContext, UserI } from '../context/UserContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamListHomenavigatorScreen } from '../types/Types';
import ProductScreenSkeleton from '../components/Skeleton/ProductScreenSkeleton';

import ProductHeader from '../components/productScrenn/ProductHeader';
import ProductInfo from '../components/productScrenn/ProductInfo';
import ProductSuggestions from '../components/productScrenn/ProductSuggestions';
import BottomActionsBar from '../components/productScrenn/BottomActionsBar';
import AnimatedProductHeader from '../components/productScrenn/AnimatedProductHeader';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

type AppNavigationProp = NativeStackNavigationProp<
  RootStackParamListHomenavigatorScreen & {
    Chat: { conversationId: string; participant: UserI; produit: ProductDataI };
    Product: { item: ProductSuggestionI };
  }
>;

type ProductScreenRouteProp = RouteProp<
  { Product: { item: ProductDataI } },
  'Product'
>;

export default function ProductScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const route = useRoute<ProductScreenRouteProp>();

  const initialItem = route.params.item;
  const { user } = useContext(AuthContext);

  const { fetchAuthorById } = useContext(UserContext);
  const { fetchProductById, ToggleLike } = useContext(ProductContext);

  const [productData, setProductData] = useState<ProductDataI | undefined>(
    initialItem,
  );
  const [author, setAuthor] = useState<UserI | undefined>(undefined);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingAuthor, setLoadingAuthor] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  const item = productData || initialItem;

  const isTomponProduct = user?.id === item.author;
  const isLiked = !!(user && item.likes && item.likes.includes(user.id));

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      setLoadingProduct(true);
      const fullProduct = await fetchProductById(initialItem.id);

      if (isMounted && fullProduct) {
        setProductData(fullProduct);
        const authorId = fullProduct.author;
        if (authorId) {
          setLoadingAuthor(true);
          const fetchedAuthor = await fetchAuthorById(authorId);
          if (isMounted) setAuthor(fetchedAuthor);
        }
      }
      if (isMounted) {
        setLoadingAuthor(false);
        setLoadingProduct(false);
      }
    };
    loadData();
    return () => {
      isMounted = false;
    };
  }, [initialItem.id]);

  // --- Fonctions de Logique (for enfants) ---
  const handleLikePress = async () => {
    if (!user || isLiking) return;
    setIsLiking(true);

    const success = await ToggleLike(item.id);

    if (success) {
      setProductData(prev => {
        if (!prev) return prev;
        const hasLiked = prev.likes.includes(user.id);
        const updatedLikes = hasLiked
          ? prev.likes.filter(id => id !== user.id)
          : [...prev.likes, user.id];
        return { ...prev, likes: updatedLikes };
      });
    }

    setIsLiking(false);
  };
  const handleARPress = () => navigation.navigate('AR' as any);
  const handlePressMessage = () => {
    if (!author) return;
    navigation.navigate('Chat', {
      participant: author,
      produit: item,
      conversationId: '1',
    });
  };
  const handleSuggestionPress = (suggestion: ProductSuggestionI) => {
    navigation.push('Product', { item: suggestion });
  };

  const handlePhonePress = () => {
    const phoneNumber = author?.telnumber || '0342290407';
    Linking.openURL(`tel:${phoneNumber}`).catch(err =>
      console.error('Erreur ouverture tel:', err),
    );
  };

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });


  if (loadingProduct || loadingAuthor) {
    return <ProductScreenSkeleton />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">

       <AnimatedProductHeader
        itemTitle={item.title}
        isTomponProduct={isTomponProduct}
        isLiked={isLiked}
        isLiking={isLiking}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        handleLikePress={handleLikePress}
        productId={item.id}
        scrollY={scrollY} 
      />
      <AnimatedScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        
      >
        <ProductHeader
          item={item}
          isTomponProduct={isTomponProduct}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />

        <View className="">
          <ProductInfo
            item={item}
            author={author}
            showFullDescription={showFullDescription}
            setShowFullDescription={setShowFullDescription}
            handlePhonePress={handlePhonePress}
          />

          <ProductSuggestions
            suggestionProducts={item.suggestions || []}
            handleSuggestionPress={handleSuggestionPress}
          />
        </View>
      </AnimatedScrollView>

      {/*  BARRE D'ACTIONS FIXE */}
      <BottomActionsBar
        isTomponProduct={isTomponProduct}
        handleARPress={handleARPress}
        handlePressMessage={handlePressMessage}
        authorLoaded={!!author}
      />
    </SafeAreaView>
  );
}
