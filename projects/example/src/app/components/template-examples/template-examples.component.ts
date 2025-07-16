// projects/example/src/app/components/template-examples/template-examples.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleDatatableComponent, SlotDirective, Column } from 'ngx-simple-datatable';
import { ExampleCardComponent } from '../example-card/example-card.component';
import { SPANISH_TEXTS } from '../../../../../ngx-simple-datatable/src/lib/presets/text-presets';

interface ProjectUser {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  skills: string[];
  rating: number;
  progress: number;
  lastActivity: Date;
  joinDate: Date;
  profileComplete: number;
  badges: { name: string; color: string }[];
  socialLinks: { platform: string; url: string }[];
  department: string;
  manager: string;
}

@Component({
  selector: 'app-template-examples',
  standalone: true,
  imports: [CommonModule, SimpleDatatableComponent, SlotDirective, ExampleCardComponent],
  templateUrl: './template-examples.component.html',
})
export class TemplateExamplesComponent {
  loading = signal(false);

  users = signal<ProjectUser[]>([
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@company.com',
      avatar: 'https://i.pravatar.cc/40?img=1',
      role: 'Senior Developer',
      status: 'active',
      skills: ['Angular', 'TypeScript', 'Node.js', 'Docker'],
      rating: 4.8,
      progress: 85,
      lastActivity: new Date(),
      joinDate: new Date('2023-01-15'),
      profileComplete: 95,
      badges: [
        { name: 'Expert', color: 'bg-purple-100 text-purple-800' },
        { name: 'Mentor', color: 'bg-blue-100 text-blue-800' },
      ],
      socialLinks: [
        { platform: 'github', url: 'https://github.com/alice' },
        { platform: 'linkedin', url: 'https://linkedin.com/in/alice' },
      ],
      department: 'Engineering',
      manager: 'John Smith',
    },
    {
      id: 2,
      name: 'Bob Wilson',
      email: 'bob@company.com',
      avatar: 'https://i.pravatar.cc/40?img=2',
      role: 'UX Designer',
      status: 'pending',
      skills: ['Figma', 'Sketch', 'Prototyping', 'User Research'],
      rating: 4.6,
      progress: 60,
      lastActivity: new Date(Date.now() - 86400000),
      joinDate: new Date('2023-03-10'),
      profileComplete: 75,
      badges: [{ name: 'Creative', color: 'bg-pink-100 text-pink-800' }],
      socialLinks: [
        { platform: 'dribbble', url: 'https://dribbble.com/bob' },
        { platform: 'behance', url: 'https://behance.net/bob' },
      ],
      department: 'Design',
      manager: 'Sarah Lee',
    },
    {
      id: 3,
      name: 'Carol Davis',
      email: 'carol@company.com',
      avatar: 'https://i.pravatar.cc/40?img=3',
      role: 'Product Manager',
      status: 'inactive',
      skills: ['Strategy', 'Analytics', 'Roadmapping', 'Agile'],
      rating: 4.9,
      progress: 40,
      lastActivity: new Date(Date.now() - 604800000),
      joinDate: new Date('2022-08-20'),
      profileComplete: 88,
      badges: [
        { name: 'Leader', color: 'bg-green-100 text-green-800' },
        { name: 'Strategist', color: 'bg-indigo-100 text-indigo-800' },
      ],
      socialLinks: [
        { platform: 'linkedin', url: 'https://linkedin.com/in/carol' },
        { platform: 'twitter', url: 'https://twitter.com/carol' },
      ],
      department: 'Product',
      manager: 'Michael Brown',
    },
  ]);

  columns = signal<Column[]>([
    { field: 'userInfo', title: 'User Info', width: '280px', sort: false, filter: false },
    { field: 'skillsBadges', title: 'Skills', width: '200px', sort: false, filter: false },
    { field: 'status', title: 'Status', width: '120px', sort: true, filter: true, type: 'string' },
    { field: 'rating', title: 'Rating', width: '140px', sort: true, filter: true, type: 'number' },
    { field: 'progress', title: 'Progress', width: '160px', sort: true, filter: true, type: 'number' },
    { field: 'socialLinks', title: 'Social', width: '120px', sort: false, filter: false },
    { field: 'actions', title: 'Actions', width: '120px', sort: false, filter: false },
  ]);

  getStatusClass(status: string): string {
    const classes = {
      active: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400',
      inactive: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400',
    };
    return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800';
  }

  getProgressColor(progress: number): string {
    if (progress >= 80) return 'bg-emerald-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-amber-500';
    return 'bg-red-500';
  }

  formatTimeAgo(date: Date): string {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${diffInDays}d ago`;
  }

  getSocialIcon(platform: string): string {
    const icons = {
      github: '🐙',
      linkedin: '💼',
      twitter: '🐦',
      dribbble: '🏀',
      behance: '🎨',
    };
    return icons[platform as keyof typeof icons] || '🔗';
  }

  onAction(action: string, user: ProjectUser) {
    console.log(`Action: ${action} for user:`, user);
    alert(`${action} action for ${user.name}`);
  }

  protected readonly SPANISH_TEXTS = SPANISH_TEXTS;
}
