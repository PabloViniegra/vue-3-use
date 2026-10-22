<script setup lang="ts">
import CallOut from '../../../components/ui/CallOut.vue'
import CodeBlock from '../../../components/ui/CodeBlock.vue'
import DemoBox from '../../../components/ui/DemoBox.vue'
import DocTopic from '../../../components/ui/DocTopic.vue'
import * as s from '../content/snippets'
import DraftDemo from '../demos/DraftDemo.vue'
import PointerDemo from '../demos/PointerDemo.vue'
</script>

<template>
  <DocTopic id="componentes" title="Props y eventos">
    <p>
      Una app de Vue es un árbol de componentes. Cada uno hace una cosa y la comunicación
      entre padre e hijo sigue una regla muy simple: <strong>los datos bajan por props, los
      avisos suben por eventos</strong>.
    </p>
    <CodeBlock :code="s.childComponent" />
    <CodeBlock :code="s.parentComponent" />
    <p>
      El hijo no toca <code>likes</code>. Solo avisa de que alguien ha pulsado, y el padre,
      que es el dueño del dato, decide qué hacer. Eso es el <em>flujo unidireccional</em>.
    </p>
    <CallOut>
      <p>
        Un restaurante. El cliente (padre) le pasa la comanda al camarero (props). El camarero
        no decide cambiarte el filete por pescado; si se ha acabado, vuelve y te lo dice
        (evento) y tú eliges.
      </p>
    </CallOut>
    <CallOut type="warning">
      <p>
        Nunca modifiques una prop dentro del hijo. Vue te avisará en consola y, aunque a veces
        parezca funcionar, el padre puede sobrescribirla en el siguiente render. Si necesitas
        una copia editable, crea un <code>ref</code> a partir de ella.
      </p>
    </CallOut>
  </DocTopic>

  <DocTopic id="slots" title="Slots">
    <p>
      Las props pasan datos. Los <strong>slots</strong> pasan trozos de plantilla. Con ellos
      construyes componentes “contenedor”: tarjetas, modales, layouts, tablas.
    </p>
    <CodeBlock :code="s.slots" />
    <CallOut>
      <p>
        Un marco de fotos. El marco decide el borde, el cristal y el tamaño; la foto la pones
        tú. Y si no pones ninguna, trae la de la familia sonriente que viene de fábrica (el
        contenido por defecto del slot).
      </p>
    </CallOut>
    <p>
      Los <strong>scoped slots</strong> dan la vuelta a la idea: el hijo tiene los datos y le
      pasa cada elemento al padre para que este decida cómo pintarlo. Es la base de cualquier
      componente de lista o tabla reutilizable.
    </p>
    <CodeBlock :code="s.scopedSlots" />
  </DocTopic>

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
        <code>watchEffect</code> se ejecuta al momento y vigila automáticamente todo lo
        reactivo que lea dentro.
      </li>
      <li>
        <code>onWatcherCleanup</code> (Vue 3.5) registra una limpieza que se ejecuta antes
        de la siguiente vuelta. Llámalo antes del primer <code>await</code>.
      </li>
    </ul>
    <CodeBlock :code="s.watchOptions" lang="js" />
    <DemoBox label="watch con limpieza">
      <DraftDemo />
    </DemoBox>
    <CallOut>
      <p>
        El autoguardado de un buen editor. No guarda en cada tecla: espera a que pares un
        momento. Cada tecla nueva cancela el guardado pendiente, que es justo lo que hace la
        limpieza del watcher de la demo.
      </p>
    </CallOut>
  </DocTopic>

  <DocTopic id="ciclo-de-vida" title="Ciclo de vida">
    <p>
      Un componente nace, se monta en el DOM, se actualiza unas cuantas veces y un día
      desaparece. Vue te deja engancharte a cada momento.
    </p>
    <CodeBlock :code="s.lifecycle" lang="js" />
    <CallOut>
      <p>
        Alquilar un piso. El <code>setup</code> es firmar el contrato: ya existes, pero aún no
        tienes las llaves. <code>onMounted</code> es entrar y colgar los cuadros.
        <code>onUnmounted</code> es devolver las llaves con el piso limpio, porque si dejas un
        <code>setInterval</code> corriendo, la fianza (y la memoria) no vuelve.
      </p>
    </CallOut>
    <p>
      Los que más vas a usar son <code>onMounted</code> y <code>onUnmounted</code>. También
      existen <code>onBeforeMount</code>, <code>onUpdated</code>,
      <code>onBeforeUnmount</code> y alguno más. Lo que en Options API hacías en
      <code>created</code>, aquí va directamente en el cuerpo de
      <code>&lt;script setup&gt;</code>.
    </p>
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
    <CallOut>
      <p>
        Una receta. Escribes una vez cómo se hace el gazpacho y cada persona que la sigue
        prepara el suyo con sus propios tomates. Dos componentes que llaman a
        <code>useRaton()</code> tienen cada uno su <code>x</code> y su <code>y</code>.
      </p>
    </CallOut>
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
    <CallOut>
      <p>
        En una boda, pasar un recado mesa por mesa hasta la del fondo es prop drilling. Ponerlo
        en un cartel en la entrada para que lo lea quien lo necesite es
        <code>provide</code>.
      </p>
    </CallOut>
    <p>
      Úsalo para cosas de “contexto”: tema, idioma, el usuario actual, la configuración de una
      librería. Si muchos componentes sin relación necesitan leer y modificar el mismo
      estado, lo que buscas es Pinia (lo verás al final).
    </p>
  </DocTopic>
</template>
