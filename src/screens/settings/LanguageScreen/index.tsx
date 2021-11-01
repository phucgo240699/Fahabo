import React, {useState} from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {Box, FlatList} from 'native-base';
import {StyleSheet} from 'react-native';
import {languages} from '@constants/Constants';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {tickIcon} from '@constants/sources/index';
import i18n from '@locales/index';
import ProfileHeader from '@components/ProfileHeader';
import PrimaryIcon from '@components/PrimaryIcon';
import {useDispatch, useSelector} from 'react-redux';
import {languageCodeSelector} from '@store/selectors/authentication';
// import {getLanguageName, isNull} from '@utils/index';
import PrimaryButton from '@components/PrimaryButton';
import {updateLanguageRequestAction} from '@store/actionTypes/profile';

interface Props {}

const LanguageScreen: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const [languageCode, setLanguageCode] = useState(
    useSelector(languageCodeSelector),
  );

  const onChooseLanguage = (newLanguageCode: string) => {
    setLanguageCode(newLanguageCode);
  };
  const onPressSave = () => {
    dispatch(
      updateLanguageRequestAction({
        languageCode: languageCode === 'auto' ? undefined : languageCode,
      }),
    );
  };

  const renderItem = ({item}: {item: any}) => {
    return (
      <ItemContainer onPress={() => onChooseLanguage(item.key)}>
        <ItemName>{item.value}</ItemName>
        {languageCode === item.key && (
          <PrimaryIcon
            source={tickIcon}
            style={styles.tick}
            width={20}
            height={20}
            tintColor={colors.DANUBE}
          />
        )}
      </ItemContainer>
    );
  };

  return (
    <Box flex={1} safeArea bgColor={colors.WHITE}>
      <FocusAwareStatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
      />
      <ProfileHeader
        title={i18n.t('settings.language.language')}
        rightComponent={
          <PrimaryButton
            titleFontSize={16}
            onPress={onPressSave}
            containerStyle={styles.saveBtn}
            titleColor={colors.THEME_COLOR_7}
            title={i18n.t('settings.language.save')}
          />
        }
      />
      <Box m={4} shadow={6} borderRadius={8} bgColor={colors.WHITE}>
        <FlatList
          data={languages}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <HLine />}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
        />
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
  saveBtn: {
    right: 16,
  },
});

export default LanguageScreen;
