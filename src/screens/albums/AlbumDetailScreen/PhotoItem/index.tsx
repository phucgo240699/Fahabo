import PrimaryIcon from '@components/PrimaryIcon';
import {Constants} from '@constants/Constants';
import {tickIcon} from '@constants/sources';
import {PhotoType} from '@constants/types/albums';
import i18n from '@locales/index';
import {Image} from 'native-base';
import React from 'react';
import styled from 'styled-components/native';

interface Props {
  item: PhotoType;
  width?: number;
  height?: number;
  isSelected?: boolean;
  onPress?: (item: PhotoType) => void;
}

const PhotoItem: React.FC<Props> = ({
  item,
  width = (Constants.MAX_WIDTH - 6) / 3,
  height = (Constants.MAX_WIDTH - 6) / 3,
  isSelected,
  onPress,
}) => {
  const onPressContainer = () => {
    if (onPress) {
      onPress(item);
    }
  };
  return (
    <Container width={width} height={height} onPress={onPressContainer}>
      <Image
        flex={1}
        source={{uri: item.uri}}
        alt={i18n.t('application.loading')}
      />
      {isSelected && (
        <SelectedIconContainer>
          <PrimaryIcon
            tintColor={'#ffffff'}
            width={12}
            height={12}
            source={tickIcon}
          />
        </SelectedIconContainer>
      )}
    </Container>
  );
};

const Container = styled.TouchableOpacity<{width: number; height: number}>`
  margin: 1px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;

const SelectedIconContainer = styled.View`
  top: 6px;
  right: 6px;
  width: 28px;
  height: 28px;
  border-width: 1px;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  position: absolute;
  border-color: #ffffff;
  background-color: #0078f0;
`;

export default React.memo(PhotoItem);
