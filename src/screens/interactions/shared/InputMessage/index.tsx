import PrimaryButton from '@components/PrimaryButton';
import {Constants} from '@constants/Constants';
import {sendIcon} from '@constants/sources';
import i18n from '@locales/index';
import colors from '@themes/colors';
import {isNull} from '@utils/index';
import {Input} from 'native-base';
import React from 'react';
import styled from 'styled-components/native';

interface Props {
  text: string;
  onChangeText?: (text: string) => void;
  onPressSend?: () => void;
}

const InputMessage: React.FC<Props> = ({text, onChangeText, onPressSend}) => {
  return (
    <Container>
      <Input
        flex={1}
        borderWidth={0}
        borderTopWidth={1}
        borderTopColor={colors.CONCRETE}
        value={text}
        color={colors.TEXT}
        placeholder={i18n.t('interaction.typeAMessage')}
        onChangeText={onChangeText}
      />
      <SendButton
        marginLeft={10}
        marginRight={10}
        leftIconWidth={32}
        leftIconHeight={32}
        leftSource={sendIcon}
        leftTintColor={colors.CORNFLOWER_BLUE}
        onPress={onPressSend}
      />
    </Container>
  );
};

const Container = styled.View`
  height: 44px;
  flex-direction: row;
  align-items: center;
  width: ${Constants.MAX_WIDTH}px;
  background-color: ${colors.WHITE};
`;

const SendButton = styled(PrimaryButton)`
  width: 32px;
  height: 32px;
`;

const EmptyView = styled.View`
  width: 32px;
  height: 32px;
  margin-left: 10px;
  margin-right: 10px;
`;

export default InputMessage;
