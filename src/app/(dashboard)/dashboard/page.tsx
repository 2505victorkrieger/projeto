import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, FolderOpen, CheckSquare } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8 p-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bem-vindo de volta!</h1>
        <p className="text-muted-foreground mt-1">
          Aqui está um resumo do que está acontecendo no seu negócio hoje.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 novos este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projetos Ativos</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              3 em andamento
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tarefas Pendentes</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              2 urgentes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 8.500</div>
            <p className="text-xs text-muted-foreground">
              +15% vs mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Projects Section */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Projetos Ativos</CardTitle>
            <CardDescription>
              Seus projetos em andamento e progresso
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Landing Page - Tech Startup", client: "Tech Corp", progress: 75, status: "Em andamento" },
                { name: "App Mobile - Delivery", client: "Food Service", progress: 50, status: "Em andamento" },
                { name: "Sistema CRM", client: "Consultoria", progress: 90, status: "Revisão" },
              ].map((project) => (
                <div key={project.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{project.name}</p>
                      <p className="text-xs text-muted-foreground">{project.client}</p>
                    </div>
                    <Badge variant="secondary">{project.status}</Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>
              Últimas atualizações
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Projeto atualizado", time: "Há 2 horas" },
                { action: "Novo cliente adicionado", time: "Há 5 horas" },
                { action: "Tarefa concluída", time: "Ontem" },
                { action: "Proposta enviada", time: "2 dias atrás" },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
