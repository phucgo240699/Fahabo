import React, {useCallback, useState} from 'react';
import {FlatList, useDisclose} from 'native-base';
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
import {Platform, StyleSheet} from 'react-native';
import {navigate} from '@navigators/index';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import AlbumCreationModal from './shared/AlbumCreationModal';

const itemHeight = (Constants.MAX_WIDTH - 36) / 2;
const itemWidth = (Constants.MAX_WIDTH - 36) / 2;

interface Props {}

const AlbumsScreen: React.FC<Props> = ({}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const {isOpen, onOpen, onClose} = useDisclose();

  // Create
  const onChangeTitle = useCallback((text: string) => {
    setTitle(text);
  }, []);
  const onChangeDescription = useCallback((text: string) => {
    setDescription(text);
  }, []);

  // Item
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
    <SafeView>
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
            onPress={onOpen}
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

      <AlbumCreationModal
        isOpen={isOpen}
        onClose={onClose}
        onPressCancel={onClose}
        title={title}
        description={description}
        onChangeTitle={onChangeTitle}
        onChangeDescription={onChangeDescription}
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
    padding: 10,
    flexDirection: 'column',
    // alignItems: 'center',
  },
});

export default AlbumsScreen;
