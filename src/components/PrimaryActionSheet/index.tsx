import React from 'react';
import {
  FlatList,
  Box,
  useDisclose,
  Actionsheet,
  Modal,
  FormControl,
  Input,
  Button,
  IActionsheetProps,
  View,
} from 'native-base';
import PrimaryActionSheetItem from '@components/PrimaryActionSheetItem';
import {getInset} from 'react-native-safe-area-view';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import i18n from '@locales/index';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  items: {
    title: string;
    onPress?: () => void;
  }[];
}

const PrimaryActionSheet: React.FC<Props> = ({isOpen, items, onClose}) => {
  const bottomInset = getInset('bottom', false);
  return (
    <Actionsheet
      pb={bottomInset}
      isOpen={isOpen}
      onClose={onClose}
      bgColor={colors.WHITE}>
      {items?.map((item, index) => {
        return (
          <View key={index}>
            <PrimaryActionSheetItem title={item.title} onPress={item.onPress} />
            <HLine />
          </View>
        );
      })}

      <PrimaryActionSheetItem
        title={i18n.t('family.cancel')}
        titleColor={colors.RED_1}
        onPress={onClose}
      />
    </Actionsheet>
  );
};

const HLine = styled.View`
  width: 80%;
  height: 1px;
  background-color: ${colors.CONCRETE};
`;

export default React.memo(PrimaryActionSheet);
