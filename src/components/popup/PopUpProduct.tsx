import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { PencilSimpleLineIcon, CheckCircleIcon, ShareNetworkIcon, TrashIcon } from 'phosphor-react-native';
import { ProductContext } from '../../context/ProductContext';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ConfirmModal from '../ModalAction/ConfirmModal';
import { RootStackParamListMainNavigatorTab } from '../../types/Types';

interface PopUpProductProps {
  setShowPopup: (val: boolean) => void;
  productId: number;
}

export default function PopUpProduct({ setShowPopup, productId }: PopUpProductProps) {

  const { deleteProduct } = useContext(ProductContext);
  const navigation = useNavigation<NavigationProp<RootStackParamListMainNavigatorTab>>();
  const [confirmVisible, setConfirmVisible] = useState(false);
const [loadingDelete, setLoadingDelete] = useState(false);

const handleDelete = () => {
  setConfirmVisible(true);
};

const handleConfirmDelete = async () => {
  setLoadingDelete(true);
  const success = await deleteProduct(productId);
  setLoadingDelete(false);

  if (success) {
    setShowPopup(false);
    setConfirmVisible(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Accueil', params: { screen: 'AccueilMain' } }],
    });
  }
};

  const actions = [
    {
      title: 'Modifier',
      icon: <PencilSimpleLineIcon size={20} color="#4B5563" weight="bold" />,
      onPress: () => setShowPopup(false),
      textClass: 'text-gray-700',
    },
    {
      title: 'Partager',
      icon: <ShareNetworkIcon size={20} color="#4B5563" weight="bold" />,
      onPress: () => setShowPopup(false),
      textClass: 'text-gray-700',
    },
    {
      title: 'Marquer comme vendu',
      icon: <CheckCircleIcon size={20} color="#10B981" weight="bold" />,
      onPress: () => console.log('Marquer comme vendu'),
      textClass: 'text-green-600',
    },
    {
      title: 'Supprimer',
      icon: <TrashIcon size={20} color="#EF4444" weight="bold" />,
      onPress: handleDelete,
      textClass: 'text-red-500',
    },
  ];

  return (
    <View className="absolute right-5 top-14 bg-white rounded-xl shadow-lg py-2 z-30 w-44 border border-gray-200">
      {actions.map((action, index) => (
        <TouchableOpacity
          key={index}
          className={`flex-row items-center px-4 py-2 rounded-lg`}
          onPress={action.onPress}
        >
          {action.icon}
          <Text className={`ml-3 font-medium text-sm ${action.textClass}`}>{action.title}</Text>
        </TouchableOpacity>
      ))}

    <ConfirmModal
  visible={confirmVisible}
  onCancel={() => setConfirmVisible(false)}
  onConfirm={handleConfirmDelete}
  title="Supprimer le produit"
  message="Voulez-vous vraiment supprimer ce produit ?"
  confirmText={loadingDelete ? "Suppression..." : "Supprimer"}
  cancelText="Annuler"
/>

    </View>
  );
}
