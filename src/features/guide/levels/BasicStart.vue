<script setup lang="ts">
import CallOut from '../../../components/ui/CallOut.vue'
import CodeBlock from '../../../components/ui/CodeBlock.vue'
import DocTopic from '../../../components/ui/DocTopic.vue'
import * as s from '../content/snippets'
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
    <template #note>
      <CallOut>
        <p>
          Piensa en una hoja de cálculo. Escribes en una celda <code>=A1*2</code> y te olvidas:
          cada vez que cambias A1, la fórmula se recalcula sola. Vue hace eso mismo, pero con
          tu HTML. Esa idea se llama <strong>reactividad</strong> y es el corazón de todo lo
          que viene después.
        </p>
      </CallOut>
    </template>
  </DocTopic>

  <DocTopic id="empezar" title="Tu primer proyecto">
    <p>
      Necesitas Node.js instalado (Vite 8 pide la 20.19 o superior, o la 22.12 o superior). El asistente oficial te pregunta si quieres TypeScript,
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
    <template #note>
      <CallOut>
        <p>
          Un <code>.vue</code> es una ficha de receta: los ingredientes (la lógica), cómo se
          monta el plato (la plantilla) y cómo se emplata (los estilos) en la misma hoja. Para
          cambiar la tortilla no tienes que buscar en tres cuadernos distintos.
        </p>
      </CallOut>
    </template>
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
      La plantilla es HTML con sintaxis extra para enlazarlo a tus datos. Todo lo que declares
      en <code>&lt;script setup&gt;</code> está disponible aquí directamente. Hay tres cosas
      que vas a escribir constantemente: mostrar datos, enlazar atributos y escuchar eventos.
    </p>
    <CodeBlock :code="s.templateSyntax" />
    <p>
      Todo lo que empieza por <code>v-</code> es una <strong>directiva</strong>: un atributo
      especial que Vue interpreta. Los atajos <code>:</code> y <code>@</code> son tan
      habituales que casi nadie escribe <code>v-bind</code> ni <code>v-on</code> completos.
    </p>
    <template #note>
      <CallOut>
        <p>
          La pizarra del menú del día con un hueco para el plato. Tú solo dices qué plato toca
          hoy; quien atiende la barra borra el hueco y escribe el nuevo. La plantilla es la
          pizarra, las llaves son el hueco y Vue es quien la actualiza.
        </p>
      </CallOut>
    </template>
    <CallOut type="warning">
      <p>
        Las llaves no sirven para meter HTML. Si una variable contiene
        <code>&lt;b&gt;hola&lt;/b&gt;</code>, <code v-pre>{{ }}</code> pinta las etiquetas tal
        cual, y es a propósito: así nadie te cuela un script. Existe
        <code>v-html</code>, pero úsalo solo con contenido que controlas tú.
      </p>
    </CallOut>
  </DocTopic>
</template>
