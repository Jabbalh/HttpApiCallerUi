<template>
  <div class="tree-nav__item">
    <div v-for="(item, index) in items" :key="index">
      <div>
        <a class="tree-nav__item-title leaf items-center justify-center" :class="item.isActive ? 'active': ''" @click="open(item)">
          <div
            class="rest-method truncate items-center justify-center"
            :class="item.method"
              style="padding-right: 6px">{{item.method}}</div>
          <div class="items-center justify-center">{{item.name}}</div>
        </a>
        <q-icon name="more_vert" style=" float: right; z-index: 1;">
          <q-popup-proxy >
            <PopinMenuRequest :request="item" />
          </q-popup-proxy>
        </q-icon>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {RestRequest} from "src/models/model";
import PopinMenuRequest from "components/httpRest/PopinMenuRequest.vue";

  const props = defineProps<{ items: RestRequest[] }>();
const emit = defineEmits<{
  (e: 'open', value: RestRequest): void,
}>();

const open = (value: RestRequest) => emit('open', value);


</script>
