import { User, User2Icon, Users } from "lucide-react";

const ProfileIcon = ({ width = 20, height = 15, className }) => {
  return (
    
      <Users 
      width= {width}
      height={height}
        stroke="currentColor" 
        strokeWidth={2} 
      />
      
     
  );
};

export default ProfileIcon;
