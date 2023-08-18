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
          info: '#2196F3',
          success: '#cbf080',
          warning: '#FFC107',
          error: '#F44336'
        }
      }
    }
  }
})

export default vuetify
