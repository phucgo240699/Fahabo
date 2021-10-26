import React, {memo} from 'react';
import {Box, FlatList} from 'native-base';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {Keyboard, RefreshControl, StyleSheet} from 'react-native';
import HorizontalChoreItem from './shared/HorizontalChoreItem';
import PrimaryButton from '@components/PrimaryButton';
import ListChoresHeader from './shared/ListChoresHeader';
import {useDispatch, useSelector} from 'react-redux';
import {choresSelector} from '@store/selectors/chores';
import {isRefreshingChoresSelector} from '@store/selectors/session';
import {getChoresRequestAction} from '@store/actionTypes/chores';
import {focusFamilySelector} from '@store/selectors/family';
import {isNull} from '@utils/index';

interface Props {}

const ChoresScreen: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const chores = useSelector(choresSelector);
  const focusFamily = useSelector(focusFamilySelector);
  const isRefreshing = useSelector(isRefreshingChoresSelector);

  const onDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // Refresh & Load More
  const onRefreshData = () => {
    if (isRefreshing === false && !isNull(focusFamily?.id)) {
      dispatch(getChoresRequestAction({familyId: focusFamily?.id}));
    }
  };

  // Item
  const renderItem = ({item}: {item: any}) => {
    return <HorizontalChoreItem item={item} onPress={onPressItem} />;
  };
  const onPressItem = (item: any) => {
    console.log(chores.length);
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
          <FlatList
            data={chores}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefreshData}
              />
            }
            ListHeaderComponent={<ListChoresHeader />}
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

const FilterButton = styled(PrimaryButton)`
  margin-top: 10px;
  margin-right: 20px;
  align-self: flex-end;
`;

const styles = StyleSheet.create({
  list: {
    paddingBottom: 50,
  },
});

export default memo(ChoresScreen);
