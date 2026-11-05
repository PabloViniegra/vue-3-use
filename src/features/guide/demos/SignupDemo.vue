<script setup lang="ts">
import { computed, nextTick, onUnmounted, reactive, ref, useTemplateRef, watch } from 'vue'
import BaseButton from '../../../components/ui/BaseButton.vue'
import SignupField from './SignupField.vue'

type Campo = 'nombre' | 'correo' | 'clave'

const CAMPOS: Campo[] = ['nombre', 'correo', 'clave']
const MINIMO = 8

const datos = reactive<Record<Campo, string>>({ nombre: '', correo: '', clave: '' })
const tocados = reactive<Record<Campo, boolean>>({ nombre: false, correo: false, clave: false })
const estado = ref<'editando' | 'enviando' | 'hecho'>('editando')
const rechazar = ref(false)
const errorServidor = ref('')
const formulario = useTemplateRef('formulario')
const exito = useTemplateRef('exito')
let timer: number | undefined

const errores = computed<Record<Campo, string>>(() => ({
  nombre: datos.nombre.trim() ? '' : 'Dinos cómo te llamas.',
  correo: /^\S+@\S+\.\S+$/.test(datos.correo.trim())
    ? errorServidor.value
    : 'Escribe un correo con @ y dominio, como lucia@ejemplo.com.',
  clave: datos.clave.length >= MINIMO
    ? ''
    : datos.clave
      ? `Te faltan ${MINIMO - datos.clave.length} caracteres.`
      : `Elige una contraseña de al menos ${MINIMO} caracteres.`,
}))

const visible = (campo: Campo) => (tocados[campo] ? errores.value[campo] : '')

watch(() => datos.correo, () => (errorServidor.value = ''))

async function enfocar(campo: Campo) {
  await nextTick()
  formulario.value?.querySelector<HTMLInputElement>(`[name="${campo}"]`)?.focus()
}

function enviar() {
  if (estado.value === 'enviando') return
  CAMPOS.forEach((campo) => (tocados[campo] = true))
  const primero = CAMPOS.find((campo) => errores.value[campo])

  if (primero) return enfocar(primero)

  estado.value = 'enviando'
  timer = window.setTimeout(async () => {
    if (rechazar.value) {
      estado.value = 'editando'
      errorServidor.value = 'Ya hay una cuenta con ese correo. Prueba con otro.'

      return enfocar('correo')
    }

    estado.value = 'hecho'
    await nextTick()
    exito.value?.focus()
  }, 900)
}

function reiniciar() {
  CAMPOS.forEach((campo) => {
    datos[campo] = ''
    tocados[campo] = false
  })
  estado.value = 'editando'
  enfocar('nombre')
}

onUnmounted(() => clearTimeout(timer))
</script>

<template>
  <div v-if="estado === 'hecho'" ref="exito" tabindex="-1" :class="$style.done">
    <p>
      Cuenta creada para <strong>{{ datos.nombre.trim() }}</strong>. No se ha enviado nada a
      ningún sitio: el servidor es un <code>setTimeout</code>.
    </p>
    <BaseButton size="sm" variant="alt" @click="reiniciar">Empezar otra vez</BaseButton>
  </div>

  <form v-else ref="formulario" novalidate :class="$style.form" @submit.prevent="enviar">
    <SignupField
      v-model="datos.nombre"
      etiqueta="Nombre"
      name="nombre"
      autocomplete="name"
      :error="visible('nombre')"
      @blur="tocados.nombre = true"
    />
    <SignupField
      v-model.trim="datos.correo"
      etiqueta="Correo"
      name="correo"
      type="email"
      autocomplete="email"
      spellcheck="false"
      :error="visible('correo')"
      @blur="tocados.correo = true"
    />
    <SignupField
      v-model="datos.clave"
      etiqueta="Contraseña"
      name="clave"
      type="password"
      autocomplete="new-password"
      :error="visible('clave')"
      @blur="tocados.clave = true"
    />
    <label :class="$style.check">
      <input v-model="rechazar" type="checkbox" />
      Simular que el servidor rechaza el correo
    </label>
    <div :class="$style.actions">
      <BaseButton type="submit" :aria-disabled="estado === 'enviando'">
        {{ estado === 'enviando' ? 'Enviando…' : 'Crear cuenta' }}
      </BaseButton>
      <p role="status" :class="$style.hint">
        {{ estado === 'enviando' ? 'Enviando el formulario…' : 'Los errores aparecen al dejar cada campo o al enviar.' }}
      </p>
    </div>
  </form>
</template>

<style module>
.form {
  display: grid;
  gap: var(--space-sm);
}

.check {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: var(--font-size-label);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-sm);
}

.hint {
  margin: 0;
  font-size: var(--font-size-label);
  color: var(--c-text-2);
}

.done p {
  margin: 0 0 var(--space-sm);
}
</style>
