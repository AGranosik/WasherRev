CREATE TABLE [dbo].[WasherRoomHistory] (
    [Id]      INT IDENTITY (1, 1) NOT NULL,
    [UsersId] INT NOT NULL,
    [RoomId]  INT NOT NULL,
    CONSTRAINT [PK_WasherRoomHistoryId] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_WasherRoomHistory_RoomId] FOREIGN KEY ([RoomId]) REFERENCES [dbo].[Room] ([Id]),
    CONSTRAINT [FK_WasherRoomHistory_UsersId] FOREIGN KEY ([UsersId]) REFERENCES [dbo].[Users] ([Id])
);

