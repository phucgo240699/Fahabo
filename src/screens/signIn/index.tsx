import React, {memo, useEffect} from 'react';
import {
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
} from 'native-base';
import i18n from '@locales/index';
import Colors from '@themes/colors';
import {push} from '@navigators/index';
import styled from 'styled-components/native';
import {navigateReset} from '@navigators/index';
import {
  configGoogleSignIn,
  signInWithApple,
  signInWithGoogle,
  signOutWithGoogle,
  signInWithFacebook,
} from '@services/socialAuth';
import {Keyboard, Platform, StyleSheet, Alert} from 'react-native';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import ThirdPartyAuthButton from '@components/ThirdPartyAuthButton';
import {ScreenName, StackName} from '@constants/Constants';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

interface Props {}

const SignInScreen: React.FC<Props> = () => {
  //
  // Life cycle
  //
  useEffect(() => {
    configGoogleSignIn();
  }, []);

  //
  // Keyboard
  //
  const onKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  //
  // Navigate
  //
  const navigateToSignUp = () => {
    push(ScreenName.SignUpScreen);
  };
  const navigateToForgotPassword = () => {
    push(ScreenName.ForgotPasswordScreen);
  };

  //
  // Sign in
  //
  const onSignIn = () => {
    navigateReset(StackName.MainStack);
  };

  //
  // Sign in with Apple
  //
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

  //
  // Sign in with Google
  //
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

  //
  // Sign in with Facebook
  //
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
      <Container onPress={onKeyboardDismiss}>
        <Scroll
          scrollEnabled
          overScrollMode="never"
          contentContainerStyle={styles.scrollView}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}>
          {/* Status Bar */}
          <FocusAwareStatusBar
            barStyle="dark-content"
            backgroundColor={Colors.WHITE}
            translucent
          />

          {/* Header */}
          <Banner source={require('@assets/images/auth_family_banner.jpg')} />
          <Heading size="2xl" color={Colors.SUNGLOW}>
            {i18n.t('authentication.signIn.welcome')}
          </Heading>
          <Heading color="muted.400" size="xs">
            {i18n.t('authentication.signIn.subWelcome')}
          </Heading>

          {/* Form */}
          <VStack space={2} mt={5}>
            <FormControl>
              <FormControl.Label
                _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                {i18n.t('authentication.signIn.email')}
              </FormControl.Label>
              <Input color={Colors.BLACK} borderColor={Colors.SILVER} />
            </FormControl>
            <FormControl mb={5}>
              <FormControl.Label
                _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                {i18n.t('authentication.signIn.password')}
              </FormControl.Label>
              <Input
                type="password"
                color={Colors.BLACK}
                borderColor={Colors.SILVER}
              />
              <Link
                mt={1}
                alignSelf="flex-end"
                _text={{
                  fontSize: 'xs',
                  fontWeight: '700',
                  color: Colors.SUNGLOW,
                }}
                onPress={navigateToForgotPassword}>
                {i18n.t('authentication.signIn.forgotPassword')}
              </Link>
            </FormControl>

            {/* Button */}
            <Button
              // backgroundColor={Colors.SUNGLOW}
              _text={{color: 'white'}}
              onPress={onSignIn}>
              {i18n.t('authentication.signIn.login')}
            </Button>

            <Seperator
              source={require('@assets/images/sign_in_seperator.png')}
            />

            {/* Third party Authentication */}
            <HStack alignItems="center" justifyContent="center">
              {Platform.OS === 'ios' && (
                <ThirdPartyAuthButton
                  sourceIcon={require('@assets/images/apple_icon.png')}
                  onPress={onSignInWithApple}
                />
              )}
              <ThirdPartyAuthButton
                sourceIcon={require('@assets/images/google_icon.png')}
                onPress={onSignInWithGoogle}
              />
              <ThirdPartyAuthButton
                sourceIcon={require('@assets/images/facebook_icon.png')}
                onPress={onSignInWithFacebook}
              />
            </HStack>

            {/* Encourage Sign up */}
            <HStack mt={10} justifyContent="center">
              <Text fontSize="sm" color="muted.700" fontWeight={400}>
                {i18n.t('authentication.signIn.signUpLabel')}
              </Text>
              <Link
                _text={{color: Colors.SUNGLOW, bold: true, fontSize: 'sm'}}
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

export default memo(SignInScreen);
