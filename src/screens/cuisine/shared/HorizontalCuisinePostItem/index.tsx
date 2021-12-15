import React from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {CuisinePostType} from '@constants/types/cuisine';
import PrimaryButton from '@components/PrimaryButton';
import {getNumberWithCommas, isNull} from '@utils/index';
import {Constants} from '@constants/Constants';
import {addEmojiIcon, bookMarkIcon, verticalOptions} from '@constants/sources';
import {getEmoji} from '@utils/cuisine';
import {Menu, Pressable} from 'native-base';
import i18n from '@locales/index';

const thumbnailWidth = Constants.MAX_WIDTH;
const thumbnailHeight = (thumbnailWidth / 4) * 3;

interface Props {
  item: CuisinePostType;
  onReacting?: (voteId: number, item: CuisinePostType) => void;
  onPress?: (item: CuisinePostType) => void;
  onPressUpdate?: (item: CuisinePostType) => void;
  onPressDelete?: (item: CuisinePostType) => void;
}

const HorizontalCuisinePostItem: React.FC<Props> = ({
  item,
  onReacting,
  onPress,
  onPressUpdate,
  onPressDelete,
}) => {
  const totalRatings =
    (item.angryRatings ?? 0) +
    (item.likeRatings ?? 0) +
    (item.yummyRatings ?? 0);

  const onReactAngry = () => {
    if (onReacting) {
      onReacting(1, item);
    }
  };
  const onReactLike = () => {
    if (onReacting) {
      onReacting(2, item);
    }
  };
  const onReactDelicious = () => {
    if (onReacting) {
      onReacting(3, item);
    }
  };

  const onPressContainer = () => {
    if (onPress) {
      onPress(item);
    }
  };
  const onPressUpdateOption = () => {
    if (onPressUpdate) {
      onPressUpdate(item);
    }
  };
  const onPressDeleteOption = () => {
    if (onPressDelete) {
      onPressDelete(item);
    }
  };

  return (
    <Container onPress={onPressContainer} activeOpacity={0.8}>
      <AuthorContainer>
        <AuthorContent>
          <AuthorAvatar source={{uri: item.author?.avatar}} />
          <AuthorName>{item.author?.name}</AuthorName>
        </AuthorContent>

        <Menu
          width={160}
          borderWidth={0}
          backgroundColor={colors.WHITE}
          shouldOverlapWithTrigger={false} // @ts-ignore
          placement={undefined}
          trigger={triggerProps => {
            return (
              <Pressable
                bgColor={colors.WHITE}
                alignItems={'center'}
                justifyContent={'center'}
                {...triggerProps}>
                <OptionsIcon source={verticalOptions} />
              </Pressable>
            );
          }}>
          <Menu.Item onPress={onPressUpdateOption} _text={{color: colors.TEXT}}>
            {i18n.t('cuisine.update')}
          </Menu.Item>
          <Menu.Item
            onPress={onPressDeleteOption}
            _text={{color: colors.RED_1}}>
            {i18n.t('cuisine.delete')}
          </Menu.Item>
        </Menu>
      </AuthorContainer>
      <Thumbnail source={{uri: item.thumbnail}} />
      <BottomContainer>
        <ReactionContainer>
          <ReactionBox>
            {(item.angryRatings ?? 0) > 0 && <Emoji>{getEmoji(1)}</Emoji>}
            {(item.likeRatings ?? 0) > 0 && <Emoji>{getEmoji(2)}</Emoji>}
            {(item.yummyRatings ?? 0) > 0 && <Emoji>{getEmoji(3)}</Emoji>}
            {totalRatings > 0 && (
              <ReactionCounting>
                {getNumberWithCommas(totalRatings)}
              </ReactionCounting>
            )}
            <Menu
              width={160}
              borderWidth={0}
              backgroundColor={colors.WHITE}
              shouldOverlapWithTrigger={false} // @ts-ignore
              placement={undefined}
              trigger={triggerProps => {
                return (
                  <Pressable
                    bgColor={colors.WHITE}
                    position={'absolute'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    {...triggerProps}>
                    {isNull(item.userReactedType) ||
                    item.userReactedType === 0 ? (
                      <AddEmoji source={addEmojiIcon} />
                    ) : (
                      <Emoji>{getEmoji(item.userReactedType ?? 0)}</Emoji>
                    )}
                  </Pressable>
                );
              }}>
              <Menu.Item onPress={onReactAngry}>{getEmoji(1)}</Menu.Item>
              <Menu.Item onPress={onReactLike}>{getEmoji(2)}</Menu.Item>
              <Menu.Item onPress={onReactDelicious}>{getEmoji(3)}</Menu.Item>
            </Menu>
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

const Container = styled.TouchableOpacity`
  margin-top: 20px;
  margin-bottom: 30px;
  width: ${thumbnailWidth}px;
`;

const AuthorContainer = styled.View`
  margin-left: 10px;
  margin-right: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const AuthorContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

const AuthorAvatar = styled.Image`
  width: 36px;
  height: 36px;
  border-radius: 18px;
`;

const AuthorName = styled(fonts.PrimaryFontMediumSize14)`
  margin-left: 8px;
`;

const OptionsIcon = styled.Image`
  width: 28px;
  height: 28px;
  tint-color: ${colors.SILVER};
`;

const Thumbnail = styled.Image`
  margin-top: 10px;
  width: ${thumbnailWidth}px;
  height: ${thumbnailHeight}px;
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
