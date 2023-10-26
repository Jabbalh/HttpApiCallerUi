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
            <q-item clickable v-for="(item, index) in environements" :key="index" @click="editEnv(item)">

                <q-item-section avatar>
                    <q-icon color="primary" name="label_important" />
                </q-item-section>

                <q-item-section>{{ item.name }}</q-item-section>
            </q-item>


        </q-list>
    </div>
</template>
<script lang="ts" setup>
import { AppEnvironnement } from 'src/models/model';
import { useEnvStore } from 'src/stores/EnvStore';
import { computed } from 'vue';
const envStore = useEnvStore();
const environements = computed(() => envStore.AppEnvironnement);
const globalEdit = () => {
    console.log("globalEdit")
}
const newEnv = () => {
    console.log("newEnv")
}
const editEnv = (value: AppEnvironnement) => {
    console.log("editEnv", value)
}
</script>