// utils.ts
import { postDatas, weekdays } from './postData';

export const calculatePostsPerWeekday = (): string[] => {
  const postCountByWeekday: { [key: string]: number } = {
    Sun: 0,
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
  };

  postDatas.forEach((post) => {
    const date = new Date(post.posted_on);
    const weekday = weekdays[date.getDay()];
    postCountByWeekday[weekday]++;
  });

  return Object.entries(postCountByWeekday).map(
    ([weekday, count]) => `[${count}] ${weekday}`
  );
};
