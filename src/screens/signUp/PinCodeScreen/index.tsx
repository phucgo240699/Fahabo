import {Button, Link, Text} from 'native-base';
import i18n from '@locales/index';
import colors from '@themes/colors';
import React, {useEffect, useState} from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import styled from 'styled-components/native';
import {Constants, ScreenName} from '@constants/Constants';
import {Keyboard, StyleSheet} from 'react-native';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import AuthenticationHeader from '@components/AuthenticationHeader';
import {navigate} from '@navigators/index';
import {useDispatch} from 'react-redux';
import {
  getOTPRequestAction,
  verifyUsernameRequestAction,
} from '@store/actionTypes/signUp';
import {isNull} from 'lodash';

interface Props {
  route?: any;
  fromForgotPassword?: boolean;
}

const CELL_COUNT = 6;

const PinCodeScreen: React.FC<Props> = ({route, fromForgotPassword}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [username, setUserName] = useState('');

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    if (route && route.params && route.params.username) {
      setUserName(route.params.username);
    }
  }, [route]);

  const onPressBackground = () => {
    Keyboard.dismiss();
  };

  const onPressVerify = () => {
    if (fromForgotPassword === true) {
      navigate(ScreenName.NewPasswordScreen, {otp: value});
    } else {
      dispatch(verifyUsernameRequestAction({otp: value, username: username}));
    }
  };

  const onPressSendAgain = () => {
    dispatch(getOTPRequestAction({username: 'username'}));
  };

  return (
    <SafeView>
      <Container onPress={onPressBackground}>
        <Content>
          <FocusAwareStatusBar
            barStyle="dark-content"
            backgroundColor={colors.WHITE}
            translucent
          />
          <AuthenticationHeader
            title={i18n.t('authentication.pinCode.pinCode')}
          />
          {username && (
            <Text
              mt={1}
              fontSize="md"
              color={colors.GRAY}
              textAlign="center"
              alignSelf="center">
              {!isNull(username) &&
                `${i18n.t('authentication.pinCode.instruction')}\n ${username}`}
            </Text>
          )}
          <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <PinCell
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </PinCell>
            )}
          />
          <Button
            mt={8}
            size="lg"
            disabled={isNull(value) || value.length < CELL_COUNT}
            _text={{color: colors.WHITE}}
            onPress={onPressVerify}>
            {i18n.t('authentication.pinCode.verify')}
          </Button>
          <Link
            p={1}
            mt={4}
            _text={{
              fontSize: 'sm',
              fontWeight: '700',
              color: colors.THEME_COLOR_7,
            }}
            onPress={onPressSendAgain}>
            {i18n.t('authentication.pinCode.sendBack')}
          </Link>
        </Content>
      </Container>
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
`;
const Container = styled.TouchableWithoutFeedback`
  width: ${Constants.MAX_WIDTH}px;
  height: ${Constants.MAX_HEIGHT}px;
  background-color: ${colors.WHITE};
`;
const Content = styled.View`
  flex: 1;
  align-items: center;
`;
const PinCell = styled.Text``;

const styles = StyleSheet.create({
  codeFieldRoot: {marginTop: 40, alignSelf: 'center'},
  cell: {
    width: 48,
    height: 48,
    margin: 4,
    borderRadius: 12,
    fontSize: 32,
    fontWeight: '700',
    borderWidth: 2,
    borderColor: colors.SILVER,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});

export default PinCodeScreen;
