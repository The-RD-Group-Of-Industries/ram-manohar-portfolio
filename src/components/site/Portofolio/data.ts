import { p1, p2, p3, p4, p5 } from '@/resourse/images/Portfolio/exportPortfolio';

export interface portfolio {
  image: string | any;
  title: string;
  scroll: string;
}

export const portfolioData: portfolio[] = [
  {
    image: p1,
    title: "Who I am?",
    scroll: "0vh",
  },
  {
    image: p2,
    title: "Education",
    scroll: "1200vh",
  },
  {
    image: p3,
    title: "Experience",
    scroll: "1820vh",
  },
  {
    image: p4,
    title: "Blog",
    scroll: "4100vh",
  },
  {
    image: p5,
    title: "Publications",
    scroll: "5900vh",
  },
];
