// mouse.js
import { computed } from 'vue'
import { variations } from './constants';

// by convention, composable function names start with "use"
export function useVariation(variation: string) {
    const cardStyle = computed(() => {
        return variations[variation].cardStyle;
    });

    const circleStyle = computed(() => {
        return variations[variation].circleStyle;
    });

    const iconVariation = computed(() => {
        return variations[variation].iconVariation;
    });

    const iconColor = computed(() => {
        return variations[variation].iconColor;
    });

    return { cardStyle, circleStyle, iconVariation, iconColor }
}