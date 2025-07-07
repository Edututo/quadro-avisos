"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, Eye } from "lucide-react"
import Link from "next/link"

export default function NewTemplatePage() {
  const [templateData, setTemplateData] = useState({
    name: "",
    description: "",
    transitionType: "fade",
    slideDuration: "5",
    autoPlay: true,
    showClock: false,
    backgroundColor: "#000000",
  })

  const handleSave = () => {
    // Here you would save the template to your database
    console.log("Saving template:", templateData)
    // Redirect to templates page after saving
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Button variant="ghost" asChild className="mr-4">
                <Link href="/admin/templates">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar aos Templates
                </Link>
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Criar Novo Template</h1>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Visualizar
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Salvar Template
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Template Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Template</CardTitle>
                <CardDescription>Configure as definições básicas para seu template de TV</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome do Template</Label>
                  <Input
                    id="name"
                    value={templateData.name}
                    onChange={(e) => setTemplateData({ ...templateData, name: e.target.value })}
                    placeholder="Digite o nome do template"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={templateData.description}
                    onChange={(e) => setTemplateData({ ...templateData, description: e.target.value })}
                    placeholder="Descreva este template"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="transition">Tipo de Transição</Label>
                  <Select
                    value={templateData.transitionType}
                    onValueChange={(value) => setTemplateData({ ...templateData, transitionType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fade">Desvanecer</SelectItem>
                      <SelectItem value="slide">Deslizar</SelectItem>
                      <SelectItem value="zoom">Zoom</SelectItem>
                      <SelectItem value="none">Nenhuma</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="duration">Duração do Slide (segundos)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={templateData.slideDuration}
                    onChange={(e) => setTemplateData({ ...templateData, slideDuration: e.target.value })}
                    min="1"
                    max="60"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Display Options */}
            <Card>
              <CardHeader>
                <CardTitle>Opções de Exibição</CardTitle>
                <CardDescription>Personalize a aparência e comportamento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoplay">Reprodução Automática</Label>
                    <p className="text-sm text-gray-500">Iniciar slideshow automaticamente</p>
                  </div>
                  <Switch
                    id="autoplay"
                    checked={templateData.autoPlay}
                    onCheckedChange={(checked) => setTemplateData({ ...templateData, autoPlay: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="clock">Mostrar Relógio</Label>
                    <p className="text-sm text-gray-500">Exibir horário atual</p>
                  </div>
                  <Switch
                    id="clock"
                    checked={templateData.showClock}
                    onCheckedChange={(checked) => setTemplateData({ ...templateData, showClock: checked })}
                  />
                </div>

                <div>
                  <Label htmlFor="bgcolor">Cor de Fundo</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="bgcolor"
                      type="color"
                      value={templateData.backgroundColor}
                      onChange={(e) => setTemplateData({ ...templateData, backgroundColor: e.target.value })}
                      className="w-16 h-10"
                    />
                    <Input
                      value={templateData.backgroundColor}
                      onChange={(e) => setTemplateData({ ...templateData, backgroundColor: e.target.value })}
                      placeholder="#000000"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* HTML Template Preview */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Template HTML Gerado</CardTitle>
                <CardDescription>Este é o código HTML que será gerado para TVs usando este template</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${templateData.name || "Exibição de TV"}</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: ${templateData.backgroundColor};
            font-family: Arial, sans-serif;
            overflow: hidden;
        }
        .slideshow-container {
            position: relative;
            width: 100vw;
            height: 100vh;
        }
        .slide {
            display: none;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .slide.active {
            display: block;
        }
        ${
          templateData.showClock
            ? `
        .clock {
            position: absolute;
            top: 20px;
            right: 20px;
            color: white;
            font-size: 24px;
            background: rgba(0,0,0,0.5);
            padding: 10px;
            border-radius: 5px;
        }`
            : ""
        }
    </style>
</head>
<body>
    <div class="slideshow-container">
        <!-- Slides will be loaded here -->
        ${templateData.showClock ? '<div class="clock" id="clock"></div>' : ""}
    </div>
    <script>
        // Slideshow logic will be generated here
        const slideDuration = ${templateData.slideDuration}000;
        const transitionType = '${templateData.transitionType}';
        // ... slideshow implementation
    </script>
</body>
</html>`}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
