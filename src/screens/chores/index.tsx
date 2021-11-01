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
import {editProfileIcon, plusIcon, trashIcon} from '@constants/sources';
import {MemberType} from '@constants/types/family';
import {ChoreStatus} from '@constants/types/chores';
import {navigate} from '@navigators/index';
import {ScreenName} from '@constants/Constants';

interface Props {}

const ChoresScreen: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const chores = useSelector(choresSelector);
  const focusFamily = useSelector(focusFamilySelector);
  const isRefreshing = useSelector(isRefreshingChoresSelector);
  const [indexSwiped, setIndexSwiped] = useState<string | undefined>(undefined);

  // Search, Filter, Sort
  const [searchText, setSearchText] = useState('');
  const [submitSearchText, setSubmitSearchText] = useState('');
  const [selectedMember, setSelectedMember] = useState<MemberType[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<ChoreStatus[]>([]);
  const [sortBy, setSortBy] = React.useState<'created_at' | 'deadline'>(
    'created_at',
  );

  // Search
  const onChangeSearchText = (text: string) => {
    setSearchText(text);
  };
  const onSubmitSearchText = (text: string) => {
    setSubmitSearchText(text);
    getChores(selectedMember, selectedStatus, sortBy, text);
  };

  const getChores = (
    _assignee: MemberType[],
    _status: ChoreStatus[],
    _sortBy?: string,
    _text?: string,
  ) => {
    if (!isNull(focusFamily?.id)) {
      dispatch(
        getChoresRequestAction({
          showHUD: true,
          familyId: focusFamily?.id,
          assigneeIds: _assignee.map(item => {
            return item.id;
          }),
          statuses: _status,
          sortBy: _sortBy,
          searchText: _text,
        }),
      );
    }
  };
  // Filter & Sort
  const onChangeMember = (member: MemberType) => {
    if (selectedMember.includes(member)) {
      setSelectedMember(
        selectedMember.filter(item => {
          return item.id !== member.id;
        }),
      );
      getChores(
        selectedMember.filter(item => {
          return item.id !== member.id;
        }),
        selectedStatus,
        sortBy,
        submitSearchText,
      );
    } else {
      setSelectedMember([...selectedMember, member]);
      getChores(
        [...selectedMember, member],
        selectedStatus,
        sortBy,
        submitSearchText,
      );
    }
  };
  const onChangeStatus = (status: ChoreStatus) => {
    if (selectedStatus.includes(status)) {
      setSelectedStatus(
        selectedStatus.filter(item => {
          return item !== status;
        }),
      );
      getChores(
        selectedMember,
        selectedStatus.filter(item => {
          return item !== status;
        }),
        sortBy,
        submitSearchText,
      );
    } else {
      setSelectedStatus([...selectedStatus, status]);
      getChores(
        selectedMember,
        [...selectedStatus, status],
        sortBy,
        submitSearchText,
      );
    }
  };

  const onPressLatestCreate = () => {
    setSortBy('created_at');
    getChores(selectedMember, selectedStatus, 'created_at', submitSearchText);
  };

  const onPressLatestDeadline = () => {
    setSortBy('deadline');
    getChores(selectedMember, selectedStatus, 'created_at', submitSearchText);
  };

  // Creation
  const onPressCreateButton = () => {
    if (!isNull(focusFamily?.id)) {
      navigate(ScreenName.CreateChoreScreen, {familyId: focusFamily?.id});
    }
  };

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
            onRowOpen={onDidSwipe}
            ListHeaderComponent={
              <ListChoresHeader
                sortBy={sortBy}
                searchText={searchText}
                selectedMember={selectedMember}
                selectedStatus={selectedStatus}
                onChangeMember={onChangeMember}
                onChangeStatus={onChangeStatus}
                onPressLatestCreate={onPressLatestCreate}
                onPressLatestDeadline={onPressLatestDeadline}
                onChangeSearchText={onChangeSearchText}
                onSubmitSearchText={onSubmitSearchText}
              />
            }
            keyExtractor={(item, index) => index.toString()}
          />
          <CreateButton
            padding={14}
            leftSource={plusIcon}
            leftTintColor={colors.WHITE}
            onPress={onPressCreateButton}
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

const CreateButton = styled(PrimaryButton)`
  right: 14px;
  bottom: 14px;
  position: absolute;
  border-radius: 40px;
  background-color: ${colors.DANUBE};
`;

const styles = StyleSheet.create({
  list: {
    paddingBottom: 80,
  },
});

export default ChoresScreen;
