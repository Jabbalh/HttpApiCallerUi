<template>
  <div class="rest-smart-onglet" @mouseover="onHover" @mouseleave="onLeave">
    <div class="rest-method" :class="method" v-if="method">{{method.toUpperCase()}}</div>
    <q-icon v-else class="rest-method" name="folder_open" size="xs"  />
    <div class="rest-method-name">{{label}}</div>
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
  method: String,
  id: String,
  saved: Boolean
});
const emit = defineEmits(['onClose'])
const isCloseDisplay = ref(false);
const onClose = () => {
  emit('onClose');
};

const onHover = () => isCloseDisplay.value = true;
const onLeave = () => isCloseDisplay.value = false;

const displayRound = computed(() => !props.saved && !isCloseDisplay.value);


</script>
<style lang="scss">
  .smart-tab-close {
    z-index: 2;
    color: gray;
    padding-right: 8px;
    &:hover {
      color: red;
    }
  }
</style>
