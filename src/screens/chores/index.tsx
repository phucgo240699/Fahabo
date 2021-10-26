import React, {memo, useState} from 'react';
import {Box, FlatList} from 'native-base';
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
import fonts from '@themes/fonts';
import {editProfileIcon, trashIcon} from '@constants/sources';
import {MemberType} from '@constants/types/family';
import {ChoreStatus} from '@constants/types/chores';

interface Props {}

const ChoresScreen: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const chores = useSelector(choresSelector);
  const focusFamily = useSelector(focusFamilySelector);
  const isRefreshing = useSelector(isRefreshingChoresSelector);
  const [indexSwiped, setIndexSwiped] = useState<string | undefined>(undefined);
  const [selectedMember, setSelectedMember] = useState<MemberType | undefined>(
    undefined,
  );
  const [selectedStatus, setSelectedStatus] = useState<ChoreStatus | undefined>(
    undefined,
  );

  const onDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // Refresh & Load More
  const onRefreshData = () => {
    if (isRefreshing === false && !isNull(focusFamily?.id)) {
      dispatch(getChoresRequestAction({familyId: focusFamily?.id}));
    }
  };

  // Filter & Sort
  const onChangeMember = (member: MemberType) => {
    if (!isNull(focusFamily?.id) && !isNull(member.id)) {
      if (selectedMember?.id === member.id) {
        setSelectedMember(undefined);
        dispatch(
          getChoresRequestAction({
            showHUD: true,
            familyId: focusFamily?.id,
            assigneeIds: [],
          }),
        );
      } else {
        setSelectedMember(member);
        dispatch(
          getChoresRequestAction({
            showHUD: true,
            familyId: focusFamily?.id,
            assigneeIds: [member.id],
          }),
        );
      }
    }
  };
  const onChangeStatus = (status: ChoreStatus) => {
    if (!isNull(focusFamily?.id) && !isNull(status)) {
      if (selectedStatus === status) {
        setSelectedStatus(undefined);
        dispatch(
          getChoresRequestAction({
            showHUD: true,
            familyId: focusFamily?.id,
            statuses: [],
          }),
        );
      } else {
        setSelectedStatus(status);
        dispatch(
          getChoresRequestAction({
            showHUD: true,
            familyId: focusFamily?.id,
            statuses: [status],
          }),
        );
      }
    }
  };

  // Item
  const renderItem = ({item}: {item: any}) => {
    return <HorizontalChoreItem item={item} onPress={onPressItem} />;
  };
  const onPressItem = (item: any) => {
    console.log(selectedMember);
  };
  const onPressDelete = () => {
    if (indexSwiped) {
      for (let i = 0; i < chores.length; ++i) {
        if (i.toString() === indexSwiped) {
          dispatch(deleteChoreRequestAction({choreId: chores[i].id}));
        }
      }
    }
  };
  const onPressUpdate = () => {
    // if (indexSwiped) {
    //   for (let i = 0; i < chores.length; ++i) {
    //     if (i.toString() === indexSwiped) {
    //     }
    //   }
    // }
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
                mr={30}
                height={'100%'}
                flexDirection="row"
                alignItems="center"
                justifyContent="flex-end">
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
                selectedMember={selectedMember}
                selectedStatus={selectedStatus}
                onChangeMember={onChangeMember}
                onChangeStatus={onChangeStatus}
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
  background-color: ${colors.RED_1};
`;

const SwipeUpdateButton = styled(PrimaryButton)`
  width: 80px;
  height: 135px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.SAPPHIRE};
`;

const SwipeTextItem = styled(fonts.PrimaryFontRegularSize16)`
  color: #ffffff;
  background-color: ${colors.SAPPHIRE};
`;

const styles = StyleSheet.create({
  list: {
    paddingBottom: 50,
  },
});

export default memo(ChoresScreen);
