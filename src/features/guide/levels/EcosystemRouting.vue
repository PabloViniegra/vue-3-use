<script setup lang="ts">
import BaseLinkGrid from '../../../components/ui/BaseLinkGrid.vue'
import CallOut from '../../../components/ui/CallOut.vue'
import CodeBlock from '../../../components/ui/CodeBlock.vue'
import DemoBox from '../../../components/ui/DemoBox.vue'
import DocTopic from '../../../components/ui/DocTopic.vue'
import { ecosystem } from '../content/ecosystem'
import * as s from '../content/snippets'
import RouterDemo from '../demos/RouterDemo.vue'
</script>

<template>
  <DocTopic id="mapa-ecosistema" title="Qué hay alrededor de Vue">
    <p>
      Vue se ocupa de la vista y poco más, y es a propósito. Lo demás (rutas, estado
      compartido, peticiones a la API) lo ponen librerías oficiales o de la comunidad tan
      asentadas que son el estándar de facto.
    </p>
    <BaseLinkGrid :items="ecosystem" />
    <p>
      Las tres que vas a ver aquí se instalan igual y se enchufan igual: como plugins, con
      <code>app.use()</code>, una sola vez al arrancar.
    </p>
    <CodeBlock :code="s.ecosystemInstall" lang="bash" />
    <CodeBlock :code="s.ecosystemMain" lang="js" />
    <p>
      Si creas el proyecto con <code>npm create vue@latest</code>, el asistente te pregunta
      si quieres Router y Pinia y te deja todo esto montado.
    </p>
    <template #note>
      <CallOut>
        <p>
          Vue es el motor del coche. Funciona solo, pero para ir de viaje le pones GPS (el
          router), una guantera que comparten todos los que van dentro (Pinia) y alguien que
          se acuerda de por dónde hay gasolineras para no preguntar en cada pueblo (TanStack
          Query).
        </p>
      </CallOut>
    </template>
  </DocTopic>

  <DocTopic id="vue-router" title="Vue Router">
    <p>
      En una SPA solo hay un HTML. El router lee la URL y decide qué componente pintar, sin
      recargar la página. Así cada pantalla tiene su dirección: se puede compartir, guardar
      en favoritos y el botón de atrás funciona.
    </p>
    <p>Todo empieza con una tabla de rutas: qué URL lleva a qué componente.</p>
    <CodeBlock :code="s.routerSetup" lang="js" />
    <p>
      Fíjate en <code>:id</code>: es un parámetro, un hueco que acepta cualquier valor.
      <code>/productos/7</code> y <code>/productos/42</code> usan el mismo componente. Y las
      rutas con <code>() =&gt; import()</code> se descargan cuando alguien las visita, no al
      cargar la app.
    </p>
    <p>
      En las plantillas, <code>&lt;RouterLink&gt;</code> sustituye al
      <code>&lt;a&gt;</code> y <code>&lt;RouterView&gt;</code> marca dónde va la página:
    </p>
    <CodeBlock :code="s.routerView" />
    <p>
      Dentro de una página, <code>useRoute()</code> te da la ruta actual (parámetros, query,
      nombre) y <code>useRouter()</code> te deja navegar desde código:
    </p>
    <CodeBlock :code="s.routerParams" />
    <p>
      Los <strong>guards</strong> se ejecutan antes de cada navegación y pueden dejarla pasar
      o redirigirla. Lo típico: mandar al login a quien intenta entrar en una página
      privada.
    </p>
    <CodeBlock :code="s.routerGuard" lang="js" />
    <DemoBox label="Una tabla de rutas resolviendo URLs">
      <RouterDemo />
    </DemoBox>
    <CallOut type="warning">
      <p>
        Un guard en el navegador es comodidad, no seguridad: cualquiera puede saltárselo
        desde las DevTools. Lo que de verdad protege los datos es que la API compruebe la
        sesión.
      </p>
    </CallOut>
    <template #note>
      <CallOut>
        <p>
          El router es el directorio de un centro comercial. Buscas «tienda 42» y te dice en qué
          planta está, sin que tengas que salir a la calle y volver a entrar. El guard es el
          segurata de la zona VIP: si no tienes pase, te manda a la taquilla.
        </p>
      </CallOut>
    </template>
  </DocTopic>
</template>
