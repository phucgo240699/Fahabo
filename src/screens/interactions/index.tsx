import React from 'react';
import {Box, Text} from 'native-base';
import colors from '@themes/colors';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import PrimaryButton from '@components/PrimaryButton';
import {useDispatch, useSelector} from 'react-redux';
import {connectTwilioRequestActions} from '@store/actionTypes/interactions';
import {focusFamilySelector} from '@store/selectors/family';
import {isNull} from '@utils/index';

interface Props {}

const InteractionsScreen: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const focusFamily = useSelector(focusFamilySelector);

  return (
    <Box flex={1} safeArea bgColor={colors.WHITE}>
      <FocusAwareStatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
      />
      <PrimaryButton
        marginTop={50}
        title="Move to conference call"
        onPress={() => {
          if (!isNull(focusFamily?.id)) {
            dispatch(connectTwilioRequestActions({familyId: focusFamily?.id}));
          }
        }}
      />
    </Box>
  );
};

export default InteractionsScreen;
