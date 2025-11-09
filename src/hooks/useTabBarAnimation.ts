import { useRef, useCallback } from 'react';
import { LayoutAnimation, Platform, UIManager } from 'react-native';
import { useScroll } from '../context/ScrollContext';


export const useTabBarAnimation = () => {
    const { setIsTabVisible } = useScroll();
    const lastScrollY = useRef(0);

    const handleScroll = useCallback((event: any) => {
        const currentY = event.nativeEvent.contentOffset.y;

        // Scroll vers le bas ***cacher la TabBar
        if (currentY > lastScrollY.current + 5) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setIsTabVisible(false);
        }
        // Scroll vers le haut *** afficher la TabBar
        else if (currentY < lastScrollY.current - 5) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setIsTabVisible(true);
        }

        lastScrollY.current = currentY;
    }, [setIsTabVisible]);

    return handleScroll;
};
