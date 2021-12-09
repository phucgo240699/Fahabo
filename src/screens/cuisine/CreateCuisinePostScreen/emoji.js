/**
 * @author tangzehua
 * @since 2020-07-09 16:02
 */
import { Constants } from '@constants/Constants';
import { ScrollView } from 'native-base';
import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

export function EmojiView(props) {
    const {onSelect} = props;
    const smileyIcons = '😀 😃 😄 😁 😆 😅 😂 🤣 🥲 ☺️ 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤨 🧐 🤓 😎 🥸 🤩 🥳 😏 😒 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 🥺 😢 😭 😤 😠 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓 🤗 🤔 🤭 🤫 🤥 😶 😐 😑 😬 🙄 😯 😦 😧 😮 😲 🥱 😴 🤤 🥴 🤧 😷 🤒 🤑 ❤️'
    const foodIcons = '🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🫐 🍈 🍒 🍑 🥭 🍍 🥥 🥝 🍅 🍆 🥑 🥦 🥬 🥒 🌶 🫑 🌽 🥕 🫒 🧄 🧅 🥔 🍠 🥐 🥯 🍞 🥖 🥨 🧀 🥚 🍳 🧈 🥞 🧇 🥓 🥩 🍗 🍖 🦴 🌭 🍔 🍟 🍕 🫓 🥪 🥙 🧆 🌮 🌯 🫔 🥗 🥘 🫕 🥫 🍝 🍜 🍲 🍛 🍣 🍱 🥟 🦪 🍤 🍙 🍚 🍘 🍥 🥠 🥮 🍢 🍡 🍧 🍨 🍦 🥧 🧁 🍰 🎂 🍮 🍭 🍬 🍫 🍿 🍩 🍪 🌰 🥜 🍯 🥛 🍼 🫖 ☕️ 🍵 🧃 🥤 🧋 🍶 🍺 🍻 🥂 🍷 🥃 🍸 🍹'
    return (
        <ScrollView style={{ height: 200 }} contentContainerStyle={styles.view}>
            {
                smileyIcons.split(' ').map(item => {
                    return <Text style={styles.item} onPress={() => onSelect(`${item}`)}>
                    {item}
                </Text>
                })
            }
            <View style={{ width: Constants.MAX_WIDTH }} />
            {/* Food */}
            {
                foodIcons.split(' ').map(item => {
                    return <Text style={styles.item} onPress={() => onSelect(`${item}`)}>
                    {item}
                </Text>
                })
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    view: {
        alignSelf: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
        // width: Math.min(Dimensions.get('window').width, 32 * 12),
        width: Constants.MAX_WIDTH
    },
    item: {
        // height: 25,
        // width: 25,
        fontSize: 30,
        paddingHorizontal: 3,
        paddingVertical: 5,
    },
});
