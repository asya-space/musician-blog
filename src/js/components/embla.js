import EmblaCarousel from 'embla-carousel';

const emblaNode = document.querySelector('.embla__viewport');
const embla = EmblaCarousel(emblaNode, {
   loop: true,
});
document.querySelector('.embla__prev').addEventListener('click', () => embla.scrollPrev());
document.querySelector('.embla__next').addEventListener('click', () => embla.scrollNext());
document.querySelector('.embla__container').innerHTML += document.querySelector('.embla__container').innerHTML;