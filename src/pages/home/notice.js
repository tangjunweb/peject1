import {
  MakeNotificationAsRead
} from "@/api";
import store from '@/vuex/store'
import router from '@/router'

export function jumpNotice(notice) {
  //系统类型
  let systemType =  store.state.systemType;
  //消息类型
  let noticeType = notice.notification.data.notificationType;
  if(!notice.state){
    MakeNotificationAsRead({id: notice.id}).then(res => {
      store.dispatch("getNotice");
    })
  }
  //如果是通知公告跳转详情
  if(noticeType == 1){
    if(systemType == 'admin'){
      router.push({ path: "/information/notice/home", query: { id: notice.notification.data.id, type: noticeType } });
    } else {
    router.push({ path: "/member-serve/my-message/info", query: { id: notice.notification.data.id, type: noticeType } });
    }
  }
  //预警消息跳转详情
  if(noticeType == 2){
    router.push({ path: "info", query: { id: notice.notification.data.id, type: noticeType , } });
  }

  //消息提醒跳转模块
  if(noticeType == 3){
    //判断跳转模块
    let modelName = notice.notification.notificationName;
    let id = notice.notification.data.id;
    let route = '';
    switch (modelName) {
      case 'App.Opinions':
        if(systemType == 'admin'){
          route = '/organization/suggestion/info'
        } else {
          route = '/member-organization/notice/info'
        }
        break;
      case 'App.TrainClass.Online':
        if(systemType == 'admin'){
          route = '/education/school/class/info'
        } else {
          route = '/member-education/online/classinfo'
        }
        break;
      case 'App.TrainClass.Offline':
        if(systemType == 'admin'){
          route = '/education/underline/class/info'
        } else {
          route = '/member-education/underline/classinfo'
        }
        break;
      case 'App.TrainClass.OutoffWork':
        if(systemType == 'admin'){
          route = '/education/underline/class/home'
        } else {
          route='/member-education/underline/home'
        }
        break;
      case 'App.PartyMeetingParentInfo.OutoffWork':
        if(systemType == 'admin'){
          route = '/organization/organizationallife/manager/meetingOffWork'
        }else {
          route  ='/member-organization/organization-life/home'
        }
        break;
      case 'App.Lives':
        if(systemType == 'admin'){
          route = '/organization/organizationallife/manager/meetingOffWork'
        }else {
          route  ='/member-organization/organization-life/home'
        }
        break;
      default:
        break;
    }
    router.push({
      path: route,
      query:{
        id: id
      }
    })

  }

  //消息提醒跳转详情
  if(noticeType == 4){}
}