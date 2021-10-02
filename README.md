# Custom Select element

Попробуйте добавить тег `<my-select>` в файл HTML

Вы можете передать набор опций с помощью атрибута `options`

Опции необходимо записывать через запятую:

```html

<my-select options="1, 2, 3"/></my-select>

```

Чтобы выбрать начальный элемент, используйте атрибут `value`:

```html

<my-select options="First, Second, Third" value="third"></my-select>

```

Чтобы получить выбранный элемент используйте `Element.getAttribute('value')`:

**Обратите внимание, атрибут `value` приводится к нижнему регистру**

По умолчанию, `value` равен первой опции

```javascript
const selectElement = document.querySelector('my-select')
const selectedValue = selectElement.getAttribute('value')
```

Чтобы прослушивать изменение выбранной опции используйте `EventTarget.addEventListener('select', eventHandler)`:

```javascript
const selectElement = document.querySelector('my-select')
selectElement.addEventListener('select', eventHandler)
```

Также есть возможность изменить цвет фона и цвет текста, для этого необходимо использовать атрибуты `bg` и `color`:

```html

<my-select options="Some option, Another option" bg="lightsalmon" color="#264653"></my-select>

```

Для задания цвета можно использовать стандартные обозначения цветов CSS:

* Name (`black`, `lime`, `navy`)
* Hex Code (`#000`, `#C0C0C0`, `#F0F`)
* RGB value (`rgb(0, 0, 0)`, `rgb(192, 192, 192)`)
