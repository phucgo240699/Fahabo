import React, {useState} from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import PrimaryButton from '@components/PrimaryButton';
import {navigate} from '@navigators/index';
import {Constants, ScreenName} from '@constants/Constants';
import PrimaryHeader from '@components/PrimaryHeader';
import i18n from '@locales/index';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {DummyCuisinePosts} from '@constants/DummyData';
import HorizontalCuisinePostItem from './shared/HorizontalCuisinePostItem';
import {FlatList} from 'native-base';

const CuisinePostsScreen = () => {
  const [searchText, setSearchText] = useState('');

  // Search
  const onChangeSearchText = (value: string) => {
    setSearchText(value);
  };
  const onSubmitSearchText = (value: string) => {
    // TODO: Search Request
  };

  // Item
  const renderItem = ({item}: {item: any}) => {
    return <HorizontalCuisinePostItem item={item} />;
  };

  const onPressCreate = () => {
    navigate(ScreenName.CreateCuisinePostScreen);
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
      <FlatList
        data={DummyCuisinePosts}
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

export default CuisinePostsScreen;
