export type TData = {
  title: string,
  timeframes: {
    daily: {
      current: number,
      previous: number
    },
    weekly: {
      current: number,
      previous: number
    },
    monthly: {
      current: number,
      previous: number
    }
  }
}

export const Views = {
  daily: 'Day',
  weekly: 'Week',
  monthly: 'Month'
};

export type TView = keyof typeof Views;