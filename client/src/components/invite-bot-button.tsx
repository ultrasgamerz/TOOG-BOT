import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

interface ServerInfo {
  hasBotMember: boolean;
  name?: string;
  id?: string;
}

interface InviteBotButtonProps {
  serverId: string;
}

export function InviteBotButton({ serverId }: InviteBotButtonProps) {
  const { data: serverInfo, isLoading, error } = useQuery<ServerInfo>({
    queryKey: ['/api/servers', serverId],
    retry: false,
    onSuccess: (data) => {
      console.log('Server info received:', data);
    },
    onError: (err) => {
      console.error('Error fetching server info:', err);
    }
  });

  const handleInvite = () => {
    // Updated OAuth2 URL with correct scopes
    const inviteUrl = "https://discord.com/oauth2/authorize?" + new URLSearchParams({
      client_id: "1307665682967826482",
      permissions: "8",
      scope: "bot applications.commands",
      guild_id: serverId,
      disable_guild_select: 'true',
      response_type: "code",
      redirect_uri: `${window.location.protocol}//${window.location.host}/api/auth/callback`
    });
    window.open(inviteUrl, '_blank');
  };

  // Don't render anything while loading
  if (isLoading) {
    console.log('Loading server info...');
    return null;
  }

  // Log error if any
  if (error) {
    console.error('Error occurred:', error);
    return null;
  }

  console.log('Render decision:', { serverInfo, shouldShow: serverInfo && !serverInfo.hasBotMember });

  // Only show invite button if we have server info AND bot is not in server
  if (serverInfo && !serverInfo.hasBotMember) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4 bg-[#2B2D31] rounded-md">
        <h2 className="text-xl font-semibold text-white">Bot is not in this server</h2>
        <p className="text-zinc-400 text-center">
          To use the bot features, you need to invite the bot to this server first.
        </p>
        <Button 
          onClick={handleInvite}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Invite Bot to Server
        </Button>
      </div>
    );
  }

  // Don't render anything if bot is already in server
  return null;
}