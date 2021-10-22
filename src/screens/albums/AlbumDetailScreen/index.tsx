import React, {useState} from 'react';
import {Box, FlatList} from 'native-base';
import i18n from '@locales/index';
import colors from '@themes/colors';
import ProfileHeader from '@components/ProfileHeader';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import PrimaryButton from '@components/PrimaryButton';
import styled from 'styled-components/native';
import {Platform, StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {plusIcon} from '@constants/sources';
import {DummyAlbums} from '@constants/DummyData';
import {Constants, ScreenName} from '@constants/Constants';
import {navigate} from '@navigators/index';
import PhotoItem from './PhotoItem';

interface Props {
  route?: any;
}

const AlbumDetailScreen: React.FC<Props> = ({route}) => {
  const {item} = route.params;
  const [isChoosing, setIsChoosing] = useState(false);

  const renderItem = ({item}: {item: any}) => {
    return <PhotoItem item={item} onPress={onPressItem} />;
  };
  const onToggleChoosing = () => {
    setIsChoosing(!isChoosing);
  };
  const onPressItem = (item: any) => {
    navigate(ScreenName.ImageViewerScreen, {
      data: DummyAlbums,
      currentIndex: item.index,
    });
  };

  return (
    <SafeView>
      <FocusAwareStatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
      />
      <ProfileHeader
        title={item.isDefault ? i18n.t('album.general') : item.title}
        titleMarginLeft={isChoosing ? 53 : 62}
        rightComponent={
          <Box flexDirection={'row'}>
            <PrimaryButton
              marginRight={12}
              titleFontSize={16}
              titleFontWeight={500}
              title={
                isChoosing
                  ? `${i18n.t('album.cancel')}`
                  : i18n.t('album.choose')
              }
              titleColor={isChoosing ? colors.RED_1 : colors.DANUBE}
              onPress={onToggleChoosing}
            />
            <PrimaryButton
              marginRight={4}
              leftSource={plusIcon}
              leftTintColor={colors.THEME_COLOR_7}
            />
          </Box>
        }
      />
      <FlatList
        numColumns={4}
        data={[...DummyAlbums, ...DummyAlbums, ...DummyAlbums, ...DummyAlbums]}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
  margin-top: ${Platform.OS === 'android' ? getStatusBarHeight() : 0}px;
`;

const styles = StyleSheet.create({
  list: {
    paddingTop: 10,
    flexDirection: 'column',
  },
});

export default AlbumDetailScreen;
