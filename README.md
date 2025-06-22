# Cracha

Cracha is an open source initiative to help you create a service to handle all permissions that is necessary to manage your users and roles.

Why this project called cracha? Cracha is a portuguese word that means "badge", is normal in the companies you have a cracha with your name, photo, and your role in the company.
So the idea of this project is be used to do the same.

## Introduction

Cracha is designed to streamline user management within your projects by:

**User-Role Assignment**: easily add users to your project and assign them predefined roles.

**Fine-Grained Permissions**: define resources (e.g., "Dashboard," "Settings") and actions (e.g., "view," "edit").

Attach these permissions to roles (e.g., "Admin," "Editor") for precise access control.

Centralized Access Control

### Example Workflow:

Create a resource (Reports) with actions (generate, delete).

Assign these actions to the Manager role.

Add users to Manager and then they automatically gain permissions.

## How run it

To run the dev server for your app, use:

```sh
npx nx serve cracha
```

To create a production bundle:

```sh
npx nx build cracha
```

To see all available targets to run for a project, run:

```sh
npx nx show project cracha
```



