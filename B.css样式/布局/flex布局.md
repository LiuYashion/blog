# 容器的属性

## flex-direction
元素的水平垂直，正序逆序等排序方式
```css
flex-direction: row | row-reverse | column | column-reverse
```

## flex-wrap
元素是否换行。reverse是换行顺序
```css
flex-wrap: nowrap | wrap | wrap-reverse
```

## flex-flow
缩写形式
```css
flex-flow: <flex-direction> || <flex-wrap>
```

## justify-content
元素在主轴上的对齐方式
```css
justify-content: flex-start | flex-end | center | space-between | space-around;
```

## align-items
元素在交叉轴上的对齐方式
```css
align-items: flex-start | flex-end | center | baseline | stretch;
```

## align-content
多跟轴线的对齐方式
```css
align-content: flex-start | flex-end | center | space-between | space-around | stretch
```












# 项目的属性

## order
项目在容器中的排列顺序，越小越靠前
```css
order: <integer>
```

## flex-basis
在分配多余空间之前，项目占据的主轴空间
> flex-basis和width的区别：
```css
flex-basis: row | row-reverse | column | column-reverse
```

## flex-grow
根据比例放大元素
```css
flex-grow: <number>;
```

## flex-shrink
根据比例缩小元素
```css
flex-shrink: <number>;
```

## flex
缩写
```css
flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
```

## align-self
允许单个项目有与其他项目不一样的对齐方式，继承父元素的 align-items
```css
align-self: auto | flex-start | flex-end | center | baseline | stretch
```