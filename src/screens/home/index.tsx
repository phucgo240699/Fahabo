import React, {memo} from 'react';
import styled from 'styled-components/native';

interface Props {}

const HomeScreen: React.FC<Props> = () => {
  return (
    <Container>
      <Title>Home Screen</Title>
    </Container>
  );
};

const Container = styled.View``;

const Title = styled.Text``;

export default memo(HomeScreen);
