package main
 
import (
	"github.com/jinzhu/gorm"
)

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

