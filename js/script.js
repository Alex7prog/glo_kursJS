/******************************************
                Lesson 14
*******************************************/
// используем строгий режим
'use strict';

const DomElement = function() {
    this.selector = '';
    this.height = '';
    this.width = ''; 
    this.bg = ''; 
    this.fontSize = '';
};

DomElement.prototype.newElemHTML = function(htmlText) {

    let elem;

    switch (this.selector[0]) {
        case '.':
            elem = document.createElement('div');
            elem.className = this.selector.slice(1);
            break;
        case '#':
            elem = document.createElement('p');
            elem.id = this.selector.slice(1);
            break;
        default:
            break;
    }

    elem.innerHTML = htmlText;
    elem.style.cssText = 
        'height: ' + this.height + '; width: '  + this.width + 
        '; background-color: ' + this.bg + '; font-size: ' + this.fontSize +';';
    
    document.body.append(elem);
};


const elemPage = new DomElement();

elemPage.selector ='#block';
elemPage.height = '100px';
elemPage.width = '500px'; 
elemPage.bg = 'lightblue'; 
elemPage.fontSize = '24px';

elemPage.newElemHTML('<span style="color: darkred; display: block; line-height: 100px;' +
    ' text-align: center;"> <b>HTML</b> text </span>');

console.log('elemPage: ', elemPage);



