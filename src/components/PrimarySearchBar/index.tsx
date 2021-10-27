import {Input} from 'native-base';
import colors from '@themes/colors';
import {Platform} from 'react-native';
import styled from 'styled-components/native';
import PrimaryIcon from '@components/PrimaryIcon';
import React, {useRef} from 'react';
import PrimaryButton from '@components/PrimaryButton';
import {searchIcon, clearIcon} from '@constants/sources/index';
import i18n from '@locales/index';

interface Props {
  text: string;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
  containerStyle?: any;
  onChangeText?: (text: string) => void;
  onSubmitText?: (text: string) => void;
}

const PrimarySearchBar: React.FC<Props> = ({
  text,
  marginTop,
  marginLeft,
  marginRight,
  marginBottom,
  containerStyle,
  onChangeText,
  onSubmitText,
  ...otherProps
}) => {
  const onClearText = () => {
    onUpdateText('');
  };

  const onUpdateText = (_text: string) => {
    if (onChangeText) {
      onChangeText(_text);
    }
  };
  const onSubmitEditing = () => {
    if (onSubmitText) {
      onSubmitText(text);
    }
  };

  return (
    <Container
      marginTop={marginTop}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginBottom={marginBottom}
      style={containerStyle}
      {...otherProps}>
      <Input
        py={2}
        height={10}
        value={text}
        borderRadius={10}
        variant="filled"
        alignSelf="center"
        placeholder={i18n.t('header.search')}
        bg={colors.CONCRETE}
        color={colors.BLACK}
        returnKeyType={'search'}
        clearButtonMode="while-editing"
        InputLeftElement={
          <PrimaryIcon
            marginLeft={14}
            source={searchIcon}
            width={18}
            height={18}
          />
        }
        onChangeText={onUpdateText}
        onSubmitEditing={onSubmitEditing}
      />
      {Platform.OS === 'android' && text !== '' && (
        <PrimaryButton
          leftIconWidth={18}
          leftIconHeight={18}
          leftSource={clearIcon}
          leftTintColor={colors.SILVER}
          containerStyle={{position: 'absolute', top: 6, right: 6}}
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
}>``;

export default PrimarySearchBar;
