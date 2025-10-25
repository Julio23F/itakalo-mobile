import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import {
  HouseIcon,
  ChatIcon,
  BellIcon,
  UserIcon,
  PlusIcon,
} from 'phosphor-react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useScroll } from '../context/ScrollContext'; 
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  state: any;
  descriptors: any;
  navigation: any;
}

const CustomTabBar2: React.FC<Props> = ({ state, descriptors, navigation }) => {
  const route = state.routes[state.index];
  const routeName = getFocusedRouteNameFromRoute(route) ?? route.name;

  const { isTabVisible } = useScroll();
  
  // Style animé pour la translation et l'opacité
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: withTiming(isTabVisible ? 0 : 100, { duration: 500 }) }, 
    ],
    opacity: withTiming(isTabVisible ? 1 : 0, { duration: 500 }),
  }));
  
  const hiddenRoutes = [
    'Search',
    'Product',
    'Sell',
    'Conversation',
    'Profile',
    'ProfilMain',
    'Message',
    'ConfidentialityScreen',
    'TrueProfilUserAccess',
    'Notification',
    'MessageMain',
    'Chat',
    'FavoriteProduct'
  ];
  if (hiddenRoutes.includes(routeName)) return null;

  const activeColor = '#03233A';
  const inactiveColor = '#212529';

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused) {
            if (route.name === 'Home') {
              navigation.navigate('Home', { screen: 'HomeMain' });
            } else {
              navigation.navigate(route.name);
            }
          }
        };

        const renderIcon = () => {
          switch (label) {
            case 'Accueil':
              return (
                <HouseIcon
                  size={24}
                  color={isFocused ? activeColor : inactiveColor}
                />
              );
            case 'Message':
              return (
                <ChatIcon
                  size={24}
                  color={isFocused ? activeColor : inactiveColor}
                />
              );
            case 'Notification':
              return (
                <BellIcon
                  size={24}
                  color={isFocused ? activeColor : inactiveColor}
                />
              );
            case 'Profile':
              return (
                <UserIcon
                  size={24}
                  color={isFocused ? activeColor : inactiveColor}
                />
              );
            case 'Sell':
              return (
                <View
                  className="rounded-full"
                  style={{
                    backgroundColor: '#03233A',
                    padding: 12,
                    marginBottom: -20, 
                  }}
                >
                  <PlusIcon
                    size={24}
                    color={isFocused ? activeColor : '#fff'}
                  />
                </View>
              );
            default:
              return null;
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.tabButton}
            activeOpacity={0.7}
          >
            {renderIcon()}
            <Text
              style={{
                color: isFocused ? activeColor : inactiveColor,
                fontSize: 12,
              }}
            >
              {label !== 'Sell' && label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
};

export default CustomTabBar2;

const styles = StyleSheet.create({
  container: {
    // Positionnement absolu pour l'animation
    position: 'absolute', 
    bottom: 0, 
    left: 0,
    right: 0,
    zIndex: 100, 
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: '#ddd',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 8, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});