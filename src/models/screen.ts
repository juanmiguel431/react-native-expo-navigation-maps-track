import { NativeStackScreenProps, NativeStackNavigationProp  } from 'react-native-screens/native-stack';
import type { RouteProp } from '@react-navigation/native';

// export const SCREEN = {
//   Account: 'Account',
//   Signin: 'Signin',
//   Signup: 'Signup',
//   TrackCreate: 'TrackCreate',
//   TrackDetail: 'TrackDetail',
// } as const;

export const enum SCREEN {
  Account = 'Account',
  Signin = 'Signin',
  Signup = 'Signup',
  TrackCreate = 'TrackCreate',
  TrackDetail = 'TrackDetail',
  TrackList = 'TrackList',
  Tracks = 'Tracks',
  MainFlow = 'MainFlow',
  LoginFlow = 'LoginFlow',
  ResolveAuth = 'ResolveAuth',
}

export type Screen = ObjectValues<typeof SCREEN>;

export type RootStackParamList = {
  [SCREEN.Account]: undefined;
  [SCREEN.Signin]: undefined;
  [SCREEN.Signup]: undefined;
  [SCREEN.TrackCreate]: undefined;
  [SCREEN.TrackDetail]: undefined;
  [SCREEN.TrackList]: undefined;
  [SCREEN.Tracks]: undefined;
  [SCREEN.MainFlow]: undefined;
  [SCREEN.LoginFlow]: undefined;
  [SCREEN.ResolveAuth]: undefined;
};

export type AccountScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.Account>;
export type SigninScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.Signin>;
export type SignupScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.Signup>;
export type TrackCreateScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.TrackCreate>;
export type TrackDetailScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.TrackDetail>;
export type TrackListScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.TrackList>;
export type TracksScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.Tracks>;
export type MainFlowScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.MainFlow>;
export type LoginFlowScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.LoginFlow>;
export type ResolveAuthScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.ResolveAuth>;
