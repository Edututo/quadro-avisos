import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Monitor, Plus, Edit, Eye, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"

const templates = [
  {
    id: 1,
    name: "Slideshow Padrão",
    description: "Template básico de slideshow com transições suaves",
    tvCount: 2,
    status: "ativo",
    lastModified: "15/01/2024",
  },
  {
    id: 2,
    name: "Exibição de Notícias",
    description: "Template com ticker de notícias e conteúdo rotativo",
    tvCount: 1,
    status: "ativo",
    lastModified: "10/01/2024",
  },
]

export default function TemplatesPage() {
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
              <h1 className="text-2xl font-bold text-gray-900">Templates de TV</h1>
            </div>
            <Button asChild>
              <Link href="/admin/templates/new">
                <Plus className="h-4 w-4 mr-2" />
                Novo Template
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        <Monitor className="h-5 w-5 mr-2 text-blue-600" />
                        {template.name}
                      </CardTitle>
                      <CardDescription className="mt-2">{template.description}</CardDescription>
                    </div>
                    <Badge variant={template.status === "ativo" ? "default" : "secondary"}>{template.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{template.tvCount} TVs usando este template</span>
                      <span>Última modificação: {template.lastModified}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/tv/${template.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          Visualizar
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/templates/${template.id}/edit`}>
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                        <Trash2 className="h-4 w-4" />
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
