import React, {useState} from 'react';
import i18n from '@locales/index';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import {Platform, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import AuthenticationHeader from '@components/AuthenticationHeader';
import PrimarySearchBar from '@components/PrimarySearchBar';

interface Props {
  route?: any;
}

const DATA = [
  {
    id: '1',
    countryName: 'England',
    countryCode: '44',
  },
  {
    id: '2',
    countryName: 'Viet Nam',
    countryCode: '84',
  },
  {
    id: '1',
    countryName: 'England',
    countryCode: '44',
  },
  {
    id: '1',
    countryName: 'England',
    countryCode: '44',
  },
  {
    id: '2',
    countryName: 'Viet Nam',
    countryCode: '84',
  },
  {
    id: '1',
    countryName: 'England',
    countryCode: '44',
  },
  {
    id: '1',
    countryName: 'England',
    countryCode: '44',
  },
  {
    id: '2',
    countryName: 'Viet Nam',
    countryCode: '84',
  },
  {
    id: '1',
    countryName: 'England',
    countryCode: '44',
  },
  {
    id: '2',
    countryName: 'Viet Nam',
    countryCode: '84',
  },
  {
    id: '1',
    countryName: 'England',
    countryCode: '44',
  },
  {
    id: '2',
    countryName: 'Viet Nam',
    countryCode: '84',
  },
  {
    id: '1',
    countryName: 'England',
    countryCode: '44',
  },
  {
    id: '2',
    countryName: 'Viet Nam',
    countryCode: '84',
  },
  {
    id: '1',
    countryName: 'England',
    countryCode: '44',
  },
  {
    id: '2',
    countryName: 'Viet Nam',
    countryCode: '84',
  },
  {
    id: '1',
    countryName: 'England',
    countryCode: '44',
  },
  {
    id: '2',
    countryName: 'Viet Nam',
    countryCode: '84',
  },
  {
    id: '1',
    countryName: 'England',
    countryCode: '44',
  },
  {
    id: '2',
    countryName: 'Viet Nam',
    countryCode: '84',
  },
  {
    id: '1',
    countryName: 'England',
    countryCode: '44',
  },
  {
    id: '2',
    countryName: 'Viet Nam',
    countryCode: '84',
  },
  {
    id: '1',
    countryName: 'England',
    countryCode: '44',
  },
  {
    id: '2',
    countryName: 'Viet Nam',
    countryCode: '84',
  },
  {
    id: '1',
    countryName: 'England',
    countryCode: '44',
  },
  {
    id: '2',
    countryName: 'Viet Nam',
    countryCode: '84',
  },
];

const CountryCodeScreen: React.FC<Props> = ({route}) => {
  const [currentDATA, setCurrentDATA] = useState(DATA);

  const renderSeparator = () => {
    return <HLine />;
  };

  const renderItem = ({item}: {item: any}) => {
    return (
      <ItemContainer>
        <ItemText>{item.countryName}</ItemText>
        <ItemText>{`+${item.countryCode}`}</ItemText>
      </ItemContainer>
    );
  };

  const onSearching = (text: string) => {
    setCurrentDATA(
      DATA.filter((value, index) => {
        return value.countryName.toLowerCase().includes(text.toLowerCase());
      }),
    );
  };

  return (
    <SafeView>
      <AuthenticationHeader
        title={i18n.t('authentication.signUp.chooseRegion')}
        marginTop={Platform.OS === 'android' ? getStatusBarHeight() : 0}
      />
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
        translucent
      />
      <Container>
        <PrimarySearchBar marginTop={20} onChangeText={onSearching} />
        <List
          data={currentDATA}
          renderItem={renderItem}
          keyboardDismissMode="on-drag"
          ItemSeparatorComponent={renderSeparator}
          keyExtractor={(item, index) => index.toString()}
        />
      </Container>
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
`;

const Container = styled.View`
  flex: 1;
  padding-left: 14px;
  padding-right: 14px;
  padding-bottom: 30px;
`;

const List = styled.FlatList`
  margin-top: 20px;
`;

const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
`;

const ItemText = styled(fonts.PrimaryFontBoldSize14)``;

const HLine = styled.View`
  height: 1px;
  margin-top: 15px;
  margin-bottom: 15px;
  background-color: ${colors.SILVER};
`;

export default CountryCodeScreen;
