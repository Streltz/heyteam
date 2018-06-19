import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

const items = [
  {
    src: 'http://3.bp.blogspot.com/-N78svtmjP98/Tasw2bTAqxI/AAAAAAAAD-8/EYH1FP91pVg/s1600/Tom%2BCruise.jpg',
    altText: 'Slide 1',
    caption: 'Slide 1',
    header: 'Slide 1 Header'
  },
  {
    src: 'http://4.bp.blogspot.com/-EtkEe9ouDLU/T6V5A_meUtI/AAAAAAAAEVg/1ic2kCwFNoY/s1600/Tom+Cruise.jpg',
    altText: 'Slide 2',
    caption: 'Slide 2',
    header: 'Slide 2 Header'
  },
  {
    src: 'http://3.bp.blogspot.com/-GFbYDaG-R2c/Tw2JTsLsQ0I/AAAAAAAABSM/sS-ODYBbisI/s1600/tom+cruise-hairstyles-formen.blogspot.com-Tom-Cruise-52-K9GH7J97Q2-1280x1024.jpg',
    altText: 'Slide 3',
    caption: 'Slide 3',
    header: 'Slide 3 Header'
  }
];


const Carousel = (props) => <UncontrolledCarousel items={items} />;

export default Carousel;