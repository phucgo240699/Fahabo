import React, {memo} from 'react';
import styled from 'styled-components/native';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  HStack,
  IconButton,
  Icon,
} from 'native-base';
import i18n from '@locales/index';
import Colors from '@themes/colors';
import {Keyboard} from 'react-native';
import ThirdPartyAuthButton from '@components/ThirdPartyAuthButton';

interface Props {}

const SignUpScreen: React.FC<Props> = () => {
  const onPressBackground = () => {
    Keyboard.dismiss();
  };

  return (
    <Container onPress={onPressBackground}>
      <Box safeArea flex={1} p={2} w="90%" mx="auto">
        <Heading size="2xl" color={Colors.SUNGLOW}>
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
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
              {i18n.t('authentication.signUp.password')}
            </FormControl.Label>
            <Input type="password" />
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
              {i18n.t('authentication.signUp.confirmPassword')}
            </FormControl.Label>
            <Input type="password" />
          </FormControl>

          {/* Button */}
          <VStack space={2} mt={5}>
            <Button backgroundColor={Colors.SUNGLOW} _text={{color: 'white'}}>
              {i18n.t('authentication.signUp.signUp')}
            </Button>
          </VStack>

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

export default memo(SignUpScreen);
