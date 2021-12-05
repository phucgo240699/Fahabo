import React, {useEffect} from 'react';
import {Avatar, ScrollView} from 'native-base';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {backButtonIcon} from '@constants/sources';
import PrimaryIcon from '@components/PrimaryIcon';
import {ScreenName} from '@constants/Constants';
import {StyleSheet} from 'react-native';
import fonts from '@themes/fonts';
import PreviewAlbumBox from '@screens/albums/shared/PreviewAlbumBox';
import {useDispatch, useSelector} from 'react-redux';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {AssigneeType} from '@constants/types/chores';
import {getRepeatText} from '@utils/chores';
import {navigate} from '@navigators/index';
import i18n from '@locales/index';
import {getDateStringFrom, getNumberWithCommas, isNull} from '@utils/index';
import {
  isGettingTransactionPhotosSelector,
  transactionDetailSelector,
  transactionPhotosSelector,
} from '@store/selectors/transactions';
import {
  getTransactionPhotosRequestAction,
  getTransactionPhotosSuccessAction,
} from '@store/actionTypes/transactions';
import {TransactionCategorySegment} from '@constants/types/transactions';
import GettingIndicator from '@components/GettingIndicator';

interface Props {
  route?: any;
}

const TransactionDetailScreen: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const detail = useSelector(transactionDetailSelector);
  const transactionPhotos = useSelector(transactionPhotosSelector);
  const isGettingPhotos = useSelector(isGettingTransactionPhotosSelector);

  useEffect(() => {
    if (!isNull(detail?.id)) {
      dispatch(getTransactionPhotosSuccessAction([]));
      dispatch(
        getTransactionPhotosRequestAction({
          getting: true,
          transactionId: detail?.id,
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
      data: transactionPhotos,
      currentIndex: index,
    });
  };
  const onPressViewAllPhotos = () => {
    navigate(ScreenName.TransactionPhotosScreen, {transaction: detail});
  };

  const photos = transactionPhotos.filter((item, index) => {
    return index < 9;
  });

  return (
    <SafeView>
      <FocusAwareStatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={
          detail?.category?.type === TransactionCategorySegment.INCOME
            ? colors.GREEN_1
            : colors.RED_1
        }
      />
      <EmptySpace
        backgroundColor={
          detail?.category?.type === TransactionCategorySegment.INCOME
            ? colors.GREEN_1
            : colors.RED_1
        }
      />
      <ScrollView
        bounces={false}
        bgColor={colors.WHITE}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        <Banner
          backgroundColor={
            detail?.category?.type === TransactionCategorySegment.INCOME
              ? colors.GREEN_1
              : colors.RED_1
          }>
          <BackButton onPress={onPressBack}>
            <PrimaryIcon width={48} height={48} source={backButtonIcon} />
          </BackButton>
        </Banner>
        <Content>
          <Title>
            {detail?.category?.translated
              ? i18n.t(`backend.${detail?.category?.title}`)
              : detail?.category?.title}
          </Title>
          <Cost
            color={
              detail?.category?.type === TransactionCategorySegment.INCOME
                ? colors.GREEN_1
                : colors.RED_1
            }>
            {`${
              detail?.category?.type === TransactionCategorySegment.INCOME
                ? ''
                : '-'
            }${getNumberWithCommas(detail?.cost ?? 0)}`}
          </Cost>

          <Label>{`${i18n.t('transaction.date')}:`}</Label>
          {!isNull(detail?.date) && (
            <Description>{getDateStringFrom(detail?.date ?? '')}</Description>
          )}

          {!isNull(detail?.repeatType) && (
            <>
              <Label>{`${i18n.t('chores.repeat')}:`}</Label>
              <Description>{getRepeatText(detail?.repeatType)}</Description>
            </>
          )}

          {!isNull(detail?.note) && (
            <>
              <Label>{`${i18n.t('transaction.note')}:`}</Label>
              <Description>{detail?.note}</Description>
            </>
          )}
          {isGettingPhotos ? (
            <GettingIndicator />
          ) : (
            photos.length > 0 && (
              <PreviewAlbumBox
                title={i18n.t('chores.photo')}
                hideViewAll={transactionPhotos.length <= 9}
                data={photos}
                onPressItem={onPressPhoto}
                onPressViewAll={onPressViewAllPhotos}
              />
            )
          )}
          {/* {photos.length > 0 && (
            <PreviewAlbumBox
              title={i18n.t('chores.photo')}
              hideViewAll={transactionPhotos.length <= 9}
              data={photos}
              onPressItem={onPressPhoto}
              onPressViewAll={onPressViewAllPhotos}
            />
          )} */}
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

const Cost = styled(fonts.PrimaryFontBoldSize25)<{color: string}>`
  margin-top: 8px;
  text-align: center;
  color: ${props => props.color};
`;

const styles = StyleSheet.create({
  scroll: {
    alignItems: 'center',
  },
});

export default TransactionDetailScreen;
