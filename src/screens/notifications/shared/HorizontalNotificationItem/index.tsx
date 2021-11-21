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
  return (
    <Container onPress={onPressContainer}>
      <Thumbnail source={thumbnailSource} />
      <Content>
        <Title numberOfLines={2}>{item.title}</Title>
        <Description numberOfLines={2}>{item.description}</Description>
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
`;

const Title = styled(fonts.PrimaryFontBoldSize14)``;

const Description = styled(fonts.PrimaryFontMediumSize12)`
  color: ${colors.GRAY};
`;

export default HorizontalNotificationItem;
