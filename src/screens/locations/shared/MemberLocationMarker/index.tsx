import colors from '@themes/colors';
import fonts from '@themes/fonts';
import React from 'react';
import styled from 'styled-components/native';

interface Props {
  name?: string;
  avatar?: string;
}

const MemberLocationMarker: React.FC<Props> = ({name, avatar}) => {
  return (
    <Container>
      <Avatar source={{uri: avatar}} />
      <Name>{name}</Name>
    </Container>
  );
};

const Container = styled.View`
  align-items: center;
`;

const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const Name = styled(fonts.PrimaryFontBoldSize14)`
  width: 150px;
  margin-top: 5px;
  text-align: center;
  color: ${colors.GRAY};
`;

export default MemberLocationMarker;
