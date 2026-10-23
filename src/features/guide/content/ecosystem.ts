export interface EcosystemItem {
  name: string
  href: string
  text: string
}

export const ecosystem: EcosystemItem[] = [
  {
    name: 'Vue Router',
    href: 'https://router.vuejs.org',
    text: 'Rutas, navegación y carga perezosa de páginas.',
  },
  {
    name: 'Pinia',
    href: 'https://pinia.vuejs.org',
    text: 'Estado global. El sucesor oficial de Vuex.',
  },
  {
    name: 'TanStack Query',
    href: 'https://tanstack.com/query/latest/docs/framework/vue/overview',
    text: 'Pedir datos al servidor con caché, reintentos y estados de carga.',
  },
  {
    name: 'Vite',
    href: 'https://vite.dev',
    text: 'Servidor de desarrollo y build. Lo que mueve esta página.',
  },
  {
    name: 'Vitest',
    href: 'https://vitest.dev',
    text: 'El ejecutor de tests de Vite: rápido y con la misma configuración.',
  },
  {
    name: 'Vue Test Utils',
    href: 'https://test-utils.vuejs.org',
    text: 'Montar componentes y comprobar su DOM y sus eventos.',
  },
  {
    name: 'Nuxt',
    href: 'https://nuxt.com',
    text: 'Framework sobre Vue con renderizado en servidor, rutas por archivos y más.',
  },
  {
    name: 'Vue DevTools',
    href: 'https://devtools.vuejs.org',
    text: 'Inspecciona componentes, estado y eventos desde el navegador.',
  },
]
