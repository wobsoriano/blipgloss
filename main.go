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

var styleMap map[string]lipgloss.Style = map[string]lipgloss.Style{}

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

func getStyle(fieldPtr *C.char) lipgloss.Style {
	return styleMap[str(fieldPtr)]
}

//export NewStyle
func NewStyle() *C.char {
	canonic, _ := nanoid.Standard(10)
	uniqueId := canonic()
	styleMap[uniqueId] = lipgloss.NewStyle().Copy()
	return ch(uniqueId)
}

//export Render
func Render(keyPtr *C.char, text *C.char) *C.char {
	key := str(keyPtr)
	return ch(styleMap[key].Render(str(text)))
}

//export String
func String(keyPtr *C.char) *C.char {
	key := str(keyPtr)
	return ch(styleMap[key].String())
}

//export Copy
func Copy(keyPtr *C.char) *C.char {
	key := str(keyPtr)
	canonic, _ := nanoid.Standard(10)
	uniqueId := canonic()
	styleMap[uniqueId] = styleMap[key].Copy()
	return ch(uniqueId)
}

//export SetColorValue
func SetColorValue(fieldPtr, keyPtr, valuePtr *C.char, colorType int) {
	style := getStyle(fieldPtr)
	key := str(keyPtr)

	var color reflect.Value

	switch colorType {
	case 1:
		color = reflect.ValueOf(lipgloss.Color(str(valuePtr)))
	case 2:
		adaptiveColor := lipgloss.AdaptiveColor{}
		err := json.Unmarshal([]byte(str(valuePtr)), &adaptiveColor)

		if err != nil {
			panic("Unable to parse adaptive color")
		}

		color = reflect.ValueOf(adaptiveColor)
	case 3:
		completeColor := lipgloss.CompleteColor{}
		err := json.Unmarshal([]byte(str(valuePtr)), &completeColor)

		if err != nil {
			panic("Unable to parse complete color")
		}

		color = reflect.ValueOf(completeColor)
	}

	reflect.ValueOf(style).MethodByName(key).Call([]reflect.Value{color})
}

//export SetIntValue
func SetIntValue(fieldPtr, keyPtr *C.char, value int) {
	style := getStyle(fieldPtr)
	key := str(keyPtr)
	intValue := reflect.ValueOf(value)
	reflect.ValueOf(style).MethodByName(key).Call([]reflect.Value{intValue})
}

//export SetStringValue
func SetStringValue(fieldPtr, keyPtr, valuePtr *C.char) {
	style := getStyle(fieldPtr)
	key := str(keyPtr)
	value := str(valuePtr)
	color := reflect.ValueOf(value)
	reflect.ValueOf(style).MethodByName(key).Call([]reflect.Value{color})
}

//export SetBooleanValue
func SetBooleanValue(fieldPtr, keyPtr *C.char, value bool) {
	style := getStyle(fieldPtr)
	key := str(keyPtr)
	boolValue := reflect.ValueOf(value)
	reflect.ValueOf(style).MethodByName(key).Call([]reflect.Value{boolValue})
}

//export UnsetRule
func UnsetRule(fieldPtr, keyPtr *C.char) {
	style := getStyle(fieldPtr)
	key := str(keyPtr)
	reflect.ValueOf(style).MethodByName(key).Call([]reflect.Value{})
}

//export GetIntValue
func GetIntValue(fieldPtr, keyPtr *C.char) int {
	style := getStyle(fieldPtr)
	key := str(keyPtr)
	return reflect.ValueOf(style).MethodByName(key).Interface().(int)
}

//export GetBoolValue
func GetBoolValue(fieldPtr, keyPtr *C.char) bool {
	style := getStyle(fieldPtr)
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
	style := getStyle(fieldPtr)
	style.Align(lipgloss.Position(position))
}

//export Margin
func Margin(fieldPtr *C.char, margins *C.char) {
	style := getStyle(fieldPtr)
	var arr []int
	err := json.Unmarshal([]byte(str(margins)), &arr)

	if err != nil {
		panic("Unable to parse margins")
	}

	style.Margin(arr...)
}

//export Padding
func Padding(fieldPtr *C.char, paddings *C.char) {
	style := getStyle(fieldPtr)
	var arr []int
	err := json.Unmarshal([]byte(str(paddings)), &arr)

	if err != nil {
		panic("Unable to parse paddings")
	}

	style.Padding(arr...)
}

func whichSidesBool(i ...bool) (top, right, bottom, left bool, ok bool) {
	switch len(i) {
	case 1:
		top = i[0]
		bottom = i[0]
		left = i[0]
		right = i[0]
		ok = true
	case 2:
		top = i[0]
		bottom = i[0]
		left = i[1]
		right = i[1]
		ok = true
	case 3:
		top = i[0]
		left = i[1]
		right = i[1]
		bottom = i[2]
		ok = true
	case 4:
		top = i[0]
		right = i[1]
		bottom = i[2]
		left = i[3]
		ok = true
	}
	return top, right, bottom, left, ok
}

//export Border
func Border(fieldPtr, borderStylePtr *C.char, sides ...bool) {
	style := getStyle(fieldPtr)
	borderStyle := str(borderStylePtr)

	top, right, bottom, left, ok := whichSidesBool(sides...)
	if !ok {
		top = true
		right = true
		bottom = true
		left = true
	}

	if borderStyle == "rounded" {
		style.Border(lipgloss.RoundedBorder(), top, right, bottom, left)
	} else if borderStyle == "double" {
		style.Border(lipgloss.DoubleBorder(), top, right, bottom, left)
	} else if borderStyle == "normal" {
		style.Border(lipgloss.NormalBorder(), top, right, bottom, left)
	} else if borderStyle == "hidden" {
		style.Border(lipgloss.HiddenBorder(), top, right, bottom, left)
	} else if borderStyle == "thick" {
		style.Border(lipgloss.ThickBorder(), top, right, bottom, left)
	}
}

//export BorderStyle
func BorderStyle(fieldPtr, borderStylePtr *C.char) {
	style := getStyle(fieldPtr)
	borderStyle := str(borderStylePtr)

	if borderStyle == "rounded" {
		style.BorderStyle(lipgloss.RoundedBorder())
	} else if borderStyle == "double" {
		style.BorderStyle(lipgloss.DoubleBorder())
	} else if borderStyle == "normal" {
		style.BorderStyle(lipgloss.NormalBorder())
	} else if borderStyle == "hidden" {
		style.BorderStyle(lipgloss.HiddenBorder())
	} else if borderStyle == "thick" {
		style.BorderStyle(lipgloss.ThickBorder())
	}
}

//export CustomBorder
func CustomBorder(fieldPtr, valuePtr *C.char) {
	style := getStyle(fieldPtr)
	border := lipgloss.Border{}
	err := json.Unmarshal([]byte(str(valuePtr)), &border)

	if err != nil {
		panic("Unable to parse custom border")
	}

	style.BorderStyle(border)
}

// export Inherit
func Inherit(fieldPtr, stylePtr *C.char) {
	style := getStyle(fieldPtr)
	styleToInherit := getStyle(stylePtr)
	style.Inherit(styleToInherit)
}
