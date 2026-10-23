<script setup lang="ts">
import CallOut from '../../../components/ui/CallOut.vue'
import CodeBlock from '../../../components/ui/CodeBlock.vue'
import DemoBox from '../../../components/ui/DemoBox.vue'
import DocTopic from '../../../components/ui/DocTopic.vue'
import * as s from '../content/snippets'
import QueryDemo from '../demos/QueryDemo.vue'
import StoreDemo from '../demos/StoreDemo.vue'
</script>

<template>
  <DocTopic id="pinia" title="Pinia">
    <p>
      Cuando dos componentes que no tienen nada que ver necesitan el mismo dato (el carrito
      en la cabecera y en el catálogo, el usuario logueado en media app), pasarlo por props
      de padre a hijo a nieto se vuelve un infierno. Pinia te da un
      <strong>store</strong>: un sitio central donde vive ese estado y al que cualquier
      componente puede acceder directamente.
    </p>
    <p>
      Un store se escribe igual que un composable: <code>ref</code> para el estado,
      <code>computed</code> para los valores derivados (getters) y funciones para las
      acciones.
    </p>
    <CodeBlock :code="s.pinia" lang="js" />
    <p>
      La diferencia con un composable normal es que <code>useCarrito()</code> devuelve
      siempre <em>la misma</em> instancia, la llames desde donde la llames. Y aparece en Vue
      DevTools, donde puedes ver y editar su estado en vivo.
    </p>
    <CodeBlock :code="s.piniaUsage" />
    <DemoBox label="Dos componentes, un mismo carrito">
      <StoreDemo />
    </DemoBox>
    <p>
      La demo no usa Pinia, sino un <code>ref</code> declarado fuera del componente, que es la
      misma idea en pequeño. Pinia te añade DevTools, soporte para SSR, plugins y un sitio
      claro donde va cada cosa.
    </p>
    <CallOut type="info">
      <p>
        No todo va al store. Si un dato solo lo usa un componente (un formulario a medio
        rellenar, si un desplegable está abierto), déjalo en un <code>ref</code> local. Y lo
        que viene de una API lo lleva mejor TanStack Query, que es el siguiente tema.
      </p>
    </CallOut>
    <template #note>
      <CallOut>
        <p>
          Pinia es la nevera de un piso compartido. Cualquiera puede abrirla, ver lo que hay y
          meter o sacar cosas, y todos ven el mismo contenido. Lo que solo es tuyo, mejor en tu
          habitación (el estado local del componente).
        </p>
      </CallOut>
    </template>
  </DocTopic>

  <DocTopic id="tanstack-query" title="TanStack Query">
    <p>
      Pedir datos a una API parece fácil hasta que te pones: estado de carga, errores,
      reintentos, no repetir la petición si ya la tienes, refrescar cuando el dato se queda
      viejo… TanStack Query (antes Vue Query) hace todo eso por ti.
    </p>
    <p>
      Le das dos cosas: una <strong>clave</strong> que identifica el dato y una
      <strong>función</strong> que lo pide. A cambio te devuelve el dato y su estado, todo
      reactivo.
    </p>
    <CodeBlock :code="s.queryBasic" />
    <p>La clave es lo importante. Con ella, TanStack Query:</p>
    <ul>
      <li>
        <strong>Guarda en caché</strong> cada respuesta. Si vuelves al usuario 1, lo ves al
        instante.
      </li>
      <li>
        <strong>Comparte</strong> la petición: si diez componentes piden
        <code>['usuario', 1]</code> a la vez, sale una sola.
      </li>
      <li>
        <strong>Refresca en segundo plano</strong> los datos caducados cuando se vuelven a
        usar (un componente nuevo los pide, vuelves a la pestaña…) mientras te sigue
        enseñando el antiguo. Por defecto <code>staleTime</code> vale 0: un dato caduca nada
        más llegar.
      </li>
    </ul>
    <p>
      No confundas <code>isPending</code> (aún no hay ningún dato) con
      <code>isFetching</code> (hay una petición en marcha, aunque ya tengas algo que
      enseñar). Lo primero es para pintar un spinner; lo segundo, como mucho un aviso
      discreto.
    </p>
    <p>
      Para escribir (crear, editar, borrar) se usa <code>useMutation</code>. Después de
      guardar, invalidas las claves afectadas y se vuelven a pedir solas:
    </p>
    <CodeBlock :code="s.queryMutation" />
    <DemoBox label="Una caché de peticiones">
      <QueryDemo />
    </DemoBox>
    <p>
      La demo simula la red y la caché a mano para que veas cuándo se pide y cuándo no. Prueba
      a pedir el usuario 1, luego el 2 y volver al 1, y espera más de 5 segundos antes de
      volver.
    </p>
    <CallOut type="info">
      <p>
        Pinia y TanStack Query no compiten. Pinia guarda el estado <em>de tu app</em>
        (carrito, preferencias, filtros) y TanStack Query, una copia del estado <em>del
        servidor</em>, que no es tuyo y puede cambiar sin que te enteres.
      </p>
    </CallOut>
    <template #note>
      <CallOut>
        <p>
          TanStack Query es ese compañero que apunta las respuestas. Si preguntas lo mismo dos
          veces, te contesta de memoria; si su apunte es de hace rato, te dice lo que sabía y,
          mientras, llama para confirmar. Y si alguien avisa de que algo ha cambiado (una
          mutación), tacha el apunte y vuelve a preguntar.
        </p>
      </CallOut>
    </template>
  </DocTopic>

  <DocTopic id="testing" title="Testing">
    <p>
      Probar un componente es montarlo, interactuar con él como lo haría una persona y
      comprobar lo que ves. <a href="https://vitest.dev" target="_blank" rel="noopener">Vitest</a>
      ejecuta los tests (comparte configuración con Vite) y
      <a href="https://test-utils.vuejs.org" target="_blank" rel="noopener">Vue Test Utils</a>
      monta los componentes. El asistente de <code>npm create vue</code> te lo deja montado si
      se lo pides.
    </p>
    <CodeBlock :code="s.testingInstall" lang="bash" />
    <CodeBlock :code="s.testingConfig" lang="js" />
    <p>
      El contrato de un componente son sus props de entrada y, de salida, el DOM y los eventos
      que emite. Eso es lo que se prueba, no sus variables internas:
    </p>
    <CodeBlock :code="s.testingSnippet" lang="js" />
    <ul>
      <li>
        <code>mount</code> monta el componente de verdad, con sus hijos, y te da un
        <code>wrapper</code>: por ahí buscas elementos, disparas eventos y miras qué ha pasado.
      </li>
      <li>
        <code>trigger()</code> y <code>setValue()</code> devuelven una promesa: hay que
        esperarla, porque el DOM se actualiza en el siguiente tick (lo viste en
        <a href="#next-tick">nextTick y el DOM</a>).
      </li>
      <li>
        <code>emitted()</code> te dice qué eventos ha emitido el componente y con qué
        argumentos.
      </li>
      <li>
        Si el componente pide datos a una API, simula la respuesta y usa
        <code>flushPromises()</code> para esperar a que se resuelva antes de comprobar nada.
      </li>
    </ul>
    <template #note>
      <CallOut>
        <p>
          La prueba de calidad de una fábrica: antes de que el producto salga, alguien lo
          enciende, aprieta los botones y mira si hace lo que dice la caja. No desmonta la
          máquina para ver si las piezas están bien colocadas; le da igual cómo esté hecha por
          dentro.
        </p>
      </CallOut>
    </template>
    <CallOut type="info">
      <p>
        Esta guía no ejecuta tests en el navegador, así que aquí no hay demo. Lo más rápido para
        verlo en acción es el ejemplo de <code>BotonLike</code> del tema de Props y eventos:
        copia el componente a un proyecto y pega el test.
      </p>
    </CallOut>
  </DocTopic>
</template>
