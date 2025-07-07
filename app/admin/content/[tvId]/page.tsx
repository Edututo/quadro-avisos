"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Trash2, ImageIcon, Video, FileText } from "lucide-react"
import Link from "next/link"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

const initialSlides = [
  { id: "1", name: "banner-boas-vindas.jpg", type: "imagem", duration: 5, order: 0 },
  { id: "2", name: "noticias-empresa.mp4", type: "video", duration: 15, order: 1 },
  { id: "3", name: "lembrete-seguranca.png", type: "imagem", duration: 8, order: 2 },
  { id: "4", name: "eventos-proximos.jpg", type: "imagem", duration: 10, order: 3 },
]

export default function TVContentPage({ params }: { params: { tvId: string } }) {
  const [slides, setSlides] = useState(initialSlides)

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(slides)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update order values
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index,
    }))

    setSlides(updatedItems)
  }

  const removeSlide = (slideId: string) => {
    setSlides(slides.filter((slide) => slide.id !== slideId))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "imagem":
        return <ImageIcon className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Button variant="ghost" asChild className="mr-4">
                <Link href="/admin/content">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar ao Gerenciador de Conteúdo
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Gerenciar Conteúdo da TV</h1>
                <p className="text-gray-600">ID da TV: {params.tvId}</p>
              </div>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Conteúdo
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Reprodução de Conteúdo</CardTitle>
              <CardDescription>
                Arraste e solte para reordenar os slides. O conteúdo será reproduzido na ordem mostrada abaixo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="slides">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                      {slides.map((slide, index) => (
                        <Draggable key={slide.id} draggableId={slide.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                                snapshot.isDragging ? "shadow-lg" : ""
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-medium">
                                    {index + 1}
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    {getIcon(slide.type)}
                                    <span className="font-medium">{slide.name}</span>
                                  </div>
                                  <Badge variant="outline">{slide.type}</Badge>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-gray-500">{slide.duration}s</span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removeSlide(slide.id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              {slides.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Nenhum conteúdo configurado para esta TV</p>
                  <Button className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Primeiro Slide
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
