## Go 编程基础

### 函数

- 首字母小写即为 private
- 首字母大写即为 public

### 类型定义

```go
type (
	username string
)
```

### 变量命名

```go
var userID1 string
		userID2 string
var userID3 =  "LiuYaxiong"
    userID4 := "LiuYaxiong"
```

### 赋值

- 占位符: \_

### for 循环

- 每一个循环,里面的作用域块都是单独的,所以里面申明的变量都是独立的

```go
a := 1
for {
	a++
	if a>3 {
		break
	}
}
```

```go
a := 1
for a<=3 {
  a++
}
```

```go
a := 1
for i:=1; i<3; i++ {
  a++
}
```

### switch 循环

- 注意这里的变量作用域 swtich 条件里的变量是内部作用于
- 区别是没有 break 不会贯穿执行,除非加上 fallthrough
- switch 和 case 用会有一个表达式

```go
a := 1
switch a {
case 0:
  fmt.Println("a=0")
  fallthrough
case 1:
	fmt.Println("a=1")
}
```

```go
a := 1
switch {
case a>1:
	fmt.Println("a>1")
case a<=1:
	fmt.Println("a<=1")
}
```

```go
switch a := 1; {
case a>=0:
	fmt.Println("a>=0")
case a<0:
	fmt.Println("a<0")
}
```

### goto break continue

- 可以配合标签使用
- goto 跳转到别的流程
- break 结束循环
- continue 跳出本次循环

```go
for i:=0; i<10; i++ {
	fmt.Println(i)
	for {
		goto Label1
		fmt.Println("for...")
	}
}

Label1:
	fmt.Println("finished")
```

```go
Label1:
	for i:=0; i<10; i++ {
		fmt.Println("for...")
		for {
			continue Label1
			fmt.Println("for...")
		}
	}

fmt.Println("finished")
```

### 数组

- 各种新建数组的方法
- go 里面的数组,是值类型,不是引用类型
- go 里面的数组可以使用==和!=进行比较
- 数组的方括号里面一定有数字或者...

```go
var a [2]int
b := [2]int{1, 2}
c := [9]int{8: 2}
d := [...]int{1,2,3,5:6}

fmt.Println(a)
fmt.Println(b)
fmt.Println(c)
fmt.Println(d)
```

### 切片的新建 slice

- 切片的方括号里面是空的

```go
a1 := [10]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 0}
s1 := a1[5:]
fmt.Println(s1)
```

```go

```
