import React, {useEffect, useState} from 'react';
import {Text, Heading, VStack, Input, Link, Button, HStack} from 'native-base';
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
import {closeIcon} from '@constants/sources/index';
import {useDispatch} from 'react-redux';
import {signInRequestAction} from '@store/actionTypes/signIn';
import {showToastAction} from '@store/actionTypes/session';
import {ToastType} from '@constants/types/session';
import {isNull} from '@utils/index';
import PrimaryButton from '@components/PrimaryButton';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const ManualSignInScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
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
  const onPressSignUp = () => {
    navigate(ScreenName.SignUpScreen);
  };
  const onPressForgotPassword = () => {
    navigate(ScreenName.ForgotPasswordScreen);
  };
  const onPressBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  // Sign in
  const onSignIn = () => {
    dispatch(signInRequestAction({username: email, password: password}));
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
        <Scroll
          scrollEnabled
          overScrollMode="never"
          contentContainerStyle={styles.scrollView}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}>
          <CloseButton
            leftSource={closeIcon}
            leftTintColor={colors.THEME_COLOR_5}
            onPress={onPressBack}
          />
          {/* Header */}
          <Heading mt={20} size="2xl" color={colors.THEME_COLOR_5}>
            {i18n.t('authentication.signIn.signIn')}
          </Heading>
          <Heading color={colors.GRAY} size="xs">
            {i18n.t('authentication.signIn.subWelcome')}
          </Heading>

          {/* Form */}
          <VStack space={2} mt={5}>
            <Input
              color={colors.BLACK}
              borderColor={colors.SILVER}
              keyboardType="email-address"
              onChangeText={onChangeEmail}
              placeholderTextColor={colors.SILVER}
              placeholder={i18n.t('authentication.signIn.accountPlaceHolder')}
            />
            <Input
              mt={3}
              type="password"
              color={colors.BLACK}
              borderColor={colors.SILVER}
              onChangeText={onChangePassword}
              placeholderTextColor={colors.SILVER}
              placeholder={i18n.t('authentication.signIn.password')}
            />
            <Link
              p={1}
              mr={-2}
              alignSelf="flex-end"
              _text={{
                fontSize: 'xs',
                fontWeight: '700',
                color: colors.THEME_COLOR_7,
              }}
              onPress={onPressForgotPassword}>
              {i18n.t('authentication.signIn.forgotPassword')}
            </Link>

            {/* Button */}
            <Button
              mt={2}
              size="lg"
              disabled={isNull(email) || isNull(password)}
              _text={{color: colors.WHITE}}
              onPress={onSignIn}>
              {i18n.t('authentication.signIn.login')}
            </Button>

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
          </VStack>
        </Scroll>
      </Container>
    </SafeView>
  );
};

const Container = styled.TouchableWithoutFeedback``;
const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
`;
const Scroll = styled.ScrollView`
  flex: 1;
`;

const Banner = styled.Image`
  width: 100%;
  align-self: center;
  resize-mode: contain;
`;
const Seperator = styled.Image`
  align-self: center;
  margin-top: 40px;
  margin-bottom: 40px;
  tint-color: ${colors.TEXT};
`;

const CloseButton = styled(PrimaryButton)`
  left: 15px;
  top: ${Platform.OS === 'android' ? getStatusBarHeight() + 10 : 10}px;
  position: absolute;
`;

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default ManualSignInScreen;
