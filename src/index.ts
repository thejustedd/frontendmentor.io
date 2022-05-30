import './style.scss';
import {DashboardItem} from './components/Dashboard/DashboardItem';
import {getDashboardData} from './core/functions';
import {TView, Views} from './core/types';

const URL = 'https://6290adf9665ea71fe1385b55.mockapi.io/activities';

document.addEventListener('DOMContentLoaded', () => {
  getDashboardData(URL).then(data => {
    if (!data) return;

    const activities = data.map(activity => new DashboardItem({data: activity}));
    const selectors = document.querySelectorAll('.view-selector__link');

    selectors.forEach(selector => {
      if (!(selector instanceof HTMLAnchorElement && selector.dataset.view)) return;

      selector.addEventListener('click', () => {
        selectors.forEach(selector => selector.classList.remove('view-selector__link--active'));
        selector.classList.add('view-selector__link--active');

        const newView = selector.dataset.view;

        if (newView && newView in Views) {
          activities.forEach(activity => activity.changeView(newView as TView));
        }
      });
    });
  });
});