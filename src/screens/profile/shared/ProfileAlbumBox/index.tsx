import React, {memo} from 'react';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import i18n from '@locales/index';
import fonts from '@themes/fonts';
import PrimaryButton from '@components/PrimaryButton';
import {Box, Image} from 'native-base';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Constants} from '@constants/Constants';

const DATA = [
  {
    id: '1',
    url: 'https://scontent-hkt1-2.xx.fbcdn.net/v/t1.6435-9/53014737_2233858510162760_5278280928634863616_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=gfj-D8f-ThUAX___DMV&_nc_ht=scontent-hkt1-2.xx&oh=549ee43899ea3723475b63f5ae5d50dd&oe=61696260',
  },
  {
    id: '2',
    url: 'https://scontent-hkt1-2.xx.fbcdn.net/v/t1.6435-9/53014737_2233858510162760_5278280928634863616_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=gfj-D8f-ThUAX___DMV&_nc_ht=scontent-hkt1-2.xx&oh=549ee43899ea3723475b63f5ae5d50dd&oe=61696260',
  },
  {
    id: '3',
    url: 'https://scontent-hkt1-2.xx.fbcdn.net/v/t1.6435-9/53014737_2233858510162760_5278280928634863616_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=gfj-D8f-ThUAX___DMV&_nc_ht=scontent-hkt1-2.xx&oh=549ee43899ea3723475b63f5ae5d50dd&oe=61696260',
  },
  {
    id: '4',
    url: 'https://scontent-hkt1-2.xx.fbcdn.net/v/t1.6435-9/53014737_2233858510162760_5278280928634863616_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=gfj-D8f-ThUAX___DMV&_nc_ht=scontent-hkt1-2.xx&oh=549ee43899ea3723475b63f5ae5d50dd&oe=61696260',
  },
  {
    id: '5',
    url: 'https://scontent-hkt1-2.xx.fbcdn.net/v/t1.6435-9/53014737_2233858510162760_5278280928634863616_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=gfj-D8f-ThUAX___DMV&_nc_ht=scontent-hkt1-2.xx&oh=549ee43899ea3723475b63f5ae5d50dd&oe=61696260',
  },
  {
    id: '6',
    url: 'https://scontent-hkt1-2.xx.fbcdn.net/v/t1.6435-9/53014737_2233858510162760_5278280928634863616_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=gfj-D8f-ThUAX___DMV&_nc_ht=scontent-hkt1-2.xx&oh=549ee43899ea3723475b63f5ae5d50dd&oe=61696260',
  },
  {
    id: '7',
    url: 'https://scontent-hkt1-2.xx.fbcdn.net/v/t1.6435-9/53014737_2233858510162760_5278280928634863616_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=gfj-D8f-ThUAX___DMV&_nc_ht=scontent-hkt1-2.xx&oh=549ee43899ea3723475b63f5ae5d50dd&oe=61696260',
  },
  {
    id: '8',
    url: 'https://scontent-hkt1-2.xx.fbcdn.net/v/t1.6435-9/53014737_2233858510162760_5278280928634863616_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=gfj-D8f-ThUAX___DMV&_nc_ht=scontent-hkt1-2.xx&oh=549ee43899ea3723475b63f5ae5d50dd&oe=61696260',
  },
  {
    id: '9',
    url: 'https://scontent-hkt1-2.xx.fbcdn.net/v/t1.6435-9/53014737_2233858510162760_5278280928634863616_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=gfj-D8f-ThUAX___DMV&_nc_ht=scontent-hkt1-2.xx&oh=549ee43899ea3723475b63f5ae5d50dd&oe=61696260',
  },
];

interface Props {}

const ProfileAlbumBox: React.FC<Props> = () => {
  return (
    <Container>
      <Header>
        <AlbumLabel>{i18n.t('profile.album')}</AlbumLabel>
        <PrimaryButton title={i18n.t('profile.viewAll')} />
      </Header>
      <Box
        flexDirection={'row'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}>
        {DATA.map((item, index) => {
          return (
            <PictureContainer key={item.id}>
              <Image
                size={'md'}
                borderRadius={10}
                alt={i18n.t('application.loading')}
                source={{uri: item.url}}
              />
            </PictureContainer>
          );
        })}
      </Box>
    </Container>
  );
};

const Container = styled.View`
  width: 90%;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const AlbumLabel = styled(fonts.PrimaryFontMediumSize18)`
  color: ${colors.BLACK};
`;

const PictureContainer = styled.TouchableOpacity<{marginLeft?: number}>`
  margin: 4px;
`;

export default memo(ProfileAlbumBox);
