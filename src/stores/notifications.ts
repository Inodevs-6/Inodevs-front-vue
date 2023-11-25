import { defineStore } from 'pinia';

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notify: false,
  }),
  actions: {
    setNotify(value : any) {
      this.notify = value;
    },
  },
});