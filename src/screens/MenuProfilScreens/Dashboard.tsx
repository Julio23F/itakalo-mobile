import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import NavigationDash from '../../components/Dashboard/NavigationDash';
import { tabsNavigationDash } from '../../data/CardDashData';

import HomeDash from '../../components/Dashboard/HomeDash';
import InteractionsDash from '../../components/Dashboard/InteractionsDash';

export default function Dashboard() {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('home');
  const renderContent = () => {
    switch (selectedTab) {
      case 'home':
        return <HomeDash />;
      case 'interactions':
        return <InteractionsDash />;
      default:
        return (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-400">Aucun contenu</Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {/* border-b border-gray-100*/}
      <View className="flex-row items-center px-6 pt-4 pb-5  bg-white">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full bg-gray-100"
        >
          <ArrowLeftIcon size={24} color="#03233A" weight="bold" />
        </TouchableOpacity>
        <Text className="text-xl font-extrabold ml-4 text-[#03233A]">
          Tableau de bord
        </Text>
      </View>
      <View className="pt-2">
        <NavigationDash
          tabs={tabsNavigationDash}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </View>
      <View className="flex-1 px-3">{renderContent()}</View>{' '}
    </SafeAreaView>
  );
}
