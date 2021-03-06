import React, {memo} from 'react';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import i18n from '@locales/index';
import fonts from '@themes/fonts';
import PrimaryButton from '@components/PrimaryButton';
import {Box, Image} from 'native-base';
import {Constants} from '@constants/Constants';
import {PhotoType} from '@constants/types/albums';

interface Props {
  title?: string;
  data: PhotoType[];
  hideViewAll?: boolean;
  onPressItem?: (index: number) => void;
  onPressViewAll?: () => void;
}

const ProfileAlbumBox: React.FC<Props> = ({
  title,
  data,
  hideViewAll,
  onPressItem,
  onPressViewAll,
}) => {
  return (
    <Container>
      <Header>
        <AlbumLabel>{title ?? i18n.t('album.previewAlbum')}</AlbumLabel>
        {!hideViewAll && (
          <PrimaryButton
            titleColor={colors.HYPER_LINK}
            title={i18n.t('profile.viewAll')}
            onPress={onPressViewAll}
          />
        )}
      </Header>
      <Box
        flexDirection={'row'}
        justifyContent={'flex-start'}
        flexWrap={'wrap'}>
        {data.map((item, index) => {
          return (
            <Picture
              key={index}
              item={item}
              index={index}
              onPress={onPressItem}
            />
          );
        })}
      </Box>
    </Container>
  );
};

const Picture: React.FC<{
  item: any;
  index: number;
  onPress?: (index: number) => void;
}> = ({item, index, onPress}) => {
  const onPressContainer = () => {
    if (onPress) {
      onPress(index);
    }
  };
  return (
    <PictureContainer onPress={onPressContainer}>
      <Image
        flex={1}
        borderRadius={10}
        source={{uri: item.uri}}
        alt={i18n.t('application.loading')}
      />
    </PictureContainer>
  );
};

const Container = styled.View`
  margin-top: 40px;
`;

const Header = styled.View`
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const AlbumLabel = styled(fonts.PrimaryFontMediumSize18)`
  color: ${colors.BLACK};
`;

const PictureContainer = styled.TouchableOpacity<{marginLeft?: number}>`
  margin-top: 5px;
  margin-left: 5px;
  width: ${(Constants.MAX_WIDTH - 80) / 3}px;
  height: ${(Constants.MAX_WIDTH - 80) / 3}px;
`;

export default memo(ProfileAlbumBox);
