import React from 'react';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {Platform, StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import ProfileHeader from '@components/ProfileHeader';
import i18n from '@locales/index';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {FlatList} from 'native-base';
import {DummyTransactionCategories} from '@constants/DummyData';
import {Constants, ScreenName} from '@constants/Constants';
import HorizontalTransactionCategoryItem from './shared/HorizontalTransactionCategoryItem';
import TransactionCategoriesFooter from './shared/TransactionCategoriesFooter';
import {navigate} from '@navigators/index';

const TransactionCategoriesScreen = () => {
  const renderItem = ({item}: {item: any}) => {
    return (
      <HorizontalTransactionCategoryItem item={item} onPress={onPressItem} />
    );
  };
  const onPressItem = (item: any) => {
    console.log(item);
  };
  const renderSeparator = () => <HLine />;

  const onPressAdd = () => {
    navigate(ScreenName.CreateTransactionCategoryScreen);
  };

  return (
    <SafeView>
      <FocusAwareStatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={colors.WHITE}
      />
      <ProfileHeader title={i18n.t('transaction.category')} />
      <FlatList
        data={DummyTransactionCategories}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={renderSeparator}
        ListFooterComponent={
          <TransactionCategoriesFooter onPress={onPressAdd} />
        }
      />
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
  margin-top: ${Platform.OS === 'android' ? getStatusBarHeight() : 0}px;
`;

const HLine = styled.View`
  height: 1px;
  opacity: 0.6;
  margin-left: 80px;
  background-color: ${colors.CONCRETE};
  width: ${Constants.MAX_WIDTH - 100}px;
`;

const styles = StyleSheet.create({
  list: {
    paddingBottom: 30,
  },
});

export default TransactionCategoriesScreen;
