import {Input} from 'native-base';
import colors from '@themes/colors';
import {Platform, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {Constants} from '@constants/Constants';
import PrimaryIcon from '@components/PrimaryIcon';
import PrimaryButton from '@components/PrimaryButton';
import PrimarySearchBar from '@components/PrimarySearchBar';
import {searchIcon, clearIcon, bellIcon} from '@constants/sources/index';

interface Props {
  onChangeText?: (text: string) => void;
}

const PrimaryHeader: React.FC<Props> = ({onChangeText}) => {
  // const [text, setText] = useState('');

  // const onClearText = () => {
  //   onUpdateText('');
  // };

  // const onUpdateText = (_text: string) => {
  //   setText(_text);
  //   if (onChangeText) {
  //     onChangeText(_text);
  //   }
  // };

  return (
    <Container>
      {/* <Input
        py={2}
        value={text}
        borderRadius={10}
        width={Constants.MAX_WIDTH - 80}
        variant="filled"
        alignSelf="center"
        placeholder="Search"
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
      )} */}
      <PrimarySearchBar
        containerStyle={styles.search}
        marginLeft={10}
        onChangeText={onChangeText}
      />
      <PrimaryButton
        marginLeft={10}
        marginRight={10}
        leftIconWidth={24}
        leftIconHeight={24}
        leftSource={bellIcon}
        leftTintColor={colors.THEME_COLOR_7}
      />
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const styles = StyleSheet.create({
  search: {
    flex: 1,
  },
});

export default React.memo(PrimaryHeader);
