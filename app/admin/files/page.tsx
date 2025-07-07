"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Upload,
  FolderPlus,
  Folder,
  ImageIcon,
  Video,
  FileText,
  Trash2,
  Search,
  ChevronRight,
  Home,
} from "lucide-react"
import Link from "next/link"

const initialFiles = [
  // Pasta raiz
  { id: "1", name: "Imagens", type: "folder", size: null, modified: "15/01/2024", path: "/" },
  { id: "2", name: "Videos", type: "folder", size: null, modified: "14/01/2024", path: "/" },
  { id: "3", name: "Documentos", type: "folder", size: null, modified: "13/01/2024", path: "/" },
  { id: "4", name: "banner-boas-vindas.jpg", type: "image", size: "2.4 MB", modified: "15/01/2024", path: "/" },

  // Dentro da pasta Imagens
  { id: "5", name: "Anuncios", type: "folder", size: null, modified: "12/01/2024", path: "/Imagens/" },
  { id: "6", name: "Eventos", type: "folder", size: null, modified: "11/01/2024", path: "/Imagens/" },
  { id: "7", name: "logo-empresa.png", type: "image", size: "1.2 MB", modified: "15/01/2024", path: "/Imagens/" },
  { id: "8", name: "fundo-apresentacao.jpg", type: "image", size: "3.1 MB", modified: "14/01/2024", path: "/Imagens/" },

  // Dentro da pasta Videos
  { id: "9", name: "intro-empresa.mp4", type: "video", size: "45.2 MB", modified: "12/01/2024", path: "/Videos/" },
  {
    id: "10",
    name: "treinamento-seguranca.mp4",
    type: "video",
    size: "78.5 MB",
    modified: "10/01/2024",
    path: "/Videos/",
  },

  // Dentro da pasta Imagens/Anuncios
  {
    id: "11",
    name: "lembrete-seguranca.png",
    type: "image",
    size: "1.8 MB",
    modified: "10/01/2024",
    path: "/Imagens/Anuncios/",
  },
  {
    id: "12",
    name: "nova-politica.jpg",
    type: "image",
    size: "2.2 MB",
    modified: "09/01/2024",
    path: "/Imagens/Anuncios/",
  },

  // Dentro da pasta Imagens/Eventos
  {
    id: "13",
    name: "festa-fim-ano.jpg",
    type: "image",
    size: "3.5 MB",
    modified: "08/01/2024",
    path: "/Imagens/Eventos/",
  },
  {
    id: "14",
    name: "workshop-tecnologia.png",
    type: "image",
    size: "2.8 MB",
    modified: "07/01/2024",
    path: "/Imagens/Eventos/",
  },
]

export default function FilesPage() {
  const [files, setFiles] = useState(initialFiles)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPath, setCurrentPath] = useState("/")

  const filteredFiles = files.filter(
    (file) => file.name.toLowerCase().includes(searchTerm.toLowerCase()) && file.path === currentPath,
  )

  const getIcon = (type: string) => {
    switch (type) {
      case "folder":
        return <Folder className="h-5 w-5 text-blue-600" />
      case "image":
        return <ImageIcon className="h-5 w-5 text-green-600" />
      case "video":
        return <Video className="h-5 w-5 text-purple-600" />
      default:
        return <FileText className="h-5 w-5 text-gray-600" />
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files
    if (uploadedFiles) {
      console.log("Arquivos para upload:", uploadedFiles)
      // Aqui você implementaria a lógica de upload real
    }
  }

  const createFolder = () => {
    const folderName = prompt("Digite o nome da pasta:")
    if (folderName) {
      const newFolder = {
        id: Date.now().toString(),
        name: folderName,
        type: "folder",
        size: null,
        modified: new Date().toLocaleDateString("pt-BR"),
        path: currentPath,
      }
      setFiles([...files, newFolder])
    }
  }

  const deleteFile = (fileId: string) => {
    if (confirm("Tem certeza que deseja excluir este item?")) {
      setFiles(files.filter((file) => file.id !== fileId))
    }
  }

  const navigateToFolder = (folderName: string) => {
    const newPath = currentPath === "/" ? `/${folderName}/` : `${currentPath}${folderName}/`
    setCurrentPath(newPath)
    setSearchTerm("") // Limpar busca ao navegar
  }

  const navigateUp = () => {
    if (currentPath === "/") return

    const pathParts = currentPath.split("/").filter((part) => part !== "")
    pathParts.pop() // Remove a última parte
    const newPath = pathParts.length === 0 ? "/" : `/${pathParts.join("/")}/`
    setCurrentPath(newPath)
  }

  const navigateToPath = (targetPath: string) => {
    setCurrentPath(targetPath)
    setSearchTerm("")
  }

  const getBreadcrumbs = () => {
    if (currentPath === "/") return [{ name: "Início", path: "/" }]

    const parts = currentPath.split("/").filter((part) => part !== "")
    const breadcrumbs = [{ name: "Início", path: "/" }]

    let buildPath = ""
    parts.forEach((part) => {
      buildPath += `/${part}`
      breadcrumbs.push({ name: part, path: `${buildPath}/` })
    })

    return breadcrumbs
  }

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
              <h1 className="text-2xl font-bold text-gray-900">Gerenciador de Arquivos</h1>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={createFolder}>
                <FolderPlus className="h-4 w-4 mr-2" />
                Nova Pasta
              </Button>
              <Button>
                <label className="flex items-center cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  Enviar Arquivos
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileUpload}
                    accept="image/*,video/*,.pdf,.doc,.docx"
                  />
                </label>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Navegação e Busca */}
          <div className="mb-6 space-y-4">
            {/* Breadcrumbs */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Localização:</span>
              <nav className="flex items-center space-x-1">
                {getBreadcrumbs().map((crumb, index) => (
                  <div key={crumb.path} className="flex items-center">
                    {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400 mx-1" />}
                    <button
                      onClick={() => navigateToPath(crumb.path)}
                      className={`text-sm px-2 py-1 rounded hover:bg-gray-100 ${
                        crumb.path === currentPath
                          ? "bg-blue-100 text-blue-700 font-medium"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {index === 0 ? <Home className="h-4 w-4" /> : crumb.name}
                    </button>
                  </div>
                ))}
              </nav>
            </div>

            {/* Controles de Navegação e Busca */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {currentPath !== "/" && (
                  <Button variant="outline" size="sm" onClick={navigateUp}>
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Voltar
                  </Button>
                )}
                <span className="text-sm text-gray-500">
                  {filteredFiles.length} {filteredFiles.length === 1 ? "item" : "itens"}
                </span>
              </div>
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Buscar arquivos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>

          {/* Lista de Arquivos */}
          <Card>
            <CardHeader>
              <CardTitle>Arquivos e Pastas</CardTitle>
              <CardDescription>Gerencie seus arquivos de mídia e organize-os em pastas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-200 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      {getIcon(file.type)}
                      <div>
                        <button
                          onClick={() => (file.type === "folder" ? navigateToFolder(file.name) : undefined)}
                          className={`font-medium text-gray-900 text-left ${
                            file.type === "folder" ? "hover:text-blue-600 cursor-pointer" : ""
                          }`}
                        >
                          {file.name}
                        </button>
                        <p className="text-sm text-gray-500">
                          {file.size && `${file.size} • `}Modificado em {file.modified}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {file.type !== "folder" && (
                        <Button variant="outline" size="sm">
                          Usar na TV
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteFile(file.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredFiles.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Folder className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>{searchTerm ? "Nenhum arquivo encontrado" : "Esta pasta está vazia"}</p>
                  {searchTerm ? (
                    <Button variant="outline" className="mt-2 bg-transparent" onClick={() => setSearchTerm("")}>
                      Limpar Busca
                    </Button>
                  ) : (
                    <div className="flex justify-center space-x-2 mt-4">
                      <Button variant="outline" onClick={createFolder}>
                        <FolderPlus className="h-4 w-4 mr-2" />
                        Criar Pasta
                      </Button>
                      <Button>
                        <label className="flex items-center cursor-pointer">
                          <Upload className="h-4 w-4 mr-2" />
                          Enviar Arquivos
                          <input
                            type="file"
                            multiple
                            className="hidden"
                            onChange={handleFileUpload}
                            accept="image/*,video/*,.pdf,.doc,.docx"
                          />
                        </label>
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
