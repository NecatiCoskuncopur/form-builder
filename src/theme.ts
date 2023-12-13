import { createGlobalStyle } from 'styled-components';

export const colors = {
  white: '#FFFFFF',
  alto: '#DDDDDD',
  alabaster: '#FAFAFA',
  riverBed: '#404D5B',
  azureRadiance: '#007BFF',
  paleSky: '#6C757D',
  silver: '#BBBBBB',
  eucalyptus: '#28A745',
  punch: '#DC3545',
};

export const GlobalStyles = createGlobalStyle`
* {
    padding: 0;
    margin: 0;
    list-style: none;
    border: none;
    text-decoration: none;
    box-sizing: border-box;
    &:focus {
    outline: none
    }
};

`;

export const sizes = {
  widescreen: 1440,
  desktop: 1280,
  laptop: 1024,
  tablet: 768,
  phone: 640,
  mini: 425,
};

export const device = {
  widescreen: '(max-width: 1440px)',
  desktop: '(max-width: 1280px)',
  laptop: '(max-width: 1024px)',
  tablet: '(max-width: 768px)',
  phone: '(max-width: 640px)',
  mini: '(max-width: 425px)',
};
