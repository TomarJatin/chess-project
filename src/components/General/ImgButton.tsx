import { TouchableOpacity, Text, ImageBackground, View } from 'react-native';


export default function ImgButton(props: {
    children: any,
    width: any,
    paddingVertical: number,
    paddingHorizontal: number,
    onPress: any,
    borderRadius: any
}) {
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            style={{
                width: props.width,
            }}
            onPress={props.onPress}
        >
            <ImageBackground
                source={require('../../../assets/button-bg.png')}
                resizeMode='cover'
                style={{
                    width: '100%',
                    borderRadius: props.borderRadius,
                    overflow: 'hidden',
                }}
            >
                <View
                    style={{
                        paddingVertical: props.paddingVertical,
                        paddingHorizontal: props.paddingHorizontal
                    }}
                >
                   {props.children}
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
}
