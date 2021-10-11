import React, {useState} from 'react';
import {Box, FlatList} from 'native-base';
import fonts from '@themes/fonts';
import i18n from '@locales/index';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {plusIcon} from '@constants/sources';
import ProfileHeader from '@components/ProfileHeader';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import PrimaryButton from '@components/PrimaryButton';
import {DummyAlbums} from '@constants/DummyData';
import AlbumItem from '../shared/AlbumItem';
import {Constants} from '@constants/Constants';
import {StyleSheet} from 'react-native';

interface Props {
  route?: any;
}

const AlbumDetailScreen: React.FC<Props> = ({route}) => {
  const {item} = route.params;
  const [isChoosing, setIsChoosing] = useState(false);

  const onToggleChoosing = () => {
    setIsChoosing(!isChoosing);
  };

  return (
    <Box flex={1} safeArea bgColor={colors.WHITE}>
      <FocusAwareStatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
      />
      <ProfileHeader
        title={item.isDefault ? i18n.t('album.general') : item.title}
        titleMarginLeft={isChoosing ? 16 : 20}
        rightComponent={
          <PrimaryButton
            marginRight={8}
            titleColor={isChoosing ? colors.RED_1 : colors.THEME_COLOR_7}
            title={isChoosing ? i18n.t('album.cancel') : i18n.t('album.choose')}
            onPress={onToggleChoosing}
          />
        }
      />
    </Box>
  );
};

export default AlbumDetailScreen;
