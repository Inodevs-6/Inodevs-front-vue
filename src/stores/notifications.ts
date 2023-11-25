import { defineStore } from 'pinia';

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notify: false,
    oldnotification: [],
    notification: []

  }),
  actions: {
    setNotify(value : any) {
      this.notify = value;
    },
    setOldnotification(value : any){
        this.oldnotification = value
    },
    setNotification(value : any){
        this.notification = value
    }
  },
});