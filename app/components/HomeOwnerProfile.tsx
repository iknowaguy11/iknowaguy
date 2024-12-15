import { Avatar, Badge, Button, Dropdown, Label, TextInput, Card } from "flowbite-react";
import { HiPlusCircle, HiTrash, HiOutlinePencil, HiLogout } from "react-icons/hi";
import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IUser } from "../Interfaces/appInterfaces";
import { useFetchUserProjects } from "../_hooks/useFetch";
import MyProjects from "./MyProjects";
import { updateProfile } from "../Controllers/UpdateProfile";
import validator from "validator";

const HomeOwnerProfile = ({ UserData }: { UserData: IUser[] }) => {
  const [LastName, setLastName] = useState<string>(UserData[0]?.YourSurName);
  const [FristName, setFristName] = useState<string>(UserData[0]?.YourName);
  const [phone, setPhone] = useState<string>(UserData[0]?.phone);
  const { UserProjects } = useFetchUserProjects(UserData[0]?.Id);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const router = useRouter();
  const [avatarImage, setAvatarImage] = useState<string | null>(UserData[0]?.profileImage || null);
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/") || file.type === "image/gif") {
        alert("Please select a non-GIF image file.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarImage(event.target?.result as string);
        setImageUpload(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const openImagePicker = () => fileInputRef.current?.click();

  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      {/* Profile Section */}
      <Card className="mb-6 md:mt-10">
        <div className="flex items-center space-x-4">
          <Avatar
            size="lg"
            img={avatarImage || undefined}
            rounded
            className="hover:cursor-pointer"
            onClick={openImagePicker}
          >
            {!avatarImage && <span className="text-sm">Add Photo</span>}
          </Avatar>
          <div>
            <h2 className="text-lg font-bold">
              {UserData[0]?.YourName} {UserData[0]?.YourSurName}
            </h2>
            <p className="text-sm text-gray-500">{UserData[0]?.companyEmail}</p>
            <Badge
              onClick={() => {
                setAvatarImage(null);
                setImageUpload(null);
              }}
              className="w-fit hover:cursor-pointer bg-appGreen text-white mt-2"
              icon={HiTrash}
            >
              Remove Photo
            </Badge>
          </div>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </Card>

      {/* Edit Profile Form */}
      <Card>
        <form
          onSubmit={(e) =>
            updateProfile(
              e,
              router,
              {
                YourName: FristName,
                YourSurName: LastName,
                phone: validator.isMobilePhone(phone.trim()) ? phone : UserData[0]?.phone,
              },
              UserData[0]?.Id,
              imageUpload,
              setIsProcessing
            )
          }
          className="flex flex-col gap-4"
        >
          <div>
            <Label htmlFor="firstname" value="First Name" />
            <TextInput
              id="firstname"
              type="text"
              value={FristName}
              onChange={(e) => setFristName(e.target.value)}
              placeholder="Enter your first name"
              required
            />
          </div>
          <div>
            <Label htmlFor="lastname" value="Last Name" />
            <TextInput
              id="lastname"
              type="text"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              required
            />
          </div>
          <div>
            <Label htmlFor="phone" value="Phone Number" />
            <TextInput
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>
          <Button isProcessing={isProcessing} type="submit">
            Update Profile
          </Button>
        </form>
      </Card>

      {/* My Projects Section */}
      <Card className="mt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">My Projects</h3>
          <Badge
            onClick={() => router.push("postproject")}
            className="bg-appGreen text-white hover:cursor-pointer"
            icon={HiPlusCircle}
          >
            Add Project
          </Badge>
        </div>
        <div className="mt-4">
          {UserProjects?.map((project) => (
            <MyProjects item={project} key={project.ProjectId} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default HomeOwnerProfile;
