import {getCorrectTime} from '../../core/utils';
import {TData, TView, Views} from '../../core/types';

interface DashboardProps {
  data: TData,
  selector?: string,
  view?: TView
}

export class DashboardItem {
  data: TData;
  container: Element;
  view: TView;
  currTimeEl: Element | null = null;
  prevTimeEl: Element | null = null;

  constructor({data, selector = '.dashboard__content', view = 'weekly'}: DashboardProps) {
    this.data = data;
    this.container = document.querySelector(selector)!;
    this.view = view;

    this._createMarkup();
  }

  _createMarkup() {
    const {title, timeframes} = this.data;
    const {current, previous} = timeframes[this.view];
    const id = title.toLowerCase().replace(/ /g, '-');

    this.container.insertAdjacentHTML('beforeend', `
      <div class="dashboard__item dashboard__item--${id}">
        <article class="tracking-card">
          <header class="tracking-card__header">
            <h4 class="tracking-card__title">${title}</h4>
            <input type="image" src="./assets/images/icon-ellipsis.svg" alt="Menu">
          </header>
          <div class="tracking-card__body">
            <div class="tracking-card__time">${getCorrectTime(current)}</div>
            <div class="tracking-card__prev-period">Last ${Views[this.view]} - ${getCorrectTime(previous)}</div>
          </div>
        </article>
      </div>
    `);

    this.currTimeEl = this.container.querySelector(`.dashboard__item--${id} .tracking-card__time`);
    this.prevTimeEl = this.container.querySelector(`.dashboard__item--${id} .tracking-card__prev-period`);
  }

  changeView(view: TView) {
    this.view = view;
    const {current, previous} = this.data.timeframes[this.view];

    this.currTimeEl && (this.currTimeEl.textContent = getCorrectTime(current));
    this.prevTimeEl && (this.prevTimeEl.textContent = `Last ${Views[this.view]} - ${getCorrectTime(previous)}`);
  }
}