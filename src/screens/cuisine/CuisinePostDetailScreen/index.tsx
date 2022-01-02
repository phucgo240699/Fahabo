import React from 'react';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import ProfileHeader from '@components/ProfileHeader';
import {isNull} from '@utils/index';
import {CuisinePostType} from '@constants/types/cuisine';
import AutoHeightWebView from 'react-native-autoheight-webview';
import {Constants} from '@constants/Constants';
import {useSelector} from 'react-redux';
import {cuisinePostDetailSelector} from '@store/selectors/cuisine';

interface Props {
  route?: any;
}

const CuisinePostDetailScreen: React.FC<Props> = ({route}) => {
  const detail = useSelector(cuisinePostDetailSelector);

  const htmlContent = isNull(detail?.thumbnail)
    ? `<div style="margin: 20px; color: ${colors.BLACK};">${detail?.content}</div>`
    : `<div><img width="100%" src="${detail?.thumbnail}"><br><div style="margin: 20px; color: ${colors.BLACK};">${detail?.content}</div></div>`;
  return (
    <SafeView>
      <FocusAwareStatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={colors.WHITE}
      />
      <ProfileHeader title={detail?.title} />

      <AutoHeightWebView
        allowsFullscreenVideo
        scalesPageToFit={true}
        containerStyle={{width: Constants.MAX_WIDTH}}
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

export default CuisinePostDetailScreen;
