import React from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {MessageType} from '@constants/types/interactions';
import {useSelector} from 'react-redux';
import {
  accessTokenSelector,
  userSelector,
} from '@store/selectors/authentication';
import {Avatar} from 'native-base';
import {Constants} from '@constants/Constants';

interface Props {
  item: MessageType;
  onPress?: (item: MessageType) => void;
}

const SharedCuisinePostMessageItem: React.FC<Props> = ({item, onPress}) => {
  const user = useSelector(userSelector);
  const accessToken = useSelector(accessTokenSelector);

  const onPressWrapper = () => {
    if (onPress) {
      onPress(item);
    }
  };

  return (
    <Container>
      {item.user?._id != user?.id && <AuthorName>{item.user?.name}</AuthorName>}
      <Content isAuthor={user?.id == item.user?._id}>
        {item.user?._id != user?.id && (
          <Avatar
            mr={1}
            size={'sm'}
            source={{
              uri: item.user?.avatar,
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }}
          />
        )}
        <CuisineWrapper
          activeOpacity={0.8}
          isAuthor={user?.id == item.user?._id}
          onPress={onPressWrapper}>
          <Title isAuthor={user?.id == item.user?._id}>
            {item.cuisinePost?.title}
          </Title>
          <Thumbnail source={{uri: item.cuisinePost?.thumbnail}} />
        </CuisineWrapper>
      </Content>
    </Container>
  );
};

const Container = styled.View`
  margin-top: 10px;
`;

const Content = styled.View<{isAuthor: boolean}>`
  flex-direction: row;
  margin: 2px 10px 5px 10px;
  justify-content: ${props => (props.isAuthor ? 'flex-end' : 'flex-start')};
`;

const CuisineWrapper = styled.TouchableOpacity<{isAuthor: boolean}>`
  elevation: 10;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  shadow-color: ${colors.BLACK};
  border-radius: 15px;
  max-width: ${Constants.MAX_WIDTH - 120}px;
  background-color: ${props =>
    props.isAuthor ? colors.ROYAL_BLUE : colors.CONCRETE};
`;

const Title = styled(fonts.PrimaryFontMediumSize14)<{isAuthor: boolean}>`
  margin: 8px 15px 10px 15px;
  color: ${props => (props.isAuthor ? colors.WHITE : colors.TEXT)};
`;

const Thumbnail = styled.Image`
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  width: ${Constants.MAX_WIDTH - 120}px;
  height: ${((Constants.MAX_WIDTH - 120) / 4) * 3}px;
`;

const AuthorName = styled(fonts.PrimaryFontRegularSize10)`
  margin-left: 48px;
  color: ${colors.SILVER};
`;

export default SharedCuisinePostMessageItem;
