import React from 'react';
import styled from 'styled-components/native';

interface Props {
  sourceIcon: any;
  onPress?: () => void;
}

const ThirdPartyAuthButton: React.FC<Props> = ({sourceIcon, onPress}) => {
  return (
    <Container onPress={onPress}>
      <Icon source={sourceIcon} />
    </Container>
  );
};

const Container = styled.TouchableOpacity``;

const Icon = styled.Image`
  width: 40px;
  height: 40px;
  margin-left: 10px;
  margin-right: 10px;
`;

export default React.memo(ThirdPartyAuthButton);
