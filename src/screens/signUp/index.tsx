import React, {useState} from 'react';
import i18n from '@locales/index';
import Colors from '@themes/colors';
import styled from 'styled-components/native';
import {Keyboard, Platform, StyleSheet} from 'react-native';
import {navigate} from '@navigators/index';
import {ScreenName} from '@constants/Constants';
import ThirdPartyAuthButton from '@components/ThirdPartyAuthButton';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import AuthenticationHeader from '@components/AuthenticationHeader';
import {Heading, VStack, Input, Button, HStack, FormControl} from 'native-base';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {
  appleIcon,
  facebookIcon,
  googleIcon,
  orSeparator,
} from '@constants/sources/index';
import ComboboxButton from '@components/ComboboxButton';

interface Props {}

const SignUpScreen: React.FC<Props> = () => {
  const [countryCode, setCountryCode] = useState('--');

  const onSignUp = () => {
    navigate(ScreenName.PinCodeScreen, {address: 'phucgo240699@gmail.com'});
  };

  const navigateToCountryCode = () => {
    navigate(ScreenName.CountryCodeScreen);
  };

  const onPressBackground = () => {
    Keyboard.dismiss();
  };
  return (
    <SafeView>
      <AuthenticationHeader />
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={Colors.WHITE}
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
          <Heading mt={14} size="2xl" color={Colors.THEME_COLOR_5}>
            {i18n.t('authentication.signUp.signUp')}
          </Heading>
          <Heading color="muted.400" size="xs">
            {i18n.t('authentication.signUp.subWelcome')}
          </Heading>
          {/* </HStack> */}

          {/* Form */}
          <VStack space={2} mt={5}>
            <FormControl>
              <FormControl.Label
                _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 500}}>
                {`${i18n.t('authentication.signUp.email')} *`}
              </FormControl.Label>
              <Input
                mt={-1}
                isRequired={true}
                color={Colors.BLACK}
                borderColor={Colors.SILVER}
                keyboardType={'email-address'}
              />
            </FormControl>

            <FormControl mt={3}>
              <FormControl.Label
                _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 500}}>
                {i18n.t('authentication.signUp.chooseRegion')}
              </FormControl.Label>
              <ComboboxButton
                marginTop={-3}
                value={countryCode}
                onPress={navigateToCountryCode}
              />
            </FormControl>

            <FormControl mt={3}>
              <FormControl.Label
                _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 500}}>
                {i18n.t('authentication.signUp.phoneNumber')}
              </FormControl.Label>
              <Input
                mt={-1}
                color={Colors.BLACK}
                borderColor={Colors.SILVER}
                keyboardType={'number-pad'}
              />
            </FormControl>

            <FormControl mt={3}>
              <FormControl.Label
                _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 500}}>
                {`${i18n.t('authentication.signUp.name')} *`}
              </FormControl.Label>
              <Input mt={-1} color={Colors.BLACK} borderColor={Colors.SILVER} />
            </FormControl>

            <FormControl mt={3}>
              <FormControl.Label
                _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 500}}>
                {`${i18n.t('authentication.signUp.password')} *`}
              </FormControl.Label>
              <Input
                mt={-1}
                type="password"
                color={Colors.BLACK}
                borderColor={Colors.SILVER}
              />
            </FormControl>

            <FormControl mt={3}>
              <FormControl.Label
                _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 500}}>
                {`${i18n.t('authentication.signUp.confirmPassword')} *`}
              </FormControl.Label>
              <Input
                mt={-1}
                type="password"
                color={Colors.BLACK}
                borderColor={Colors.SILVER}
              />
            </FormControl>

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
