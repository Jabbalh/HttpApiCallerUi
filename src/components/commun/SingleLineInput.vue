<template>
  <div class="autocomplete" ref="autocomplete">
    <div class="input-wrapper ">
      <div
        class="single-line"
        ref="docResponse"
        @focusin="onFocus"
        style="height: auto;width: 100%; background-color: transparent"  />
    </div>
    <div v-if="showSuggestionPopover && filteredSuggestion" class="suggestion-liste">
      <q-list  ref="suggestionsMenu" dense >
        <q-item
          clickable
          @click="selectSuggestion(item)"
          v-for="(item, index) in filteredSuggestion" :key="`sugg-${index}`">
          <q-item-section>{{item}}</q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {computed, ref, watch, withDefaults} from 'vue';
import { useCodeMirror } from 'src/composables/codeMirror';
import { onClickOutside } from '@vueuse/core'
import useParseEnv from 'src/composables/parseEnv';

const props = withDefaults(
  defineProps<{
    modelValue: string,
    editable?: boolean,
    suggestionSource?: string[],
    placeholder: string
  }>(),
  {
    modelValue: '',
    editable: true,
    suggestionSource: undefined,
    placeholder: ''
  });
const showSuggestionPopover = ref(false);
const { computedEnv } = useParseEnv();
const envs = computed(() => computedEnv());
const emit = defineEmits(['update:modelValue']);

/**
 * Le v-model, on doit passer par un computed qui propage l'evènement
 */
const value = computed({
  get: () => props.modelValue,
  set: (value: string) => {
    if (value != props.modelValue){
      emit('update:modelValue', value);
    }
  }
});
// Div global
const autocomplete = ref<any | null>(null);
// Div de suggestion
const suggestionsMenu = ref<any | null>(null);
// L'input codeMirror
const docResponse = ref<HTMLElement | null>(null);

const lang = ref('none');
// L'editeur codeMirror
const editor = useCodeMirror(
  docResponse,
  value,
  props.editable,
  true,
  envs,
  lang,
  props.placeholder
);

/**
 * Filter on suggestion source and input value
 */
const filteredSuggestion = computed(() => {
  if (props.suggestionSource){
    const result =  value.value ? props.suggestionSource.filter(x => x.startsWith(value.value)) : props.suggestionSource;
    return result.length > 0 ? result : undefined;
  }
  return undefined
})

/**
 * Evènement onFocus on input codeMirror
 */
const onFocus = () => {
  if (props.suggestionSource){
    showSuggestionPopover.value = true;
  }
}

/**
 * On click on suggestion
 * @param sug
 */
const selectSuggestion = (sug: string) => {
  value.value = sug;
  showSuggestionPopover.value = false;
}

/**
 * On clic outside main div (hide suggestion)
 */
onClickOutside(autocomplete, () => showSuggestionPopover.value = false);

// const scrollActiveElIntoView = () => {
//   const suggestionsMenuEl = suggestionsMenu.value
//   if (suggestionsMenuEl) {
//     const activeSuggestionEl = suggestionsMenuEl.querySelector(".active")
//     if (activeSuggestionEl) {
//       activeSuggestionEl.scrollIntoView({
//         behavior: "smooth",
//         block: "center",
//         inline: "start",
//       })
//     }
//   }
// }

/**
 * Watch env to reconfigure editor for Highlight and Tooltip
 */
watch(envs, () => {
  editor.reconfigure(envs);
})

</script>
<style scoped lang="scss">
.autocomplete {
  position: relative;
  display: flex;
  flex: 1;
  flex-shrink: 0;

  .input-wrapper {
    position: absolute;
    display: flex;
    flex: 1;
    overflow-x: auto;
    white-space: nowrap;
    cursor: text;
    width: 100%;
  }
  .suggestion-liste {
    max-height: 150px;
    height: auto;
    width: 100%;
    position: absolute;
    background-color: var(--q-panel-secondary);
    overflow: auto;
    top: 27px;
    z-index: 10;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-left: 1px solid;
    border-right: 1px solid;
    border-bottom: 1px solid;
    border-color: var(--q-panel-border);
  }
}
</style>
