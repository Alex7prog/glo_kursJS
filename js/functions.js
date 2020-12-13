/******************************************
       Functions
*******************************************/

// используем строгий режим
'use strict';

// определение функций:

// функция определения - число(true)/не число(false) 
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
// функция определения - строка(true)/не строка(false)
// строка не равна '',  
let isString = function(str) {
  return (typeof(str) === 'string') && (isNaN(parseFloat(str)) && !isFinite(str));
};
