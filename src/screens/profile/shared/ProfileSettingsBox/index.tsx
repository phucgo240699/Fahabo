import React from 'react';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import i18n from '@locales/index';
import fonts from '@themes/fonts';

interface Props {}

const ProfileSettingsBox: React.FC<Props> = () => {
  return (
    <Container>
      <SettingItem>
        <SettingIcon source={require('@assets/images/edit_profile_icon.png')} />
        <SettingTitle>{i18n.t('profile.editProfile')}</SettingTitle>
      </SettingItem>
      <Line />

      <SettingItem>
        <SettingIcon source={require('@assets/images/settings_icon.png')} />
        <SettingTitle>{i18n.t('profile.settings')}</SettingTitle>
      </SettingItem>
    </Container>
  );
};

const Container = styled.View`
  margin: 30px;
  border-radius: 10px;
  background-color: ${colors.WHITE};
  shadow-color: ${colors.SILVER};
  shadow-opacity: 0.35;
  shadow-radius: 10px;
  elevation: 6;
`;

const Label = styled(fonts.PrimaryFontBoldSize12)`
  margin-top: 30px;
  margin-left: 30px;
  color: ${colors.BLACK};
`;

const SettingItem = styled.TouchableOpacity`
  height: 63px;
  align-items: center;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 10px;
`;

const SettingIcon = styled.Image`
  width: 23px;
  height: 23px;
  tint-color: ${colors.DANUBE};
`;

const SettingTitle = styled(fonts.PrimaryFontMediumSize14)`
  margin-left: 20px;
  color: ${colors.BLACK};
`;

const Line = styled.View`
  height: 1px;
  margin-left: 8px;
  margin-right: 8px;
  background-color: ${colors.SILVER};
`;

export default ProfileSettingsBox;
