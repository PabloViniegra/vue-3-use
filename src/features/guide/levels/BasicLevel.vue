<script setup lang="ts">
import CallOut from '../../../components/ui/CallOut.vue'
import CodeBlock from '../../../components/ui/CodeBlock.vue'
import DemoBox from '../../../components/ui/DemoBox.vue'
import DocTopic from '../../../components/ui/DocTopic.vue'
import * as s from '../content/snippets'
import CartDemo from '../demos/CartDemo.vue'
import CounterDemo from '../demos/CounterDemo.vue'
import ShoppingListDemo from '../demos/ShoppingListDemo.vue'
import VisibilityDemo from '../demos/VisibilityDemo.vue'
</script>

<template>
  <DocTopic id="que-es" title="Qué es Vue">
    <p>
      Vue es un framework de JavaScript para construir interfaces. Tú le dices
      <em>qué</em> quieres ver en función de tus datos y él se encarga de
      <em>cómo</em> actualizar la página cuando esos datos cambian. Nada de buscar un
      elemento con <code>querySelector</code> y cambiarle el texto a mano.
    </p>
    <p>
      Se llama a sí mismo <strong>progresivo</strong> porque puedes usarlo para un widget
      suelto dentro de una web que ya existe o para una aplicación entera con rutas, estado
      global y renderizado en servidor. Empiezas pequeño y vas añadiendo piezas cuando las
      necesitas.
    </p>
    <CallOut>
      <p>
        Piensa en una hoja de cálculo. Escribes en una celda <code>=A1*2</code> y te olvidas:
        cada vez que cambias A1, la fórmula se recalcula sola. Vue hace eso mismo, pero con
        tu HTML. Esa idea se llama <strong>reactividad</strong> y es el corazón de todo lo
        que viene después.
      </p>
    </CallOut>
  </DocTopic>

  <DocTopic id="empezar" title="Tu primer proyecto">
    <p>
      Necesitas Node.js instalado. El asistente oficial te pregunta si quieres TypeScript,
      router, Pinia, tests… Para empezar, puedes decir que no a todo.
    </p>
    <CodeBlock :code="s.createProject" lang="bash" />
    <p>
      Lo que te genera usa <a href="https://vite.dev" target="_blank" rel="noopener">Vite</a>
      como herramienta de desarrollo (esta misma página está hecha así). Cada componente vive
      en un archivo <code>.vue</code>, un <em>Single File Component</em>, con tres bloques:
      la lógica, la plantilla y los estilos.
    </p>
    <CodeBlock :code="s.firstSfc" />
    <p>
      <code>scoped</code> hace que ese CSS solo afecte a este componente. Ese
      <code>h1</code> verde no se va a colar en el resto de la app.
    </p>
    <CallOut>
      <p>
        Un <code>.vue</code> es una ficha de receta: los ingredientes (la lógica), cómo se
        monta el plato (la plantilla) y cómo se emplata (los estilos) en la misma hoja. Para
        cambiar la tortilla no tienes que buscar en tres cuadernos distintos.
      </p>
    </CallOut>
    <CallOut type="info" title="Composition API vs Options API">
      <p>
        Esta guía usa <code>&lt;script setup&gt;</code>, la <strong>Composition API</strong>,
        que es lo recomendado para proyectos nuevos. En código más antiguo verás la
        <strong>Options API</strong>, con <code>data()</code> y <code>methods</code>. Las dos
        son Vue 3 y las dos funcionan, así que no te asustes si te la encuentras.
      </p>
    </CallOut>
    <CodeBlock :code="s.optionsApi" lang="js" />
  </DocTopic>

  <DocTopic id="plantillas" title="Plantillas">
    <p>
      La plantilla es HTML con superpoderes. Todo lo que declares en
      <code>&lt;script setup&gt;</code> está disponible aquí directamente. Hay tres cosas que
      vas a escribir el 90 % del tiempo: mostrar datos, enlazar atributos y escuchar eventos.
    </p>
    <CodeBlock :code="s.templateSyntax" />
    <p>
      Todo lo que empieza por <code>v-</code> es una <strong>directiva</strong>: un atributo
      especial que Vue interpreta. Los atajos <code>:</code> y <code>@</code> son tan
      habituales que casi nadie escribe <code>v-bind</code> ni <code>v-on</code> completos.
    </p>
    <CallOut>
      <p>
        La pizarra del menú del día con un hueco para el plato. Tú solo dices qué plato toca
        hoy; quien atiende la barra borra el hueco y escribe el nuevo. La plantilla es la
        pizarra, las llaves son el hueco y Vue es quien la actualiza.
      </p>
    </CallOut>
    <CallOut type="warning">
      <p>
        Las llaves no sirven para meter HTML. Si una variable contiene
        <code>&lt;b&gt;hola&lt;/b&gt;</code>, <code v-pre>{{ }}</code> pinta las etiquetas tal
        cual, y es a propósito: así nadie te cuela un script. Existe
        <code>v-html</code>, pero úsalo solo con contenido que controlas tú.
      </p>
    </CallOut>
  </DocTopic>

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
        <code>reactive()</code> solo vale para objetos y arrays, y se usa sin
        <code>.value</code>.
      </li>
    </ul>
    <CodeBlock :code="s.reactivity" />
    <DemoBox label="ref y reactive">
      <CounterDemo />
    </DemoBox>
    <CallOut>
      <p>
        Un <code>ref</code> es una caja con etiqueta: para ver o cambiar lo de dentro abres la
        caja, y eso es el <code>.value</code>. Un <code>reactive</code> es una mochila: metes la
        mano directamente en cada bolsillo, pero si sacas las cosas y te las llevas sueltas,
        Vue deja de enterarse de lo que les pasa.
      </p>
    </CallOut>
    <CallOut type="info" title="¿Cuál uso?">
      <p>
        La documentación oficial recomienda <code>ref</code> por defecto. Funciona con todo,
        se puede reasignar entera y el <code>.value</code> te recuerda en todo momento que
        esa variable es reactiva. Te acostumbras en dos días.
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
    <CallOut>
      <p>
        Es el ticket de la cafetería. Nadie suma a mano cada vez que te pido el total: el
        datáfono ya lo tiene, y solo lo rehace cuando pides otro café.
      </p>
    </CallOut>
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
    <CallOut>
      <p>
        <code>v-show</code> es bajar la persiana: la ventana sigue ahí y subirla es
        instantáneo. <code>v-if</code> es tapiar la ventana y volver a abrir el hueco cuando
        la quieres. Para algo que se alterna a menudo (un menú, una pestaña), persiana. Para
        algo que casi nunca se ve (un panel de admin), tapia.
      </p>
    </CallOut>
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
    <CallOut>
      <p>
        La lista de la compra compartida en el móvil. Si apuntas leche, aparece en el móvil de
        quien vive contigo; si la tacha, desaparece del tuyo. <code>v-model</code> mantiene
        igual de sincronizados el campo y la variable, en los dos sentidos.
      </p>
    </CallOut>
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
