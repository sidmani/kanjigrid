import m from 'mithril';
import processFile from './processFile';
import styles from './ctrlPanel.css';

export default {
  view(vnode) {
    return m('div', { class: styles.container },
      'Open an anki deck: ',
      m('input', {
        type: 'file',
        id: 'input',
        onchange(e) {
          const file = e.target.files[0];
          processFile(file)
            .then(vnode.attrs.setList);
        },
      }));
  },
};
