<template>
  <div style="width: 100%;
    height: 100%;
    padding-top: 8px" @mouseover="onHover" @mouseleave="onLeave">
    <span>{{label}}</span>
    <span style="    float: right;
    position: absolute;
    right: 0;" >
      <q-icon v-show="isCloseDisplay" name="close" class="smart-tab-close" @click="onClose" />
      <q-icon v-show="displayRound" name="circle" color="accent" class="smart-tab-close" style="font-size:0.5rem" />
    </span>
  </div>
</template>
<script lang="ts" setup>

import {computed, ref} from 'vue';

const props = defineProps({
  label: String,
  id: String,
  saved: Boolean
});
const emit = defineEmits(['onClose'])
const isCloseDisplay = ref(false);
const onClose = () => {
  emit('onClose', props);
};

const onHover = () => isCloseDisplay.value = true;
const onLeave = () => isCloseDisplay.value = false;

const displayRound = computed(() => !props.saved && !isCloseDisplay.value);

</script>
<style lang="scss">
  .smart-tab-close {
    z-index: 99;
    color: gray;
    padding-right: 8px;
    &:hover {
      color: red;
    }
  }
</style>
