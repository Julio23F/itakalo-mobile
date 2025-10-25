import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ProgressDash from './ProgressDash'
import { CardDashData } from '../../data/CardDashData'
import CardDash from './ CardDash'

export default function HomeDash() {
  return (
    <ScrollView>
       <View className=''>
          <ProgressDash />
        </View>

        <View className="flex-row flex-wrap justify-between">
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
    </ScrollView>
  )
}