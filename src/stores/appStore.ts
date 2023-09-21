import { defineStore } from 'pinia'
import {ref} from "vue";
import {RestCollection} from "src/models/model";

export const useAppStore = defineStore('app', () => {
  const restCollection = ref<RestCollection[]>();
  const currentRestCollection = ref<RestCollection>();
  const activeRestRequest = ref<string>("");
  return {
    restCollection,
    currentRestCollection,
    activeRestRequest
  }
})
