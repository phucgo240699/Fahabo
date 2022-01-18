import React from 'react';
import {
    Appearance,
    Button,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import {XMath} from '@wxik/core';
import {InsertLinkModal} from '../shared/InsertLinkModal'
import {EmojiView} from './emoji';
import ImageCropPicker from 'react-native-image-crop-picker';
import { isNull } from '@utils/index';
import ProfileHeader from '@components/ProfileHeader';
import i18n from '@locales/index';
import PrimaryButton from '@components/PrimaryButton';
import colors from '@themes/colors';
import { Constants, ScreenName, VIDEO_STORAGE_URL } from '@constants/Constants';
import axios from 'axios';
import { apiProvider } from '@services/apiProvider';
import { connect } from 'react-redux';
import { closeHUDAction, showHUDAction } from '@store/actionTypes/session';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { navigate } from '@navigators/index';
import { createCuisinePostRequestAction, updateCuisinePostRequestAction } from '@store/actionTypes/cuisine';

const imageList = [
    'https://img.lesmao.vip/k/h256/R/MeiTu/1293.jpg',
    'https://pbs.twimg.com/profile_images/1242293847918391296/6uUsvfJZ.png',
    'https://img.lesmao.vip/k/h256/R/MeiTu/1297.jpg',
    'https://img.lesmao.vip/k/h256/R/MeiTu/1292.jpg',
];

class CreateCuisinePostScreen extends React.Component {
    richText = React.createRef();
    linkModal = React.createRef();
    scrollRef = React.createRef();

    constructor(props) {
        super(props);
        const theme = props.theme || Appearance.getColorScheme();
        const contentStyle = {
          backgroundColor: colors.WHITE,
          color: colors.TEXT,
          caretColor: 'red', // initial valid// initial valid
          placeholderColor: colors.SILVER,
          contentCSSText: 'font-size: 16px; min-height: 200px;', // initial valid
        };
        this.richHTML = '';
        this.state = {title: props.route.params.preparingPost.title, thumbnail: props.route.params.preparingPost.thumbnail, initHTML: props.route.params.preparingPost.content ?? '' , theme: theme, contentStyle, disabled: false};
        this.editorFocus = false;
        this.onHome = this.onHome.bind(this);
        this.save = this.save.bind(this);
        this.onPressAddImage = this.onPressAddImage.bind(this);
        this.onInsertLink = this.onInsertLink.bind(this);
        this.onLinkDone = this.onLinkDone.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleHeightChange = this.handleHeightChange.bind(this);
        this.insertVideo = this.insertVideo.bind(this);
        this.onDisabled = this.onDisabled.bind(this);
        this.editorInitializedCallback = this.editorInitializedCallback.bind(this);
        this.onNavigateBack = this.onNavigateBack.bind(this)
    }

    componentDidMount() {
        Keyboard.addListener('keyboardDidShow', this.onKeyShow);
        Keyboard.addListener('keyboardDidHide', this.onKeyHide);
    }

    onKeyHide = () => {};

    onKeyShow = () => {};

    editorInitializedCallback() {
        this.richText.current?.registerToolbar(function (items) {
        });
    }

    async save() {
        // Get the data here and call the interface to save the data
        let html = await this.richText.current?.getContentHtml();

        if (this.props.route?.params?.preparingPost?.cuisinePostId) {
            this.props.updatePost({
                cuisinePostId: this.props.route?.params?.preparingPost?.cuisinePostId,
                title: this.state.title,
                thumbnail: this.state.thumbnail.slice(0,10).includes('http') ? null : this.state.thumbnail,
                content: html
            })
        }
        else {
            this.props.createPost({
                title: this.state.title,
                thumbnail: this.state.thumbnail,
                content: html
            })
        }
    }

    handleChange(html) {
        this.richHTML = html;
        this.setState({a: Math.random});
    }

    handleHeightChange(height) {}

    onPressAddImage() {
        ImageCropPicker.openPicker({
          mediaType: 'photo',
          includeBase64: true,
        }).then(cropped => {
          if (!isNull(cropped.data)) {
            this.richText.current?.insertImage(`data:${cropped.mime};base64,${cropped.data}`, 'width: 100%;');
            this.richText.current?.insertHTML('<div><br></div>')
          }
        });
    }

    insertVideo() {}

    onInsertLink() {
      this.linkModal.current?.setModalVisible(true);
    }

    onLinkDone({title, url}) {
      this.richText.current?.insertLink(title, url);
    }

    onHome() {
      this.props.navigation.push('index');
    }

    onDisabled() {
        this.setState({disabled: !this.state.disabled});
    }

    handlePaste = data => {
    };

    handleMessage = ({type, id, data}) => {
        let index = 0;
        switch (type) {
            case 'ImgClick':
                this.richText.current?.commandDOM(`$('#${id}').src="${imageList[XMath.random(imageList.length - 1)]}"`);
                break;
            case 'TitleClick':
                const color = ['red', 'blue', 'gray', 'yellow', 'coral'];

                // command: $ = document.querySelector
                this.richText.current?.commandDOM(`$('#${id}').style.color='${color[XMath.random(color.length - 1)]}'`);
                break;
            case 'SwitchImage':
                break;
        }
    };

    handleFocus = () => {
        this.editorFocus = true;
    };

    handleBlur = () => {
        this.editorFocus = false;
    };

    handleCursorPosition = scrollY => {
        // Positioning scroll bar
        this.scrollRef.current.scrollTo({y: scrollY - 30, animated: true});
    };

    onNavigateBack = async () => {
        let _htmlContent = await this.richText.current?.getContentHtml();
        navigate(ScreenName.PreCreateCuisinePostScreen, {
            preparingPost: {
                title: this.state.title,
                thumbnail: this.state.thumbnail,
                content: _htmlContent,
                cuisinePostId: this.props.route?.params?.preparingPost?.cuisinePostId
            }
        })
    }

    render() {
        const {contentStyle, theme, disabled} = this.state;
        const {backgroundColor, color, placeholderColor} = contentStyle;
        return (
            <SafeAreaView style={styles.container}>
                <FocusAwareStatusBar translucent barStyle={'dark-content'} backgroundColor={colors.WHITE} />
                <ProfileHeader title={i18n.t('cuisine.content')} onCustomNavigateBack={this.onNavigateBack} rightComponent={<PrimaryButton marginRight={10} title={i18n.t('cuisine.post')} titleFontWeight={700} titleFontSize={18} titleColor={colors.THEME_COLOR_7} onPress={this.save} />} />
                <InsertLinkModal
                    placeholderColor={placeholderColor}
                    color={color}
                    backgroundColor={backgroundColor}
                    onDone={this.onLinkDone}
                    ref={this.linkModal}
                />
                <ScrollView
                    style={styles.scroll}
                    keyboardDismissMode={'none'}
                    ref={this.scrollRef}
                    nestedScrollEnabled={true}
                    scrollEventThrottle={20}>
                    <RichEditor
                        // initialFocus={true}
                        disabled={disabled}
                        editorStyle={contentStyle} // default light style
                        ref={this.richText}
                        style={styles.rich}
                        useContainer={true}
                        // initialHeight={Constants.MAX_HEIGHT - 100} // 400
                        placeholder={i18n.t('cuisine.enterPostContent')}
                        initialContentHTML={this.state.initHTML}
                        editorInitializedCallback={this.editorInitializedCallback}
                        onChange={this.handleChange}
                        onHeightChange={this.handleHeightChange}
                        onPaste={this.handlePaste}
                        onMessage={this.handleMessage}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        onCursorPosition={this.handleCursorPosition}
                        pasteAsPlainText={true}
                    />
                </ScrollView>
                <KeyboardAvoidingView behavior={'padding'}>
                    <RichToolbar
                        style={styles.topRichBar}
                        flatContainerStyle={styles.flatStyle}
                        editor={this.richText}
                        disabled={disabled}
                        // iconTint={color}
                        selectedIconTint={'#2095F2'}
                        disabledIconTint={'#bfbfbf'}
                        onPressAddImage={this.onPressAddImage}
                        onInsertLink={this.onInsertLink}
                        // iconSize={24}
                        // iconGap={10}
                        actions={[
                            actions.undo,
                            actions.redo,
                            // actions.insertVideo,
                            actions.insertImage,
                            actions.setStrikethrough,
                            actions.checkboxList,
                            actions.insertOrderedList,
                            actions.blockquote,
                            actions.alignLeft,
                            actions.alignCenter,
                            actions.alignRight,
                            actions.code,
                            actions.line,
                            actions.heading1,
                            actions.heading4,
                        ]} // default defaultActions
                        iconMap={{
                            [actions.heading1]: ({tintColor}) => (
                                <Text style={[styles.tib, {color: tintColor}]}>H1</Text>
                            ),
                            [actions.heading4]: ({tintColor}) => (
                                <Text style={[styles.tib, {color: tintColor}]}>H3</Text>
                            ),
                        }}
                        insertVideo={this.insertVideo}
                    />
                <RichToolbar
                        style={styles.bottomRichBar}
                        flatContainerStyle={styles.flatStyle}
                        editor={this.richText}
                        disabled={disabled}
                        selectedIconTint={'#2095F2'}
                        disabledIconTint={'#bfbfbf'}
                        onPressAddImage={this.onPressAddImage}
                        onInsertLink={this.onInsertLink}
                    />
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
        marginTop: Platform.OS === 'android' ? getStatusBarHeight() : 0
    },
    rich: {
        flex: 1,
        minHeight: 300,
    },
    topRichBar: {
        borderColor: colors.CONCRETE,
        borderTopWidth: StyleSheet.hairlineWidth,
        backgroundColor: colors.WHITE,
    },
    bottomRichBar: {
        borderColor: colors.CONCRETE,
        borderTopWidth: StyleSheet.hairlineWidth,
        backgroundColor: colors.WHITE,
        marginBottom: Platform.OS === 'android' ? getStatusBarHeight() : 0
    },
    scroll: {
        backgroundColor: colors.WHITE,
    },
    tib: {
        textAlign: 'center',
        color: '#515156',
    },
    flatStyle: {
        paddingHorizontal: 12,
    },
});

const mapDispatchToProps = (dispatch) => {
    return {
        showHUD: () => dispatch(showHUDAction()),
        closeHUD: () => dispatch(closeHUDAction()),
        createPost: (body) => dispatch(createCuisinePostRequestAction(body)),
        updatePost: (body) => dispatch(updateCuisinePostRequestAction(body))
    }
}

export default connect(null, mapDispatchToProps)(CreateCuisinePostScreen) // CreateCuisinePostScreen;
 