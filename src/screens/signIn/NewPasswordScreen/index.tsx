import React from 'react';
import i18n from '@locales/index';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {Keyboard, Platform} from 'react-native';
import {VStack, FormControl, Input, Button} from 'native-base';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import AuthenticationHeader from '@components/AuthenticationHeader';

interface Props {
  route?: any;
}

const NewPasswordScreen: React.FC<Props> = ({route}) => {
  const onPressBackground = () => {
    Keyboard.dismiss();
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
            marginTop={Platform.OS === 'android' ? getStatusBarHeight() : 0}
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
              />
            </FormControl>
            <Button mt={5} size="lg" _text={{color: colors.WHITE}}>
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
