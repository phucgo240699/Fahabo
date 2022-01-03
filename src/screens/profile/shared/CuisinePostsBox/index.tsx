import React, {memo} from 'react';
import colors from '@themes/colors';
import i18n from '@locales/index';
import fonts from '@themes/fonts';
import styled from 'styled-components/native';
import {
  choresIconColor,
  colorBookMarkIcon,
  defaultAvatar,
  eventsIconColor,
} from '@constants/sources/index';
import {Constants} from '@constants/Constants';

interface Props {
  onPressMyPosts?: () => void;
  onPressMyBookmarkedPosts?: () => void;
}

const CuisinePostsBox: React.FC<Props> = ({
  onPressMyPosts,
  onPressMyBookmarkedPosts,
}) => {
  return (
    <Container>
      <Button onPress={onPressMyPosts}>
        <Icon source={defaultAvatar} />
        <Label>{i18n.t('cuisine.myPosts')}</Label>
      </Button>
      <VerticalLine />
      <Button onPress={onPressMyBookmarkedPosts}>
        <Icon source={colorBookMarkIcon} />
        <Label>{i18n.t('cuisine.myFavoritePosts')}</Label>
      </Button>
    </Container>
  );
};

const Container = styled.View`
  elevation: 6;
  margin-top: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 10px;
  flex-direction: row;
  shadow-opacity: 0.2;
  shadow-radius: 10px;
  justify-content: space-around;
  shadow-color: ${colors.BLACK};
  background-color: ${colors.WHITE};
  width: ${Constants.MAX_WIDTH - 100}px;
`;

const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

const Icon = styled.Image`
  width: 36px;
  height: 36px;
  border-radius: 18px;
`;

const Label = styled(fonts.PrimaryFontMediumSize14)`
  margin-top: 10px;
  color: ${colors.DARK_GRAY};
`;

const VerticalLine = styled.View`
  width: 1px;
  height: 64px;
  background-color: ${colors.SILVER};
`;

export default memo(CuisinePostsBox);
