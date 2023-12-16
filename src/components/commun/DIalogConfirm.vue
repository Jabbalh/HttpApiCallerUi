<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section class="q-dialog__title">
        {{i18n.t(title)}}
      </q-card-section>
      <q-card-section class="q-dialog__message">
        {{i18n.t(message)}}
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="accent" unelevated no-caps :label="i18n.t(ok)" @click="onOKClick" />
        <q-btn color="grey" outline no-caps :label="i18n.t(close)" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { useDialogPluginComponent } from 'quasar'
import {useI18n} from 'vue-i18n';

  withDefaults(
    defineProps<{
      ok: string,
      close: string,
      title: string,
      message: string
    }>(), {
      ok: 'REST.BUTTON_YES',
      close: 'REST.BUTTON_NO',
      title: 'REST.DELETE_FOLDER_TITLE',
      message: 'REST.DELETE_FOLDER_MESSAGE'
});

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits
]);

const i18n = useI18n();

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

// this is part of our example (so not required)
function onOKClick () {
  // on OK, it is REQUIRED to
  // call onDialogOK (with optional payload)
  onDialogOK()
  // or with payload: onDialogOK({ ... })
  // ...and it will also hide the dialog automatically
}
</script>
