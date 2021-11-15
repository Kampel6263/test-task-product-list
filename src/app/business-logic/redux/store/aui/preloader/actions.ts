import { Preloaders } from '@src/app/core/typescript';
import { make } from 'redux-chill';

const togglePreloader = make('[aui-preloader] toggle preloader')
  .stage('show', (id: Preloaders) => id)
  .stage('hide', (id: Preloaders) => id);

export { togglePreloader };
