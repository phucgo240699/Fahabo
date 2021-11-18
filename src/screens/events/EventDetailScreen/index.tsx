import React, {useEffect} from 'react';
import {Avatar, FlatList, ScrollView} from 'native-base';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {backButtonIcon} from '@constants/sources';
import PrimaryIcon from '@components/PrimaryIcon';
import {ScreenName} from '@constants/Constants';
import {Platform, StyleSheet} from 'react-native';
import fonts from '@themes/fonts';
import PreviewAlbumBox from '@screens/albums/shared/PreviewAlbumBox';
import {useDispatch, useSelector} from 'react-redux';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {AssigneeType} from '@constants/types/chores';
import {getRepeatText} from '@utils/chores';
import {navigate} from '@navigators/index';
import i18n from '@locales/index';
import {getDateTimeStringFrom, isNull} from '@utils/index';
import {EventType} from '@constants/types/events';
import {
  eventDetailSelector,
  eventPhotosSelector,
} from '@store/selectors/events';
import {
  getEventPhotosRequestAction,
  getEventPhotosSuccessAction,
} from '@store/actionTypes/events';

interface Props {
  route?: any;
}

const EventDetailScreen: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const detail = useSelector(eventDetailSelector);
  const eventPhotos = useSelector(eventPhotosSelector);

  useEffect(() => {
    if (!isNull(detail?.id)) {
      dispatch(getEventPhotosSuccessAction([]));
      dispatch(
        getEventPhotosRequestAction({
          eventId: detail?.id,
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
      data: eventPhotos,
      currentIndex: index,
    });
  };
  const onPressViewAllPhotos = () => {
    navigate(ScreenName.EventPhotosScreen, {event: detail});
  };

  const renderAssignee = ({item}: {item: AssigneeType}) => {
    return <Avatar mr={3} source={{uri: item.avatar}} />;
  };

  const photos = eventPhotos.filter((item, index) => {
    return index < 9;
  });

  return (
    <SafeView>
      <FocusAwareStatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={colors.THEME_COLOR_5}
      />
      <EmptySpace backgroundColor={colors.THEME_COLOR_5} />
      <ScrollView
        bounces={false}
        bgColor={colors.WHITE}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        <Banner backgroundColor={colors.THEME_COLOR_5}>
          <BackButton onPress={onPressBack}>
            <PrimaryIcon width={48} height={48} source={backButtonIcon} />
          </BackButton>
        </Banner>
        <Content>
          <Title>{detail?.title}</Title>

          <Label>{`${i18n.t('events.from')}:`}</Label>
          {!isNull(detail?.from) && (
            <Description>
              {getDateTimeStringFrom(detail?.from ?? '')}
            </Description>
          )}

          <Label>{`${i18n.t('events.to')}:`}</Label>
          {!isNull(detail?.to) && (
            <Description>{getDateTimeStringFrom(detail?.to ?? '')}</Description>
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
              hideViewAll={eventPhotos.length <= 9}
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

const SafeView = styled.View`
  flex: 1;
  background-color: ${colors.WHITE};
`;

const EmptySpace = styled.SafeAreaView<{backgroundColor: string}>`
  height: ${getStatusBarHeight()}px;
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

export default EventDetailScreen;
