import React, {useEffect} from 'react';
import {Avatar, FlatList, ScrollView} from 'native-base';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {backButtonIcon} from '@constants/sources';
import PrimaryIcon from '@components/PrimaryIcon';
import {Constants, ScreenName} from '@constants/Constants';
import {Platform, StyleSheet} from 'react-native';
import fonts from '@themes/fonts';
import PreviewAlbumBox from '@screens/albums/shared/PreviewAlbumBox';
import {useDispatch, useSelector} from 'react-redux';
import {
  choreDetailSelector,
  chorePhotosSelector,
} from '@store/selectors/chores';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {AssigneeType, ChoreType} from '@constants/types/chores';
import {getChoreStatusColor, getRepeatText} from '@utils/chores';
import {navigate} from '@navigators/index';
import i18n from '@locales/index';
import {
  getChorePhotosRequestAction,
  getChorePhotosSuccessAction,
} from '@store/actionTypes/chores';
import {isNull} from '@utils/index';

interface Props {
  route?: any;
}

const ChoreDetailScreen: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const detail = useSelector(choreDetailSelector);
  const chorePhotos = useSelector(chorePhotosSelector);

  useEffect(() => {
    if (!isNull(detail?.id)) {
      dispatch(getChorePhotosSuccessAction([]));
      dispatch(
        getChorePhotosRequestAction({
          choreId: detail?.id,
          size: 10,
        }),
      );
    }
  }, []);

  const onPressBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  const onPressPhoto = (index: number) => {
    navigate(ScreenName.ImageViewerScreen, {
      data: chorePhotos,
      currentIndex: index,
    });
  };
  const onPressViewAllPhotos = () => {
    navigate(ScreenName.ChorePhotosScreen, {chore: detail});
  };

  const renderAssignee = ({item}: {item: AssigneeType}) => {
    return <Avatar mr={3} source={{uri: item.avatar}} />;
  };

  const photos = chorePhotos.filter((item, index) => {
    return index < 9;
  });

  return (
    <SafeView backgroundColor={getChoreStatusColor(detail?.status)}>
      <FocusAwareStatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={getChoreStatusColor(detail?.status)}
      />
      <ScrollView
        bounces={false}
        bgColor={colors.WHITE}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        <Banner backgroundColor={getChoreStatusColor(detail?.status)}>
          <BackButton onPress={onPressBack}>
            <PrimaryIcon width={48} height={48} source={backButtonIcon} />
          </BackButton>
        </Banner>
        <Content>
          <Title>{detail?.title}</Title>

          <Label>{`${i18n.t('chores.deadline')}:`}</Label>
          {!isNull(detail?.deadline) && (
            <Description>{detail?.deadline?.split(' ')[0]}</Description>
          )}

          {!isNull(detail?.repeatType) && (
            <>
              <Label>{`${i18n.t('chores.repeat')}:`}</Label>
              <Description>{getRepeatText(detail?.repeatType)}</Description>
            </>
          )}

          {(detail?.assignees ?? []).length > 0 && (
            <>
              <Label>{`${i18n.t('chores.assignee')}:`}</Label>
              <FlatList
                mt={1}
                horizontal
                data={detail?.assignees}
                renderItem={renderAssignee}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
              />
            </>
          )}
          {!isNull(detail?.description) && (
            <>
              <Label>{`${i18n.t('chores.description')}:`}</Label>
              <Description>{detail?.description}</Description>
            </>
          )}

          {photos.length > 0 && (
            <PreviewAlbumBox
              title={i18n.t('chores.photo')}
              hideViewAll={chorePhotos.length <= 9}
              data={photos}
              onPressItem={onPressPhoto}
              onPressViewAll={onPressViewAllPhotos}
            />
          )}
        </Content>
      </ScrollView>
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView<{backgroundColor: string}>`
  flex: 1;
  margin-top: ${Platform.OS === 'android' ? getStatusBarHeight() : 0}px;
  background-color: ${props => props.backgroundColor};
`;

const Banner = styled.View<{backgroundColor: string}>`
  width: 100%;
  height: 70px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  background-color: ${props => props.backgroundColor};
`;

const BackButton = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  margin-top: 10px;
  margin-left: 10px;
`;

const Content = styled.View`
  width: 100%;
  padding: 30px;
`;

const Label = styled(fonts.PrimaryFontBoldSize14)`
  margin-top: 30px;
  color: ${colors.DANUBE};
`;

const Title = styled(fonts.PrimaryFontBoldSize25)`
  text-align: center;
`;

const Description = styled(fonts.PrimaryFontRegularSize16)`
  margin-top: 8px;
  text-align: left;
`;

const styles = StyleSheet.create({
  scroll: {
    alignItems: 'center',
  },
});

export default ChoreDetailScreen;
