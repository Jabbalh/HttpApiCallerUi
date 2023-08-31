<template>
  <div class="row">
    <div class="col row border-url">
      <q-select borderless dense v-model="method" :options="options" emit-value map-options class="q-mr-md" style="width: 15%"/>
      <q-separator vertical inset />
      <q-input borderless dense v-model="url" class="q-ml-md q-mr-md" style="width: 70%"/>
    </div>

      <q-btn label="Envoyer" color="primary" class="q-ml-md" dense @click="send" />
      <q-btn-dropdown
        split
        outline
        dense
        class="q-ml-xs"
        color="green"
        label="Sauvegarder"
      >
        <q-list>
          <q-item clickable v-close-popup >
            <q-item-section>
              <q-item-label>Sauvegarder sous</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

  </div>

</template>
<script lang="ts">

import {defineComponent, onActivated, ref} from 'vue';

export default defineComponent({
  name: 'RestHttpRequest',
  props: {
    httpRequest: {
      type: Object,
      required: true
    }
  },
  setup(props) {

    return {
      method: ref(props.httpRequest.method),
      url: ref(props.httpRequest.url),
      options: [
        { value: '', label: '' },
        { value: 'GET', label: 'GET' },
        { value: 'POST', label: 'POST' },
      ]
    }
  },
  methods: {
    send() {
      fetch(this.url, {
        method: this.method
      }).then(x => x.json())
        .then((x => console.log(x)))
    }
  }

})

</script>

<style lang="scss">
  .border-url {
    border: $accent-light-color 1px solid;
    padding: 0 8px 0 8px;
    border-radius: 5px;
  }
</style>
