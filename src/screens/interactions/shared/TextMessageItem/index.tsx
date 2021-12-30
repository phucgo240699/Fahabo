import React from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {MessageType} from '@constants/types/interactions';
import {useSelector} from 'react-redux';
import {userSelector} from '@store/selectors/authentication';

interface Props {
  item: MessageType;
}

const TextMessageItem: React.FC<Props> = ({item}) => {
  const user = useSelector(userSelector);

  return (
    <Container isAuthor={user?.id == item.user?._id}>
      <Content isAuthor={user?.id == item.user?._id}>
        <Text isAuthor={user?.id == item.user?._id}>{item.text}</Text>
      </Content>
    </Container>
  );
};

const Container = styled.View<{isAuthor: boolean}>`
  margin: 5px 10px 5px 10px;
  align-items: ${props => (props.isAuthor ? 'flex-end' : 'flex-start')};
`;

const Content = styled.View<{isAuthor: boolean}>`
  border-radius: 15px;
  background-color: ${props =>
    props.isAuthor ? colors.ROYAL_BLUE : colors.CONCRETE};
`;

const Text = styled(fonts.PrimaryFontMediumSize14)<{isAuthor: boolean}>`
  color: ${props => (props.isAuthor ? colors.WHITE : colors.TEXT)};
  margin: 10px 15px 10px 15px;
`;

export default TextMessageItem;
