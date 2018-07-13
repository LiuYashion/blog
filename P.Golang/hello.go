package main

import (
	"fmt"
)

func main() {
	a1 := [10]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 0}
	s1 := a1[5:]
	fmt.Println(s1)
}
