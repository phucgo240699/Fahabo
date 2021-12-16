import React, {useState} from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {Platform, RefreshControl} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import PrimaryButton from '@components/PrimaryButton';
import {navigate} from '@navigators/index';
import {Constants, Pagination, ScreenName} from '@constants/Constants';
import PrimaryHeader from '@components/PrimaryHeader';
import i18n from '@locales/index';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {DummyCuisinePosts} from '@constants/DummyData';
import HorizontalCuisinePostItem from './shared/HorizontalCuisinePostItem';
import {FlatList} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {
  cuisinePostsSelector,
  isGettingCuisinePostsSelector,
  isLoadingCuisinePostsSelector,
  isRefreshingCuisinePostsSelector,
} from '@store/selectors/cuisine';
import GettingIndicator from '@components/GettingIndicator';
import {
  deleteCuisinePostRequestAction,
  getCuisinePostsRequestAction,
  updateCuisinePostSuccessAction,
  voteCuisinePostRequestAction,
} from '@store/actionTypes/cuisine';
import {CuisinePostType} from '@constants/types/cuisine';

const CuisinePostsScreen = () => {
  const dispatch = useDispatch();
  const cuisinePosts = useSelector(cuisinePostsSelector);
  const isGetting = useSelector(isGettingCuisinePostsSelector);
  const isLoadingMore = useSelector(isLoadingCuisinePostsSelector);
  const isRefreshing = useSelector(isRefreshingCuisinePostsSelector);

  const [searchText, setSearchText] = useState('');
  const [pageIndex, setPageIndex] = useState(0);

  // Refresh
  const onRefreshingData = () => {
    if (isRefreshing === false) {
      setPageIndex(0);
      dispatch(
        getCuisinePostsRequestAction({
          refreshing: true,
          searchText: searchText,
        }),
      );
    }
  };

  // Loading More
  const onLoadingMoreData = () => {
    if (
      isLoadingMore === false &&
      cuisinePosts.length >= Pagination.CuisinePosts
    ) {
      dispatch(
        getCuisinePostsRequestAction({
          loading: true,
          page: pageIndex + 1,
          searchText: searchText,
        }),
      );
      setPageIndex(pageIndex + 1);
    }
  };

  // Search
  const onChangeSearchText = (value: string) => {
    setSearchText(value);
  };
  const onSubmitSearchText = (value: string) => {
    dispatch(
      getCuisinePostsRequestAction({
        searchText: value,
      }),
    );
  };

  // Item
  const renderItem = ({item}: {item: any}) => {
    return (
      <HorizontalCuisinePostItem
        item={item}
        onReacting={onReactingItem}
        onPress={onPressItem}
        onPressUpdate={onPressUpdate}
        onPressDelete={onPressDelete}
      />
    );
  };
  const onPressItem = (item: CuisinePostType) => {
    navigate(ScreenName.CuisinePostDetailScreen, {detail: item});
  };
  const onPressUpdate = (item: CuisinePostType) => {
    navigate(ScreenName.PreCreateCuisinePostScreen, {
      preparingPost: {
        cuisinePostId: item.id,
        title: item.title,
        thumbnail: item.thumbnail,
        content: item.content,
      },
    });
  };
  const onPressDelete = (item: CuisinePostType) => {
    dispatch(deleteCuisinePostRequestAction({cuisinePostId: item.id}));
  };
  const onReactingItem = (voteId: number, item: CuisinePostType) => {
    dispatch(
      voteCuisinePostRequestAction({
        voteId: voteId,
        cuisinePostId: item.id,
      }),
    );
    if (voteId !== item.userReactedType) {
      dispatch(
        updateCuisinePostSuccessAction({
          ...item,
          userReactedType: voteId,
          angryRatings:
            (voteId === 1 ? 1 : 0) +
            ((item.angryRatings ?? 0) > 0
              ? (item.angryRatings ?? 0) -
                ((item.userReactedType ?? 0) === 1 ? 1 : 0)
              : 0),
          likeRatings:
            (voteId === 2 ? 1 : 0) +
            ((item.likeRatings ?? 0) > 0
              ? (item.likeRatings ?? 0) -
                ((item.userReactedType ?? 0) === 2 ? 1 : 0)
              : 0),
          yummyRatings:
            (voteId === 3 ? 1 : 0) +
            ((item.yummyRatings ?? 0) > 0
              ? (item.yummyRatings ?? 0) -
                ((item.userReactedType ?? 0) === 3 ? 1 : 0)
              : 0),
        }),
      );
    }
  };

  const onPressCreate = () => {
    navigate(ScreenName.PreCreateCuisinePostScreen);
  };
  return (
    <SafeView>
      <FocusAwareStatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={colors.WHITE}
      />
      <PrimaryHeader
        text={searchText}
        onChangeText={onChangeSearchText}
        onSubmitText={onSubmitSearchText}
        title={i18n.t('cuisine.exploreNewCuisine')}
        onPressPlus={onPressCreate}
      />
      {isGetting ? (
        <GettingIndicator />
      ) : (
        <FlatList
          data={cuisinePosts}
          renderItem={renderItem}
          onEndReachedThreshold={0.5}
          onEndReached={onLoadingMoreData}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefreshingData}
            />
          }
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

export default CuisinePostsScreen;
