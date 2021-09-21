import React, {useState} from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {navigateReset} from '@navigators/index';
import {Radio, Box, Button, FormControl, Input} from 'native-base';
import {ImageBackground, StyleSheet} from 'react-native';
import {Constants, StackName} from '@constants/Constants';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {tickIcon} from '@constants/sources/index';
import PrimaryButton from '@components/PrimaryButton';
import i18n from '@locales/index';
import ProfileHeader from '@components/ProfileHeader';
import PrimaryIcon from '@components/PrimaryIcon';

interface Props {}

const LanguageScreen: React.FC<Props> = ({}) => {
  const [index, setIndex] = useState(0);

  const onPressEnglish = () => {
    setIndex(0);
  };

  const onPressVietnamese = () => {
    setIndex(1);
  };

  return (
    <Box flex={1} safeArea bgColor={colors.WHITE}>
      <FocusAwareStatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
      />
      <ProfileHeader title={i18n.t('settings.language')} />
      <Box m={4} borderRadius={8} bgColor={colors.WHITE} shadow={4}>
        <ItemContainer onPress={onPressEnglish}>
          <ItemName>{i18n.t('settings.english')}</ItemName>
          {index === 0 && (
            <PrimaryIcon
              source={tickIcon}
              style={styles.tick}
              width={20}
              height={20}
              tintColor={colors.DANUBE}
            />
          )}
        </ItemContainer>

        <HLine />

        <ItemContainer onPress={onPressVietnamese}>
          <ItemName>{i18n.t('settings.vietnamese')}</ItemName>
          {index === 1 && (
            <PrimaryIcon
              source={tickIcon}
              style={styles.tick}
              width={20}
              height={20}
              tintColor={colors.DANUBE}
            />
          )}
        </ItemContainer>
      </Box>
    </Box>
  );
};

const ItemContainer = styled.TouchableOpacity`
  padding: 16px;
  flex-direction: row;
  align-items: center;
`;

const ItemName = styled(fonts.PrimaryFontRegularSize16)``;

const HLine = styled.View`
  height: 1px;
  opacity: 0.6;
  margin-left: 8px;
  margin-right: 8px;
  background-color: ${colors.SILVER};
`;

const styles = StyleSheet.create({
  tick: {
    right: 20,
    position: 'absolute',
  },
});

export default LanguageScreen;
