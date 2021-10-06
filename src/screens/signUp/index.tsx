import React, {useEffect, useState} from 'react';
import i18n from '@locales/index';
import styled from 'styled-components/native';
import {Keyboard, Platform, StyleSheet} from 'react-native';
import {navigate} from '@navigators/index';
import {ScreenName} from '@constants/Constants';
import ThirdPartyAuthButton from '@components/ThirdPartyAuthButton';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import AuthenticationHeader from '@components/AuthenticationHeader';
import {
  Heading,
  VStack,
  Input,
  Button,
  HStack,
  FormControl,
  Box,
} from 'native-base';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {
  appleIcon,
  facebookIcon,
  googleIcon,
  orSeparator,
} from '@constants/sources/index';
import colors from '@themes/colors';
import {useDispatch} from 'react-redux';
import {signUpRequestAction} from '@store/actionTypes/signUp';
import {showToastAction} from '@store/actionTypes/session';
import {ToastType} from '@constants/types/session';
import {isNull} from '@utils/index';
import {
  signInWithApple,
  signInWithFacebook,
  signInWithGoogle,
  signOutWithGoogle,
} from '@services/socialAuth';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {AuthType} from '@constants/types/authentication';

interface Props {
  route?: any;
}

const SignUpScreen: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [countryCode, setCountryCode] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState('');

  // useEffect(() => {
  //   if (route && route.params && route.params.countryCode) {
  //     setCountryCode(route.params.countryCode);
  //   }
  // }, [route]);

  // Sign up
  const onSignUp = () => {
    if (password === confirmPassword) {
      dispatch(
        signUpRequestAction({
          email: email,
          name: name,
          password: password,
          authType: AuthType.MANUAL_AUTH,
        }),
      );
    } else {
      dispatch(
        showToastAction(i18n.t('errorMessage.passwordMatch'), ToastType.ERROR),
      );
    }
  };

  // Sign up with Apple
  const onSignUpWithApple = () => {
    signInWithApple()
      .then(onSignInWithAppleSuccess)
      .catch(onSignInWithAppleFail);
  };
  const onSignInWithAppleSuccess = (
    userCredential: FirebaseAuthTypes.UserCredential,
  ) => {
    console.log('Sign in with apple successfully:', userCredential);
    dispatch(
      signUpRequestAction({
        email: userCredential.additionalUserInfo?.profile?.email ?? undefined,
        name: !isNull(userCredential.user.displayName)
          ? userCredential.user.displayName
          : userCredential.additionalUserInfo?.profile?.email ?? undefined,
        password: userCredential.user.uid,
        authType: AuthType.APPLE_AUTH,
      }),
    );
  };
  const onSignInWithAppleFail = (error: any) => {
    console.log(`Sign in with apple fail: ${error}`);
    dispatch(
      showToastAction(`Sign in with apple fail: ${error}`, ToastType.ERROR),
    );
  };

  // Sign up with Google
  const onSignUpWithGoogle = () => {
    signInWithGoogle()
      .then(onSignInWithGoogleSuccess)
      .catch(onSignInWithGoogleFail)
      .finally(onSignOutWithGoogle);
  };
  const onSignInWithGoogleSuccess = (
    userCredential: FirebaseAuthTypes.UserCredential,
  ) => {
    console.log('Sign in with google successfully:', userCredential);
    dispatch(
      signUpRequestAction({
        email: userCredential.additionalUserInfo?.profile?.email ?? undefined,
        name: !isNull(userCredential.user.displayName)
          ? userCredential.user.displayName
          : userCredential.additionalUserInfo?.profile?.email ?? undefined,
        password: userCredential.user.uid,
        authType: AuthType.GOOGLE_AUTH,
      }),
    );
  };
  const onSignInWithGoogleFail = (error: any) => {
    console.log(`Sign in with google fail: ${error}`);
    dispatch(
      showToastAction(`Sign in with google fail: ${error}`, ToastType.ERROR),
    );
  };
  const onSignOutWithGoogle = async () => {
    await signOutWithGoogle();
  };

  // Sign up with Facebook
  const onSignUpWithFacebook = () => {
    signInWithFacebook()
      .then(onSignInWithFacebookSuccess)
      .catch(onSignInWithFacebookFail);
  };
  const onSignInWithFacebookSuccess = (
    userCredential: FirebaseAuthTypes.UserCredential,
  ) => {
    console.log('Sign in with facebook successfully:', userCredential);
    dispatch(
      signUpRequestAction({
        email: userCredential.additionalUserInfo?.profile?.email ?? undefined,
        name: !isNull(userCredential.user.displayName)
          ? userCredential.user.displayName
          : userCredential.additionalUserInfo?.profile?.email ?? undefined,
        password: userCredential.user.uid,
        authType: AuthType.FACEBOOK_AUTH,
      }),
    );
  };
  const onSignInWithFacebookFail = (error: any) => {
    console.log(`Sign in with facebook fail: ${error}`);
    dispatch(
      showToastAction(`Sign in with facebook fail: ${error}`, ToastType.ERROR),
    );
  };

  // On change text
  const onChangeEmail = (text: string) => {
    setEmail(text);
  };
  const onChangeName = (text: string) => {
    setName(text);
  };
  const onChangePassword = (text: string) => {
    setPassword(text);
  };
  const onChangeConfirmPassword = (text: string) => {
    setConfirmPassword(text);
  };
  // const onChangePhoneNumber = (text: string) => {
  //   setPhoneNumber(text);
  // };
  const onPressCountryCode = () => {
    navigate(ScreenName.CountryCodeScreen);
  };

  // Keyboard
  const onPressBackground = () => {
    Keyboard.dismiss();
  };
  return (
    <SafeView>
      <AuthenticationHeader />
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
        translucent
      />
      <Container onPressOut={onPressBackground}>
        <KeyboardAwareScrollView
          enableOnAndroid
          extraHeight={150}
          overScrollMode="never"
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}>
          <Heading mt={4} size="2xl" color={colors.THEME_COLOR_5}>
            {i18n.t('authentication.signUp.signUp')}
          </Heading>
          <Heading color={colors.GRAY} size="xs">
            {i18n.t('authentication.signUp.subWelcome')}
          </Heading>
          {/* </HStack> */}

          {/* Form */}
          <VStack space={2} mt={5}>
            <FormControl>
              <FormControl.Label
                _text={{color: colors.BLACK, fontSize: 'sm', fontWeight: 500}}>
                {`${i18n.t('authentication.signUp.email')} *`}
              </FormControl.Label>
              <Input
                mt={-1}
                isRequired={true}
                color={colors.BLACK}
                autoCapitalize="none"
                borderColor={colors.SILVER}
                keyboardType={'email-address'}
                onChangeText={onChangeEmail}
              />
            </FormControl>

            <FormControl mt={3}>
              <FormControl.Label
                _text={{color: colors.BLACK, fontSize: 'sm', fontWeight: 500}}>
                {`${i18n.t('authentication.signUp.name')} *`}
              </FormControl.Label>
              <Input
                mt={-1}
                color={colors.BLACK}
                autoCapitalize="none"
                borderColor={colors.SILVER}
                onChangeText={onChangeName}
              />
            </FormControl>

            <FormControl mt={3}>
              <FormControl.Label
                _text={{color: colors.BLACK, fontSize: 'sm', fontWeight: 500}}>
                {`${i18n.t('authentication.signUp.password')} *`}
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
                _text={{color: colors.BLACK, fontSize: 'sm', fontWeight: 500}}>
                {`${i18n.t('authentication.signUp.confirmPassword')} *`}
              </FormControl.Label>
              <Input
                mt={-1}
                type="password"
                color={colors.BLACK}
                borderColor={colors.SILVER}
                onChangeText={onChangeConfirmPassword}
              />
            </FormControl>

            {/* <Box mt={3}>
              <FormControl.Label
                _text={{
                  color: colors.BLACK,
                  fontSize: 'sm',
                  fontWeight: 500,
                }}>
                {i18n.t('authentication.signUp.phoneNumber')}
              </FormControl.Label>
              <FormControl flexDirection={'row'}>
                <Button
                  width={20}
                  variant="outline"
                  borderColor={colors.SILVER}
                  _text={{color: colors.TEXT}}
                  onPress={onPressCountryCode}>
                  {countryCode === '' ? '--' : countryCode}
                </Button>
                <Input
                  ml={4}
                  flex={1}
                  color={colors.BLACK}
                  borderColor={colors.SILVER}
                  keyboardType={'number-pad'}
                  // onChangeText={onChangePhoneNumber}
                />
              </FormControl>
            </Box> */}

            {/* Button */}
            <VStack space={2} mt={5}>
              <Button
                _text={{color: colors.WHITE}}
                onPress={onSignUp}
                disabled={
                  isNull(email) ||
                  isNull(name) ||
                  isNull(password) ||
                  isNull(confirmPassword)
                }>
                {i18n.t('authentication.signUp.signUp')}
              </Button>
            </VStack>

            <Seperator source={orSeparator} />

            {/* Third party Authentication */}
            <HStack alignItems="center" justifyContent="center">
              {Platform.OS === 'ios' && (
                <ThirdPartyAuthButton
                  sourceIcon={appleIcon}
                  onPress={onSignUpWithApple}
                />
              )}
              <ThirdPartyAuthButton
                sourceIcon={googleIcon}
                onPress={onSignUpWithGoogle}
              />
              <ThirdPartyAuthButton
                sourceIcon={facebookIcon}
                onPress={onSignUpWithFacebook}
              />
            </HStack>
          </VStack>
        </KeyboardAwareScrollView>
      </Container>
    </SafeView>
  );
};
const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
`;

const Container = styled.TouchableWithoutFeedback``;

const Seperator = styled.Image`
  align-self: center;
  margin-top: 40px;
  margin-bottom: 40px;
  tint-color: ${colors.TEXT};
`;

const Icon = styled.Image`
  width: 32px;
  height: 32px;
  margin-left: 10px;
  tint-color: ${colors.THEME_COLOR_5};
`;

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default SignUpScreen;
