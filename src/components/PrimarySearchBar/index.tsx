import React, {createRef, useCallback, useState} from 'react';
import {Box, Input} from 'native-base';
import colors from '@themes/colors';
import PrimaryIcon from '@components/PrimaryIcon';
import {searchIcon, clearIcon} from '@constants/sources/index';
import styled from 'styled-components/native';
import {Platform} from 'react-native';
import PrimaryButton from '@components/PrimaryButton';

interface Props {
  // text: string;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
  onChangeText?: (text: string) => void;
}

const PrimarySearchBar: React.FC<Props> = ({
  // text,
  marginTop,
  marginLeft = 4,
  marginRight = 4,
  marginBottom,
  onChangeText,
}) => {
  const [text, setText] = useState('');

  const onClearText = useCallback(() => {
    onUpdateText('');
  }, []);

  const onUpdateText = useCallback((_text: string) => {
    setText(_text);
    if (onChangeText) {
      onChangeText(_text);
    }
  }, []);

  return (
    <Container>
      <Input
        py={2}
        px={2}
        value={text}
        borderRadius={10}
        variant="filled"
        alignSelf="center"
        placeholder="Search"
        bg={colors.CONCRETE}
        color={colors.BLACK}
        marginTop={marginTop}
        marginLeft={marginLeft}
        marginRight={marginRight}
        marginBottom={marginBottom}
        returnKeyType={'search'}
        clearButtonMode="while-editing"
        InputLeftElement={
          <PrimaryIcon
            marginLeft={8}
            source={searchIcon}
            width={18}
            height={18}
          />
        }
        onChangeText={onUpdateText}
      />
      {Platform.OS === 'android' && text !== '' && (
        <PrimaryButton
          leftIconWidth={18}
          leftIconHeight={18}
          leftSource={clearIcon}
          leftTintColor={colors.SILVER}
          containerStyle={{position: 'absolute', right: 30}}
          onPress={onClearText}
        />
      )}
    </Container>
  );
};

const Container = styled.View<{
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
}>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: ${props => props.marginTop ?? 0}px;
  margin-left: ${props => props.marginLeft ?? 0}px;
  margin-right: ${props => props.marginRight ?? 0}px;
  margin-bottom: ${props => props.marginBottom ?? 0}px;
`;

export default React.memo(PrimarySearchBar);
