import React from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {Avatar, FlatList, Menu, Pressable} from 'native-base';
import {EventType} from '@constants/types/events';
import PrimaryIcon from '@components/PrimaryIcon';
import {verticalOptions} from '@constants/sources';
import i18n from '@locales/index';
import {accessTokenSelector} from '@store/selectors/authentication';

interface Props {
  item: EventType;
  onPress?: (item: EventType) => void;
  onPressUpdate?: (item: EventType) => void;
  onPressUpdateRelated?: (item: EventType) => void;
  onPressDelete?: (item: EventType) => void;
  onPressDeleteRelated?: (item: EventType) => void;
}

const HorizontalEventItem: React.FC<Props> = ({
  item,
  onPress,
  onPressUpdate,
  onPressUpdateRelated,
  onPressDelete,
  onPressDeleteRelated,
}) => {
  const dispatch = useDispatch();
  const accessToken = useSelector(accessTokenSelector);

  const [shouldOverlapWithTrigger] = React.useState(true);
  const [position, setPosition] = React.useState('bottom right');

  const onPressTouch = () => {
    if (onPress) {
      onPress(item);
    }
  };
  const renderItem = ({item}: {item: any}) => {
    return (
      <Avatar
        mr={2}
        size="sm"
        source={{
          uri: item.avatar,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }}
      />
    );
  };
  const onPressUpdateOption = () => {
    if (onPressUpdate) {
      onPressUpdate(item);
    }
  };
  const onPressUpdateRelatedOption = () => {
    if (onPressUpdateRelated) {
      onPressUpdateRelated(item);
    }
  };

  const onPressDeleteOption = () => {
    if (onPressDelete) {
      onPressDelete(item);
    }
  };
  const onPressDeleteRelatedOption = () => {
    if (onPressDeleteRelated) {
      onPressDeleteRelated(item);
    }
  };

  return (
    <Container onPress={onPressTouch} activeOpacity={1.0}>
      <Title numberOfLines={2}>{item.title}</Title>
      <Deadline numberOfLines={1}>{`${item.from?.split(' ')[0]}  -  ${
        item.to?.split(' ')[0]
      }`}</Deadline>
      {(item.assignees ?? []).length > 0 && <HLine />}
      <FlatList
        left={3}
        bottom={2}
        horizontal
        position="absolute"
        scrollEnabled={false}
        renderItem={renderItem}
        data={(item.assignees ?? []).filter((item, index) => {
          return index < 5;
        })}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
      <Menu
        // width={240}
        bgColor={colors.WHITE}
        borderColor={colors.WHITE}
        shouldOverlapWithTrigger={shouldOverlapWithTrigger} // @ts-ignore
        placement={position == 'auto' ? undefined : position}
        trigger={triggerProps => {
          return (
            <Pressable
              top={2}
              right={2}
              width={8}
              height={8}
              borderRadius={20}
              position={'absolute'}
              alignItems={'center'}
              justifyContent={'center'}
              {...triggerProps}>
              <OptionsIcon tintColor={colors.SILVER} source={verticalOptions} />
            </Pressable>
          );
        }}>
        <Menu.Item _text={{color: colors.TEXT}} onPress={onPressUpdateOption}>
          {i18n.t('events.update')}
        </Menu.Item>
        <Menu.Item
          _text={{color: colors.TEXT}}
          onPress={onPressUpdateRelatedOption}>
          {i18n.t('events.updateRelated')}
        </Menu.Item>
        <Menu.Item onPress={onPressDeleteOption} _text={{color: colors.RED_1}}>
          {i18n.t('events.delete')}
        </Menu.Item>
        <Menu.Item
          onPress={onPressDeleteRelatedOption}
          _text={{color: colors.RED_1}}>
          {i18n.t('events.deleteRelated')}
        </Menu.Item>
      </Menu>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  height: 100px;
  padding: 10px;
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
  bottom: 48px;
  width: 100%;
  height: 1px;
  opacity: 0.6;
  position: absolute;
  background-color: ${colors.SILVER};
`;

const OptionsIcon = styled(PrimaryIcon)``;

export default HorizontalEventItem;
