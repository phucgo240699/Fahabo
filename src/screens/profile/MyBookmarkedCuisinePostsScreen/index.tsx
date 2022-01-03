import React, {useEffect, useState} from 'react';
import i18n from '@locales/index';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import {Platform, RefreshControl} from 'react-native';
import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {FlatList} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {
  isGettingMyBookmarkedCuisinePostsSelector,
  isLoadingMyBookmarkedCuisinePostsSelector,
  isRefreshingMyBookmarkedCuisinePostsSelector,
  myBookmarkedCuisinePostsSelector,
  myCuisinePostsSelector,
} from '@store/selectors/cuisine';
import {
  bookmarkCuisinePostRequestAction,
  deleteCuisinePostRequestAction,
  getCuisinePostDetailRequestAction,
  getMyBookmarkedCuisinePostsRequestAction,
  updateCuisinePostSuccessAction,
  voteCuisinePostRequestAction,
} from '@store/actionTypes/cuisine';
import HorizontalCuisinePostItem from '@screens/cuisine/shared/HorizontalCuisinePostItem';
import {CuisinePostType} from '@constants/types/cuisine';
import {sendMessageRequestAction} from '@store/actionTypes/interactions';
import {userSelector} from '@store/selectors/authentication';
import {focusFamilySelector} from '@store/selectors/family';
import {getOriginDateTimeString} from '@utils/index';
import {navigate} from '@navigators/index';
import {Pagination, ScreenName} from '@constants/Constants';
import ProfileHeader from '@components/ProfileHeader';
import GettingIndicator from '@components/GettingIndicator';
import PrimarySearchBar from '@components/PrimarySearchBar';

const MyBookmarkedCuisinePostsScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const focusFamily = useSelector(focusFamilySelector);
  const myBookmarkedCuisinePosts = useSelector(
    myBookmarkedCuisinePostsSelector,
  );
  const isGetting = useSelector(isGettingMyBookmarkedCuisinePostsSelector);
  const isLoadingMore = useSelector(isLoadingMyBookmarkedCuisinePostsSelector);
  const isRefreshing = useSelector(
    isRefreshingMyBookmarkedCuisinePostsSelector,
  );
  const [pageIndex, setPageIndex] = useState(0);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(
      getMyBookmarkedCuisinePostsRequestAction({
        getting: true,
        searchText: searchText,
      }),
    );
  }, []);

  // Refresh
  const onRefreshingData = () => {
    if (isRefreshing === false) {
      setPageIndex(0);
      setSearchText('');
      dispatch(
        getMyBookmarkedCuisinePostsRequestAction({
          refreshing: true,
          searchText: searchText,
        }),
      );
    }
  };

  // Load more
  const onLoadingMoreData = () => {
    if (
      isLoadingMore === false &&
      myBookmarkedCuisinePosts.length >= Pagination.CuisinePosts
    ) {
      dispatch(
        getMyBookmarkedCuisinePostsRequestAction({
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
    setPageIndex(0);
    dispatch(
      getMyBookmarkedCuisinePostsRequestAction({
        getting: true,
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
        onPressShareToChatBox={onPressShareToChatBoxOption}
        onPressUpdate={onPressUpdate}
        onPressDelete={onPressDelete}
        onPressBookmark={onPressBookmark}
      />
    );
  };
  const onPressItem = (item: CuisinePostType) => {
    dispatch(getCuisinePostDetailRequestAction({cuisinePostId: item.id}));
  };
  const onPressShareToChatBoxOption = (item: CuisinePostType) => {
    const today = new Date();
    dispatch(
      sendMessageRequestAction({
        _id: `${focusFamily?.id}_${user?.id}_${today.getTime()}`,
        familyId: focusFamily?.id,
        createdAt: getOriginDateTimeString(today),
        timeStamp: today.getTime().toString(),
        authorId: user?.id,
        authorName: user?.name,
        authorAvatar: user?.avatarUrl,
        cuisinePostId: item.id,
        cuisinePostTitle: item.title,
        cuisinePostThumbnail: item.thumbnail,
        type: 'cuisine_post',
      }),
    );
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
  const onPressBookmark = (item: CuisinePostType) => {
    dispatch(bookmarkCuisinePostRequestAction({cuisinePostId: item.id}));
    dispatch(
      updateCuisinePostSuccessAction({
        ...item,
        isBookmarked: !item.isBookmarked,
      }),
    );
  };

  return (
    <SafeView>
      <ProfileHeader title={i18n.t('cuisine.myFavoritePosts')} />
      <PrimarySearchBar
        text={searchText}
        marginTop={8}
        marginLeft={10}
        marginRight={10}
        onChangeText={onChangeSearchText}
        onSubmitText={onSubmitSearchText}
      />
      {isGetting ? (
        <GettingIndicator />
      ) : (
        <FlatList
          data={myBookmarkedCuisinePosts}
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

export default MyBookmarkedCuisinePostsScreen;
