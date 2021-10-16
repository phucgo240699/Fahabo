import React, {memo} from 'react';
import {Box, FlatList, ScrollView, Text} from 'native-base';
import i18n from '@locales/index';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {Keyboard, StyleSheet} from 'react-native';
import {DummyChores} from '@constants/DummyData';
import HorizontalChoreItem from './shared/HorizontalChoreItem';

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

const styles = StyleSheet.create({
  list: {
    paddingTop: 10,
    paddingBottom: 50,
  },
});

export default memo(ChoresScreen);
