<template>
  <div style="width: 100%;
    height: 100%;
    padding-top: 8px" @mouseover="onHover" @mouseleave="onLeave">
    <span>{{label}}</span>
    <span style="    float: right;
    position: absolute;
    right: 0;" ><q-icon v-show="isCloseDisplay" name="close" class="smart-tab-close" @click="onClose" /></span>
  </div>
</template>
<script lang="ts" setup>

import {ref} from 'vue';

const props = defineProps({
  label: String,
  id: String
});
const emit = defineEmits(['onClose'])
const isCloseDisplay = ref(false);
const onClose = () => {
  console.log("onClose", props);
  emit('onClose', props);
};

const onHover = () => isCloseDisplay.value = true;
const onLeave = () => isCloseDisplay.value = false;

</script>
<style lang="scss">
  .smart-tab-close {
    z-index: 99;
    &:hover {
      color: red;
    }
  }
</style>
