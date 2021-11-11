import React from 'react';
import {Constants, ScreenName} from '@constants/Constants';
import i18n from '@locales/index';
import colors from '@themes/colors';
import fonts from '@themes/fonts';
import {Button, Modal} from 'native-base';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import {closeNotificationModalAction} from '@store/actionTypes/modals';
import {notificationModalSelector} from '@store/selectors/modals';
import {isNull} from '@utils/index';
import {navigate} from '@navigators/index';
import {
  NotificationModalType,
  NotificationNavigationType,
} from '@constants/types/modals';
import {getChoreDetailRequestAction} from '@store/actionTypes/chores';
import {getEventDetailRequestAction} from '@store/actionTypes/events';
import {getFamilyDetailRequestAction} from '@store/actionTypes/family';

const contentWidth = Constants.MAX_WIDTH - 90;

interface Props {
  notificationModal?: NotificationModalType;
}

const NotificationModal: React.FC<Props> = ({notificationModal}) => {
  const dispatch = useDispatch();

  const onPressCancel = () => {
    dispatch(closeNotificationModalAction());
  };
  const onPressAccept = () => {
    dispatch(closeNotificationModalAction());
    onDirectScreen(notificationModal?.navigate);
  };
  const onDirectScreen = (value?: string) => {
    console.log({value, id: notificationModal?.id});
    switch (value) {
      case NotificationNavigationType.CHORE_DETAIL:
        if (!isNull(notificationModal?.id)) {
          dispatch(
            getChoreDetailRequestAction({
              choreId: parseInt(notificationModal?.id ?? ''),
            }),
          );
        }
        break;
      case NotificationNavigationType.EVENT_DETAIL:
        if (!isNull(notificationModal?.id)) {
          dispatch(
            getEventDetailRequestAction({
              eventId: parseInt(notificationModal?.id ?? ''),
            }),
          );
        }
        break;
      case NotificationNavigationType.FAMILY_DETAIL:
        dispatch(
          getFamilyDetailRequestAction({
            familyId: parseInt(notificationModal?.id ?? ''),
          }),
        );
        break;
      default:
        break;
    }
  };

  if (isNull(notificationModal)) {
    return null;
  }

  return (
    <>
      <Modal isOpen={true} onClose={onPressCancel}>
        <Modal.Content
          maxWidth="400px"
          borderRadius={14}
          backgroundColor={colors.WHITE}>
          <Modal.Body>
            <Title>{notificationModal?.title}</Title>
            <Description>{notificationModal?.description}</Description>
          </Modal.Body>
          <Modal.Footer pr={0} mb={4} width={contentWidth}>
            <Button.Group space={2}>
              <Button
                width={100}
                borderRadius={25}
                variant="ghost"
                bgColor={colors.CONCRETE}
                _text={{color: colors.BLACK}}
                onPress={onPressCancel}>
                {i18n.t('popUp.cancel')}
              </Button>
              <Button width={120} borderRadius={25} onPress={onPressAccept}>
                {i18n.t('popUp.view')}
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

const Title = styled(fonts.PrimaryFontBoldSize18)``;

const Description = styled(fonts.PrimaryFontMediumSize14)`
  margin-top: 4px;
`;

export default NotificationModal;
