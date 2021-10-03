import React from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {Box, Button, Input} from 'native-base';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
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
      <ProfileHeader title={i18n.t('profile.profile')} />
      <ScrollView
        bounces={false}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
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
          p={2}
          mt={10}
          size="lg"
          borderRadius={28}
          _text={{color: colors.WHITE, fontSize: 21}}>
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
