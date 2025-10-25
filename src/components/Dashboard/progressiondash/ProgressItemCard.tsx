import React, { useMemo } from 'react';
import { View, Text } from 'react-native';

interface ProgressItemCardProps {
  title: string;
  initialValue: number;
  initialTotal: number;
  color: string;
  icon: React.ReactNode;
  badge?: string;
  maxTotal?: number; 
}

export default function ProgressItemCard({ title, initialValue, initialTotal, color, icon, badge, maxTotal = 1000,}: ProgressItemCardProps) {

  const total = useMemo(() => {
    let newTotal = initialTotal;
    while (initialValue >= newTotal && newTotal < maxTotal) {
      newTotal = Math.min(newTotal * 2, maxTotal);
    }
    return newTotal;
  }, [initialValue, initialTotal, maxTotal]);

  const percentage = Math.min((initialValue / total) * 100, 100);

  return (
    <View className="mb-5 bg-white p-4 rounded-2xl shadow-md border border-gray-100">
      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-row items-center gap-2">
          {icon}
          <Text className="text-gray-800 font-semibold text-base">{title}</Text>
        </View>
        {badge && (
          <View className="bg-yellow-100 px-2 py-1 rounded-full">
            <Text className="text-yellow-800 text-xs font-semibold">
              {badge}
            </Text>
          </View>
        )}
      </View>

      <View className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
        <View
          className="h-4 rounded-full"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </View>

      <View className="flex-row justify-between">
        <Text className="text-gray-600 text-sm">
          {initialValue}/{Math.round(total)}
        </Text>
        <Text className="text-gray-500 text-xs italic">
          {percentage >= 100 && total >= maxTotal
            ? 'Félicitations ! 🎉'
            : 'Continuez ainsi !'}
        </Text>
      </View>
    </View>
  );
}
