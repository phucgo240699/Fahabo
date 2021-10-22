import {Constants} from '@constants/Constants';
import i18n from '@locales/index';
import {Image} from 'native-base';
import React from 'react';
import styled from 'styled-components/native';

interface Props {
  item: any;
  onPress?: (item: any) => void;
}

const PhotoItem: React.FC<Props> = ({item, onPress}) => {
  const onPressContainer = () => {
    if (onPress) {
      onPress(item);
    }
  };
  return (
    <Container onPress={onPressContainer}>
      <Image
        flex={1}
        source={{uri: item.uri}}
        alt={i18n.t('application.loading')}
      />
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  margin: 1px;
  width: ${(Constants.MAX_WIDTH - 8) / 4}px;
  height: ${(Constants.MAX_WIDTH - 8) / 4}px;
`;

export default React.memo(PhotoItem);
