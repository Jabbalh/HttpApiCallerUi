import {computed, ref} from "vue";

const useHoverTabs = function(){
  const alertIconRef = ref("bi-exclamation-circle-fill");

  const alertIcon = computed(() => alertIconRef);

  const onEnter = function(){
    alertIconRef.value = "bi-x-circle";
  }

  const onLeave = function() {
    alertIconRef.value = "bi-exclamation-circle-fill";
  }

  return {
    alertIconRef,
    alertIcon,
    onEnter,
    onLeave
  }

}

export default useHoverTabs;
