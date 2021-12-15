import React, {useEffect, useState} from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {Platform, StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import PrimaryButton from '@components/PrimaryButton';
import {navigate} from '@navigators/index';
import {Constants, ScreenName} from '@constants/Constants';
import i18n from '@locales/index';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import ProfileHeader from '@components/ProfileHeader';
import {isNull} from '@utils/index';
import {cameraIcon, rectanglePlaceHolderImage} from '@constants/sources';
import {Input, ScrollView, useDisclose} from 'native-base';
import PrimaryActionSheet from '@components/PrimaryActionSheet';
import ImageCropPicker from 'react-native-image-crop-picker';
import {CuisinePostType} from '@constants/types/cuisine';
import AutoHeightWebView from 'react-native-autoheight-webview';

const thumbnailWidth = Constants.MAX_WIDTH;
const thumbnailHeight = (thumbnailWidth / 4) * 3;

interface Props {
  route?: any;
}

const CuisinePostDetailScreen: React.FC<Props> = ({route}) => {
  const detail: CuisinePostType = route.params.detail;
  const htmlContent = isNull(detail.thumbnail)
    ? `${detail.content}`
    : `<div><img width="100%" src="${detail.thumbnail}"><br><div style="margin: 20px;">${detail.content}</div></div>`;
  return (
    <SafeView>
      <FocusAwareStatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={colors.WHITE}
      />
      <ProfileHeader title={detail.title} />

      <AutoHeightWebView
        allowsFullscreenVideo
        scalesPageToFit={true}
        containerStyle={styles.webView}
        source={{html: htmlContent}}
        viewportContent={'width=device-width, user-scalable=no'}
      />
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
  margin-top: ${Platform.OS === 'android' ? getStatusBarHeight() : 0}px;
`;

const Thumbnail = styled.Image`
  resize-mode: contain;
  width: ${thumbnailWidth}px;
  height: ${thumbnailHeight}px;
  background-color: ${colors.WHITE};
`;

const Title = styled(fonts.PrimaryFontBoldSize20)`
  margin-top: 10px;
  text-align: center;
`;

const styles = StyleSheet.create({
  webView: {
    // flex: 1,
    // margin: 20,
    // width: Constants.MAX_WIDTH,
  },
});

export default CuisinePostDetailScreen;
