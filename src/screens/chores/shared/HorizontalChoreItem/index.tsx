import React from 'react';
import styled from 'styled-components/native';
import colors from '@themes/colors';
import fonts from '@themes/fonts';
import PrimaryFastImage from '@components/PrimaryFastImage';
import {Avatar, FlatList} from 'native-base';
import {StyleSheet} from 'react-native';
import {DummyDetailFamily} from '@constants/DummyData';
import {isNull} from '@utils/index';
import PrimaryButton from '@components/PrimaryButton';
import {ChoreStatus} from '@constants/types/chores';
import i18n from '@locales/index';

interface Props {
  item?: any;
  onPress?: (item: any) => void;
}

const HorizontalChoreItem: React.FC<Props> = ({item, onPress}) => {
  const onPressTouch = () => {
    if (onPress) {
      onPress(item);
    }
  };
  const renderItem = ({item}: {item: any}) => {
    return (
      <Avatar mr={2} size="sm" source={{uri: item.avatarUrl}}>
        {/* <Avatar.Badge bg="green.500" /> */}
      </Avatar>
    );
  };
  const getStatusColor = (status: ChoreStatus) => {
    switch (status) {
      case ChoreStatus.DONE:
        return colors.DONE_CHORE;
      case ChoreStatus.IN_PROGRESS:
        return colors.IN_PROGRESS_CHORE;
      default:
        return colors.EXPIRED_CHORE;
    }
  };
  const getStatusText = (status: ChoreStatus) => {
    switch (status) {
      case ChoreStatus.DONE:
        return i18n.t('chores.done');
      case ChoreStatus.IN_PROGRESS:
        return i18n.t('chores.inProgress');
      default:
        return i18n.t('chores.expired');
    }
  };

  return (
    <Touch onPress={onPressTouch}>
      <Container>
        <Title numberOfLines={2}>{item.title}</Title>
        <Deadline numberOfLines={1}>{item.deadline}</Deadline>
        <HLine />
        <FlatList
          left={3}
          bottom={2}
          horizontal
          position="absolute"
          scrollEnabled={false}
          renderItem={renderItem}
          data={DummyDetailFamily.members.filter((item, index) => {
            return index < 5;
          })}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
        <StatusButton
          titleFontSize={12}
          titleFontWeight={600}
          titleColor={colors.WHITE}
          title={getStatusText(ChoreStatus.DONE)}
          backgroundColor={getStatusColor(ChoreStatus.DONE)}
        />
      </Container>
    </Touch>
  );
};

const Touch = styled.TouchableOpacity``;

const Container = styled.View`
  flex: 1;
  padding: 10px;
  height: 120px;
  elevation: 10;
  margin-top: 15px;
  margin-left: 30px;
  margin-right: 30px;
  border-radius: 10px;
  shadow-opacity: 0.2;
  shadow-radius: 10px;
  shadow-color: ${colors.BLACK};
  background-color: ${colors.WHITE};
`;

const Title = styled(fonts.PrimaryFontBoldSize16)`
  margin-right: 86px;
`;

const Deadline = styled(fonts.PrimaryFontRegularSize12)`
  margin-top: 4px;
  color: ${colors.GRAY};
`;

const HLine = styled.View`
  left: 10px;
  bottom: 46px;
  width: 100%;
  height: 1px;
  opacity: 0.6;
  position: absolute;
  background-color: ${colors.SILVER};
`;

const StatusButton = styled(PrimaryButton)<{backgroundColor: string}>`
  top: 8px;
  right: 8px;
  width: 80px;
  position: absolute;
  border-radius: 16px;
  padding-bottom: 6px;
  background-color: ${props => props.backgroundColor};
`;

// const Content = styled.View`
//   flex: 1;
//   margin: 8px;
// `;

// const CacheThumbnail = styled(PrimaryFastImage)`
//   width: 100px;
//   height: 100px;
//   margin-left: 10px;
//   align-self: center;
//   border-radius: 6px;
// `;

// const Thumbnail = styled.Image`
//   width: 100px;
//   height: 100px;
//   margin-left: 10px;
//   align-self: center;
//   border-radius: 6px;
// `;

// const StatusTouch = styled.TouchableOpacity`
//   top: 10px;
//   right: 10px;
//   position: absolute;
// `;

// const StatusLabel = styled(fonts.PrimaryFontMediumSize12)`
//   border-radius: 16px;
//   color: ${colors.WHITE};
//   padding: 2px 8px 5px 8px;
//   background-color: ${colors.IN_PROGRESS_CHORE};
// `;

export default React.memo(HorizontalChoreItem);
