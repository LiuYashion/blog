## Go 编程基础

# 函数

- 首字母小写即为 private
- 首字母大写即为 public

# 类型定义

```go
type (
	username string
)
```

# 变量命名

```go
var userID1 string
		userID2 string
var userID3 =  "LiuYaxiong"
    userID4 := "LiuYaxiong"
```

### 赋值

- 占位符: \_

# for 循环

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

# switch 循环

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

# goto break continue

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

# 数组

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

# 切片(动态数组)

- 切片的方括号里面是空的

```go
// 1.用数组来取切片
a1 := [10]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 0}
s1 := a1[5:]
fmt.Println(s1) // [6, 7, 8, 9, 0]
```

```go
// 2.直接新建切片,3表示个数,10表示容量
s1 := make([]int, 3, 10)
fmt.Println(s1)	// [0,0,0]
```

### reslice

- 从一个 slice 获取到另一个新的 slice
- reslice 的索引是以被 slice 的切片为准
- 索引不能超越被 slice 的切片的容量
- 索引越界会引发错误

### append

- 可以在 slice 尾部追加元素
- 可以将两个 slice 拼接起来
- 如果没有超容返回原 slice
- 如果超容了重新分配数组并拷贝原始数据

### copy

# map

- 类似于哈希表或者字典,以 key-value 的形式存储
- map 查找很快,但是

# slice 的迭代

### 函数

- Go 函数不支持嵌套 重载 默认参数
- Go 支持闭包
- 注意声明结构

```go
func main() {
	f := closure(10)
	fmt.Println(f(1))
	fmt.Println(f(2))
}

func closure(x int) (func(int) (int)) {
	fmt.Println("%p\n", &x)
	return func(y int) (int) {
		fmt.Println("%p\n", &x)
		return x + y
	}
}
```

### defer

- 类似于析构函数,在##函数体##执行结束后按照调用顺序的相反顺序逐个执行

```go
func main() {
	fmt.Println("a")
	defer fmt.Println("b")
	defer fmt.Println("c")
}
```

### 异常处理

- panic
- recover 必须在 defer 执行的函数里执行

```go
func main() {
	var fs = [4]func(){}

	for i:=0; i<4; i++ {
    //  值传递
		defer fmt.Println("defer i = ", i)

    //  引用传递
		defer func(){
			fmt.Println("defer closure i = ", i)
		}()

    //  引用传递
		fs[i] = func(){
			fmt.Println("closure i = ", i)
		}
	}

	for _, f := range fs {
    //  等到执行的时候,i已经变成了4
		f()
	}
}

// closure i =  4
// closure i =  4
// closure i =  4
// closure i =  4
// defer closure i =  4
// defer i =  3
// defer closure i =  4
// defer i =  2
// defer closure i =  4
// defer i =  1
// defer closure i =  4
// defer i =  0
```

### 函数

- Go 函数不支持嵌套 重载 默认参数
- Go 支持闭包
- 注意声明结构

```go
func main() {
	f := closure(10)
	fmt.Println(f(1))
	fmt.Println(f(2))
}

func closure(x int) (func(int) (int)) {
	fmt.Println("%p\n", &x)
	return func(y int) (int) {
		fmt.Println("%p\n", &x)
		return x + y
	}
}
```

### defer

- 类似于析构函数,在##函数体##执行结束后按照调用顺序的相反顺序逐个执行

```go
func main() {
	fmt.Println("a")
	defer fmt.Println("b")
	defer fmt.Println("c")
}
```

### 异常处理

- panic
- recover 必须在 defer 执行的函数里执行

```go
func main() {
	var fs = [4]func(){}

	for i:=0; i<4; i++ {
    //  值传递
		defer fmt.Println("defer i = ", i)

    //  引用传递
		defer func(){
			fmt.Println("defer closure i = ", i)
		}()

    //  引用传递
		fs[i] = func(){
			fmt.Println("closure i = ", i)
		}
	}

	for _, f := range fs {
    //  等到执行的时候,i已经变成了4
		f()
	}
}

// closure i =  4
// closure i =  4
// closure i =  4
// closure i =  4
// defer closure i =  4
// defer i =  3
// defer closure i =  4
// defer i =  2
// defer closure i =  4
// defer i =  1
// defer closure i =  4
// defer i =  0
```

### struce 结构

- 没有 class 的继承功能

```go
type person struct {
	Name 	string
}

func main() {
	a := &person{
		Name: "Nemoro",
	}
	fmt.Println("before: ", a)
	rewrite(a)
	fmt.Println("after:  ", a)
}

func rewrite(per *person){
	per.Name = "Clay"
	fmt.Println("      : ", per)
}

// before:  &{Nemoro}
//       :  &{Clay}
// after:   &{Clay}


type person struct {
	Name	string
	Age 	int
	Contact	struct {
		Phone, City string
	}
}

func main() {
	a := person{
		Name: "Clay",
		Age: 18,
	}
}

/////////////////
type person struct {
	string
	int
}

func main() {
	a := person{"Clay", 18}
	fmt.Println(a)
}
```

### 组合(伪继承)

```go
type human struct {
	Sex int
}

type student struct {
	human
	Name string
	Age int
}

func main() {
	a := student{
		Name: "lyx",
		Age: 18,
		human: human{
			Sex: 1,
		},
	}
	fmt.Println(a)
}
```

### 方法 method

- 方法可以访问对象的私有变量

```go
type Cat struct {
	Kind string
}

type Dog struct {
	Kind string
}

func main() {
	lura := Cat{}
  lura.Print()
  (Cat).Print(lura)
}

func (lura Cat) Print(){
	fmt.Println("funciton print")
}
```

### 你可能要复习一下取地址符&和指针\*

### 接口 interface

# <<<<<<< HEAD

- 接口是一个或多个方法签名的集合
- 接口只有方法声明,没有实现,没有字段
- 接口可以嵌入其他接口或字段
- 空接口可以作为任何类型数据的容器

```go
/** 接口 */
type USB interface {
	Name() string
	Connector
}
type Connector interface {
	Connect()
}

/** 结构 */
type PhoneConnect struct {
	name string
}

/** 方法 */
func (pc PhoneConnect) Name() string {
	return pc.name
}
func (pc PhoneConnect) Connect() {
	fmt.Println("Connect:", pc.name)
}


func main() {
	a := PhoneConnect{"XConnect"}
	a.Connect()

	// Disconnect(a)
}

/** 方法, 参数是接口 */
func Disconnect(usb USB) {
	switch usb.(type) {
	case PhoneConnect:
		fmt.Println("Disconnected:", usb)
	default:
		fmt.Println("Unknown:", usb)
	}
}
```

### 反射
