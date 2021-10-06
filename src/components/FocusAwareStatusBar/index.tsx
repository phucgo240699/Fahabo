import React from 'react';
import {StatusBar} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {isLoadingSelector} from '@store/selectors/session';
import colors from '@themes/colors';

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
  const loading = useSelector(isLoadingSelector);

  return isFocused ? (
    <StatusBar
      barStyle={barStyle}
      translucent={translucent}
      backgroundColor={
        loading === true ? colors.BLACK_ALPHA50 : backgroundColor
      }
    />
  ) : null;
};

export default React.memo(FocusAwareStatusBar);
