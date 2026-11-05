<script setup lang="ts">
import CallOut from '../../../components/ui/CallOut.vue'
import CodeBlock from '../../../components/ui/CodeBlock.vue'
import DemoBox from '../../../components/ui/DemoBox.vue'
import DocTopic from '../../../components/ui/DocTopic.vue'
import * as s from '../content/snippets'
import FakeButtonDemo from '../demos/FakeButtonDemo.vue'
import KeyIndexDemo from '../demos/KeyIndexDemo.vue'
</script>

<template>
  <DocTopic id="accesibilidad" title="Accesibilidad">
    <p>
      Vue no hace tu app accesible ni inaccesible: pinta el HTML que tú le pidas. La buena
      noticia es que, con componentes, lo haces bien una vez (un botón, un campo, un modal) y
      lo reutilizas en toda la app. La mala, que un error también se reutiliza. Casi todo
      empieza por usar la etiqueta que toca:
    </p>
    <CodeBlock :code="s.a11yBasics" />
    <DemoBox label="div contra button">
      <FakeButtonDemo />
    </DemoBox>
    <p>
      Lo propio de una SPA es que la página cambia sin recargarse, y el navegador no se entera.
      Ahí te toca a ti:
    </p>
    <ul>
      <li>
        <strong>El foco.</strong> Cuando un <code>v-if</code> quita el elemento que tenía el
        foco, el foco se pierde: se queda en el <code>body</code>, el lector de pantalla no
        dice nada y, según el navegador, quien navega con teclado puede tener que volver
        desde arriba. Llévalo a un sitio con sentido: el siguiente elemento, el campo de
        origen o el título de lo que acaba de aparecer.
      </li>
      <li>
        <strong>Los avisos.</strong> «Guardado», «3 resultados», «Se ha borrado»… Un lector
        de pantalla no ve que el texto ha cambiado si no está en una región con
        <code>role="status"</code> o <code>aria-live</code>, y esa región tiene que estar en el
        DOM antes de que cambie.
      </li>
      <li>
        <strong>Las rutas.</strong> Con Vue Router, pasar de página no mueve el foco ni
        anuncia nada. Lleva el foco al <code>h1</code> de la página nueva después de cada
        navegación, salvo en la primera carga.
      </li>
    </ul>
    <CodeBlock :code="s.a11yFocus" lang="js" />
    <p>
      La lista de la compra de <a href="#formularios">Eventos y v-model</a> y el formulario de
      <a href="#validacion">Formularios con validación</a> ya lo hacen: al quitar un producto,
      el foco pasa al siguiente y un <code>role="status"</code> dice qué ha pasado; al enviar
      con errores, el foco va al primer campo que falla.
    </p>
    <template #note>
      <CallOut>
        <p>
          El foco es el dedo con el que alguien que usa teclado sigue la página. Si borras la
          línea donde lo tenía y no le dices dónde seguir, es como cerrarle el libro: vuelta a
          empezar desde la portada.
        </p>
      </CallOut>
    </template>
    <p>
      Las animaciones también cuentan. A algunas personas el movimiento les marea, y el
      sistema lo dice con <code>prefers-reduced-motion</code>. Las clases de
      <code>&lt;Transition&gt;</code> son CSS normal, así que dentro de un
      <code>@media (prefers-reduced-motion: reduce)</code> puedes quitar el desplazamiento y
      dejar un fundido corto.
    </p>
    <CallOut type="info">
      <p>
        Para revisarlo, lo más rápido es dejar el ratón y recorrer tu app con
        <kbd>Tab</kbd>, <kbd>Enter</kbd> y <kbd>Esc</kbd>. Después, una pasada con
        <a href="https://github.com/dequelabs/axe-core" target="_blank" rel="noopener">axe</a>
        o con Lighthouse, y
        <a href="https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility" target="_blank" rel="noopener">eslint-plugin-vuejs-accessibility</a>
        para que el editor te avise en las plantillas. Ninguna herramienta lo detecta todo:
        si puedes, prueba también con un lector de pantalla.
      </p>
    </CallOut>
  </DocTopic>

  <DocTopic id="errores-comunes" title="Errores típicos">
    <p>
      Hay fallos que casi todo el mundo comete alguna vez con Vue. Ninguno es raro: salen de
      cómo funciona la reactividad, y casi todos dan síntomas reconocibles. Estos no los has
      visto todavía:
    </p>
    <CodeBlock :code="s.commonMistakes" lang="js" />
    <p>
      Y este es el mapa de los que ya salieron en la guía, por el síntoma con el que suelen
      aparecer:
    </p>
    <ul>
      <li>
        <strong>La vista no se entera de un cambio.</strong> Has desestructurado un
        <code>reactive</code> o un store, o lo has reasignado entero. Usa
        <code>toRefs</code>, <code>storeToRefs</code> o un <code>ref</code>
        (<a href="#reactividad-a-fondo">Reactividad a fondo</a>,
        <a href="#pinia">Pinia</a>).
      </li>
      <li>
        <strong>Un campo se queda con lo que escribiste en otra fila.</strong> El
        <code>:key</code> del <code>v-for</code> es el índice. Usa un id del dato
        (<a href="#condicionales-listas">v-if, v-show y v-for</a>). Lo tienes en la demo de
        abajo.
      </li>
      <li>
        <strong>Una variable del bucle es <code>undefined</code> en un <code>v-if</code>.</strong>
        Están en el mismo elemento y <code>v-if</code> va primero. Filtra con un
        <code>computed</code> o usa un <code>&lt;template&gt;</code>.
      </li>
      <li>
        <strong>Mides el DOM y tiene el valor de antes.</strong> Aún no se ha repintado.
        Espera con <a href="#next-tick">nextTick</a> o usa <code>flush: 'post'</code>.
      </li>
      <li>
        <strong>Un <code>watch</code> no salta al cambiar algo de dentro.</strong> Vigila un
        getter de esa propiedad o usa <code>deep</code>
        (<a href="#watchers">watch y watchEffect</a>).
      </li>
      <li>
        <strong>Los eventos se disparan dos veces, o la página va cada vez más lenta.</strong>
        Algún listener o intervalo no se limpia al desmontar
        (<a href="#ciclo-de-vida">Ciclo de vida</a>).
      </li>
      <li>
        <strong>Aparece HTML (o un script) que no esperabas.</strong> Has pasado texto del
        usuario a <code>v-html</code>. Las llaves <code v-pre>{{ }}</code> escapan el texto solas;
        <code>v-html</code> no (<a href="#plantillas">Plantillas</a>).
      </li>
    </ul>
    <DemoBox label=":key con índice contra id">
      <KeyIndexDemo />
    </DemoBox>
    <template #note>
      <CallOut>
        <p>
          Las taquillas de un gimnasio repartidas por orden de llegada. Si se va el primero y
          todos bajáis un número, tu mochila se queda en la taquilla 1, que ahora es de otra
          persona. Con <code>:key</code> por id, cada uno tiene la suya, se vaya quien se vaya.
        </p>
      </CallOut>
    </template>
    <CallOut type="info">
      <p>
        Muchos de estos avisos ya los da Vue en la consola mientras desarrollas, y
        <code>vue-tsc</code> con TypeScript caza otros tantos antes de ejecutar nada. Si algo
        no se actualiza y no entiendes por qué, abre Vue DevTools y mira si el dato ha cambiado
        de verdad: te dirá si el problema está en el dato o en la vista.
      </p>
    </CallOut>
  </DocTopic>
</template>
