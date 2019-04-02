CREATE TABLE [dbo].[Room] (
    [Id]         INT           IDENTITY (1, 1) NOT NULL,
    [Name]       VARCHAR (MAX) NOT NULL,
    [Floor]      INT           DEFAULT ((0)) NOT NULL,
    [Capacity]   INT           DEFAULT ((0)) NULL,
    [BuildingId] INT           NOT NULL,
    [IsActive]   BIT           DEFAULT ((1)) NULL,
    CONSTRAINT [PK_RoomId] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Room_Building] FOREIGN KEY ([BuildingId]) REFERENCES [dbo].[Building] ([Id])
);

