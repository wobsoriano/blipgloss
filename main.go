package main

/*
#include <stdlib.h>
#include <string.h>
*/
import "C"

import (
	"encoding/json"
	"reflect"
	"strings"
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
func Render(keyPtr *C.char, text *C.char) *C.char {
	key := str(keyPtr)
	return ch(m[key].Render(str(text)))
}

//export Copy
func Copy(keyPtr *C.char) *C.char {
	key := str(keyPtr)
	canonic, _ := nanoid.Standard(10)
	uniqueId := canonic()
	m[uniqueId] = m[key].Copy()
	return ch(uniqueId)
}

//export SetColorValue
func SetColorValue(fieldPtr, keyPtr, valuePtr *C.char, adaptive bool) {
	style := m[str(fieldPtr)]
	key := str(keyPtr)

	if adaptive {
		adaptiveColor := lipgloss.AdaptiveColor{}
		json.Unmarshal([]byte(str(valuePtr)), &adaptiveColor)
		color := reflect.ValueOf(adaptiveColor)
		reflect.ValueOf(style).MethodByName(key).Call([]reflect.Value{color})
	} else {
		value := lipgloss.Color(str(valuePtr))
		color := reflect.ValueOf(value)
		reflect.ValueOf(style).MethodByName(key).Call([]reflect.Value{color})
	}
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

//export UnsetRule
func UnsetRule(fieldPtr, keyPtr *C.char) {
	style := m[str(fieldPtr)]
	key := str(keyPtr)
	reflect.ValueOf(style).MethodByName(key).Call([]reflect.Value{})
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

//export HasDarkBackground
func HasDarkBackground() bool {
	return lipgloss.HasDarkBackground()
}

//export JoinHorizontal
func JoinHorizontal(position float64, paragraphs *C.char) *C.char {
	arr := strings.Split(str(paragraphs), ",")
	joined := lipgloss.JoinHorizontal(lipgloss.Position(position), arr...)
	return ch(joined)
}

//export JoinVertical
func JoinVertical(position float64, paragraphs *C.char) *C.char {
	arr := strings.Split(str(paragraphs), ",")
	joined := lipgloss.JoinVertical(lipgloss.Position(position), arr...)
	return ch(joined)
}

//export Width
func Width(text *C.char) int {
	return lipgloss.Width(str(text))
}

//export Height
func Height(text *C.char) int {
	return lipgloss.Height(str(text))
}

//export Align
func Align(fieldPtr *C.char, position float64) {
	style := m[str(fieldPtr)]
	style.Align(lipgloss.Position(position))
}
