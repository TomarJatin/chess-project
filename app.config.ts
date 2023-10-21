import 'dotenv/config';

export default {
    name: 'Chess App',
    slug: 'chess-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
        image: './assets/splash.png',
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
    },
    updates: {
        fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
        bundleIdentifier: 'com.tomarJatin.chess',
        supportsTablet: true,
    },
    android: {
        package: 'com.tomarJatin.chess',
        adaptiveIcon: {
            foregroundImage: './assets/icon.png',
            backgroundColor: '#FFFFFF',
        },
    },
    web: {
        favicon: './assets/icon.png',
    },
};
