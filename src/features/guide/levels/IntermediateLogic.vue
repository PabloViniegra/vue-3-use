<script setup lang="ts">
import CallOut from '../../../components/ui/CallOut.vue'
import CodeBlock from '../../../components/ui/CodeBlock.vue'
import DemoBox from '../../../components/ui/DemoBox.vue'
import DocTopic from '../../../components/ui/DocTopic.vue'
import * as s from '../content/snippets'
import DraftDemo from '../demos/DraftDemo.vue'
import PointerDemo from '../demos/PointerDemo.vue'
import TemplateRefDemo from '../demos/TemplateRefDemo.vue'
import UseIdDemo from '../demos/UseIdDemo.vue'
</script>

<template>
  <DocTopic id="watchers" title="watch y watchEffect">
    <p>
      <code>computed</code> sirve para calcular valores. Cuando lo que quieres es
      <em>hacer algo</em> al cambiar un dato (llamar a una API, guardar en
      <code>localStorage</code>, cambiar el título de la pestaña), necesitas un watcher.
    </p>
    <CodeBlock :code="s.watchers" lang="js" />
    <ul>
      <li>
        <code>watch</code> vigila fuentes concretas y te da el valor nuevo y el anterior. Es
        perezoso: no se ejecuta hasta el primer cambio.
      </li>
      <li>
        <code>onWatcherCleanup</code> (Vue 3.5) registra una limpieza que se ejecuta antes
        de la siguiente vuelta, y también cuando el watcher se detiene. Llámalo antes del
        primer <code>await</code>.
      </li>
    </ul>
    <p>
      <code>watchEffect</code> es la versión sin lista: se ejecuta al momento y vigila
      automáticamente todo lo reactivo que lea dentro.
    </p>
    <CodeBlock :code="s.watchEffectSnippet" lang="js" />
    <p>
      Las opciones cambian cuándo y cómo se ejecuta el callback. Las más útiles, comentadas:
    </p>
    <CodeBlock :code="s.watchOptions" lang="js" />
    <p>
      Puedes vigilar varias fuentes a la vez, elegir si el callback corre antes o después de
      repintar (lo verás a fondo en <a href="#next-tick">nextTick y el DOM</a>) y, desde Vue
      3.5, parar, pausar y reanudar un watcher:
    </p>
    <CodeBlock :code="s.watchControl" lang="js" />
    <DemoBox label="watch con limpieza">
      <DraftDemo />
    </DemoBox>
    <template #note>
      <CallOut>
        <p>
          El autoguardado de un buen editor. No guarda en cada tecla: espera a que pares un
          momento. Cada tecla nueva cancela el guardado pendiente, que es justo lo que hace la
          limpieza del watcher de la demo.
        </p>
      </CallOut>
    </template>
  </DocTopic>

  <DocTopic id="ciclo-de-vida" title="Ciclo de vida">
    <p>
      Un componente nace, se monta en el DOM, se actualiza unas cuantas veces y un día
      desaparece. Vue te deja engancharte a cada momento.
    </p>
    <CodeBlock :code="s.lifecycle" lang="js" />
    <template #note>
      <CallOut>
        <p>
          Alquilar un piso. El <code>setup</code> es firmar el contrato: ya existes, pero aún no
          tienes las llaves. <code>onMounted</code> es entrar y colgar los cuadros.
          <code>onUnmounted</code> es devolver las llaves con el piso limpio, porque si dejas un
          <code>setInterval</code> corriendo, la fianza (y la memoria) no vuelve.
        </p>
      </CallOut>
    </template>
    <p>
      Los que más vas a usar son <code>onMounted</code> y <code>onUnmounted</code>. También
      existen <code>onBeforeMount</code>, <code>onUpdated</code>,
      <code>onBeforeUnmount</code> y alguno más. Lo que en Options API hacías en
      <code>created</code>, aquí va directamente en el cuerpo de
      <code>&lt;script setup&gt;</code>.
    </p>
  </DocTopic>

  <DocTopic id="template-refs" title="Template refs">
    <p>
      A veces necesitas el elemento del DOM de verdad: enfocar un input, medir un div, pasarle
      un nodo a una librería de gráficos. Para eso están las template refs. Desde Vue 3.5,
      <code>useTemplateRef</code> es la forma más clara.
    </p>
    <CodeBlock :code="s.templateRefs" />
    <DemoBox label="Template refs">
      <TemplateRefDemo />
    </DemoBox>
    <p>
      El valor es <code>null</code> hasta que el componente se monta, de ahí el
      <code>?.</code>. Si pones <code>ref</code> en un componente hijo, obtienes su instancia,
      pero con <code>&lt;script setup&gt;</code> solo verás lo que el hijo exponga con
      <code>defineExpose()</code>. Componentes cerrados por defecto, como debe ser.
    </p>
    <template #note>
      <CallOut>
        <p>
          Normalmente le dices a Vue qué quieres y él se las apaña con el DOM. Una template ref
          es pedirle el teléfono directo de un elemento para hablar con él sin intermediarios:
          enfocarlo, medirlo. Para cambiarle el texto no lo llames; eso sigue siendo cosa de Vue.
        </p>
      </CallOut>
    </template>
  </DocTopic>

  <DocTopic id="composables" title="Composables">
    <p>
      Un composable es una función que usa la Composition API para encapsular lógica con
      estado y reutilizarla. Por convención su nombre empieza por <code>use</code>.
    </p>
    <CodeBlock :code="s.composable" lang="js" />
    <CodeBlock :code="s.composableUsage" />
    <DemoBox label="un composable de puntero">
      <PointerDemo />
    </DemoBox>
    <template #note>
      <CallOut>
        <p>
          Una receta. Escribes una vez cómo se hace el gazpacho y cada persona que la sigue
          prepara el suyo con sus propios tomates. Dos componentes que llaman a
          <code>useRaton()</code> tienen cada uno su <code>x</code> y su <code>y</code>.
        </p>
      </CallOut>
    </template>
    <p>
      Antes de escribir el tuyo, mira <a href="https://vueuse.org" target="_blank" rel="noopener">VueUse</a>:
      tiene cientos de composables ya hechos para el ratón, el almacenamiento local, el
      tamaño de la ventana, el modo oscuro…
    </p>
  </DocTopic>

  <DocTopic id="provide-inject" title="provide / inject">
    <p>
      Cuando un dato tiene que llegar a un componente siete niveles más abajo, pasarlo como
      prop por todos los intermedios (lo que se llama <em>prop drilling</em>) es tedioso y
      ensucia componentes que no lo usan.
      <code>provide</code> lo deja disponible para todos los descendientes, e
      <code>inject</code> lo recoge donde haga falta.
    </p>
    <CodeBlock :code="s.provideInject" lang="js" />
    <p>
      La clave es un <code>Symbol</code> y no un
      texto, así dos librerías no pisan el mismo nombre. Y se provee el estado como
      <code>readonly</code> junto con la función que lo cambia: si cualquier descendiente
      pudiera mutar el <code>ref</code> directamente, no sabrías quién lo ha cambiado. Si quieres que lo vea toda la aplicación, <code>app.provide</code> en
      <code>main.js</code> hace lo mismo. Y un <code>inject</code> sin <code>provide</code>
      arriba devuelve <code>undefined</code> y avisa, salvo que le des un valor por defecto.
    </p>
    <template #note>
      <CallOut>
        <p>
          En una boda, pasar un recado mesa por mesa hasta la del fondo es prop drilling. Ponerlo
          en un cartel en la entrada para que lo lea quien lo necesite es
          <code>provide</code>.
        </p>
      </CallOut>
    </template>
    <p>
      Úsalo para cosas de “contexto”: tema, idioma, el usuario actual, la configuración de una
      librería. Si muchos componentes sin relación necesitan leer y modificar el mismo
      estado, lo que buscas es Pinia (lo verás al final).
    </p>
  </DocTopic>

  <DocTopic id="use-id" title="useId">
    <p>
      Un <code>&lt;label for&gt;</code> y un <code>aria-describedby</code> necesitan un
      <code>id</code>. Si lo escribes a mano en un componente reutilizable, el día que lo usas
      dos veces en la misma página tienes dos <code>id="nombre"</code> y la etiqueta enfoca el
      campo equivocado. <code>useId()</code> (Vue 3.5) devuelve un <code>id</code> único por
      cada instancia y, además, estable entre servidor y navegador si algún día renderizas en
      servidor.
    </p>
    <CodeBlock :code="s.useIdSnippet" />
    <DemoBox label="useId">
      <UseIdDemo />
    </DemoBox>
    <template #note>
      <CallOut>
        <p>
          El número de la vez en la consulta del médico. No eliges tú el 14: te lo da la
          máquina, no se repite con el de otro paciente y sirve para que te llamen a ti y no a
          quien se llama igual.
        </p>
      </CallOut>
    </template>
    <CallOut type="warning">
      <p>
        <code>useId</code> es para atributos de HTML. No lo uses como <code>:key</code> de un
        <code>v-for</code>: da un id por componente, no por elemento, así que todas las filas
        compartirían el mismo. La <code>key</code> sale del dato (<code>item.id</code>).
      </p>
    </CallOut>
  </DocTopic>
</template>
