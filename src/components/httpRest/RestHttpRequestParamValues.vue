<template>
  <div class="row" style="background-color: transparent">
    <div class="col">Paramètres de la requète</div>
    <q-space />
    <div class="col-auto">
      <q-btn flat rounded icon="delete" size="sm" >
        <q-tooltip>
          Tout effacer
        </q-tooltip>
      </q-btn>
      <q-btn flat rounded icon="add" size="sm">
        <q-tooltip>
          Ajouter un paramètre
        </q-tooltip>
      </q-btn>
    </div>
  </div>
  <div class="row">
    <div class="col-1"><q-icon name="menu" /></div>
    <div class="col-5">Argument</div>
    <div class="col-5">Value</div>
    <div class="col-1">A B</div>
  </div>
</template>

<script lang="ts" setup>

</script>
