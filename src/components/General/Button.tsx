import { TouchableOpacity, Text, ImageBackground, View } from 'react-native';
import { Color, FontSize } from '../../../GlobalStyle';


export default function GeneralButton(props: {
    title: string,
    width: any,
    paddingVertical: number,
    onPress: any
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
                    borderRadius: 14,
                    overflow: 'hidden',
                }}
            >
                <View
                    style={{
                        paddingVertical: props.paddingVertical
                    }}
                >
                    <Text style={{ textAlign: 'center', color: Color.textColor, fontSize: FontSize.xs13, fontWeight: "800" }}>{props.title}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
}
