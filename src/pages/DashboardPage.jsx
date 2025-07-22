import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Avatar,
  Chip,
  Link,
  Alert,
} from "@heroui/react";
import { Calendar, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const notifications = [
  {
    id: 1,
    color: "warning",
    message: "Your FAA Flight Review expired on 31 Aug, 2016",
  },
  {
    id: 2,
    color: "success",
    message:
      'Your "JetSuite" Organization Flight Review has been updated',
  },
  {
    id: 3,
    color: "danger",
    message: "Your Instructor Certificate 1233232 expired on 17 Sep, 2015",
  },
  {
    id: 4,
    color: "danger",
    message: "Your Medical Certificate expired on 31 May, 2016",
  },
];

const organizations = [
  { id: 1, name: "JetSuite", role: "Owner, Member", status: "active", href: "/organizations" },
  {
    id: 2,
    name: "Blue Horizon",
    role: "Owner, Member, Instructor",
    status: "overdue",
  },
  { id: 3, name: "Test 1588", role: "Owner, Member", status: "overdue" },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Flight Training",
    time: "09:00 AM",
    date: "Today",
    instructor: "John Smith",
  },
  {
    id: 2,
    title: "Ground School",
    time: "02:00 PM",
    date: "Tomorrow",
    instructor: "Sarah Johnson",
  },
];

export default function DashboardPage() {
  const [visibleAlerts, setVisibleAlerts] = useState(notifications.map(() => true));
  const handleAlertClose = (index) => {
    setVisibleAlerts(prev => {
      const newStates = [...prev];
      newStates[index] = false;
      return newStates;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Personal Info Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="col-span-1">
          <CardBody className="flex flex-col items-center text-center gap-4">
            <Avatar
              src="https://i.pravatar.cc/150?img=3"
              className="w-24 h-24"
            />
            <div>
              <h2 className="text-xl font-bold">Holdshort Administrator</h2>
              <p className="text-sm text-gray-500">note@holdshort.com</p>
              <p className="text-sm text-gray-500">380634415007</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" color="primary">
                Edit Profile
              </Button>
              <Button size="sm" variant="bordered">
                Documents
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Notifications Card */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <Alert
            color="default"
            variant="faded"
            title="Important Notifications"
            description="Review your expired documents"
            endContent={
              <Button color="warning" size="sm" variant="flat">
                Update
              </Button>
            }
            />
            
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {notifications.map((notification, index) => (
                visibleAlerts[index] ? (
                  <div key={notification.id}>
                    <Alert
                      color={notification.color}
                      variant="faded"
                      title={notification.message}
                      onClose={() => handleAlertClose(index)}
                    />
                  </div>
                ) : null
              ))}
              {!visibleAlerts.some(alert => alert) && (
                <Button variant="bordered" onPress={() => setVisibleAlerts(notifications.map(() => true))}>
                  Show All Alerts
                </Button>
              )}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Organizations and Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader className="flex gap-3">
            <Users className="w-6 h-6" />
            <div className="flex flex-col">
              <p className="text-lg font-bold">My Organizations</p>
              <p className="text-small text-default-500">
                Organizations you're a member of
              </p>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {organizations.map((org) => (
                <Link
                  href={org.href}
                  key={org.id}
                  className="w-full"
                  variant="light"
                  onPress={() =>
                    useNavigate({
                      page: "organization",
                      params: { id: org.id.toString() },
                    })
                  }
                >
                  <div className="flex items-center justify-between w-full p-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={org.name} size="sm" />
                      <div>
                        <p className="font-semibold text-left">{org.name}</p>
                        <p className="text-xs text-default-500">
                          Roles: {org.role}
                        </p>
                      </div>
                    </div>
                    <Chip
                      color={org.status === "active" ? "success" : "warning"}
                      size="md"
                    >
                      {org.status}
                    </Chip>
                  </div>
                </Link>
                
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="flex gap-3">
            <Calendar className="w-6 h-6" />
            <div className="flex flex-col">
              <p className="text-lg font-bold">Upcoming Events</p>
              <p className="text-small text-default-500">
                Your next activities
              </p>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-3 rounded-lg border border-default-200"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-default-500" />
                    <span className="text-sm">
                      {event.time} - {event.date}
                    </span>
                  </div>
                  <p className="font-semibold">{event.title}</p>
                  <p className="text-sm text-default-500">
                    with {event.instructor}
                  </p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
