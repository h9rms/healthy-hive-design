
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Heart, MessageSquare, Bookmark, Edit, Save, Camera, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const mockUserPosts = [
  {
    id: 1,
    title: "Meine Fitness-Reise: Von 0 auf 100",
    excerpt: "Wie ich in 6 Monaten mein Leben verändert habe...",
    date: "2024-01-20",
    likes: 15,
    comments: 5,
    tags: ["Motivation", "Fitness"]
  },
  {
    id: 2,
    title: "5 einfache Rezepte für den Alltag",
    excerpt: "Gesund kochen muss nicht kompliziert sein...",
    date: "2024-01-18",
    likes: 23,
    comments: 8,
    tags: ["Rezepte", "Ernährung"]
  }
];

const mockLikedPosts = [
  {
    id: 3,
    title: "HIIT Workout für Anfänger",
    author: "Max Kraft",
    date: "2024-01-15",
    tags: ["Fitness", "HIIT"]
  },
  {
    id: 4,
    title: "Superfoods im Überblick",
    author: "Lisa Grün",
    date: "2024-01-12",
    tags: ["Ernährung", "Superfoods"]
  }
];

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Sarah Mueller",
    email: "sarah@beispiel.com",
    bio: "Fitness-Enthusiastin und Ernährungsberaterin. Teile gerne meine Tipps für ein gesundes Leben! 🌱💪",
    location: "München, Deutschland",
    joinDate: "Januar 2024"
  });
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast.success("Profil erfolgreich aktualisiert!");
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950">
      {/* Header */}
      <div className="border-b border-emerald-100 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zur Startseite
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8 border-emerald-100 dark:border-slate-700 bg-white dark:bg-slate-800">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-emerald-200 dark:border-emerald-700">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" />
                  <AvatarFallback className="text-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                    SM
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 rounded-full p-2 bg-white dark:bg-slate-800 border-emerald-200 dark:border-emerald-700"
                >
                  <Camera className="h-3 w-3" />
                </Button>
              </div>

              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-slate-700 dark:text-slate-300">Name</Label>
                      <Input
                        id="name"
                        value={editedProfile.name}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                        className="border-emerald-200 focus:border-emerald-400 dark:border-slate-600"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio" className="text-slate-700 dark:text-slate-300">Bio</Label>
                      <Textarea
                        id="bio"
                        value={editedProfile.bio}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
                        className="border-emerald-200 focus:border-emerald-400 dark:border-slate-600"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location" className="text-slate-700 dark:text-slate-300">Standort</Label>
                      <Input
                        id="location"
                        value={editedProfile.location}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, location: e.target.value }))}
                        className="border-emerald-200 focus:border-emerald-400 dark:border-slate-600"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                      {profile.name}
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                      {profile.bio}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                      <span>📍 {profile.location}</span>
                      <span>📅 Dabei seit {profile.joinDate}</span>
                      <span>✉️ {profile.email}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button
                      onClick={handleSave}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Speichern
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      Abbrechen
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Bearbeiten
                  </Button>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8 pt-6 border-t border-emerald-100 dark:border-slate-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {mockUserPosts.length}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {mockUserPosts.reduce((sum, post) => sum + post.likes, 0)}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Likes erhalten</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {mockLikedPosts.length}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Posts geliked</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white dark:bg-slate-800 border border-emerald-100 dark:border-slate-700">
            <TabsTrigger value="posts" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700 dark:data-[state=active]:bg-emerald-900 dark:data-[state=active]:text-emerald-300">
              Meine Posts
            </TabsTrigger>
            <TabsTrigger value="liked" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700 dark:data-[state=active]:bg-emerald-900 dark:data-[state=active]:text-emerald-300">
              Gelikte Posts
            </TabsTrigger>
            <TabsTrigger value="bookmarks" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700 dark:data-[state=active]:bg-emerald-900 dark:data-[state=active]:text-emerald-300">
              Gespeichert
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6">
            {mockUserPosts.map(post => (
              <Card key={post.id} className="border-emerald-100 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-slate-900 dark:text-slate-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                        <Link to={`/post/${post.id}`}>{post.title}</Link>
                      </CardTitle>
                      <p className="text-slate-600 dark:text-slate-300 mt-2">{post.excerpt}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-slate-500 hover:text-emerald-600">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {post.comments}
                      </span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="liked" className="space-y-6">
            {mockLikedPosts.map(post => (
              <Card key={post.id} className="border-emerald-100 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-900 dark:text-slate-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                  </CardTitle>
                  <p className="text-slate-500 dark:text-slate-400">von {post.author} • {post.date}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="bookmarks" className="space-y-6">
            <div className="text-center py-12">
              <Bookmark className="h-16 w-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Noch keine gespeicherten Posts
              </h3>
              <p className="text-slate-500 dark:text-slate-400">
                Speichere interessante Posts, um sie später zu lesen.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
