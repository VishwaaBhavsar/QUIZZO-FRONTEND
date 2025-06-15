"use client"

import { useRef, useState, useEffect } from "react"
import { ReactSketchCanvas } from "react-sketch-canvas"
import { Trash2, Download, Palette, Minus, Plus, Upload, Save, Undo2, Redo2, Eraser } from "lucide-react"

export default function DrawingCanvas({ onSave, className = "" }) {
  const canvasRef = useRef(null)
  const [strokeWidth, setStrokeWidth] = useState(4)
  const [strokeColor, setStrokeColor] = useState("#2563eb") // Blue color
  const [canvasMode, setCanvasMode] = useState("draw") // draw, erase
  const [isDrawing, setIsDrawing] = useState(false)
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 500 })

  // Predefined colors
  const colors = [
    "#2563eb", // Blue
    "#dc2626", // Red
    "#16a34a", // Green
    "#ca8a04", // Yellow
    "#9333ea", // Purple
    "#ea580c", // Orange
    "#0891b2", // Cyan
    "#be123c", // Pink
    "#374151", // Gray
    "#000000", // Black
  ]

  // Stroke widths
  const strokeWidths = [2, 4, 6, 8, 12, 16]

  useEffect(() => {
    // Adjust canvas size based on container
    const updateCanvasSize = () => {
      const container = document.getElementById("canvas-container")
      if (container) {
        const rect = container.getBoundingClientRect()
        setCanvasSize({
          width: Math.min(800, rect.width - 32), // 32px for padding
          height: 500,
        })
      }
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)
    return () => window.removeEventListener("resize", updateCanvasSize)
  }, [])

  const handleUndo = () => {
    canvasRef.current?.undo()
  }

  const handleRedo = () => {
    canvasRef.current?.redo()
  }

  const handleClear = () => {
    canvasRef.current?.clearCanvas()
  }

  const handleDownload = async () => {
    try {
      const canvas = canvasRef.current
      if (canvas) {
        const dataURL = await canvas.exportImage("png")
        const link = document.createElement("a")
        link.download = "drawing.png"
        link.href = dataURL
        link.click()
      }
    } catch (error) {
      console.error("Error downloading image:", error)
    }
  }

  const handleSave = async () => {
    try {
      const canvas = canvasRef.current
      if (canvas) {
        const dataURL = await canvas.exportImage("png")
        onSave?.(dataURL)
      }
    } catch (error) {
      console.error("Error saving drawing:", error)
    }
  }

  const handleUploadImage = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          canvasRef.current?.loadImageFromDataUrl(e.target.result, false)
        }
        img.src = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <div className="flex items-center gap-3">
            <Palette className="w-6 h-6 text-white" />
            <h3 className="text-xl font-semibold text-white">Drawing Canvas</h3>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Toolbar */}
          <div className="flex flex-wrap gap-4 items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-100">
            {/* Drawing Tools */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCanvasMode("draw")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  canvasMode === "draw"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-blue-700 border border-blue-200 hover:bg-blue-100"
                }`}
              >
                <Palette className="w-4 h-4" />
                Draw
              </button>
              <button
                onClick={() => setCanvasMode("erase")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  canvasMode === "erase"
                    ? "bg-red-600 text-white shadow-md"
                    : "bg-white text-red-700 border border-red-200 hover:bg-red-100"
                }`}
              >
                <Eraser className="w-4 h-4" />
                Erase
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleUndo}
                className="p-2 bg-white text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                title="Undo"
              >
                <Undo2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleRedo}
                className="p-2 bg-white text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                title="Redo"
              >
                <Redo2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleClear}
                className="p-2 bg-white text-red-700 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                title="Clear Canvas"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleDownload}
                className="p-2 bg-white text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                title="Download"
              >
                <Download className="w-4 h-4" />
              </button>
              <input type="file" accept="image/*" onChange={handleUploadImage} className="hidden" id="upload-image" />
              <button
                onClick={() => document.getElementById("upload-image")?.click()}
                className="p-2 bg-white text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                title="Upload Background Image"
              >
                <Upload className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Color Palette */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-blue-800 flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Colors
            </h4>
            <div className="flex flex-wrap gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setStrokeColor(color)}
                  className={`w-10 h-10 rounded-full border-3 transition-all hover:scale-110 shadow-md ${
                    strokeColor === color
                      ? "border-blue-500 ring-2 ring-blue-200 scale-110"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Stroke Width */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-blue-800">Brush Size</h4>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setStrokeWidth(Math.max(1, strokeWidth - 2))}
                className="p-2 bg-white text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>

              <div className="flex gap-2">
                {strokeWidths.map((width) => (
                  <button
                    key={width}
                    onClick={() => setStrokeWidth(width)}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all hover:scale-110 ${
                      strokeWidth === width
                        ? "border-blue-500 bg-blue-50 scale-110"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    }`}
                  >
                    <div
                      className="rounded-full bg-gray-700"
                      style={{
                        width: `${Math.min(width, 16)}px`,
                        height: `${Math.min(width, 16)}px`,
                      }}
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStrokeWidth(Math.min(20, strokeWidth + 2))}
                className="p-2 bg-white text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>

              <span className="text-sm text-gray-600 font-medium bg-gray-100 px-3 py-1 rounded-full">
                {strokeWidth}px
              </span>
            </div>
          </div>

          {/* Canvas Container */}
          <div
            id="canvas-container"
            className="bg-white border-2 border-blue-200 rounded-lg overflow-hidden shadow-inner"
          >
            <ReactSketchCanvas
              ref={canvasRef}
              strokeWidth={strokeWidth}
              strokeColor={canvasMode === "erase" ? "transparent" : strokeColor}
              canvasColor="white"
              backgroundImage=""
              exportWithBackgroundImage={true}
              preserveBackgroundImageAspectRatio={true}
              width={`${canvasSize.width}px`}
              height={`${canvasSize.height}px`}
              style={{
                border: "none",
                cursor: canvasMode === "erase" ? "crosshair" : "crosshair",
              }}
              onStroke={() => setIsDrawing(true)}
              allowOnlyPointerType="all"
            />
          </div>

          {/* Canvas Info */}
          <div className="flex justify-between items-center text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Canvas: {canvasSize.width} × {canvasSize.height}
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Mode: {canvasMode === "draw" ? "Drawing" : "Erasing"}
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Brush: {strokeWidth}px
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Current color:</span>
              <div
                className="w-6 h-6 rounded border-2 border-gray-300"
                style={{ backgroundColor: strokeColor }}
                title="Current color"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={handleSave}
              className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <Save className="w-5 h-5" />
              Save Drawing for Flashcards
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
