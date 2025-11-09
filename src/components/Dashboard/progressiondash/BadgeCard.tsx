import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { LockIcon } from 'phosphor-react-native';

interface BadgeCardProps {
  title: string;
  unlocked: boolean;
  icon: React.ReactNode;
}

export default function BadgeCard({ title, unlocked, icon }: BadgeCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={`bg-white rounded-2xl p-4 mb-3 flex-1 mr-2 ${
        unlocked
          ? 'border border-gray-200 shadow-sm'
          : 'border border-gray-300 bg-gray-100'
      }`}
      style={{ minWidth: '30%', maxWidth: '32%' }}
    >
      <View className="items-center justify-center mb-2">
        {unlocked ? icon : <LockIcon size={24} color="#9CA3AF" weight="bold" />}
      </View>
      <Text
        className={`text-center text-xs font-semibold ${
          unlocked ? 'text-gray-800' : 'text-gray-400'
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
