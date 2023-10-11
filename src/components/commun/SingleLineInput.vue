<template>
  <div class="autocomplete" ref="autocomplete">
    <div class="input-wrapper">
      <div
        ref="docResponse"
        @focusin="onFocus"
        style="height: auto;width: 100%; background-color: transparent"  />
    </div>
<!--    <q-menu-->
<!--      v-model="showSuggestionPopover"-->
<!--      ref="refPopupProxy"-->
<!--      v-if="suggestionSource"-->
<!--      :offset="[30, 30]"-->
<!--      no-parent-event-->
<!--      >-->
<!--            <q-list-->
<!--              ref="suggestionsMenu"-->
<!--              class=""-->
<!--              bordered-->
<!--              separator-->
<!--              dense-->
<!--              >-->
<!--              <q-item-->
<!--                clickable-->
<!--                v-ripple-->
<!--                v-for="(item, index) in suggestionSource" :key="`sugg-${index}`">-->
<!--                <q-item-section>{{item}}</q-item-section>-->
<!--              </q-item>-->
<!--            </q-list>-->
<!--    </q-menu>-->

  </div>


</template>
<script lang="ts" setup>
import {computed, ref, watch, withDefaults} from 'vue';
import { useCodeMirror } from "src/composables/codeMirror";
import {useEnvStore} from "stores/EnvStore";
import { onClickOutside } from "@vueuse/core"
import {QPopupProxy} from "quasar";

const props = withDefaults(
  defineProps<{
    modelValue: string,
    editable?: boolean,
    suggestionSource?: string[]
  }>(),
  {
    modelValue: '',
    editable: true,
    suggestionSource: undefined
  });
const showSuggestionPopover = ref(false);
const appEnv = useEnvStore();
const envs = computed(() => appEnv.Current);
const emit = defineEmits(['update:modelValue']);

const value = computed({
  get: () => props.modelValue,
  set: (value: string) => {
    if (value != props.modelValue){
      emit('update:modelValue', value);
    }
  }
});
const autocomplete = ref<any | null>(null);
const suggestionsMenu = ref<any | null>(null);
const docResponse = ref<HTMLElement | null>(null);
const refPopupProxy = ref<QPopupProxy>();
const editor = useCodeMirror(
  docResponse,
  value,
  props.editable,
  true,
  envs
);

const onFocus = () => {
  showSuggestionPopover.value = true;
}
//
// const onShowPopover = () => {
//   if (docResponse.value){
//     docResponse.value.focus();
//   }
// }

//onClickOutside(autocomplete, () => showSuggestionPopover.value = false);

const scrollActiveElIntoView = () => {
  const suggestionsMenuEl = suggestionsMenu.value
  if (suggestionsMenuEl) {
    const activeSuggestionEl = suggestionsMenuEl.querySelector(".active")
    if (activeSuggestionEl) {
      activeSuggestionEl.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start",
      })
    }
  }
}

watch(envs, () => {
  editor.reconfigure(envs);
})

// watch(() => props.modelValue, (newValue, oldValue) => {
//   if (newValue != oldValue) {
//     console.log('newValue')
//   } else {
//     console.log('idem value')
//   }
// })


</script>
<style scoped lang="scss">


.suggestion-liste {
  max-height: 100px;
  height: 100px;
  position: absolute;
  background-color: black;
  overflow: auto;
}

.input-wrapper {
  //absolute inset-0 flex flex-1 divide-x divide-dividerLight overflow-x-auto
  position: absolute;
  display: flex;
  flex: 1;
  overflow-x: auto;
  white-space: nowrap;
  cursor: text;
  width: 100%;

}
.autocomplete {
  position: relative;
  display: flex;
  flex: 1;
  flex-shrink: 0;
  //@apply relative;
  //@apply flex;
  //@apply flex-1;
  //@apply flex-shrink-0;
  //@apply whitespace-nowrap py-4;
  .suggestions {
    position: absolute;
    background-color:  green;
    z-index: 3;
    //@apply shadow-lg;
    min-height: 46px;
    //@apply border-b border-x border-divider;
    overflow-y: auto;
    left: 1px;
    right: 1px;

    top: calc(100% + 1px);
    border-radius: 0 0 8px 8px;

    li {
      display: flex;
      align-items: center;
      justify-items: center;
      width: 100%;
      //@apply flex;
      //@apply items-center;
      //@apply justify-between;
      //@apply w-full;
      //@apply py-2 px-4;
      //@apply text-secondary;
      //@apply cursor-pointer;

      &:last-child {
        border-radius: 0 0 0 8px;
      }

      &:hover,
      &.active {
        background-color: gray;
        color: white;
        cursor: pointer;
        //@apply bg-primaryDark;
        //@apply text-secondaryDark;
        //@apply cursor-pointer;
      }
    }
  }
}


</style>
