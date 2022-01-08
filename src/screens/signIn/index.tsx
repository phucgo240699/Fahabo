import React, {useEffect} from 'react';
import {Text, Link, HStack, ScrollView} from 'native-base';
import i18n from '@locales/index';
import colors from '@themes/colors';
import {navigate} from '@navigators/index';
import styled from 'styled-components/native';
import {
  configGoogleSignIn,
  signInWithApple,
  signInWithGoogle,
  signOutWithGoogle,
  signInWithFacebook,
} from '@services/socialAuth';
import {Keyboard, Platform, StyleSheet} from 'react-native';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {ScreenName} from '@constants/Constants';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {
  authFamilyBanner,
  appleIcon,
  facebookIcon,
  googleIcon,
} from '@constants/sources/index';
import {useDispatch} from 'react-redux';
import {signInRequestAction} from '@store/actionTypes/signIn';
import SecondaryButton from '@components/SecondaryButton';
import PrimaryIcon from '@components/PrimaryIcon';

const SignInScreen = () => {
  const dispatch = useDispatch();

  // Life cycle
  useEffect(() => {
    configGoogleSignIn();
  }, []);

  // Keyboard
  const onKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  // Navigate
  const onPressLoginManually = () => {
    navigate(ScreenName.ManualSignInScreen);
  };
  const onPressSignUp = () => {
    navigate(ScreenName.SignUpScreen);
  };

  // Sign in with Apple
  const onSignInWithApple = () => {
    signInWithApple().then(onSignInWithAppleSuccess);
  };
  const onSignInWithAppleSuccess = (
    userCredential: FirebaseAuthTypes.UserCredential,
  ) => {
    dispatch(
      signInRequestAction({
        username:
          userCredential.additionalUserInfo?.profile?.email ?? undefined,
        password: userCredential.user.uid,
      }),
    );
  };

  // Sign in with Google
  const onSignInWithGoogle = () => {
    signInWithGoogle()
      .then(onSignInWithGoogleSuccess)
      .finally(onSignOutWithGoogle);
  };
  const onSignInWithGoogleSuccess = (
    userCredential: FirebaseAuthTypes.UserCredential,
  ) => {
    dispatch(
      signInRequestAction({
        username:
          userCredential.additionalUserInfo?.profile?.email ?? undefined,
        password: userCredential.user.uid,
      }),
    );
  };
  const onSignOutWithGoogle = async () => {
    await signOutWithGoogle();
  };

  // Sign in with Facebook
  const onSignInWithFacebook = () => {
    signInWithFacebook().then(onSignInWithFacebookSuccess);
  };
  const onSignInWithFacebookSuccess = (
    userCredential: FirebaseAuthTypes.UserCredential,
  ) => {
    dispatch(
      signInRequestAction({
        username:
          userCredential.additionalUserInfo?.profile?.email ?? undefined,
        password: userCredential.user.uid,
      }),
    );
  };

  return (
    <SafeView>
      {/* Status Bar */}
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
        translucent
      />
      <Container onPressOut={onKeyboardDismiss}>
        <ScrollView
          flex={1}
          scrollEnabled
          overScrollMode="never"
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}>
          <Banner source={authFamilyBanner} />

          <ButtonArea>
            <SecondaryButton
              // leftIcon={<EmptyIconView />}
              title={i18n.t('authentication.signIn.manualSignIn')}
              onPress={onPressLoginManually}
            />
            {Platform.OS === 'ios' && (
              <SecondaryButton
                marginTop={10}
                backgroundColor={colors.BLACK}
                leftIcon={
                  <PrimaryIcon
                    width={36}
                    height={36}
                    tintColor={colors.WHITE}
                    source={appleIcon}
                  />
                }
                title={i18n.t('authentication.signIn.appleSignIn')}
                onPress={onSignInWithApple}
              />
            )}
            <SecondaryButton
              marginTop={10}
              titleColor={'#ffffff'}
              backgroundColor={'#4680ec'}
              leftIcon={
                <WhiteIconWrapper>
                  <PrimaryIcon width={36} height={36} source={googleIcon} />
                </WhiteIconWrapper>
              }
              title={i18n.t('authentication.signIn.googleSignIn')}
              onPress={onSignInWithGoogle}
            />
            <SecondaryButton
              marginTop={10}
              titleColor={'#ffffff'}
              backgroundColor={'#324f9a'}
              leftIcon={
                <WhiteIconWrapper>
                  <PrimaryIcon width={36} height={36} source={facebookIcon} />
                </WhiteIconWrapper>
              }
              title={i18n.t('authentication.signIn.facebookSignIn')}
              onPress={onSignInWithFacebook}
            />
          </ButtonArea>

          {/* Encourage Sign up */}
          <HStack mt={10} alignItems="center" justifyContent="center">
            <Text fontSize="sm" color={colors.BLACK} fontWeight={400}>
              {i18n.t('authentication.signIn.signUpLabel')}
            </Text>
            <Link
              p={1}
              _text={{
                color: colors.THEME_COLOR_7,
                bold: true,
                fontSize: 'sm',
              }}
              onPress={onPressSignUp}>
              {i18n.t('authentication.signIn.signUp')}
            </Link>
          </HStack>
        </ScrollView>
      </Container>
    </SafeView>
  );
};

const Container = styled.TouchableWithoutFeedback``;
const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
`;

const Banner = styled.Image`
  width: 100%;
  align-self: center;
  resize-mode: contain;
`;

const WhiteIconWrapper = styled.View`
  border-radius: 18px;
  background-color: #ffffff;
`;

const ButtonArea = styled.View`
  margin-top: 50px;
  margin-left: 20px;
  margin-right: 20px;
  max-width: 340px;
`;

const EmptyIconView = styled.View`
  width: 36px;
  height: 36px;
`;

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default SignInScreen;
