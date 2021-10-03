import React, {useState} from 'react';
import i18n from '@locales/index';
import colors from '@themes/colors';
import {Keyboard} from 'react-native';
import styled from 'styled-components/native';
import {VStack, FormControl, Input, Button} from 'native-base';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import AuthenticationHeader from '@components/AuthenticationHeader';
import {useDispatch} from 'react-redux';
import {forgotPasswordRequestAction} from '@store/actionTypes/signUp';
import {isNull} from '@utils/index';
import {ToastType} from '@constants/types/session';
import {showToastAction} from '@store/actionTypes/session';

interface Props {
  route?: any;
}

const NewPasswordScreen: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onPressBackground = () => {
    Keyboard.dismiss();
  };

  const onChangePassword = (text: string) => {
    setPassword(text);
  };

  const onChangeConfirmPassword = (text: string) => {
    setConfirmPassword(text);
  };

  const onPressChangePassword = () => {
    if (password === confirmPassword) {
      if (route && route.params && route.params.otp) {
        dispatch(
          forgotPasswordRequestAction({
            otp: route.params.otp,
            newPassword: password,
          }),
        );
      }
    } else {
      dispatch(
        showToastAction(i18n.t('errorMessage.passwordMatch'), ToastType.ERROR),
      );
    }
  };

  return (
    <SafeView>
      {/* Status Bar */}
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
        translucent
      />
      <Container onPress={onPressBackground}>
        <Content>
          <AuthenticationHeader
            title={i18n.t('authentication.forgotPassword.enterNewPassword')}
          />

          <VStack space={2} m={5}>
            <FormControl mt={2}>
              <FormControl.Label
                _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 500}}>
                {`${i18n.t('authentication.forgotPassword.newPassword')} *`}
              </FormControl.Label>
              <Input
                mt={-1}
                type="password"
                color={colors.BLACK}
                borderColor={colors.SILVER}
                onChangeText={onChangePassword}
              />
            </FormControl>

            <FormControl mt={3}>
              <FormControl.Label
                _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 500}}>
                {`${i18n.t(
                  'authentication.forgotPassword.confirmNewPassword',
                )} *`}
              </FormControl.Label>
              <Input
                mt={-1}
                type="password"
                color={colors.BLACK}
                borderColor={colors.SILVER}
                onChangeText={onChangeConfirmPassword}
              />
            </FormControl>
            <Button
              mt={5}
              size="lg"
              _text={{color: colors.WHITE}}
              disabled={isNull(password) || isNull(confirmPassword)}
              onPress={onPressChangePassword}>
              {i18n.t('authentication.forgotPassword.changePassword')}
            </Button>
          </VStack>
        </Content>
      </Container>
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
`;
const Container = styled.TouchableWithoutFeedback``;
const Content = styled.View`
  flex: 1;
`;
const Form = styled.View`
  margin-left: 20px;
  margin-right: 20px;
`;

export default NewPasswordScreen;
