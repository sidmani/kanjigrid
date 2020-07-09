import m from 'mithril';
// import chroma from 'chroma';
import tinygradient from 'tinygradient';
import styles from './grid.css';
import kanji from './kanji-jouyou.json';

const gradient = tinygradient([
  { color: 'red', pos: 0.4 },
  { color: 'yellow', pos: 0.6 },
  { color: 'green', pos: 1.0 }]).rgb(24);

const cell = {
  view(vnode) {
    const sData = kanji[vnode.attrs.char];
    return m('span', { class: styles.kanjiCell },
      m('span', {
        onclick() {
          vnode.attrs.clicked();
        },
        style: {
          'background-color': vnode.attrs.data && !vnode.attrs.data.new
            ? gradient[Math.min(23, Math.floor(vnode.attrs.data.ease * (24 / 3500)))]
            : null,
        },
        class: styles.kanjiHoverTarget,
      },
      vnode.attrs.char),
      vnode.attrs.big
        ? m('div', {
          class: styles.popover,
          style: {
            'background-color': vnode.attrs.data && !vnode.attrs.data.new
              ? gradient[Math.min(23, Math.floor(vnode.attrs.data.ease * (24 / 3500)))]
              : null,
          },
        },
        m('span', { class: styles.bigChar }, vnode.attrs.char),
        m('span', { class: styles.data },
          m('div', `Strokes: ${sData.strokes}`),
          sData.readings_on.length
            ? m('div', { class: styles.yomi }, 'Onyomi: ', sData.readings_on.join(', '))
            : null,
          sData.readings_kun.length
            ? m('div', { class: styles.yomi }, 'Kunyomi: ', sData.readings_kun.join(', '))
            : null))
        : null);
  },
};

export default {
  view(vnode) {
    const chars = Object.keys(vnode.attrs.chars)
      .map((c, idx) => m(cell, {
        char: c,
        data: vnode.attrs.chars[c],
        big: vnode.state.big === idx,
        clicked() {
          vnode.state.big = idx;
        },
      }));
    return m('div', { class: styles.container }, chars);
  },
};
