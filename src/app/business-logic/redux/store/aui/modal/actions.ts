import { Modals } from '@src/app/core/typescript';
import { make } from 'redux-chill';

const toggleModal = make('[aui-modal] toggle modal')
  .stage('show', (id: Modals) => id)
  .stage('hide', (id: Modals) => id);

export { toggleModal };
