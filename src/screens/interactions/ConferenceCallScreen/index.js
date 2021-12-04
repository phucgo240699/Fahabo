import FocusAwareStatusBar from "@components/FocusAwareStatusBar";
import { Constants } from "@constants/Constants";
import { twilioAccessTokenSelector, twilioRoomNameSelector } from "@store/selectors/interactions";
import colors from "@themes/colors";
import { isNull } from "@utils/index";
import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  PermissionsAndroid,
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
import { Box, ScrollView } from "native-base";
import PrimaryIcon from "@components/PrimaryIcon";
import { endCallIcon, flipCameraIcon, muteIcon, UnmuteIcon } from "@constants/sources";

const localVideoWidth = Constants.MAX_WIDTH * 0.3
const localVideoHeight = Constants.MAX_WIDTH * 0.4
const participantVideoWidth = Constants.MAX_WIDTH * 0.5
const participantVideoHeight = Constants.MAX_WIDTH * 0.75

const ConferenceCallScreen = (props) => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const accessToken = useSelector(twilioAccessTokenSelector)
  const roomName = useSelector(twilioRoomNameSelector)
  const focusFamily = useSelector(focusFamilySelector)
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [status, setStatus] = useState("disconnected");
  const [videoTracks, setVideoTracks] = useState(new Map());
  const [participantIds, setParticipantIds] = useState([])
  const twilioVideo = useRef(null);

  useEffect(async () => {
    if (!isNull(accessToken) && !isNull(roomName)) {
      if (Platform.OS === 'android') {
        await requestCameraPermission()
        await requestAudioPermission()
        twilioVideo.current.connect({ accessToken: accessToken, enableNetworkQualityReporting: true, dominantSpeakerEnabled: true});
        setStatus("connecting");
      }
      else {
        twilioVideo.current.connect({ accessToken: accessToken, enableNetworkQualityReporting: true, dominantSpeakerEnabled: true});
        setStatus("connecting");
      }
    }
    if (props.route && props.route.params && props.route.params.participantIds) {
      setParticipantIds(props.route.params.participantIds)
    }
  }, [])

  const onEndButtonPress = () => {
    twilioVideo.current.disconnect();
  };

  const onMuteButtonPress = () => {
    twilioVideo.current
      .setLocalAudioEnabled(!isAudioEnabled)
      .then((isEnabled) => setIsAudioEnabled(isEnabled));
  };

  const onFlipButtonPress = () => {
    twilioVideo.current.flipCamera();
  };

  const onRoomDidConnect = (p) => {
    setStatus("connected");
    if (!isNull(focusFamily.id) && props.route && props.route.params && props.route.params.isHost === true) {
      dispatch(notifyConferenceCallRequestActions({ 
        familyId: focusFamily.id,
        participantIds: participantIds,
        roomCallId: p.roomName
      }))
    }
  };

  const onRoomDidDisconnect = ({ error }) => {
    console.log("onRoomDidDisconnect: ", error);
    navigation.dispatch(CommonActions.goBack())
  };

  const onRoomDidFailToConnect = (error) => {
    console.log("onRoomDidFailToConnect: ", error);
    navigation.dispatch(CommonActions.goBack())
  };

  const onParticipantAddedVideoTrack = ({ participant, track }) => {
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

  const onParticipantRemovedVideoTrack = ({ participant, track }) => {
    console.log(`onParticipantRemovedVideoTrack ${Platform.OS}: `, participant, track);

    const newVideoTracks = new Map(videoTracks);
    newVideoTracks.delete(track.trackSid);

    setVideoTracks(newVideoTracks);
  };

  const onNetworkLevelChanged = ({ participant, isLocalUser, quality }) => {
    console.log("Participant", participant, "isLocalUser", isLocalUser, "quality", quality, Platform.OS === 'android' ? 'android' : 'ios');
  };

  const onDominantSpeakerDidChange = ({ roomName, roomSid, participant }) => {
    console.log("onDominantSpeakerDidChange", `roomName: ${roomName}`, `roomSid: ${roomSid}`, "participant:", participant);
  };

  const requestAudioPermission = () => {
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

  const requestCameraPermission = () => {
    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
      title: i18n.t('media.accessCameraTitle'),
      message:
        "",
      buttonNegative: i18n.t('media.deny'),
      buttonPositive: i18n.t('media.allow'),
    });
  };

  return (
    <SafeView>
    <FocusAwareStatusBar
      translucent
      barStyle="dark-content"
      backgroundColor={colors.WHITE}
    />
        <Content>
      {(status === "connected" || status === "connecting") && (
        <Box flex={1}>
          {status === "connected" && (
          <ScrollView>
            <ParticipantContainer>
              {Array.from(videoTracks, ([trackSid, trackIdentifier]) => {
                return (
                  <TwilioVideoParticipantView
                    style={Array.from(videoTracks).length > 1 ? styles.participantVideo : styles.singleParticipantVideo}
                    key={trackSid}
                    trackIdentifier={trackIdentifier}
                  />
                );
              })}
            </ParticipantContainer>
          </ScrollView>
          )}
        </Box>
      )}

      <BottomContainer>
        <OperationsContainer>
          <OperationButton onPress={onMuteButtonPress}>
            {
              isAudioEnabled ? <PrimaryIcon tintColor={colors.BLACK} source={UnmuteIcon} /> : <PrimaryIcon tintColor={colors.BLACK} source={muteIcon} />
            }
          </OperationButton>
          <OperationButton onPress={onFlipButtonPress}>
            <PrimaryIcon tintColor={colors.BLACK} source={flipCameraIcon} />
          </OperationButton>
        </OperationsContainer>
        <EndCallButton onPress={onEndButtonPress}><PrimaryIcon width={30} height={30} tintColor={'#ffffff'} source={endCallIcon} /></EndCallButton>
      </BottomContainer>

      <TwilioVideoLocalView enabled={true} style={styles.localVideo} />

      <TwilioVideo
        ref={twilioVideo}
        onRoomDidConnect={onRoomDidConnect}
        onRoomDidDisconnect={onRoomDidDisconnect}
        onRoomDidFailToConnect={onRoomDidFailToConnect}
        onParticipantAddedVideoTrack={onParticipantAddedVideoTrack}
        onParticipantRemovedVideoTrack={onParticipantRemovedVideoTrack}
        onNetworkQualityLevelsChanged={onNetworkLevelChanged}
        onDominantSpeakerDidChange={onDominantSpeakerDidChange}
      />
      </Content>
    </SafeView>
  );
};


const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
`;
const Content = styled.View`
  flex: 1;
`;
const ParticipantContainer = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
`
const BottomContainer = styled.View`
  width: 100%;
  bottom: 30px;
  padding-left: 30px;
  padding-right: 30px;
  position: absolute;
`
const OperationsContainer = styled.View`
  margin-top: 10px;
  padding-left: 30px;
  margin-right: ${localVideoWidth}px;
  flex-direction: row;
  justify-content: space-around;
`
const EndCallButton = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  margin-top: 10px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: #990000;
`
const OperationButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  margin-left: 10px;
  margin-right: 10px;
  border-width: 1px;
  border-radius: 30px;
  border-color: ${colors.BLACK};
  background-color: ${colors.CONCRETE};
  align-items: center;
  justify-content: center;
`

const styles = StyleSheet.create({
  localVideo: {
    flex: 1,
    width: localVideoWidth,
    height: localVideoHeight,
    right: 30,
    bottom: 90,
    position: "absolute",
  },
  participantVideo: {
    borderWidth: 1,
    borderColor: colors.CONCRETE,
    width: participantVideoWidth,
    height: participantVideoHeight,
  },
  singleParticipantVideo: {
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT
  }
})

export default ConferenceCallScreen
