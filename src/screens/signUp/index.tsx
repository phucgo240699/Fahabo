import React, {useState} from 'react';
import i18n from '@locales/index';
import styled from 'styled-components/native';
import {Keyboard, Platform, StyleSheet} from 'react-native';
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
    signInWithApple().then(onSignInWithAppleSuccess);
  };
  const onSignInWithAppleSuccess = (
    userCredential: FirebaseAuthTypes.UserCredential,
  ) => {
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

  // Sign up with Google
  const onSignUpWithGoogle = () => {
    signInWithGoogle()
      .then(onSignInWithGoogleSuccess)
      .finally(onSignOutWithGoogle);
  };
  const onSignInWithGoogleSuccess = (
    userCredential: FirebaseAuthTypes.UserCredential,
  ) => {
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
  const onSignOutWithGoogle = async () => {
    await signOutWithGoogle();
  };

  // Sign up with Facebook
  const onSignUpWithFacebook = () => {
    signInWithFacebook().then(onSignInWithFacebookSuccess);
  };
  const onSignInWithFacebookSuccess = (
    userCredential: FirebaseAuthTypes.UserCredential,
  ) => {
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
                height={50}
                borderRadius={25}
                isRequired={true}
                color={colors.TEXT}
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
                height={50}
                borderRadius={25}
                color={colors.TEXT}
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
                height={50}
                borderRadius={25}
                type="password"
                color={colors.TEXT}
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
                height={50}
                borderRadius={25}
                type="password"
                color={colors.TEXT}
                borderColor={colors.SILVER}
                onChangeText={onChangeConfirmPassword}
              />
            </FormControl>

            {/* Button */}
            <VStack space={2} mt={5}>
              <Button
                size="lg"
                borderRadius={28}
                onPress={onSignUp}
                disabled={
                  isNull(email) ||
                  isNull(name) ||
                  isNull(password) ||
                  isNull(confirmPassword)
                }
                _text={{color: colors.WHITE}}>
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
