import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Switch,
  Link,
  Tooltip,
  Input,
} from "@heroui/react";
import {
  Calendar,
  PlusCircle,
  Search,
  UserCircle,
  BellRing,
  Moon,
  Sun,
  LayoutDashboard,
  MapPin,
  LogOut,
  Settings,
  HelpCircle,
  BarChart,
  Dock,
  CalendarDays,
  CalendarClock,
  Users2,
  Layers3,
  Send,
  Plane,
  LayoutList,
  ChevronDown,
  Search,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Link as RouterLink } from "react-router-dom";


const calendarViews = [
  { key: "month", icon: <CalendarDays className="w-4 h-4" />, label: "Month View" },
  { key: "week", icon: <CalendarClock className="w-4 h-4" />, label: "Week View" },
  { key: "day", icon: <LayoutList className="w-4 h-4" />, label: "Day View" },
  { key: "stacked", icon: <Layers3 className="w-4 h-4" />, label: "Stacked View" },
  { key: "dispatch", icon: <Send className="w-4 h-4" />, label: "Dispatch View" },
  { key: "pilot", icon: <Plane className="w-4 h-4" />, label: "Pilot View" }, 
];

const organizations = ["Blue Hawaiian Helicopters", "JetSuite"];



export default function MainMenu({ onNavigate }) {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      className="bg-background shadow-sm"
      classNames={{ wrapper: "px-4" }}
    >
      {/* Navbar Toggle for Mobile */}
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />

        {/* Logo */}

        <NavbarBrand>
          <a href="/">
            <img
              src="https://holdshort.com/public/images/logo-holdshort.svg"
              alt="HoldShort Logo"
              className="h-8"
            />
          </a>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Menu */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <RouterLink color="foreground" to="/dashboard">
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Dashboard
          </RouterLink>
        </NavbarItem>
        <NavbarItem>
          <RouterLink color="foreground" to="/search">
            <Search className="w-4 h-4 mr-2" />
            Search
          </RouterLink>
        </NavbarItem>
        <NavbarItem>
        <Dropdown>
  <DropdownTrigger>
    <Button
      variant="light"
      startContent={<Calendar className="w-4 h-4" />}
      endContent={<ChevronDown className="w-4 h-4" />}
    >
      Calendars
    </Button>
  </DropdownTrigger>

  <DropdownMenu
    aria-label="Calendar Organization Views"
    className="min-w-[300px]"
    closeOnSelect={false}
  >
    {organizations.map((org) => (
      <DropdownItem key={org} isReadOnly className="flex gap-1 px-1 py-2">
        {/* Назва організації (НЕ кнопка) */}
        <div
          onClick={() => onNavigate(`/calendar/day/${encodeURIComponent(org)}`)}
          className="flex justify-between cursor-pointer hover:bg-default-100 rounded-md px-2 py-1"
        >
          <span className="font-medium text-sm">{org}</span>
        </div>

        {/* Іконки виглядів */}
        <div className="flex flex-wrap gap-2 mt-1 justify-start w-full">
          {calendarViews.map(({ key, icon, label }) => (
            <Tooltip key={key} content={label} placement="top">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={() =>
                  onNavigate(`/calendar/${key}/${encodeURIComponent(org)}`)
                }
                aria-label={`${org} - ${label}`}
                className="text-default-500 hover:text-blue-600"
              >
                {icon}
              </Button>
            </Tooltip>
          ))}
        </div>
      </DropdownItem>
    ))}
  </DropdownMenu>
</Dropdown>


        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/locations">
            <MapPin className="w-4 h-4 mr-2" />
            Locations
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/calendar">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Event
          </Link>
        </NavbarItem>
        <NavbarItem>
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<Search size={18} />}
          type="search"
        />
        </NavbarItem>
      </NavbarContent>

      {/* Theme and User Actions */}
      <NavbarContent justify="end">
        <NavbarItem>
          <Switch
            defaultSelected={theme === "dark"}
            size="lg"
            color="secondary"
            startContent={<Sun />}
            endContent={<Moon />}
            onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
          />
        </NavbarItem>
        <NavbarItem>
          <Button
            variant="light"
            isIconOnly
            radius="full"
            aria-label="Notifications"
          >
            <BellRing className="w-5 h-5" />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                color="primary"
                name="User"
                size="sm"
                icon={<UserCircle className="w-6 h-6" />}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">user@example.com</p>
              </DropdownItem>
              <DropdownItem
                key="dashboard"
                startContent={<LayoutDashboard className="w-4 h-4" />}
              >
                <RouterLink to="/dashboard" className="w-full">Dashboard</RouterLink>
              </DropdownItem>
              <DropdownItem
                key="reports"
                startContent={<Dock className="w-4 h-4" />}
              >
                <RouterLink to="/reports" className="w-full">Reports</RouterLink>
              </DropdownItem>
              <DropdownItem
                key="settings"
                startContent={<Settings className="w-4 h-4" />}
              >
                My Settings
              </DropdownItem>
              <DropdownItem
                key="analytics"
                startContent={<BarChart className="w-4 h-4" />}
              >
                Analytics
              </DropdownItem>
              <DropdownItem
                key="help"
                startContent={<HelpCircle className="w-4 h-4" />}
              >
                Help & Feedback
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                startContent={<LogOut className="w-4 h-4" />}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
        <NavbarMenuItem>
          <Button
            variant="light"
            fullWidth
            startContent={<LayoutDashboard className="w-4 h-4" />}
            onPress={() => onNavigate({ page: "dashboard" })}
          >
            Dashboard
          </Button>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Button
            variant="light"
            fullWidth
            startContent={<Calendar className="w-4 h-4" />}
          >
            Calendars
          </Button>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Button
            variant="light"
            fullWidth
            startContent={<MapPin className="w-4 h-4" />}
            onPress={() => onNavigate({ page: "locations" })}
          >
            Locations
          </Button>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Button
            variant="light"
            fullWidth
            startContent={<PlusCircle className="w-4 h-4" />}
          >
            Add Event
          </Button>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Button
            variant="light"
            fullWidth
            startContent={<Search className="w-4 h-4" />}
            onPress={() => onNavigate("/search")}
          >
            Search
          </Button>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Button
            variant="light"
            fullWidth
            startContent={<Search className="w-4 h-4" />}
          >
            Search
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
