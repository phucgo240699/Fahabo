import colors from '@themes/colors';
import fonts from '@themes/fonts';
import {Text} from 'native-base';
import React from 'react';
import {Linking} from 'react-native';
import styled from 'styled-components/native';

interface Props {
  link: string;
  onBeforeOpenWeb?: () => void;
  onAfterOpenWeb?: () => void;
}

const PrimaryHyperLink: React.FC<Props> = ({
  link,
  onBeforeOpenWeb,
  onAfterOpenWeb,
  ...otherProps
}) => {
  const onPressContainer = () => {
    Linking.canOpenURL(link).then(allow => {
      if (allow) {
        if (onBeforeOpenWeb) {
          onBeforeOpenWeb();
        }
        Linking.openURL(link);
        if (onAfterOpenWeb) {
          onAfterOpenWeb();
        }
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
