import React, {useState} from 'react';
import i18n from '@locales/index';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import {Platform, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {DummyRepeat} from '@constants/DummyData';
import {RepeatType} from '@constants/types/chores';
import ProfileHeader from '@components/ProfileHeader';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import PrimaryIcon from '@components/PrimaryIcon';
import {tickIcon} from '@constants/sources';
import {FlatList} from 'native-base';
import PrimaryButton from '@components/PrimaryButton';
import {navigate} from '@navigators/index';
import {ScreenName} from '@constants/Constants';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';

interface Props {
  route?: any;
}

const RepeatPickerScreen: React.FC<Props> = ({route}) => {
  const [value, setValue] = useState<RepeatType | undefined>(undefined);

  const renderItem = ({item}: {item: RepeatType}) => {
    const onPressContainer = () => {
      setValue(item);
    };
    return (
      <ItemContainer onPress={onPressContainer}>
        <ItemName>{item}</ItemName>
        {value === item && (
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

  const onPressSave = () => {
    if (route && route.params && route.params.fromCreateChore) {
      console.log({value});
      navigate(ScreenName.CreateChoreScreen, {selectedRepeat: value});
    }
  };

  return (
    <SafeView>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
        translucent
      />
      <ProfileHeader
        title={i18n.t('chores.repeat')}
        rightComponent={
          <PrimaryButton
            marginRight={8}
            title={i18n.t('chores.save')}
            titleColor={colors.THEME_COLOR_5}
            onPress={onPressSave}
          />
        }
      />
      <FlatList
        data={DummyRepeat}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <HLine />}
      />
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
  margin-top: ${Platform.OS === 'android' ? getStatusBarHeight() : 0}px;
`;

const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const ItemName = styled(fonts.PrimaryFontRegularSize16)`
  margin: 16px 30px 16px 30px;
`;

const HLine = styled.View`
  height: 1px;
  margin-left: 15px;
  margin-right: 15px;
  background-color: ${colors.CONCRETE};
`;

const styles = StyleSheet.create({
  tick: {
    right: 30,
    position: 'absolute',
  },
});

export default RepeatPickerScreen;
