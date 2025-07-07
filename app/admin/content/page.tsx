import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Monitor, ArrowLeft, Settings, Play, Pause, RefreshCw } from "lucide-react"
import Link from "next/link"

const tvs = [
  {
    id: "tv-001",
    name: "Tela do Lobby",
    template: "Slideshow Padrão",
    status: "online",
    currentSlide: "banner-boas-vindas.jpg",
    totalSlides: 8,
    lastUpdate: "2 minutos atrás",
  },
  {
    id: "tv-002",
    name: "Sala de Conferência A",
    template: "Exibição de Notícias",
    status: "online",
    currentSlide: "cronograma-reunioes.png",
    totalSlides: 5,
    lastUpdate: "5 minutos atrás",
  },
  {
    id: "tv-003",
    name: "Tela do Refeitório",
    template: "Slideshow Padrão",
    status: "offline",
    currentSlide: "cardapio-hoje.jpg",
    totalSlides: 12,
    lastUpdate: "1 hora atrás",
  },
]

export default function ContentPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Button variant="ghost" asChild className="mr-4">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar ao Painel
                </Link>
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Gerenciador de Conteúdo</h1>
            </div>
            <Button>
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar Tudo
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid gap-6">
            {tvs.map((tv) => (
              <Card key={tv.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        <Monitor className="h-5 w-5 mr-2 text-blue-600" />
                        {tv.name}
                        <span className="ml-2 text-sm font-normal text-gray-500">({tv.id})</span>
                      </CardTitle>
                      <CardDescription className="mt-2">
                        Template: {tv.template} • {tv.totalSlides} slides configurados
                      </CardDescription>
                    </div>
                    <Badge variant={tv.status === "online" ? "default" : "destructive"}>{tv.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Status Atual</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>
                          <strong>Slide Atual:</strong> {tv.currentSlide}
                        </p>
                        <p>
                          <strong>Última Atualização:</strong> {tv.lastUpdate}
                        </p>
                        <p>
                          <strong>Total de Slides:</strong> {tv.totalSlides}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Play className="h-4 w-4 mr-1" />
                          Reproduzir
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Pause className="h-4 w-4 mr-1" />
                          Pausar
                        </Button>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/admin/content/${tv.id}`}>
                          <Settings className="h-4 w-4 mr-1" />
                          Gerenciar Conteúdo
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/tv/${tv.id}`} target="_blank">
                          <Monitor className="h-4 w-4 mr-1" />
                          Ver Exibição
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
