<template>
  <div
    @click="onClick"
    class="q-tab relative-position self-stretch flex flex-center text-center q-focusable q-hoverable cursor-pointer"
    :class="isActiveClass"
    tabindex="0"
    role="tab"
    aria-selected="true">
    <div class="q-focus-helper" tabindex="-1"></div>
      <div class="q-tab__content self-stretch flex-center relative-position
                  q-anchor--skip non-selectable row no-wrap q-tab__content--inline">
        <div class="q-tab__label">{{label}}</div>
        <i
          :v-show="alert"
          class="q-icon bootstrap-icons  q-tab__alert-icon"
          aria-hidden="true"
          role="presentation"
          :class="alertIcon"> </i>
      </div>
      <div class="q-tab__indicator absolute-top text-deep-purple-8"
           style="transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1) 0s; transform: none;">

      </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, inject, ref} from "vue";


export default defineComponent({
  name:'RestTab',
  props: {
    name: {
      type: String,
      required: true
    },
    label: String,
    alertIcon: String,
    alert: Boolean
  },
  setup(props, { emit }){

    const currentModel = {
      currentModel: ref(''),
      updateModel: (obj: {name: string }) => {console.log(obj)},
    };
    const $tabs = inject('_q_tabs_',currentModel);

    const isActive = computed(() => $tabs.currentModel.value === props.name);
    const isActiveClass = computed(() => isActive.value ? ' q-tab--active' : '  q-tab--inactive');

    const onClick = function(e: any){
      $tabs.updateModel({ name: props.name })
      emit('click', e)
    }

    return {
      isActiveClass,
      onClick
    }
  }

})

</script>
