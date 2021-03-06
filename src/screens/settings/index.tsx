import React from 'react';
import {Box} from 'native-base';
import fonts from '@themes/fonts';
import i18n from '@locales/index';
import colors from '@themes/colors';
import {StyleSheet} from 'react-native';
import {navigate} from '@navigators/index';
import styled from 'styled-components/native';
import {ScreenName} from '@constants/Constants';
import PrimaryIcon from '@components/PrimaryIcon';
import ProfileHeader from '@components/ProfileHeader';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {
  languageIcon,
  passwordColorIcon,
  rightArrowIcon,
} from '@constants/sources/index';
import {useSelector} from 'react-redux';
import {userSelector} from '@store/selectors/authentication';
import {AuthType} from '@constants/types/authentication';

interface Props {}

const SettingsScreen: React.FC<Props> = ({}) => {
  const user = useSelector(userSelector);

  const onNavigateToLanguage = () => {
    navigate(ScreenName.LanguageScreen);
  };

  const onNavigateToPassword = () => {
    navigate(ScreenName.UpdatePasswordScreen);
  };

  return (
    <Box flex={1} safeArea bgColor={colors.WHITE}>
      <FocusAwareStatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
      />
      <ProfileHeader title={i18n.t('settings.settings')} />
      <Content>
        <ItemContainer onPress={onNavigateToLanguage}>
          <PrimaryIcon source={languageIcon} />
          <ItemName>{i18n.t('settings.language.language')}</ItemName>
          <PrimaryIcon
            width={16}
            height={16}
            tintColor={colors.SILVER}
            source={rightArrowIcon}
            style={styles.rightArrow}
          />
        </ItemContainer>
        {user?.authType?.id === AuthType.MANUAL_AUTH && (
          <>
            <HLine />
            <ItemContainer onPress={onNavigateToPassword}>
              <PrimaryIcon source={passwordColorIcon} />
              <ItemName>{i18n.t('settings.password.changePassword')}</ItemName>
              <PrimaryIcon
                width={16}
                height={16}
                tintColor={colors.SILVER}
                source={rightArrowIcon}
                style={styles.rightArrow}
              />
            </ItemContainer>
          </>
        )}
      </Content>
    </Box>
  );
};

const Content = styled.View`
  margin: 16px;
  elevation: 10;
  border-radius: 8px;
  shadow-radius: 16px;
  shadow-opacity: 0.2;
  shadow-color: ${colors.BLACK};
  background-color: ${colors.WHITE};
`;

const ItemContainer = styled.TouchableOpacity`
  padding: 14px;
  flex-direction: row;
  align-items: center;
`;

const ItemName = styled(fonts.PrimaryFontRegularSize16)`
  margin-left: 18px;
  color: ${colors.BLACK};
`;

const HLine = styled.View`
  height: 1px;
  opacity: 0.8;
  margin-left: 44px;
  background-color: ${colors.SILVER};
`;

const styles = StyleSheet.create({
  rightArrow: {
    right: 10,
    position: 'absolute',
  },
});

export default SettingsScreen;
