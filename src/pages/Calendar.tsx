import { useState, useEffect } from 'react'; // Added imports
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar as CalendarIcon, List } from 'lucide-react'; // Added List icon
import { Calendar } from "@/components/ui/calendar"; // Import shadcn Calendar
import { Project } from '@/types'; // Import Project type
import { getUserProjectsMock as getUserProjects } from '@/utils/userUtils'; // Import mock projects
import { useAuth } from '@/App'; // Import useAuth

// Define a type for calendar events
interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'deadline' | 'task' | 'meeting'; // Example types
  projectId?: string;
}

const CalendarPage = () => {
  const { userId } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  // Load mock project data to generate events
  useEffect(() => {
    if (userId) {
      const userProjects = getUserProjects(userId);
      setProjects(userProjects);
      
      // Generate mock events from project deadlines
      const projectEvents: CalendarEvent[] = userProjects
        .filter(p => p.endDate) // Filter projects with end dates
        .map(p => ({
          id: `proj_deadline_${p.id}`,
          title: `${p.name} - Deadline`,
          date: new Date(p.endDate),
          type: 'deadline',
          projectId: p.id,
        }));
        
      // TODO: Add events from project tasks later
      
      setEvents(projectEvents);
    }
  }, [userId]);

  // Filter events for the selected date
  const eventsForSelectedDate = events.filter(event => 
     selectedDate && event.date.toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Project Calendar</h1>

      <Card>
        <CardHeader>
          <CardTitle>Project Calendar</CardTitle>
          <CardDescription>View project deadlines and upcoming tasks.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Calendar Component */}
          <div className="md:col-span-1 flex justify-center">
             <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
          </div>
          {/* Events List */}
          <div className="md:col-span-2">
             <h3 className="text-lg font-semibold mb-3">
               Events for {selectedDate ? selectedDate.toLocaleDateString() : 'selected date'}
             </h3>
             {eventsForSelectedDate.length > 0 ? (
               <ul className="space-y-3">
                 {eventsForSelectedDate.map(event => (
                   <li key={event.id} className="flex items-center p-3 bg-muted/50 rounded-md">
                     <CalendarIcon className="h-4 w-4 mr-3 text-primary" />
                     <div>
                       <p className="text-sm font-medium">{event.title}</p>
                       {event.projectId && (
                         <p className="text-xs text-muted-foreground">
                           Project: {projects.find(p => p.id === event.projectId)?.name || 'Unknown'}
                         </p>
                       )}
                     </div>
                   </li>
                 ))}
               </ul>
             ) : (
               <div className="text-center py-8 text-muted-foreground">
                 <List className="mx-auto h-10 w-10 mb-2 opacity-50" />
                 <p>No events scheduled for this date.</p>
               </div>
             )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarPage;
