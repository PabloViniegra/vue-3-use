<script setup lang="ts">
import CallOut from '../../../components/ui/CallOut.vue'
import CodeBlock from '../../../components/ui/CodeBlock.vue'
import DemoBox from '../../../components/ui/DemoBox.vue'
import DocTopic from '../../../components/ui/DocTopic.vue'
import * as s from '../content/snippets'
import AttrsDemo from '../demos/AttrsDemo.vue'
import PropsDemo from '../demos/PropsDemo.vue'
import SlotsDemo from '../demos/SlotsDemo.vue'
</script>

<template>
  <DocTopic id="componentes" title="Props y eventos">
    <p>
      Una app de Vue es un árbol de componentes. Cada uno hace una cosa y la comunicación
      entre padre e hijo sigue una regla muy simple: <strong>los datos bajan por props, los
      avisos suben por eventos</strong>.
    </p>
    <CodeBlock :code="s.childComponent" />
    <CodeBlock :code="s.parentComponent" />
    <p>
      El hijo no toca <code>likes</code>. Solo avisa de que alguien ha pulsado, y el padre,
      que es el dueño del dato, decide qué hacer. Eso es el <em>flujo unidireccional</em>.
    </p>
    <DemoBox label="Props y eventos">
      <PropsDemo />
    </DemoBox>
    <template #note>
      <CallOut>
        <p>
          Mandar a alguien a la compra. Le das la lista (props) y no la reescribe por su cuenta;
          si no quedan yogures de fresa, te llama (evento) y eres tú quien decide qué se
          compra.
        </p>
      </CallOut>
    </template>
    <CallOut type="warning">
      <p>
        Nunca modifiques una prop dentro del hijo. Si reasignas una prop, el cambio no se aplica
        y Vue te avisa en consola. Lo traicionero es un objeto: cambiarle algo por dentro
        (<code>props.usuario.nombre = 'Lu'</code>) funciona sin aviso, pero el padre no se
        entera de quién ha tocado su dato. Si necesitas una copia editable, crea un
        <code>ref</code> a partir de ella, o emite un evento y que cambie el padre.
      </p>
    </CallOut>
  </DocTopic>

  <DocTopic id="slots" title="Slots">
    <p>
      Las props pasan datos. Los <strong>slots</strong> pasan trozos de plantilla. Con ellos
      construyes componentes “contenedor”: tarjetas, modales, layouts, tablas.
    </p>
    <CodeBlock :code="s.slots" />
    <DemoBox label="Slots">
      <SlotsDemo />
    </DemoBox>
    <template #note>
      <CallOut>
        <p>
          Un marco de fotos. El marco decide el borde, el cristal y el tamaño; la foto la pones
          tú. Y si no pones ninguna, trae la de la familia sonriente que viene de fábrica (el
          contenido por defecto del slot).
        </p>
      </CallOut>
    </template>
    <p>
      Los <strong>scoped slots</strong> dan la vuelta a la idea: el hijo tiene los datos y le
      pasa cada elemento al padre para que este decida cómo pintarlo. Es la base de cualquier
      componente de lista o tabla reutilizable.
    </p>
    <CodeBlock :code="s.scopedSlots" />
    <p>
      Dos usos más. El nombre de un slot puede ser dinámico, con <code>#[nombre]</code>, útil
      para tablas donde cada columna decide su celda. Y un componente <em>renderless</em> no
      pinta nada propio: solo pone la lógica y deja todo el HTML a quien lo use. Hoy casi
      siempre es mejor un composable, pero lo verás en librerías.
    </p>
    <CodeBlock :code="s.slotsAdvanced" />
    <p>
      Con TypeScript, <code>defineSlots</code> da contrato a los slots. Lo verás en su tema.
    </p>
  </DocTopic>

  <DocTopic id="atributos-heredados" title="Atributos heredados">
    <p>
      Escribes <code>&lt;BotonBase class="grande" aria-label="Guardar" @click="guardar" /&gt;</code>
      y el componente no declara ninguna de esas tres cosas. Aun así funcionan. Todo lo que
      pasas a un componente y no está declarado como prop ni como evento (<code>class</code>,
      <code>style</code>, <code>id</code>, <code>aria-*</code>, <code>@click</code>…) se
      aplica solo al elemento raíz. Es lo que se llama <em>fallthrough</em>.
    </p>
    <CodeBlock :code="s.attrsFallthrough" />
    <p>
      El problema llega cuando la raíz no es el elemento que debería recibirlos. Un campo con
      etiqueta tiene un <code>&lt;label&gt;</code> por fuera, pero quien lo usa espera que
      <code>type</code> o <code>maxlength</code> lleguen al <code>&lt;input&gt;</code>. La
      solución son dos pasos: desactivar el reparto automático con
      <code>inheritAttrs: false</code> (en <code>&lt;script setup&gt;</code>, con
      <code>defineOptions</code>) y enlazar <code>$attrs</code> donde tú quieras.
    </p>
    <CodeBlock :code="s.attrsForward" />
    <DemoBox label="$attrs reenviados">
      <AttrsDemo />
    </DemoBox>
    <template #note>
      <CallOut>
        <p>
          La recepción de un edificio de oficinas. Llega un paquete sin nombre de empresa:
          por defecto se queda en recepción, la raíz. Con <code>inheritAttrs: false</code> le
          dices a la recepcionista que no se lo quede y tú decides a qué planta sube.
        </p>
      </CallOut>
    </template>
    <CallOut type="warning">
      <p>
        Si el componente tiene varias raíces, Vue no sabe cuál elegir y te avisa en consola si
        no enlazas <code>$attrs</code> a mano. Y <code>$attrs</code> (también
        <code>useAttrs()</code>) no es reactivo: si necesitas reaccionar a un cambio, declara
        una prop.
      </p>
    </CallOut>
  </DocTopic>
</template>
