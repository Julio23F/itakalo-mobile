import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, ScrollView, Alert,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon, CaretDownIcon } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { UploadKYC } from '../../components/KYC/UploadKYC';
export const KYCVerificationScreen: React.FC = () => {


  const navigation = useNavigation();
  const [docType, setDocType] = useState<string>('');
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);

  const handleImagePicker = (side: 'front' | 'back') => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, response => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Erreur', "Impossible d'ouvrir la galerie.");
        return;
      }
      const uri = response.assets?.[0]?.uri;
      if (uri) side === 'front' ? setFrontImage(uri) : setBackImage(uri);
    });
  };

  const handleClear = (side: 'front' | 'back') => {
    side === 'front' ? setFrontImage(null) : setBackImage(null);
  };

  const handleSubmit = () => {
    if (!docType) {
      Alert.alert('Attention', 'Veuillez choisir le type de document.');
      return;
    }
    if (!frontImage || !backImage) {
      Alert.alert(
        'Attention',
        'Veuillez téléverser les deux faces du document.',
      );
      return;
    }

    Alert.alert(
      'Soumission réussie ',
      `Votre ${docType} a été soumis pour vérification. Vous recevrez une réponse sous 24 heures.`,
    );
  };

  const isFormValid = docType && frontImage && backImage;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <View className="flex-row items-center px-6 mt-4 mb-5">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full bg-gray-100"
        >
          <ArrowLeftIcon size={24} color="#03233A" weight="bold" />
        </TouchableOpacity>
        <Text className="text-xl font-extrabold ml-5 text-[#03233A]">
          Vérification d’identité (KYC)
        </Text>
      </View>

      <ScrollView
        className="px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text className="text-base text-gray-700 mb-5 leading-6">
          Pour la sécurité de tous, nous avons besoin de vérifier votre
          identité. Veuillez téléverser un document officiel valide (CIN,
          passeport, etc.).
        </Text>

        <Text className="text-gray-700 font-bold mb-2">
          1. Type de document :
        </Text>
        <View className="bg-gray-50 rounded-3xl mb-6 shadow-sm border border-gray-200 overflow-hidden">
          <View className="flex-row items-center px-4 py-2">
            <Picker
              selectedValue={docType}
              onValueChange={value => setDocType(value)}
              style={{
                flex: 1,
                color: '#03233A',
                height: 50,
              }}
            >
              <Picker.Item
                label="-- Sélectionnez un type de document --"
                value=""
                color="#9ca3af"
              />
              <Picker.Item
                label="Carte d'identité nationale (CIN)"
                value="CIN"
              />
              <Picker.Item label="Passeport" value="Passeport" />
              <Picker.Item
                label="Permis de conduire"
                value="Permis de conduire"
              />
              <Picker.Item
                label="Carte d’étudiant / professionnelle"
                value="Autre"
              />
            </Picker>

            <CaretDownIcon size={20} color="#9ca3af" weight="bold" />
          </View>
        </View>

        {/* Recto */}
        <Text className="text-gray-700 font-bold mb-2 mt-4">
          2. Téléversement du Recto :
        </Text>
        <UploadKYC
          side="front"
          docType={docType}
          imageUri={frontImage}
          onUpload={() => handleImagePicker('front')}
          onClear={() => handleClear('front')}
        />

        {/* Verso */}
        <Text className="text-gray-700 font-bold mb-2">
          3. Téléversement du Verso :
        </Text>
        <UploadKYC
          side="back"
          docType={docType}
          imageUri={backImage}
          onUpload={() => handleImagePicker('back')}
          onClear={() => handleClear('back')}
        />

        <Text className="text-xs text-gray-500 mt-2 mb-6 text-center italic">
          Vos documents sont chiffrés et sécurisés. Ils sont utilisés uniquement
          à des fins de vérification et traités conformément à notre Politique
          de Confidentialité.
        </Text>

        <TouchableOpacity
          disabled={!isFormValid}
          className={`py-4 rounded-2xl items-center shadow-md ${isFormValid ? 'bg-[#03233A]' : 'bg-gray-300'}`}
          onPress={handleSubmit}
        >
          <Text
            className={`text-lg font-bold ${isFormValid ? 'text-white' : 'text-gray-500'}`}
          >
            {isFormValid ? 'Soumettre ma vérification' : 'Complétez les 3 étapes ci-dessus'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
