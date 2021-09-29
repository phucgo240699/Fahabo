import React, {useEffect, useState} from 'react';
import {Text, Heading, VStack, Input, Link, Button, HStack} from 'native-base';
import i18n from '@locales/index';
import Colors from '@themes/colors';
import {navigate} from '@navigators/index';
import styled from 'styled-components/native';
import {navigateReset} from '@navigators/index';
import {
  configGoogleSignIn,
  signInWithApple,
  signInWithGoogle,
  signOutWithGoogle,
  signInWithFacebook,
} from '@services/socialAuth';
import {
  Keyboard,
  Platform,
  StyleSheet,
  Alert,
  NativeModules,
} from 'react-native';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import ThirdPartyAuthButton from '@components/ThirdPartyAuthButton';
import {ScreenName, StackName} from '@constants/Constants';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {
  authFamilyBanner,
  appleIcon,
  facebookIcon,
  googleIcon,
  orSeparator,
} from '@constants/sources/index';
import {useDispatch, useSelector} from 'react-redux';
import {showToastAction} from '@store/actionTypes/session';
import {ToastType} from '@constants/types/session';
import {getToastsSelector} from '@store/selectors/session';
import {signInRequest} from '@store/actionTypes/signIn';
import {languageCodeSelector} from '@store/selectors/authentication';

interface Props {}

const SignInScreen: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const languageCode = useSelector(languageCodeSelector);
  const toasts = useSelector(getToastsSelector);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Life cycle
  useEffect(() => {
    configGoogleSignIn();
  }, []);

  // Keyboard
  const onKeyboardDismiss = () => {
    Keyboard.dismiss();
  };
  const onChangeEmail = (text: string) => {
    setEmail(text);
  };
  const onChangePassword = (text: string) => {
    setPassword(text);
  };

  // Navigate
  const navigateToSignUp = () => {
    navigate(ScreenName.SignUpScreen);
  };
  const navigateToForgotPassword = () => {
    navigate(ScreenName.ForgotPasswordScreen);
  };

  // Sign in
  const onSignIn = () => {
    // navigateReset(StackName.MainStack);
    // dispatch(signInRequest({user: email, password: password}));
    const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
        : NativeModules.I18nManager.localeIdentifier;

    console.log(deviceLanguage); //en_US
    console.log(languageCode);
    console.log(i18n.currentLocale());
  };

  // Sign in with Apple
  const onSignInWithApple = () => {
    signInWithApple()
      .then(onSignInWithAppleSuccess)
      .catch(onSignInWithAppleFail);
  };
  const onSignInWithAppleSuccess = (
    userCredential: FirebaseAuthTypes.UserCredential,
  ) => {
    console.log('Sign in with apple successfully:', userCredential);
    navigateReset(StackName.MainStack);
  };
  const onSignInWithAppleFail = (error: any) => {
    Alert.alert('Error', `Fail: ${error}`);
  };

  // Sign in with Google
  const onSignInWithGoogle = () => {
    signInWithGoogle()
      .then(onSignInWithGoogleSuccess)
      .catch(onSignInWithGoogleFail)
      .finally(onSignOutWithGoogle);
  };
  const onSignInWithGoogleSuccess = (
    userCredential: FirebaseAuthTypes.UserCredential,
  ) => {
    console.log('Sign in with apple successfully:', userCredential);
    navigateReset(StackName.MainStack);
  };
  const onSignInWithGoogleFail = (error: any) => {
    Alert.alert('Error', `Fail: ${error}`);
  };
  const onSignOutWithGoogle = async () => {
    await signOutWithGoogle();
  };

  // Sign in with Facebook
  const onSignInWithFacebook = () => {
    signInWithFacebook()
      .then(onSignInWithFacebookSuccess)
      .catch(onSignInWithFacebookFail);
  };
  const onSignInWithFacebookSuccess = (
    userCredential: FirebaseAuthTypes.UserCredential,
  ) => {
    console.log('Sign in with facebook successfully:', userCredential);
    navigateReset(StackName.MainStack);
  };
  const onSignInWithFacebookFail = (error: any) => {
    Alert.alert('Error', `Fail: ${error}`);
  };

  return (
    <SafeView>
      {/* Status Bar */}
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={Colors.WHITE}
        translucent
      />
      <Container onPressOut={onKeyboardDismiss}>
        <Scroll
          scrollEnabled
          overScrollMode="never"
          contentContainerStyle={styles.scrollView}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}>
          {/* Header */}
          <Banner source={authFamilyBanner} />
          <Heading size="2xl" color={Colors.THEME_COLOR_5}>
            {i18n.t('authentication.signIn.welcome')}
          </Heading>
          <Heading color={Colors.GRAY} size="xs">
            {i18n.t('authentication.signIn.subWelcome')}
          </Heading>

          {/* Form */}
          <VStack space={2} mt={5}>
            <Input
              color={Colors.BLACK}
              borderColor={Colors.SILVER}
              keyboardType="email-address"
              onChangeText={onChangeEmail}
              placeholderTextColor={Colors.SILVER}
              placeholder={i18n.t('authentication.signIn.accountPlaceHolder')}
            />
            <Input
              mt={3}
              type="password"
              color={Colors.BLACK}
              borderColor={Colors.SILVER}
              onChangeText={onChangePassword}
              placeholderTextColor={Colors.SILVER}
              placeholder={i18n.t('authentication.signIn.password')}
            />
            <Link
              p={1}
              mr={-2}
              alignSelf="flex-end"
              _text={{
                fontSize: 'xs',
                fontWeight: '700',
                color: Colors.THEME_COLOR_5,
              }}
              onPress={navigateToForgotPassword}>
              {i18n.t('authentication.signIn.forgotPassword')}
            </Link>

            {/* Button */}
            <Button
              size="lg"
              mt={5}
              _text={{color: Colors.WHITE}}
              onPress={onSignIn}>
              {i18n.t('authentication.signIn.login')}
            </Button>

            <Seperator source={orSeparator} />

            {/* Third party Authentication */}
            <HStack alignItems="center" justifyContent="center">
              {Platform.OS === 'ios' && (
                <ThirdPartyAuthButton
                  sourceIcon={appleIcon}
                  onPress={onSignInWithApple}
                />
              )}
              <ThirdPartyAuthButton
                sourceIcon={googleIcon}
                onPress={onSignInWithGoogle}
              />
              <ThirdPartyAuthButton
                sourceIcon={facebookIcon}
                onPress={onSignInWithFacebook}
              />
            </HStack>

            {/* Encourage Sign up */}
            <HStack mt={10} alignItems="center" justifyContent="center">
              <Text fontSize="sm" color={Colors.BLACK} fontWeight={400}>
                {i18n.t('authentication.signIn.signUpLabel')}
              </Text>
              <Link
                p={1}
                _text={{
                  color: Colors.THEME_COLOR_5,
                  bold: true,
                  fontSize: 'sm',
                }}
                onPress={navigateToSignUp}>
                {i18n.t('authentication.signUp.signUp')}
              </Link>
            </HStack>
          </VStack>
        </Scroll>
      </Container>
    </SafeView>
  );
};

const Container = styled.TouchableWithoutFeedback``;
const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.WHITE};
`;
const Scroll = styled.ScrollView`
  flex: 1;
`;

const Banner = styled.Image`
  width: 70%;
  align-self: center;
  resize-mode: contain;
`;
const Seperator = styled.Image`
  align-self: center;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default SignInScreen;
