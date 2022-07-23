package main

/*
#include <stdlib.h>
#include <string.h>
*/
import "C"

import (
	"reflect"
	"runtime/cgo"
	"unsafe"

	"github.com/charmbracelet/lipgloss"
	"github.com/jaevor/go-nanoid"
)

var m map[string]lipgloss.Style = map[string]lipgloss.Style{}

func main() {}

func ch(str string) *C.char {
	return C.CString(str)
}

func str(ch *C.char) string {
	return C.GoString(ch)
}

//export FreeString
func FreeString(str *C.char) {
	C.free(unsafe.Pointer(str))
}

//export NewStyle
func NewStyle() *C.char {
	canonic, _ := nanoid.Standard(10)
	uniqueId := canonic()
	m[uniqueId] = lipgloss.NewStyle().Copy()
	return ch(uniqueId)
}

//export Render
func Render(zxc *C.char, text *C.char) *C.char {
	key := str(zxc)
	return ch(m[key].Render(str(text)))
}

//export Copy
func Copy(zxc *C.char, text *C.char) *C.char {
	key := str(zxc)
	canonic, _ := nanoid.Standard(10)
	uniqueId := canonic()
	m[uniqueId] = m[key].Copy()
	return ch(uniqueId)
}

//export SetColorValue
func SetColorValue(fieldPtr, keyPtr *C.char, valuePtr C.uintptr_t) {
	style := m[str(fieldPtr)]
	key := str(keyPtr)
	// value := lipgloss.Color(str(valuePtr))
	value := cgo.Handle(valuePtr).Value().(lipgloss.Color)
	color := reflect.ValueOf(value)
	reflect.ValueOf(style).MethodByName(key).Call([]reflect.Value{color})
}

//export SetIntValue
func SetIntValue(fieldPtr, keyPtr *C.char, value int) {
	style := m[str(fieldPtr)]
	key := str(keyPtr)
	intValue := reflect.ValueOf(value)
	reflect.ValueOf(style).MethodByName(key).Call([]reflect.Value{intValue})
}

//export SetStringValue
func SetStringValue(fieldPtr, keyPtr, valuePtr *C.char) {
	style := m[str(fieldPtr)]
	key := str(keyPtr)
	value := str(valuePtr)
	color := reflect.ValueOf(value)
	reflect.ValueOf(style).MethodByName(key).Call([]reflect.Value{color})
}

//export SetBooleanValue
func SetBooleanValue(fieldPtr, keyPtr *C.char, value bool) {
	style := m[str(fieldPtr)]
	key := str(keyPtr)
	boolValue := reflect.ValueOf(value)
	reflect.ValueOf(style).MethodByName(key).Call([]reflect.Value{boolValue})
}

//export GetIntValue
func GetIntValue(fieldPtr, keyPtr *C.char) int {
	style := m[str(fieldPtr)]
	key := str(keyPtr)
	return reflect.ValueOf(style).MethodByName(key).Interface().(int)
}

//export GetBoolValue
func GetBoolValue(fieldPtr, keyPtr *C.char) bool {
	style := m[str(fieldPtr)]
	key := str(keyPtr)
	return reflect.ValueOf(style).MethodByName(key).Interface().(bool)
}

//export Color
func Color(ptr *C.char) C.uintptr_t {
	return C.uintptr_t(cgo.NewHandle(lipgloss.Color(str(ptr))))
}

//export HasDarkBackground
func HasDarkBackground() bool {
	return lipgloss.HasDarkBackground()
}
