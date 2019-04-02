CREATE TABLE [dbo].[BuildingUsersHistory] (
    [Id]         INT IDENTITY (1, 1) NOT NULL,
    [UsersId]    INT NOT NULL,
    [BuildingId] INT NOT NULL,
    CONSTRAINT [PK_BuildingUsersHistoryId] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_BuildingUsersHistory_BuildingIdId] FOREIGN KEY ([BuildingId]) REFERENCES [dbo].[Building] ([Id]),
    CONSTRAINT [FK_BuildingUsersHistory_UsersId] FOREIGN KEY ([UsersId]) REFERENCES [dbo].[Users] ([Id])
);

