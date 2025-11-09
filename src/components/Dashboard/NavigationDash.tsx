import React, { memo } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

type IconComponent = React.ComponentType<{ color?: string; size?: number }>;

interface Tab {
  value: string;
  label: string;
  icon?: IconComponent;
}

interface NavigationDashProps {
  tabs: Tab[];
  selectedTab: string;
  setSelectedTab: (value: string) => void;
  containerPaddingHorizontal?: number;
}

const NavigationDash = ({ tabs, selectedTab, setSelectedTab, containerPaddingHorizontal = 12}: NavigationDashProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: containerPaddingHorizontal }}
    >
      <View className="flex-row gap-4 items-center ">
        {tabs.map(tab => {
          const isActive = tab.value === selectedTab;
          const Icon = tab.icon;

          return (
            <TouchableOpacity
              key={tab.value}
              onPress={() => setSelectedTab(tab.value)}
              activeOpacity={0.85}
              className={`flex-row items-center px-3 py-3 rounded-full ${isActive ? 'bg-[#03233A]' : 'bg-gray-100'}`}
            >
              <View className="mr-2">
                {Icon && (<Icon color={isActive ? '#ffffff' : '#03233A'} size={16} />)}
              </View>

              <Text
                className={`text-[13px] font-medium ${isActive ? 'text-white' : 'text-[#03233A]'}`}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default memo(NavigationDash);
