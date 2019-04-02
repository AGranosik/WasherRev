CREATE TABLE [dbo].[Washer] (
    [Id]        INT           IDENTITY (1, 1) NOT NULL,
    [Name]      VARCHAR (128) NULL,
    [RoomId]    INT           NULL,
    [producer]  VARCHAR (MAX) NULL,
    [SinceWhen] DATETIME      NULL,
    [IsActive]  BIT           DEFAULT ((1)) NULL,
    CONSTRAINT [PK_WasherId] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Room_Washer] FOREIGN KEY ([RoomId]) REFERENCES [dbo].[Room] ([Id]),
    CONSTRAINT [Name_uniqueness] UNIQUE NONCLUSTERED ([Name] ASC)
);

