<script setup lang="ts">
import CallOut from '../../../components/ui/CallOut.vue'
import CodeBlock from '../../../components/ui/CodeBlock.vue'
import DemoBox from '../../../components/ui/DemoBox.vue'
import DocTopic from '../../../components/ui/DocTopic.vue'
import * as s from '../content/snippets'
import DebounceDemo from '../demos/DebounceDemo.vue'
import NextTickDemo from '../demos/NextTickDemo.vue'
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
        <strong>Reasignar un <code>reactive</code></strong> tampoco funciona: la variable
        apunta a otro objeto, pero eso no avisa a nadie. No se repinta nada y quien guardó el
        viejo (un <code>watch</code>, un <code>provide</code>) se queda con él. Es el motivo por el que en
        <a href="#reactividad">ref y reactive</a> se recomienda <code>ref</code>, que se
        reasigna sin problema con <code>.value</code>.
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
        y justo después mides el DOM, verás el valor antiguo. Es el tema siguiente.
      </li>
    </ul>
  </DocTopic>

  <DocTopic id="next-tick" title="nextTick y el DOM">
    <p>
      Cuando cambias un dato, Vue no repinta al instante. Apunta que el componente tiene
      cambios pendientes y lo repinta <strong>una sola vez</strong> en el siguiente tick, aunque
      hayas tocado cinco datos en la misma función. Por eso es rápido. La contrapartida: justo
      después de cambiar un dato, el DOM todavía enseña el valor de antes.
    </p>
    <CodeBlock :code="s.nextTickSnippet" />
    <p>
      <code>nextTick()</code> devuelve una promesa que se resuelve cuando Vue ya ha aplicado
      los cambios pendientes. También acepta un callback si prefieres no usar
      <code>await</code>.
    </p>
    <DemoBox label="nextTick">
      <NextTickDemo />
    </DemoBox>
    <template #note>
      <CallOut>
        <p>
          Corregir un documento antes de imprimirlo. Arreglas cinco erratas, pero la impresora
          saca una sola copia cuando terminas. Si coges la hoja justo después de corregir,
          todavía tiene la errata. <code>nextTick</code> es esperar a que salga la copia.
        </p>
      </CallOut>
    </template>
    <p>
      Antes de usarlo, pregúntate si lo que quieres es reaccionar a un cambio y tocar el DOM ya
      actualizado. Para eso, un watcher con <code>flush: 'post'</code> es más seguro: no te
      puedes olvidar de esperar. Tienes tres momentos:
    </p>
    <ul>
      <li><strong><code>'pre'</code></strong> (por defecto): antes de repintar el componente.</li>
      <li><strong><code>'post'</code></strong>: después, con el DOM ya actualizado.</li>
      <li>
        <strong><code>'sync'</code></strong>: al instante, en cada cambio. Casi nunca es buena
        idea: se ejecuta tantas veces como cambios hagas.
      </li>
    </ul>
    <CodeBlock :code="s.flushSnippet" lang="js" />
    <CallOut type="info">
      <p>
        En los tests pasa lo mismo: tras cambiar algo hay que esperar al repintado antes de
        comprobar el DOM. <code>trigger()</code> y <code>setValue()</code> de Vue Test Utils ya
        devuelven esa promesa. Lo verás en el tema de Testing.
      </p>
    </CallOut>
  </DocTopic>

  <DocTopic id="utilidades-reactividad" title="Utilidades de reactividad">
    <p>
      Con <code>ref</code>, <code>computed</code> y <code>watch</code> cubres casi todo. Para
      el resto, Vue trae herramientas más finas. Las usarás poco; échales un vistazo para saber
      que están. Las tienes comentadas en el código:
    </p>
    <CodeBlock :code="s.reactivityTools" lang="js" />
    <p>
      La más curiosa es <code>customRef</code>: un ref cuyo comportamiento al leer y escribir
      decides tú. Con <code>track()</code> avisas de que alguien lo ha leído y con
      <code>trigger()</code> de que ha cambiado. Es la forma más corta de hacer un ref con
      retraso (<em>debounce</em>):
    </p>
    <CodeBlock :code="s.customRefSnippet" lang="js" />
    <DemoBox label="customRef con retraso">
      <DebounceDemo />
    </DemoBox>
    <p>
      La demo usa <code>@input</code> y no <code>v-model</code> a propósito: mientras el ref
      espera, sigue devolviendo el valor viejo, y un repintado cualquiera con
      <code>v-model</code> se lo devolvería al campo y se comería lo que estás escribiendo.
    </p>
    <template #note>
      <CallOut>
        <p>
          Un ref normal es un buzón: lo que echas está dentro. Con <code>customRef</code> el
          buzón lo montas tú. Puedes decidir, por ejemplo, que las cartas no caigan hasta que
          lleve un rato sin entrar ninguna.
        </p>
      </CallOut>
    </template>
  </DocTopic>
</template>
