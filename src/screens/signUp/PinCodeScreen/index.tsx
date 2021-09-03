import React, {memo, useState} from 'react';
import Colors from '@themes/colors';
import {Keyboard, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import AuthenticationHeader from '@components/AuthenticationHeader';
import {Constants} from '@constants/Constants';

const CELL_COUNT = 4;

interface Props {}

const SignUpScreen: React.FC<Props> = () => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const onPressBackground = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeView>
      <Container onPress={onPressBackground}>
        <Content>
          <AuthenticationHeader title="Pin code" titleColor={Colors.SUNGLOW} />
          <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </Content>
      </Container>
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.WHITE};
`;
const Container = styled.TouchableWithoutFeedback`
  width: ${Constants.MAX_WIDTH}px;
  height: ${Constants.MAX_HEIGHT}px;
  background-color: ${Colors.WHITE};
`;
const Content = styled.View`
  flex: 1;
`;
const Text = styled.Text``;

const styles = StyleSheet.create({
  codeFieldRoot: {marginTop: 40, width: 340, alignSelf: 'center'},
  cell: {
    width: 64,
    height: 64,
    margin: 8,
    borderRadius: 12,
    fontSize: 48,
    fontWeight: '700',
    borderWidth: 2,
    borderColor: Colors.SILVER,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});

export default memo(SignUpScreen);
