import {accessTokenSelector} from '@store/selectors/authentication';
import colors from '@themes/colors';
import fonts from '@themes/fonts';
import React from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';

interface Props {
  name?: string;
  avatar?: string;
}

const MemberLocationMarker: React.FC<Props> = ({name, avatar}) => {
  const accessToken = useSelector(accessTokenSelector);

  return (
    <Container>
      <Avatar
        source={{
          uri: avatar,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }}
      />
      <Name>{name}</Name>
    </Container>
  );
};

const Container = styled.View`
  align-items: center;
`;

const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const Name = styled(fonts.PrimaryFontBoldSize14)`
  width: 150px;
  margin-top: 5px;
  text-align: center;
  color: ${colors.GRAY};
`;

export default MemberLocationMarker;
