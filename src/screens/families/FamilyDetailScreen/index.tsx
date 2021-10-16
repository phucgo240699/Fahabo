import React from 'react';
import {Avatar, Box, FlatList, ScrollView} from 'native-base';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import PrimaryButton from '@components/PrimaryButton';
import {backButtonIcon, defaultFamilyThumbnail} from '@constants/sources';
import PrimaryIcon from '@components/PrimaryIcon';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {Constants, ScreenName} from '@constants/Constants';
import {Platform, ScrollViewBase, StyleSheet} from 'react-native';
import {DummyAlbums, DummyDetailFamily} from '@constants/DummyData';
import fonts from '@themes/fonts';
import PreviewAlbumBox from '@screens/albums/shared/PreviewAlbumBox';
import i18n from '@locales/index';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {navigate} from '@navigators/index';

interface Props {}

const FamilyDetailScreen: React.FC<Props> = ({}) => {
  const navigation = useNavigation();

  const onPressBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  const renderItem = ({item}: {item: any}) => {
    return (
      <Avatar mr={2} source={{uri: item.avatarUrl}}>
        <Avatar.Badge bg="green.500" />
      </Avatar>
    );
  };

  const onPressPhotoItem = (index: number) => {
    navigate(ScreenName.ImageViewerScreen, {
      data: DummyAlbums,
      currentIndex: index,
    });
  };

  return (
    <SafeView>
      <FocusAwareStatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={colors.THEME_COLOR_4}
      />
      <ScrollView
        bounces={false}
        bgColor={colors.WHITE}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        <Banner>
          <BackButton onPress={onPressBack}>
            <PrimaryIcon width={48} height={48} source={backButtonIcon} />
          </BackButton>
        </Banner>
        <ThumbnailContainer>
          <Thumbnail source={defaultFamilyThumbnail} />
        </ThumbnailContainer>
        <Content>
          <MemberHeader>
            <MemberLabel>{i18n.t('family.members')}</MemberLabel>
            <PrimaryButton
              titleColor={colors.HYPER_LINK}
              title={i18n.t('family.viewAll')}
            />
          </MemberHeader>
          <FlatList
            horizontal
            renderItem={renderItem}
            data={DummyDetailFamily.members}
            contentContainerStyle={styles.members}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
          />
          <PreviewAlbumBox data={DummyAlbums} onPressItem={onPressPhotoItem} />
        </Content>
      </ScrollView>
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  margin-top: ${Platform.OS === 'android' ? getStatusBarHeight() : 0}px;
  background-color: ${colors.THEME_COLOR_4};
`;

const Banner = styled.View`
  width: 100%;
  height: 150px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  background-color: ${colors.THEME_COLOR_4};
`;

const BackButton = styled.TouchableOpacity`
  margin-top: 10px;
  margin-left: 10px;
`;

const ThumbnailContainer = styled.View`
  overflow: hidden;
  margin-top: -80px;
  border-radius: 10px;
`;
const Thumbnail = styled.Image`
  resize-mode: contain;
  background-color: ${colors.WHITE};
  width: ${Constants.MAX_WIDTH - 100}px;
  height: ${Constants.MAX_WIDTH - 200}px;
`;

const Content = styled.View`
  width: 100%;
  margin-top: 30px;
`;

const MemberHeader = styled.View`
  margin-left: 30px;
  margin-right: 30px;
  flex-direction: row;
  justify-content: space-between;
`;

const MemberLabel = styled(fonts.PrimaryFontMediumSize14)``;

const styles = StyleSheet.create({
  scroll: {
    alignItems: 'center',
  },
  members: {
    marginTop: 8,
    paddingLeft: 30,
  },
});

export default FamilyDetailScreen;
