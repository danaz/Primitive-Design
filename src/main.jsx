import { createRoot } from 'react-dom/client';
import LogicHost from './lib/LogicHost.jsx';
import SiteLogic from './logic/SiteLogic.js';
import SiteView from './views/SiteView.jsx';
import { SITE_CONFIG } from './config.js';
import './styles/base.css';
import './styles/site.css';
import './styles/pseudo.css';

createRoot(document.getElementById('app')).render(
  <LogicHost logic={SiteLogic} view={SiteView} {...SITE_CONFIG} />
);
