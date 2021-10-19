import React, {useEffect, useState} from 'react';
import i18n from '@locales/index';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import PrimarySearchBar from '@components/PrimarySearchBar';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import AuthenticationHeader from '@components/AuthenticationHeader';
import {navigate} from '@navigators/index';
import {ScreenName} from '@constants/Constants';
import {useDispatch, useSelector} from 'react-redux';
import {getCountryCodeRequestAction} from '@store/actionTypes/signUp';
import {listCountryCodeSelector} from '@store/selectors/authentication';

interface Props {
  route?: any;
}

// const DATA = [
//   {
//     id: '1',
//     countryName: 'England',
//     countryCode: '44',
//   },
//   {
//     id: '2',
//     countryName: 'Viet Nam',
//     countryCode: '84',
//   },
//   {
//     id: '1',
//     countryName: 'England',
//     countryCode: '44',
//   },
//   {
//     id: '1',
//     countryName: 'England',
//     countryCode: '44',
//   },
//   {
//     id: '2',
//     countryName: 'Viet Nam',
//     countryCode: '84',
//   },
//   {
//     id: '1',
//     countryName: 'England',
//     countryCode: '44',
//   },
//   {
//     id: '1',
//     countryName: 'England',
//     countryCode: '44',
//   },
//   {
//     id: '2',
//     countryName: 'Viet Nam',
//     countryCode: '84',
//   },
//   {
//     id: '1',
//     countryName: 'England',
//     countryCode: '44',
//   },
//   {
//     id: '2',
//     countryName: 'Viet Nam',
//     countryCode: '84',
//   },
//   {
//     id: '1',
//     countryName: 'England',
//     countryCode: '44',
//   },
//   {
//     id: '2',
//     countryName: 'Viet Nam',
//     countryCode: '84',
//   },
//   {
//     id: '1',
//     countryName: 'England',
//     countryCode: '44',
//   },
//   {
//     id: '2',
//     countryName: 'Viet Nam',
//     countryCode: '84',
//   },
//   {
//     id: '1',
//     countryName: 'England',
//     countryCode: '44',
//   },
//   {
//     id: '2',
//     countryName: 'Viet Nam',
//     countryCode: '84',
//   },
//   {
//     id: '1',
//     countryName: 'England',
//     countryCode: '44',
//   },
//   {
//     id: '2',
//     countryName: 'Viet Nam',
//     countryCode: '84',
//   },
//   {
//     id: '1',
//     countryName: 'England',
//     countryCode: '44',
//   },
//   {
//     id: '2',
//     countryName: 'Viet Nam',
//     countryCode: '84',
//   },
//   {
//     id: '1',
//     countryName: 'England',
//     countryCode: '44',
//   },
//   {
//     id: '2',
//     countryName: 'Viet Nam',
//     countryCode: '84',
//   },
//   {
//     id: '1',
//     countryName: 'England',
//     countryCode: '44',
//   },
//   {
//     id: '2',
//     countryName: 'Viet Nam',
//     countryCode: '84',
//   },
//   {
//     id: '1',
//     countryName: 'England',
//     countryCode: '44',
//   },
//   {
//     id: '2',
//     countryName: 'Viet Nam',
//     countryCode: '84',
//   },
// ];

const CountryCodeScreen: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();
  // const [currentDATA, setCurrentDATA] = useState(DATA);
  const listCountryCode = useSelector(listCountryCodeSelector);

  useEffect(() => {
    dispatch(getCountryCodeRequestAction());
  }, []);

  const renderSeparator = () => {
    return <HLine />;
  };

  const renderItem = ({item}: {item: any}) => {
    return (
      <ItemContainer
        onPress={() => {
          onPressBack(item[1]);
        }}>
        <ItemText>{item[0]}</ItemText>
        <ItemText>{`+${item[1]}`}</ItemText>
      </ItemContainer>
    );
  };

  // const onSearching = (text: string) => {
  //   setCurrentDATA(
  //     DATA.filter((value, index) => {
  //       return value.countryName.toLowerCase().includes(text.toLowerCase());
  //     }),
  //   );
  // };

  const onPressBack = (countryCode: string) => {
    navigate(ScreenName.SignUpScreen, {countryCode});
  };

  return (
    <SafeView>
      <AuthenticationHeader
        title={i18n.t('authentication.signUp.chooseRegion')}
      />
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
        translucent
      />
      <Container>
        <PrimarySearchBar marginTop={20} /*onChangeText={onSearching}*/ />
        <List
          data={listCountryCode}
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
  padding-top: 15px;
  padding-bottom: 15px;
  flex-direction: row;
  justify-content: space-between;
`;

const ItemText = styled(fonts.PrimaryFontBoldSize14)``;

const HLine = styled.View`
  height: 1px;
  background-color: ${colors.SILVER};
`;

export default CountryCodeScreen;
