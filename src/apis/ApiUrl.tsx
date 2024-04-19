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
    Logout: '/api/account/logout',
  },
  issues: {
    GetListIssuesByUser: '/api/app/issues/get-list-issues-by-user',
    SaveActionChoose: '/api/app/issues/post-save-action-choose',
    GetListInfoExchange: '/api/app/issues/get-list-info-exchange',
    SaveInfoExchange: '/api/app/issues/post-save-info-exchange',
    DeleteInfoExchange: '/api/app/issues/delete-info-exchange',
    GetReportChart: '/api/app/issues/get-report-chart',
  },
  combo: {
    GetCboModel: '/web/cbo/get-cbo-model',
    GetCboCurrentReceiver: '/api/app/cbo/get-cbo-current-receiver',
  },
};
