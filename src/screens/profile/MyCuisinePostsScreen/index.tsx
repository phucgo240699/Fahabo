import React, {useEffect} from 'react';
import i18n from '@locales/index';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {FlatList} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {myCuisinePostsSelector} from '@store/selectors/cuisine';
import {
  deleteCuisinePostRequestAction,
  getCuisinePostDetailRequestAction,
  getMyCuisinePostsRequestAction,
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
import {ScreenName} from '@constants/Constants';

const MyCuisinePostsScreen = () => {
  const dispatch = useDispatch();
  const myCuisinePosts = useSelector(myCuisinePostsSelector);
  const user = useSelector(userSelector);
  const focusFamily = useSelector(focusFamilySelector);

  useEffect(() => {
    dispatch(
      getMyCuisinePostsRequestAction({
        getting: true,
      }),
    );
  }, []);

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

  return (
    <SafeView>
      <FlatList
        data={myCuisinePosts}
        renderItem={renderItem}
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

export default MyCuisinePostsScreen;
