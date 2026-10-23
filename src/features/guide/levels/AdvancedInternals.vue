<script setup lang="ts">
import CallOut from '../../../components/ui/CallOut.vue'
import CodeBlock from '../../../components/ui/CodeBlock.vue'
import DemoBox from '../../../components/ui/DemoBox.vue'
import DocTopic from '../../../components/ui/DocTopic.vue'
import * as s from '../content/snippets'
import AsyncDemo from '../demos/AsyncDemo.vue'
import ModelDemo from '../demos/ModelDemo.vue'
import TransitionDemo from '../demos/TransitionDemo.vue'
</script>

<template>
  <DocTopic id="define-model" title="defineModel">
    <p>
      Hacer que tu propio componente funcione con <code>v-model</code> antes era un pequeño
      ritual: recibir una prop <code>modelValue</code> y emitir
      <code>update:modelValue</code>. Desde Vue 3.4, <code>defineModel()</code> te da un
      <code>ref</code> que ya hace las dos cosas.
    </p>
    <CodeBlock :code="s.defineModelSnippet" />
    <p>
      Acepta opciones y se puede tipar. <code>required</code> obliga a quien lo use a pasar el
      <code>v-model</code>. Si desestructuras el resultado en <code>[modelo, modificadores]</code>
      recibes también los modificadores que ponga quien lo use (<code>v-model.mayusculas</code>),
      y las opciones <code>get</code> y <code>set</code> transforman el valor al leer y al
      escribir.
    </p>
    <CodeBlock :code="s.defineModelAdvanced" />
    <DemoBox label="defineModel">
      <ModelDemo />
    </DemoBox>
    <template #note>
      <CallOut>
        <p>
          Los mandos de una tele compartida: el tuyo y el de tu compañera de piso controlan el
          mismo volumen. Da igual quién lo toque, los dos ven el mismo número. Y antes tenías que
          cablear tú el mando (una prop para recibir el volumen y un evento para avisar de los
          cambios); <code>defineModel</code> es el mando que ya viene cableado.
        </p>
      </CallOut>
    </template>
  </DocTopic>

  <DocTopic id="built-ins" title="Transition, Teleport y KeepAlive">
    <p>Tres componentes que vienen de serie y resuelven problemas muy concretos.</p>
    <CodeBlock :code="s.builtIns" />
    <p>
      Con <code>&lt;component :is&gt;</code> pintas el componente que le indiques, y por eso
      encaja tan bien con <code>KeepAlive</code>.
    </p>
    <DemoBox label="Transition">
      <TransitionDemo />
    </DemoBox>
    <ul>
      <li>
        <strong><code>&lt;Transition&gt;</code></strong> añade clases CSS en cada fase de la
        entrada y la salida. Tú pones la animación; Vue se encarga de esperar a que termine
        antes de quitar el elemento. Con <code>mode="out-in"</code> sale primero lo viejo y
        entra después lo nuevo; sin él, conviven un instante y se pisan. Para listas está
        <code>&lt;TransitionGroup&gt;</code>, que anima altas, bajas y reordenaciones. Con
        <code>prefers-reduced-motion</code> activado, desactívalas.
      </li>
      <li>
        <strong><code>&lt;Teleport&gt;</code></strong> pinta su contenido en otro punto del
        DOM. Perfecto para avisos y tooltips que se quedan cortados por un
        <code>overflow: hidden</code> o por el contexto de apilamiento de un ancestro
        (<code>transform</code>, <code>z-index</code>…). Con <code>disabled</code> lo apagas, y
        desde Vue 3.5 <code>defer</code> espera a que el destino exista si se pinta en ese
        mismo ciclo. Para un modal, un <code>&lt;dialog&gt;</code> abierto con
        <code>showModal()</code> ya vive en la capa superior del navegador y trae <code>Esc</code>,
        foco y fondo inerte de serie.
      </li>
      <li>
        <strong><code>&lt;KeepAlive&gt;</code></strong> guarda en caché los componentes que
        alternas, así no pierden su estado al ocultarse. <code>include</code> y
        <code>exclude</code> eligen cuáles por nombre y <code>max</code> limita cuántos guarda.
        Dentro de un componente cacheado, <code>onActivated</code> y
        <code>onDeactivated</code> avisan de cuándo vuelve a verse o se esconde.
      </li>
    </ul>
    <CodeBlock :code="s.builtInsExtra" />
    <template #note>
      <CallOut>
        <p>
          <code>Teleport</code> es pedir algo por internet desde casa y que te lo entreguen en
          la oficina: lo gestionas desde tu componente, pero aparece donde no le estorba nadie.
          <code>KeepAlive</code> es dejar la pestaña del navegador abierta en lugar de cerrarla
          y volver a buscar la página.
        </p>
      </CallOut>
    </template>
  </DocTopic>

  <DocTopic id="async" title="Componentes asíncronos">
    <p>
      No todo tiene que descargarse al abrir la app. Con
      <code>defineAsyncComponent</code>, Vite separa ese componente en su propio archivo y
      solo lo pide cuando se va a pintar.
    </p>
    <CodeBlock :code="s.asyncComponent" lang="js" />
    <p>
      <code>timeout</code> da por fallida la carga si tarda demasiado, y
      <code>onError</code> te deja reintentar antes de rendirte. La demo de abajo usa
      <code>onErrorCaptured</code> para que el fallo simulado no llegue a la consola; lo verás
      explicado en <a href="#plugins-errores">Plugins y gestión de errores</a>.
    </p>
    <DemoBox label="defineAsyncComponent">
      <AsyncDemo />
    </DemoBox>
    <template #note>
      <CallOut>
        <p>
          Un restaurante no cocina toda la carta al abrir: prepara cada plato cuando alguien lo
          pide. Mientras sale, te dejan pan en la mesa (el <code>loadingComponent</code>), y si
          se acabó el pescado, el camarero te lo dice (el <code>errorComponent</code>).
        </p>
      </CallOut>
    </template>
    <p>
      <code>&lt;Suspense&gt;</code> coordina la espera: muestra un fallback mientras sus
      hijos asíncronos (o con <code>await</code> en el <code>setup</code>) se resuelven.
    </p>
    <CodeBlock :code="s.suspense" />
    <p>
      Un detalle: un componente asíncrono dentro de un <code>&lt;Suspense&gt;</code> le cede el
      control de la carga. Su propio <code>loadingComponent</code> se ignora y manda el
      <code>fallback</code>, salvo que le pongas <code>suspensible: false</code>.
    </p>
    <CallOut type="warning">
      <p>
        <code>Suspense</code> sigue marcado como experimental en la documentación oficial. Se
        usa bastante (Nuxt se apoya en él), pero su API todavía puede cambiar.
      </p>
    </CallOut>
    <p>
      Una nota para cuando renderices en servidor (con Nuxt, por ejemplo): el HTML llega ya
      pintado, pero el componente no es interactivo hasta que se <em>hidrata</em>. Desde Vue
      3.5, un componente asíncrono puede decidir cuándo: al verse en pantalla
      (<code>hydrateOnVisible</code>), cuando el navegador esté ocioso
      (<code>hydrateOnIdle</code>), al interactuar (<code>hydrateOnInteraction</code>) o con
      una media query (<code>hydrateOnMediaQuery</code>). En una SPA como esta no hace falta.
    </p>
    <CodeBlock :code="s.hydration" lang="js" />
  </DocTopic>
</template>
