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
import {BASE_DOMAIN, Constants} from '@constants/Constants';

interface Props {
  item: MessageType;
}

const TextMessageItem: React.FC<Props> = ({item}) => {
  const user = useSelector(userSelector);
  const accessToken = useSelector(accessTokenSelector);

  return (
    <Container>
      {item.user?._id != user?.id && <AuthorName>{item.user?.name}</AuthorName>}
      <Content isAuthor={user?.id == item.user?._id}>
        {item.user?._id != user?.id && (
          <Avatar
            mr={1}
            size={'sm'}
            source={{
              uri: `${BASE_DOMAIN}${item.user?.avatar}`,
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }}
          />
        )}
        <TextWrapper isAuthor={user?.id == item.user?._id}>
          <Text isAuthor={user?.id == item.user?._id}>{item.text}</Text>
        </TextWrapper>
      </Content>
    </Container>
  );
};

const Container = styled.View`
  margin: 0px 8px 0px 8px;
`;

const Content = styled.View<{isAuthor: boolean}>`
  flex-direction: row;
  margin: 2px 10px 5px 10px;
  justify-content: ${props => (props.isAuthor ? 'flex-end' : 'flex-start')};
`;

const TextWrapper = styled.View<{isAuthor: boolean}>`
  border-radius: 15px;
  max-width: ${Constants.MAX_WIDTH - 120}px;
  background-color: ${props =>
    props.isAuthor ? colors.ROYAL_BLUE : colors.CONCRETE};
`;

const Text = styled(fonts.PrimaryFontMediumSize14)<{isAuthor: boolean}>`
  margin: 8px 15px 10px 15px;
  color: ${props => (props.isAuthor ? colors.WHITE : colors.TEXT)};
`;

const AuthorName = styled(fonts.PrimaryFontRegularSize10)`
  margin-left: 48px;
  color: ${colors.SILVER};
`;

export default TextMessageItem;
