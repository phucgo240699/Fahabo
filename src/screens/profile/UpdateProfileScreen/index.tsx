import React from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {navigateReset} from '@navigators/index';
import {Avatar, Box, Button, FormControl, Input} from 'native-base';
import {ImageBackground, StyleSheet} from 'react-native';
import {Constants, StackName} from '@constants/Constants';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {profileBackground, defaultAvatar} from '@constants/sources/index';
import PrimaryButton from '@components/PrimaryButton';
import i18n from '@locales/index';
import ProfileHeader from '@components/ProfileHeader';

interface Props {}

const UpdateProfileScreen: React.FC<Props> = ({}) => {
  return (
    <Box flex={1} safeArea bgColor={colors.WHITE}>
      <FocusAwareStatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
      />
      <ProfileHeader title="Update Profile" />
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <Label>{i18n.t('profile.email')}</Label>
        <Input
          mt={1}
          color={colors.BLACK}
          borderColor={colors.SILVER}
          placeholderTextColor={colors.SILVER}
        />
        <Label>{i18n.t('profile.phoneNumber')}</Label>
        <Input
          mt={1}
          color={colors.BLACK}
          borderColor={colors.SILVER}
          placeholderTextColor={colors.SILVER}
        />
        <Label>{i18n.t('profile.name')}</Label>
        <Input
          mt={1}
          color={colors.BLACK}
          borderColor={colors.SILVER}
          placeholderTextColor={colors.SILVER}
        />
        <Button
          mt={10}
          size="lg"
          borderRadius={28}
          _text={{color: colors.WHITE}}>
          {i18n.t('profile.confirm')}
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

export default UpdateProfileScreen;
