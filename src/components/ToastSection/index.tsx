import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {toastsSelector} from '@store/selectors/session';
import {useToast, Box, Text} from 'native-base';
import colors from '@themes/colors';
import {closeIcon} from '@constants/sources';
import {ToastType} from '@constants/types/session';
import PrimaryButton from '@components/PrimaryButton';
import {closeToastAction} from '@store/actionTypes/session';
import {Animated} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const Toast: React.FC<{
  id: number;
  isShowed: boolean;
  message: string;
  type: ToastType;
}> = ({id, type, message, isShowed}) => {
  const dispatch = useDispatch();
  const opacityAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacityAnimatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(opacityAnimatedValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          dispatch(closeToastAction(id));
        });
      }, 2000);
    });
  }, []);

  const onPressClose = () => {
    Animated.timing(opacityAnimatedValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      dispatch(closeToastAction(id));
    });
  };

  return (
    <Animated.View
      style={{
        top: getStatusBarHeight() + 8,
        left: 8,
        right: 8,
        borderRadius: 8,
        position: 'absolute',
        opacity: opacityAnimatedValue,
        backgroundColor:
          type === ToastType.SUCCESS
            ? colors.GREEN_1
            : type === ToastType.WARNING
            ? colors.YELLOW_1
            : colors.RED_1,
      }}>
      <Box
        m={3}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <Text
          width={'90%'}
          color={
            type === ToastType.SUCCESS
              ? colors.WHITE
              : type === ToastType.WARNING
              ? colors.BLACK
              : colors.WHITE
          }
          fontWeight={500}>
          {message}
        </Text>
        <PrimaryButton
          padding={8}
          leftIconWidth={18}
          leftIconHeight={18}
          leftSource={closeIcon}
          leftTintColor={
            type === ToastType.SUCCESS
              ? colors.WHITE
              : type === ToastType.WARNING
              ? colors.BLACK
              : colors.WHITE
          }
          onPress={onPressClose}
        />
      </Box>
    </Animated.View>
  );
};

const ToastSection = () => {
  const toasts = useSelector(toastsSelector);

  return (
    <>
      {toasts.map((toast, index) => {
        return (
          <Toast
            key={index.toString()}
            id={toast.id}
            type={toast.toast.type}
            message={toast.toast.message}
            isShowed={toast.toast.isShowed}
          />
        );
      })}
    </>
  );
};

export default ToastSection;
