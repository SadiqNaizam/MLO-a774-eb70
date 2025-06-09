import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import MainContentArea from '@/components/layout/MainContentArea';
import MusicPlayerBar, { TrackInfo } from '@/components/layout/MusicPlayerBar';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera } from 'lucide-react';

const profileFormSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters.").max(50, "Username too long."),
  email: z.string().email("Invalid email address."),
  bio: z.string().max(160, "Bio too long.").optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const UserProfileSettingsPage = () => {
  const [currentTrack, setCurrentTrack] = useState<TrackInfo | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [playbackQuality, setPlaybackQuality] = useState("high"); // 'auto', 'low', 'medium', 'high'
  const [userAvatar, setUserAvatar] = useState("https://picsum.photos/seed/user/128/128");


  const { control, handleSubmit, formState: { errors } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "DemoUser",
      email: "demo@example.com",
      bio: "Loves music and coding!",
    },
  });

  const onProfileSubmit = (data: ProfileFormValues) => {
    console.log('Profile updated:', data);
    // API call to update profile
  };
  
  const handleAvatarChange = () => {
    // Trigger file input or modal
    console.log("Change avatar clicked");
    // For demonstration, cycle through a few avatars
    const avatars = [
        "https://picsum.photos/seed/user1/128/128",
        "https://picsum.photos/seed/user2/128/128",
        "https://picsum.photos/seed/user3/128/128"
    ];
    setUserAvatar(avatars[Math.floor(Math.random() * avatars.length)]);
  };


  console.log('UserProfileSettingsPage loaded');

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar className="hidden md:flex h-full" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName="Demo User" userAvatarUrl={userAvatar} />
        <MainContentArea title="Profile & Settings" className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your public profile details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                 <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={userAvatar} alt="User Avatar" />
                            <AvatarFallback>DU</AvatarFallback>
                        </Avatar>
                        <Button 
                            variant="outline" 
                            size="icon" 
                            className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-background"
                            onClick={handleAvatarChange}
                        >
                            <Camera className="h-4 w-4" />
                            <span className="sr-only">Change avatar</span>
                        </Button>
                    </div>
                    <div className="flex-1">
                         <p className="text-xl font-semibold">Demo User</p>
                         <p className="text-sm text-muted-foreground">demo@example.com</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onProfileSubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Controller
                      name="username"
                      control={control}
                      render={({ field }) => <Input id="username" {...field} />}
                    />
                    {errors.username && <p className="text-sm text-destructive mt-1">{errors.username.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => <Input id="email" type="email" {...field} />}
                    />
                    {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio (Optional)</Label>
                     <Controller
                      name="bio"
                      control={control}
                      render={({ field }) => <textarea id="bio" {...field} className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Tell us a little about yourself" />}
                    />
                    {errors.bio && <p className="text-sm text-destructive mt-1">{errors.bio.message}</p>}
                  </div>
                  <Button type="submit">Save Profile</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates and news via email.</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="playback-quality" className="font-medium">Playback Quality</Label>
                   {/* In a real app, use Select from shadcn/ui */}
                  <select 
                    id="playback-quality" 
                    value={playbackQuality} 
                    onChange={(e) => setPlaybackQuality(e.target.value)}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="auto">Auto</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <p className="text-sm text-muted-foreground">Choose audio quality for streaming.</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => console.log("Settings updated:", {emailNotifications, playbackQuality})}>Update Settings</Button>
              </CardFooter>
            </Card>
          </div>
        </MainContentArea>
        <MusicPlayerBar
          currentTrack={currentTrack} // Settings page might not need player state, but keep for consistency
          isPlaying={isPlaying}
          progress={0}
          currentTime={0}
          volume={volume}
          isMuted={isMuted}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onNext={() => console.log('Next track')}
          onPrevious={() => console.log('Previous track')}
          onSeek={() => {}}
          onVolumeChange={(val) => { setVolume(val); setIsMuted(false); }}
          onMuteToggle={() => setIsMuted(!isMuted)}
        />
      </div>
    </div>
  );
};

export default UserProfileSettingsPage;