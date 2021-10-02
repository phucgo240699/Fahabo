import React from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {FlatList, Box} from 'native-base';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {plusIcon} from '@constants/sources/index';
import PrimaryButton from '@components/PrimaryButton';
import i18n from '@locales/index';
import ProfileHeader from '@components/ProfileHeader';
import HorizontalFamilyItem from './shared/HorizontalFamilyItem';

const DATA = [
  {
    title: 'Home',
    hostName: 'Phuc',
    totalMembers: 5,
  },
  {
    title: 'Home',
    hostName: 'Phuc',
    totalMembers: 5,
  },
  {
    title: 'Home',
    hostName: 'Phuc',
    totalMembers: 5,
  },
];

interface Props {}

const FamiliesScreen: React.FC<Props> = ({}) => {
  const renderItem = ({item}: {item: any}) => {
    return <HorizontalFamilyItem item={item} />;
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
          />
        }
      />

      <FlatList
        pt={4}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
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

export default FamiliesScreen;
