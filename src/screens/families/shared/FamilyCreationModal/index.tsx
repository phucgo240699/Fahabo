import React from 'react';
import i18n from '@locales/index';
import colors from '@themes/colors';
import {isNull} from '@utils/index';
import {Button, FormControl, Input, Modal} from 'native-base';
import {cameraIcon, placeholderImage} from '@constants/sources';
import PrimaryIcon from '@components/PrimaryIcon';
import styled from 'styled-components/native';
import {Constants} from '@constants/Constants';

const contentWidth = Constants.MAX_WIDTH - 90;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  name?: string;
  thumbnailUri?: string;
  onChangeName?: (text: string) => void;
  onPressThumbnail?: () => void;
  onPressCancel: () => void;
  onPressSave?: () => void;
}

const FamilyCreationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  name,
  thumbnailUri,
  onChangeName,
  onPressThumbnail,
  onPressCancel,
  onPressSave,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content
        width={Constants.MAX_WIDTH - 40}
        backgroundColor={colors.WHITE}>
        <Modal.Body>
          <FormControl>
            <FormControl.Label _text={{color: colors.DANUBE, fontWeight: 500}}>
              {`${i18n.t('family.thumbnail')}:`}
            </FormControl.Label>
            <ThumbnailContainer onPress={onPressThumbnail}>
              {isNull(thumbnailUri) ? (
                <Thumbnail source={placeholderImage} />
              ) : (
                <Thumbnail source={{uri: thumbnailUri}} />
              )}

              <CameraIcon
                width={36}
                height={36}
                source={cameraIcon}
                tintColor={'#595959'}
              />
            </ThumbnailContainer>
            <FormControl.Label
              mt={10}
              _text={{color: colors.DANUBE, fontWeight: 500}}>
              {`${i18n.t('family.name')}:`}
            </FormControl.Label>
            <Input
              value={name}
              height={50}
              borderRadius={10}
              autoCorrect={false}
              width={contentWidth}
              color={colors.BLACK}
              autoCompleteType="off"
              borderColor={colors.SILVER}
              onChangeText={onChangeName}
            />
          </FormControl>
        </Modal.Body>
        <Modal.Footer pr={0} mb={4} width={contentWidth}>
          <Button.Group space={2}>
            <Button
              width={100}
              height={50}
              borderRadius={25}
              variant="ghost"
              bgColor={colors.CONCRETE}
              _text={{color: colors.BLACK}}
              onPress={onPressCancel}>
              {i18n.t('family.cancel')}
            </Button>
            <Button
              width={120}
              height={50}
              borderRadius={25}
              onPress={onPressSave}>
              {i18n.t('family.save')}
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

const CameraIcon = styled(PrimaryIcon)`
  border-radius: 30px;
  background-color: ${colors.SILVER};
`;

const ThumbnailContainer = styled.TouchableOpacity`
  width: ${contentWidth}px;
  height: ${(10 * contentWidth) / 16}px;
  align-items: center;
  justify-content: center;
`;

const Thumbnail = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 10px;
`;

export default React.memo(FamilyCreationModal);
