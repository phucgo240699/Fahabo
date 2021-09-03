import React from 'react';
import {StatusBar} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

interface Props {
  barStyle: any;
  translucent: boolean;
  backgroundColor: string;
}

const FocusAwareStatusBar: React.FC<Props> = ({
  barStyle,
  translucent,
  backgroundColor,
}) => {
  const isFocused = useIsFocused();

  return isFocused ? (
    <StatusBar
      barStyle={barStyle}
      translucent={translucent}
      backgroundColor={backgroundColor}
    />
  ) : null;
};

export default FocusAwareStatusBar;
