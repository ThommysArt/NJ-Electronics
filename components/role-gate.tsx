"use client";

import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import UnauthorizedPage from "./unauthorized-page";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export const RoleGate = ({ children, allowedRoles }: RoleGateProps) => {
  const role = useCurrentRole();

  if (!allowedRoles.includes(role!)) {
    return <UnauthorizedPage />
  }

  return <>{children}</>
}
