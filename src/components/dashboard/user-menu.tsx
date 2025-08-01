import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogoutButton } from "../auth/logout-button";
import { useAuth } from "@/context/AuthContext";

export default function UserMenu() {
  const { user } = useAuth();

  const displayName = user?.name || "User";
  const fallback = displayName.charAt(0).toUpperCase();
  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer outline-0">
          <div className="flex items-center gap-1 rounded-md p-1">
            <Avatar>
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>

            <h2 className="px-2 font-semibold capitalize">Hi {displayName}</h2>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
