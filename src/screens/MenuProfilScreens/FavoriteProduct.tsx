import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import React, { useContext, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon, HeartIcon } from 'phosphor-react-native';
import { ProfilStackNavigation } from '../ProfileScreen';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import AnnoncesByUser from '../../components/AnnoncesByUser';
import { ProductContext } from '../../context/ProductContext';
import EmptyFavorites from '../../components/FavorisProducts/EmptyFavorites';

export default function FavoriteProduct() {
  const navigation = useNavigation<ProfilStackNavigation>();
  const { user } = useContext(AuthContext);

/*   eto mila sologna */  
const { allProducts } = useContext(ProductContext);

  const userallProducts = allProducts.filter(
    product => product.author === user?.id,
  );
  const Nbpub = userallProducts.length;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <View className="flex-row items-center px-6 pt-4 pb-5 border-b border-gray-100 bg-white">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full bg-gray-100"
        >
          <ArrowLeftIcon size={24} color="#03233A" weight="bold" />
        </TouchableOpacity>
        <Text className="text-xl font-extrabold ml-4 text-[#03233A]">
          Mes favoris
        </Text>
      </View>

      <View className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <Text className="text-base text-gray-700 font-semibold">
          <Text className="text-xl font-extrabold text-[#03233A]">{Nbpub}</Text>{' '}
          Article{Nbpub > 1 ? 's' : ''} favoris{Nbpub > 1 ? 's' : ''}
        </Text>
      </View>

      {Nbpub > 0 ? (
        <AnnoncesByUser userallProducts={userallProducts} />   
/*         nle props eto fogna sologna
 */      ) : (
        <EmptyFavorites />
      )}
    </SafeAreaView>
  );
}
