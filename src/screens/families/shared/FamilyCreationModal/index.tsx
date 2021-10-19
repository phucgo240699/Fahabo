import React from 'react';
import i18n from '@locales/index';
import colors from '@themes/colors';
import {isNull} from '@utils/index';
import {Button, FormControl, Input, Modal} from 'native-base';
import {cameraIcon, placeholderImage} from '@constants/sources';
import PrimaryIcon from '@components/PrimaryIcon';
import styled from 'styled-components/native';
import {Constants} from '@constants/Constants';

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
            <FormControl.Label _text={{color: colors.DARK_GRAY}}>
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
            <FormControl.Label mt={10} _text={{color: colors.DARK_GRAY}}>
              {`${i18n.t('family.name')}:`}
            </FormControl.Label>
            <Input
              value={name}
              autoCorrect={false}
              color={colors.BLACK}
              autoCompleteType="off"
              onChangeText={onChangeName}
            />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              bgColor={colors.CONCRETE}
              _text={{color: colors.BLACK}}
              onPress={onPressCancel}>
              {i18n.t('family.cancel')}
            </Button>
            <Button width={100} onPress={onPressSave}>
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
  width: ${Constants.MAX_WIDTH - 100}px;
  height: ${(10 * (Constants.MAX_WIDTH - 100)) / 16}px;
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
