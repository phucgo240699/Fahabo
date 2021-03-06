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
    const smileyIcons = '๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐คฃ ๐ฅฒ โบ๏ธ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ฅฐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐คช ๐คจ ๐ง ๐ค ๐ ๐ฅธ ๐คฉ ๐ฅณ ๐ ๐ ๐ ๐ ๐ ๐ ๐ โน๏ธ ๐ฃ ๐ ๐ซ ๐ฉ ๐ฅบ ๐ข ๐ญ ๐ค ๐  ๐คฏ ๐ณ ๐ฅต ๐ฅถ ๐ฑ ๐จ ๐ฐ ๐ฅ ๐ ๐ค ๐ค ๐คญ ๐คซ ๐คฅ ๐ถ ๐ ๐ ๐ฌ ๐ ๐ฏ ๐ฆ ๐ง ๐ฎ ๐ฒ ๐ฅฑ ๐ด ๐คค ๐ฅด ๐คง ๐ท ๐ค ๐ค โค๏ธ'
    const foodIcons = '๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ซ ๐ ๐ ๐ ๐ฅญ ๐ ๐ฅฅ ๐ฅ ๐ ๐ ๐ฅ ๐ฅฆ ๐ฅฌ ๐ฅ ๐ถ ๐ซ ๐ฝ ๐ฅ ๐ซ ๐ง ๐ง ๐ฅ ๐  ๐ฅ ๐ฅฏ ๐ ๐ฅ ๐ฅจ ๐ง ๐ฅ ๐ณ ๐ง ๐ฅ ๐ง ๐ฅ ๐ฅฉ ๐ ๐ ๐ฆด ๐ญ ๐ ๐ ๐ ๐ซ ๐ฅช ๐ฅ ๐ง ๐ฎ ๐ฏ ๐ซ ๐ฅ ๐ฅ ๐ซ ๐ฅซ ๐ ๐ ๐ฒ ๐ ๐ฃ ๐ฑ ๐ฅ ๐ฆช ๐ค ๐ ๐ ๐ ๐ฅ ๐ฅ  ๐ฅฎ ๐ข ๐ก ๐ง ๐จ ๐ฆ ๐ฅง ๐ง ๐ฐ ๐ ๐ฎ ๐ญ ๐ฌ ๐ซ ๐ฟ ๐ฉ ๐ช ๐ฐ ๐ฅ ๐ฏ ๐ฅ ๐ผ ๐ซ โ๏ธ ๐ต ๐ง ๐ฅค ๐ง ๐ถ ๐บ ๐ป ๐ฅ ๐ท ๐ฅ ๐ธ ๐น'
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
