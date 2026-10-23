<script setup lang="ts">
import CallOut from '../../../components/ui/CallOut.vue'
import CodeBlock from '../../../components/ui/CodeBlock.vue'
import DemoBox from '../../../components/ui/DemoBox.vue'
import DocTopic from '../../../components/ui/DocTopic.vue'
import * as s from '../content/snippets'
import CartDemo from '../demos/CartDemo.vue'
import ClassStyleDemo from '../demos/ClassStyleDemo.vue'
import CounterDemo from '../demos/CounterDemo.vue'
import ShoppingListDemo from '../demos/ShoppingListDemo.vue'
import VisibilityDemo from '../demos/VisibilityDemo.vue'
</script>

<template>
  <DocTopic id="reactividad" title="ref y reactive">
    <p>
      Una variable normal de JavaScript cambia y la pantalla ni se entera. Para que Vue la
      vigile, envuélvela:
    </p>
    <ul>
      <li>
        <code>ref()</code> vale para cualquier cosa: números, textos, arrays, objetos. En el
        script lees y escribes con <code>.value</code>.
      </li>
      <li>
        <code>reactive()</code> solo vale para objetos (arrays, <code>Map</code> y
        <code>Set</code> incluidos), y se usa sin
        <code>.value</code>.
      </li>
    </ul>
    <CodeBlock :code="s.reactivity" />
    <DemoBox label="ref y reactive">
      <CounterDemo />
    </DemoBox>
    <template #note>
      <CallOut>
        <p>
          Un <code>ref</code> es una caja con etiqueta: para ver o cambiar lo de dentro abres la
          caja, y eso es el <code>.value</code>. Un <code>reactive</code> es una mochila: metes la
          mano directamente en cada bolsillo, pero si sacas las cosas y te las llevas sueltas,
          Vue deja de enterarse de lo que les pasa.
        </p>
      </CallOut>
    </template>
    <CallOut type="info" title="¿Cuál uso?">
      <p>
        La documentación oficial recomienda <code>ref</code> por defecto. Funciona con todo,
        se puede reasignar entera y el <code>.value</code> te recuerda en todo momento que
        esa variable es reactiva.
      </p>
    </CallOut>
  </DocTopic>

  <DocTopic id="computed" title="computed">
    <p>
      Un <code>computed</code> es un valor que se calcula a partir de otros. Vue apunta de qué
      datos depende y solo lo recalcula cuando alguno cambia. Mientras tanto, devuelve el
      resultado guardado.
    </p>
    <CodeBlock :code="s.computedSnippet" lang="js" />
    <DemoBox label="computed">
      <CartDemo />
    </DemoBox>
    <template #note>
      <CallOut>
        <p>
          Es la caja de la cafetería. Nadie suma a mano cada vez que pides el total: la caja
          ya lo tiene, y solo lo rehace cuando pides otro café.
        </p>
      </CallOut>
    </template>
    <p>
      ¿Y por qué no una función normal? Una función en la plantilla se ejecuta en cada
      render, haya cambiado algo o no. El <code>computed</code> se ahorra el trabajo. Regla
      práctica: si es un valor derivado y no tiene efectos secundarios, es un
      <code>computed</code>.
    </p>
  </DocTopic>

  <DocTopic id="condicionales-listas" title="v-if, v-show y v-for">
    <p>
      Para mostrar u ocultar tienes dos herramientas que parecen iguales y no lo son.
      <code>v-if</code> crea o destruye el elemento. <code>v-show</code> lo deja en el DOM y
      cambia su <code>display</code>.
    </p>
    <CodeBlock :code="s.conditionals" />
    <DemoBox label="v-if contra v-show">
      <VisibilityDemo />
    </DemoBox>
    <template #note>
      <CallOut>
        <p>
          <code>v-show</code> es bajar la persiana: la ventana sigue ahí y subirla es
          instantáneo. <code>v-if</code> es tapiar la ventana y volver a abrir el hueco cuando
          la quieres. Para algo que se alterna a menudo (un menú, una pestaña), persiana. Para
          algo que casi nunca se ve (un panel de admin), tapia.
        </p>
      </CallOut>
    </template>
    <p>
      <code>v-for</code> repite un elemento por cada item. El <code>:key</code> no es
      decoración: le dice a Vue qué elemento es cuál cuando la lista cambia de orden o se
      borra algo. Usa un id estable, nunca el índice si la lista puede reordenarse.
    </p>
    <CallOut type="warning">
      <p>
        No pongas <code>v-if</code> y <code>v-for</code> en el mismo elemento.
        <code>v-if</code> se evalúa primero y no tiene acceso a la variable del bucle. Filtra
        la lista con un <code>computed</code> o envuelve en un <code>&lt;template&gt;</code>.
      </p>
    </CallOut>
  </DocTopic>

  <DocTopic id="clases-estilos" title="Clases y estilos dinámicos">
    <p>
      Cambiar el aspecto de algo según el estado es de lo más normal: un botón activo, un campo
      con error, una barra de progreso. Sin tocar el DOM a mano ni concatenar cadenas, enlazas
      <code>class</code> y <code>style</code> con <code>:class</code> y <code>:style</code> y
      Vue los mantiene al día.
    </p>
    <CodeBlock :code="s.classStyle" />
    <ul>
      <li>
        Con un <strong>objeto</strong>, la clave es la clase y el valor decide si está puesta.
      </li>
      <li>
        Con un <strong>array</strong> mezclas clases fijas y condicionales. Y puedes anidar
        objetos dentro.
      </li>
      <li>
        <code>:class</code> se suma al <code>class</code> normal, no lo pisa.
        <code>:style</code> recibe un objeto con las propiedades de CSS.
      </li>
    </ul>
    <DemoBox label=":class y :style">
      <ClassStyleDemo />
    </DemoBox>
    <template #note>
      <CallOut>
        <p>
          El cuadro de mandos de un coche. El coche no se repinta: según el estado se enciende el
          piloto del aceite o el del cinturón. <code>:class</code> es encender y apagar pilotos;
          <code>:style</code> es la aguja del depósito, que puede quedarse en cualquier punto
          entre lleno y vacío.
        </p>
      </CallOut>
    </template>
    <CallOut type="warning">
      <p>
        No montes las clases concatenando cadenas como
        <code v-pre>:class="'boton ' + (activo ? 'activo' : '')"</code>: funciona hasta el día
        que se te olvida un espacio. Y reserva <code>:style</code> para valores que solo se
        conocen en ejecución (un ancho en porcentaje, unas coordenadas). Lo demás es una clase.
      </p>
    </CallOut>
    <p>
      Desde el propio CSS también puedes leer el estado. Con <code>v-bind()</code> usas una
      variable del script dentro de la hoja de estilos y se actualiza sola. Y con
      <code>&lt;style module&gt;</code> las clases se renombran solas para que no choquen con
      otras y las lees desde <code>$style</code>. Ojo: un selector de etiqueta como
      <code>h1</code> sigue siendo global, así que ahí usa siempre clases:
    </p>
    <CodeBlock :code="s.classStyleCss" />
  </DocTopic>

  <DocTopic id="formularios" title="Eventos y v-model">
    <p>
      <code>v-model</code> conecta un input con una variable en los dos sentidos: escribes en
      el campo y la variable cambia; cambias la variable y el campo se actualiza. Funciona
      con inputs de texto, checkboxes, radios, selects y textareas.
    </p>
    <CodeBlock :code="s.forms" />
    <DemoBox label="v-model y v-for">
      <ShoppingListDemo />
    </DemoBox>
    <template #note>
      <CallOut>
        <p>
          El termostato del salón y su app. Giras la rueda de la pared y la app marca 21 °C; subes
          la temperatura desde la app y la rueda gira sola. <code>v-model</code> mantiene igual
          de sincronizados el campo y la variable, en los dos sentidos.
        </p>
      </CallOut>
    </template>
    <p>
      Los eventos los escuchas con <code>@</code>, como viste en Plantillas. Si pones solo el
      nombre de la función, Vue le pasa el evento nativo; si la llamas con argumentos, el
      evento lo tienes en <code>$event</code>:
    </p>
    <CodeBlock :code="s.events" />
    <p>Los <strong>modificadores</strong> te ahorran código repetitivo:</p>
    <ul>
      <li><code>@submit.prevent</code>: evita que el formulario recargue la página.</li>
      <li><code>@keyup.enter</code>: solo reacciona a la tecla Enter.</li>
      <li><code>v-model.trim</code>: quita espacios al principio y al final.</li>
      <li><code>v-model.number</code>: convierte lo escrito a número.</li>
      <li><code>v-model.lazy</code>: actualiza al salir del campo, no en cada tecla.</li>
    </ul>
  </DocTopic>
</template>
