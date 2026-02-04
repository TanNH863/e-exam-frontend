import React from "react";
import {
  BookOpen,
  User,
  Lock,
  ArrowLeft,
  LogOut,
  Bell,
  ClipboardList,
  Calendar,
  Clock,
  CheckCircle,
  PlusCircle,
  FileText,
  ClipboardCheck,
  Users,
  UserRoundPen,
  SquarePen,
  ChartBar,
  X,
  Trash,
  Pencil,
  Search,
  Upload
} from "lucide-react";

type SVGProps = React.SVGProps<SVGSVGElement>;

export const BookOpenIcon = (props: SVGProps) => (
  <BookOpen {...props} className={props.className ?? "mr-2 h-5 w-5 text-gray-500"} />
);

export const UserIcon = (props: SVGProps) => (
  <User
    {...props}
    className={props.className ?? "absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"}
  />
);

export const LockIcon = (props: SVGProps) => (
  <Lock
    {...props}
    className={props.className ?? "absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"}
  />
);

export const ArrowLeftIcon = (props: SVGProps) => (
  <ArrowLeft {...props} className={props.className ?? "mr-2 h-4 w-4"} />
);

export const LogoutIcon = (props: SVGProps) => (
  <LogOut {...props} className={props.className ?? "mr-2 h-5 w-5"} />
);

export const BellIcon = (props: SVGProps) => (
  <Bell {...props} className={props.className ?? "h-6 w-6"} />
);

export const ClipboardListIcon = (props: SVGProps) => (
  <ClipboardList {...props} className={props.className ?? "mr-3 h-6 w-6 text-blue-500"} />
);

export const CalendarIcon = (props: SVGProps) => (
  <Calendar {...props} className={props.className ?? "mr-1.5 h-4 w-4 text-gray-500"} />
);

export const ClockIcon = (props: SVGProps) => (
  <Clock {...props} className={props.className ?? "mr-1.5 h-4 w-4 text-gray-500"} />
);

export const CheckCircleIcon = (props: SVGProps) => (
  <CheckCircle {...props} className={props.className ?? "mr-1.5 h-4 w-4"} />
);

export const PlusCircleIcon = (props: SVGProps) => (
  <PlusCircle {...props} className={props.className ?? "mr-2 h-5 w-5"} />
);

export const FileTextIcon = (props: SVGProps) => (
  <FileText {...props} className={props.className ?? "h-8 w-8 text-blue-500"} />
);

export const ClipboardCheckIcon = (props: SVGProps) => (
  <ClipboardCheck {...props} className={props.className ?? "h-8 w-8 text-green-500"} />
);

export const UsersIcon = (props: SVGProps) => (
  <Users {...props} className={props.className ?? "h-8 w-8 text-indigo-500"} />
);

export const EditIcon = (props: SVGProps) => (
  <SquarePen {...props} className={props.className ?? "mr-2 h-4 w-4"} />
);

export const EditUserIcon = (props: SVGProps) => (
  <UserRoundPen {...props} className={props.className ?? "h-5 w-5"} />
);

export const ChartBarIcon = (props: SVGProps) => (
  <ChartBar {...props} className={props.className ?? "mr-2 h-4 w-4"} />
);

export const XIcon = (props: SVGProps) => (
  <X {...props} className={props.className ?? "h-6 w-6"} />
);

export const SuccessIcon = (props: SVGProps) => (
  <CheckCircle {...props} className={props.className ?? "h-6 w-6 text-green-500"} />
);

export const TrashIcon = (props: SVGProps) => (
  <Trash {...props} className={props.className ?? "h-5 w-5"} />
);

export const PencilIcon = (props: SVGProps) => (
  <Pencil {...props} className={props.className ?? "h-5 w-5"} />
);

export const SearchIcon = (props: SVGProps) => (
  <Search {...props} className={props.className ?? "h-5 w-5 text-gray-400"} />
);

export const UploadIcon = (props: SVGProps) => (
  <Upload {...props} className={props.className ?? "mr-2 h-5 w-5"} />
);