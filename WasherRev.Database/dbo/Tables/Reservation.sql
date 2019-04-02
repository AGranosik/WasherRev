CREATE TABLE [dbo].[Reservation] (
    [Id]        INT      IDENTITY (1, 1) NOT NULL,
    [UsersId]   INT      NOT NULL,
    [StartTime] DATETIME NOT NULL,
    [EndTime]   DATETIME NOT NULL,
    [WasherId]  INT      NULL,
    [IsDeleted] BIT      DEFAULT ((0)) NULL,
    CONSTRAINT [PK_ReservationId] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Reservation_Users] FOREIGN KEY ([UsersId]) REFERENCES [dbo].[Users] ([Id]),
    CONSTRAINT [FK_Reservation_Washer] FOREIGN KEY ([WasherId]) REFERENCES [dbo].[Room] ([Id])
);


GO
CREATE NONCLUSTERED INDEX [ux_Washer]
    ON [dbo].[Reservation]([UsersId] ASC);

