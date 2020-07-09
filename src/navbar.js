import m from 'mithril';
import styles from './navbar.css';

export default {
  view() {
    return m('div', { class: styles.container },
      m('span', { class: styles.title }, 'KanjiGrid'));
  },
};
