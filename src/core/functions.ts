import {TData} from './types';

interface IGetDashboardData<T = TData[]> {
  (url?: string): Promise<T | undefined>;
}

export const getDashboardData: IGetDashboardData = async (url: string = './assets/data.json') => {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Ошибка при загрузке по адресу ${url}`);
    }

    return res.json();
  } catch (e) {
    console.warn(e);
  }
};