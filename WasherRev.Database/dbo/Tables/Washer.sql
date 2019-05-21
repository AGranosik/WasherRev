CREATE TABLE [dbo].[Washer] (
    [Id]         INT           IDENTITY (1, 1) NOT NULL,
    [Name]       VARCHAR (128) NOT NULL,
    [RoomId]     INT           NULL,
    [ProducerId] INT           NOT NULL,
    [SinceWhen]  DATETIME      NOT NULL,
    [IsActive]   BIT           DEFAULT ((1)) NOT NULL,
    [WorkedTo] DATETIME NULL, 
    CONSTRAINT [PK_WasherId] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_ProducerId_Washer] FOREIGN KEY ([ProducerId]) REFERENCES [dbo].[Producer] ([Id]),
    CONSTRAINT [FK_Room_Washer] FOREIGN KEY ([RoomId]) REFERENCES [dbo].[Room] ([Id])
);



