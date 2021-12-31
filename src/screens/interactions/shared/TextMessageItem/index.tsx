import React from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {MessageType} from '@constants/types/interactions';
import {useSelector} from 'react-redux';
import {userSelector} from '@store/selectors/authentication';
import {Avatar} from 'native-base';

interface Props {
  item: MessageType;
}

const TextMessageItem: React.FC<Props> = ({item}) => {
  const user = useSelector(userSelector);

  return (
    <Container>
      {item.user?._id != user?.id && <AuthorName>{item.user?.name}</AuthorName>}
      <Content isAuthor={user?.id == item.user?._id}>
        {item.user?._id != user?.id && (
          <Avatar mr={1} size={'sm'} source={{uri: item.user?.avatar}} />
        )}
        <TextWrapper isAuthor={user?.id == item.user?._id}>
          <Text isAuthor={user?.id == item.user?._id}>{item.text}</Text>
        </TextWrapper>
      </Content>
    </Container>
  );
};

const Container = styled.View``;

const Content = styled.View<{isAuthor: boolean}>`
  flex-direction: row;
  margin: 2px 10px 5px 10px;
  justify-content: ${props => (props.isAuthor ? 'flex-end' : 'flex-start')};
`;

const TextWrapper = styled.View<{isAuthor: boolean}>`
  border-radius: 15px;
  background-color: ${props =>
    props.isAuthor ? colors.ROYAL_BLUE : colors.CONCRETE};
`;

const Text = styled(fonts.PrimaryFontMediumSize14)<{isAuthor: boolean}>`
  color: ${props => (props.isAuthor ? colors.WHITE : colors.TEXT)};
  margin: 10px 15px 10px 15px;
`;

const AuthorName = styled(fonts.PrimaryFontRegularSize10)`
  margin-top: 10px;
  margin-left: 48px;
  color: ${colors.SILVER};
`;

export default TextMessageItem;
