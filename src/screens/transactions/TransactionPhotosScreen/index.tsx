import i18n from '@locales/index';
import colors from '@themes/colors';
import {Platform, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {FlatList} from 'native-base';
import {ScreenName} from '@constants/Constants';
import React, {useEffect} from 'react';
import ProfileHeader from '@components/ProfileHeader';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {useDispatch, useSelector} from 'react-redux';
import PhotoItem from '@screens/albums/AlbumDetailScreen/PhotoItem';
import {PhotoType} from '@constants/types/albums';
import {isNull} from '@utils/index';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {navigate} from '@navigators/index';
import {
  isGettingTransactionPhotosSelector,
  transactionPhotosSelector,
} from '@store/selectors/transactions';
import {getTransactionPhotosRequestAction} from '@store/actionTypes/transactions';
import GettingIndicator from '@components/GettingIndicator';

interface Props {
  route?: any;
}

const TransactionPhotosScreen: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();
  const transactionPhotos = useSelector(transactionPhotosSelector);
  const isGetting = useSelector(isGettingTransactionPhotosSelector);

  // Life Cycle
  useEffect(() => {
    if (!isNull(route.params.transaction.id)) {
      dispatch(
        getTransactionPhotosRequestAction({
          getting: true,
          transactionId: route.params.transaction.id,
        }),
      );
    }
  }, []);

  const onPressItem = (item: PhotoType) => {
    navigate(ScreenName.ImageViewerScreen, {
      data: transactionPhotos,
      currentIndex: item.index,
    });
  };
  const renderItem = ({item}: {item: PhotoType}) => {
    return <PhotoItem item={item} onPress={onPressItem} />;
  };

  return (
    <SafeView>
      <FocusAwareStatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
      />
      <ProfileHeader
        title={i18n.t('chores.photo')}
        backgroundColor={colors.WHITE}
      />
      {isGetting ? (
        <GettingIndicator />
      ) : (
        <FlatList
          numColumns={3}
          data={transactionPhotos}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
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

export default TransactionPhotosScreen;
