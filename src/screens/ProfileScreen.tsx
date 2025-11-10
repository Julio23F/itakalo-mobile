import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeftIcon,
  CaretRightIcon,
  UserIcon,
  IconProps,
  SignOutIcon,
} from 'phosphor-react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamListProfilnavigatorScreen } from '../types/Types';
import { AuthContext } from '../context/AuthContext';
import {
  mainMenuItems,
  otherMenuItems,
  MenuItemData,
} from '../data/MenuProfilData';
import ConfirmModal from '../components/ModalAction/ConfirmModal';

export type ProfilStackNavigation =
  NavigationProp<RootStackParamListProfilnavigatorScreen>;

interface MenuItemProps {
  title: string;
  icon: React.ReactElement<IconProps>;
  onPress: () => void;
  masqueArrow?: boolean;
}

const MenuItem = ({
  title,
  icon,
  onPress,
  masqueArrow = false,
}: MenuItemProps) => (
  <TouchableOpacity
    className="flex-row items-center justify-between py-4"
    onPress={onPress}
  >
    <View className="flex-row items-center">
      <View className="mr-4">{icon}</View>
      <Text className="text-base text-gray-800 font-medium">{title}</Text>
    </View>
    {!masqueArrow && <CaretRightIcon size={20} color="gray" />}
  </TouchableOpacity>
);

export default function ProfileScreen() {
  const navigation = useNavigation<ProfilStackNavigation>();
  const { user, logout } = useContext(AuthContext);
  const hasProfilimage = user?.image && user.image.length > 0;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLogout = () => {
    logout();
    setIsModalVisible(false);
  };

  const renderMenuItem = ({ item }: { item: MenuItemData }) => (
    <MenuItem
      title={item.title}
      icon={item.icon}
      onPress={() => item.onPress(navigation)}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <View className="flex-row items-center px-6 mt-4 mb-5 pb-3">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full bg-gray-100"
        >
          <ArrowLeftIcon size={24} color="black" weight="bold" />
        </TouchableOpacity>
        <Text className="text-xl font-extrabold ml-5 text-gray-900">
          Mon Profil
        </Text>
      </View>

      <ScrollView className="flex-1 px-4">
        <TouchableOpacity
          className="bg-white flex-row items-center rounded-xl w-full p-4 shadow-sm mb-6 border border-gray-100"
          onPress={() => navigation.navigate('TrueProfilUserAccess')}
        >
          {hasProfilimage ? (
            <Image
              source={{ uri: user.image }}
              className="w-16 h-16 rounded-full"
              resizeMode="cover"
            />
          ) : (
            <View className="w-16 h-16 rounded-full border-2 border-gray-200 bg-gray-100 items-center justify-center">
              <UserIcon size={30} color="gray" weight="light" />
            </View>
          )}

          <View className="flex-1 ml-4 overflow-hidden">
            <Text
              className="text-xl font-bold text-gray-800"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {user?.first_name} {user?.last_name}
            </Text>
            <Text
              className="text-base text-gray-500"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {user?.email}
            </Text>
          </View>

          <CaretRightIcon size={25} color="gray" weight="bold" />
        </TouchableOpacity>

        <View className="bg-white rounded-xl shadow-sm mb-6 border border-gray-100 p-4">
          <FlatList
            data={mainMenuItems}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>

        <Text className="text-sm font-semibold text-gray-500 mt-4 mb-2 ml-2 uppercase">
          Autres options
        </Text>

        <View className="bg-white rounded-xl shadow-sm mb-6 border border-gray-100 p-4">
          <FlatList
            data={otherMenuItems}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>

        <View className="items-center mt-8 mb-12 px-2">
          <TouchableOpacity
            className="flex-row items-center justify-center w-full max-w-sm py-3 rounded-lg bg-[#1E293B] shadow-md"
            onPress={() => setIsModalVisible(true)}
          >
            <SignOutIcon size={20} color="white" weight="bold" />
            <Text className="text-base font-bold text-white ml-3">
              SE DÉCONNECTER
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="text-base text-gray-500 font-medium text-center mb-10">Version de l'application :V0.1 (Build 03)</Text>
      </ScrollView>

      <ConfirmModal
        visible={isModalVisible}
        onConfirm={handleLogout}
        onCancel={() => setIsModalVisible(false)}
        title="Se déconnecter ?"
        message="Êtes-vous sûr de vouloir vous déconnecter de votre compte ?"
        confirmText="Oui, déconnecter"
        cancelText="Rester connecté"
      />
    </SafeAreaView>
  );
}
