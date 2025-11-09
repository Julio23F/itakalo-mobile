import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { StarIcon, GiftIcon, TagIcon, TrophyIcon, HandshakeIcon } from 'phosphor-react-native';
import ProgressItemCard from './ProgressItemCard';
import BadgeCard from './BadgeCard';

// Progression principale
const progressData = [
  { title: 'Ventes réalisées', value: 35, total: 10, color: '#10B981', icon: <TagIcon size={20} color="#10B981" weight="bold" />, badge: 'Pro du commerce' },
  { title: 'Échanges terminés', value: 20, total: 20, color: '#F59E0B', icon: <HandshakeIcon size={20} color="#F59E0B" weight="bold" />, badge: 'Échangeur expert' },
  { title: 'Dons effectués', value: 18, total: 25, color: '#EF4444', icon: <GiftIcon size={20} color="#EF4444" weight="bold" />, badge: 'Généreux' },
];

// badges
const badgesCollection = [
  { title: 'Pro du commerce', type: 'vente', unlocked: true, icon: <TagIcon size={24} color="#10B981" weight="bold" /> },
  { title: 'Top annonceur', type: 'vente', unlocked: true, icon: <TagIcon size={24} color="#34D399" weight="bold" /> },
  { title: 'Échangeur expert', type: 'echange', unlocked: true, icon: <HandshakeIcon size={24} color="#F59E0B" weight="bold" /> },
  { title: 'Maître échangeur', type: 'echange', unlocked: true, icon: <StarIcon size={24} color="#FBBF24" weight="bold" /> },
  { title: 'Généreux', type: 'don', unlocked: true, icon: <GiftIcon size={24} color="#EF4444" weight="bold" /> },
  { title: 'Philanthrope', type: 'don', unlocked: true, icon: <TrophyIcon size={24} color="#F87171" weight="bold" /> },
  { title: 'Actif sur l’app', type: 'app', unlocked: false, icon: <StarIcon size={24} color="#60A5FA" weight="bold" /> },
  { title: 'Créateur de pub', type: 'app', unlocked: true, icon: <TagIcon size={24} color="#A78BFA" weight="bold" /> },
  { title: 'Découverte quotidienne', type: 'app', unlocked: true, icon: <GiftIcon size={24} color="#F472B6" weight="bold" /> },
];

export default function ProgressionDash() {
  return (
    <ScrollView className="px-3 pt-3 mb-6">
      {progressData.map((item, index) => (
        <ProgressItemCard
          key={index}
          title={item.title}
          initialValue={item.value}
          initialTotal={item.total}
          color={item.color}
          icon={item.icon}
          badge={item.badge}
          maxTotal={1000} // maximum pour félicitation
        />
      ))}

      <View className="mt-4">
        <Text className="text-gray-800 font-semibold text-base mb-3">Badges à collectionner</Text>
        <View className="flex-row flex-wrap justify-between">
          {badgesCollection.map((badge, idx) => (
            <BadgeCard
              key={idx}
              title={badge.title}
              unlocked={badge.unlocked}
              icon={badge.icon}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
