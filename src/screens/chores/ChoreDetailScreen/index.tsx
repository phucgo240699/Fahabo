import React from 'react';
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
import {chorePhotosSelector} from '@store/selectors/chores';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {AssigneeType, ChoreType} from '@constants/types/chores';
import {getChoreStatusColor} from '@utils/chores';
import {navigate} from '@navigators/index';
import i18n from '@locales/index';
import {PhotoType} from '@constants/types/albums';
import PhotoItem from '@screens/albums/AlbumDetailScreen/PhotoItem';

interface Props {
  route?: any;
}

const ChoreDetailScreen: React.FC<Props> = ({route}) => {
  const detail: ChoreType = route.params.detail;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const chorePhotos = useSelector(chorePhotosSelector);

  const onPressBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  const onPressPhoto = (item: PhotoType) => {
    navigate(ScreenName.ImageViewerScreen, {
      data: chorePhotos,
      currentIndex: item.index,
    });
  };

  const renderAssignee = ({item}: {item: AssigneeType}) => {
    return <Avatar mr={3} source={{uri: item.avatar}} />;
  };

  const renderPhoto = ({item}: {item: PhotoType}) => {
    return (
      <PhotoItem
        item={item}
        width={(Constants.MAX_WIDTH - 64) / 3}
        height={(Constants.MAX_WIDTH - 64) / 3}
        onPress={onPressPhoto}
      />
    );
  };

  return (
    <SafeView>
      <FocusAwareStatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={getChoreStatusColor(detail.status)}
      />
      <ScrollView
        bgColor={colors.WHITE}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        <Banner backgroundColor={getChoreStatusColor(detail.status)}>
          <BackButton onPress={onPressBack}>
            <PrimaryIcon width={48} height={48} source={backButtonIcon} />
          </BackButton>
        </Banner>
        <Content>
          <Title>{detail.title}</Title>
          <Label>{`${i18n.t('chores.description')}:`}</Label>
          <Description>{detail.description}</Description>

          <Label marginTop={30}>{`${i18n.t('chores.repeat')}:`}</Label>
          <Description>{detail.repeatType}</Description>

          <Label marginTop={30}>{`${i18n.t('chores.deadline')}:`}</Label>
          <Description>{detail.deadline}</Description>

          <Label marginTop={30}>{`${i18n.t('chores.assignee')}:`}</Label>
          <FlatList
            mt={1}
            horizontal
            data={detail.assignees}
            renderItem={renderAssignee}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
          />

          <Label marginTop={30}>{`${i18n.t('chores.photo')}:`}</Label>
          <FlatList
            mt={1}
            numColumns={3}
            data={chorePhotos}
            scrollEnabled={false}
            renderItem={renderPhoto}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
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

const Banner = styled.View<{backgroundColor: string}>`
  width: 100%;
  height: 70px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  background-color: ${props => props.backgroundColor};
`;

const BackButton = styled.TouchableOpacity`
  margin-top: 10px;
  margin-left: 10px;
`;

const Content = styled.View`
  width: 100%;
  padding: 30px;
`;

const Label = styled(fonts.PrimaryFontBoldSize12)<{marginTop?: number}>`
  margin-top: ${props => props.marginTop ?? 10}px;
  color: ${colors.DANUBE};
`;

const Title = styled(fonts.PrimaryFontBoldSize25)`
  text-align: center;
`;

const Description = styled(fonts.PrimaryFontMediumSize14)`
  margin-top: 8px;
  text-align: left;
`;

const styles = StyleSheet.create({
  scroll: {
    alignItems: 'center',
  },
});

export default ChoreDetailScreen;
