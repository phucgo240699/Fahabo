import React from 'react';
import styled from 'styled-components/native';
import Colors from '@themes/colors';
import {Text} from 'native-base';
import {CommonActions, useNavigation} from '@react-navigation/native';

interface Props {
  title?: string;
  marginTop?: number;
}

const AuthenticationHeader: React.FC<Props> = ({title, marginTop}) => {
  const navigation = useNavigation();

  const onPressBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  return (
    <Container marginTop={marginTop}>
      <IconContainer onPress={onPressBack}>
        <Icon source={require('@assets/images/navigation_back_icon.png')} />
      </IconContainer>
      <Text fontSize="4xl" color={Colors.SUNGLOW}>
        {title}
      </Text>
      <EmptyView />
    </Container>
  );
};

const Container = styled.View<{marginTop?: number}>`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${props => props.marginTop ?? 0}px;
`;

const IconContainer = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.Image`
  width: 32px;
  height: 32px;
  tint-color: ${Colors.SUNGLOW};
`;

const EmptyView = styled.View`
  width: 32px;
  height: 32px;
  background-color: transparent;
`;

export default React.memo(AuthenticationHeader);
