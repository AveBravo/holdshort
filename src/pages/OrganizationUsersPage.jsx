import React from 'react';
import {
  Card,
  CardBody,
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Tooltip,
  Breadcrumbs,
  BreadcrumbItem,
  Pagination,
  Avatar,
  Checkbox,
  Progress,
} from '@heroui/react';
import {
  Home,
  Building2,
  Users,
  Search,
  Plus,
  MoreVertical,
  Mail,
  Key,
  Shield,
  UserPlus,
  UserMinus,
  Edit2,
  Trash2,
  Download,
  Upload,
  Filter,
  ChevronDown,
  UserCheck,
  AlertTriangle,
  Clock,
  Award,
} from 'lucide-react';

const roles = {
  owner: { name: 'Owner', color: 'danger' },
  pilot: { name: 'Pilot', color: 'primary' },
  instructor: { name: 'Instructor', color: 'secondary' },
  student: { name: 'Student', color: 'warning' },
  member: { name: 'Member', color: 'success' },
  mechanic: { name: 'Mechanic', color: 'default' },
  manager: { name: 'Manager', color: 'primary' },
};

const users = [
  {
    id: 1,
    firstName: 'Artem',
    lastName: 'Orlov',
    email: 'artem.orlov@multidsys.com',
    phone: '+38011111111',
    roles: ['pilot', 'manager', 'instructor', 'member'],
    balance: -498.97,
    status: 'active',
  },
  {
    id: 2,
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@holdshort.com',
    phone: '+38011111111',
    roles: ['instructor', 'member'],
    balance: 0,
    status: 'active',
  },
  {
    id: 3,
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.j@holdshort.com',
    phone: '+38011111111',
    roles: ['student', 'member'],
    balance: 150.00,
    status: 'pending',
  },
];

export default function OrganizationUsersPage() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [filterValue, setFilterValue] = React.useState('');
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const filteredUsers = React.useMemo(() => {
    let filtered = [...users];
    
    if (filterValue) {
      filtered = filtered.filter(user => 
        user.firstName.toLowerCase().includes(filterValue.toLowerCase()) ||
        user.lastName.toLowerCase().includes(filterValue.toLowerCase()) ||
        user.email.toLowerCase().includes(filterValue.toLowerCase()) ||
        user.roles.some(role => roles[role].name.toLowerCase().includes(filterValue.toLowerCase()))
      );
    }
    
    return filtered;
  }, [filterValue]);

  const pages = Math.ceil(filteredUsers.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredUsers.slice(start, end);
  }, [page, filteredUsers]);

  const renderCell = React.useCallback((user, columnKey) => {
    switch (columnKey) {
      case 'name':
        return (
          <div className="flex items-center gap-3">
            <Avatar
              showFallback
              size="sm"
              name={`${user.firstName} ${user.lastName}`}
            />
            <div className="flex flex-col">
              <p className="text-sm font-medium">{`${user.firstName} ${user.lastName}`}</p>
              <p className="text-xs text-default-500">{user.email}</p>
            </div>
          </div>
        );
      case 'phone':
        return user.phone;
      case 'roles':
        return (
          <div className="flex flex-wrap gap-1">
            {user.roles.map((role) => (
              <Chip
                key={role}
                size="sm"
                variant="flat"
                color={roles[role].color}
              >
                {roles[role].name}
              </Chip>
            ))}
          </div>
        );
      case 'balance':
        return (
          <span className={user.balance < 0 ? 'text-danger' : 'text-success'}>
            ${user.balance.toFixed(2)}
          </span>
        );
      case 'status':
        return (
          <Chip
            size="sm"
            variant="dot"
            color={user.status === 'active' ? 'success' : 'warning'}
          >
            {user.status}
          </Chip>
        );
      case 'actions':
        return (
          <div className="flex items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly variant="light" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  startContent={<Edit2 className="w-4 h-4" />}
                >
                  Edit User
                </DropdownItem>
                <DropdownItem
                  startContent={<Key className="w-4 h-4" />}
                >
                  Reset Password
                </DropdownItem>
                <DropdownItem
                  startContent={<Mail className="w-4 h-4" />}
                >
                  Send Email
                </DropdownItem>
                <DropdownItem
                  startContent={<Shield className="w-4 h-4" />}
                  className="text-danger"
                >
                  Manage Roles
                </DropdownItem>
                <DropdownItem
                  startContent={<Trash2 className="w-4 h-4" />}
                  className="text-danger"
                >
                  Delete User
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return null;
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Breadcrumbs size="lg">
          <BreadcrumbItem startContent={<Home className="w-4 h-4" />}>
            Home
          </BreadcrumbItem>
          <BreadcrumbItem startContent={<Building2 className="w-4 h-4" />}>
            Organization
          </BreadcrumbItem>
          <BreadcrumbItem startContent={<Users className="w-4 h-4" />}>
            Users
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Active Users */}
        <Card>
          <CardBody>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <UserCheck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-default-500">Active Users</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-semibold">42</span>
                  <span className="text-xs text-success">+12.5%</span>
                </div>
                <Progress
                  size="sm"
                  radius="sm"
                  classNames={{
                    base: "mt-2",
                    track: "bg-primary/10",
                    indicator: "bg-primary",
                  }}
                  value={80}
                />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Pending Verifications */}
        <Card>
          <CardBody>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-warning/10">
                <AlertTriangle className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-default-500">Pending Verifications</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-semibold">8</span>
                  <span className="text-xs text-warning">Requires Action</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <Chip size="sm" variant="flat" color="warning">4 Medical</Chip>
                  <Chip size="sm" variant="flat" color="warning">3 Ratings</Chip>
                  <Chip size="sm" variant="flat" color="warning">1 Review</Chip>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardBody>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-secondary/10">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-default-500">Recent Activity</p>
                <div className="space-y-2 mt-2">
                  <p className="text-xs">
                    <span className="font-medium">John Smith</span> completed training
                  </p>
                  <p className="text-xs">
                    <span className="font-medium">Sarah Johnson</span> updated profile
                  </p>
                  <p className="text-xs">
                    <span className="font-medium">Mike Davis</span> renewed certificate
                  </p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Certifications */}
        <Card>
          <CardBody>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-success/10">
                <Award className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-default-500">Certifications</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-semibold">95%</span>
                  <span className="text-xs text-success">Up to date</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <p className="text-xs text-default-500">Valid</p>
                    <p className="text-sm font-medium">38</p>
                  </div>
                  <div>
                    <p className="text-xs text-default-500">Expiring Soon</p>
                    <p className="text-sm font-medium text-warning">4</p>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="mb-6">
        
          <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-3 items-end">
              <div className="flex-1 flex flex-col gap-2">
                <h1 className="text-2xl font-bold">Users</h1>
                <div className="flex gap-3">
                  <Input
                    isClearable
                    className="w-full sm:max-w-[44%]"
                    placeholder="Search by name, email, or role..."
                    startContent={<Search className="w-4 h-4 text-default-400" />}
                    value={filterValue}
                    onClear={() => setFilterValue('')}
                    onValueChange={setFilterValue}
                  />
                  <Button
                    color="primary"
                    endContent={<Filter className="w-4 h-4" />}
                  >
                    Filters
                  </Button>
                </div>
              </div>
              <div className="flex gap-3">
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      endContent={<ChevronDown className="w-4 h-4" />}
                      variant="flat"
                    >
                      Actions
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem
                      startContent={<Download className="w-4 h-4" />}
                    >
                      Export CSV
                    </DropdownItem>
                    <DropdownItem
                      startContent={<Upload className="w-4 h-4" />}
                    >
                      Import Users
                    </DropdownItem>
                    <DropdownItem
                      startContent={<UserPlus className="w-4 h-4" />}
                    >
                      Bulk Add
                    </DropdownItem>
                    <DropdownItem
                      startContent={<Mail className="w-4 h-4" />}
                    >
                      Send Email
                    </DropdownItem>
                    <DropdownItem
                      startContent={<UserMinus className="w-4 h-4" />}
                      className="text-danger"
                    >
                      Delete Selected
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Button
                  color="primary"
                  endContent={<Plus className="w-4 h-4" />}
                  onPress={onOpen}
                >
                  Add User
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-default-400 text-small">
                Total {users.length} users
              </span>
              <label className="flex items-center text-default-400 text-small">
                Rows per page:
                <select
                  className="bg-transparent outline-none text-default-400 text-small"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
              </label>
            </div>
          </div>
        
      </div>

          <Table
            aria-label="Users table"
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  
                  color="primary"
                  page={page}
                  total={pages}
                  onChange={setPage}
                />
              </div>
            }
          >
            <TableHeader>
              <TableColumn key="name">NAME</TableColumn>
              <TableColumn key="phone">PHONE</TableColumn>
              <TableColumn key="roles">ROLES</TableColumn>
              <TableColumn key="balance">BALANCE</TableColumn>
              <TableColumn key="status">STATUS</TableColumn>
              <TableColumn key="actions">ACTIONS</TableColumn>
            </TableHeader>
            <TableBody items={items}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
       

      {/* Add User Modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h2 className="text-xl font-bold">Add New User</h2>
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    placeholder="Enter first name"
                    variant="bordered"
                  />
                  <Input
                    label="Last Name"
                    placeholder="Enter last name"
                    variant="bordered"
                  />
                  <Input
                    label="Email"
                    placeholder="Enter email address"
                    type="email"
                    variant="bordered"
                  />
                  <Input
                    label="Phone"
                    placeholder="Enter phone number"
                    type="tel"
                    variant="bordered"
                  />
                  <div className="md:col-span-2">
                    <p className="text-sm font-medium mb-2">Roles</p>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(roles).map(([key, role]) => (
                        <Checkbox key={key} value={key}>
                          {role.name}
                        </Checkbox>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <Checkbox>
                      Send welcome email with login credentials
                    </Checkbox>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="bordered" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
                  Add User
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}