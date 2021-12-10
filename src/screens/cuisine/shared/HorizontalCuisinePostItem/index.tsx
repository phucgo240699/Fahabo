import React from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {CuisinePostType} from '@constants/types/cuisine';
import PrimaryButton from '@components/PrimaryButton';
import {isNull} from '@utils/index';
import {Constants} from '@constants/Constants';
import {addEmojiIcon, bookMarkIcon} from '@constants/sources';

const thumbnailWidth = Constants.MAX_WIDTH;
const thumbnailHeight = (thumbnailWidth / 4) * 3;

interface Props {
  item: CuisinePostType;
}

const HorizontalCuisinePostItem: React.FC<Props> = ({item}) => {
  const emoji = ['😡', '👍', '😋'];
  return (
    <Container>
      <AuthorContainer>
        <AuthorAvatar source={{uri: item.author?.avatar}} />
        <AuthorName>{item.author?.name}</AuthorName>
      </AuthorContainer>
      <Thumbnail source={{uri: item.thumbnail}} />
      <BottomContainer>
        <ReactionContainer>
          <ReactionBox>
            {!isNull(item.rating) &&
              (item.rating ?? 0) > 0 &&
              (item.rating ?? 0) <= emoji.length && <Emoji>{emoji[0]}</Emoji>}

            <ReactionButton>
              <AddEmoji source={addEmojiIcon} />
            </ReactionButton>
            <ReactionCounting>{'941K'}</ReactionCounting>
          </ReactionBox>
          <SavePostButton marginRight={20} leftSource={bookMarkIcon} />
        </ReactionContainer>

        <Title>{item.title}</Title>
        <ViewCommentsButton>
          <ViewCommentsText>View all comments</ViewCommentsText>
        </ViewCommentsButton>
      </BottomContainer>
    </Container>
  );
};

const Container = styled.View`
  margin-top: 20px;
  margin-bottom: 30px;
  width: ${thumbnailWidth}px;
`;

const AuthorContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 10px;
`;

const AuthorAvatar = styled.Image`
  width: 36px;
  height: 36px;
  border-radius: 18px;
`;

const AuthorName = styled(fonts.PrimaryFontMediumSize14)`
  margin-left: 8px;
`;

const Thumbnail = styled.Image`
  width: ${thumbnailWidth}px
  height: ${thumbnailHeight}px;
  margin-top: 10px;
`;

const Title = styled(fonts.PrimaryFontMediumSize16)`
  margin-top: 6px;
`;

const BottomContainer = styled.View`
  margin-top: 8px;
  margin-left: 10px;
`;

const ReactionContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ReactionBox = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Emoji = styled.Text`
  width: 22px;
  height: 22px;
`;

const ReactionButton = styled.TouchableOpacity`
  margin-left: 8px;
`;
const AddEmoji = styled.Image`
  width: 22px;
  height: 22px;
  margin-bottom: 4px;
  tint-color: ${colors.GRAY};
`;

const ReactionCounting = styled(fonts.PrimaryFontRegularSize12)`
  margin-left: 6px;
  color: ${colors.SILVER};
`;

const ViewCommentsButton = styled.TouchableOpacity`
  margin-top: 6px;
`;

const ViewCommentsText = styled(fonts.PrimaryFontRegularSize14)`
  color: ${colors.SILVER};
`;

const SavePostButton = styled(PrimaryButton)``;

export default HorizontalCuisinePostItem;
