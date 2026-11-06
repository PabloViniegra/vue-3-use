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
      Vue no hace que tu app sea accesible ni lo contrario: pinta el HTML que le pidas. Como
      trabajas con componentes, un botón bien hecho se reutiliza en toda la app, y uno mal
      hecho, también. Lo primero es usar la etiqueta adecuada:
    </p>
    <CodeBlock :code="s.a11yBasics" />
    <DemoBox label="div contra button">
      <FakeButtonDemo />
    </DemoBox>
    <p>
      En una SPA la página cambia sin recargarse, así que el navegador no hace por ti lo que
      haría al cargar una página nueva. Eso te toca a ti:
    </p>
    <ul>
      <li>
        Cuando un <code>v-if</code> quita el elemento que tenía el foco, el foco se pierde: se
        queda en el <code>body</code>, el lector de pantalla no dice nada y, según el
        navegador, quien usa el teclado puede tener que empezar desde arriba. Muévelo tú a un
        sitio lógico, como el elemento siguiente o el título de lo que acaba de aparecer.
      </li>
      <li>
        Un aviso como «Guardado» no llega al lector de pantalla si el texto no está en una
        región con <code>role="status"</code> o <code>aria-live</code>, y esa región tiene que
        estar en el DOM antes de que cambie.
      </li>
      <li>
        Con Vue Router, cambiar de página no mueve el foco ni anuncia nada. Después de cada
        navegación, salvo en la primera carga, lleva el foco al <code>h1</code> de la página
        nueva.
      </li>
    </ul>
    <CodeBlock :code="s.a11yFocus" lang="js" />
    <p>
      La lista de la compra de <a href="#formularios">Eventos y v-model</a> y el formulario de
      <a href="#validacion">Formularios con validación</a> ya lo hacen: al quitar un producto,
      el foco pasa al siguiente y una región <code>role="status"</code> anuncia qué ha pasado; al enviar
      con errores, el foco va al primer campo que falla.
    </p>
    <template #note>
      <CallOut>
        <p>
          El foco es el dedo con el que alguien que usa teclado sigue la página. Si borras la
          línea en la que lo tenía y no le dices por dónde seguir, es como cerrarle el libro: vuelta a
          empezar desde la portada.
        </p>
      </CallOut>
    </template>
    <p>
      Las animaciones también cuentan. A algunas personas el movimiento en pantalla les marea,
      y pueden pedirle al sistema que lo reduzca; desde CSS lo detectas con
      <code>prefers-reduced-motion</code>. Las clases de <code>&lt;Transition&gt;</code> son CSS
      normal, así que dentro de un <code>@media (prefers-reduced-motion: reduce)</code> puedes
      quitar el desplazamiento y dejar solo un fundido corto.
    </p>
    <CallOut type="info">
      <p>
        Para revisarlo, lo más rápido es soltar el ratón y recorrer tu app con
        <kbd>Tab</kbd>, <kbd>Enter</kbd> y <kbd>Esc</kbd>. Después, pásale
        <a href="https://github.com/dequelabs/axe-core" target="_blank" rel="noopener">axe</a>
        o Lighthouse, y añade
        <a href="https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility" target="_blank" rel="noopener">eslint-plugin-vuejs-accessibility</a>
        para que el editor te avise en las plantillas. Ninguna herramienta lo detecta todo, así
        que, si puedes, pruébala también con un lector de pantalla.
      </p>
    </CallOut>
  </DocTopic>

  <DocTopic id="errores-comunes" title="Errores típicos">
    <p>
      Hay fallos que se repiten de un proyecto de Vue a otro. Estos todavía no han salido en
      la guía:
    </p>
    <CodeBlock :code="s.commonMistakes" lang="js" />
    <p>
      Y estos son los que ya han salido, empezando por el síntoma con el que suelen
      aparecer:
    </p>
    <ul>
      <li>
        <strong>La vista no se entera de un cambio.</strong> Lo más probable es que hayas
        desestructurado un <code>reactive</code> o un store, o que lo hayas reasignado entero.
        Usa
        <code>toRefs</code>, <code>storeToRefs</code> o un <code>ref</code>
        (<a href="#reactividad-a-fondo">Reactividad a fondo</a>,
        <a href="#pinia">Pinia</a>).
      </li>
      <li>
        <strong>Un campo se queda con lo que habías escrito en otra fila.</strong> El
        <code>:key</code> del <code>v-for</code> es el índice; usa un id del propio dato
        (<a href="#condicionales-listas">v-if, v-show y v-for</a>). Lo puedes ver en la demo
        de abajo.
      </li>
      <li>
        <strong>Una variable del bucle es <code>undefined</code> en un <code>v-if</code>.</strong>
        El <code>v-if</code> y el <code>v-for</code> están en el mismo elemento, y el
        <code>v-if</code> se evalúa primero. Filtra con un
        <code>computed</code> o usa un <code>&lt;template&gt;</code>.
      </li>
      <li>
        <strong>Mides el DOM y todavía tiene el valor anterior.</strong> Vue aún no lo ha
        repintado: espera con <a href="#next-tick">nextTick</a> o usa <code>flush: 'post'</code>.
      </li>
      <li>
        <strong>Un <code>watch</code> no salta al cambiar una propiedad interna.</strong> Vigila
        esa propiedad con un getter o usa <code>deep</code>
        (<a href="#watchers">watch y watchEffect</a>).
      </li>
      <li>
        <strong>Los eventos se disparan dos veces, o la página va cada vez más lenta.</strong>
        Hay algún listener o intervalo que no se limpia al desmontar el componente
        (<a href="#ciclo-de-vida">Ciclo de vida</a>).
      </li>
      <li>
        <strong>Aparece HTML (o un script) que no esperabas.</strong> Has pasado texto del
        usuario a <code>v-html</code>. Las llaves <code v-pre>{{ }}</code> escapan el texto
        automáticamente; <code>v-html</code>, no (<a href="#plantillas">Plantillas</a>).
      </li>
    </ul>
    <DemoBox label=":key con índice contra id">
      <KeyIndexDemo />
    </DemoBox>
    <template #note>
      <CallOut>
        <p>
          Las taquillas de un gimnasio asignadas por orden de llegada. Si se va la primera
          persona y a todos os bajan un número, tú pasas a la taquilla 1, que todavía tiene
          dentro las cosas de quien se ha ido. Con <code>:key</code> por id, cada uno conserva
          su taquilla, se vaya quien se vaya.
        </p>
      </CallOut>
    </template>
    <CallOut type="info">
      <p>
        Vue avisa en la consola de muchos de estos errores mientras desarrollas, y, si usas
        TypeScript, <code>vue-tsc</code> detecta otros antes de ejecutar nada. Si algo no se
        actualiza y no sabes por qué, abre Vue DevTools y comprueba si el dato ha cambiado de
        verdad: así sabrás si el problema está en el dato o en la vista.
      </p>
    </CallOut>
  </DocTopic>
</template>
