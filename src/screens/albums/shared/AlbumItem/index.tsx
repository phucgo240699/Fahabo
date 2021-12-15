import React from 'react';
import {Box, Button, Image, Menu, Pressable} from 'native-base';
import fonts from '@themes/fonts';
import i18n from '@locales/index';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {placeholderImage, verticalOptions} from '@constants/sources';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {isNull} from '@utils/index';
import PrimaryButton from '@components/PrimaryButton';
import PrimaryIcon from '@components/PrimaryIcon';
import {AlbumType} from '@constants/types/albums';

interface Props {
  item: AlbumType;
  maxWidth: number;
  maxHeight: number;
  onPress?: (item: any) => void;
  onPressUpdate?: (item: any) => void;
  onPressDelete?: (item: any) => void;
}

const AlbumItem: React.FC<Props> = ({
  item,
  maxWidth,
  maxHeight,
  onPress,
  onPressUpdate,
  onPressDelete,
}) => {
  const [shouldOverlapWithTrigger] = React.useState(false);
  const [position, setPosition] = React.useState('auto');

  const onPressTouchable = () => {
    if (onPress) {
      onPress(item);
    }
  };
  const onPressUpdateOption = () => {
    if (onPressUpdate) {
      onPressUpdate(item);
    }
  };
  const onPressDeleteOption = () => {
    if (onPressDelete) {
      onPressDelete(item);
    }
  };

  return (
    <Box mt={2} mr={4} width={maxWidth}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPressTouchable}>
        {isNull(item.uri) ? (
          <Image
            borderRadius={8}
            width={maxWidth}
            height={maxHeight}
            source={placeholderImage}
            alt={i18n.t('application.loading')}
          />
        ) : (
          <Image
            borderRadius={8}
            width={maxWidth}
            height={maxHeight}
            source={{uri: item.uri}}
            alt={i18n.t('application.loading')}
          />
        )}
      </TouchableOpacity>
      <Title>{item.index === 0 ? i18n.t('album.general') : item.title}</Title>
      <TotalNumber>{item.totalPhotos}</TotalNumber>
      <Menu
        width={160}
        borderWidth={0}
        backgroundColor={colors.WHITE}
        shouldOverlapWithTrigger={shouldOverlapWithTrigger} // @ts-ignore
        placement={undefined} //{position == 'auto' ? undefined : position}
        trigger={triggerProps => {
          return (
            <Pressable
              top={2}
              right={2}
              width={8}
              height={8}
              borderRadius={20}
              bgColor={colors.GRAY}
              position={'absolute'}
              alignItems={'center'}
              justifyContent={'center'}
              {...triggerProps}>
              <OptionsIcon tintColor={colors.WHITE} source={verticalOptions} />
            </Pressable>
          );
        }}>
        <Menu.Item onPress={onPressUpdateOption} _text={{color: colors.TEXT}}>
          {i18n.t('album.update')}
        </Menu.Item>
        <Menu.Item onPress={onPressDeleteOption} _text={{color: colors.RED_1}}>
          {i18n.t('album.delete')}
        </Menu.Item>
      </Menu>
    </Box>
  );
};

const Title = styled(fonts.PrimaryFontRegularSize16)`
  margin-top: 6px;
`;
const TotalNumber = styled(fonts.PrimaryFontRegularSize12)`
  color: ${colors.GRAY}
  margin-top: 4px
`;
const OptionsIcon = styled(PrimaryIcon)``;

export default React.memo(AlbumItem);
