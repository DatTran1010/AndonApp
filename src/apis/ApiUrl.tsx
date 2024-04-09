export default {
  CheckinURL: {
    GetListCa: '/api/app/checkin/get-list-ca',
    GetListMayCheckinByCa: '/api/app/checkin/get-list-may-checkin-by-ca',
    GetListDevicesNotHaveChecked:
      '/api/app/checkin/get-list-devices-not-have-checked',
    SaveCheckin: '/api/app/checkin/post-save-check-in',
    DeleteCheckinDevice: '/api/app/checkin/delete-check-in-device',
    CheckOut: '/api/app/checkin/post-check-out',
  },
  auth: {
    CheckinStatus: '/api/account/check-in-status',
  },
  issues: {
    GetListIssuesByUser: '/api/app/issues/get-list-issues-by-user',
    SaveActionChoose: '/api/app/issues/post-save-action-choose',
  },
  combo: {
    GetCboModel: '/web/cbo/get-cbo-model',
  },
};
