import React, {memo} from 'react';
import i18n from '@locales/index';
import Colors from '@themes/colors';
import styled from 'styled-components/native';
import {Keyboard, Platform, StyleSheet} from 'react-native';
import {push} from '@navigators/index';
import {ScreenName} from '@constants/Constants';
import ThirdPartyAuthButton from '@components/ThirdPartyAuthButton';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import AuthenticationHeader from '@components/AuthenticationHeader';
import {Heading, VStack, FormControl, Input, Button, HStack} from 'native-base';
import {getStatusBarHeight} from 'react-native-status-bar-height';

interface Props {}

const SignUpScreen: React.FC<Props> = () => {
  const onSignUp = () => {
    push(ScreenName.PinCodeScreen, {address: 'phucgo240699@gmail.com'});
  };

  const onPressBackground = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeView>
      <Container onPress={onPressBackground}>
        <Content>
          <AuthenticationHeader
            marginTop={Platform.OS === 'android' ? getStatusBarHeight() : 0}
          />
          <Scroll
            scrollEnabled
            overScrollMode="never"
            alwaysBounceVertical={false}
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}>
            <FocusAwareStatusBar
              barStyle="dark-content"
              backgroundColor={Colors.WHITE}
              translucent
            />
            <Heading mt={14} size="2xl" color={Colors.SUNGLOW}>
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
                  _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                  {i18n.t('authentication.signUp.email')}
                </FormControl.Label>
                <Input color={Colors.BLACK} borderColor={Colors.SILVER} />
              </FormControl>
              <FormControl>
                <FormControl.Label
                  _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                  {i18n.t('authentication.signUp.password')}
                </FormControl.Label>
                <Input
                  type="password"
                  color={Colors.BLACK}
                  borderColor={Colors.SILVER}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label
                  _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                  {i18n.t('authentication.signUp.confirmPassword')}
                </FormControl.Label>
                <Input
                  type="password"
                  color={Colors.BLACK}
                  borderColor={Colors.SILVER}
                />
              </FormControl>

              {/* Button */}
              <VStack space={2} mt={5}>
                <Button
                  // backgroundColor={Colors.SUNGLOW}
                  _text={{color: 'white'}}
                  onPress={onSignUp}>
                  {i18n.t('authentication.signUp.signUp')}
                </Button>
              </VStack>

              <Seperator
                source={require('@assets/images/sign_in_seperator.png')}
              />

              {/* Third party Authentication */}
              <HStack alignItems="center" justifyContent="center">
                <ThirdPartyAuthButton
                  sourceIcon={require('@assets/images/apple_icon.png')}
                />
                <ThirdPartyAuthButton
                  sourceIcon={require('@assets/images/google_icon.png')}
                />
                <ThirdPartyAuthButton
                  sourceIcon={require('@assets/images/facebook_icon.png')}
                />
              </HStack>
            </VStack>
          </Scroll>
        </Content>
      </Container>
    </SafeView>
  );
};

const Container = styled.TouchableWithoutFeedback``;
const Content = styled.View`
  flex: 1;
`;
const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.WHITE};
`;
const Scroll = styled.ScrollView`
  flex: 1;
`;

const Seperator = styled.Image`
  align-self: center;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const Icon = styled.Image`
  width: 32px;
  height: 32px;
  margin-left: 10px;
  tint-color: ${Colors.SUNGLOW};
`;

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default memo(SignUpScreen);
