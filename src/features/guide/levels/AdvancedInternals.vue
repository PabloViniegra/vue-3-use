<script setup lang="ts">
import CallOut from '../../../components/ui/CallOut.vue'
import CodeBlock from '../../../components/ui/CodeBlock.vue'
import DemoBox from '../../../components/ui/DemoBox.vue'
import DocTopic from '../../../components/ui/DocTopic.vue'
import * as s from '../content/snippets'
import AsyncDemo from '../demos/AsyncDemo.vue'
import ModelDemo from '../demos/ModelDemo.vue'
import TemplateRefDemo from '../demos/TemplateRefDemo.vue'
import TransitionDemo from '../demos/TransitionDemo.vue'
</script>

<template>
  <DocTopic id="reactividad-a-fondo" title="Reactividad a fondo">
    <p>
      <code>reactive()</code> envuelve tu objeto en un
      <a href="https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Proxy" target="_blank" rel="noopener">Proxy</a>
      de JavaScript. Cada vez que algo lee una propiedad, Vue apunta quién la leyó
      (<em>track</em>). Cada vez que alguien la cambia, avisa solo a esos (<em>trigger</em>).
      <code>ref()</code> hace lo mismo con un getter y un setter en <code>.value</code>.
    </p>
    <CodeBlock :code="s.proxyIdea" lang="js" />
    <template #note>
      <CallOut>
        <p>
          Una newsletter. Leer una propiedad dentro de un <code>computed</code> o una plantilla
          es suscribirte. Cuando cambia, solo reciben el correo los suscriptores, no toda la
          app. Por eso Vue sabe exactamente qué componentes repintar sin que tú se lo digas.
        </p>
      </CallOut>
    </template>
    <p>Saber esto explica las trampas típicas:</p>
    <CodeBlock :code="s.deepReactivity" lang="js" />
    <ul>
      <li>
        <strong>Desestructurar un <code>reactive</code></strong> rompe la conexión. Te
        llevas valores sueltos. <code>toRefs</code> o <code>toRef</code> lo arreglan.
      </li>
      <li>
        <strong><code>shallowRef</code> y <code>shallowReactive</code></strong> solo vigilan
        el primer nivel. Perfectos para estructuras enormes que reemplazas de golpe (la
        respuesta de una API, datos de un gráfico).
      </li>
      <li>
        <strong><code>markRaw</code></strong> marca un objeto para que Vue nunca lo haga
        reactivo. Útil para instancias de librerías externas como un mapa o un editor.
      </li>
      <li>
        <strong>El DOM se actualiza en lote</strong>, en el siguiente tick. Si cambias un dato
        y justo después mides el DOM, verás el valor antiguo. <code>await nextTick()</code>
        espera a que se aplique.
      </li>
    </ul>
  </DocTopic>

  <DocTopic id="define-model" title="defineModel">
    <p>
      Hacer que tu propio componente funcione con <code>v-model</code> antes era un pequeño
      ritual: recibir una prop <code>modelValue</code> y emitir
      <code>update:modelValue</code>. Desde Vue 3.4, <code>defineModel()</code> te da un
      <code>ref</code> que ya hace las dos cosas.
    </p>
    <CodeBlock :code="s.defineModelSnippet" />
    <DemoBox label="defineModel">
      <ModelDemo />
    </DemoBox>
    <template #note>
      <CallOut>
        <p>
          Los mandos de una tele compartida: el tuyo y el de tu compañera de piso controlan el
          mismo volumen. Da igual quién lo toque, los dos ven el mismo número.
        </p>
      </CallOut>
    </template>
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

  <DocTopic id="built-ins" title="Transition, Teleport y KeepAlive">
    <p>Tres componentes que vienen de serie y resuelven problemas muy concretos.</p>
    <CodeBlock :code="s.builtIns" />
    <DemoBox label="Transition">
      <TransitionDemo />
    </DemoBox>
    <ul>
      <li>
        <strong><code>&lt;Transition&gt;</code></strong> añade clases CSS en cada fase de la
        entrada y la salida. Tú pones la animación; Vue se encarga de esperar a que termine
        antes de quitar el elemento.
      </li>
      <li>
        <strong><code>&lt;Teleport&gt;</code></strong> pinta su contenido en otro punto del
        DOM. Perfecto para modales y tooltips que se quedan cortados por un
        <code>overflow: hidden</code> o un <code>z-index</code> de un padre.
      </li>
      <li>
        <strong><code>&lt;KeepAlive&gt;</code></strong> guarda en caché los componentes que
        alternas, así no pierden su estado al ocultarse.
      </li>
    </ul>
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
    <CallOut type="warning">
      <p>
        <code>Suspense</code> sigue marcado como experimental en la documentación oficial. Se
        usa bastante (Nuxt se apoya en él), pero su API todavía puede cambiar.
      </p>
    </CallOut>
  </DocTopic>
</template>
