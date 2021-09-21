import React from 'react';
import i18n from '@locales/index';
import Colors from '@themes/colors';
import styled from 'styled-components/native';
import {Keyboard, Platform, StyleSheet} from 'react-native';
import {navigate} from '@navigators/index';
import {ScreenName} from '@constants/Constants';
import ThirdPartyAuthButton from '@components/ThirdPartyAuthButton';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import AuthenticationHeader from '@components/AuthenticationHeader';
import {Heading, VStack, Input, Button, HStack} from 'native-base';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {
  appleIcon,
  facebookIcon,
  googleIcon,
  orSeparator,
} from '@constants/sources/index';

interface Props {}

const SignUpScreen: React.FC<Props> = () => {
  const onSignUp = () => {
    navigate(ScreenName.PinCodeScreen, {address: 'phucgo240699@gmail.com'});
  };

  const onPressBackground = () => {
    Keyboard.dismiss();
  };
  return (
    <SafeView>
      <AuthenticationHeader
        marginTop={Platform.OS === 'android' ? getStatusBarHeight() : 0}
      />
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={Colors.WHITE}
        translucent
      />
      <Container onPressOut={onPressBackground}>
        <KeyboardAwareScrollView
          enableOnAndroid
          extraHeight={140}
          overScrollMode="never"
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}>
          <Heading mt={14} size="2xl" color={Colors.THEME_COLOR_5}>
            {i18n.t('authentication.signUp.signUp')}
          </Heading>
          <Heading color="muted.400" size="xs">
            {i18n.t('authentication.signUp.subWelcome')}
          </Heading>
          {/* </HStack> */}

          {/* Form */}
          <VStack space={2} mt={5}>
            <Input
              color={Colors.BLACK}
              borderColor={Colors.SILVER}
              placeholderTextColor={Colors.SILVER}
              placeholder={i18n.t('authentication.signUp.accountPlaceHolder')}
            />
            <Input
              mt={3}
              color={Colors.BLACK}
              borderColor={Colors.SILVER}
              placeholderTextColor={Colors.SILVER}
              placeholder={i18n.t('authentication.signUp.name')}
            />
            <Input
              mt={3}
              type="password"
              color={Colors.BLACK}
              borderColor={Colors.SILVER}
              placeholderTextColor={Colors.SILVER}
              placeholder={i18n.t('authentication.signUp.password')}
            />
            <Input
              mt={3}
              type="password"
              color={Colors.BLACK}
              borderColor={Colors.SILVER}
              placeholderTextColor={Colors.SILVER}
              placeholder={i18n.t('authentication.signUp.confirmPassword')}
            />

            {/* Button */}
            <VStack space={2} mt={5}>
              <Button _text={{color: Colors.WHITE}} onPress={onSignUp}>
                {i18n.t('authentication.signUp.signUp')}
              </Button>
            </VStack>

            <Seperator source={orSeparator} />

            {/* Third party Authentication */}
            <HStack alignItems="center" justifyContent="center">
              {Platform.OS === 'ios' && (
                <ThirdPartyAuthButton sourceIcon={appleIcon} />
              )}
              <ThirdPartyAuthButton sourceIcon={googleIcon} />
              <ThirdPartyAuthButton sourceIcon={facebookIcon} />
            </HStack>
          </VStack>
        </KeyboardAwareScrollView>
      </Container>
    </SafeView>
  );
};
const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.WHITE};
`;

const Container = styled.TouchableWithoutFeedback``;

const Seperator = styled.Image`
  align-self: center;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const Icon = styled.Image`
  width: 32px;
  height: 32px;
  margin-left: 10px;
  tint-color: ${Colors.THEME_COLOR_5};
`;

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default SignUpScreen;
