import React, {useState} from 'react';
import {Text, Heading, VStack, Input, Link, Button, HStack} from 'native-base';
import i18n from '@locales/index';
import colors from '@themes/colors';
import {navigate} from '@navigators/index';
import styled from 'styled-components/native';
import {Keyboard, StyleSheet} from 'react-native';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {ScreenName} from '@constants/Constants';
import {useDispatch} from 'react-redux';
import {signInRequestAction} from '@store/actionTypes/signIn';
import {isNull} from '@utils/index';
import AuthenticationHeader from '@components/AuthenticationHeader';

const ManualSignInScreen = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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

  // Sign in
  const onSignIn = () => {
    dispatch(signInRequestAction({username: email, password: password}));
  };

  return (
    <SafeView>
      <AuthenticationHeader />
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
          {/* Header */}
          <Heading mt={4} size="2xl" color={colors.THEME_COLOR_5}>
            {i18n.t('authentication.signIn.signIn')}
          </Heading>
          <Heading color={colors.GRAY} size="xs">
            {i18n.t('authentication.signIn.subWelcome')}
          </Heading>

          {/* Form */}
          <VStack space={2} mt={5}>
            <Input
              height={50}
              borderRadius={25}
              color={colors.TEXT}
              autoCapitalize="none"
              borderColor={colors.SILVER}
              keyboardType="email-address"
              onChangeText={onChangeEmail}
              placeholderTextColor={colors.SILVER}
              placeholder={i18n.t('authentication.signIn.accountPlaceHolder')}
            />
            <Input
              mt={3}
              height={50}
              borderRadius={25}
              type="password"
              color={colors.TEXT}
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
              borderRadius={28}
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

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default ManualSignInScreen;
