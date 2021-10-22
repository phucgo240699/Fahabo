import React from 'react';
import {Box, FlatList, Image} from 'native-base';
import fonts from '@themes/fonts';
import i18n from '@locales/index';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {plusIcon} from '@constants/sources';
import ProfileHeader from '@components/ProfileHeader';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import PrimaryButton from '@components/PrimaryButton';
import {DummyAlbums} from '@constants/DummyData';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props {
  item: any;
  maxWidth: number;
  maxHeight: number;
  onPress?: (item: any) => void;
}

const AlbumItem: React.FC<Props> = ({item, maxWidth, maxHeight, onPress}) => {
  const onPressTouchable = () => {
    if (onPress) {
      onPress(item);
    }
  };
  return (
    <Box mt={2} mr={4} width={maxWidth}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPressTouchable}>
        <Image
          borderRadius={8}
          width={maxWidth}
          height={maxHeight}
          source={{uri: item.uri}}
          alt={i18n.t('application.loading')}
        />
      </TouchableOpacity>
      <Title>{item.isDefault ? i18n.t('album.general') : item.title}</Title>
      <TotalNumber>{item.totalPictures}</TotalNumber>
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

export default React.memo(AlbumItem);
