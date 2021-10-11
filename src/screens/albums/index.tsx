import React from 'react';
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
import AlbumItem from './shared/AlbumItem';
import {Constants, ScreenName} from '@constants/Constants';
import {StyleSheet} from 'react-native';
import {navigate} from '@navigators/index';

const itemHeight = (Constants.MAX_WIDTH - 36) / 2;
const itemWidth = (Constants.MAX_WIDTH - 36) / 2;

interface Props {}

const AlbumsScreen: React.FC<Props> = ({}) => {
  const onPressItem = (item: any) => {
    navigate(ScreenName.AlbumDetailScreen, {item});
  };
  const renderItem = ({item}: {item: any}) => {
    return (
      <AlbumItem
        item={item}
        maxWidth={itemWidth}
        maxHeight={itemHeight}
        onPress={onPressItem}
      />
    );
  };
  return (
    <Box flex={1} safeArea bgColor={colors.WHITE}>
      <FocusAwareStatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
      />
      <ProfileHeader
        title={i18n.t('album.myAlbums')}
        titleMarginLeft={8}
        rightComponent={
          <PrimaryButton
            marginRight={8}
            leftSource={plusIcon}
            leftTintColor={colors.THEME_COLOR_6}
          />
        }
      />
      <FlatList
        numColumns={2}
        data={DummyAlbums}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
    flexDirection: 'column',
    // alignItems: 'center',
  },
});

export default AlbumsScreen;
