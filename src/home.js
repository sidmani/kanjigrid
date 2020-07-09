import m from 'mithril';
import navbar from './navbar';
import controls from './ctrlPanel';
import grid from './grid';
import styles from './home.css';
import kanji from './kanji-jouyou.json';

export default {
  view(vnode) {
    return [
      m(navbar),
      m('div', { class: styles.container },
        m(controls, {
          setList(list) {
            vnode.state.kanjiList = list;
            m.redraw();
          },
        }),
        m('div', { class: styles.gridContainer },
          m(grid, { chars: vnode.state.kanjiList || kanji }))),
    ];
  },
};
