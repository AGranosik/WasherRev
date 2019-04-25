CREATE TABLE [dbo].[BuildingUser] (
    [Id]         INT IDENTITY (1, 1) NOT NULL,
    [UsersId]    INT NOT NULL,
    [BuildingId] INT NOT NULL,
    [SinceWhen] DATETIME NOT NULL, 
    [AssignedTo] DATETIME NULL, 
    CONSTRAINT [PK_BuildingUserId] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_BuildingUser_Building] FOREIGN KEY ([BuildingId]) REFERENCES [dbo].[Building] ([Id]),
    CONSTRAINT [FK_BuildingUser_Users] FOREIGN KEY ([UsersId]) REFERENCES [dbo].[Users] ([Id])
);

