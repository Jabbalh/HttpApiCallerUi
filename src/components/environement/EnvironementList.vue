<template>
    <div class="row cursor-pointer hover-text" @click="globalEdit">
        <q-icon name="language" size="xs" />
        <span class="q-ml-md">Global</span>
    </div>
    <q-separator inset class="q-mt-md q-mb-md" />
    <div class="row cursor-pointer hover-text" @click="newEnv">
        <q-icon name="add" size="xs" />
        <span class="q-ml-md">Nouveau</span>
    </div>
    <q-separator inset class="q-mt-md q-mb-md" />
    <div class="row">
        <q-list class="full-width">
            <q-item clickable v-for="(item, index) in environements" :key="index" draggable="true">
                <q-item-section avatar>
                    <q-icon name="list" color="accent" />
                </q-item-section>

                <q-item-section @click="editEnv(item)">{{ item.name }}</q-item-section>
                <q-item-section>
                    <q-btn icon="delete" flat class="delete_btn" color="negative" z-index @click="deleteEnv(item)" />
                </q-item-section>
            </q-item>


        </q-list>
    </div>
</template>

<script lang="ts" setup>
import { uid, useQuasar } from 'quasar';
import { AppEnvironnement } from 'src/models/model';
import { useEnvStore } from 'src/stores/EnvStore';
import { computed } from 'vue';
import PopinEnvironement from './PopinEnvironement.vue';
const envStore = useEnvStore();
const q$ = useQuasar();
const environements = computed(() => envStore.AppEnvironnement);
const deleteEnv = (value: AppEnvironnement) => { envStore.deleteEnvironnement(value) }
const globalEdit = async () => {
    const result = await openPopin(true, envStore.Global ?? {
        name: "Global",
        id: uid(),
        values: []
    });

    if (result) {
        envStore.$patch({
            Global: result
        });
    }
}
const newEnv = async () => {
    const result = await openPopin(false)
    if (result) {
        envStore.addNewEnv(result)
    }
}

const editEnv = async (value: AppEnvironnement) => {
    const result = await openPopin(false, value)
    if (result) {
        envStore.editEnv(result)
    }
}

const openPopin = (isGlobal: boolean, value?: AppEnvironnement) => {
    return new Promise<AppEnvironnement | undefined>((resolve) => {
        q$.dialog({
            component: PopinEnvironement,
            componentProps: {
                environement: value,
                isGlobal: isGlobal
            }
        }).onOk((result: AppEnvironnement) => {
            resolve(result);
        }).onCancel(() => resolve(undefined));
    })

}
</script>
<style>
.delete_btn {
    width: 5%;
    left: 50%;

}
</style>