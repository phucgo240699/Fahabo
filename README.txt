Always add the code from README.jpg to node_modules/react-native-gifted-chat/lib/MessageContainer.js:

this.attachKeyboardListeners = () => {
const { invertibleScrollViewProps: invertibleProps } = this.props;
if (invertibleProps) {
this.willShowSub = Keyboard.addListener('keyboardWillShow', invertibleProps.onKeyboardWillShow);
this.didShowSub = Keyboard.addListener('keyboardDidShow', invertibleProps.onKeyboardDidShow);
this.willHideSub = Keyboard.addListener('keyboardWillHide', invertibleProps.onKeyboardWillHide);
this.didHideSub = Keyboard.addListener('keyboardDidHide', invertibleProps.onKeyboardDidHide);
}
};
this.detachKeyboardListeners = () => {
const { invertibleScrollViewProps: invertibleProps } = this.props;
this.willShowSub?.remove();
this.didShowSub?.remove();
this.willHideSub?.remove();
this.didHideSub?.remove();
};
