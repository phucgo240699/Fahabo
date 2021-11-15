import FocusAwareStatusBar from "@components/FocusAwareStatusBar";
import { Constants } from "@constants/Constants";
import { twilioAccessTokenSelector, twilioRoomNameSelector } from "@store/selectors/interactions";
import colors from "@themes/colors";
import { isNull } from "@utils/index";
import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  PermissionsAndroid,
  TouchableOpacity,
  Keyboard,
  Platform,
} from "react-native";

import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo,
} from "react-native-twilio-video-webrtc";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import {CommonActions, useNavigation} from '@react-navigation/native';
import { notifyConferenceCallRequestActions } from "@store/actionTypes/interactions";
import { focusFamilySelector } from "@store/selectors/family";
import i18n from "@locales/index";

const ConferenceCallScreen = (props) => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const accessToken = useSelector(twilioAccessTokenSelector)
  const roomName = useSelector(twilioRoomNameSelector)
  const focusFamily = useSelector(focusFamilySelector)
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [status, setStatus] = useState("disconnected");
  const [videoTracks, setVideoTracks] = useState(new Map());
  const twilioVideo = useRef(null);

  useEffect(async () => {
    if (!isNull(accessToken)) {
      console.log({accessToken})
      if (Platform.OS === 'android') {
        await _requestCameraPermission()
        await _requestAudioPermission()
        twilioVideo.current.connect({ accessToken: accessToken, enableNetworkQualityReporting: true, dominantSpeakerEnabled: true, roomName: roomName});
        setStatus("connecting");
      }
      else {
        twilioVideo.current.connect({ accessToken: accessToken, enableNetworkQualityReporting: true, dominantSpeakerEnabled: true, roomName: roomName});
        setStatus("connecting");
      }
    }
  }, [])

  const _onEndButtonPress = () => {
    twilioVideo.current.disconnect();
  };

  const _onMuteButtonPress = () => {
    twilioVideo.current
      .setLocalAudioEnabled(!isAudioEnabled)
      .then((isEnabled) => setIsAudioEnabled(isEnabled));
  };

  const _onFlipButtonPress = () => {
    twilioVideo.current.flipCamera();
  };

  const _onRoomDidConnect = (p) => {
    setStatus("connected");
    console.log({...p, os: Platform.OS === 'android' ? 'android' : 'ios'})
    if (!isNull(focusFamily.id) && props.route && props.route.params && props.route.params.isHost === true) {
      dispatch(notifyConferenceCallRequestActions({ 
        familyId: focusFamily.id,
        participantIds: [],
        roomCallId: p.roomName
      }))
    }
  };

  const _onRoomDidDisconnect = ({ error }) => {
    console.log("ERROR: ", error);
    navigation.dispatch(CommonActions.goBack())
  };

  const _onRoomDidFailToConnect = (error) => {
    console.log("ERROR: ", error);
    navigation.dispatch(CommonActions.goBack())
  };

  const _onParticipantAddedVideoTrack = ({ participant, track }) => {
    console.log("onParticipantAddedVideoTrack: ", participant, track);

    setVideoTracks(
      new Map([
        ...videoTracks,
        [
          track.trackSid,
          { participantSid: participant.sid, videoTrackSid: track.trackSid },
        ],
      ])
    );
  };

  const _onParticipantRemovedVideoTrack = ({ participant, track }) => {
    console.log("onParticipantRemovedVideoTrack: ", participant, track);

    const newVideoTracks = new Map(videoTracks);
    newVideoTracks.delete(track.trackSid);

    setVideoTracks(newVideoTracks);
  };

  const _onNetworkLevelChanged = ({ participant, isLocalUser, quality }) => {
    console.log("Participant", participant, "isLocalUser", isLocalUser, "quality", quality, Platform.OS === 'android' ? 'android' : 'ios');
  };

  const _onDominantSpeakerDidChange = ({ roomName, roomSid, participant }) => {
    console.log("onDominantSpeakerDidChange", `roomName: ${roomName}`, `roomSid: ${roomSid}`, "participant:", participant);
  };

  const _requestAudioPermission = () => {
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: i18n.t('media.accessMicrophoneTitle'),
        message:
          "",
        buttonNegative: i18n.t('media.deny'),
        buttonPositive: i18n.t('media.allow'),
      }
    );
  };

  const _requestCameraPermission = () => {
    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
      title: i18n.t('media.accessCameraTitle'),
      message:
        "",
      buttonNegative: i18n.t('media.deny'),
      buttonPositive: i18n.t('media.allow'),
    });
  };

  const onPressBackground = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeView>
    <FocusAwareStatusBar
      translucent
      barStyle="dark-content"
      backgroundColor={colors.WHITE}
    />
      <Container onPress={onPressBackground}>
        <Content>
      {(status === "connected" || status === "connecting") && (
        <View style={styles.callContainer}>
          {status === "connected" && (
            <View style={styles.remoteGrid}>
              {Array.from(videoTracks, ([trackSid, trackIdentifier]) => {
                return (
                  <TwilioVideoParticipantView
                    style={styles.remoteVideo}
                    key={trackSid}
                    trackIdentifier={trackIdentifier}
                  />
                );
              })}
            </View>
          )}
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={_onEndButtonPress}
            >
              <Text style={{ fontSize: 12 }}>End</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={_onMuteButtonPress}
            >
              <Text style={{ fontSize: 12 }}>
                {isAudioEnabled ? "Mute" : "Unmute"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={_onFlipButtonPress}
            >
              <Text style={{ fontSize: 12 }}>Flip</Text>
            </TouchableOpacity>
            <TwilioVideoLocalView enabled={true} style={styles.localVideo} />
          </View>
        </View>
      )}

      <TwilioVideo
        ref={twilioVideo}
        onRoomDidConnect={_onRoomDidConnect}
        onRoomDidDisconnect={_onRoomDidDisconnect}
        onRoomDidFailToConnect={_onRoomDidFailToConnect}
        onParticipantAddedVideoTrack={_onParticipantAddedVideoTrack}
        onParticipantRemovedVideoTrack={_onParticipantRemovedVideoTrack}
        onNetworkQualityLevelsChanged={_onNetworkLevelChanged}
        onDominantSpeakerDidChange={_onDominantSpeakerDidChange}
      />
      </Content>
      </Container>
    </SafeView>
  );
};


const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
`;
const Container = styled.TouchableWithoutFeedback`
  width: ${Constants.MAX_WIDTH}px;
  height: ${Constants.MAX_HEIGHT}px;
  background-color: ${colors.WHITE};
`;
const Content = styled.View`
  flex: 1;
`;

const styles = StyleSheet.create({
  callContainer: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
  },
  welcome: {
    fontSize: 30,
    textAlign: "center",
    paddingTop: 40,
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginRight: 70,
    marginLeft: 70,
    marginTop: 50,
    textAlign: "center",
    backgroundColor: "white",
  },
  button: {
    marginTop: 100,
  },
  localVideo: {
    flex: 1,
    width: 150,
    height: 250,
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  remoteGrid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  remoteVideo: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    width: 200,
    height: 400,
  },
  optionsContainer: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    height: 100,
    backgroundColor: "blue",
    flexDirection: "row",
    alignItems: "center",
  },
  optionButton: {
    width: 60,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100 / 2,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
})

export default ConferenceCallScreen
