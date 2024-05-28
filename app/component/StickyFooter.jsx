import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Platform } from 'react-native';
// import { InterstitialAd, AdEventType, TestIds, BannerAd, BannerAdSize, RewardedAd, RewardedAdEventType, } from 'react-native-google-mobile-ads';

// const adUnit = __DEV__
//     ? TestIds.ADAPTIVE_BANNER :
//     Platform.OS === 'ios' ? 'ca-app-pub-2940991674659781/2834653457'
//         : "ca-app-pub-2940991674659781/5869704858";


// const adUnitId = __DEV__ ? TestIds.INTERSTITIAL :
//     Platform.OS === 'ios' ? 'ca-app-pub-2940991674659781/4311386656' :
//         'ca-app-pub-1715488426615455/4262888413';

// const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
//     keywords: ['fashion', 'clothing', 'shoes', 'casual', 'outfit', 'style', 'betting', 'cricket', 'football', 'sports', 'app', 'shoping']
// });
const StickyFooter = () => {
    const [loaded, setLoaded] = useState();
    useEffect(() => {
        const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
            setLoaded(true);
            const timeoutId = setTimeout(() => {
                interstitial.show();
            }, 10000);
            // interstitial.show()
        });

        //  Start loading the interstitial straight away
        interstitial.load();

        //  Unsubscribe from events on unmount
        return unsubscribe;
    }, [loaded]);
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {/* Your scrollable content goes here */}
            </ScrollView>
            <View style={styles.stickyFooter}>
                {/* <Text style={styles.footerText}>Sticky Footer </Text> */}
                {/* <BannerAd
                    unitId={adUnit}
                    size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                /> */}
                {/* <Text style={styles.footerText}>This is a Sticky Footer</Text> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        paddingBottom: 50, // Height of the sticky footer
    },
    stickyFooter: {

    },
    footerText: {
        color: 'white',
        textAlign: 'center',
        padding: 10,
    },
});

export default StickyFooter;
