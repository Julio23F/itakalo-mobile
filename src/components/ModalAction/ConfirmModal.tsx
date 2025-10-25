import React from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

interface ConfirmModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModal({
  visible,
  onConfirm,
  onCancel,
  title = 'Confirmer',
  message = 'Voulez-vous continuer ?',
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
}: ConfirmModalProps) {
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onCancel}>
      {/* Background mainty kely */}
      <TouchableWithoutFeedback onPress={onCancel}>
        <View className="flex-1 bg-black/50" />
      </TouchableWithoutFeedback>

      <View className="absolute inset-0 justify-center items-center px-6">
        <View className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
          <Text className="text-2xl font-bold mb-3 text-center">{title}</Text>
          <Text className="text-gray-700 text-center mb-6">{message}</Text>

          <View className="flex-row justify-between mt-4">
          
            <TouchableOpacity
              onPress={onCancel}
              className="flex-1 mr-2 bg-gray-200 rounded-xl py-3 items-center justify-center"
            >
              <Text className="text-gray-800 font-semibold text-base">{cancelText}</Text>
            </TouchableOpacity>

           
            <TouchableOpacity
              onPress={onConfirm}
              className="flex-1 ml-2 bg-red-500 rounded-xl py-3 items-center justify-center shadow-md"
            >
              <Text className="text-white font-semibold text-base">{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
