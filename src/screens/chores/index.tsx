import React, {memo} from 'react';
import {Box, FlatList, Menu, Pressable, ScrollView, Text} from 'native-base';
import i18n from '@locales/index';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {Keyboard, StyleSheet} from 'react-native';
import {DummyChores} from '@constants/DummyData';
import HorizontalChoreItem from './shared/HorizontalChoreItem';
import PrimaryButton from '@components/PrimaryButton';
import {filterIcon} from '@constants/sources';
import {Constants} from '@constants/Constants';
import PrimaryIcon from '@components/PrimaryIcon';
import ChoreFilterBox from './shared/ChoreFilterBox';
import ListChoresHeader from './shared/ListChoresHeader';

interface Props {}

const ChoresScreen: React.FC<Props> = ({}) => {
  const onDismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const renderItem = ({item}: {item: any}) => {
    return <HorizontalChoreItem item={item} onPress={onPressItem} />;
  };
  const onPressItem = (item: any) => {};
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
            data={DummyChores}
            ListHeaderComponent={<ListChoresHeader />}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
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
