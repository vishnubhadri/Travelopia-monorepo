// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'customLightTheme',
    themes: {
      customLightTheme: {
        dark: false,
        colors: {
          background: '#FFFBFE',
          surface: '#FFFBFE',
          primary: '#FF7F50', // Attractive primary color
          secondary: '#625B71',
          error: '#B3261E',
          info: '#2196F3',
        },
      },
    },
  },
})

export default vuetify;
