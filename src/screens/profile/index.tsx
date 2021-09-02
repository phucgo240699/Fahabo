import React, {memo} from 'react';
import styled from 'styled-components/native';

interface Props {}

const ProfileScreen: React.FC<Props> = () => {
  return (
    <Container>
      <Title>Profile Screen</Title>
    </Container>
  );
};

const Container = styled.View``;

const Title = styled.Text``;

export default memo(ProfileScreen);
