import React from 'react';
import i18n from '@locales/index';
import colors from '@themes/colors';
import {Box, FormControl} from 'native-base';
import styled from 'styled-components/native';
import {ChoreStatus} from '@constants/types/chores';
import PrimaryButton from '@components/PrimaryButton';
import {getChoreStatusColor, getChoreStatusText} from '@utils/chores';

interface Props {
  status?: ChoreStatus;
  onChangeStatus?: (value: ChoreStatus) => void;
}

const ChoreStatusBox: React.FC<Props> = ({status, onChangeStatus}) => {
  const onPressDone = () => {
    if (onChangeStatus) {
      onChangeStatus(ChoreStatus.DONE);
    }
  };
  const onPressInProgress = () => {
    if (onChangeStatus) {
      onChangeStatus(ChoreStatus.IN_PROGRESS);
    }
  };
  const onPressExpired = () => {
    if (onChangeStatus) {
      onChangeStatus(ChoreStatus.EXPIRED);
    }
  };
  return (
    <Box mt={8} mb={6} width={'100%'}>
      <FormControl.Label
        _text={{color: colors.DANUBE, fontSize: 'sm', fontWeight: 500}}>
        {`${i18n.t('chores.status')}:`}
      </FormControl.Label>
      <Box flex={1} flexDirection={'row'}>
        <StatusButton
          titleFontSize={12}
          titleFontWeight={600}
          titleColor={colors.WHITE}
          onPress={onPressDone}
          isChosen={status === ChoreStatus.DONE}
          title={getChoreStatusText(ChoreStatus.DONE)}
          backgroundColor={getChoreStatusColor(ChoreStatus.DONE)}
        />
        <StatusButton
          titleFontSize={12}
          titleFontWeight={600}
          titleColor={colors.WHITE}
          onPress={onPressInProgress}
          isChosen={status === ChoreStatus.IN_PROGRESS}
          title={getChoreStatusText(ChoreStatus.IN_PROGRESS)}
          backgroundColor={getChoreStatusColor(ChoreStatus.IN_PROGRESS)}
        />
        <StatusButton
          titleFontSize={12}
          titleFontWeight={600}
          titleColor={colors.WHITE}
          onPress={onPressExpired}
          isChosen={status === ChoreStatus.EXPIRED}
          title={getChoreStatusText(ChoreStatus.EXPIRED)}
          backgroundColor={getChoreStatusColor(ChoreStatus.EXPIRED)}
        />
      </Box>
    </Box>
  );
};

const StatusButton = styled(PrimaryButton)<{
  isChosen?: boolean;
  backgroundColor: string;
}>`
  width: 80px;
  height: 32px;
  margin-right: 10px;
  border-radius: 16px;
  border-color: ${colors.BLACK};
  border-width: ${props => (props.isChosen ? 4 : 0)}px;
  background-color: ${props => props.backgroundColor};
`;

export default React.memo(ChoreStatusBox);
