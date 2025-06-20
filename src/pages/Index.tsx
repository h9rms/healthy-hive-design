import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageSquare, Share2, Bookmark, Search, Filter, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { toast } from "sonner";

// Mock data - in real app this would come from your backend
const mockPosts = [
  {
    id: 1,
    title: "5 Superfoods für mehr Energie im Alltag",
    excerpt: "Entdecke natürliche Energiequellen, die deinen Tag revolutionieren werden...",
    image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400&h=300&fit=crop",
    author: "Sarah Meyer",
    authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    date: "2024-01-15",
    tags: ["Ernährung", "Superfoods", "Energie"],
    likes: 24,
    comments: 8,
    liked: false,
    bookmarked: false
  },
  {
    id: 2,
    title: "HIIT Workout für Anfänger - 15 Minuten Power",
    excerpt: "Effektives Training auch mit wenig Zeit - so geht's richtig...",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    author: "Max Kraft",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    date: "2024-01-12",
    tags: ["Fitness", "HIIT", "Anfänger"],
    likes: 31,
    comments: 12,
    liked: true,
    bookmarked: true
  },
  {
    id: 3,
    title: "Meal Prep: 7 Tage gesunde Ernährung vorbereiten",
    excerpt: "So planst du eine ganze Woche voller nährstoffreicher Mahlzeiten...",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    author: "Lisa Grün",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    date: "2024-01-10",
    tags: ["Meal Prep", "Ernährung", "Planung"],
    likes: 45,
    comments: 19,
    liked: false,
    bookmarked: false
  }
];

const HomePage = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const { theme, setTheme } = useTheme();

  const allTags = Array.from(new Set(mockPosts.flatMap(post => post.tags)));

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => post.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const handleLike = (postId: number) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked, 
            likes: post.liked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
    toast.success("Post geliked!");
  };

  const handleBookmark = (postId: number) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, bookmarked: !post.bookmarked }
        : post
    ));
    toast.success("Post gespeichert!");
  };

  const handleShare = (post: any) => {
    navigator.share?.({
      title: post.title,
      text: post.excerpt,
      url: window.location.href
    }) || toast.success("Link kopiert!");
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-emerald-100 dark:border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                🌱 FitBlog
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link to="/" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Home
                </Link>
                <Link to="/profile" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Profil
                </Link>
                <Link to="/admin" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Admin
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-slate-700 dark:text-slate-300"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Link to="/login">
                <Button variant="outline" size="sm" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Registrieren
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filter Bar */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Nach Posts suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-emerald-200 focus:border-emerald-400 dark:border-slate-700"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Tag Filters */}
        {showFilters && (
          <div className="mb-8 p-4 bg-white dark:bg-slate-800 rounded-xl border border-emerald-100 dark:border-slate-700">
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Nach Tags filtern:</h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    selectedTags.includes(tag) 
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                      : "border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300"
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 border-emerald-100 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden flex flex-col h-full">
              <div className="relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleBookmark(post.id)}
                    className={`bg-white/80 hover:bg-white transition-colors ${
                      post.bookmarked ? "text-emerald-600" : "text-slate-600"
                    }`}
                  >
                    <Bookmark className={`h-4 w-4 ${post.bookmarked ? "fill-current" : ""}`} />
                  </Button>
                </div>
              </div>
              
              <CardHeader className="pb-3 flex-shrink-0">
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={post.authorAvatar} />
                    <AvatarFallback>{post.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{post.author}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{post.date}</p>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 min-h-[3.5rem]">
                  {post.title}
                </h3>
              </CardHeader>
              
              <CardContent className="pt-0 flex flex-col flex-grow">
                <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4 min-h-[2rem]">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center space-x-4">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleLike(post.id)}
                      className={`transition-colors ${
                        post.liked ? "text-red-500" : "text-slate-500 hover:text-red-500"
                      }`}
                    >
                      <Heart className={`h-4 w-4 mr-1 ${post.liked ? "fill-current" : ""}`} />
                      {post.likes}
                    </Button>
                    
                    <Link to={`/post/${post.id}`}>
                      <Button size="sm" variant="ghost" className="text-slate-500 hover:text-emerald-600">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {post.comments}
                      </Button>
                    </Link>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleShare(post)}
                      className="text-slate-500 hover:text-emerald-600"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Link to={`/post/${post.id}`}>
                    <Button size="sm" variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300">
                      Lesen
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400 text-lg">Keine Posts gefunden.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
