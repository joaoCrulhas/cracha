-- CreateTable
CREATE TABLE "resources" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "actions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permissions" (
    "id" SERIAL NOT NULL,
    "roleId" INTEGER NOT NULL,
    "actionResourceId" INTEGER NOT NULL,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "action_resources" (
    "id" SERIAL NOT NULL,
    "actionId" INTEGER NOT NULL,
    "resourceId" INTEGER NOT NULL,

    CONSTRAINT "action_resources_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "resources_name_key" ON "resources"("name");

-- CreateIndex
CREATE UNIQUE INDEX "actions_name_key" ON "actions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "role_permissions_roleId_actionResourceId_key" ON "role_permissions"("roleId", "actionResourceId");

-- CreateIndex
CREATE UNIQUE INDEX "action_resources_actionId_resourceId_key" ON "action_resources"("actionId", "resourceId");

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_actionResourceId_fkey" FOREIGN KEY ("actionResourceId") REFERENCES "action_resources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action_resources" ADD CONSTRAINT "action_resources_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "actions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action_resources" ADD CONSTRAINT "action_resources_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "resources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
