<template>
  <div style="width: 139px">
    <span>{{label}}</span>
    <span style="float: right"><q-icon name="close" @click="onClose" /></span>
  </div>
</template>
<script lang="ts" setup>

const props = defineProps({
  label: String,
  id: String
});
const emit = defineEmits(['onClose'])

const onClose = () => {
  console.log("onClose", props);
  emit('onClose', props);
};

</script>
