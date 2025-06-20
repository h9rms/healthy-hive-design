
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageSquare, Share2, Bookmark, ArrowLeft, Send } from "lucide-react";
import { toast } from "sonner";

const mockPost = {
  id: 1,
  title: "5 Superfoods für mehr Energie im Alltag",
  content: `
    <p>In unserem hektischen Alltag ist es oft schwierig, die nötige Energie aufzubringen. Hier sind 5 Superfoods, die dir dabei helfen können:</p>
    
    <h3>1. Quinoa - Das Kraftpaket</h3>
    <p>Quinoa ist reich an Protein und komplexen Kohlenhydraten, die für langanhaltende Energie sorgen. Perfekt als Basis für Salate oder als Beilage.</p>
    
    <h3>2. Blaubeeren - Antioxidantien-Bomben</h3>
    <p>Diese kleinen Früchte sind voller Antioxidantien und Vitamine, die dein Immunsystem stärken und für geistige Klarheit sorgen.</p>
    
    <h3>3. Spinat - Der grüne Energielieferant</h3>
    <p>Reich an Eisen und Folsäure, hilft Spinat dabei, Müdigkeit zu bekämpfen und die Konzentration zu verbessern.</p>
    
    <h3>4. Nüsse - Gesunde Fette</h3>
    <p>Mandeln, Walnüsse und Co. liefern gesunde Fette und Protein für nachhaltigen Energieschub ohne Zuckerhoch.</p>
    
    <h3>5. Grüner Tee - Sanfter Wachmacher</h3>
    <p>Eine gesunde Alternative zu Kaffee, die Energie liefert ohne den Crash danach.</p>
    
    <p><strong>Fazit:</strong> Integriere diese Superfoods schrittweise in deine Ernährung und spüre den Unterschied!</p>
  `,
  image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&h=400&fit=crop",
  author: "Sarah Meyer",
  authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
  date: "15. Januar 2024",
  tags: ["Ernährung", "Superfoods", "Energie"],
  likes: 24,
  comments: 8,
  liked: false,
  bookmarked: false
};

const mockComments = [
  {
    id: 1,
    author: "Max Müller",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    content: "Super hilfreicher Artikel! Ich hab schon angefangen, mehr Quinoa zu essen.",
    date: "vor 2 Tagen",
    likes: 3
  },
  {
    id: 2,
    author: "Lisa Schmidt",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    content: "Grüner Tee ist wirklich ein Game-changer! Danke für die Tipps 🙏",
    date: "vor 1 Tag",
    likes: 5
  }
];

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(mockPost);
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    setPost(prev => ({
      ...prev,
      liked: !prev.liked,
      likes: prev.liked ? prev.likes - 1 : prev.likes + 1
    }));
    toast.success("Post geliked!");
  };

  const handleBookmark = () => {
    setPost(prev => ({ ...prev, bookmarked: !prev.bookmarked }));
    toast.success("Post gespeichert!");
  };

  const handleShare = () => {
    navigator.share?.({
      title: post.title,
      text: "Schau dir diesen tollen Artikel an!",
      url: window.location.href
    }) || toast.success("Link kopiert!");
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: comments.length + 1,
      author: "Du",
      authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      content: newComment,
      date: "gerade eben",
      likes: 0
    };

    setComments(prev => [...prev, comment]);
    setNewComment("");
    toast.success("Kommentar hinzugefügt!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950">
      {/* Header */}
      <div className="border-b border-emerald-100 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zum Feed
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Post Header */}
        <div className="mb-8">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Post Content */}
        <Card className="mb-8 border-emerald-100 dark:border-slate-700 bg-white dark:bg-slate-800">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={post.authorAvatar} />
                <AvatarFallback>{post.author[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-100">{post.author}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{post.date}</p>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-emerald-100 dark:border-slate-700">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={handleLike}
                  className={`transition-colors ${
                    post.liked ? "text-red-500" : "text-slate-500 hover:text-red-500"
                  }`}
                >
                  <Heart className={`h-5 w-5 mr-2 ${post.liked ? "fill-current" : ""}`} />
                  {post.likes}
                </Button>

                <Button variant="ghost" className="text-slate-500 hover:text-emerald-600">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  {post.comments}
                </Button>

                <Button
                  variant="ghost"
                  onClick={handleShare}
                  className="text-slate-500 hover:text-emerald-600"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <Button
                variant="ghost"
                onClick={handleBookmark}
                className={`transition-colors ${
                  post.bookmarked ? "text-emerald-600" : "text-slate-500 hover:text-emerald-600"
                }`}
              >
                <Bookmark className={`h-5 w-5 ${post.bookmarked ? "fill-current" : ""}`} />
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <div 
              className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-emerald-700 dark:prose-headings:text-emerald-400 prose-p:text-slate-700 dark:prose-p:text-slate-300"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card className="border-emerald-100 dark:border-slate-700 bg-white dark:bg-slate-800">
          <CardHeader>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Kommentare ({comments.length})
            </h3>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <Textarea
                placeholder="Schreibe einen Kommentar..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="border-emerald-200 focus:border-emerald-400 dark:border-slate-600 dark:focus:border-emerald-400"
                rows={3}
              />
              <Button 
                type="submit" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                disabled={!newComment.trim()}
              >
                <Send className="h-4 w-4 mr-2" />
                Kommentar senden
              </Button>
            </form>

            {/* Comments List */}
            <div className="space-y-6 pt-6 border-t border-emerald-100 dark:border-slate-700">
              {comments.map(comment => (
                <div key={comment.id} className="flex space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={comment.authorAvatar} />
                    <AvatarFallback>{comment.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                          {comment.author}
                        </span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {comment.date}
                        </span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300">
                        {comment.content}
                      </p>
                    </div>
                    <div className="flex items-center mt-2">
                      <Button variant="ghost" size="sm" className="text-slate-500 hover:text-red-500">
                        <Heart className="h-4 w-4 mr-1" />
                        {comment.likes}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostDetailPage;
