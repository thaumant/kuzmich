# Kuzmich #

Порт [Petrovich](https://github.com/rocsci/petrovich) на JavaScript. Склонение падежей русских имён, фамилий и отчеств.

## Установка ##

### Для NodeJS ###
Используйте npm:
```
npm install kuzmich
```

### Для браузера ###
Используйте bower:
```
bower install kuzmich
```

Или вручную. Ссылка: [kuzmich-browser.min.js](https://raw.github.com/thaumant/kuzmich/master/dist/kuzmich-browser.min.js)

## Подключение ##

В браузере:

```html
<script type="text/javascript" src="/path/to/kuzmich/dist/kuzmich-browser.min.js"></script>
```

В NodeJS:

```JavaScript
var kuzmich = require('kuzmich');
```

## Использование ##

Кузьмича можно использовать двумя способами. Но сначала перечислим необходимые параметры, а именно: пол, тип имени и падеж.

Пол может иметь одно из следующих значений:
- male - мужской,
- female - женский,
- androgynous - неопределенный.
 
Типы имени:
- first - имя,
- last - фамилия,
- middle - отчество.

Падежи:
- nominative - именительный
- genitive - родительный
- dative - дательный
- accusative - винительный
- instrumental - творительный
- prepositional - предложный

###Первый вариант использования:
```JavaScript
// создаем объект parameters следующего вида:
var parameters = {
 gender: 'male',
 nametype: 'first',
 case: 'dative'
};
// и вызываем Кузьмича как функцию:
kuzmich('Маша', parameters); // вернет 'Маше'
```

###Второй вариант использования:
```JavaScript
// Кузьмич обладает цепочкой методов kuzmich[gender][nametype][case]:
kuzmich.male.first.genetive('Андрей') // вернет "Андрея"
kuzmich.female.last.accusative('Иванова') // вернет "Иванову"
```

## Авто определение пола по отчеству ##
Кузьмич может определить пол по отчеству, используя простое правило:
- мужские имена заканчиваются на "-ич",
- женские - на "-на",
- все остальное определяется как "androgynous".

```JavaScript
kuzmich.detect_gender('Иванович') // вернет 'male'
kuzmich.detect_gender('Ильинична') // вернет 'female'
kuzmich.detect_gender('Блаблабла') // вернет 'androgynous'
```
