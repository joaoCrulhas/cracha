-- DropForeignKey
ALTER TABLE "role_permissions" DROP CONSTRAINT "role_permissions_actionResourceId_fkey";

-- DropForeignKey
ALTER TABLE "role_permissions" DROP CONSTRAINT "role_permissions_roleId_fkey";

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_actionResourceId_fkey" FOREIGN KEY ("actionResourceId") REFERENCES "action_resources"("id") ON DELETE CASCADE ON UPDATE CASCADE;
