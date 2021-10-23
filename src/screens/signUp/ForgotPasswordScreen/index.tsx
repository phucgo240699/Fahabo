import React, {useState} from 'react';
import i18n from '@locales/index';
import colors from '@themes/colors';
import {Keyboard} from 'react-native';
import styled from 'styled-components/native';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import AuthenticationHeader from '@components/AuthenticationHeader';
import {Heading, VStack, FormControl, Input, Button, Modal} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {getForgotPasswordOTPRequestAction} from '@store/actionTypes/signUp';
import {isNull} from '@utils/index';
import PrimaryHyperLink from '@components/PrimaryHyperLink';
import PrimaryButton from '@components/PrimaryButton';
import {closeIcon} from '@constants/sources/index';
import fonts from '@themes/fonts';
import {closeResetPasswordLinkModalAction} from '@store/actionTypes/modals';
import {resetPasswordLinkSelector} from '@store/selectors/modals';

interface Props {
  route?: any;
}

const ForgotPasswordScreen: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();
  const [username, setUserName] = useState('');
  const resetPassLink = useSelector(resetPasswordLinkSelector);

  const onPressGetPinCode = () => {
    dispatch(getForgotPasswordOTPRequestAction({username: username}));
  };

  const onPressBackground = () => {
    Keyboard.dismiss();
  };

  const onCloseModal = () => {
    dispatch(closeResetPasswordLinkModalAction());
  };

  const onChangeUsername = (text: string) => {
    setUserName(text);
  };

  return (
    <SafeView>
      {/* Status Bar */}
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
        translucent
      />
      <Container onPress={onPressBackground}>
        <Content>
          <AuthenticationHeader />
          <Form>
            <Heading mt={14} size="2xl" color={colors.THEME_COLOR_5}>
              {i18n.t('authentication.forgotPassword.forgotPassword')}
            </Heading>
            <Heading color={colors.GRAY} size="xs">
              {i18n.t('authentication.forgotPassword.instruction')}
            </Heading>

            {/* Form */}
            <VStack space={2} mt={5}>
              <FormControl>
                <Input
                  height={50}
                  borderRadius={25}
                  color={colors.BLACK}
                  autoCapitalize="none"
                  keyboardType={'email-address'}
                  borderColor={colors.SILVER}
                  onChangeText={onChangeUsername}
                />
              </FormControl>

              <VStack space={2} mt={5}>
                <Button
                  size="lg"
                  borderRadius={28}
                  disabled={isNull(username)}
                  _text={{color: colors.WHITE}}
                  onPress={onPressGetPinCode}>
                  {i18n.t('authentication.forgotPassword.getPinCode')}
                </Button>
              </VStack>
            </VStack>
          </Form>

          {/* Modal */}
          {resetPassLink && (
            <Modal isOpen={true} onClose={onCloseModal}>
              <Modal.Content
                maxWidth="400px"
                borderRadius={20}
                backgroundColor={colors.WHITE}>
                <CloseButton
                  leftIconWidth={22}
                  leftIconHeight={22}
                  leftSource={closeIcon}
                  onPress={onCloseModal}
                />
                <InstructionWrapper>
                  <InstructionText>
                    {i18n.t('popUp.resetPasswordInstruction')}
                  </InstructionText>
                  <InstructionLink
                    link={resetPassLink}
                    onAfterOpenWeb={onCloseModal}
                  />
                </InstructionWrapper>
              </Modal.Content>
            </Modal>
          )}
        </Content>
      </Container>
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
`;
const Container = styled.TouchableWithoutFeedback``;
const Content = styled.View`
  flex: 1;
`;
const Form = styled.View`
  margin-left: 20px;
  margin-right: 20px;
`;

const CloseButton = styled(PrimaryButton)`
  top: 10px;
  right: 12px;
  position: absolute;
`;

const InstructionText = styled(fonts.PrimaryFontMediumSize14)``;

const InstructionLink = styled(PrimaryHyperLink)`
  width: 100%;
`;

const InstructionWrapper = styled.View`
  margin-top: 40px;
  margin-bottom: 50px;
  margin-right: 20px;
`;

export default ForgotPasswordScreen;
