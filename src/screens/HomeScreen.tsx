import React, { useContext, useState, useCallback, useMemo } from 'react';
import {
  StatusBar,
  RefreshControl,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { ProductContext } from '../context/ProductContext';
import { useProductLayout } from '../hooks/useProductLayout';
import ProductListHeader from '../components/products/ProductListHeader';
import ProductListFooter from '../components/products/ProductListFooter';
import ProductRowItem from '../components/products/ProductRowItem';
import FilterModalForm from '../components/FilterModalForm';
import NetworkToast from '../components/Network/NetworkToast';
import { useScroll } from '../context/ScrollContext';
import { runOnJS, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

export default function HomeScreen() {
  const {
    allProducts,
    fetchFilteredProductsDonation,
    echangeProducts,
    loading,
    loadingMore,
    hasMore,
    fetchProducts,
    fetchMoreProducts,
  } = useContext(ProductContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [isselectfilterDonation, setIsSelectfilterDonation] =useState<string>('all');
  const [refreshing, setRefreshing] = useState(false);
     const { setIsTabVisible } = useScroll();

  /*  const [testStatus, setTestStatus] = useState<boolean | undefined>(undefined); */

  // Hook personnalisé pour la logique de layout
  const { getRowType, getMarginTop, shouldShowPourVous } = useProductLayout();

  // Callbacks optimisés
  const handleApplyFilters = useCallback((filters: any) => {
    console.log('Filtres vente reçus par HomeScren:', filters);
  }, []);

  const handleApplyFiltersBarDonation = useCallback(
    (filters: any) => {
      console.log('Filtres de donation reçus par HomeScren:', filters);
      setIsSelectfilterDonation(filters.category);
      fetchFilteredProductsDonation(filters);
    },
    [fetchFilteredProductsDonation],
  );





/*   animation de dispation nle customtabbar*/  

  const scrollY = useSharedValue(0);
  const lastScrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentY = event.contentOffset.y;

      if (currentY > lastScrollY.value + 5) {
        runOnJS(setIsTabVisible)(false);
      } else if (currentY < lastScrollY.value - 5) {
        runOnJS(setIsTabVisible)(true);
      }

      lastScrollY.value = currentY;
      scrollY.value = currentY;
    },
  });


  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  }, [fetchProducts]);

  const handleFilterPress = useCallback(() => {
    setModalVisible(true);
  }, []);

  // Header mémoïsé
  const ListHeaderComponent = useMemo(
    () => (
      <ProductListHeader
        loading={loading}
        echangeProducts={echangeProducts}
        isselectfilterDonation={isselectfilterDonation}
        onFilterPress={handleFilterPress}
        onApplyFiltersBarDonation={handleApplyFiltersBarDonation}
      />
    ),
    [
      loading,
      echangeProducts,
      isselectfilterDonation,
      handleApplyFiltersBarDonation,
    ],
  );

  // Footer mémoïsé
  const ListFooterComponent = useMemo(
    () => (
      <ProductListFooter
        loadingMore={loadingMore}
        hasMore={hasMore}
        productsCount={allProducts.length}
      />
    ),
    [loadingMore, hasMore, allProducts.length],
  );

  // Render item optimisé
  const renderItem = useCallback(
    ({ item, index }) => {
      const type = getRowType(index);
      const marginTop = getMarginTop(index);
      const showPourVous = shouldShowPourVous(index);

      return (
        <ProductRowItem
          item={item}
          index={index}
          allProducts={allProducts}
          type={type}
          marginTop={marginTop}
          showPourVous={showPourVous}
        />
      );
    },
    [allProducts, getRowType, getMarginTop, shouldShowPourVous],
  );

  return (
    <SafeAreaView className="flex-1 bg-white font-jakarta">
      <StatusBar hidden={false} translucent backgroundColor="transparent" />
      {/*  <View className="absolute top-16 right-4 z-50">
        <TouchableOpacity
          onPress={() =>
            setTestStatus((prev) => (prev === false ? true : !prev))
          }
          className="bg-blue-500 px-4 py-2 rounded-full shadow-md"
        >
          <Text className="text-white font-semibold text-sm">
            {testStatus === false
              ? "Simuler connexion rétablie"
              : "Simuler hors connexion"}
          </Text>
        </TouchableOpacity>
      </View>
       <NetworkToast forceStatus={testStatus} />  */}
      <FlashList
        data={allProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        estimatedItemSize={250}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        onEndReached={() => {
          if (!loadingMore && hasMore) {
            fetchMoreProducts();
          }
        }}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#03233A']}
          />
        }
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        windowSize={5}
      />

      <FilterModalForm
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onApplyFilters={handleApplyFilters}
      />
    </SafeAreaView>
  );
}
