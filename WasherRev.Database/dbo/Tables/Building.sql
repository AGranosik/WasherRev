CREATE TABLE [dbo].[Building] (
    [Id]       INT           IDENTITY (1, 1) NOT NULL,
    [Name]     VARCHAR (MAX) NOT NULL,
    [Street]   VARCHAR (MAX) NOT NULL,
    [StreetNo] INT           NOT NULL,
    [PostCode] VARCHAR (20)  NOT NULL,
    [IsActive] BIT           DEFAULT ((1)) NULL,
    CONSTRAINT [PK_BuldingId] PRIMARY KEY CLUSTERED ([Id] ASC)
);

