
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileSpreadsheet, Clock, AlertCircle } from 'lucide-react';
import { Project } from '@/types';
import { getProjectSummary } from '@/utils/materialUtils';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { totalMaterials, pendingMaterials, recentChanges } = getProjectSummary(project);
  
  return (
    <Link to={`/projects/${project.id}`} className="block">
      <Card className="h-full transition-all duration-200 hover:border-primary hover:shadow-md material-card">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-bold">{project.name}</CardTitle>
            <Badge 
              variant={project.status === 'active' ? 'default' : project.status === 'completed' ? 'secondary' : 'outline'}
              className="capitalize"
            >
              {project.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{project.description}</p>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center text-muted-foreground">
                <FileSpreadsheet className="h-4 w-4 mr-1" />
                Materials
              </span>
              <span>{totalMaterials}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                Pending
              </span>
              <span>{pendingMaterials}</span>
            </div>
            
            {recentChanges > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center text-amber-500">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Changes
                </span>
                <Badge variant="outline" className="text-amber-500 border-amber-500">{recentChanges}</Badge>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-2 text-xs text-muted-foreground">
          Updated {new Date(project.updatedAt).toLocaleDateString()}
        </CardFooter>
      </Card>
    </Link>
  );
}
