import React, {useState} from 'react';
import {Box} from 'native-base';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {Keyboard, RefreshControl, StyleSheet, View} from 'react-native';
import HorizontalChoreItem from './shared/HorizontalChoreItem';
import PrimaryButton from '@components/PrimaryButton';
import ListChoresHeader from './shared/ListChoresHeader';
import {useDispatch, useSelector} from 'react-redux';
import {choresSelector} from '@store/selectors/chores';
import {isRefreshingChoresSelector} from '@store/selectors/session';
import {
  deleteChoreRequestAction,
  getChoresRequestAction,
} from '@store/actionTypes/chores';
import {focusFamilySelector} from '@store/selectors/family';
import {isNull} from '@utils/index';
import {RowMap, SwipeListView} from 'react-native-swipe-list-view';
import {editProfileIcon, trashIcon} from '@constants/sources';
import {MemberType} from '@constants/types/family';
import {ChoreStatus} from '@constants/types/chores';
import {navigate} from '@navigators/index';
import {ScreenName} from '@constants/Constants';

interface Props {
  sortBy: 'created_at' | 'deadline';
  selectedMember?: MemberType;
  selectedStatus?: ChoreStatus;
  onChangeMember?: (member: MemberType) => void;
  onChangeStatus?: (status: ChoreStatus) => void;
  onPressLatestCreate?: () => void;
  onPressLatestDeadline?: () => void;
}

const ChoresScreen: React.FC<Props> = ({
  sortBy,
  selectedMember,
  selectedStatus,
  onChangeMember,
  onChangeStatus,
  onPressLatestCreate,
  onPressLatestDeadline,
}) => {
  const dispatch = useDispatch();
  const chores = useSelector(choresSelector);
  const focusFamily = useSelector(focusFamilySelector);
  const isRefreshing = useSelector(isRefreshingChoresSelector);
  const [indexSwiped, setIndexSwiped] = useState<string | undefined>(undefined);

  const onDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // Refresh & Load More
  const onRefreshData = () => {
    if (isRefreshing === false && !isNull(focusFamily?.id)) {
      dispatch(
        getChoresRequestAction({refresh: true, familyId: focusFamily?.id}),
      );
    }
  };

  // Item
  const renderItem = ({item}: {item: any}) => {
    return <HorizontalChoreItem item={item} onPress={onPressItem} />;
  };
  const onPressItem = (item: any) => {
    navigate(ScreenName.ChoreDetailScreen, {detail: item});
  };
  const onPressDelete = () => {
    if (indexSwiped) {
      for (let i = 0; i < chores.length; ++i) {
        if (i.toString() === indexSwiped) {
          dispatch(deleteChoreRequestAction({choreId: chores[i].id}));
          return;
        }
      }
    }
  };
  const onPressUpdate = () => {
    if (indexSwiped) {
      for (let i = 0; i < chores.length; ++i) {
        if (i.toString() === indexSwiped) {
          navigate(ScreenName.CreateChoreScreen, {oldChore: chores[i]});
          return;
        }
      }
    }
  };
  const onDidSwipe = (rowKey: string, rowMap: RowMap<any>, toValue: number) => {
    setIndexSwiped(rowKey);
  };
  return (
    <Box flex={1}>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
        translucent
      />
      <Touch onPress={onDismissKeyboard}>
        <Box flex={1}>
          <SwipeListView
            data={chores}
            renderItem={renderItem}
            disableRightSwipe={true}
            contentContainerStyle={styles.list}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefreshData}
              />
            }
            renderHiddenItem={(data, rowMap) => (
              <Box
                mt={2}
                mr={31}
                height={'100%'}
                flexDirection="row"
                alignItems="center"
                justifyContent="flex-end"
                backgroundColor={colors.WHITE}>
                <SwipeUpdateButton
                  onPress={onPressUpdate}
                  leftTintColor={'#ffffff'}
                  leftSource={editProfileIcon}
                />
                <SwipeDeleteButton
                  leftSource={trashIcon}
                  leftTintColor={'#ffffff'}
                  onPress={onPressDelete}
                />
              </Box>
            )}
            leftOpenValue={160}
            rightOpenValue={-160}
            onRowDidOpen={onDidSwipe}
            ListHeaderComponent={
              <ListChoresHeader
                sortBy={sortBy}
                selectedMember={selectedMember}
                selectedStatus={selectedStatus}
                onChangeMember={onChangeMember}
                onChangeStatus={onChangeStatus}
                onPressLatestCreate={onPressLatestCreate}
                onPressLatestDeadline={onPressLatestDeadline}
              />
            }
            keyExtractor={(item, index) => index.toString()}
          />
        </Box>
      </Touch>
    </Box>
  );
};

const Touch = styled.TouchableWithoutFeedback`
  flex: 1;
`;

const SwipeDeleteButton = styled(PrimaryButton)`
  width: 80px;
  height: 135px;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #ff4000;
`;

const SwipeUpdateButton = styled(PrimaryButton)`
  width: 80px;
  height: 135px;
  align-items: center;
  justify-content: center;
  background-color: #134db9;
`;

const styles = StyleSheet.create({
  list: {
    paddingBottom: 50,
  },
});

export default ChoresScreen;
