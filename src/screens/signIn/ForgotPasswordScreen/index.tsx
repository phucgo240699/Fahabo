import React, {memo} from 'react';
import i18n from '@locales/index';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {Keyboard, Platform, StyleSheet} from 'react-native';
import {push} from '@navigators/index';
import {ScreenName} from '@constants/Constants';
import AuthenticationHeader from '@components/AuthenticationHeader';
import {Heading, VStack, FormControl, Input, Button, Box} from 'native-base';
import {getStatusBarHeight} from 'react-native-status-bar-height';

interface Props {
  route?: any;
}

const ForgotPasswordScreen: React.FC<Props> = ({route}) => {
  const onNavigateToPinCodeScreen = () => {
    push(ScreenName.PinCodeScreen, {address: 'phucgo240699@gmail.com'});
  };

  const onPressBackground = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeView>
      <Container onPress={onPressBackground}>
        <Content>
          <AuthenticationHeader
            marginTop={Platform.OS === 'android' ? getStatusBarHeight() : 0}
          />
          <Form>
            <Heading mt={14} size="2xl" color={colors.SUNGLOW}>
              {i18n.t('authentication.forgotPassword.forgotPassword')}
            </Heading>
            <Heading color="muted.400" size="xs">
              {route &&
              route.params &&
              route.params.isUsingPhone &&
              route.params.isUsingPhone === true
                ? i18n.t('authentication.forgotPassword.phoneInstruction')
                : i18n.t('authentication.forgotPassword.emailInstruction')}
            </Heading>

            {/* Form */}
            <VStack space={2} mt={5}>
              <FormControl>
                <Input color={colors.BLACK} borderColor={colors.SILVER} />
              </FormControl>

              <VStack space={2} mt={5}>
                <Button
                  _text={{color: 'white'}}
                  onPress={onNavigateToPinCodeScreen}>
                  {i18n.t('authentication.forgotPassword.getPinCode')}
                </Button>
              </VStack>
            </VStack>
          </Form>
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

export default memo(ForgotPasswordScreen);
