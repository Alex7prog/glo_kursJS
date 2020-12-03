/******************************************
                Lesson 10
*******************************************/

const book = document.querySelectorAll('.book'); 
console.log('book: ', book);

// книги по порядку
book[0].before(book[1]);
book[4].after(book[3]);
book[5].after(book[2]);

// меняем изображение фона
document.body.style.backgroundImage = "url('./image/you-dont-know-js.jpg')";

// исправляем заглавие Книги 3
const hrefBook = document.getElementsByTagName('a');
hrefBook[2].textContent = 'Книга 3. this и Прототипы Объектов';

// удаляем рекламу
const adv = document.querySelector('.adv');
adv.remove();

//порядок глав
const ulContentBooks = document.querySelectorAll('ul');

// книга 2
const liContentBook2 = ulContentBooks[1].children;
liContentBook2[3].after(liContentBook2[6]);
liContentBook2[4].after(liContentBook2[8]);
// книга 5
const liContentBook5 = ulContentBooks[4].children;
console.log('liContentBook5: ', liContentBook5);
liContentBook5[2].before(liContentBook5[9]);
liContentBook5[5].after(liContentBook5[3]);

// книга 6
// добавляем новую главу 
const liContentBook6 = ulContentBooks[5].children;

const liBook6Chapter = document.createElement('li');
liBook6Chapter.textContent = 'Глава 8: За пределами ES6';
ulContentBooks[5].insertBefore(liBook6Chapter, liContentBook6[9]);
