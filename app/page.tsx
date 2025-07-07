import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Monitor, Settings, FileText, Folder, Plus } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Monitor className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Sistema de Painel de TV</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Painel do Administrador</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* TV Templates */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-blue-600" />
                  Templates de TV
                </CardTitle>
                <CardDescription>Crie e gerencie templates de exibição para suas TVs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Projete layouts personalizados e configure as definições de exibição para diferentes configurações
                    de TV.
                  </p>
                  <div className="flex space-x-2">
                    <Button asChild className="flex-1">
                      <Link href="/admin/templates">
                        <Settings className="h-4 w-4 mr-2" />
                        Gerenciar Templates
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/admin/templates/new">
                        <Plus className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Manager */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Monitor className="h-5 w-5 mr-2 text-green-600" />
                  Gerenciador de Conteúdo
                </CardTitle>
                <CardDescription>Gerencie qual conteúdo é exibido em cada TV</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Atribua slides, vídeos e mídia a TVs específicas e monitore seu status.
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/admin/content">
                      <FileText className="h-4 w-4 mr-2" />
                      Gerenciar Conteúdo
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* File Manager */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Folder className="h-5 w-5 mr-2 text-orange-600" />
                  Gerenciador de Arquivos
                </CardTitle>
                <CardDescription>Faça upload e organize arquivos de mídia e pastas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Faça upload de imagens, vídeos e organize-os em pastas para fácil gerenciamento.
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/admin/files">
                      <Folder className="h-4 w-4 mr-2" />
                      Gerenciar Arquivos
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Visão Geral do Sistema</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center">
                  <Monitor className="h-8 w-8 text-blue-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">TVs Ativas</p>
                    <p className="text-2xl font-semibold text-gray-900">3</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center">
                  <Settings className="h-8 w-8 text-green-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Templates</p>
                    <p className="text-2xl font-semibold text-gray-900">2</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-orange-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Arquivos de Mídia</p>
                    <p className="text-2xl font-semibold text-gray-900">24</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center">
                  <Folder className="h-8 w-8 text-purple-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Pastas</p>
                    <p className="text-2xl font-semibold text-gray-900">8</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
