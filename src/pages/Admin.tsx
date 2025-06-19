
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Trash2, Plus, Users, FileText, MessageSquare, TrendingUp, ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const mockStats = {
  totalPosts: 24,
  totalUsers: 156,
  totalComments: 89,
  monthlyViews: 2847
};

const mockPosts = [
  {
    id: 1,
    title: "5 Superfoods für mehr Energie im Alltag",
    author: "Sarah Meyer",
    date: "2024-01-15",
    status: "published",
    views: 245,
    likes: 24,
    comments: 8
  },
  {
    id: 2,
    title: "HIIT Workout für Anfänger - 15 Minuten Power",
    author: "Max Kraft",
    date: "2024-01-12",
    status: "published",
    views: 189,
    likes: 31,
    comments: 12
  },
  {
    id: 3,
    title: "Meal Prep Guide für die ganze Woche",
    author: "Lisa Grün",
    date: "2024-01-10",
    status: "draft",
    views: 0,
    likes: 0,
    comments: 0
  }
];

const mockUsers = [
  {
    id: 1,
    name: "Sarah Meyer",
    email: "sarah@beispiel.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    joinDate: "2024-01-15",
    posts: 3,
    role: "user"
  },
  {
    id: 2,
    name: "Max Kraft",
    email: "max@beispiel.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",  
    joinDate: "2024-01-12",
    posts: 5,
    role: "user"
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@fitblog.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    joinDate: "2024-01-01",
    posts: 12,
    role: "admin"
  }
];

const AdminPage = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDeletePost = (postId: number) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
    toast.success("Post erfolgreich gelöscht!");
  };

  const handleToggleUserRole = (userId: number) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, role: user.role === 'admin' ? 'user' : 'admin' }
        : user
    ));
    toast.success("Benutzerrolle geändert!");
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950">
      {/* Header */}
      <div className="border-b border-emerald-100 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="inline-flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zur Startseite
            </Link>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Admin Dashboard
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-emerald-100 dark:border-slate-700 bg-white dark:bg-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Gesamt Posts
              </CardTitle>
              <FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {mockStats.totalPosts}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                +2 seit letztem Monat
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-100 dark:border-slate-700 bg-white dark:bg-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Benutzer
              </CardTitle>
              <Users className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {mockStats.totalUsers}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                +12 seit letztem Monat
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-100 dark:border-slate-700 bg-white dark:bg-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Kommentare
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {mockStats.totalComments}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                +7 seit letzter Woche
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-100 dark:border-slate-700 bg-white dark:bg-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Monatliche Aufrufe
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {mockStats.monthlyViews.toLocaleString()}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                +15% seit letztem Monat
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Content Management */}
        <Tabs defaultValue="posts" className="space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <TabsList className="bg-white dark:bg-slate-800 border border-emerald-100 dark:border-slate-700">
              <TabsTrigger value="posts" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700 dark:data-[state=active]:bg-emerald-900 dark:data-[state=active]:text-emerald-300">
                Posts verwalten
              </TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700 dark:data-[state=active]:bg-emerald-900 dark:data-[state=active]:text-emerald-300">
                Benutzer verwalten
              </TabsTrigger>
            </TabsList>

            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Suchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-emerald-200 focus:border-emerald-400 dark:border-slate-600"
                />
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Neu erstellen
              </Button>
            </div>
          </div>

          <TabsContent value="posts" className="space-y-6">
            {filteredPosts.map(post => (
              <Card key={post.id} className="border-emerald-100 dark:border-slate-700 bg-white dark:bg-slate-800">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                          {post.title}
                        </h3>
                        <Badge 
                          variant={post.status === 'published' ? 'default' : 'secondary'}
                          className={post.status === 'published' 
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
                            : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                          }
                        >
                          {post.status === 'published' ? 'Veröffentlicht' : 'Entwurf'}
                        </Badge>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 mb-3">
                        von {post.author} • {post.date}
                      </p>
                      <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                        <span>{post.views} Aufrufe</span>
                        <span>{post.likes} Likes</span>
                        <span>{post.comments} Kommentare</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300">
                        <Edit className="h-4 w-4 mr-2" />
                        Bearbeiten
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeletePost(post.id)}
                        className="border-red-200 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-300"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Löschen
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            {filteredUsers.map(user => (
              <Card key={user.id} className="border-emerald-100 dark:border-slate-700 bg-white dark:bg-slate-800">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                            {user.name}
                          </h3>
                          <Badge 
                            variant={user.role === 'admin' ? 'default' : 'secondary'}
                            className={user.role === 'admin'
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
                              : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                            }
                          >
                            {user.role === 'admin' ? 'Admin' : 'Benutzer'}
                          </Badge>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 mb-2">
                          {user.email}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                          <span>Mitglied seit {user.joinDate}</span>
                          <span>{user.posts} Posts</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleToggleUserRole(user.id)}
                        className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300"
                      >
                        {user.role === 'admin' ? 'Als User setzen' : 'Als Admin setzen'}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-red-200 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-300"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Löschen
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
