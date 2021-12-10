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
import {Input, useDisclose} from 'native-base';
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
  const detail: CuisinePostType = {};
  return (
    <SafeView>
      <FocusAwareStatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={colors.WHITE}
      />
      <ProfileHeader />
      <Thumbnail source={{uri: detail.thumbnail}} />
      <Title>{detail.title}</Title>
      <AutoHeightWebView
        source={{html: detail.content ?? ''}}
        scalesPageToFit={true}
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

const Title = styled(fonts.PrimaryFontBoldSize20)``;

const styles = StyleSheet.create({
  webView: {
    width: Constants.MAX_WIDTH,
  },
});

export default CuisinePostDetailScreen;
