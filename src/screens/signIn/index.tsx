import React, {memo} from 'react';
import styled from 'styled-components/native';
import {
  Box,
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
import {ScreenName} from '@constants/Constants';
import {Keyboard} from 'react-native';
import Colors from '@themes/colors';
import ThirdPartyAuthButton from '@components/ThirdPartyAuthButton';

interface Props {
  navigation: any;
}

const SignInScreen: React.FC<Props> = ({navigation}) => {
  const onKeyboardDismiss = () => {
    Keyboard.dismiss();
  };
  const navigateToSignUp = () => {
    navigation.navigate(ScreenName.SignUpScreen);
  };

  return (
    <Container onPress={onKeyboardDismiss}>
      <Box safeArea flex={1} p={2} w="90%" mx="auto">
        {/* Header */}
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
            <Input />
          </FormControl>
          <FormControl mb={5}>
            <FormControl.Label
              _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
              {i18n.t('authentication.signIn.password')}
            </FormControl.Label>
            <Input type="password" />
            <Link
              _text={{fontSize: 'xs', fontWeight: '700', color: Colors.SUNGLOW}}
              alignSelf="flex-end"
              mt={1}>
              {i18n.t('authentication.signIn.forgotPassword')}
            </Link>
          </FormControl>

          {/* Button */}
          <Button backgroundColor={Colors.SUNGLOW} _text={{color: 'white'}}>
            {i18n.t('authentication.signIn.login')}
          </Button>

          <Seperator source={require('@assets/images/sign_in_seperator.png')} />

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

          {/* Encourage Sign up */}
          <HStack mt={70} justifyContent="center">
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
      </Box>
    </Container>
  );
};

const Container = styled.TouchableWithoutFeedback``;
const Seperator = styled.Image`
  align-self: center;
  margin-top: 40px;
  margin-bottom: 40px;
`;

export default memo(SignInScreen);
