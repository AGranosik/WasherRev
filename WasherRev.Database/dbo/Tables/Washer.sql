CREATE TABLE [dbo].[Washer] (
    [Id]         INT           IDENTITY (1, 1) NOT NULL,
    [Name]       VARCHAR (128) NULL,
    [RoomId]     INT           NULL,
    [ProducerId] INT           NULL,
    [SinceWhen]  DATETIME      NULL,
    [IsActive]   BIT           DEFAULT ((1)) NULL,
    CONSTRAINT [PK_WasherId] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_ProducerId_Washer] FOREIGN KEY ([ProducerId]) REFERENCES [dbo].[Producer] ([Id]),
    CONSTRAINT [FK_Room_Washer] FOREIGN KEY ([RoomId]) REFERENCES [dbo].[Room] ([Id]),
    CONSTRAINT [Name_uniqueness] UNIQUE NONCLUSTERED ([Name] ASC)
);



