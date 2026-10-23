<script setup lang="ts">
import CallOut from '../../../components/ui/CallOut.vue'
import CodeBlock from '../../../components/ui/CodeBlock.vue'
import DemoBox from '../../../components/ui/DemoBox.vue'
import DocTopic from '../../../components/ui/DocTopic.vue'
import * as s from '../content/snippets'
import ClickOutsideDemo from '../demos/ClickOutsideDemo.vue'
import ErrorsDemo from '../demos/ErrorsDemo.vue'
</script>

<template>
  <DocTopic id="directivas" title="Directivas propias">
    <p>
      Igual que <code>v-if</code> o <code>v-model</code>, puedes crear las tuyas. Son objetos
      con hooks parecidos a los del ciclo de vida (<code>mounted</code>,
      <code>updated</code>, <code>unmounted</code>) que reciben el elemento del DOM.
    </p>
    <CodeBlock :code="s.directive" />
    <p>
      Resérvalas para manipulación del DOM de bajo nivel: autofocus, detectar clics fuera,
      tooltips. Si lo que quieres reutilizar es lógica con estado, es un composable; si es
      marcado, es un componente.
    </p>
    <DemoBox label="Una directiva para clics fuera">
      <ClickOutsideDemo />
    </DemoBox>
    <template #note>
      <CallOut>
        <p>
          Una directiva es una pegatina con instrucciones que pegas en un elemento: «enfócame al
          aparecer», «ciérrame si pinchan fuera». El elemento sigue siendo el mismo; la pegatina
          solo le añade un comportamiento, y la puedes pegar en cualquier otro.
        </p>
      </CallOut>
    </template>
  </DocTopic>

  <DocTopic id="plugins-errores" title="Plugins y gestión de errores">
    <p>
      En <a href="#ecosistema">Ecosistema</a> verás <code>app.use(router)</code> y compañía. Un
      plugin es un objeto con un método <code>install(app)</code> (o una función a secas) que
      recibe la aplicación y la configura una sola vez: puede proveer valores con <code>app.provide</code>, registrar
      componentes o directivas globales y tocar <code>app.config</code>.
    </p>
    <CodeBlock :code="s.pluginSnippet" lang="js" />
    <p>
      Existe <code>app.config.globalProperties</code>, el equivalente de
      <code>Vue.prototype</code> en Vue 2, pero fuera de código heredado casi siempre es mejor
      un <code>provide</code> o un composable: en <code>&lt;script setup&gt;</code> no está a
      mano, tiparlo pide ampliar <code>ComponentCustomProperties</code> y nadie sabe de dónde
      sale lo que aparece en <code>this</code>.
    </p>
    <p>
      Los errores tienen su propio recorrido. Cuando algo lanza un error dentro de Vue (en el render, en
      un watcher, en un manejador de evento, en un hook), Vue lo atrapa y lo sube por los
      padres. Cualquier componente puede pararlo con <code>onErrorCaptured</code>; si
      nadie lo hace, llega a <code>app.config.errorHandler</code>; y si tampoco hay, a la
      consola.
    </p>
    <CodeBlock :code="s.errorHandling" />
    <DemoBox label="onErrorCaptured">
      <ErrorsDemo />
    </DemoBox>
    <template #note>
      <CallOut>
        <p>
          El cuadro eléctrico de un edificio. El plugin es la instalación: se hace una vez y deja
          enchufes y luz en todos los pisos. Si salta el automático de un piso
          (<code>onErrorCaptured</code>), los demás siguen con luz; y si salta algo que nadie
          esperaba, está el general de la entrada (<code>errorHandler</code>).
        </p>
      </CallOut>
    </template>
    <CallOut type="warning">
      <p>
        Vue solo conoce los errores que pasan por su código. Un fallo dentro de un
        <code>setTimeout</code> o de una promesa que nadie espera no llega a estos manejadores:
        para esos están los eventos <code>error</code> y <code>unhandledrejection</code> de
        <code>window</code>.
      </p>
    </CallOut>
  </DocTopic>

  <DocTopic id="rendimiento" title="Rendimiento">
    <p>
      Vue ya es rápido sin que hagas nada: el compilador marca qué partes de la plantilla son
      estáticas y el sistema reactivo solo repinta lo que depende de lo que cambió. Aun así,
      hay palancas para cuando las cosas crecen.
    </p>
    <CodeBlock :code="s.performance" />
    <ul>
      <li>
        <strong><code>v-once</code></strong> pinta un bloque una vez y no lo vuelve a
        actualizar, aunque cambien los datos que usa. Para lo que sabes que no cambia.
      </li>
      <li>
        <strong><code>v-memo</code></strong> repinta un bloque solo si cambia alguno de los
        valores del array que le pasas. Va bien en las filas de listas largas. La trampa: si
        olvidas una dependencia en el array, la fila se queda desfasada y nadie te avisa.
        Úsalo con medidas en la mano.
      </li>
      <li>
        <strong>Props estables.</strong> Si a cada hijo de una lista le pasas un valor que
        cambia siempre, se repintan todos. Pásale un booleano ya calculado
        (<code>:activo="item.id === activoId"</code>) en lugar del id activo.
      </li>
      <li>
        <strong><code>computed</code> antes que métodos</strong> en la plantilla, por la
        caché.
      </li>
      <li>
        <strong><code>shallowRef</code></strong> para datos grandes que llegan de una API y no
        se editan por dentro.
      </li>
      <li>
        <strong>Listas enormes:</strong> virtualízalas y pinta solo lo visible. Mil filas en
        el DOM pesan, diez no.
      </li>
      <li>
        <strong>Carga perezosa</strong> de rutas y componentes pesados con
        <code>import()</code>.
      </li>
    </ul>
    <template #note>
      <CallOut>
        <p>
          Virtualizar una lista es el escaparate de una tienda: no saca el almacén entero a la
          calle, solo lo que cabe en el cristal, y va cambiando el género según pasas por
          delante.
        </p>
      </CallOut>
    </template>
    <CallOut type="info">
      <p>
        Mide antes de optimizar. La pestaña de rendimiento de Vue DevTools te dice qué
        componentes tardan en renderizar. Optimizar sin medir suele acabar en código más
        complicado y igual de lento.
      </p>
    </CallOut>
  </DocTopic>

  <DocTopic id="typescript" title="TypeScript">
    <p>
      Con <code>lang="ts"</code>, las macros aceptan tipos directamente y el editor te avisa
      si pasas una prop que no toca.
    </p>
    <CodeBlock :code="s.typescript" />
    <p>
      La desestructuración de <code>defineProps</code>, desde Vue 3.5, mantiene la
      reactividad y te deja poner valores por defecto con la sintaxis normal de JavaScript.
      Si no desestructuras, <code>withDefaults</code> sigue siendo válido. Ojo con una
      trampa: si pasas una prop desestructurada (<code>titulo</code>) tal cual a
      <code>watch</code>, el compilador da error. Si se la pasas a un composable no protesta,
      pero le llega el valor de ese momento y no algo reactivo. En los dos casos, envuélvela
      en un getter: <code>() =&gt; titulo</code>.
    </p>
    <p>Y si un componente debe funcionar con cualquier tipo de dato, hazlo genérico:</p>
    <CodeBlock :code="s.genericComponent" />
    <p>
      Los slots y las inyecciones también pueden tener contrato: <code>defineSlots</code> tipa
      qué props recibe cada slot, y <code>InjectionKey</code> liga una clave con el tipo de lo
      que se inyecta, así <code>inject</code> deja de devolver <code>unknown</code>.
    </p>
    <CodeBlock :code="s.typedContracts" />
    <p>
      Para comprobar tipos en los <code>.vue</code> usa <code>vue-tsc</code> (el
      <code>npm run build</code> ya lo ejecuta si elegiste TypeScript al crear el proyecto) y
      la extensión oficial de Vue para tu editor.
    </p>
    <template #note>
      <CallOut>
        <p>
          TypeScript es el corrector del móvil, pero para tu código: te subraya el error
          mientras escribes, no cuando el mensaje ya está enviado (o el código, en producción).
        </p>
      </CallOut>
    </template>
  </DocTopic>
</template>
