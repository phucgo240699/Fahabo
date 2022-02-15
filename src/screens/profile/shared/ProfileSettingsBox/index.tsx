import React from 'react';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import i18n from '@locales/index';
import fonts from '@themes/fonts';
import {
  familySettingIcon,
  editProfileIcon,
  settingsIcon,
} from '@constants/sources';
import {Constants} from '@constants/Constants';

interface Props {
  onPressSettings?: () => void;
  onPressUpdateProfile?: () => void;
}

const ProfileSettingsBox: React.FC<Props> = ({
  onPressSettings,
  onPressUpdateProfile,
}) => {
  return (
    <Container>
      <Label>{i18n.t('profile.settings')}</Label>
      <Content>
        <SettingItem onPress={onPressUpdateProfile}>
          <SettingIcon source={editProfileIcon} />
          <SettingTitle>{i18n.t('profile.profile')}</SettingTitle>
        </SettingItem>
      </Content>
    </Container>
  );
};

const Container = styled.View`
  margin-top: 50px;
  width: ${Constants.MAX_WIDTH - 100}px;
`;

const Content = styled.View`
  margin-top: 8px;
  border-radius: 10px;
  background-color: ${colors.WHITE};
  shadow-color: ${colors.BLACK};
  shadow-opacity: 0.2;
  shadow-radius: 10px;
  elevation: 8;
`;

const Label = styled(fonts.PrimaryFontMediumSize16)`
  color: ${colors.BLACK};
`;

const SettingItem = styled.TouchableOpacity`
  height: 50px;
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
