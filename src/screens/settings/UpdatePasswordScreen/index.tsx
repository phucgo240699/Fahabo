import React, {useState} from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {Box, Button, Input} from 'native-base';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import i18n from '@locales/index';
import ProfileHeader from '@components/ProfileHeader';
import {isNull} from '@utils/index';
import {useDispatch} from 'react-redux';
import {updatePasswordRequestAction} from '@store/actionTypes/profile';

interface Props {}

const UpdatePasswordScreen: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const onChangeCurrentPassword = (text: string) => {
    setCurrentPassword(text);
  };
  const onChangeNewPassword = (text: string) => {
    setNewPassword(text);
  };
  const onChangeConfirmNewPassword = (text: string) => {
    setConfirmNewPassword(text);
  };

  const onPressUpdate = () => {
    if (
      !isNull(currentPassword) &&
      !isNull(newPassword) &&
      !isNull(confirmNewPassword)
    ) {
      dispatch(
        updatePasswordRequestAction({
          currentPassword,
          newPassword,
          confirmNewPassword,
        }),
      );
    }
  };

  return (
    <Box flex={1} safeArea bgColor={colors.WHITE}>
      <FocusAwareStatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
      />
      <ProfileHeader title={i18n.t('settings.password.changePassword')} />
      <ScrollView
        bounces={false}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <Label>{i18n.t('settings.password.currentPassword')}</Label>
        <Input
          mt={1}
          type="password"
          value={currentPassword}
          color={colors.BLACK}
          borderColor={colors.SILVER}
          onChangeText={onChangeCurrentPassword}
          placeholderTextColor={colors.SILVER}
        />
        <Label>{i18n.t('settings.password.newPassword')}</Label>
        <Input
          mt={1}
          type="password"
          value={newPassword}
          color={colors.BLACK}
          borderColor={colors.SILVER}
          onChangeText={onChangeNewPassword}
          placeholderTextColor={colors.SILVER}
        />
        <Label>{i18n.t('settings.password.confirmNewPassword')}</Label>
        <Input
          mt={1}
          type="password"
          value={confirmNewPassword}
          color={colors.BLACK}
          borderColor={colors.SILVER}
          onChangeText={onChangeConfirmNewPassword}
          placeholderTextColor={colors.SILVER}
        />
        <Button
          mt={10}
          size="lg"
          borderRadius={28}
          _text={{color: colors.WHITE}}
          disabled={
            isNull(currentPassword) ||
            isNull(newPassword) ||
            isNull(confirmNewPassword)
          }
          onPress={onPressUpdate}>
          {i18n.t('settings.password.save')}
        </Button>
      </ScrollView>
    </Box>
  );
};

const Label = styled(fonts.PrimaryFontBoldSize14)`
  margin-top: 20px;
`;

const ScrollView = styled.ScrollView`
  padding-left: 30px;
  padding-right: 30px;
`;

export default UpdatePasswordScreen;
