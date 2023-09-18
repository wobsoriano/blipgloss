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
var whitespaceMap map[string]lipgloss.WhitespaceOption = map[string]lipgloss.WhitespaceOption{}

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
	style := getStyle(keyPtr)
	return ch(style.Render(str(text)))
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

//export WithWhitespaceChars
func WithWhitespaceChars(strPtr *C.char) *C.char {
	canonic, _ := nanoid.Standard(10)
	uniqueId := canonic()
	whitespaceMap[uniqueId] = lipgloss.WithWhitespaceChars(str(strPtr))
	return ch(uniqueId)
}

//export WithWhitespaceBackground
func WithWhitespaceBackground(valuePtr *C.char, colorType int) *C.char {
	canonic, _ := nanoid.Standard(10)
	uniqueId := canonic()
	color := SetColor(str(valuePtr), colorType)
	whitespaceMap[uniqueId] = lipgloss.WithWhitespaceBackground(color)
	return ch(uniqueId)
}

//export WithWhitespaceForeground
func WithWhitespaceForeground(valuePtr *C.char, colorType int) *C.char {
	canonic, _ := nanoid.Standard(10)
	uniqueId := canonic()
	color := SetColor(str(valuePtr), colorType)
	whitespaceMap[uniqueId] = lipgloss.WithWhitespaceForeground(color)
	return ch(uniqueId)
}

func SetColor(value string, colorType int) lipgloss.TerminalColor {
	var color lipgloss.TerminalColor

	switch colorType {
	case 1:
		color = lipgloss.Color(value)
	case 2:
		adaptiveColor := lipgloss.AdaptiveColor{}
		err := json.Unmarshal([]byte(value), &adaptiveColor)

		if err != nil {
			panic("Unable to parse adaptive color")
		}
		color = adaptiveColor
	case 3:
		completeColor := lipgloss.CompleteColor{}
		err := json.Unmarshal([]byte(value), &completeColor)

		if err != nil {
			panic("Unable to parse complete color")
		}
		color = completeColor
	}
	return color
}

//export SetColorValue
func SetColorValue(fieldPtr, keyPtr, valuePtr *C.char, colorType int) {
	style := getStyle(fieldPtr)
	method := str(keyPtr)

	color := reflect.ValueOf(SetColor(str(valuePtr), colorType))

	reflect.ValueOf(style).MethodByName(method).Call([]reflect.Value{color})
}

//export SetIntValue
func SetIntValue(fieldPtr, keyPtr *C.char, value int) {
	style := getStyle(fieldPtr)
	method := str(keyPtr)
	intValue := reflect.ValueOf(value)
	reflect.ValueOf(style).MethodByName(method).Call([]reflect.Value{intValue})
}

//export SetString
func SetString(fieldPtr, valuePtr *C.char) {
	style := getStyle(fieldPtr)
	style.SetString(str(valuePtr))
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
	var arr []string
	err := json.Unmarshal([]byte(str(paragraphs)), &arr)

	if err != nil {
		panic("Unable to parse paragraphs")
	}

	joined := lipgloss.JoinHorizontal(lipgloss.Position(position), arr...)
	return ch(joined)
}

//export JoinVertical
func JoinVertical(position float64, paragraphs *C.char) *C.char {
	var arr []string
	err := json.Unmarshal([]byte(str(paragraphs)), &arr)

	if err != nil {
		panic("Unable to parse paragraphs")
	}

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

//export Border
func Border(fieldPtr, valuePtr *C.char, top, right, bottom, left bool) {
	style := getStyle(fieldPtr)

	var border lipgloss.Border
	value := str(valuePtr)

	if value == "rounded" {
		border = lipgloss.RoundedBorder()
	} else if value == "double" {
		border = lipgloss.DoubleBorder()
	} else if value == "normal" {
		border = lipgloss.NormalBorder()
	} else if value == "hidden" {
		border = lipgloss.HiddenBorder()
	} else if value == "thick" {
		border = lipgloss.ThickBorder()
	} else {
		jsonBorder := lipgloss.Border{}
		err := json.Unmarshal([]byte(value), &jsonBorder)

		if err != nil {
			panic(err)
		}

		border = jsonBorder
	}

	style.Border(border, top, right, bottom, left)
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

//export Inherit
func Inherit(fieldPtr, stylePtr *C.char) {
	style := getStyle(fieldPtr)
	styleToInherit := getStyle(stylePtr)
	style.Inherit(styleToInherit)
}

//export Place
func Place(width, height int, hPos, vPos float64, strPtr, whitespaceOptionPtr *C.char) *C.char {
	whitespaceOption := strings.Split(str(whitespaceOptionPtr), ",")
	var convertedOptions []lipgloss.WhitespaceOption

	// Loop through the array and convert the whitespace options
	for _, optionStr := range whitespaceOption {
		convertedOptions = append(convertedOptions, whitespaceMap[optionStr])
	}

	joined := lipgloss.Place(width, height, lipgloss.Position(hPos), lipgloss.Position(vPos), str(strPtr), convertedOptions...)
	return ch(joined)
}
