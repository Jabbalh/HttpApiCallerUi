<template>
  <div class="autocomplete">
    <div class="input-wrapper">
      <div
        ref="docResponse"
        @focusin="showSuggestionPopover = true"
        style="height: auto;width: 100%; background-color: transparent"  />

    </div>
    <ul
      v-if="showSuggestionPopover && suggestionSource"
      ref="suggestionsMenu"
      class="suggestions"
    >
      <li  v-for="(suggestion, index) in suggestionSource"  :key="`suggestion-${index}`">
            <span class="truncate py-0.5">
              {{ suggestion }}
            </span>
      </li>
    </ul>
  </div>

  <!--  <ul-->
  <!--    v-if="showSuggestionPopover && suggestionSource"-->
  <!--    ref="suggestionsMenu"-->
  <!--    class="suggestions"-->
  <!--  >-->
  <!--    <li  v-for="(suggestion, index) in suggestionSource"  :key="`suggestion-${index}`">-->
  <!--        <span class="truncate py-0.5">-->
  <!--          {{ suggestion }}-->
  <!--        </span>-->
  <!--    </li>-->
  <!--  </ul>-->

</template>
<script lang="ts" setup>
import {computed, ref, watch, withDefaults} from 'vue';
import { useCodeMirror } from "src/composables/codeMirror";
import {useEnvStore} from "stores/EnvStore";

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

const suggestionsMenu = ref<any | null>(null)
const docResponse = ref<Element | null>(null);
const editor = useCodeMirror(
  docResponse,
  value,
  props.editable,
  true,
  envs
);

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
.input-wrapper {
  position: relative;
  display: flex;
  flex: 1 1 0;
  white-space: nowrap;
  cursor: text;

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
    z-index: 50;
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
