module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  content: ['./src/**/*.js', './src/**/**/*.js'],
  theme: {
    fill: (theme) => ({
      red: theme('colors.red.primary'),
    }),
    stroke: (theme) => ({
      red: theme('colors.red.primary'),
    }),
    colors: {
      white: '#ffffff',
      blue: {
        medium: '#0095f6',
      },
      black: {
        primary: '#262626',
        light: '#8e8e8e',
        faded: '#00000059',
      },
      gray: {
        base: '#616161',
        background: '#fafafa',
        primary: '#dbdbdb',
        highlight: '#efefef',
        bold: '#16182357',
        blur: '#857979cc',
      },
      red: {
        primary: '#ed4956',
      },
    },
  },
}
