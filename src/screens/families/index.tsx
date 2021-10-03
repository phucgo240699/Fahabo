import React from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {FlatList, Box, useDisclose, Actionsheet} from 'native-base';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {plusIcon} from '@constants/sources/index';
import PrimaryButton from '@components/PrimaryButton';
import i18n from '@locales/index';
import ProfileHeader from '@components/ProfileHeader';
import HorizontalFamilyItem from './shared/HorizontalFamilyItem';
import {navigate} from '@navigators/index';
import {ScreenName} from '@constants/Constants';
import PrimaryActionSheetItem from '@components/PrimaryActionSheetItem';
import {getInset} from 'react-native-safe-area-view';

const DATA = [
  {
    id: 1,
    title: 'Home',
    hostName: 'Phuc',
    totalMembers: 1,
  },
  {
    id: 2,
    title: 'Home',
    hostName: 'Phuc Ly',
    totalMembers: 2,
  },
  {
    id: 3,
    title: 'Home',
    hostName: 'Ly Hien Phuc',
    totalMembers: 3,
  },
];

interface Props {}

const FamiliesScreen: React.FC<Props> = ({}) => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const bottomInset = getInset('bottom', false);

  const renderItem = ({item}: {item: any}) => {
    return <HorizontalFamilyItem item={item} onPress={onPressItem} />;
  };
  const onPressItem = (item: any) => {
    navigate(ScreenName.QRPresenterScreen, {
      value: item.id,
      instruction: 'Scan QR code to join family',
    });
  };
  const onPressCreateFamily = () => {
    onClose();
  };
  const onPressJoinFamily = () => {
    onClose();
    navigate(ScreenName.ScanFamilyQRScreen);
  };

  return (
    <Box flex={1} safeArea bgColor={colors.WHITE}>
      <FocusAwareStatusBar
        translucent={true}
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
      />
      <ProfileHeader
        title={i18n.t('family.family')}
        rightComponent={
          <PrimaryButton
            marginRight={8}
            leftSource={plusIcon}
            leftTintColor={colors.THEME_COLOR_6}
            onPress={onOpen}
          />
        }
      />

      <FlatList
        pt={4}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <Actionsheet
        pb={bottomInset}
        isOpen={isOpen}
        onClose={onClose}
        bgColor={colors.WHITE}>
        <PrimaryActionSheetItem
          title={i18n.t('family.createFamily')}
          onPress={onPressCreateFamily}
        />
        <HLine />
        <PrimaryActionSheetItem
          title={i18n.t('family.joinFamily')}
          onPress={onPressJoinFamily}
        />
        <HLine />
        <PrimaryActionSheetItem
          title={i18n.t('family.cancel')}
          titleColor={colors.RED_1}
          onPress={onClose}
        />
      </Actionsheet>
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

const HLine = styled.View`
  width: 80%;
  height: 1px;
  background-color: ${colors.CONCRETE};
`;

export default FamiliesScreen;
