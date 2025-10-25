import React, { JSX, memo } from 'react';
import { View, Text, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface CardDashProps {
  title: string;
  value: string | number;
  icon: JSX.Element;
  color: string;
  fullWidth?: boolean;
}

const CardDash = ({ title, value, icon, color, fullWidth }: CardDashProps) => {
  const cardWidth = fullWidth ? '100%' : width > 350 ? '49%' : '100%';

  return (
    <View
      className="flex-row items-center justify-between bg-white rounded-2xl px-5 py-4 mb-4"
      style={{
        width: cardWidth,
        borderWidth: 1,
        borderColor: '#E5E7EB',
      }}
    >
      <View className="flex-1 mr-3">
        <Text
          className="text-2xl font-extrabold text-[#03233A]"
          numberOfLines={1}
        >
          {value}
        </Text>
        <Text
          className="text-sm text-gray-500 font-medium mt-1"
          numberOfLines={2}
        >
          {title}
        </Text>
      </View>

      <View
        className="p-3 rounded-2xl justify-center items-center"
        style={{ backgroundColor: `${color}15` }}
      >
        {icon}
      </View>
    </View>
  );
};

export default memo(CardDash);
