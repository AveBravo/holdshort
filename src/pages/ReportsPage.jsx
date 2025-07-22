import React from 'react';
import {
  Breadcrumbs,
  BreadcrumbItem,
  Tabs,
  Tab,
  Input,
  Button,
  Select,
  SelectItem,
  Chip,
  Tooltip,
  Divider
} from '@heroui/react';
import {
  Home,
  FileText,
  Download,
  Calendar,
  Search,
  Filter,
  Plus,
  Plane,
  Users,
  Clock,
  AlertTriangle,
  BarChart,
  TrendingUp
} from 'lucide-react';

const reportTypes = [
  {
    category: "Flight Operations",
    reports: [
      { id: 1, name: "Daily Pilot Schedule", description: "Daily schedule and flight assignments", icon: Calendar },
      { id: 2, name: "Aircraft Utilization", description: "Aircraft usage and efficiency metrics", icon: Plane },
      { id: 3, name: "Instructor Activity", description: "Instructor hours and student assignments", icon: Users },
    ]
  },
  {
    category: "Maintenance",
    reports: [
      { id: 4, name: "Maintenance Due", description: "Upcoming maintenance requirements", icon: Clock },
      { id: 5, name: "Discrepancy Reports", description: "Aircraft issues and resolutions", icon: AlertTriangle },
      { id: 6, name: "Component Hours", description: "Time tracking for aircraft components", icon: Clock },
    ]
  },
  {
    category: "Financial",
    reports: [
      { id: 7, name: "Revenue Analysis", description: "Income breakdown by category", icon: BarChart },
      { id: 8, name: "Student Billing", description: "Student payment and billing status", icon: Users },
      { id: 9, name: "Growth Metrics", description: "Business performance indicators", icon: TrendingUp },
    ]
  }
];

const dateRanges = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 Days", value: "7days" },
  { label: "Last 30 Days", value: "30days" },
  { label: "This Month", value: "thisMonth" },
  { label: "Last Month", value: "lastMonth" },
  { label: "Custom Range", value: "custom" },
];

export default function ReportsPage() {
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [dateRange, setDateRange] = React.useState("7days");
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-8">
        <Breadcrumbs size="lg">
          <BreadcrumbItem startContent={<Home className="w-4 h-4" />}>
            Home
          </BreadcrumbItem>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <BreadcrumbItem startContent={<FileText className="w-4 h-4" />}>
            Reports
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Reports</h1>
          <p className="text-default-500">
            Generate and analyze detailed reports for your flight operations
          </p>
        </div>
        <Button
          color="primary"
          startContent={<Plus className="w-4 h-4" />}
        >
          Create Custom Report
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Input
          placeholder="Search reports..."
          startContent={<Search className="w-4 h-4 text-default-400" />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select
          placeholder="Select date range"
          startContent={<Calendar className="w-4 h-4 text-default-400" />}
          defaultSelectedKeys={[dateRange]}
          onChange={(e) => setDateRange(e.target.value)}
          aria-label="Date range selector"
        >
          {dateRanges.map((range) => (
            <SelectItem key={range.value} value={range.value}>
              {range.label}
            </SelectItem>
          ))}
        </Select>
        <div className="flex gap-2">
          <Button
            variant="flat"
            startContent={<Filter className="w-4 h-4" />}
            className="flex-1"
          >
            More Filters
          </Button>
          <Button
            variant="flat"
            isIconOnly
            startContent={<Download className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* Report Categories */}
      {reportTypes.map((category, index) => (
        <div key={category.category} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{category.category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.reports.map((report) => {
              const Icon = report.icon;
              return (
                <div
                  key={report.id}
                  className="group p-6 bg-default-50 rounded-lg hover:bg-default-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{report.name}</h3>
                      <p className="text-default-500 text-sm">
                        {report.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-default-200 flex justify-between items-center">
                    <Chip size="sm" variant="flat" color="primary">
                      Updated daily
                    </Chip>
                    <Button
                      size="sm"
                      variant="light"
                      color="primary"
                      endContent={<Download className="w-4 h-4" />}
                    >
                      Generate
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          {index < reportTypes.length - 1 && <Divider className="my-8" />}
        </div>
      ))}
    </div>
  );
}