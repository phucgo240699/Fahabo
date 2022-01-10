import colors from '@themes/colors';
import React from 'react';
import styled from 'styled-components/native';

interface Props {
  sourceIcon: any;
  isAppleBtn?: boolean;
  onPress?: () => void;
}

const ThirdPartyAuthButton: React.FC<Props> = ({
  sourceIcon,
  isAppleBtn,
  onPress,
}) => {
  return (
    <Container isAppleBtn={isAppleBtn} onPress={onPress}>
      {isAppleBtn ? (
        <AppleIcon source={sourceIcon} />
      ) : (
        <Icon source={sourceIcon} />
      )}
    </Container>
  );
};

const Container = styled.TouchableOpacity<{isAppleBtn?: boolean}>`
  padding: 8px;
  border-radius: 8px
  background-color: ${props =>
    props.isAppleBtn ? colors.BLACK : colors.WHITE};
`;

const Icon = styled.Image`
  width: 36px;
  height: 36px;
`;

const AppleIcon = styled.Image`
  width: 24px;
  height: 24px;
  tint-color: ${colors.WHITE};
`;

export default React.memo(ThirdPartyAuthButton);
