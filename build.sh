#!/bin/sh

XGO=~/go/bin/xgo
TARGETS="linux/arm64,linux/amd64,darwin/arm64,darwin/amd64"

$XGO -out release/blipgloss --targets=$TARGETS -ldflags="-s -w" -buildmode="c-shared" .
