import React from 'react';
import {Avatar, Box, FlatList, ScrollView} from 'native-base';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import PrimaryButton from '@components/PrimaryButton';
import {
  backButtonIcon,
  defaultFamilyThumbnail,
  qrCodeIcon,
} from '@constants/sources';
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
import {useDispatch} from 'react-redux';
import {leaveFamilyRequestAction} from '@store/actionTypes/family';

interface Props {
  route?: any;
}

const FamilyDetailScreen: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onPressBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };
  const onPressQRCode = () => {
    if (route && route.params && route.params.item) {
      navigate(ScreenName.QRPresenterScreen, {
        value: route.params.item.id,
        instruction: i18n.t('family.scanInstruction'),
      });
    }
  };

  const renderItem = ({item}: {item: any}) => {
    return <Avatar mr={2} source={{uri: item.avatarUrl}} />;
  };

  const onPressPhotoItem = (index: number) => {
    navigate(ScreenName.ImageViewerScreen, {
      data: DummyAlbums,
      currentIndex: index,
    });
  };

  const onPressLeave = () => {
    if (route && route.params && route.params.item) {
      dispatch(leaveFamilyRequestAction({familyId: route.params.item.id}));
    }
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
          <QRButton
            leftIconWidth={32}
            leftIconHeight={32}
            leftTintColor={colors.BLACK}
            leftSource={qrCodeIcon}
            onPress={onPressQRCode}
          />
        </Banner>
        {route && route.params && route.params.item ? (
          <ThumbnailContainer>
            <Thumbnail source={{uri: route.params.item.thumbnail}} />
          </ThumbnailContainer>
        ) : (
          <ThumbnailContainer>
            <Thumbnail source={defaultFamilyThumbnail} />
          </ThumbnailContainer>
        )}
        <Content>
          <Name>
            {route &&
              route.params &&
              route.params.item &&
              route.params.item.name}
          </Name>
          <HLine />
          <MemberHeader>
            <MemberLabel>{i18n.t('family.members')}</MemberLabel>
            <PrimaryButton
              titleColor={colors.HYPER_LINK}
              title={i18n.t('family.viewAll')}
            />
          </MemberHeader>
          <FlatList
            mt={1}
            horizontal
            renderItem={renderItem}
            data={DummyDetailFamily.members}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
          />
          <PreviewAlbumBox data={DummyAlbums} onPressItem={onPressPhotoItem} />

          <PrimaryButton
            marginTop={30}
            titleColor={colors.RED_1}
            title={i18n.t('family.leave')}
            onPress={onPressLeave}
          />
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

const Name = styled(fonts.PrimaryFontBoldSize18)`
  text-align: center;
`;

const BackButton = styled.TouchableOpacity`
  margin-top: 10px;
  margin-left: 10px;
`;

const QRButton = styled(PrimaryButton)`
  top: 8px;
  right: 12px;
  position: absolute;
`;

const ThumbnailContainer = styled.View`
  overflow: hidden;
  margin-top: -80px;
  border-radius: 10px;
  shadow-radius: 10px;
  shadow-opacity: 0.8;
  shadow-color: ${colors.BLACK};
`;
const Thumbnail = styled.Image`
  resize-mode: contain;
  background-color: ${colors.WHITE};
  width: ${Constants.MAX_WIDTH - 100}px;
  height: ${Constants.MAX_WIDTH - 200}px;
`;

const Content = styled.View`
  flex: 1;
  padding: 30px;
`;

const HLine = styled.View`
  height: 1px;
  margin-top: 20px;
  width: ${Constants.MAX_WIDTH - 60}px;
  background-color: ${colors.CONCRETE};
`;

const MemberHeader = styled.View`
  margin-top: 30px;
  flex-direction: row;
  justify-content: space-between;
`;

const MemberLabel = styled(fonts.PrimaryFontMediumSize14)``;

const styles = StyleSheet.create({
  scroll: {
    alignItems: 'center',
  },
});

export default FamilyDetailScreen;
