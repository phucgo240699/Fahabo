import React from 'react';
import styled from 'styled-components/native';
import Colors from '@themes/colors';
import {useDispatch} from 'react-redux';
import {CommonActions, useNavigation} from '@react-navigation/native';

interface Props {}

const AuthenticationHeader: React.FC<Props> = () => {
  const navigation = useNavigation();

  const onPressBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  return (
    <Container>
      <IconContainer onPress={onPressBack}>
        <Icon source={require('@assets/images/navigation_back_icon.png')} />
      </IconContainer>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  height: 50px;
  justify-content: center;
`;

const IconContainer = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  margin-left: 4px;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.Image`
  width: 24px;
  height: 24px;
  tint-color: ${Colors.SUNGLOW};
`;

export default React.memo(AuthenticationHeader);
