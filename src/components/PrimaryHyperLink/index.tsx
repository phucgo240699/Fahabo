import colors from '@themes/colors';
import fonts from '@themes/fonts';
import {Text} from 'native-base';
import React from 'react';
import {Linking} from 'react-native';
import styled from 'styled-components/native';

interface Props {
  link: string;
  // onPress?: () => void;
}

const PrimaryHyperLink: React.FC<Props> = ({link, ...otherProps}) => {
  const onPressContainer = () => {
    Linking.canOpenURL(link).then(allow => {
      if (allow) {
        Linking.openURL(link);
      }
    });
  };
  return (
    <Container onPress={onPressContainer} {...otherProps}>
      <Text color={colors.HYPER_LINK} underline>
        {link}
      </Text>
    </Container>
  );
};

const Container = styled.TouchableOpacity``;

export default React.memo(PrimaryHyperLink);
