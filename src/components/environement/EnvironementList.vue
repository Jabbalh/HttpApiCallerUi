<template>
    <div class="row cursor-pointer hover-text">
        <q-icon name="language" size="xs" />
        <span class="q-ml-md">Global</span>
    </div>
    <q-separator inset class="q-mt-md q-mb-md" />
    <div class="row cursor-pointer hover-text">
        <q-icon name="add" size="xs" />
        <span class="q-ml-md">Nouveau</span>
    </div>
    <q-separator inset class="q-mt-md q-mb-md" />
    <div class="row"></div>
</template>
<script lang="ts" setup>
import { useEnvStore } from 'src/stores/EnvStore';
const envStore = useEnvStore();
</script>