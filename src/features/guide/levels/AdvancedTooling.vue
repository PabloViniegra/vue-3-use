<script setup lang="ts">
import CallOut from '../../../components/ui/CallOut.vue'
import CodeBlock from '../../../components/ui/CodeBlock.vue'
import DemoBox from '../../../components/ui/DemoBox.vue'
import DocTopic from '../../../components/ui/DocTopic.vue'
import * as s from '../content/snippets'
import ClickOutsideDemo from '../demos/ClickOutsideDemo.vue'
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
      Resérvalas para manipulación de DOM de bajo nivel: autofocus, detectar clics fuera,
      tooltips. Si lo que quieres reutilizar es lógica con estado, es un composable; si es
      marcado, es un componente.
    </p>
    <DemoBox label="Una directiva para clics fuera">
      <ClickOutsideDemo />
    </DemoBox>
    <CallOut>
      <p>
        Una directiva es una pegatina con instrucciones que pegas en un elemento: «enfócame al
        aparecer», «ciérrame si pinchan fuera». El elemento sigue siendo el mismo; la pegatina
        solo le añade un comportamiento, y la puedes pegar en cualquier otro.
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
    <CallOut>
      <p>
        Virtualizar una lista es el escaparate de una tienda: no saca el almacén entero a la
        calle, solo lo que cabe en el cristal, y va cambiando el género según pasas por
        delante.
      </p>
    </CallOut>
    <CallOut type="info">
      <p>
        Mide antes de optimizar. La pestaña de rendimiento de Vue DevTools te dice qué
        componentes tardan en renderizar. Optimizar a ojo suele acabar en código más feo y
        exactamente igual de lento.
      </p>
    </CallOut>
  </DocTopic>

  <DocTopic id="typescript" title="TypeScript">
    <p>
      Vue 3 está escrito en TypeScript y se nota. Con <code>lang="ts"</code>, las macros
      aceptan tipos directamente y el editor te avisa si pasas una prop que no toca.
    </p>
    <CodeBlock :code="s.typescript" />
    <p>
      Fíjate en la desestructuración de <code>defineProps</code>: desde Vue 3.5 mantiene la
      reactividad y te deja poner valores por defecto con la sintaxis normal de JavaScript.
      Antes había que usar <code>withDefaults</code>.
    </p>
    <p>Y si un componente debe funcionar con cualquier tipo de dato, hazlo genérico:</p>
    <CodeBlock :code="s.genericComponent" />
    <p>
      Para comprobar tipos en los <code>.vue</code> usa <code>vue-tsc</code> (el
      <code>npm run build</code> de esta plantilla ya lo ejecuta) y la extensión oficial de
      Vue para tu editor.
    </p>
    <CallOut>
      <p>
        TypeScript es el corrector del móvil, pero para tu código: te subraya el error
        mientras escribes, no cuando el mensaje ya está enviado (o el código, en producción).
      </p>
    </CallOut>
  </DocTopic>
</template>
