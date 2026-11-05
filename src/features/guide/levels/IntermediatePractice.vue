<script setup lang="ts">
import CallOut from '../../../components/ui/CallOut.vue'
import CodeBlock from '../../../components/ui/CodeBlock.vue'
import DemoBox from '../../../components/ui/DemoBox.vue'
import DocTopic from '../../../components/ui/DocTopic.vue'
import * as s from '../content/snippets'
import SearchDemo from '../demos/SearchDemo.vue'
import SignupDemo from '../demos/SignupDemo.vue'
</script>

<template>
  <DocTopic id="validacion" title="Formularios con validación">
    <p>
      Con <code>v-model</code> ya tienes los datos del formulario. Lo que falta es decirle a
      la persona qué está mal, cuándo y dónde, sin reñirle antes de tiempo. Casi todo sale de
      dos ideas que ya conoces: los errores son un <code>computed</code> de los datos, y un
      poco de estado extra recuerda qué campos se han tocado.
    </p>
    <CodeBlock :code="s.validation" />
    <ul>
      <li>
        <strong>Los errores se calculan, no se guardan.</strong> Si los guardas en un
        <code>ref</code> y los actualizas a mano, tarde o temprano uno se queda puesto cuando
        ya no toca.
      </li>
      <li>
        <strong>No avises mientras escribe.</strong> Que el correo es inválido al teclear la
        primera letra no ayuda a nadie. Enseña el error al salir del campo
        (<code>@blur</code>) o al enviar, y a partir de ahí actualízalo en vivo para que vea
        cuándo lo ha arreglado.
      </li>
      <li>
        <strong>Al enviar con errores, lleva el foco al primero.</strong> Con
        <code>aria-invalid</code> y <code>aria-describedby</code> el lector de pantalla dice
        que el campo está mal y lee el motivo. Los <code>id</code> salen de
        <a href="#use-id">useId</a> en cuanto el campo es un componente.
      </li>
      <li>
        <strong>No desactives el botón de enviar porque falten datos.</strong> Un botón gris
        no explica qué falta; pulsarlo y ver los errores, sí. Mientras se envía, ignora los
        clics repetidos y márcalo con <code>aria-disabled</code>: un <code>disabled</code>
        sobre el botón que tiene el foco se lo quita, y el foco queda perdido en el
        <code>body</code>.
      </li>
    </ul>
    <DemoBox label="Validación al salir y al enviar">
      <SignupDemo />
    </DemoBox>
    <template #note>
      <CallOut>
        <p>
          El funcionario de ventanilla majo. No te mira por encima del hombro mientras rellenas
          el impreso; cuando se lo das, te señala con el dedo la primera casilla que falta y te
          dice qué hay que poner. Y no te tacha la solicitud porque aún no hayas firmado.
        </p>
      </CallOut>
    </template>
    <p>
      El <code>novalidate</code> desactiva los mensajes del navegador para que mande tu
      validación, pero <code>type="email"</code> y <code>autocomplete</code> siguen ayudando:
      el móvil enseña el teclado con @ y el gestor de contraseñas rellena lo que sabe. Y
      recuerda que lo que compruebas aquí es para ayudar a quien escribe: el servidor tiene
      que volver a validarlo todo, porque una petición se puede mandar sin pasar por tu
      formulario.
    </p>
    <CallOut type="info">
      <p>
        Para formularios grandes (pasos, campos que se repiten, reglas que dependen de otros
        campos) hay librerías como <a href="https://vee-validate.logaretm.com" target="_blank" rel="noopener">VeeValidate</a>
        o <a href="https://formkit.com" target="_blank" rel="noopener">FormKit</a>. Por
        debajo hacen lo mismo que aquí, así que lo que has visto te sirve para entenderlas.
      </p>
    </CallOut>
  </DocTopic>

  <DocTopic id="pedir-datos" title="Pedir datos a una API">
    <p>
      En <a href="#watchers">watch y watchEffect</a> viste cómo cancelar una búsqueda. Si lo
      metes en un composable, tienes un <code>useFetch</code> casero que puedes usar en
      cualquier componente. Lo importante no es el <code>fetch</code>, que es una línea, sino
      todo lo que pasa alrededor:
    </p>
    <CodeBlock :code="s.useFetchSnippet" lang="js" />
    <p>
      <code>toValue</code> (<a href="#utilidades-reactividad">Utilidades de reactividad</a>)
      deja que <code>url</code> sea un texto, un <code>ref</code> o un getter, y el
      <code>watch</code> con <code>immediate</code> hace la primera petición al momento y una
      nueva cada vez que cambia. Así se usa:
    </p>
    <CodeBlock :code="s.useFetchUsage" />
    <ul>
      <li>
        <strong>Cuatro estados, no uno.</strong> Cargando, error, vacío y con datos. El vacío
        es el que más se olvida: una lista sin elementos sin una frase que lo explique parece
        un fallo.
      </li>
      <li>
        <strong>Cancela lo que ya no sirve.</strong> Si el usuario cambia el filtro antes de
        que llegue la respuesta, la vieja podría llegar después que la nueva y pisarla. El
        <code>AbortController</code> evita esa condición de carrera.
      </li>
      <li>
        <strong>Cuidado con el <code>finally</code>.</strong> La petición cancelada también
        pasa por ahí. Si apaga <code>cargando</code> sin mirar, apaga el de la petición nueva,
        que sigue en marcha.
      </li>
      <li>
        <strong>Que se pueda reintentar.</strong> Un error sin salida obliga a recargar la
        página. Con un contador en las fuentes del <code>watch</code>, reintentar es sumarle
        uno.
      </li>
    </ul>
    <DemoBox label="Búsqueda con cancelación">
      <SearchDemo />
    </DemoBox>
    <template #note>
      <CallOut>
        <p>
          Pedir en la barra de un bar lleno. Mientras te lo ponen, el camarero te dice
          «marchando». Si se ha acabado la tortilla, te lo dice y pides otra cosa. Y si cambias
          de idea antes de que salga, la comanda vieja se anula: no quieres acabar con un café y
          una caña en la mesa.
        </p>
      </CallOut>
    </template>
    <p>
      Este composable no guarda nada en caché, no junta peticiones repetidas y no vuelve a
      pedir los datos cuando vuelves a la pestaña. Para una pantalla o dos va sobrado; cuando
      la app pide datos por todas partes, eso es justo lo que te da
      <a href="#tanstack-query">TanStack Query</a>. Y si solo quieres no escribirlo,
      <a href="https://vueuse.org/core/useFetch/" target="_blank" rel="noopener">VueUse</a>
      trae un <code>useFetch</code> bastante completo.
    </p>
    <CallOut type="warning">
      <p>
        Un <code>await</code> suelto en el <code>&lt;script setup&gt;</code> convierte el
        componente en asíncrono, y entonces solo se pinta dentro de un
        <code>&lt;Suspense&gt;</code> (lo verás en
        <a href="#async">Componentes asíncronos</a>). Para pedir datos al montar, un
        composable como este es lo normal.
      </p>
    </CallOut>
  </DocTopic>
</template>
