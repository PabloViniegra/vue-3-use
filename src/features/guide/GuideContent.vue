<script setup lang="ts">
import type { Component } from 'vue'
import DocLevel from '../../components/ui/DocLevel.vue'
import { closing, levels, type LevelId } from './content/toc'
import AdvancedLevel from './levels/AdvancedLevel.vue'
import BasicLevel from './levels/BasicLevel.vue'
import EcosystemLevel from './levels/EcosystemLevel.vue'
import IntermediateLevel from './levels/IntermediateLevel.vue'

const levelComponents = {
  basico: BasicLevel,
  intermedio: IntermediateLevel,
  avanzado: AdvancedLevel,
  ecosistema: EcosystemLevel,
} satisfies Record<LevelId, Component>
</script>

<template>
  <DocLevel
    v-for="(level, i) in levels"
    :id="level.id"
    :key="level.id"
    :title="level.title"
    :eyebrow="`Nivel ${i + 1} de ${levels.length}`"
    :summary="level.summary"
  >
    <component :is="levelComponents[level.id]" />
  </DocLevel>

  <DocLevel :id="closing.id" :title="closing.title">
    <p>
      Leer sobre Vue te da el mapa. Lo que de verdad te hace dominarlo es construir cosas y
      romperlas. Tres proyectos que tocan casi todo lo de esta página:
    </p>
    <ol>
      <li>
        <strong>Una lista de tareas</strong> con filtros (todas, pendientes, hechas) y
        guardado en <code>localStorage</code>. Practicas <code>v-model</code>,
        <code>computed</code> y <code>watch</code>.
      </li>
      <li>
        <strong>Un buscador de películas o recetas</strong> contra una API pública, con
        cancelación de peticiones y estados de carga y error. Practicas watchers,
        composables y componentes con slots.
      </li>
      <li>
        <strong>Una mini tienda</strong> con Vue Router (listado, detalle y carrito) y
        Pinia para el carrito. Practicas rutas, estado global y carga perezosa.
      </li>
    </ol>
    <p>
      Para seguir: el
      <a href="https://vuejs.org/tutorial/" target="_blank" rel="noopener">tutorial interactivo oficial</a>,
      el <a href="https://play.vuejs.org" target="_blank" rel="noopener">Playground</a> para
      probar cosas sin instalar nada y la
      <a href="https://vuejs.org/guide/introduction.html" target="_blank" rel="noopener">guía oficial</a>,
      que cuando ya te sepas lo de aquí se lee como una novela.
    </p>
  </DocLevel>
</template>
