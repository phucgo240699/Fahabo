import React from 'react';
import i18n from '@locales/index';
import Modal from 'react-native-modal';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

export class InsertLinkModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
        };
        this.onDone = this.onDone.bind(this);
    }

    setModalVisible(visible) {
        this.setState({isModalVisible: visible});
    }

    setTitle(title) {
        this.title = title;
    }

    setURL(url) {
        this.url = url;
    }

    onDone() {
        const title = this.title;
        const url = this.url;
        this.setModalVisible(false);
        this.props?.onDone({title, url});
    }

    render() {
        const {isModalVisible} = this.state;
        const {color, placeholderColor, backgroundColor} = this.props;
        return (
            <Modal
                animationIn={'fadeIn'}
                animationOut={'fadeOut'}
                coverScreen={false}
                isVisible={isModalVisible}
                backdropColor={color}
                backdropOpacity={0.3}
                onBackdropPress={() => this.setModalVisible(false)}>
                <View style={[styles.dialog, {backgroundColor}]}>
                    <View style={styles.linkTitle}>
                        <Text style={{color}}>{i18n.t('cuisine.insertLink')}</Text>
                    </View>
                    <View style={styles.item}>
                        <TextInput
                            style={[styles.input, {color}]}
                            placeholderTextColor={placeholderColor}
                            placeholder={i18n.t('cuisine.title')}
                            onChangeText={(text) => this.setTitle(text)}
                        />
                    </View>
                    <View style={styles.item}>
                        <TextInput
                            style={[styles.input, {color}]}
                            placeholderTextColor={placeholderColor}
                            placeholder="http(s)://"
                            onChangeText={(text) => this.setURL(text)}
                        />
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.btn} onPress={() => this.setModalVisible(false)}>
                            <Text style={styles.text}>{i18n.t('cuisine.cancel')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={this.onDone}>
                            <Text style={styles.text}>{i18n.t('cuisine.ok')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#e8e8e8',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    input: {
        flex: 1,
        height: 40,
    },
    linkTitle: {
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#b3b3b3',
    },
    dialog: {
        borderRadius: 8,
        marginHorizontal: 40,
        paddingHorizontal: 10,
    },

    buttonView: {
        flexDirection: 'row',
        height: 36,
        paddingVertical: 4,
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#286ab2',
    },
});
