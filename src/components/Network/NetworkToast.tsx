import React, { useEffect, useState, useRef } from 'react';
import { Text, Dimensions } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing} from 'react-native-reanimated';
import useNetworkStatus from '../../hooks/useNetworkStatus';
import { WifiHighIcon, WifiSlashIcon } from 'phosphor-react-native';

const { width } = Dimensions.get('window');

interface NetworkToastPropsI {
  forceStatus?: boolean;
}

export default function NetworkToast({ forceStatus }: NetworkToastPropsI) {
  let isConnected = useNetworkStatus();

  if (forceStatus !== undefined) {
    isConnected = forceStatus;
  }

  const [message, setMessage] = useState('');
  const [bgColor, setBgColor] = useState('#222328');
  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);

  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;

      if (isConnected === false) {
        setMessage(' Vous êtes actuellement hors ligne');
        translateY.value = 0;
        opacity.value = 1;
      }

      return;
    }

    if (isConnected === false) {
      setMessage(' Vous êtes actuellement hors ligne');
      setBgColor('#222328');

      translateY.value = withTiming(0, {
        duration: 400,
        easing: Easing.out(Easing.ease),
      });
      opacity.value = withTiming(1, { duration: 400 });
    } else if (isConnected === true) {
      setMessage(' Connexion Internet rétablie');
      setBgColor('#222328');

      translateY.value = withTiming(0);
      opacity.value = withTiming(1);

      setTimeout(() => {
        translateY.value = withTiming(100, { duration: 400 });
        opacity.value = withTiming(0, { duration: 300 });
      }, 2500);
    }
  }, [isConnected]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[animatedStyle, { backgroundColor: bgColor, width: width * 0.9 }]}
      className="absolute bottom-24 self-center py-3 px-4 rounded-xl shadow-lg flex-row items-center justify-start space-x-2"
    >
      {isConnected ? (
        <WifiHighIcon size={20} color="white" weight="bold" />
      ) : (
        <WifiSlashIcon size={20} color="white" weight="bold" />
      )}

      <Text className="text-white font-semibold text-sm">{message}</Text>
    </Animated.View>
  );
}
