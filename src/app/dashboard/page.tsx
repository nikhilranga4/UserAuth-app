"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { prisma } from "~/lib/prisma";
import { Button, Input, Label, Select, Option, DatePicker } from "shadcn";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [userDetails, setUserDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session?.user?.id) {
      router.push("/signin");
    } else {
      // Fetch user details
      const fetchUserDetails = async () => {
        try {
          setLoading(true);
          const response = await prisma.user.findUnique({
            where: { id: session.user.id },
          });
          setUserDetails(response);
        } catch (err) {
          setError("Failed to fetch user details");
        } finally {
          setLoading(false);
        }
      };

      fetchUserDetails();
    }
  }, [session, status, router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData(event.target as HTMLFormElement);
      const userProfileData = {
        fullName: formData.get("fullName") as string,
        fbLink: formData.get("fbLink") as string,
        linkedinLink: formData.get("linkedinLink") as string,
        gender: formData.get("gender") as string,
        dob: formData.get("dob") as string,
      };

      // Make API call to save the data (update user profile in DB)
      const response = await fetch("/api/user/update", {
        method: "POST",
        body: JSON.stringify(userProfileData),
      });

      if (response.ok) {
        setError(null);
        alert("Profile updated successfully!");
        setUserDetails(userProfileData);
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (err) {
      setError("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="my-6">
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              defaultValue={userDetails?.name || ""}
              required
            />
          </div>

          <div className="mt-4">
            <Label htmlFor="fbLink">Facebook Link</Label>
            <Input
              id="fbLink"
              name="fbLink"
              defaultValue={userDetails?.fbLink || ""}
            />
          </div>

          <div className="mt-4">
            <Label htmlFor="linkedinLink">LinkedIn Link</Label>
            <Input
              id="linkedinLink"
              name="linkedinLink"
              defaultValue={userDetails?.linkedinLink || ""}
            />
          </div>

          <div className="mt-4">
            <Label htmlFor="gender">Gender</Label>
            <Select id="gender" name="gender" defaultValue={userDetails?.gender || ""}>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </div>

          <div className="mt-4">
            <Label htmlFor="dob">Date of Birth</Label>
            <DatePicker
              id="dob"
              name="dob"
              defaultValue={userDetails?.dob || ""}
            />
          </div>

          <div className="mt-6">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Details"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
