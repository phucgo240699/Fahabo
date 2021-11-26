import React, {useEffect, useState} from 'react';
import {Box, FlatList, Text} from 'native-base';
import i18n from '@locales/index';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {Constants, Pagination} from '@constants/Constants';
import {NotificationType} from '@constants/types/notifications';
import fonts from '@themes/fonts';
import {
  choresIconColor,
  eventsIconColor,
  videoCallIconColor,
} from '@constants/sources';
import {
  convertOriginDateTimeStringToDate,
  getDateTimeStringFrom,
  getOriginDateString,
  getOriginDateTimeString,
  isNull,
} from '@utils/index';

interface Props {
  item: NotificationType;
  onPress?: (item: NotificationType) => void;
}

const HorizontalNotificationItem: React.FC<Props> = ({item, onPress}) => {
  const thumbnailSource =
    item.type === 'CHORE'
      ? choresIconColor
      : item.type === 'EVENT'
      ? eventsIconColor
      : videoCallIconColor;
  const onPressContainer = () => {
    if (onPress) {
      onPress(item);
    }
  };
  const today = new Date();
  // const createdAtDate = convertOriginDateTimeStringToDate(item.createdAt ?? '')
  return (
    <Container onPress={onPressContainer}>
      {!item.isClicked && <Dot />}
      <Thumbnail source={thumbnailSource} />
      <Content>
        <Title numberOfLines={2}>{item.title}</Title>
        <Description numberOfLines={2}>{item.description}</Description>
        {!isNull(item.createdAt) &&
          item.createdAt?.includes(' ') &&
          item.createdAt?.includes('-') &&
          item.createdAt?.includes(':') && (
            <PeriodAgo>{item.createdAt}</PeriodAgo>
          )}
      </Content>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  padding: 10px;
  min-height: 80px;
  flex-direction: row;
  border-radius: 10px;
  shadow-opacity: 0.2;
  shadow-radius: 10px;
  margin: 15px 30px 0px 30px;
  shadow-color: ${colors.BLACK};
  background-color: ${colors.WHITE};
  elevation: 10;
`;

const Content = styled.View`
  flex: 1;
  margin-left: 15px;
`;

const Thumbnail = styled.Image`
  width: 32px;
  height: 32px;
  margin-left: 4px;
`;

const Title = styled(fonts.PrimaryFontBoldSize16)``;

const Description = styled(fonts.PrimaryFontMediumSize14)`
  color: ${colors.DARK_GRAY};
`;

const PeriodAgo = styled(fonts.PrimaryFontRegularSize12)`
  color: ${colors.SILVER};
`;

const Dot = styled.View`
  top: 4px;
  left: 4px;
  width: 6px;
  height: 6px;
  position: absolute;
  border-radius: 3px;
  background-color: ${colors.ROYAL_BLUE};
`;

export default HorizontalNotificationItem;
