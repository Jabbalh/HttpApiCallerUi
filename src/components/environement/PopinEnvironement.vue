<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide">
        <q-card class="q-dialog-plugin popin_env">
            <q-card-section>
                <div class="title">
                    Modifier l'environement
                </div>
            </q-card-section>
            <q-card-section>
                <q-input ref="inputPopin" v-model="cloneEnv.name" outlined dense :disable="isGlobal" autofocus
                    @keyup.enter="onOKClick" />
            </q-card-section>
            <q-separator inset class="q-mt-md q-mb-md" />
            <q-card-section class="parameter">
                <RestHttpRequestParamValues v-model="cloneEnv.values" :is-header="false" @add="onAdd" @delete="onDelete"
                    @delete-all="onDeleteAll" />
            </q-card-section>
            <q-separator inset class="q-mt-md q-mb-md" />

            <q-card-actions align="right" class="row q-ma-md">
                <q-btn class="p_cancel__btn" :label="i18n.t('ENV.POPIN_CANCEL')" @click="onDialogCancel" />
                <q-btn class="p_ok_btn" :label="i18n.t('ENV.POPIN_SAVE')" @click="onOKClick" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
  
<script lang="ts" setup>
import { ref } from "vue"
import cloneDeep from 'lodash/cloneDeep';
import { uid, useDialogPluginComponent } from 'quasar'
import { AppEnvironnement, RestRequestParameters } from 'src/models/model';
import RestHttpRequestParamValues from "../httpRest/RestHttpRequestParamValues.vue";
import { maxBy, method, remove } from "lodash";
import { useI18n } from "vue-i18n";
const props = defineProps<{
    environement?: AppEnvironnement,
    isGlobal: boolean
}>();
defineEmits([
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits
])

const i18n = useI18n();

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const cloneEnv = ref(cloneDeep(props.environement) ?? {
    name: "",
    id: uid(),
    values: []
})
function onOKClick() {

    onDialogOK(cloneEnv.value)

}

const onAdd = () => {
    if (cloneEnv.value.values) {
        const last = maxBy(cloneEnv.value.values, x => x.id);
        cloneEnv.value.values.push({
            id: (last?.id ?? 0) + 1,
            entry: { key: '', value: '', active: true }
        });
    }
}
const onDelete = (value: RestRequestParameters) => {
    if (value && cloneEnv.value.values) {
        const p = cloneEnv.value.values.find(x => x.id == value.id);
        if (p) {
            remove(cloneEnv.value.values, x => x.id == p.id);
            let i = 0;
            for (const item of cloneEnv.value.values) {
                item.id = ++i;
            }
        }
    }
}

const onDeleteAll = () => cloneEnv.value.values = []
</script>
<style lang="scss">
.popin_env {
    width: 30vw;
    height: 40vw;

}

.title {
    font-size: large;
}

.parameter {
    position: relative;
    height: calc(100% - 250px);
}

.p_ok_btn {
    background-color: #8f1ca3;
    width: auto;
}

.p_cancel__btn {
    background-color: #313131;
    width: 20%;
}
</style>