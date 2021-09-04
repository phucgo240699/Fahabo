import {Text} from 'native-base';
import Colors from '@themes/colors';
import React, {memo, useState} from 'react';
import {Keyboard, Platform, StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import AuthenticationHeader from '@components/AuthenticationHeader';
import styled from 'styled-components/native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Constants} from '@constants/Constants';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {useRoute} from '@react-navigation/native';

const CELL_COUNT = 4;

interface Props {
  route?: any;
}

const SignUpScreen: React.FC<Props> = ({route}) => {
  // const route = useRoute();
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
          <FocusAwareStatusBar
            barStyle="dark-content"
            backgroundColor={Colors.WHITE}
            translucent
          />
          <AuthenticationHeader
            title="Pin code"
            titleColor={Colors.SUNGLOW}
            marginTop={Platform.OS === 'android' ? getStatusBarHeight() : 0}
          />
          {route && route.params && route.params.address && (
            <Text
              mt={1}
              fontSize="md"
              color={Colors.SILVER}
              textAlign="center"
              alignSelf="center">
              {`A pin code is sent to\n ${route.params.address ?? ''}`}
            </Text>
          )}
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
              <PinCell
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </PinCell>
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
const PinCell = styled.Text``;

const styles = StyleSheet.create({
  codeFieldRoot: {marginTop: 40, width: 340, alignSelf: 'center'},
  cell: {
    width: 64,
    height: 64,
    margin: 8,
    marginTop: 30,
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
