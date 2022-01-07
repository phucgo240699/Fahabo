import React from 'react';
import i18n from '@locales/index';
import colors from '@themes/colors';
import {isNull} from '@utils/index';
import {Button, FormControl, Input, Modal} from 'native-base';
import {Constants} from '@constants/Constants';

interface Props {
  isOpen: boolean;
  updateMode?: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  onChangeTitle?: (text: string) => void;
  onChangeDescription?: (text: string) => void;
  onPressCancel: () => void;
  onPressCreate?: () => void;
  onPressSave?: () => void;
}

const AlbumCreationModal: React.FC<Props> = ({
  isOpen,
  updateMode,
  onClose,
  title,
  description,
  onChangeTitle,
  onChangeDescription,
  onPressCancel,
  onPressCreate,
  onPressSave,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content
        shadow={4}
        borderRadius={10}
        width={Constants.MAX_WIDTH - 40}
        backgroundColor={colors.WHITE}>
        <Modal.Body>
          <FormControl>
            <FormControl.Label
              mt={4}
              _text={{color: colors.DANUBE, fontWeight: 500}}>
              {`${i18n.t('album.title')}:`}
            </FormControl.Label>
            <Input
              value={title}
              borderRadius={10}
              autoCorrect={false}
              color={colors.BLACK}
              autoCompleteType="off"
              borderColor={colors.SILVER}
              onChangeText={onChangeTitle}
            />
            {/* <FormControl.Label
              mt={10}
              _text={{color: colors.DANUBE, fontWeight: 500}}>
              {`${i18n.t('album.description')}:`}
            </FormControl.Label>
            <Input
              multiline
              height={150}
              borderRadius={10}
              value={description}
              autoCorrect={false}
              color={colors.BLACK}
              autoCompleteType="off"
              borderColor={colors.SILVER}
              onChangeText={onChangeDescription}
            /> */}
          </FormControl>
        </Modal.Body>
        <Modal.Footer mb={4}>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              bgColor={colors.CONCRETE}
              _text={{color: colors.BLACK}}
              onPress={onPressCancel}>
              {i18n.t('album.cancel')}
            </Button>
            {updateMode === true ? (
              <Button width={100} onPress={onPressSave}>
                {i18n.t('album.save')}
              </Button>
            ) : (
              <Button width={100} onPress={onPressCreate}>
                {i18n.t('album.create')}
              </Button>
            )}
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default React.memo(AlbumCreationModal);
