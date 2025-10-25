import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { ArrowRightIcon, PencilSimpleIcon } from 'phosphor-react-native';

const RECENT_LISTINGS_DATA = [
    { id: '1', title: 'Annonce PS5 (en ligne)', time: 'il y a 2h',},
    { id: '2', title: 'Veste en cuir', time: 'il y a 1 jour',},
    { id: '3', title: 'Livre de cuisine vegan', time: 'il y a 4 jours',},
];

const ListingItem = ({ title, time, isLast }) => (
    <View 
        className={`flex-row items-center justify-between py-2 ${
            !isLast ? 'border-b border-gray-100' : ''
        }`}
    >
        <View className="flex-row items-center flex-1">
            <PencilSimpleIcon size={20} color="#03233A" weight="light" />
            <Text 
                className="text-gray-700 font-medium ml-3" 
                numberOfLines={1}
                ellipsizeMode="tail"
            >
                {title}
            </Text>
        </View>
        <Text className="text-gray-500 text-sm">{time}</Text>
    </View>
);

export default function RecentListings() {
    return (
        <View className="p-4 bg-white rounded-xl shadow-md mx-3 mt-4">
            <Text className="text-lg font-bold text-[#03233A] mb-3">
                Vos Dernières Publications
            </Text>
            
            <FlatList
                data={RECENT_LISTINGS_DATA}
                keyExtractor={(item) => item.id}
                scrollEnabled={false} 
                renderItem={({ item, index }) => (
                    <ListingItem 
                        title={item.title} 
                        time={item.time}
                        isLast={index === RECENT_LISTINGS_DATA.length - 1}
                    />
                )}
            />
            <TouchableOpacity className="mt-3 flex-row justify-between items-center py-2">
                <Text className="text-sm font-semibold text-[#00A9FF]">
                    Gérer toutes les annonces
                </Text>
                <ArrowRightIcon size={16} color="#00A9FF" />
            </TouchableOpacity>
        </View>
    );
}