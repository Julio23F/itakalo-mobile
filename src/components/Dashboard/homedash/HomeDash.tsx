import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import ProgressDash from './ProgressDash'
import { CardDashData } from '../../../data/CardDashData'
import CardDash from './ CardDash' 
import SellerTips from './SellerTips'
import RecentListings from './RecentListings'




export default function HomeDash() {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}> 
        <ProgressDash />
        
        <View className="flex-row flex-wrap justify-between px-3 mt-3">
          {CardDashData.map(data => (
            <CardDash
              key={data.key}
              title={data.title}
              value={data.value}
              icon={data.icon}
              color={data.color}
            />
          ))}
        </View>
        
        {/* liste annonce recents */}
        <RecentListings />
        
        {/*Conseils  (Aide/Tutoriel)*/}
        <SellerTips />
        
    </ScrollView>
  )
}