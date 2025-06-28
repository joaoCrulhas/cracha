-- DropForeignKey
ALTER TABLE "action_resources" DROP CONSTRAINT "action_resources_actionId_fkey";

-- DropForeignKey
ALTER TABLE "action_resources" DROP CONSTRAINT "action_resources_resourceId_fkey";

-- AddForeignKey
ALTER TABLE "action_resources" ADD CONSTRAINT "action_resources_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "actions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action_resources" ADD CONSTRAINT "action_resources_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE CASCADE;
