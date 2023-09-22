
export const enum TRACK_ACTION_TYPE {
  SingIn = 'SignIn',
  SingUp = 'SingUp',
  SingOut = 'SignOut',
  SetLoading = 'SetLoading',
  SetError = 'SetError',
  ResolveAuth = 'ResolveAuth',
}

export const enum LOCATION_ACTION_TYPE {
  ToggleRecording = 'ToggleRecording',
  AddLocation = 'AddLocation',
  DeleteLocations = 'DeleteLocations',
  ChangeName = 'ChangeName',
}

export const enum TRACKER_ACTION_TYPE {
  FetchTracks= 'FetchTracks',
  CreateTrack= 'CreateTrack',
  SetLoading = 'SetLoading',
  SetError = 'SetError',
}
