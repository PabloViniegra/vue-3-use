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
      Con <code>v-model</code> ya tienes los datos del formulario. Lo que falta es avisar de lo
      que está mal sin agobiar a quien está escribiendo. Te basta con dos cosas que ya
      conoces: un <code>computed</code> que calcula los errores a partir de los datos y un poco
      de estado para saber qué campos se han tocado ya.
    </p>
    <CodeBlock :code="s.validation" />
    <ul>
      <li>
        Calcula los errores en lugar de guardarlos. Si los metes en un <code>ref</code> y los
        actualizas a mano, tarde o temprano se te quedará alguno en pantalla cuando ya esté
        corregido.
      </li>
      <li>
        Decir que el correo no es válido cuando solo se ha escrito una letra no ayuda a nadie.
        Enseña el error cuando la persona sale del campo (<code>@blur</code>) o cuando envía, y
        desde ese momento actualízalo mientras escribe para que vea cuándo lo ha corregido.
      </li>
      <li>
        Si se envía con errores, lleva el foco al primer campo que falla. Con
        <code>aria-invalid</code> y <code>aria-describedby</code>, el lector de pantalla anuncia
        que el campo tiene un error y lee el motivo. Si el campo es un componente, saca los
        <code>id</code> de <a href="#use-id">useId</a>.
      </li>
      <li>
        Deja activo el botón de enviar aunque falten datos: un botón gris no dice qué falta, y
        pulsarlo y ver los errores, sí. Mientras se envía, ignora los clics repetidos y márcalo
        con <code>aria-disabled</code>. Con <code>disabled</code>, el botón perdería el foco y
        este acabaría en el <code>body</code>.
      </li>
    </ul>
    <DemoBox label="Validación al salir y al enviar">
      <SignupDemo />
    </DemoBox>
    <template #note>
      <CallOut>
        <p>
          El funcionario de ventanilla majo. No se queda vigilándote mientras rellenas el
          impreso; cuando se lo entregas, te señala la primera casilla que falta y te dice qué
          tienes que poner. Y no se niega a recogerlo porque falte la firma: te lo coge y te
          avisa.
        </p>
      </CallOut>
    </template>
    <p>
      <code>novalidate</code> desactiva los mensajes del navegador para que solo se vean los
      tuyos, pero <code>type="email"</code> y <code>autocomplete</code> siguen siendo útiles:
      el móvil muestra el teclado con @ y el gestor de contraseñas rellena lo que tiene
      guardado. Y recuerda que esta validación solo sirve para ayudar a quien escribe: el
      servidor tiene que comprobarlo todo otra vez, porque cualquiera puede mandarle una
      petición sin pasar por tu formulario.
    </p>
    <CallOut type="info">
      <p>
        Para formularios grandes (pasos, campos que se repiten, reglas que dependen de otros
        campos) hay librerías como <a href="https://vee-validate.logaretm.com" target="_blank" rel="noopener">VeeValidate</a>
        o <a href="https://formkit.com" target="_blank" rel="noopener">FormKit</a>. Las dos
        saben qué campos se han tocado, guardan los errores de cada campo y te dejan elegir
        cuándo mostrarlos.
      </p>
    </CallOut>
  </DocTopic>

  <DocTopic id="pedir-datos" title="Pedir datos a una API">
    <p>
      En <a href="#watchers">watch y watchEffect</a> viste cómo cancelar una búsqueda. Si metes
      esa lógica en un composable, tienes un <code>useFetch</code> casero para cualquier
      componente. La llamada a <code>fetch</code> ocupa una línea; lo que da trabajo es todo
      lo demás:
    </p>
    <CodeBlock :code="s.useFetchSnippet" lang="js" />
    <p>
      Gracias a <code>toValue</code> (<a href="#utilidades-reactividad">Utilidades de
      reactividad</a>), <code>url</code> puede ser un texto, un <code>ref</code> o un getter.
      El <code>watch</code> con <code>immediate</code> lanza la primera petición en cuanto se
      crea y otra cada vez que cambia la URL. Así se usa:
    </p>
    <CodeBlock :code="s.useFetchUsage" />
    <ul>
      <li>
        Tienes que pintar cuatro estados: cargando, error, vacío y con datos. El vacío es el
        que más se olvida, y una lista en blanco sin una frase que lo explique parece un
        fallo.
      </li>
      <li>
        Cancela las peticiones que ya no sirven. Si el usuario cambia el filtro antes de que
        llegue la respuesta, la antigua puede llegar después que la nueva y pisarla. El
        <code>AbortController</code> evita esa condición de carrera.
      </li>
      <li>
        Ojo con el <code>finally</code>: también se ejecuta en la petición cancelada. Si ahí
        pones <code>cargando</code> a <code>false</code> sin comprobar nada, lo apagas mientras
        la petición nueva sigue en marcha.
      </li>
      <li>
        Deja siempre la opción de reintentar; si no, la única salida es recargar la página.
        Basta con añadir un contador a las fuentes del <code>watch</code>: reintentar es
        sumarle uno.
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
      Este composable no tiene caché, no agrupa peticiones repetidas y no vuelve a pedir los
      datos cuando regresas a la pestaña. Para una o dos pantallas va sobrado; cuando la app
      pide datos por todas partes, todo eso te lo da
      <a href="#tanstack-query">TanStack Query</a>. Y si lo único que quieres es ahorrarte
      escribirlo,
      <a href="https://vueuse.org/core/useFetch/" target="_blank" rel="noopener">VueUse</a>
      trae un <code>useFetch</code> bastante completo.
    </p>
    <CallOut type="warning">
      <p>
        Un <code>await</code> en el nivel superior del <code>&lt;script setup&gt;</code> convierte el
        componente en asíncrono, y entonces solo se pinta dentro de un
        <code>&lt;Suspense&gt;</code> (lo verás en
        <a href="#async">Componentes asíncronos</a>). Para pedir datos al montar el
        componente, lo habitual es un composable como este.
      </p>
    </CallOut>
  </DocTopic>
</template>
