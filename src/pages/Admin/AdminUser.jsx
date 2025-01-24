import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CheckCircle2, XCircle, UserCog } from "lucide-react";
import Api from "../../api";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await Api.get("/api/admin/users/");
        setUsers(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching users", error);
        setError("Failed to fetch users. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const toggleUser = async (userId) => {
    try {
      const response = await Api.put(`/admin/users/${userId}/`);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? { ...user, is_active: response.data.is_active }
            : user
        )
      );
    } catch (error) {
      console.error("Error toggling user state", error);
      // Consider adding a toast notification here
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full p-6">
        <UserCog className="animate-spin w-12 h-12 text-primary" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-6 text-center">{error}</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <UserCog className="w-6 h-6" /> User Management
        </h1>
      </div>
      <Table>
        <TableCaption>List of all users in the system</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge
                  variant={user.is_active ? "default" : "destructive"}
                  className="flex items-center gap-2"
                >
                  {user.is_active ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <XCircle className="w-4 h-4" />
                  )}
                  {user.is_active ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant={user.is_active ? "destructive" : "default"}
                      size="sm"
                    >
                      {user.is_active ? "Deactivate" : "Activate"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to{" "}
                        {user.is_active ? "deactivate" : "activate"} this user?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This will {user.is_active ? "prevent" : "allow"} the
                        user from accessing the system.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => toggleUser(user.id)}>
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminUsers;
