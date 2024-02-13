import { createGlobalStyle } from 'styled-components'

export const theme = {
  colors: {
    primary: '#F15156',
    secondary: '#0D3B66',
    tertiary: '#F4D35E',
    text: '#FFFFFF',
    bgColor: '#FDECED',
    bgCard: '#FFFFFF',
    border: '#D3E2E5',
    danger: '#F15156',
    success: '#3CDC8C',
    gray: '#8FA7b2',
  },
}

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${theme.colors.bgColor};
    color: ${theme.colors.text};
  }

  button {
    cursor: pointer;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  body, input, button, textarea, select  {
    font: 400 16px 'Nunito', sans-serif;
  }

  ::-webkit-scrollbar {
    width: 10px;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.primary};
    border-radius: 5px;
  }


  ::-moz-scrollbar {
    width: 10px;
    border-radius: 5px;
  }

  ::-moz-scrollbar-track {
    background-color: transparent;
  }

  ::-moz-scrollbar-thumb {
    background-color: ${theme.colors.primary};
    border-radius: 5px;
  }


  @media (max-width: 1080px) {
    html {
      font-size: 93.75%;
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 87.5%;
    }
  }
`
