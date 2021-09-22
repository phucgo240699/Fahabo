import React, {memo} from 'react';
import colors from '@themes/colors';
import i18n from '@locales/index';
import fonts from '@themes/fonts';
import styled from 'styled-components/native';
import {choresIcon, eventsIcon} from '@constants/sources/index';

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
        <Icon source={choresIcon} />
        <Label>{i18n.t('chores.chores')}</Label>
      </Button>
      <VerticalLine />
      <Button onPress={onPressEvents}>
        <Icon source={eventsIcon} />
        <Label>{i18n.t('events.events')}</Label>
      </Button>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  margin-top: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-around;
  background-color: ${colors.WHITE};
  shadow-color: ${colors.BLACK};
  shadow-opacity: 0.15;
  shadow-radius: 10px;
  elevation: 6;
`;

const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

const Icon = styled.Image`
  width: 32px;
  height: 32px;
`;

const Label = styled(fonts.PrimaryFontRegularSize14)`
  margin-top: 10px;
  color: ${colors.GRAY};
`;

const VerticalLine = styled.View`
  width: 1px;
  height: 64px;
  background-color: ${colors.SILVER};
`;

export default memo(ProfileRelationBox);
