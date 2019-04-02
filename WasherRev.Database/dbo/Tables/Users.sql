CREATE TABLE [dbo].[Users] (
    [Id]       INT           IDENTITY (1, 1) NOT NULL,
    [RoleNo]   INT           NOT NULL,
    [Username] VARCHAR (256) NOT NULL,
    [Password] VARCHAR (MAX) NOT NULL,
    [Email]    VARCHAR (256) NOT NULL,
    [RoomId]   INT           NULL,
    [IsActive] BIT           DEFAULT ((1)) NULL,
    CONSTRAINT [PK_UsersId] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Users_Room] FOREIGN KEY ([RoomId]) REFERENCES [dbo].[Room] ([Id]),
    UNIQUE NONCLUSTERED ([Username] ASC)
);


GO
CREATE NONCLUSTERED INDEX [ux_Email]
    ON [dbo].[Users]([Email] ASC);

