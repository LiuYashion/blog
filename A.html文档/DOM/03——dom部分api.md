

# Element.match
用来判断组件是否满足某个筛选条件

```html
<ul id="list" tag='temp'>
  <li key='1'>item 1</li>
  <li key='2'>item 2</li>
  <li key='3' id="know" class="temp tag">item 3</li>
  <li key='4'>item n</li>
</ul>
```

```js
document.getElementById('know').matches('li#know.temp.tag')
```