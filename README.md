# Project Documentation
### For detailed documentation you can checkout this link!
(https://documenter.getpostman.com/view/39187554/2sAYQUpZcU#a1a7b1af-fe67-4f7a-bdfe-8072f7f23189)
## Overview
This project is a repository management system that allows users to create and manage repositories, issues, pull requests, commits, and more. The system is designed to facilitate collaboration and organization of software projects.

## Table of Contents
- [User Management](#user-management)
- [Repositories](#repositories)
- [Issues](#issues)
- [Pull Requests](#pull-requests)
- [Commits](#commits)
- [Forks and Stars](#forks-and-stars)

## User Management
### Endpoints
- **GET /users**: Fetch all users.
- **GET /users/:userId**: Fetch user details by ID.
- **POST /users**: Register a new user.
- **PATCH /users/:userId**: Update user bio or profile picture.
- **DELETE /users/:userId**: Delete a user account.

### Description
The user management feature allows for the registration, retrieval, updating, and deletion of users. Each user has an ID, username, full name, email, bio, profile picture, and follower/following counts.

## Repositories
### Endpoints
- **GET /repositories**: Fetch all repositories.
- **GET /repositories/:repoId**: Fetch details of a specific repository.
- **POST /repositories**: Create a new repository.
- **PATCH /repositories/:repoId**: Update the repository description.
- **DELETE /repositories/:repoId**: Delete a repository.

### Description
Repositories are central to the project, allowing users to create and manage projects. Each repository has an ID, user ID, name, description, programming language, star and fork counts, issues, pull requests, creation date, and privacy status.

## Issues
### Endpoints
- **GET /repositories/:repoId/issues**: Fetch all issues for a repository.
- **POST /issues**: Add an issue to a repository.
- **PATCH /issues/:issueId/status**: Update the status of an issue.
- **DELETE /issues/:issueId**: Delete an issue.

### Description
Issues allow users to track problems or tasks within a repository. Each issue has an ID, associated repository ID, user ID, title, description, status (open/closed), and timestamps.

## Pull Requests
### Endpoints
- **GET /repositories/:repoId/pull-requests**: Fetch all pull requests for a repository.
- **POST /pull-requests**: Create a new pull request.
- **DELETE /pull-requests/:prId**: Delete a pull request.

### Description
Pull requests facilitate code review and collaboration by allowing users to propose changes to a repository. Each pull request has an ID, repository ID, user ID, title, description, status (open/merged), and timestamps.

## Commits
### Endpoints
- **GET /repositories/:repoId/commits**: Fetch all commits for a repository.
- **POST /commits**: Create a new commit.
- **DELETE /commits/:commitId**: Delete a commit.

### Description
Commits record changes made to a repository. Each commit includes an ID, repository ID, user ID, message describing the change, and timestamps.

## Forks and Stars
### Endpoints
- **POST /forks**: Create a fork of a repository.
- **POST /stars**: Star a repository.

### Description
Forks allow users to create a copy of a repository to make changes without affecting the original. Stars are a way for users to show appreciation for a repository, helping others discover popular projects.

## Conclusion
This project aims to streamline the process of managing software development projects, making it easier for teams to collaborate effectively. For any questions or contributions, feel free to reach out.

