import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react'; // Use MessageCircle icon

const MessagesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>

      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <CardDescription>View and manage your project communications.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-16 text-muted-foreground">
            <MessageCircle className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p>Messaging functionality is coming soon.</p>
            <p className="text-sm">This section will allow team communication within projects.</p>
          </div>
          {/* Placeholder for messaging components */}
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagesPage;
