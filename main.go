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

func generateUniqueId() string {
	canonic, _ := nanoid.Standard(10)
	return canonic()
}

//export NewStyle
func NewStyle() *C.char {
	uniqueId := generateUniqueId()
	styleMap[uniqueId] = lipgloss.NewStyle()
	return ch(uniqueId)
}

//export Render
func Render(keyPtr *C.char, text *C.char) *C.char {
	style := getStyle(keyPtr)
	renderedText := style.Render(str(text))
	return ch(renderedText)
}

//export String
func String(keyPtr *C.char) *C.char {
	key := str(keyPtr)
	return ch(styleMap[key].String())
}

//export WithWhitespaceChars
func WithWhitespaceChars(strPtr *C.char) *C.char {
	uniqueId := generateUniqueId()
	whitespaceMap[uniqueId] = lipgloss.WithWhitespaceChars(str(strPtr))
	return ch(uniqueId)
}

//export WithWhitespaceBackground
func WithWhitespaceBackground(valuePtr *C.char, colorType int) *C.char {
	uniqueId := generateUniqueId()
	color := GetColorByType(str(valuePtr), colorType)
	whitespaceMap[uniqueId] = lipgloss.WithWhitespaceBackground(color)
	return ch(uniqueId)
}

//export WithWhitespaceForeground
func WithWhitespaceForeground(valuePtr *C.char, colorType int) *C.char {
	uniqueId := generateUniqueId()
	color := GetColorByType(str(valuePtr), colorType)
	whitespaceMap[uniqueId] = lipgloss.WithWhitespaceForeground(color)
	return ch(uniqueId)
}

func GetColorByType(value string, colorType int) lipgloss.TerminalColor {
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
	case 4:
		completeAdaptiveColor := lipgloss.CompleteAdaptiveColor{}
		err := json.Unmarshal([]byte(value), &completeAdaptiveColor)

		if err != nil {
			panic("Unable to parse complete adaptive color")
		}
		color = completeAdaptiveColor
	}
	return color
}

//export SetColorValue
func SetColorValue(fieldPtr, keyPtr, valuePtr *C.char, colorType int) {
	styleKey := str(fieldPtr)
	style := getStyle(fieldPtr)
	method := str(keyPtr)
	color := reflect.ValueOf(GetColorByType(str(valuePtr), colorType))
	newStyle := reflect.ValueOf(style).MethodByName(method).Call([]reflect.Value{color})[0].Interface().(lipgloss.Style)
	styleMap[styleKey] = newStyle
}

//export SetIntValue
func SetIntValue(fieldPtr, keyPtr *C.char, value int) {
	styleKey := str(fieldPtr)
	style := getStyle(fieldPtr)
	method := str(keyPtr)
	intValue := reflect.ValueOf(value)
	newStyle := reflect.ValueOf(style).MethodByName(method).Call([]reflect.Value{intValue})[0].Interface().(lipgloss.Style)
	styleMap[styleKey] = newStyle
}

//export SetString
func SetString(fieldPtr, valuePtr *C.char) {
	styleKey := str(fieldPtr)
	style := getStyle(fieldPtr)
	newStyle := style.SetString(str(valuePtr))
	styleMap[styleKey] = newStyle
}

//export SetBooleanValue
func SetBooleanValue(fieldPtr, keyPtr *C.char, value bool) {
	styleKey := str(fieldPtr)
	style := getStyle(fieldPtr)
	key := str(keyPtr)
	boolValue := reflect.ValueOf(value)
	newStyle := reflect.ValueOf(style).MethodByName(key).Call([]reflect.Value{boolValue})[0].Interface().(lipgloss.Style)
	styleMap[styleKey] = newStyle
}

//export UnsetRule
func UnsetRule(fieldPtr, keyPtr *C.char) {
	styleKey := str(fieldPtr)
	style := getStyle(fieldPtr)
	key := str(keyPtr)
	newStyle := reflect.ValueOf(style).MethodByName(key).Call([]reflect.Value{})[0].Interface().(lipgloss.Style)
	styleMap[styleKey] = newStyle
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
	styleKey := str(fieldPtr)
	style := getStyle(fieldPtr)
	newStyle := style.Align(lipgloss.Position(position))
	styleMap[styleKey] = newStyle
}

//export Margin
func Margin(fieldPtr *C.char, margins *C.char) {
	styleKey := str(fieldPtr)
	style := getStyle(fieldPtr)
	var arr []int
	err := json.Unmarshal([]byte(str(margins)), &arr)
	if err != nil {
		panic("Unable to parse margins")
	}
	newStyle := style.Margin(arr...)
	styleMap[styleKey] = newStyle
}

//export Padding
func Padding(fieldPtr *C.char, paddings *C.char) {
	styleKey := str(fieldPtr)
	style := getStyle(fieldPtr)
	var arr []int
	err := json.Unmarshal([]byte(str(paddings)), &arr)
	if err != nil {
		panic("Unable to parse paddings")
	}
	newStyle := style.Padding(arr...)
	styleMap[styleKey] = newStyle
}

func GetBorderStyleByPointerValue(valuePtr *C.char) lipgloss.Border {
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
			panic("Unable to parse custom border")
		}

		border = jsonBorder
	}

	return border
}

//export Border
func Border(fieldPtr, valuePtr *C.char, top, right, bottom, left bool) {
	styleKey := str(fieldPtr)
	style := getStyle(fieldPtr)

	border := GetBorderStyleByPointerValue(valuePtr)

	// Capture the new style returned by style.Border() and update the map
	newStyle := style.Border(border, top, right, bottom, left)
	styleMap[styleKey] = newStyle
}

//export BorderStyle
func BorderStyle(fieldPtr, valuePtr *C.char) {
	styleKey := str(fieldPtr)
	style := getStyle(fieldPtr)
	border := GetBorderStyleByPointerValue(valuePtr)
	// Capture the new style returned by style.BorderStyle() and update the map
	newStyle := style.BorderStyle(border)
	styleMap[styleKey] = newStyle
}

//export Inherit
func Inherit(fieldPtr, stylePtr *C.char) {
	styleKey := str(fieldPtr)
	style := getStyle(fieldPtr)
	styleToInherit := getStyle(stylePtr)
	newStyle := style.Inherit(styleToInherit)
	styleMap[styleKey] = newStyle
}

//export Copy
func Copy(fieldPtr *C.char) *C.char {
	styleToCopy := getStyle(fieldPtr)

	// In lipgloss v1, simple assignment creates a value copy (deep copy).
	newStyle := styleToCopy

	uniqueId := generateUniqueId()
	styleMap[uniqueId] = newStyle

	return ch(uniqueId)
}

func ConvertStringsToWhitespaceOptions(strPtr *C.char) []lipgloss.WhitespaceOption {
	whitespaceOptionKeys := strings.Split(str(strPtr), ",")
	var convertedOptions []lipgloss.WhitespaceOption

	// Loop through the array and convert the whitespace options
	for _, optionStr := range whitespaceOptionKeys {
		convertedOptions = append(convertedOptions, whitespaceMap[optionStr])
	}

	return convertedOptions
}

//export Place
func Place(width, height int, hPos, vPos float64, strPtr, whitespaceOptionPtr *C.char) *C.char {
	whitespaceOptions := ConvertStringsToWhitespaceOptions(whitespaceOptionPtr)

	joined := lipgloss.Place(width, height, lipgloss.Position(hPos), lipgloss.Position(vPos), str(strPtr), whitespaceOptions...)
	return ch(joined)
}

//export PlaceHorizontal
func PlaceHorizontal(width int, pos float64, strPtr, whitespaceOptionPtr *C.char) *C.char {
	whitespaceOptions := ConvertStringsToWhitespaceOptions(whitespaceOptionPtr)

	joined := lipgloss.PlaceHorizontal(width, lipgloss.Position(pos), str(strPtr), whitespaceOptions...)
	return ch(joined)
}

//export PlaceVertical
func PlaceVertical(height int, pos float64, strPtr, whitespaceOptionPtr *C.char) *C.char {
	whitespaceOptions := ConvertStringsToWhitespaceOptions(whitespaceOptionPtr)

	joined := lipgloss.PlaceVertical(height, lipgloss.Position(pos), str(strPtr), whitespaceOptions...)
	return ch(joined)
}
