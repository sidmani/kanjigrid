import 'sanitize.css';
import m from 'mithril';
import home from './home';
import './main.css';


m.route(document.body, "/", {
  '/': home,
});
