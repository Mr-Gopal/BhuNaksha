"use client";

import Image from "next/image";
import { MapPin, Search, User, Settings, LogOut } from "lucide-react";
import { useUser, useAuth } from '@/firebase';
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { AuthDialog } from './auth-dialog';
import { ProfileDialog } from './profile';
import { Button } from './ui/button';

type AppHeaderProps = {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
};

export default function AppHeader({ searchQuery, onSearchQueryChange }: AppHeaderProps) {
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar');
  const { user, isUserLoading } = useUser();
  const auth = useAuth();

  const handleLogout = () => {
    auth.signOut();
  };
  
  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:px-6 z-10 flex-shrink-0">
      <div className="flex items-center gap-2">
        <MapPin className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold tracking-tight">BhuNaksha</h1>
      </div>
      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name or phone number..."
            className="w-full pl-10"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center">
        {isUserLoading ? (
            <Avatar className="h-9 w-9">
              <AvatarFallback></AvatarFallback>
            </Avatar>
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 cursor-pointer">
                <AvatarImage src={user.photoURL || userAvatar?.imageUrl} alt="User avatar" data-ai-hint={userAvatar?.imageHint} />
                <AvatarFallback>{user.email?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{user.isAnonymous ? "Guest" : user.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <ProfileDialog />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <AuthDialog />
        )}
      </div>
    </header>
  );
}
