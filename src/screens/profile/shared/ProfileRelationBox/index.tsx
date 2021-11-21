import React, {memo} from 'react';
import colors from '@themes/colors';
import i18n from '@locales/index';
import fonts from '@themes/fonts';
import styled from 'styled-components/native';
import {choresIconColor, eventsIconColor} from '@constants/sources/index';
import {Constants} from '@constants/Constants';

interface Props {
  onPressChores?: () => void;
  onPressEvents?: () => void;
}

const ProfileRelationBox: React.FC<Props> = ({
  onPressChores,
  onPressEvents,
}) => {
  return (
    <Container>
      <Button onPress={onPressChores}>
        <Icon source={choresIconColor} />
        <Label>{i18n.t('chores.chores')}</Label>
      </Button>
      <VerticalLine />
      <Button onPress={onPressEvents}>
        <Icon source={eventsIconColor} />
        <Label>{i18n.t('events.events')}</Label>
      </Button>
    </Container>
  );
};

const Container = styled.View`
  elevation: 6;
  margin-top: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 10px;
  flex-direction: row;
  shadow-opacity: 0.2;
  shadow-radius: 10px;
  justify-content: space-around;
  shadow-color: ${colors.BLACK};
  background-color: ${colors.WHITE};
  width: ${Constants.MAX_WIDTH - 100}px;
`;

const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

const Icon = styled.Image`
  width: 32px;
  height: 32px;
`;

const Label = styled(fonts.PrimaryFontMediumSize14)`
  margin-top: 10px;
  color: ${colors.DARK_GRAY};
`;

const VerticalLine = styled.View`
  width: 1px;
  height: 64px;
  background-color: ${colors.SILVER};
`;

export default memo(ProfileRelationBox);
