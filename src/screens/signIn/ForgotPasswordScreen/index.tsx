import React, {useState} from 'react';
import i18n from '@locales/index';
import colors from '@themes/colors';
import {Keyboard} from 'react-native';
import {navigate} from '@navigators/index';
import styled from 'styled-components/native';
import {ScreenName} from '@constants/Constants';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import AuthenticationHeader from '@components/AuthenticationHeader';
import {Heading, VStack, FormControl, Input, Button} from 'native-base';
import {isNull} from 'lodash';

interface Props {
  route?: any;
}

const ForgotPasswordScreen: React.FC<Props> = ({route}) => {
  const [username, setUserName] = useState('');

  const onNavigateToPinCodeScreen = () => {
    navigate(ScreenName.PinCodeScreen, {
      username: 'phucgo240699@gmail.com',
      fromForgotPassword: true,
    });
  };

  const onPressBackground = () => {
    Keyboard.dismiss();
  };

  const onChangeUsername = (text: string) => {
    setUserName(text);
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
          <AuthenticationHeader />
          <Form>
            <Heading mt={14} size="2xl" color={colors.THEME_COLOR_5}>
              {i18n.t('authentication.forgotPassword.forgotPassword')}
            </Heading>
            <Heading color={colors.GRAY} size="xs">
              {i18n.t('authentication.forgotPassword.instruction')}
            </Heading>

            {/* Form */}
            <VStack space={2} mt={5}>
              <FormControl>
                <Input
                  color={colors.BLACK}
                  borderColor={colors.SILVER}
                  onChangeText={onChangeUsername}
                />
              </FormControl>

              <VStack space={2} mt={5}>
                <Button
                  size="lg"
                  disabled={isNull(username)}
                  _text={{color: colors.WHITE}}
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

export default ForgotPasswordScreen;
